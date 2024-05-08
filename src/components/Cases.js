import FormulaButton from "../components/FormulaButton";

function Cases({input, handleInputUpdate}) {

    return (
        <div className="buttons-container">
            <span className="formula-buttons-container">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'_{n}\\mathrm{P}_{k}'} 
                    imgUrl={'_{n}\\mathrm{P}_{k}'}
                    curPos={18}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'_{n}\\mathrm{C}_{k}'} 
                    imgUrl={'_{n}\\mathrm{C}_{k}'}
                    curPos={18}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'P(n,k)'} 
                    imgUrl={'P(n,k)'}
                    curPos={6}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'C(n,k)'} 
                    imgUrl={'C(n,k)'}
                    curPos={6}
                />
            </span>
            
        </div>
    );
}
export default Cases;