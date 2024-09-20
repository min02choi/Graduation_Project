//#region ERROR 
//#endregion

//#region IMPORT_DATA
// const Data = require("./TempData.js")
// const Data = require("./Data.js")
import { Data } from "./Data";
import {getFracEndIndex, getSqrtEndIndex, getLeftEndIndex, getLimEndIndex, getSctEndIndex, getOverlineEndIndex, getDotEndIndex, getSuperscriptEndIndex, getSubscriptEndIndex, getMatrixEndIndex} from "./GetEndIndex";
import {readFrac, readSqrt, readLeft, readLim, readUnder, readAbove, readLe, readGe, readSin, readCos, readTan, readOverline, readDot, readIn, readNi, readNotIn, readNotNi, readSubset, readSupset, readSubseteq, readSupseteq, readNotSubset, readNotSupset, readRightArrow, readLeftArrow, readLeftRightArrow, readOverRightArrow, overLeftRightArrow, readSuperscript, readSubscript, readMatrix} from "./Read";
// import { numToKorean, FormatOptions} from 'num-to-korean';
const { numToKorean, FormatOptions } = require('num-to-korean');


//#endregion

//#region FUNC_NAMES 

const endIdxFuncNames = {
    "\\frac": getFracEndIndex,
    "\\sqrt": getSqrtEndIndex,
    "\\left": getLeftEndIndex,
    "\\lim": getLimEndIndex,
    "\\sin": getSctEndIndex,
    "\\cos": getSctEndIndex,
    "\\tan": getSctEndIndex,
    "\\overline": getOverlineEndIndex, 
    "\\overrightarrow" : getOverlineEndIndex,
    "\\overleftrightarrow" : getOverlineEndIndex,
    "\\dot" : getDotEndIndex,
    "^": getSuperscriptEndIndex,
    "_": getSubscriptEndIndex,
    "\\begin": getMatrixEndIndex,
};

const readFuncNames = {
    "\\frac": readFrac,
    "\\sqrt": readSqrt,
    "\\left": readLeft,
    "\\lim": readLim,
    "<": readUnder,
    ">": readAbove,
    "\\le": readLe,
    "\\ge": readGe,
    "\\sin": readSin,
    "\\cos": readCos,
    "\\tan": readTan,
    "\\overline": readOverline,
    "\\dot": readDot,
    "\\in": readIn,
    "\\ni": readNi,
    "\\notin": readNotIn,
    "\\not\\ni": readNotNi,
    "\\subset": readSubset,
    "\\supset": readSupset,
    "\\subseteq": readSubseteq,
    "\\supseteq": readSupseteq,
    "\\not\\subset": readNotSubset,
    "\\not\\supset": readNotSupset,
    "\\Rightarrow": readRightArrow,
    "\\Longrightarrow": readRightArrow,
    "\\Leftarrow": readLeftArrow,
    "\\Longleftarrow": readLeftArrow,
    "\\Leftrightarrow": readLeftRightArrow,
    "\\Longleftrightarrow": readLeftRightArrow, 
    "\\overrightarrow" : readOverRightArrow,
    "\\overleftrightarrow": overLeftRightArrow,
    "^":  readSuperscript, 
    "_":  readSubscript ,

    "\\begin": readMatrix,

}

//#endregion

//#region EQUATIONS
// var equation = "\\left(x>1\\right)"        // 이거 안됨 -> 부등호의 자르는 이슈떄문에 그런듯
// let equation = "x=\\frac{-b \\pm \\sqrt{b^2 -14ac}}{2a}" // -> [가능] 이 수식에서 b^2 부분을 b^{2}로 변형하면 됨(LaTex 형태 문제)

// var equation = "\\frac{b}{a} + \\sqrt{2}";
// var equation = "2\\times2 + 4xy - \\sqrt{4 + \\sqrt{x+2}} + \\frac{-b \\pm \\sqrt{b^{2+a} -4ac}}{2a}"
// var equation = "3110000123123\\times x+22000001yz"
// var equation = "\\frac{1\\times 2}{1+x}\\times2+y"  
//  var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div(1/4)+ac";
// var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div\\left ( 1+y \\right ) +ac";
// var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div\\left ( 1+y \\right ) +\\frac{a}{b}"; 
// var equation = "f\\left(x \\right) = x+ 1"

