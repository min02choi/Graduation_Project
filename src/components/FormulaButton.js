import { useState, useEffect } from "react";

function FormulaButton({input, handleInputUpdate, inputOp, imgUrl}) {
    const imgSrc = `https://latex.codecogs.com/png.latex?${imgUrl}`;
    // console.log("FormulaButton: ", input);
    return (
        <span className="FormulaButtonContainer">
            <button id="FormulaButton" 
                onClick={() => handleInputUpdate(input + inputOp)}>
                <img alt="a" src={imgSrc} />
            </button>
        </span>
    )
}
export default FormulaButton;

