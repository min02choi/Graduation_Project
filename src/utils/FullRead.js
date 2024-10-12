import { splitExpression, convertElement } from "./FullDivEquation";
import { Data } from "./FullData";
import { isAtom, isUnion } from "./FullUtils";

//#region READ_FUNCS
/** 분수 **/
export function readFrac(formula){
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

    let text = "분수시작 분모시작 ";

    let splitExp = splitExpression(denominator, command);
    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })

    text += "분모끝 분자시작 ";
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
export function readSqrt(formula){   
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
export function readLim(formula){
    var command = [];
    var idx = formula.indexOf("\\to");
    var start = formula.slice(6, idx);
    var end = formula.slice(idx + 3, -1);

    let text = "리미트 ";

    let splitExp = splitExpression(start, command);
    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })

    text += "# ";

    splitExp = splitExpression(end, command);
    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })

    text += "으로 갈 때 ";

    return text;
}

/** 무한소수 **/
export function readDot(formula){
    console.log("readDot: ", formula);
    let text = "", res=""; 
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
    res = text + ", " + text;
    res += "# 반복되는 무한소수 ";

    return res;
}

/** 부등호 **/
// <
export function readUnder(formulaList) {
    console.log("read/Under: ", formulaList);
    var frontCommand = []
    var backCommand = []
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    let text = "부등식시작 ";
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "보다 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "# 크다 ";

    return text;
}
// >
export function readAbove(formulaList) {
    var frontCommand = []
    var backCommand = []
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    let text = "부등식시작 ";
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "보다 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "# 작다. ";

    return text;
}
// <=
export function readLe(formulaList) {
    var frontCommand = []
    var backCommand = []
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    let text = "부등식시작 ";
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "보다 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "# 크거나같다. ";


    return text;
}
// <=
export function readGe(formulaList) {
    var frontCommand = []
    var backCommand = []
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    let text = "부등식시작 ";
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "보다 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "# 작거나같다. ";

    return text;
}

