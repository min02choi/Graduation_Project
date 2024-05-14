import { Data } from "./Data";
import { numToKorean, FormatOptions} from 'num-to-korean';

//#region 에러사항
// ! 괄호 \\right \\left써있는 경우는 두번씩 중복일어남
// ! 제곱 처리 고려필요
//#endregion

//#region IMPORT
// const Data = require("./TempData.js")
// const { numToKorean, FormatOptions } = require('num-to-korean');
const endIdxFuncNames = {
    "\\frac": "frac",
    "\\sqrt": "sqrt",
    "\\left": "left",
    "\\lim": "lim",
    "\\sin": "sct",
    "\\cos": "sct",
    "\\tan": "sct",
    "^": "superscript",
};
const readFuncNames = {
    "\\frac": "frac",
    "\\sqrt": "sqrt",
    "\\left": "left",
    "\\lim": "lim",
    "<": "under",
    ">": "above",
    "\\le": "le",
    "\\ge": "ge",
    "\\sin": "sin",
    "\\cos": "cos",
    "\\tan": "tan",
    "^": "superscript",
    "\\in": "in",
    "\\ni": "ni",
    "\\notin": "notin",
    "\\not\\ni": "notni",
    "\\subset": "subset",
    "\\supset": "supset",
    "\\subseteq": "subseteq",
    "\\supseteq": "supseteq",
    "\\not\\subset": "notsubset",
    "\\not\\supset": "notsupset",
    "\\nsubseteq": "nsubseteq",
    "\\nsupseteq": "nsupseteq",
    "\\Rightarrow": "Rightarrow",
    "\\Longrightarrow": "Rightarrow",
    "\\Leftarrow": "Leftarrow",
    "\\Longleftarrow": "Leftarrow",
    "\\Leftrightarrow": "Leftrightarrow",
    "\\Longleftrightarrow": "Leftrightarrow",
}


//#endregion


//#region VARS & PROPERTIES
//////////////////////////////////////////////
///////////////* GLOBAL VAR */////////////////
const functions = {
    getfracEndIndex: getFracEndIndex,
    getsqrtEndIndex: getSqrtEndIndex,
    getleftEndIndex: getLeftEndIndex,
    getlimEndIndex: getLimEndIndex,
    getsctEndIndex: getSctEndIndex,
    getsuperscriptEndIndex: getSuperScriptEndIndex,

    readfrac: readFrac,
    readsqrt: readSqrt,
    readlim: readLim,
    readunder: readUnder,
    readabove: readAbove,
    readle: readLe,
    readge: readGe,
    readsin: readSin,
    readcos: readCos,
    readtan: readTan,
    readsuperscript: readSuperScript,
    readin: readIn,
    readni: readNi,
    readnotin: readNotIn,
    readnotni: readNotNi,
    readsubset: readSubset,
    readsupset: readSupset,
    readsubseteq: readSubseteq,
    readsupseteq: readSupseteq,
    readnotsubset: readNotSubset,
    readnotsupset: readNotSupset,
    readnsubseteq: readNSubseteq,
    readnsupseteq: readNSupseteq,
    readRightarrow: readRightArrow,
    readLeftarrow: readLeftArrow,
    readLeftrightarrow: readLeftRightArrow,
}

