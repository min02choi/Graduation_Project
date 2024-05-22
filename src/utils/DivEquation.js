// import { Data } from "./Data";
// import { numToKorean, FormatOptions} from 'num-to-korean';

//#region 에러사항
// ! 괄호 \\right \\left써있는 경우는 두번씩 중복일어남
// ! 제곱 처리 고려필요
//#endregion

//#region IMPORT
const Data = require("./Data.js")
const { numToKorean, FormatOptions } = require('num-to-korean');
//#endregion

//#region VARS & PROPERTIES
//////////////////////////////////////////////
///////////////* GLOBAL VAR */////////////////
const functions = {
    getfracEndIndex: getFracEndIndex,
    getsqrtEndIndex: getSqrtEndIndex,
    getleftEndIndex: getLeftEndIndex,
    getlimEndIndex: getLimEndIndex,
    getsuperscriptEndIndex: getSuperscriptEndIndex,
    getsubscriptEndIndex: getSubscriptEndIndex,

    readfrac: readFrac,
    readsqrt: readSqrt,
    readlim: readLim,

    readleft: readLeft,
    readsuperscript: readSuperscript,
    readsubscript: readSubscript,
    // readright: readRight,
}

//let equation = "x=\\frac{-b \\pm \\sqrt{b^2 -14ac}}{2a}"
//var equation = "2\\times2 + 4xy - \\sqrt{4 + \\sqrt{x+2}} + \\frac{-b \\pm \\sqrt{b^{2+a} -4ac}}{2a}"
// var equation = "3110000123123\\times x+22000001yz"
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
// var equation = "\\frac{ 12 }{ \\sqrt { 22 }+\\frac{ 1 }{ \\sqrt { 2 } +\\frac { 1 }{ \\sqrt { 2 } + 1}}} "
// var equation = "2\\times2 + 4xy - \\sqrt{4 + \\sqrt{x+2}} + \\frac{-b \\pm \\sqrt{b -4ac}}{2a}"
// var equation = "31a +  \\lim_{x\\to0} \\frac{2x}{3a}"
// var equation = "\\frac{11}{12a}"
// var equation = "\\left | x+12 \\right | + 120202"
// var equation = "\\left ( \\left| x + 1\\right|-y \\right )+123"
// var equation = "\\left ( \\left( x + 1\\right)-y \\right )+123"
// var equation = "34\\times\\left [ \\left ( \\left| x + 1\\right|-y \\right )+123 \\right ]"
// var equation = "f(x) = x+ 1"
// var equation = "f\\left(x \\right) = x+ 1"
// var equation = "\\left\\{ 12 + \\left ( x-100 \\right )\\right\\} + 102"

