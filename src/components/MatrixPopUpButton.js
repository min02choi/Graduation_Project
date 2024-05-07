import { useState } from "react";
import {FormulaButton} from "./FormulaButton";
import React from 'react';

function MatrixPopUpButton({input, handleInputUpdate, inputOpType, isPopupOpen, setPopupOpen, onTogglePopUp}) {
    const imgUrl = `\\begin{${inputOpType}}\\cdots \\\\ \\cdots\\\end{${inputOpType}}`
    const imgSrc = `https://latex.codecogs.com/png.latex?${imgUrl}`;
    // const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [rows, setRows] = useState(0);
    const [columns, setColumns] = useState(1);
    const [hoveredIndex, setHoveredIndex] = useState([]);

    // popup창 자체에 mouseover 이벤트넣기
    const handlePopUpEnter = () => {
        setPopupOpen(true);
    }
    const handlePopUpLeave = () => {
        setPopupOpen(false);
    };

    const handleSubmit = () => {
        // 여기에서 행과 열을 처리하고 팝업을 닫을 수 있습니다.
        // setIsPopupOpen(false);
        onTogglePopUp();
        const startMatrix = `\\begin{${inputOpType}}\n`;
        const oneRow = " & ".repeat(columns-1) + "\\\\\n"; 
        const middleMatrix = oneRow.repeat(rows);
        const endMatrix = `\\end{${inputOpType}}`;
        const finalMatrix = startMatrix.concat(middleMatrix, endMatrix);
        handleInputUpdate(input + finalMatrix);
    };

    // matrix popup
    const handleMouseEnter = (row, col) => {
        // hover 되는 사각형까지 색칠하기
        const newHoveredIndices = [];
        for (let i=0; i<=row; i++) {
            for (let j=0; j<=col; j++) {
                newHoveredIndices.push(i * 4 + j);
            }
        }
        setRows(row + 1);
        setColumns(col + 1);
        setHoveredIndex(newHoveredIndices);
    };
    
    // 마우스가 직사각형에서 벗어났을 때의 이벤트 핸들러
    const handleMouseLeave = () => {
        setHoveredIndex([]);
    };
    
    return (
        <span className="matrix-popUp">
            {/* <button id="MatrixPopUp" 
                onClick={() => handleInputUpdate(input + inputOp)}> */}
            <button id="formula-button" onClick={onTogglePopUp}>
                <img alt="a" src={imgSrc} />
            </button>
            {/* 팝업 창 */}
            {isPopupOpen && (
                <div className="popup" onMouseEnter={handlePopUpEnter} onMouseLeave={handlePopUpLeave}>
                    <div className="grid-container" id="gridContainer"> 
                        {Array.from(Array(16).keys()).map(index => (
                            <div 
                                key={index}
                                className={`grid-item ${hoveredIndex.includes(index) ? 'hovered' : ''}`}
                                onMouseEnter={() => handleMouseEnter(parseInt(Math.floor(index / 4)), parseInt(index % 4))}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleSubmit}
                            ></div>
                        ))}
                    </div>
                    <div className="popup-output">
                        <label>행: </label>
                        <input type="number" className="popup-output-input" value={rows} onChange={(e) => setRows(parseInt(e.target.value))} />
                        <br />
                        <label>열: </label>
                        <input type="number" className="popup-output-input" value={columns} onChange={(e) => setColumns(parseInt(e.target.value))} />
                        <br />
                        <div className="insert-button">
                            <button ID="formula-button" onClick={handleSubmit}>INSERT</button>
                        </div>
                    </div>
                    
                </div>
            )}
        </span>
    )
}
export default MatrixPopUpButton;