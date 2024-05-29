//#region ERROR
// ! 괄호 \\right \\left써있는 경우는 두번씩 중복일어남
// ! 제곱 처리 고려필요
//#endregion

//#region IMPORT_DATA
// const Data = require("./TempData.js")

// const Data = require("./Data.js")
const { numToKorean, FormatOptions } = require('num-to-korean');

// const { numToKorean, FormatOptions } = require('num-to-korean');

const Data = {
    zeroPriority: {
        "<": "0순위 크다",
        ">": "0순위 작다",
        "\\le": "0순위 크거나 같다",
        "\\ge": "0순위 작거나 같다.",
        "\\in": "0순위 원소가 포함한다.",
        "\\ni": "0순위 원소가 포함된다.",
        "\\notin": "0순위 원소가 포함되지 않는다.",
        "\\not\\ni": "0순위 원소가 포함되지 않는다.",
        "\\subset": "0순위 집합을 포함한다.",
        "\\supset": "0순위 집합을 포함한다.",
        "\\subseteq": "0순위 집합을 포함하거나 같다.",
        "\\supseteq": "0순위 집합을 포함하거나 같다.",
        "\\not\\subset": "0순위 집합을 포함하지 않는다.",
        "\\not\\supset": "0순위 집합을 포함하지 않는다.",
        "\\nsubseteq": "0순위 집합을 포함하거나 같다.",
        "\\nsupseteq": "0순위 집합을 포함하거나 같다.",
        "\\Rightarrow": "0순위 필요조건",
        "\\Longrightarrow": "0순위 필요조건",
        "\\Leftarrow": "0순위 충분조건",
        "\\Longleftarrow": "0순위 충분조건",
        "\\Leftrightarrow": "0순위 필요충분조건",
        "\\Longleftrightarrow": "0순위 필요충분조건",
    },

    firstPriority: { // 원자 연산자 -> 우선순위가 필요할 듯,,, 0순위 부등호, 집합기호, 1순위(원자 단위) firstPriority: 일대일 매칭이 가능한 것, 2순위: 괄호 포함
        "+": "플러스 ",
        "-": "마이너스 ",
        "\\div": "나누기 ",
        "/": "나누기 ",
        "\\times": "곱하기 ",
        "\\pm": "플마 ",
        "\\mp": "마플 ",
        "=": "는(은) ",
        "\\infty": " 무한대 ",
        "\\pi": " 파이 ",
        "\\triangle": " 삼각형 ",
        "\\Box": " 사각형 ",
        "\\angle": " 각 ",
        "<": " 크다 ",
        ">": " 작다 ",
        "\\le": " 크거나 같다 ",
        "\\ge": " 작거나 같다 ",
        "\\in": " 가 오른쪽에 포함된다 ",
        "\\ni": " 가 왼쪽에 포함된다 ",
        "\\notin": " 가 오른쪽에 포함되지 않는다 ",
        "\\not\\ni": " 가 왼쪽에 포함되지 않는다 ",
        "\\subset": " 가 오른쪽에 포함된다 ",
        "\\supset": " 가 왼쪽에 포함된다 ",
        "\\subseteq": " 가 오른쪽에 포함되거나 같다 ",
        "\\supseteq": " 가 왼쪽에 포함되거나 같다 ",
        "\\not\\subset": " 가 오른쪽에 포함되지 않는다 ",
        "\\not\\supset": " 가 왼쪽에 포함되지 않는다 ",
        "\\nsubseteq": " 가 오른쪽에 포함하지 않거나 같은 집합이 아니다 ",
        "\\nsupseteq": " 가 왼쪽에 포함하지 않거나 같은 집합이 아니다 ",
        "\\cap": " 교집합 ",
        "\\cup": " 합집합 ",
        "\\varnothing": " 공집합 ",
        "\\sim": " 부정 ", // 부정 뿐만 아니라 비슷하지 않음이라는 뜻도 있음

        "_":"아래첨 ",
        "^":"위첨 ",

        "\\prime": "프라임 ",
    },

    number: {
        "0": "영 ",
        "1": "일 ",
        "2": "이 ",
        "3": "삼 ",
        "4": "사 ",
        "5": "오 ",
        "6": "육 ",
        "7": "칠 ",
        "8": "팔 ",
        "9": "구 ",
    },

    word: {
        "a": "에이 ",
        "b": "비 ",
        "c": "씨 ",
        "e": "이 ",
        "f": "에프 ",
        "g": "지 ",
        "h": "에이치 ",
        "p": "피 ",
        "x": "엑스 ",
        "y": "와이 ",
        "z": "지 ",
        "A": "대문자 에이 ",
        "B": "대문자 비 ",
        "C": "대문자 씨 ",
        "F": "대문자 에프 ", 
    },

    math_expression: {
        // "^": ["제곱", 2],
        //"\\frac": ["분수 ", 2],
        //"\\sqrt": ["루트 ", 1],
        //"\\left": ["열림 ", 1],
        //"\\right": ["닫힘 ", 1],
        //"\\lim":["리미트 ", 2],
        // "\\sin": ["싸인", 2],
        // "\\cos": ["코싸인", 2],
        // "\\tan": ["탄젠트", 2],
        //"\\dot": ["무한소수", 2],
        // "\\overline": ["무한소수", 2],

        "\\frac": ["분수 ", "frac", 2],
        "\\sqrt": ["루트 ", "sqrt", 1],
        "\\left": ["열림 ", "left", 1],
        "\\right": ["닫힘 ", "right", 1],
        "\\lim":["리미트 ", "lim", 2],
        "^": ["위첨자 ", "superscript", 1],
        "_": ["아래첨자 ", "subscript", 1],

        "\\sin": ["싸인", "sct", 2],
        "\\cos": ["코싸인", "sct", 2],
        "\\tan": ["탄젠트", "sct", 2],
        "\\overline": ["무한소수", "overline", 2],
        "\\dot": ["무한소수", "dot", 2],

    },

    math_expression_pair: {
        // "(": ["괄호 ", ")"],
        // "{": ["중괄호 ", "}"],
        // "[": ["대괄호 ", "]"],
        // "|": ["절댓값 ", "|"],

        "(": ["괄호 ", ")"],
        "\\(": ["괄호 ", "\\)"],
        "\\{": ["중괄호 ", "\\}"],
        "[": ["대괄호 ", "]"],
        "\\[": ["대괄호 ", "\\]"],
        "|": ["절댓값 ", "|"],
        "\\|": ["절댓값 ", "\\|"],
    }
};

