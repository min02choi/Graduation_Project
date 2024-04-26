import { Data } from "./Data";
//#region 에러사항
// ! 괄호 \\right \\left써있는 경우는 두번씩 중복일어남
// ! 제곱 처리 고려필요
//#endregion

//#region IMPORT
// const Data = require("../utils/ConstData.js")
//#endregion

//#region VARS & PROPERTIES
//////////////////////////////////////////////
///////////////* GLOBAL VAR */////////////////
const functions = {
    getfracEndIndex: getFracEndIndex,
    getsqrtEndIndex: getSqrtEndIndex,
    getleftEndIndex: getLeftEndIndex,
    getlimEndIndex: getLimEndIndex,

    readfrac: readFrac,
    readsqrt: readSqrt,
    readlim: readLim,
}

// let equation = "x=\\frac{-b \\pm \\sqrt{b^2 -4ac}}{2a}"
//var equation = "2\\times2 + 4xy - \\sqrt{4 + \\sqrt{x+2}} + \\frac{-b \\pm \\sqrt{b^{2+a} -4ac}}{2a}"
// var equation = "1\\times x+22"
// var equation = "\\frac{1\\times 2}{1+x}\\times2+y" 
// var equation = "1\\div x+22"
//  var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div(1/4)+ac";
// var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div\\left ( 1+y \\right ) +ac";
//var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div\\left ( 1+y \\right ) +\\frac{a}{b}"; 

// var equation = "\\left ( x+1 \\right )-y" 
// var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div( 1+y ) +\\frac{a}{b}";
// var equation = '\\sinx^2 + 2\\times 2 + \\sqrt{x+2} + {2\\div(1/1)}+\\frac{1}{x+1}'
// var equation = 'x^2+2x + 1'
// var equation = "\\frac{n!}{k!(n-k)!} = \\binom{n}{k} = _{n}\\mathrm{C}_{k}"
// var equation = "f^{\\prime}(x)=\lim_{h \\to 0}\\frac{f(x+h)-(x)}{h}"
// var equation = " x = \\frac{\\frac{1\\times 2y}{1+x}}{4ac + \\sqrt{x+2}}\\pm b"
// var equation = "\\frac{ 1 }{ \\sqrt { 2 }+\\frac{ 1 }{ \\sqrt { 2 } +\\frac { 1 }{ \\sqrt { 2 } + 1}}} "
// var equation = "2\\times2 + 4xy - \\sqrt{4 + \\sqrt{x+2}} + \\frac{-b \\pm \\sqrt{b -4ac}}{2a}"
// var equation = "3a +  \\lim_{x\\to0} \\frac{2x}{3a}"
//////////////////////////////////////////////
//////////////////////////////////////////////
//#endregion

//#region SUB_FUNC
// 현재 위치가 어떤 연산자인지 반환해주는 함수
// 딕셔너리에 있는 모든 연산자에 대해 확인하고, op와 idx를 반환
// opName, isOp, opLength
function checkOperation(expression, idx) {
    const resultDict = {}

    // 정해진 연산자에 대해서 돌리기
    // const opDictLen = Object.keys(operator).length; 
    for (let key in Data.operator) {
        // console.log("key: ", key);
        const endIdx = idx + key.length;
        const subExpr = expression.substring(idx, endIdx);
        // console.log(subExpr);
        // console.log(key);
        if (subExpr == key) {
            resultDict['opName'] = key;
            resultDict['isOp'] = 1;
            resultDict['opLength'] = key.length;
            break;

            // return resultDict;
        }
    }

    for (let key in Data.math_expression) {
        //console.log(key);
        const endIdx = idx + key.length;
        const subExpr = expression.substring(idx, endIdx);
        // console.log(subExpr);
        // console.log(key);
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
    console.log("checkOperation: ", resultDict);
    return resultDict;
}

function getFracEndIndex(expression, idx) {
    let stack = [];
    var braceCnt = 0
    var endIdx = 0;

    while (idx < expression.length) {
        //console.log(idx, "번째", expression[idx]);
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

function getLimEndIndex(expression, idx){
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
    //console.log(expression.slice(idx, idx + 5));
    //console.log("\\left")
    if (expression.slice(idx, idx + 5) === "\\left") {
        for (let i = idx; i < expression.length; i++) {
            if (expression[i] in Data.math_expression_pair) {
                exp = expression[i]
                break
            }
        }
    }

    let endExp = Data.math_expression_pair[exp][1];
// console.log(endExp);

    // 알아낸 연산자로 끝나는 지점 알아내기
    while (idx < expression.length) {
        if (expression[idx] === exp) {
            stack.push(exp);
        }

        // 공백도 일단...
        //console.log(expression.slice(idx, idx + 8));
        //console.log("\\right " + endExp);
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
                    break;
                }
            }

            //console.log("들어옴");
        }
        idx += 1;

    }
    return endIdx;
} 


/* 순수 문자열 분해 함수 */
// ex) 2ac, xy
function splitString(str){
    var strArr = [];

    Array.from(str).forEach(function(char) {
        if(char in Data.word || char in Data.number){
            strArr.push(char);
        }
    });
    
    return strArr;
}

/* 분해 가능 유무  */
function isAtom(char){
    if(char in Data.operator || char in Data.number || char in Data.word){
        return true;
    }
    return false;
}

/* 텍스트 매치 함수 */
function matchText(char){
    if(char in Data.operator) return Data.operator[char];
    if(char in Data.word) return Data.word[char];
    if(char in Data.number) return Data.number[char];
} 
//#endregion

