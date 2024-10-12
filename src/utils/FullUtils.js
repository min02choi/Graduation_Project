import {Data} from "./FullData";

const { numToKorean, FormatOptions } = require('num-to-korean');
//#region SUB_FUNC
// 현재 위치가 어떤 연산자인지 반환해주는 함수
// 딕셔너리에 있는 모든 연산자에 대해 확인하고, op와 idx를 반환
// opName, isOp, opLength
export function checkOperation(expression, idx) {
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

export function isInDic(expression, keyName) {
    console.log("isInDic: ", expression, keyName);
    if (Data[keyName] && Data[keyName][expression]) {
        return true;
    } else {
        return false;
    }
}
// 부등호, 집합 기호가 "한 개" 있는지 확인 -> " "기준으로 쪼개서 zeroPriority 찾기
export function isZeroPriorityOnce(expression) {
    var zeroPriorityCnt = 0;
    const splitSpace = expression.split(" ");
    var elements = [];
    var singleStartIdx = 0;
    var singleEndIdx = 0;
    console.log("isZeroPriorityOnce", expression);
    
    splitSpace.forEach(function(el) {
        var tempEx = el.match(/[a-zA-Z]+|[0-9]+|\\[a-zA-Z]+_{|\\[a-zA-Z]+\{|\\[a-zA-Z]+\\[a-zA-Z]+|\\[a-zA-Z]+|\^\{|\\_{|[^\sA-Za-z0-9]/g);
        // var tempEx = el.match(/[a-zA-Z]+|[0-9]+|\\[a-zA-Z]+_{|\\[a-zA-Z]+\{|\\[a-zA-Z]+\\[a-zA-Z]+|\\[a-zA-Z]/g);
        // console.log("isZeroPriority ele: ", el);
        if (tempEx !== null) {
            tempEx.forEach(function(i) {
                elements.push(i);
            });
        }
    });
    
    console.log("isZero{riorityOnce elements: ", elements);
    var getCur = 0
    for (var i = 0; i < elements.length; i++) {
        // console.log(elements[i], " isInDic(elements[i] ", isInDic(elements[i], "zeroPriority"));
        getCur += elements[i].length;
        console.log("getCur: ", getCur);
        if (isInDic(elements[i], "zeroPriority")) {
            zeroPriorityCnt += 1;
            singleStartIdx = getCur - elements[i].length;
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
export function splitString(str){
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
export function isAtom(char){
    if(char in Data.firstPriority || char in Data.number || char in Data.word || isNumber(char)){
        return true;
    }
    return false;
}

/* 단인수단항 확인 */
export function isUnion(char) {
    // 첫 번째 경우: 입력이 숫자인 경우 -> 여러 자릿수도 허용
    if (isNumber(char)) {
        return true;
    }

    // 두 번째 경우: 단일 문자가 Data에 있는 경우
    if (char.length === 1 && (char in Data.word)) {
        return true;
    }

    // 그 외의 경우: 두 문자 이상이거나 여러 문자 조합 -> false
    return false;
}

/* 숫자로만 이루어져있는지 판단 */
function isNumber(char) {
    for (var i = 0; i < char.length; i++) {
        if (char[i] < '0' || char[i] > '9') return false;
    }
    return true;
}

/* 텍스트 매치 함수 */
export function matchText(char){
    if(char in Data.firstPriority) return Data.firstPriority[char];
    if(char in Data.word) return Data.word[char];
    // if(char in Data.number) return Data.number[char];
    const num = numToKorean(parseInt(char), FormatOptions.LINGUAL);
    console.log("- 숫자로의 변환: ", num);
    // if (isNumber(char)) return numToKorean(parseInt(char), FormatOptions.LINGUAL) + " ";
    // num-to-korean API 0 처리를 못하네...?
    if (isNumber(char) && parseInt(char) !== 0) return numToKorean(parseInt(char), FormatOptions.LINGUAL) + " ";
    else if (parseInt(char) === 0) return "영 "; 
    // if (isNumber(char) && parseInt(char) !== 0) return char + " ";
    // else if (parseInt(char) === 0) return "영 ";
}

/* 조사 위치 찾아 은/는 삽입하는 함수 */
export function hasLastConsonantLetter(text) {
    const lastChar = text.trim().charAt(text.length - 1);
    if (/[가-힣]/.test(lastChar)) {
        return (lastChar.charCodeAt(0) - "가".charCodeAt(0)) % 28 !== 0;
    }
    return false;
}


export function replaceAsterisks(sentence) {
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

export function replaceAsterisks2(sentence) {
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

export function replaceAsterisks3(sentence) {
    let modSentence = sentence;

    // '#'를 찾아가며 처리
    while (modSentence.includes('&')) {
        const asteriskIdx = modSentence.indexOf('&');
        const textBeforeAsterisk = modSentence.slice(0, asteriskIdx).trim();
        const particle = hasLastConsonantLetter(textBeforeAsterisk) ? "을" : "를";
        modSentence = modSentence.replace('&', particle);
    }
    return modSentence;
}
//#endregion