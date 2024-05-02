import FormulaButton from "../components/FormulaButton";
import MatrixButton from "./MatrixButton";


function Matrix({input, handleInputUpdate}) {
    return (
        <div className="ButtonsContainer">
            <span className="FormulaButtonsContainer">
                {/* <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\begin{bmatrix}  \\\\ \\\end{bmatrix}'} 
                    imgUrl={'\\begin{bmatrix}\\cdots \\\\ \\cdots\\\end{bmatrix}'}
                /> */}
                <MatrixButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\begin{bmatrix}  \\\\ \\\end{bmatrix}'} 
                    imgUrl={'\\begin{bmatrix}\\cdots \\\\ \\cdots\\\end{bmatrix}'}
                />
                
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'_{n}\\mathrm{C}_{k}'} 
                    imgUrl={'_{n}\\mathrm{C}_{k}'}
                />
            </span>
            
        </div>
    );
}
export default Matrix;