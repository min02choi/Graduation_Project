import FormulaButton from "../components/FormulaButton";
import React from 'react';

function SetAndProp({input, handleInputUpdate}) {
    
    return (
        <div className="buttons-container">
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\in'} 
                    imgUrl={'\\in'}
                    curPos={3}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\ni'} 
                    imgUrl={'\\ni'}
                    curPos={3}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\notin'} 
                    imgUrl={'\\notin'}
                    curPos={6}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\not\\ni'} 
                    imgUrl={'\\not\\ni'}
                    curPos={7}
                />
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\subset'} 
                    imgUrl={'\\subset'}
                    curPos={7}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\supset'} 
                    imgUrl={'\\supset'}
                    curPos={7}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\not\\subset'} 
                    imgUrl={'\\not\\subset'}
                    curPos={11}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\not\\supset'} 
                    imgUrl={'\\not\\supset'}
                    curPos={11}
                />
                
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\cap'} 
                    imgUrl={'\\cap'}
                    curPos={4}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\cup'} 
                    imgUrl={'\\cup'}
                    curPos={4}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\varnothing'} 
                    imgUrl={'\\varnothing'}
                    curPos={11}
                />
            </span>
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\Rightarrow'} 
                    imgUrl={'\\Rightarrow'}
                    curPos={11}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\Leftarrow'} 
                    imgUrl={'\\Leftarrow'}
                    curPos={11}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\Leftrightarrow'} 
                    imgUrl={'\\Leftrightarrow'}
                    curPos={15}
                />
                 <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'\\sim'} 
                    imgUrl={'\\sim'}
                    curPos={4}
                />
            </span>

        </div>
    );
}
export default SetAndProp;