// var equation = "\\dot{2}\\dot{4}\\dot{3}+ \\sqrt{x+2} + \\overleftrightarrow{AB}";
// var equation = "0.1\\dot{2}\\dot{3}\\dot{4}+ \\sqrt{x+2} + \\overleftrightarrow{AB}";
// var equation = "\\left ( x+1 \\right )-y"
// var equation = '\\sin x^{2} + 2\\times 2 + \\sqrt{x+2} + 2\\div(1/1)+\\frac{1}{x+1}' // -> [가능] 이 수식에서 \\sin x^{2} 부분을 \\sin (x^{2})로 변형하면 됨
// var equation = "\\sin x^{2} + \\sqrt(2){x}"
// var equation = 'x^{2}+2x + 1'
// var equation = "\\frac{n!}{k!(n-k)!} = \\binom{n}{k} = _{n}\\mathrm{C}_{k}" // -> 글자체 이슈/이거 다시
// var equation = "f^{\\prime}(x)=\\lim_{h \\to 0}\\frac{f(x+h)-(x)}{h}" // -> [애매한 가능]..은 한데 첨자 읽기 특성상 "에프 의 제곱 시작 프라임 제곱 끝" 이런 독음 문제 있음
// var equation = " x = \\frac{\\frac{1\\times 2y}{1+x}}{4ac + \\sqrt{x+2}}\\pm b"
// var equation = "\\frac{ 12 }{ \\sqrt { 22 }+\\frac{ 1 }{ \\sqrt { 2 } +\\frac { 1 }{ \\sqrt { 2 } + 1}}} "
// var equation = "2\\times2 + 4xy - \\sqrt{4 + \\sqrt{x+2}} + \\frac{-b \\pm \\sqrt{b -4ac}}{2a}"
// var equation = "31a +  \\lim_{x\\to0} \\frac{2x}{3a}"
// var equation = "\\frac{11}{12a}"
// var equation = "\\sqrt{5}+2\\le2\\times3<123"
// var equation = "\\frac{k}{x-2} + 1 \\left( x >2 \\right )"
// var equation = "\\left( x + 1 \\right )"
// var equation = "\\sqrt{2}";

/////////////////////////
// var equation = "\\left\\{x\\times\\left\\{ y-1\\right\\} \\right\\} + \\left [ 123 - 4 \\right ]";
// var equation = "A\\Longleftrightarrow B";
// var equation = "A\\le B";
////05.23 보고용 예시////
// var equation = "1\\div x+22 + \\overline{341}"
// var equation = "A\\Longleftrightarrow B";
// var equation = "\\sqrt{5}+2 < a2"
// var equation = "\\sqrt{5}+2=2\\times3"
// var equation = "\\sqrt{5} + 1 = 12\\infty";
// var equation = "\\sin(\\sqrt{2} + \\sin(3)) \\div \\tan(3) + \\cos(2)"
// var equation = "\\sim p";
// var equation = "\\left\\{x\\times\\left\\{ y-1\\right\\} \\right\\}";
// var equation = "\\left| x + \\left| y + 1\\right| \\right|";
// var equation = "x_{12}^{y+1}";

// var equation = "\\begin{matrix}\\n a_{11}& \\sqrt{5}+2& \\sim p\\\\ x_{12}^{y+1}& 1\\div x+22 & \\frac{k}{x-2} \\\\ \\end{matrix}";
var equation = "\\begin{pmatrix}\\n1 & 2\\\\\\n3 & 4 \\\\\\n\\end{pmatrix}";
// var equation = "\\begin{pmatrix}1 & 2\\\\3 & 4 \\\\\\end{pmatrix}";
// var equation = "\\begin{bmatrix} a& 2& 3\\\\ xy&  x+22 & 0 \\\\ \\end{bmatrix}"; // \\begin{bmatrix}\n a& 2& 3\\\\ \n xy&  x+22 & 0 \\\\ \n \\end{bmatrix} ** \n 이 있어야됨
//////////////////////////////////////////////
//////////////////////////////////////////////
//#endregion

//#region SUB_FUNC
// 현재 위치가 어떤 연산자인지 반환해주는 함수
// 딕셔너리에 있는 모든 연산자에 대해 확인하고, op와 idx를 반환
// opName, isOp, opLength
function checkOperation(expression, idx) {
    const resultDict = {}
    console.log("checkOperation: ", expression);

    // 정해진 연산자에 대해서 돌리기
    for (let key in Data.firstPriority) {
        console.log("key: ", key);
        const endIdx = idx + key.length;
        const subExpr = expression.substring(idx, endIdx);
        // console.log(subExpr);
        // console.log(key);
        if (subExpr === key) {
            resultDict['opName'] = key;
            resultDict['opEngName'] = "";
            resultDict['isOp'] = 1;
            resultDict['opLength'] = key.length;
            break;
        }
    }

    for (let key in Data.math_expression) {
        const endIdx = idx + key.length;
        const subExpr = expression.substring(idx, endIdx);
        console.log(subExpr);
        console.log(key);
        if (subExpr === key) {
            resultDict['opName'] = key; 
            resultDict['opEngName'] = Data.math_expression[key][1];
            resultDict['isOp'] = 0;
            resultDict['opLength'] = key.length;
            break;
        }
    }

    // 쌍은 별도로 처리
    console.log(resultDict.opName);
    if (resultDict.opName === "\\left") {
        resultDict['opName'] = "\\left";
        resultDict['isOp'] = 0;
        resultDict['opLength'] = "\\left".length;
    }
    console.log("checkOperation: ", resultDict);
    return resultDict;
}