//#region 명령어 텍스트 변환 함수 
/** 분수 **/
function readFrac(formula){
    var command = [];
    console.log(formula);

    // 분모, 분자 찾기
    let stack = []; 
    let denominator, numerator;
    for(var i=5; i < formula.length; i++){ 
        if(formula[i] == "{") stack.push("{");
        else if(formula[i] == "}") {
            stack.pop();
            if(stack.length == 0) {
                numerator = formula.slice(6, i);          //분자
                denominator = formula.slice(i+1, -1);     //분모
                break;
            }
        }
    } 

    let text = "분수시작 ";

    let splitExp = splitExpression(denominator, command);
    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })

    text += " 분의 ";
    splitExp = splitExpression(numerator, command);
    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })

    text += " 분수끝";

    return text;

    // 정규 표현식을 사용하여 분자와 분모를 추출 
    // var str = "\\frac{-b {\\pm + -() }\\sqrt{b^2 -4ac}}{2a}"
    // const regex = /{[^<>]+}/g;
    // const result = Array.from(str.matchAll('\\{(.*?)\\}'), match => `${match[0]}`);
    // console.log("결과", result);

}

/** 루트 **/
function readSqrt(formula){    
    var command = [];
    var insideofSqrt = formula.slice(6, -1);
    var splitExp = splitExpression(insideofSqrt, command);
    var text = "루트시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += " 루트끝";

    return text;
}

/** 리미트 **/
function readLim(formula){
    var command = [];
    var idx = formula.indexOf("\\to");
    var start = formula.slice(6, idx);
    var end = formula.slice(idx + 4, -1); 

    let text = "리미트 ";

    let splitExp = splitExpression(start, command);
    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })

    text += "가 ";

    splitExp = splitExpression(end, command);
    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })

    text += "으로 갈 때 ";

    return text;
}
// #endregion

//#region MAIN_FUNC
/* 텍스트 변환 함수 */
export function convert2Text(expression){
    let res = [];
    var commandArr = [];

    // 괄호, 공백 전처리
    //let newEquation = expression.replace("(", "\\left(");
    // newEquation = newEquation.replace(")", "\\right)");
    let newEquation = expression.replace(" ", "");

    // 처음 분해
    const initExp = splitExpression(newEquation, commandArr);
    console.log("DivEquation initExp: ", initExp);
    console.log("수식: ", expression);
    console.log("수식 전처리: ", newEquation);
    console.log("분해: ", initExp);
    console.log("명령어 구별: ", commandArr);

    // 텍스트로 변환
    initExp.forEach(function(element){
        res.push(convertElement(element, commandArr));
    })

    console.log("수식: ", expression);
    console.log("분해: ", initExp);
    console.log(res);

    // 합
    let convertedTEXT = "";
    res.forEach(function(element){
        convertedTEXT += element;
    })
    console.log("결과: ", convertedTEXT);
    return convertedTEXT;
}

// 괄호를 고려해서 하나씩 진행 하다가
function splitExpression(expression, command) {
    var idx = 0
    var splitExp = [];
    var temp = "";
    
    //console.log(idx)
    while (idx < expression.length) {
        console.log("splitExp", splitExp);
        console.log("command", command);
        // 연산자가 수 있는 것 추정
        // only 사칙연산자도 되는 것, \\times, \\pm 같은 연산자
        //console.log(idx, "번째: ", expression[idx]);
        
        if (expression[idx] === "\\" || expression[idx] === "+" || expression[idx] === "-"  || expression[idx] === "/" || expression[idx] === "=") {
            // 명령어인 경우, 이것이 op인지 일반 수식 요소인지 확인
            // 수식 요소인 경우 어디부터 어디까지 수식인지 판단하기
            
            let result = checkOperation(expression, idx);
            console.log("DivEquation splitExpression: while문", result);
            //console.log(result);
            
            // 연산자인 경우 앞의 항까지를 하나의 항으로 보기
            if (result.isOp) {
                if (temp !== "") {
                    splitExp.push(temp);
                }
                temp = "";
                // splitExp.append(temp);
                splitExp.push(result.opName);
                console.log("DivEquation splitExpression: while문 마지막", splitExp, result.opName);
                idx += result.opLength; 
            }
            else {
                //console.log("asdfasdf: ", result.opName)
                let funcName = "get" + (result.opName).slice(1) + "EndIndex";
                //command[splitExp.length] = result.opName;
                command.push(result.opName);
                
                if (functions[funcName]) {
                    let result = functions[funcName](expression, idx); // 함수 호출
                    // console.log("함수 동적 호출", funcName);
                    // console.log(result);        // 전체 수식에서의 인덱스임
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

/* Element 텍스트 변환 함수 */
function convertElement(element, command){

    // 더이상 분해 안되는 원소인 경우
    if(isAtom(element)) return matchText(element);
    
    // 명령어인 경우
    else if(element.startsWith(command[0])){
        var funcName = "read" + command[0].slice(1);
    
        if(funcName in functions){ 
            command.shift();
            return functions[funcName](element);
        }
        else return "No Function Exists.";
    }

    // 명령어 아닌 문자열인 경우 ex) 2ac, xy 등
    else{ 
        var str = splitString(element); //배열 반환
        var res = "";
        
        if("^" in str){
            // !! NEED TO CONSIDER ^ !!
        }

        str.forEach(function(char){
            res += convertElement(char);
        })

        return res;
    }

}

//#endregion

//#region TEST
// convert2Text(equation);
//#endregion
// function DivEquation(input) {
//     const handleConvert = () => {
//         const expression = input; // 변환할 수식을 여기에 입력하세요
//         const convertedText = convert2Text(expression);
//         console.log("변환된 텍스트:", convertedText);
//         // 여기서 convertedText를 원하는 방식으로 처리합니다.
//     };
//     return (
//         <div>
//             {/* convert 버튼 */}
//             <button onClick={handleConvert}>Convert</button>
//         </div>
//     );
// }
// export default DivEquation;