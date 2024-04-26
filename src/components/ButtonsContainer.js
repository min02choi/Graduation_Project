import FormulaButton from "../components/FormulaButton";
import { useState } from "react";
/*
standard: 기본 수식
case: 경우의 수
setAndProp: 집합과 명제
*/
// FormulaButton input 값 리스트
const inputOpList = {
    standardInputOpList: [
        '+', '-', '\\times', '\\div', '=', '\\ne', 'x^{}', '\\sqrt{}', '\\sin ()', '\\cos ()', '\\tan ()'
    ],
    casesInputOpList: [
        '_{n}\\mathrm{P}_{k}', '_{n}\\mathrm{C}_{k}'
    ],
    setAndPropInputOpList: [
        '\\subset', '\\not\\subset', '\\supset', '\\not\\supset', '\\subseteq', '\\nsubseteq', '\\supseteq', '\\nsupseteq',
        '\\Rightarrow', '\\nRightarrow', '\\Leftarrow', '\\nLeftarrow',
        '\\Leftrightarrow', '\\nLeftrightarrow'
    ]
}
// FormulaButton 버튼에 그리는 수식 기호
const imgUrlList = {
    standardImgUrlList: [
        '+', '-', '\\times', '\\div', '=', '\\ne', 'x^{a}', '\\sqrt{a}', 'sin', 'cos', 'tan'
    ],
    casesImgUrlList: [
        '_{n}\\mathrm{P}_{k}', '_{n}\\mathrm{C}_{k}'
    ],
    setAndPropImgUrlList: [
        '\\subset', '\\not\\subset', '\\supset', '\\not\\supset', '\\subseteq', '\\nsubseteq', '\\supseteq', '\\nsupseteq',
        '\\Rightarrow', '\\nRightarrow', '\\Leftarrow', '\\nLeftarrow',
        '\\Leftrightarrow', '\\nLeftrightarrow'
    ]
}

function ButtonsContainer({input, setInput, opCategory}) {
    const opList = inputOpList[`${opCategory}InputOpList`];
    const urlList = imgUrlList[`${opCategory}ImgUrlList`];
    // console.log("ButtonsContainer: ", input);
    
    return (
        <div className="ButtonsContainer">
            {opList.map((operator, index) => (
                <FormulaButton 
                    key={index} 
                    input={input} 
                    setInput={setInput} 
                    inputOp={operator} 
                    imgUrl={urlList[index]}
                />
            ))}
        </div>
    )
}
export default ButtonsContainer;