// let equation = "x=\\frac{-b \\pm \\sqrt{b^2 -14ac}}{2a}"
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
var equation = 'x^{2}+2x + 1'
// var equation = "\\frac{n!}{k!(n-k)!} = \\binom{n}{k} = _{n}\\mathrm{C}_{k}"
// var equation = "f^{\\prime}(x)=\lim_{h \\to 0}\\frac{f(x+h)-(x)}{h}"
// var equation = " x = \\frac{\\frac{1\\times 2y}{1+x}}{4ac + \\sqrt{x+2}}\\pm b"
// var equation = "\\frac{ 12 }{ \\sqrt { 22 }+\\frac{ 1 }{ \\sqrt { 2 } +\\frac { 1 }{ \\sqrt { 2 } + 1}}} "
// var equation = "2\\times2 + 4xy - \\sqrt{4 + \\sqrt{x+2}} + \\frac{-b \\pm \\sqrt{b -4ac}}{2a}"
// var equation = "31a +  \\lim_{x\\to0} \\frac{2x}{3a}"
// var equation = "\\frac{11}{12a}"
// var equation = "\\sqrt{5}+2\\le2\\times3<123"
// var equation = "A\\Longleftrightarrow B"
// var equation = "\\sqrt{5}+2 \\le a2"
// var equation = "\\sqrt{5}+2=2\\times3"
// var equation = "\\sqrt{5} + 1 = 12\\infty";
// var equation = "\\sin(\\sqrt{2} + \\sin(3)) \\div \\tan(3) + \\cos(2)"
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
    // const opDictLen = Object.keys(firstPriority).length; 
    for (let key in Data.firstPriority) {
        console.log("key: ", key);
        const endIdx = idx + key.length;
        const subExpr = expression.substring(idx, endIdx);
        // console.log(subExpr);
        // console.log(key);
        if (subExpr === key) {
            resultDict['opName'] = key;
            resultDict['isOp'] = 1;
            resultDict['opLength'] = key.length;
            break;
        }
    }

    for (let key in Data.math_expression) {
        //console.log(key);
        const endIdx = idx + key.length;
        const subExpr = expression.substring(idx, endIdx);
        console.log(subExpr);
        console.log(key);
        if (subExpr === key) {
            resultDict['opName'] = key;
            resultDict['isOp'] = 0;
            resultDict['opLength'] = key.length;
            break;
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

function isInDic(expression, keyName) {
    if (Data[keyName] && Data[keyName][expression]) {
        return true;
    } else {
        return false;
    }
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
    console.log("getSqrtEndIndex", expression, idx);
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
    console.log("getSqrtEndIndex", endIdx);
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
        }
        idx += 1;
    }
    return endIdx;
}
function getSctEndIndex(expression, idx) {
    console.log("getSinEndIndex", expression, idx);
    let stack = [];
    var braceCnt = 0
    var endIdx = 0;

    while (idx < expression.length) {
        if (expression[idx] === "(") {
            if (stack.length === 0 && braceCnt < 1) {
                // braceCnt += 1;
            }
            stack.push("{");
        }
        else if (expression[idx] === ")") {
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
    console.log("getSinEndIndex", endIdx);
    return endIdx;
}
function getSuperScriptEndIndex(expression, idx) {
    console.log("getSuperScriptEndIndex", expression, idx);
    let stack = [];
    var braceCnt = 0
    var endIdx = 0;

    while (idx < expression.length) {
        if (expression[idx] === "{") {
            stack.push("{");
        }
        else if (expression[idx] === "}") {
            stack.pop();
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
    console.log("readSqrt: ", formula); 
    var command = [];
    var insideofSqrt = formula.slice(6, -1); // 루트 안의 값
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

/** 부등호 **/
// <
function readUnder(formulaList) {
    console.log("read/Under: ", formulaList);
    var frontCommand = []
    var backCommand = []
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    let text = "";
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 보다";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 가 크다.";


    return text;
}
// >
function readAbove(formulaList) {
    var frontCommand = []
    var backCommand = []
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    let text = "";
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 보다";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 가 작다.";


    return text;
}
// <=
function readLe(formulaList) {
    var frontCommand = []
    var backCommand = []
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    let text = "";
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 보다";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 가 크거나 같다.";


    return text;
}
// <=
function readGe(formulaList) {
    var frontCommand = []
    var backCommand = []
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    let text = "";
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 보다";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 가 작거나 같다.";


    return text;
}
/** 싸인 **/
function readSin(formula){   
    console.log("readSin: ", formula); 
    var command = [];
    var insideofSqrt = formula.slice(5, -1); // 루트 안의 값
    var splitExp = splitExpression(insideofSqrt, command);
    var text = "싸인시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += " 싸인끝";

    return text;
}
/** 코싸인 **/
function readCos(formula){   
    var command = [];
    var insideofSqrt = formula.slice(5, -1); // 루트 안의 값
    var splitExp = splitExpression(insideofSqrt, command);
    var text = "코싸인시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += " 코싸인끝";

    return text;
}
/** 탄젠트 **/
function readTan(formula){   
    var command = [];
    var insideofSqrt = formula.slice(5, -1); // 루트 안의 값
    var splitExp = splitExpression(insideofSqrt, command);
    var text = "탄젠트시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += " 탄젠트끝";

    return text;
}
/** 위첨자 **/
function readSuperScript(formula){   
    console.log("readSuperScript: ", formula); 
    var command = [];
    var insideofSuperScript = formula.slice(3, -1); // 루트 안의 값
    var splitExp = splitExpression(insideofSuperScript, command);
    var text = "위첨자시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += " 위첨자끝";

    return text;
}
/** 원소 포함 **/
function readIn(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "원소";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 에 포함된다.";


    return text;
}
function readNi(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 에 원소 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 가 포함된다.";


    return text;
}
function readNotIn(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "원소";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 에 포함되지 않는다.";


    return text;
}
function readNotNi(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 가 원소 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 에 포함되지 않는다.";


    return text;
}
/** 집합 포함 **/
function readSubset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 에 포함된다.";


    return text;
}
function readSupset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 를 포함한다.";


    return text;
}
function readSubseteq(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 의 모든 요소가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 에 포함되거나 같다.";


    return text;
}
function readSupseteq(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 의 모든 요소를 포함하거나 같다.";


    return text;
}
function readNotSubset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 의 모든 요소가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 에 포함되지 않는다.";


    return text;
}
function readNotSupset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 의 모든 원소를 포함하지 않는다.";


    return text;
}
function readNSubseteq(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 의 모든 원소가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 에 속하지 않거나 같은 집합이 아니다.";


    return text;
}
function readNSupseteq(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 에 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 의 모든 원소가 속하지 않거나 같은 집합이 아니다.";


    return text;
}
/** 필요 조건 **/
function readRightArrow(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 가 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 의 필요 조건";
    return text;
}
/** 충분 조건 **/
function readLeftArrow(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 가 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 의 충분 조건";


    return text;
}
/** 필요충분 조건 **/
function readLeftRightArrow(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += " 가 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += " 의 필요충분 조건";


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
    let initExp = [];

    // 처음 분해
    let hasZeroPriorityOnce = 0;
    // 부등호, 집합 기호가 "한 개" 있는지 확인 -> " "기준으로 쪼개서 zeroPriority 찾기
    const splitSpace = expression.split(" ")
    var elements = [];
    var singleStartIdx = 0;
    var singleEndIdx = 0;
    splitSpace.forEach(function(el) {
        var tempEx = el.match(/[a-zA-Z]+|[0-9]+|\\[a-zA-Z]+_{|\\[a-zA-Z]+\{|\\[a-zA-Z]+\\[a-zA-Z]+|\\[a-zA-Z]+|\^\{|\\_{|[^\sA-Za-z0-9]/g);
        tempEx.forEach(function(i) {
            elements.push(i);
        })
    });
    

    for (var i = 0; i < elements.length; i++) {
        if (isInDic(elements[i], "zeroPriority")) {
            hasZeroPriorityOnce += 1;
            singleStartIdx = expression.indexOf(elements[i]);
            singleEndIdx = singleStartIdx + elements[i].length;
            console.log(`Value: ${elements[i]}, Index: ${singleStartIdx}, expression[index]: ${expression.slice(singleStartIdx,singleEndIdx)}`);
        }
        else {
            hasZeroPriorityOnce += 0;
        }
    }
    console.log("hasZeroPriorityOnce: ", hasZeroPriorityOnce);
    if (hasZeroPriorityOnce === 1) {
        // 부등호, 집합 기호 등 우선순위 0순위 연산자가 있는 경우
        console.log("0순위 연산기호로 쪼개기")
        
        var frontZeroPriority = expression.slice(0, singleStartIdx);
        var backZeroPriority = expression.slice(singleEndIdx);
        console.log("frontZeroPriority: ", frontZeroPriority);
        console.log("backZeroPriority: ", backZeroPriority);
        initExp.push(frontZeroPriority);
        commandArr.push(expression.slice(singleStartIdx, singleEndIdx));
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
    console.log("splitExpression: ", expression, command);
    
    // console.log("expression", expression);
    // 1순위 우선순위 연산자 기준 쪼개기
    while (idx < expression.length) {
        console.log("splitExp", splitExp);
        console.log("command", command);
        // 연산자가 수 있는 것 추정
        // only 사칙연산자도 되는 것, \\times, \\pm 같은 연산자
        //console.log(idx, "번째: ", expression[idx]);
        // if ()
        // console.log(countOccurrences(expression, expression[idx]));
        
        if (expression[idx] === "\\[a-zA-Z]\\" || expression[idx] === "\\" || isInDic(expression[idx], "firstPriority")) {
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
                // console.log("asdfasdf: ", result.opName)
                let opName = endIdxFuncNames[result.opName]
                // console.log("Asdf", opName);
                let funcName = `get${opName}EndIndex`; // <, > 때문에 수정
                //command[splitExp.length] = result.opName;
                command.push(result.opName);
                
                if (funcName) {
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
// 이쪽은 숫자가 붙어서 들어와야 함
function convertElement(element, command){
    // 더이상 분해 안되는 원소인 경우
    // 0순위 우선순위 명령어인 경우 -> 이미 쪼개져서 들어옴
    if (typeof command !== 'undefined' && isInDic(command[0], "zeroPriority")) {
        let opName = readFuncNames[command[0]];
        var funcName = `read${opName}`;
        console.log("funcName in functions", funcName in functions);
    
        if(funcName in functions) {
            command.shift();
            return functions[funcName](element);
        }
        else return "No Function Exists.";
    }
    else if(isAtom(element)) return matchText(element);
    
    // 1순의 우선순위 명령어인 경우
    else if(element.startsWith(command[0])) {
        let opName = readFuncNames[command[0]];
        console.log("convertElement: opName", opName);
        var funcName = `read${opName}`;
    
        if(funcName in functions) {
            command.shift();
            return functions[funcName](element);
        }
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