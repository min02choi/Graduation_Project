import { useState, useEffect } from "react";

function FormulaButton({input, setInput, inputOp, imgUrl}) {
    useEffect(() => {
        const handleInputChange = () => {
            const inputValue = document.getElementById('latexInput').value;
            console.log("inputValue", inputValue);
            const output = document.getElementById('latexOutput');
            // MathJax 사용하여 LaTeX 수식 렌더링
            output.innerHTML = '$$' + inputValue + '$$';
            window.MathJax.typesetPromise();
        };

        // LaTeX 입력란에서 입력이 변경될 때마다 이벤트 핸들러 추가
        document.getElementById('latexInput').addEventListener('input', handleInputChange);

        // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
        return () => {
            document.getElementById('latexInput').removeEventListener('input', handleInputChange);
        };
    }, [input]);
    
    const imgSrc = `https://latex.codecogs.com/png.latex?${imgUrl}`;
    // console.log("FormulaButton: ", input);
    return (
        <span className="FormulaButtonContainer">
            <button className="FormulaButton" 
                onClick={() => setInput(input + inputOp)}>
                <img alt="a" src={imgSrc} />
            </button>
        </span>
    )
}
export default FormulaButton;