// var equation = "\\left\\{x\\times\\left\\{ y-1\\right\\} \\right\\}";
// var equation = "\\left\\{x\\times\\left\\{ y-1\\right\\} \\right\\} + \\left [ 123 - 4 \\right ]";
// var equation = "\\left| x + \\left| y + 1\\right| \\right|";
// var equation = "x^2";
// var equation = "x^{xy^{2}}";
var equation = "x_{12}^{y+1}";
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
            resultDict['opEngName'] = "";
            resultDict['isOp'] = 1;
            resultDict['opLength'] = key.length;
            break;
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
            resultDict['opEngName'] = Data.math_expression[key][1];
            resultDict['isOp'] = 0;
            resultDict['opLength'] = key.length;
            break;
        }
    }

    // 쌍은 별도로 처리
    console.log(resultDict.opName);
    if (resultDict.opName === "\\left" || resultDict.opName === "\\left") {
        resultDict['opName'] = "\\left";
        resultDict['isOp'] = 0;     // 수정(원래: 0 -> 1)
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

// 쌍으로 이루어진 연산자의 끝 인덱스를 알아내는 함수
// 특수경우: 우측에 쌍이 있음. 시작은 \\left
function getLeftEndIndex(expression, idx) {
    let stack = [];
    var braceCnt = 0
    var endIdx = 0;
    var exp = ""

    // 어떤 연산자인지 알아내기
    if (expression.slice(idx, idx + 5) === "\\left") {
        for (let i = idx; i < expression.length; i ++) {
            for (let expLeft in Data.math_expression_pair) {
                console.log(expression.slice(i, i + expLeft.length));
                console.log(expLeft);
                if (expression.slice(i, i + expLeft.length) === expLeft) {
                    console.log("안으로 들어옴");
                    exp = expLeft;
                    break;
                }
            }
            if (exp !== "") {
                break;
            }
        }
    }

    let endExp = Data.math_expression_pair[exp][1];

    // 알아낸 연산자로 끝나는 지점 알아내기
    while (idx < expression.length) {
        // console.log(expression.slice(idx, idx + endExp.length));
        // console.log(exp);
        if (expression.slice(idx, idx + 5 + exp.length) === ("\\left" + exp)) {
            stack.push(exp);
        }

        // 스택 검사해서 비어있다면 최종 인덱스 반환
        console.log(expression.slice(idx, idx + 6 + endExp.length));
        console.log("\\right" + endExp);
        if (expression.slice(idx, idx + 6 + endExp.length) === ("\\right" + endExp)) {
            stack.pop();
            if (stack.length === 0) {
                braceCnt += 1;
                if (braceCnt === 1) {
                    endIdx = idx + 5 + endExp.length;
                    break;
                }
            }
        }
        idx += 1;
    }
    return endIdx;
}

function getSuperscriptEndIndex(expression, idx) {
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

function getSubscriptEndIndex(expression, idx) {
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

/* 순수 문자열 분해 함수 */
// 여기를 고쳐야 함 - 숫자가 붙어있는 경우는 숫자 한꺼번에 자르기
// ex) 2ac, xy
function splitString(str){
    var strArr = [];
    var num = "";

    Array.from(str).forEach(function(char) {
        if (char in Data.number){
            num += char
        }
        else if (char in Data.word) {
            strArr.push(num);
            strArr.push(char);
            num = "";
        }
    });

    if (num !== "") {
        strArr.push(num);
    }
    
    return strArr;
}

/* 분해 가능 유무  */
// 두자리 이상의 수는 Atom 취급
function isAtom(char){
    if(char in Data.operator || char in Data.number || char in Data.word || isNumber(char)){
        return true;
    }
    return false;
}

/* 숫자로만 이루어져있는지 판단 */
function isNumber(char) {
    for (var i = 0; i < char.length; i++) {
        if (char[i] < '0' || char[i] > '9') return 0
    }
    return 1
}

/* 텍스트 매치 함수 */
function matchText(char){
    if(char in Data.operator) return Data.operator[char];
    if(char in Data.word) return Data.word[char];
    // if(char in Data.number) return Data.number[char];
    const num = numToKorean(parseInt(char), FormatOptions.LINGUAL);
    console.log("- 숫자로의 변환: ", num);
    if (isNumber(char)) return numToKorean(parseInt(char), FormatOptions.LINGUAL) + " ";
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
    for (var i=5; i < formula.length; i++) {
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

    text += "분의 ";
    splitExp = splitExpression(numerator, command);
    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })

    text += "분수끝 ";

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

// 괄호, 대괄호 처리해야 함
// 중괄호는 명령어임
function readLeft(formula){
    var command = [];

    console.log(formula);
    var pairName = "";
    var pairEnd = "";
    var expLen = "";

    // 데이터 프레임에서 돌리기
    for (let expLeft in Data.math_expression_pair) {

        console.log(expLeft.length)
        expLen = expLeft.length;

        console.log(expLeft);
        console.log(formula.slice(5, 5 + expLen));
        if (formula.slice(5, 5 + expLen) === expLeft) {
            console.log("일치");
            pairName = Data.math_expression_pair[expLeft][0];
            pairEnd = Data.math_expression_pair[expLeft][1];
            break;
        }
    }
    console.log(pairName);
    console.log(pairEnd);

    console.log("\\right" + pairEnd);
    console.log(-(6 + parseInt(expLen)))
    var tempIdx = -(6 + expLen);
    ////
    console.log(formula.slice(tempIdx, 0));
    console.log(formula.slice(-7));

    console.log("\\right" + pairEnd);
    if (formula.slice(tempIdx) === "\\right" + pairEnd) {
        console.log("들어옴");
    }
    // getLeftEndIndex() 이거 써도 되지 않냐

    // 여기에서 한번 right가 끝나는 지점을 확인할 것
    // 이거 만약 중괄호면 인덱스 바꾸어 주어야 함
    var insideofLeft = formula.slice(6, tempIdx);        // 여기에서
    var splitExp = splitExpression(insideofLeft, command);

    console.log(formula[5]);
    // var pairName = Data.math_expression_pair[formula[5]][0];
    // console.log(pairName);

    var text = pairName + "시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += pairName + "끝 ";

    return text;
}

function readSuperscript(formula) {
    var command = [];
    var insideofScript = formula.slice(2, -1);
    var splitExp = splitExpression(insideofScript, command);
    var text = "의 제곱 시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += "제곱 끝 ";

    return text;
}

function readSubscript(formula) {
    var command = [];
    var insideofScript = formula.slice(2, -1);
    var splitExp = splitExpression(insideofScript, command);
    var text = "의 아래첨자 시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += "아래첨자 끝 ";

    return text;
}

// #endregion

//#region MAIN_FUNC
/* 텍스트 변환 함수 */
function convert2Text(expression){
    let res = [];
    var commandArr = [];

    // 괄호, 공백 전처리
    //let newEquation = expression.replace("(", "\\left(");
    // newEquation = newEquation.replace(")", "\\right)");
    let newEquation = expression.replace(/\s/g, "");

    console.log("newEquation: ", newEquation);

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

        if (expression[idx] in Data.operator || expression[idx] in Data.math_expression || expression[idx] === "\\") {
        // if (expression[idx] === "\\" || expression[idx] === "+" || expression[idx] === "-"  || expression[idx] === "/" || expression[idx] === "=") {
            // 명령어인 경우, 이것이 op인지 일반 수식 요소인지 확인
            // 수식 요소인 경우 어디부터 어디까지 수식인지 판단하기
            
            let result = checkOperation(expression, idx);
            console.log("DivEquation splitExpression: while문", result);
            //console.log(result);
            
            // 연산자인 경우 앞의 항까지를 하나의 항으로 보기
            // 괄호의 경우 별도의 처리 필요
            if (result.isOp) {
                console.log(temp)
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
                // let funcName = "get" + (result.opName).slice(1) + "EndIndex";
                let funcName = "get" + (result.opEngName) + "EndIndex";
                //command[splitExp.length] = result.opName;
                command.push(result.opName);
                
                if (functions[funcName]) {
                    let result = functions[funcName](expression, idx); // 함수 호출
                    // console.log("함수 동적 호출", funcName);
                    // console.log(result);        // 전체 수식에서의 인덱스임

                    ///
                    console.log(temp)
                    if (temp !== "") {
                        splitExp.push(temp);
                    }
                    temp = "";
                    ///
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
// 이쪽은 숫자가 붙어서 들어와야 함
function convertElement(element, command){
    // 더이상 분해 안되는 원소인 경우
    if(isAtom(element)) return matchText(element);
    
    // 명령어인 경우
    // console.log(element);
    else if (element.startsWith(command[0])) {
        // var funcName = "read" + command[0].slice(1);
        var funcName = "read" + Data.math_expression[command[0]][1];
    
        if(funcName in functions) {
            command.shift();
            return functions[funcName](element);
        }
        //else if (funcName === "readleft") {
            //if (funcName === "readleft") return "괄호 열고";
            //if (funcName === "readright") return "괄호 닫고";
        //}
        else return "No Function Exists.";
    }

    // 명령어 아닌 문자열인 경우 ex) 2ac, xy 등
    else {
        var str = splitString(element); //배열 반환
        var res = "";
        
        if("^" in str) {
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
convert2Text(equation);

// const number = numToKorean(11111);
// const number2 = numToKorean(11111, FormatOptions.LINGUAL);

//#endregion

// f(x)의 경우 (x)이 먼저 들어가는 현상 확인