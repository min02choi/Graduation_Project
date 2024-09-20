
function getZeroPriorityInfo(expression) {
    const splitSpace = expression.split(" ");
    let zeroPriorityCnt = 0;
    // 부등호/집합/명제 연산자 기준으로 앞 수식 + 뒤 수식을 쪼개기 위한 idx
    let singleStartIdx = 0; 
    let singleEndIdx = 0;
    var elements = []; // 쪼개진 연산자를 넣는 리스트

    // 모든 수식을 쪼갬 -> 부등호/집합/명제 연산자가 있는지 확인하기 위함
    splitSpace.forEach(function(el) {
        var tempEx = el.match(/[a-zA-Z]+|[0-9]+|\\[a-zA-Z]+_{|\\[a-zA-Z]+\{|\\[a-zA-Z]+\\[a-zA-Z]+|\\[a-zA-Z]+|\^\{|\\_{|[^\sA-Za-z0-9]/g);

        if (tempEx !== null) {
            tempEx.forEach(function(i) {
                elements.push(i);
            });
        }
    });

    for (var i = 0; i < elements.length; i++) {

    }
}

function isInDic(expression, keyName) {
    console.log("isInDic: ", expression, keyName);
    if (Data[keyName] && Data[keyName][expression]) {
        return true;
    } else {
        return false;
    }
}

function printAA() {
    console.log("AA");
}

export default RefactorUtils;