//#endregion


//#region VARS & PROPERTIES
//////////////////////////////////////////////
///////////////* GLOBAL VAR */////////////////

const endIdxFuncNames = {
    "\\frac": getFracEndIndex,
    "\\sqrt": getSqrtEndIndex,
    "\\left": getLeftEndIndex,
    "\\lim": getLimEndIndex,
    "\\sin": getSctEndIndex,
    "\\cos": getSctEndIndex,
    "\\tan": getSctEndIndex,
    "\\overline": getOverlineEndIndex,
    "\\dot" : getDotEndIndex,
    "^": getSuperscriptEndIndex,
    "_": getSubscriptEndIndex,
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
    "\\nsubseteq": readNSubseteq,
    "\\nsupseteq": readNSupseteq,
    "\\Rightarrow": readRightArrow,
    "\\Longrightarrow": readRightArrow,
    "\\Leftarrow": readLeftArrow,
    "\\Longleftarrow": readLeftArrow,
    "\\Leftrightarrow": readLeftRightArrow,
    "\\Longleftrightarrow": readLeftRightArrow,
    "^":  readSuperscript, 
    "_":  readSubscript ,

}


// let equation = "x=\\frac{-b \\pm \\sqrt{b^2 -14ac}}{2a}" // -> [가능] 이 수식에서 b^2 부분을 b^{2}로 변형하면 됨(LaTex 형태 문제)

// var equation = "\\frac{b}{a} + \\sqrt{2}";
// var equation = "2\\times2 + 4xy - \\sqrt{4 + \\sqrt{x+2}} + \\frac{-b \\pm \\sqrt{b^{2+a} -4ac}}{2a}"
// var equation = "3110000123123\\times x+22000001yz"
// var equation = "\\frac{1\\times 2}{1+x}\\times2+y"  
//  var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div(1/4)+ac";
// var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div\\left ( 1+y \\right ) +ac";
// var equation = "2\\times 2 + \\sqrt{x+2} + 2\\div\\left ( 1+y \\right ) +\\frac{a}{b}"; 
// var equation = "f\\left(x \\right) = x+ 1"

