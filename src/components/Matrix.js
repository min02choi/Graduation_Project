import FormulaButton from "../components/FormulaButton";
import MatrixPopUpButton from "./MatrixPopUpButton";
import { useState } from "react";
import React from 'react';

function Matrix({input, handleInputUpdate}) {
    const [isPopupOpenPMatrix, setIsPopupOpenPMatrix] = useState(false);
    const [isPopupOpenBMatrix, setIsPopupOpenBMatrix] = useState(false);

    // 팝업을 열거나 닫는 핸들러 함수들
    const handleTogglePopUpPMatrix = () => {
        setIsPopupOpenPMatrix(!isPopupOpenPMatrix);
        setIsPopupOpenBMatrix(false); 
    };

    const handleTogglePopUpBMatrix = () => {
        setIsPopupOpenBMatrix(!isPopupOpenBMatrix);
        setIsPopupOpenPMatrix(false); 
    };
    
    return (
        <div className="buttons-container">
            <span className="formula-buttons-container">
                <MatrixPopUpButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOpType={'pmatrix'} 
                    isPopupOpen={isPopupOpenPMatrix}
                    setPopupOpen={setIsPopupOpenPMatrix}
                    onTogglePopUp={handleTogglePopUpPMatrix}
                    curPos={16}
                />
                <MatrixPopUpButton
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                    inputOpType={'bmatrix'}
                    isPopupOpen={isPopupOpenBMatrix}
                    setPopupOpen={setIsPopupOpenBMatrix}
                    onTogglePopUp={handleTogglePopUpBMatrix} 
                    curPos={16}
                />
            </span>
            
        </div>
    );
}
export default Matrix;