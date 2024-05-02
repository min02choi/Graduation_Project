import FormulaButton from "../components/FormulaButton";

function Cases({input, handleInputUpdate}) {
    return (
        <div className="ButtonsContainer">
            <span className="FormulaButtonsContainer">
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'_{n}\\mathrm{P}_{k}'} 
                    imgUrl={'_{n}\\mathrm{P}_{k}'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'_{n}\\mathrm{C}_{k}'} 
                    imgUrl={'_{n}\\mathrm{C}_{k}'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'P(n,k)'} 
                    imgUrl={'P(n,k)'}
                />
                <FormulaButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOp={'C(n,k)'} 
                    imgUrl={'C(n,k)'}
                />
            </span>
            
        </div>
    );
}
export default Cases;