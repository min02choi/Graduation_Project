import { useState, useEffect, useRef } from "react";
import {convert2Text} from "../utils/DivEquation";
import Standard from "../components/Standard";
import Cases from "../components/Cases";
import SetAndProp from "../components/SetAndProp";
import Matrix from "../components/Matrix";


function LatexEditor() {
    const [input, setInput] = useState('');
    const [opCategory, setOpCategory] = useState('Standard');
    const [convertedText, setConvertedText] = useState([]);
    // 커서 위치 조정 -> hope: 입력해야되는 첫 번째 부분에 커서 놓기
    const inputRef = useRef(null); // input 요소에 대한 ref
    const [cursor, setCursor] = useState(0);
    console.log("cursor: ", cursor);
    

    useEffect(() => {
        const handleInputChange = () => {
            const inputValue = document.getElementById('latex-input').value;
            console.log("inputValue", inputValue);
            const output = document.getElementById('latex-output');
            // MathJax 사용하여 LaTeX 수식 렌더링
            output.innerHTML = '$$' + inputValue + '$$';
            window.MathJax.typesetPromise();
        };
        handleInputChange();

        // LaTeX 입력란에서 입력이 변경될 때마다 이벤트 핸들러 추가
        document.getElementById('latex-input').addEventListener('input', handleInputChange);

        // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
        return () => {
            document.getElementById('latex-input').removeEventListener('input', handleInputChange);
        };
    }, [input]);

    useEffect(() => {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(cursor, cursor);
      }, [cursor]);

    // 한국말 변환 convert 버튼 이벤트
    const handleConvertBtn = () => {
        const expression = input; // 변환할 수식을 여기에 입력하세요
        console.log('LatexEditor expression', expression);
        // *** 현재는 문자열 리턴이므로 문자열 -> 리스트로 바꾸었는데
        // *** 가능성 제안 방식이면 리스트로 출력이 될 예정 -> 이 부분도 바꾸어야됨.
        setConvertedText([convert2Text(expression)]);
        console.log(convertedText);
    };

    // convert 버튼 없이 변환 가능 -> 단: 하나씩 지우다가 없는 명령어가 나오면 에러가 뜸
    // useEffect(() => {
    //     const handleConvertBtn = () => {
    //         const expression = input; // 변환할 수식을 여기에 입력하세요
    //         console.log('LatexEditor expression', expression);
    //         // *** 현재는 문자열 리턴이므로 문자열 -> 리스트로 바꾸었는데
    //         // *** 가능성 제안 방식이면 리스트로 출력이 될 예정 -> 이 부분도 바꾸어야됨.
    //         setConvertedText([convert2Text(expression)]);

    //     };
    //     handleConvertBtn();
    // }, [input]);

    // 커서 위치 조정
    const getCursorPosition = () => {
        if (!inputRef.current) return 0; // input 요소가 존재하지 않으면 0 반환

        // selectionStart 속성을 사용하여 커서의 위치를 가져옴
        return inputRef.current.selectionStart;
    };

    // input update with cursor
    function handleInputUpdate(value, curPos) {
        // 텍스트 입력 필드에서 현재 커서 위치를 가져옴
        let cursorPosition = getCursorPosition();

        // 새로운 텍스트 생성: 커서 위치 앞부분 + 삽입할 버튼 수식 + 커서 위치 뒷부분
        const newText = input.slice(0, cursorPosition) + value + input.slice(cursorPosition);

        // 입력된 텍스트 업데이트
        setInput(newText);

        // 입력 필드에 포커스를 맞춤
        if (inputRef.current) {
            inputRef.current.focus();
    
            // 커서 위치를 삽입한 버튼 다음으로 이동
            const newCurPosition = getCursorPosition();
            setCursor(newCurPosition + curPos);
        }
    };

    // TTS API 호출 함수
    const speak = (text) => {
        console.log("text", text);
        const lang = "ko-KR";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.5;
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="latex-editor">
            <h1>시각장애인을 위한 수식 리더기</h1>
            <div className="cate-container">
                {/* 카테고리 버튼 */}
                {/* 카테고리 추가 시 수정 필요 */}
                <button className="cate-name" onClick={()=>setOpCategory('Standard')}>{'기본 수식'}</button> 
                <button className="cate-name" onClick={()=>setOpCategory('Cases')}>{'경우의 수'}</button>
                <button className="cate-name" onClick={()=>setOpCategory('SetAndProp')}>{'집합과 명제'}</button> 
                <button className="cate-name" onClick={()=>setOpCategory('Matrix')}>{'행렬'}</button> 
                {/* 카테고리에 따른 연산 버튼 리스트 변수명 전달 */}
                {opCategory === 'Standard' && <Standard
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                />}
                {opCategory === 'Cases' && <Cases
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                />}
                {opCategory === 'SetAndProp' && <SetAndProp
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                />}
                {opCategory === 'Matrix' && <Matrix
                    input={input}
                    handleInputUpdate={handleInputUpdate} 
                />}
            </div>

            {/* LaTeX 입력란 */}
            <div className="input-container">
                <textarea
                    ref={inputRef}
                    id="latex-input"
                    placeholder="Enter LaTeX here..."
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value)
                    }}
                ></textarea>
                <button className="converted-button" onClick={handleConvertBtn}>Convert</button>
            </div>
            {/* LaTeX 수식 렌더링 결과 */}
            <div id="latex-output"></div>
            {/* 변환 후 한국말 결과 */}
            <div className="converted-kor-container">
                <ul className="converted-kor">
                    {convertedText.map((text, index) => (
                        <div className="speak-button-container">
                            <span key={index}>{text}</span>
                            <button className="speak-button" onClick={() => speak(text)}>
                                <img alt="a" src="https://banner2.cleanpng.com/20180702/sop/kisspng-sound-icon-acoustic-wave-5b3a33b2e1d025.2913981015305409789249.jpg" width="40" height="30"/>
                            </button>
                        </div>
                        
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default LatexEditor;