function isInDic(expression, keyName) {
    console.log("isInDic: ", expression, keyName);
    if (Data[keyName] && Data[keyName][expression]) {
        return true;
    } else {
        return false;
    }
}
// 부등호, 집합 기호가 "한 개" 있는지 확인 -> " "기준으로 쪼개서 zeroPriority 찾기
function isZeroPriorityOnce(expression) {
    var zeroPriorityCnt = 0;
    const splitSpace = expression.split(" ");
    var elements = [];
    var singleStartIdx = 0;
    var singleEndIdx = 0;
    console.log("isZeroPriorityOnce", expression);
    
    splitSpace.forEach(function(el) {
        var tempEx = el.match(/[a-zA-Z]+|[0-9]+|\\[a-zA-Z]+_{|\\[a-zA-Z]+\{|\\[a-zA-Z]+\\[a-zA-Z]+|\\[a-zA-Z]+|\^\{|\\_{|[^\sA-Za-z0-9]/g);
        // console.log("isZeroPriority ele: ", el);
        if (tempEx !== null) {
            tempEx.forEach(function(i) {
                elements.push(i);
            });
        }
    });
    
    console.log("isZero{riorityOnce elements: ", elements);
    for (var i = 0; i < elements.length; i++) {
        // console.log(elements[i], " isInDic(elements[i] ", isInDic(elements[i]));
        if (isInDic(elements[i], "zeroPriority")) {
            zeroPriorityCnt += 1;
            singleStartIdx = expression.indexOf(elements[i]);
            singleEndIdx = singleStartIdx + elements[i].length;
            console.log(`Value: ${elements[i]}, Index: ${singleStartIdx}, expression[index]: ${expression.slice(singleStartIdx,singleEndIdx)}`);
        }
    }
    const returnDic = {
        "zeroPriorityCnt": zeroPriorityCnt,
        "singleStartIdx": singleStartIdx,
        "singleEndIdx": singleEndIdx,
    }
    console.log(`returnDic :: zeroPri ${returnDic["zeroPriorityCnt"]}, singleStartIdx: ${returnDic["singleStartIdx"]}, singleEndIdx: ${returnDic["singleEndIdx"]}`);
    return returnDic;
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
    if(char in Data.firstPriority || char in Data.number || char in Data.word || isNumber(char)){
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
    if(char in Data.firstPriority) return Data.firstPriority[char];
    if(char in Data.word) return Data.word[char];
    // if(char in Data.number) return Data.number[char];
    const num = numToKorean(parseInt(char), FormatOptions.LINGUAL);
    console.log("- 숫자로의 변환: ", num);
    // if (isNumber(char)) return numToKorean(parseInt(char), FormatOptions.LINGUAL) + " ";
    // num-to-korean API 0 처리를 못하네...?
    if (isNumber(char) && parseInt(char) !== 0) return numToKorean(parseInt(char), FormatOptions.LINGUAL) + " ";
    else if (parseInt(char) === 0) return "영 ";
}
//#endregion

//#region MAIN_FUNC
/* 텍스트 변환 함수 */
export function convert2Text(expression){
    let res = [];
    var commandArr = [];

    // 괄호, 공백 전처리
    let newEquation = expression.replace(/\s/g, "");
    let initExp = [];
    console.log(expression);

    // 처음 분해
    let returnDic = isZeroPriorityOnce(expression);
    console.log("returnDic[zeroPriorityCnt]: ", returnDic);
    if (returnDic["zeroPriorityCnt"] === 1) {
        // 부등호, 집합 기호 등 우선순위 0순위 연산자가 있는 경우
        console.log("0순위 연산기호로 쪼개기")
        
        var frontZeroPriority = expression.slice(0, returnDic["singleStartIdx"]);
        var backZeroPriority = expression.slice(returnDic["singleEndIdx"]);
        console.log("frontZeroPriority: ", frontZeroPriority);
        console.log("backZeroPriority: ", backZeroPriority);
        initExp.push(frontZeroPriority);
        commandArr.push(expression.slice(returnDic["singleStartIdx"], returnDic["singleEndIdx"]));
        initExp.push(backZeroPriority);
        res.push(convertElement(initExp, commandArr)); // * 0순위 initExp는 쪼개고 시작 -> read 함수에서 컨트롤
    }
    else {
        initExp = splitExpression(newEquation, commandArr);
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
    }

    // 합
    let tempConvTEXT = "";
    res.forEach(function(element){
        tempConvTEXT += element;
    })
    const convertedTEXT = replaceAsterisks(tempConvTEXT);
    const convertedTEXT2 = replaceAsterisks2(convertedTEXT);
    console.log("결과: ", convertedTEXT2);

    return convertedTEXT2;
}

/* 조사 위치 찾아 은/는 삽입하는 함수 */
function hasLastConsonantLetter(text) {
    const lastChar = text.trim().charAt(text.length - 1);
    if (/[가-힣]/.test(lastChar)) {
      return (lastChar.charCodeAt(0) - "가".charCodeAt(0)) % 28 !== 0;
    }
    return false;
  }
  
function replaceAsterisks(sentence) {
    let modSentence = sentence;

    // '*'를 찾아가며 처리
    while (modSentence.includes('*')) {
        const asteriskIdx = modSentence.indexOf('*');
        const textBeforeAsterisk = modSentence.slice(0, asteriskIdx).trim();
        const particle = hasLastConsonantLetter(textBeforeAsterisk) ? "은" : "는";
        modSentence = modSentence.replace('*', particle);
    }
    return modSentence;
}

function replaceAsterisks2(sentence) {
    let modSentence = sentence;

    // '#'를 찾아가며 처리
    while (modSentence.includes('#')) {
        const asteriskIdx = modSentence.indexOf('#');
        const textBeforeAsterisk = modSentence.slice(0, asteriskIdx).trim();
        const particle = hasLastConsonantLetter(textBeforeAsterisk) ? "이" : "가";
        modSentence = modSentence.replace('#', particle);
    }
    return modSentence;
}

export function splitExpression(expression, command) {
    var idx = 0
    var splitExp = [];
    var temp = "";
    console.log("splitExpression: ", expression, command);
    
    // 1순위 우선순위 연산자 기준 쪼개기
    while (idx < expression.length) {
        console.log("splitExp", splitExp);
        console.log("command", command);
        // 연산자가 수 있는 것 추정
        // only 사칙연산자도 되는 것, \\times, \\pm 같은 연산자 

        if (expression[idx] === "\\[a-zA-Z]\\" || expression[idx] === "\\" || isInDic(expression[idx], "firstPriority")) {
            let result = checkOperation(expression, idx);
            console.log("DivEquation splitExpression: while문", result);
            //console.log(result);
            
            // 연산자인 경우 앞의 항까지를 하나의 항으로 보기
            if (result.isOp) {
                if (temp !== "") {
                    splitExp.push(temp);
                }
                temp = "";
                splitExp.push(result.opName);
                console.log("DivEquation splitExpression: while문 마지막", splitExp, result.opName);
                idx += result.opLength; 
            }
            else { 
                let endIdxFuncName = endIdxFuncNames[result.opName]

                //command[splitExp.length] = result.opName;
                command.push(result.opName);
                console.log("END_IDX_FUNC_NAME: ", endIdxFuncName);
                if (endIdxFuncName) {
                    let result = endIdxFuncName(expression, idx); // 함수 호출
                    // console.log("함수 동적 호출", funcName);
                    // console.log(result);        // 전체 수식에서의 인덱스임

                    console.log("TEMP: " ,temp);
                    if (temp !== "") {
                        splitExp.push(temp);
                    }
                    temp = "";

                    splitExp.push(expression.slice(idx, result + 1));
                    
                    idx = result + 1;
                }
                else {
                    console.error(' No Function.');
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
export function convertElement(element, command){
    // 더이상 분해 안되는 원소인 경우
    // 0순위 우선순위 명령어인 경우 -> 이미 쪼개져서 들어옴
    if (typeof command !== 'undefined' && isInDic(command[0], "zeroPriority")) {
        let readFuncName = readFuncNames[command[0]];
        // var funcName = `${readFuncName}`;
        // console.log("funcName in functions", funcName in functions);
    
        if(command[0] in readFuncNames) {
            command.shift();
            return readFuncName(element);
        }
        else return "No Function Exists.";
    }

    else if(isAtom(element)) return matchText(element);
    
    // 1순의 우선순위 명령어인 경우
    else if(element.startsWith(command[0])) {
        let readFuncName = readFuncNames[command[0]]; 
        // console.log("convertElement: opName", opName);
        // var funcName = `read${opName}`;
        // var funcName = "read" + Data.math_expression[command[0]][1];

        if(command[0] in readFuncNames) {
            command.shift();
            return readFuncName(element);
        }
        else return "No Function Exists.";
    }

    // 명령어 아닌 문자열인 경우 ex) 2ac, xy 등
    else {
        var str = splitString(element); //배열 반환
        var res = "";

        str.forEach(function(char){
            res += convertElement(char);
        })

        return res;
    }
}

//#endregion

//#region TEST
// convert2Text(equation);

// const number = numToKorean(0);
// console.log(number);

//#endregion