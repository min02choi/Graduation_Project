import { Data } from "./FullData";
//#region GET_END_IDX_FUNCS
export function getFracEndIndex(expression, idx) {
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

export function getSqrtEndIndex(expression, idx) {
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

export function getLimEndIndex(expression, idx){
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

export function getSuperscriptEndIndex(expression, idx) {
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

export function getSubscriptEndIndex(expression, idx) {
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
export function getLeftEndIndex(expression, idx) {
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
export function getSctEndIndex(expression, idx) {
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

export function getOverlineEndIndex(expression, idx) {
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

export function getDotEndIndex(expression, idx) {
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

// export function getSuperScriptEndIndex(expression, idx) {
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

export function getMatrixEndIndex(expression){
    console.log("getMatrixEndIdx: ", expression);
    let searchTerm = "matrix}";
    let lastIndex = -1;
    let currentIndex = expression.indexOf(searchTerm);
    
    while (currentIndex !== -1) {
        lastIndex = currentIndex;
        currentIndex = expression.indexOf(searchTerm, currentIndex + 1);
    }

    console.log("Last matrix} index: ", lastIndex);
    lastIndex += 6;

    return lastIndex;
}
//#endregion
