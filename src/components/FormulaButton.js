import React from 'react';

function FormulaButton({input, handleInputUpdate, inputOp, imgUrl, curPos}) {
    const imgSrc = `https://latex.codecogs.com/png.latex?${imgUrl}`;
    // console.log("FormulaButton: ", input);
    return (
        <span className="formula-button-container">
            <button id="formula-button" 
                onClick={() => handleInputUpdate(inputOp, curPos)}>
                <img alt="a" src={imgSrc} />
            </button>
        </span>
    )
}
export default FormulaButton;

