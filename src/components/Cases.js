import FormulaButton from "../components/FormulaButton";
import React from 'react';

function Cases({input, handleInputUpdate}) {

    return (
        <div className="buttons-container">
            <span className="formula-buttons-container">
                
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'P\\left(n,k\\right)'} 
                    imgUrl={'P\\left(n,k\\right)'}
                    curPos={20}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'C\\left(n,k\\right)'} 
                    imgUrl={'C\\left(n,k\\right)'}
                    curPos={20}
                />
            </span>
            
        </div>
    );
}
export default Cases;