import FormulaButton from "../components/FormulaButton";
import {useState} from "react";

function Standard({input, handleInputUpdate}) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [rows, setRows] = useState(0);
    const [columns, setColumns] = useState(0);

    return (
        <div className="buttons-container">
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\sqrt{}'} 
                    imgUrl={'\\sqrt{a}'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\sqrt[]{}'} 
                    imgUrl={'\\sqrt[a]{b}'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\frac{}{}'} 
                    imgUrl={'\\frac{b}{a}'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\dot{}'} 
                    imgUrl={'\\dot{a}'}
                />
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'+'} 
                    imgUrl={'+'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'-'} 
                    imgUrl={'-'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\times'} 
                    imgUrl={'\\times'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\div'} 
                    imgUrl={'\\div'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\pm'} 
                    imgUrl={'\\pm'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\mp'} 
                    imgUrl={'\\mp'}
                />
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\left( \\right)'} 
                    imgUrl={'\\left(a\\right)'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\left[ \\right]'} 
                    imgUrl={'\\left[a\\right]'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\left| \\right|'} 
                    imgUrl={'\\left|a\\right|'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\left\\{ \\right\\}'} 
                    imgUrl={'\\left\\{a\\right\\}'}
                />
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'^{}'} 
                    imgUrl={'x^{a}'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'_{}'} 
                    imgUrl={'x_{a}'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\infty'} 
                    imgUrl={'\\infty'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\pi'} 
                    imgUrl={'\\pi'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\triangle'} 
                    imgUrl={'\\triangle'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\Box'} 
                    imgUrl={'\\Box'}
                />
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'<'} 
                    imgUrl={'<'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\le'} 
                    imgUrl={'\\le'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'>'} 
                    imgUrl={'>'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\ge'} 
                    imgUrl={'\\ge'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\angle'} 
                    imgUrl={'\\angle'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'^\\circ'} 
                    imgUrl={'x^\\circ'}
                />
            </span>
            <span className="formula-buttons-container-one-col">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\sin()'} 
                    imgUrl={'\\sin'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\cos()'} 
                    imgUrl={'\\cos'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\tan()'} 
                    imgUrl={'\\tan'}
                />
            </span>
        </div>
    );
}
export default Standard;