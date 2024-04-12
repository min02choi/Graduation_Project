const Data  = require("./const_data.js")

const functions = {
    getfracEndIndex: getFracEndIndex,
    getsqrtEndIndex: getSqrtEndIndex,
    getleftEndIndex: getLeftEndIndex,
}

var stack = []

// 현재 위치가 어떤 연산자인지 반환해주는 함수
// 딕셔너리에 있는 모든 연산자에 대해 확인하고, op와 idx를 반환
// opName, isOp, opLength
function checkOperation(expression, idx) {
    const resultDict = {}

    // 정해진 연산자에 대해서 돌리기
    // const opDictLen = Object.keys(operator).length; 
    for (let key in Data.operator) {
        console.log("key: ", key);
        const endIdx = idx + key.length;
        const subExpr = expression.substring(idx, endIdx);
        console.log(subExpr);
        console.log(key);
        if (subExpr == key) {
            resultDict['opName'] = key;
            resultDict['isOp'] = 1;
            resultDict['opLength'] = key.length;
            break;

            // return resultDict;
        }
    }

    for (let key in Data.math_expression) {
        console.log(key);
        const endIdx = idx + key.length;
        const subExpr = expression.substring(idx, endIdx);
        console.log(subExpr);
        console.log(key);
        if (subExpr == key) {
            resultDict['opName'] = key;
            resultDict['isOp'] = 0;
            resultDict['opLength'] = key.length;
            break;

            // return resultDict;
        }
    }

    // 쌍은 별도로 처리
    console.log(resultDict.opName);
    if (resultDict.opName === "\\left" || resultDict.opName === "\\left") {
        resultDict['opName'] = "\\left";
        resultDict['isOp'] = 0;
        resultDict['opLength'] = "\\left".length;
    }

    return resultDict;
}

function getFracEndIndex(expression, idx) {
    let stack = [];
    var braceCnt = 0
    var endIdx = 0;

    while (idx < expression.length) {
        console.log(idx, "번째", expression[idx]);
        if (expression[idx] === "{") {
            if (stack.length === 0 && braceCnt < 2) {
                // braceCnt += 1;
            }
            stack.push("{");
        }
        // {{}}{}
        else if (expression[idx] === "}") {
            stack.pop();
            // 분모까지 마무리
            if (stack.length === 0) {
                braceCnt += 1;
                if (braceCnt == 2) {
                    endIdx = idx
                    break
                }
            }
        }
        idx += 1;
    }
    return endIdx;
}

function getSqrtEndIndex(expression, idx) {
    let stack = [];
    var braceCnt = 0
    var endIdx = 0;

    while (idx < expression.length) {
        if (expression[idx] === "{") {
            if (stack.length === 0 && braceCnt < 1) {
                // braceCnt += 1;
            }
            stack.push("{");
        }
        else if (expression[idx] === "}") {
            stack.pop();
            // 분모까지 마무리
            if (stack.length === 0) {
                braceCnt += 1;
                if (braceCnt == 1) {
                    endIdx = idx
                    break
                }
            }
        }
        idx += 1;
    }
    return endIdx;
}

// 특수경우: 우측에 쌍이 있음. 시작은 \\left
// math_expression_pair 에서 어떤것인지 확인하고
function getLeftEndIndex(expression, idx) {
    let stack = [];
    var braceCnt = 0
    var endIdx = 0;
    var exp = ""

    // 어떤 연산자인지 알아내기
    console.log(expression.slice(idx, idx + 5));
    console.log("\\left")
    if (expression.slice(idx, idx + 5) === "\\left") {
        for (let i = idx; i < expression.length; i++) {
            if (expression[i] in Data.math_expression_pair) {
                exp = expression[i]
                break
            }
        }
    }

    let endExp = Data.math_expression_pair[exp][1];
    console.log(endExp);

    // 알아낸 연산자로 끝나는 지점 알아내기
    while (idx < expression.length) {
        if (expression[idx] === exp) {
            stack.push(exp);
        }

        // 공백도 일단...
        console.log(expression.slice(idx, idx + 8));
        console.log("\\right " + endExp);
        if (expression.slice(idx, idx + 8) === ("\\right " + endExp) || expression.slice(idx, idx + 7) === ("\\right" + endExp)) {
            stack.pop();
            if (stack.length === 0) {
                braceCnt += 1;
                if (braceCnt === 1) {
                    if (expression[idx + 6] === endExp) {
                        endIdx = idx + 6
                    }
                    else if (expression[idx + 7] === endExp) {
                        endIdx = idx + 7
                    }
                    break
                }
            }

            console.log("들어옴");
        }
        idx += 1;

    }
    return endIdx;
}


// 괄호를 고려해서 하나씩 진행 하다가
function splitExpression(expression) {
    var idx = 0
    var splitExp = [];
    var temp = "";

    console.log(idx)
    while (idx < expression.length) {
        // 연산자가 수 있는 것 추정
        // only 사칙연산자도 되는 것, \\times, \\pm 같은 연산자
        console.log(idx, "번째: ", expression[idx]);
        
        if (expression[idx] === "\\" || expression[idx] === "+" || expression[idx] === "-"  || expression[idx] === "/" || expression[idx] === "=") {
            // 명령어인 경우, 이것이 op인지 일반 수식 요소인지 확인
            // 수식 요소인 경우 어디부터 어디까지 수식인지 판단하기

            let result = checkOperation(expression, idx);
            console.log(result);

            // 연산자인 경우 앞의 항까지를 하나의 항으로 보기
            if (result.isOp) {
                if (temp !== "") {
                    splitExp.push(temp);
                }
                temp = "";
                // splitExp.append(temp);
                splitExp.push(result.opName);
                idx += result.opLength;
            }
            else {
                console.log("asdfasdf: ", result.opName)
                let funcName = "get" + (result.opName).slice(1) + "EndIndex";

                if (functions[funcName]) {
                    let result = functions[funcName](expression, idx); // 함수 호출
                    console.log("함수 동적 호출", funcName);
                    console.log(result);        // 전체 수식에서의 인덱스임
                    splitExp.push(expression.slice(idx, result + 1));
                    idx = result + 1;
                }
                else {
                    console.error(funcName + ' No Function.');
                }
            }
        }
        else if (expression[idx] !== " ") {
            temp += expression[idx];
            idx += 1;
        }
        else if (expression[idx] === " ") {
            idx += 1;
        }
    }
    if (temp.length !== 0) {
        splitExp.push(temp);
    }

    return splitExp;
}


//var equation = "1\\times x+22"
// ["1", "\\times", "x", "+", "22"]
// var equation = "\\frac{1\\times 2}{1+x}\\times2+y"
// ["\frac{1}{1+x}", "\times", "2", "+", "y"]
// var equation = "1\\div x+22"
// var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div(1/4)+ac";
// var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div\\left ( 1+y \\right ) +ac";
//var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div\\left ( 1+y \\right ) +\\frac{a}{b}";
// [2, "\times", 2, +, \sqrt{x+2}, +, 2, \div, (1/4), +, ac]

// var equation = "\\left ( x+1 \\right )-y"
// var equation = "\\left( x+1 \\right)-y"
// var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div( 1+y ) +\\frac{a}{b}";

 let equation = "x=\\frac{-b \\pm \\sqrt{b^2 -4ac}}{2a}"

// 괄호 전처리
let newEquation = equation.replace("(", "\\left(");
newEquation = newEquation.replace(")", "\\right)");

const test  = splitExpression(newEquation);
console.log(equation);
console.log(newEquation);
console.log("분해: ", test);



