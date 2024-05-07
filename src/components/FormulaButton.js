import {MatrixPopUp} from "./MatrixPopUpButton";

function FormulaButton({input, handleInputUpdate, inputOp, imgUrl}) {
    const imgSrc = `https://latex.codecogs.com/png.latex?${imgUrl}`;
    // console.log("FormulaButton: ", input);
    return (
        <span className="formula-button-container">
            <button id="formula-button" 
                onClick={() => handleInputUpdate(input + inputOp)}>
                <img alt="a" src={imgSrc} />
            </button>
        </span>
    )
}
export default FormulaButton;