var equation = "\\dot{2}\\dot{4}\\dot{3}+ 2\\div(1/4)+ac";
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
    if (Data[keyName] && Data[keyName][expression]) {
        return true;
    } else {
        return false;
    }
}
// 부등호, 집합 기호가 "한 개" 있는지 확인 -> " "기준으로 쪼개서 zeroPriority 찾기
function isZeroPriorityOnce(expression) {
    var zeroPriorityCnt = 0;
    const splitSpace = expression.split(" ")
    var elements = [];
    var singleStartIdx = 0;
    var singleEndIdx = 0;
    console.log("isZeroPriorityOnce", expression);
    
    splitSpace.forEach(function(el) {
        var tempEx = el.match(/[a-zA-Z]+|[0-9]+|\\[a-zA-Z]+_{|\\[a-zA-Z]+\{|\\[a-zA-Z]+\\[a-zA-Z]+|\\[a-zA-Z]+|\^\{|\\_{|[^\sA-Za-z0-9]/g);
        if (tempEx !== null) {
            tempEx.forEach(function(i) {
                elements.push(i);
            });
        }
    });
    

    for (var i = 0; i < elements.length; i++) {
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

// 특수경우: 우측에 쌍이 있음. 시작은 \\left
// math_expression_pair 에서 어떤것인지 확인하고
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

function getOverlineEndIndex(expression, idx) {
    // console.log("getSqrtEndIndex", expression, idx);
    // let stack = [];
    // var braceCnt = 0
    // var endIdx = 0;

    // while (idx < expression.length) {
    //     if (expression[idx] === "{") {
    //         if (stack.length === 0 && braceCnt < 1) {
    //             // braceCnt += 1;
    //         }
    //         stack.push("{");
    //     }
    //     else if (expression[idx] === "}") {
    //         stack.pop();
    //         // 분모까지 마무리
    //         if (stack.length === 0) {
    //             braceCnt += 1;
    //             if (braceCnt == 1) {
    //                 endIdx = idx
    //                 break
    //             }
    //         }
    //     }
    //     idx += 1;
    // }
    // console.log("getOverlineEndIndex", endIdx);
    // return endIdx;
}

function getDotEndIndex(expression, idx) {
    console.log("getDotEndIdx", expression, idx);
    let searchTerm = "dot";
    let indices = []; let stack = [];
    let currentIndex = expression.indexOf(searchTerm);
    let endIdx = 0;
    
    while (currentIndex !== -1) {
        indices.push(currentIndex);
        currentIndex = expression.indexOf(searchTerm, currentIndex + 1);
    }
    console.log(`Found '${searchTerm}' at indices: ${indices}`);
    
    for(let i=indices[indices.length-1]+3; i < expression.length; i++){
        if(expression[i] == "{") stack.push(expression[i]);
        if(expression[i] == "}") stack.pop();
        if(stack.length == 0){
            endIdx = i; break;
        }
    }
 
    return endIdx;
}

// function getSuperScriptEndIndex(expression, idx) {
//     console.log("getSuperScriptEndIndex", expression, idx);
//     let stack = [];
//     var braceCnt = 0
//     var endIdx = 0;

//     while (idx < expression.length) {
//         if (expression[idx] === "{") {
//             stack.push("{");
//         }
//         else if (expression[idx] === "}") {
//             stack.pop();
//             if (stack.length === 0) {
//                 braceCnt += 1;
//                 if (braceCnt == 1) {
//                     endIdx = idx
//                     break
//                 }
//             }
//         }
//         idx += 1;
//     }
//     return endIdx;
// }

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
    var text = "루트시작 ";
    var stack = [];
    let exponent = 0;
    let idx = 0;

    if(formula[5] == '['){
        for(let i =5; i<formula.length; i++){
            if(formula[i] == "[") stack.push(formula[i]);
            if(formula[i] == "]") stack.pop();
            if(stack.length == 0){
                exponent = formula.slice(6, i); idx = i;
                break;
            }
        } 
        let inside = formula.slice(idx+2, -1);
        var splitExp = splitExpression(inside, command);
        splitExp.forEach(function(element){
            text += convertElement(element, command);
        })

        text += "의 ";
        
       // console.log("지수", exponent);
        var splitExp = splitExpression(exponent, command);
        splitExp.forEach(function(element){
            text += convertElement(element, command);
        })
        
       // console.log("제곱근 ", inside);
        text += "제곱근 ";
        text += "루트끝 ";

    }

    else{
        var insideofSqrt = formula.slice(6, -1); // 루트 안의 값
        var splitExp = splitExpression(insideofSqrt, command);
        var text = "루트시작 ";

        splitExp.forEach(function(element){
            text += convertElement(element, command);
        })
        text += "루트끝 ";
    } 

    return text;
}

/** 리미트 **/
function readLim(formula){
    var command = [];
    var idx = formula.indexOf("\\to");
    var start = formula.slice(6, idx);
    var end = formula.slice(idx + 3, -1);

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

/** 무한소수 **/
function readDot(formula){
    console.log("readDot: ", formula);
    let text = ""; 
    let stack = [];  
    var command = []; 
    let startIdx = 4;

    for(let i=4; i<formula.length;i++){ 
        if(formula[i] == "{") {
            stack.push(formula[i]);
            startIdx = i;
        }

        if(formula[i] == "}") {
            stack.pop();
            if(stack.length == 0){
                let split = formula.slice(startIdx, i); 
                text += convertElement(split, command);
        } 
        } 
    }
    text += "가 반복되는 무한소수";
    
    return text;
}

/** 부등호 **/
// <
function readUnder(formulaList) {
    console.log("read/Under: ", formulaList);
    var frontCommand = []
    var backCommand = []
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    let text = "부등식 시작 ";
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "보다 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "가 크다 부등식 끝 ";

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
    text += "보다 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "가 작다. ";

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
    text += "보다 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "가 크거나 같다. ";


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
    text += "보다 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "가 작거나 같다. ";

    return text;
}

/** 싸인 **/
function readSin(formula){   
    console.log("readSin: ", formula); 
    var command = [];
    var insideofSqrt = formula.slice(5, -1);  
    var splitExp = splitExpression(insideofSqrt, command);
    var text = "싸인시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += "싸인끝 ";

    return text;
}

/** 코싸인 **/
function readCos(formula){   
    var command = [];
    var insideofSqrt = formula.slice(5, -1);  
    var splitExp = splitExpression(insideofSqrt, command);
    var text = "코싸인시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += "코싸인끝 ";

    return text;
}

/** 탄젠트 **/
function readTan(formula){   
    var command = [];
    var insideofSqrt = formula.slice(5, -1);  
    var splitExp = splitExpression(insideofSqrt, command);
    var text = "탄젠트시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += "탄젠트끝 ";

    return text;
}

/** 위첨자 **/
function readSuperScript(formula){   
    console.log("readSuperScript: ", formula); 
    var command = [];
    var insideofSuperScript = formula.slice(3, -1);  
    var splitExp = splitExpression(insideofSuperScript, command);
    var text = "위첨자시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += "위첨자끝 ";

    return text;
}

/** 원소 포함 **/
function readIn(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "원소 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함된다. ";

    return text;
}
function readNi(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "에 원소 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "가 포함된다. ";

    return text;
}

function readNotIn(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "원소 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함되지 않는다. ";

    return text;
}

function readNotNi(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "가 원소 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함되지 않는다. ";

    return text;
}

/** 집합 포함 **/
function readSubset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함된다. ";

    return text;
}

function readSupset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "를 포함한다. ";

    return text;
}

function readSubseteq(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "의 모든 요소가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함되거나 같다. ";

    return text;
}

function readSupseteq(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "의 모든 요소를 포함하거나 같다. ";

    return text;
}

function readNotSubset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "의 모든 요소가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함되지 않는다. ";

    return text;
}

function readNotSupset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "의 모든 원소를 포함하지 않는다. ";

    return text;
}

function readNSubseteq(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "의 모든 원소가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 속하지 않거나 같은 집합이 아니다. ";

    return text;
}

function readNSupseteq(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "에 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "의 모든 원소가 속하지 않거나 같은 집합이 아니다. ";

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
    text += "가 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "의 필요 조건 ";

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
    text += "가 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "의 충분 조건 ";

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
    text += "가 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "의 필요충분 조건 ";

    return text;
}

/** 선분 **/
function readOverline(formula){
    console.log("read overline: ", formula); 
    // var text ="";
    // var insideofDecimal = formula.slice(10, -1);   
    // console.log("dpdpdpdpd", insideofDecimal);

    // // 무한소수인 경우 \overline{}안에 숫자만 들어갈 가능성이 훨씬 높음**
    // // 숫자만 읽어주도록 하는게 더 나을 듯 함
    // for(let char of insideofDecimal){
    //     if(char in Data.number) text += Data.number[char];
    // }

    // text += "의 무한소수 ";

    // return text;
}

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
    let convertedTEXT = "";
    res.forEach(function(element){
        convertedTEXT += element;
    })
    console.log("결과: ", convertedTEXT);

    return convertedTEXT;
}

function splitExpression(expression, command) {
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
                console.log("11", endIdxFuncName);
                if (endIdxFuncName) {
                    let result = endIdxFuncName(expression, idx); // 함수 호출
                    // console.log("함수 동적 호출", funcName);
                    // console.log(result);        // 전체 수식에서의 인덱스임

                    console.log(temp)
                    if (temp !== "") {
                        splitExp.push(temp);
                    }
                    temp = "";

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
convert2Text(equation);

const number = numToKorean(0);
console.log(number)
// const number2 = numToKorean(11111, FormatOptions.LINGUAL);

//#endregion