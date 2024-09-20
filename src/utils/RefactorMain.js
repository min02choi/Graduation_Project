import { RefactorUtils } from "./RefactorUtils";
/* 텍스트 변환 함수 - main */
// 재귀적(DFS)으로 구현
// zeroPriority인지 아닌지 구별 후 splitExpression 함수를 통해서 재귀적으로 수식을 분리
// 
export function convert2Text(expression) {
    let res = []; // 한글로 변환된 수식을 넣는 변수

    // 괄호, 공백 처리
    let newEquation = expression.replace(/\s/g, "");
    let initExp = [];

    // zeroPriority가 한 개인 경우(부등호, 집합 명제가 해당)
    
}
RefactorUtils.printAA();