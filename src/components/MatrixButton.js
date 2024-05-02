import { useState } from "react";

function MatrixButton({input, handleInputUpdate, inputOp, imgUrl}) {
    const imgSrc = `https://latex.codecogs.com/png.latex?${imgUrl}`;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [rows, setRows] = useState(0);
    const [columns, setColumns] = useState(0);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSubmit = () => {
        // 여기에서 행과 열을 처리하고 팝업을 닫을 수 있습니다.
        console.log('행:', rows);
        console.log('열:', columns);
        setIsPopupOpen(false);
    };

    return (
        <span className="FormulaButtonContainer">
            {/* <button id="FormulaButton" 
                onClick={() => handleInputUpdate(input + inputOp)}> */}
            <button id="FormulaButton" onClick={isPopupOpen ? closePopup : openPopup}>
                <img alt="a" src={imgSrc} />
            </button>
                {/* 팝업 창 */}
                {isPopupOpen && (
                    <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}></span>
                        <label>행: </label>
                        <input type="number" value={rows} onChange={(e) => setRows(parseInt(e.target.value))} />
                        <br />
                        <label>열: </label>
                        <input type="number" value={columns} onChange={(e) => setColumns(parseInt(e.target.value))} />
                        <br />
                        <button onClick={handleSubmit}>확인</button>
                    </div>
                    </div>
                )}
        </span>
    )
}
export default MatrixButton;