/** 싸인 **/
export function readSin(formula){   
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
export function readCos(formula){   
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
export function readTan(formula){   
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
export function readSuperScript(formula){   
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
export function readIn(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "원소 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "# 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함된다. ";

    return text;
}
export function readNi(formulaList) {
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
    text += "# 포함된다. ";

    return text;
}

export function readNotIn(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "원소 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "# 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함되지 않는다. ";

    return text;
}

export function readNotNi(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "# 원소 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함되지 않는다. ";

    return text;
}

/** 집합 포함 **/
export function readSubset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "# 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함된다. ";

    return text;
}

export function readSupset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "# 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "& 포함한다. ";

    return text;
}

export function readSubseteq(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "의 모든요소가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함되거나같다. ";

    return text;
}

export function readSupseteq(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "# 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "의 모든요소를 포함하거나같다. ";

    return text;
}

export function readNotSubset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "의 모든요소가 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "에 포함되지 않는다. ";

    return text;
}

export function readNotSupset(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "집합 ";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "# 집합 ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "의 모든원소를 포함하지 않는다. ";

    return text;
}



/** 필요 조건 **/
export function readRightArrow(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "# ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "의 필요조건 ";

    return text;
}

/** 충분 조건 **/
export function readLeftArrow(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "# ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "의 충분조건 ";

    return text;
}

/** 필요충분 조건 **/
export function readLeftRightArrow(formulaList) {
    var frontCommand = []
    var backCommand = []
    let text = "";
    var frontSplitExp = splitExpression(formulaList[0], frontCommand);
    
    frontSplitExp.forEach(function(element){
        text += convertElement(element, frontCommand);
    })
    text += "# ";
    
    var backSplitExp = splitExpression(formulaList[1], backCommand); 
    backSplitExp.forEach(function(element) {
        text += convertElement(element, backCommand);
    })
    text += "의 필요충분 조건 ";

    return text;
}

/** 선분 **/
export function readOverline(formula){
    console.log("read overline: ", formula); 
    var command = []; 
 
    let stack = []; 
    let insideofOverline;
    for (var i=9; i < formula.length; i++) {
        if(formula[i] == "{") stack.push("{");
        else if(formula[i] == "}") {
            stack.pop();
            if(stack.length == 0) {
                insideofOverline = formula.slice(10, i);           
                break;
            }
        }
    } 

    let text = "선분시작 ";
    console.log("선분 안: ", insideofOverline);
    let splitExp = splitExpression(insideofOverline, command);
    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += "선분끝 ";

    return text; 
}

/** 반직선 **/
export function readOverRightArrow(formula){
    console.log("read 반직선: ", formula); 
    var command = []; 
    let text = "반직선시작 ";
    let stack = []; 
    let inside;

    for (var i=formula.indexOf("{"); i < formula.length; i++) {
        if(formula[i] == "{") stack.push("{");
        else if(formula[i] == "}") {
            stack.pop();
            if(stack.length == 0) {
                inside = formula.slice(formula.indexOf("{")+1, i);           
                break;
            }
        }
    } 
 
    console.log("반직선 안: ", inside);

    let splitExp = splitExpression(inside, command);
    splitExp.forEach(function(element){ 
        text += convertElement(element, command);
        
    });
    text += "반직선끝 ";
 

    return text; 
}

/** 직선 **/
export function overLeftRightArrow(formula){
    console.log("read 직선: ", formula); 
    var command = []; 
    let text = "직선시작 ";
    let stack = []; 
    let inside;

    for (var i=formula.indexOf("{"); i < formula.length; i++) {
        if(formula[i] == "{") stack.push("{");
        else if(formula[i] == "}") {
            stack.pop();
            if(stack.length == 0) {
                inside = formula.slice(formula.indexOf("{")+1, i);           
                break;
            }
        }
    } 
 
    console.log("직선 안: ", inside);

    let splitExp = splitExpression(inside, command);
    splitExp.forEach(function(element){ 
        text += convertElement(element, command);
        
    });
    text += "직선끝 ";
 

    return text; 
}

export function readLeft(formula){
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

export function readSuperscript(formula) {
    var command = [];
    var insideofScript = formula.slice(2, -1);
    var splitExp = splitExpression(insideofScript, command);
    var text = "의 제곱시작 ";
    var txt_element = "";
    var isUnionVar = true; // 단인수단항인가? -> splitExp로 판단해버리면 3ac 이런게 list로 들어가서 길이가 1로 나옴
    console.log("splitExp: ", splitExp);

    splitExp.forEach(function(element){
        txt_element += convertElement(element, command);
        // 단 한개라도 union에 해당 안되면(여기에 넣는 이유는 연산자가 포함되지 않아도 ac, 3ac는 단인수단항이 아니기 때문에 또, splitExp[0]으로 판단하기에는 a+c와 같은 경우도 있기 때문에
        // 하나하나 판단을 해야됨
        if (!isUnion(element)) {
            isUnionVar = false;
        }
    })
    text += txt_element + "제곱끝 ";
    console.log("isUnion(splitExp): ", isUnion(splitExp));

    if(isUnionVar){
        text = "의 " +  txt_element + "제곱 ";
    }

    return text;
}


export function readSubscript(formula) {
    var command = [];
    var insideofScript = formula.slice(2, -1);
    var splitExp = splitExpression(insideofScript, command);
    var text = "의 아래첨자시작 ";

    splitExp.forEach(function(element){
        text += convertElement(element, command);
    })
    text += "아래첨자끝 ";

    return text;
}

export function readMatrix(formula){
    // console.log("행렬: " ,formula);
    
    /* 행렬 추출 */ 
    let beginIdx = formula.indexOf("matrix}");
    let endIdx = formula.indexOf("\\end");
    // let insideofScript = formula.slice(beginIdx + 10, endIdx);
    let insideofScript = formula.slice(beginIdx + 7, endIdx);
    console.log("행렬 정제:" + insideofScript);

    /* & \\ 개수로 행과 열 구하기 */
    const row = insideofScript.split('\\\\').length -1;
    const col = ((insideofScript.split('&').length - 1) + row) / row;

    let text = "행렬" + row + "행" + col +"열 시작 ";
    // let text = matchText(row) + "행 " + matchText(col) +"열 행렬시작 ";

    /* 원소 추출 후 convert */
    let elements = insideofScript.split(/&|\\\\/);
    elements.pop();
    console.log(elements);
    
    let cnt = 0;
    let rowCnt = 1;
    for(const element of elements){
        if(cnt++ % col == 0) {
            text += (rowCnt + "행시작 ");
            rowCnt++;
        }

        var command = [];
        let splitExp = splitExpression(element, command);
        splitExp.forEach(function(element){
            text += convertElement(element, command);
        })
    }
    
    text += "행렬끝 ";

    return text;
}
// #endregion