import FormulaButton from "../components/FormulaButton";
import {useState} from "react";

function Standard({input, handleInputUpdate}) {

    return (
        <div className="buttons-container">
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\sqrt{}'} 
                    imgUrl={'\\sqrt{a}'}
                    curPos={6}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\sqrt[]{}'} 
                    imgUrl={'\\sqrt[a]{b}'}
                    curPos={6}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\frac{}{}'} 
                    imgUrl={'\\frac{b}{a}'}
                    curPos={6}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\dot{}'} 
                    imgUrl={'\\dot{a}'}
                    curPos={5}
                />
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'+'} 
                    imgUrl={'+'}
                    curPos={1}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'-'} 
                    imgUrl={'-'}
                    curPos={1}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\times'} 
                    imgUrl={'\\times'}
                    curPos={6}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\div'} 
                    imgUrl={'\\div'}
                    curPos={4}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\pm'} 
                    imgUrl={'\\pm'}
                    curPos={3}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\mp'} 
                    imgUrl={'\\mp'}
                    curPos={3}
                />
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\left( \\right)'} 
                    imgUrl={'\\left(a\\right)'}
                    curPos={6}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\left[ \\right]'} 
                    imgUrl={'\\left[a\\right]'}
                    curPos={6}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\left| \\right|'} 
                    imgUrl={'\\left|a\\right|'}
                    curPos={6}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\left\\{ \\right\\}'} 
                    imgUrl={'\\left\\{a\\right\\}'}
                    curPos={7}
                />
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'^{}'} 
                    imgUrl={'x^{a}'}
                    curPos={2}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'_{}'} 
                    imgUrl={'x_{a}'}
                    curPos={2}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\infty'} 
                    imgUrl={'\\infty'}
                    curPos={6}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\pi'} 
                    imgUrl={'\\pi'}
                    curPos={3}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\triangle'} 
                    imgUrl={'\\triangle'}
                    curPos={9}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\Box'} 
                    imgUrl={'\\Box'}
                    curPos={4}
                />
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'<'} 
                    imgUrl={'<'}
                    curPos={1}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\le'} 
                    imgUrl={'\\le'}
                    curPos={3}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'>'} 
                    imgUrl={'>'}
                    curPos={1}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\ge'} 
                    imgUrl={'\\ge'}
                    curPos={3}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\angle'} 
                    imgUrl={'\\angle'}
                    curPos={6}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'x^\\circ'} 
                    imgUrl={'x^\\circ'}
                    curPos={1}
                />
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\overline{}'} 
                    imgUrl={'\\overline{AB}'}
                    curPos={10}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\sin()'} 
                    imgUrl={'\\sin'}
                    curPos={5}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\overrightarrow{}'} 
                    imgUrl={'\\overrightarrow{AB}'}
                    curPos={16}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\cos()'} 
                    imgUrl={'\\cos'}
                    curPos={5}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\overleftrightarrow{}'} 
                    imgUrl={'\\overleftrightarrow{AB}'}
                    curPos={20}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\tan()'} 
                    imgUrl={'\\tan'}
                    curPos={5}
                />
            </span>
        </div>
    );
}
export default Standard;