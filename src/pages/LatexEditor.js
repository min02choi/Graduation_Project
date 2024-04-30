import { useState, useEffect } from "react";
import ButtonsContainer from "../components/ButtonsContainer";
import {convert2Text} from "../utils/DivEquation";


function LatexEditor() {
    const [input, setInput] = useState('');
    const [opCategory, setOpCategory] = useState('standard');
    const [convertedText, setConvertedText] = useState([]);
    // console.log(input);

    useEffect(() => {
        const handleInputChange = () => {
            const inputValue = document.getElementById('latexInput').value;
            console.log("inputValue", inputValue);
            const output = document.getElementById('latexOutput');
            // MathJax 사용하여 LaTeX 수식 렌더링
            output.innerHTML = '$$' + inputValue + '$$';
            window.MathJax.typesetPromise();
        };
        handleInputChange();

        // LaTeX 입력란에서 입력이 변경될 때마다 이벤트 핸들러 추가
        document.getElementById('latexInput').addEventListener('input', handleInputChange);

        // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
        return () => {
            document.getElementById('latexInput').removeEventListener('input', handleInputChange);
        };
    }, [input]);

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

    // input update
    function handleInputUpdate(value) {
        setInput(value);
        console.log("input", input);
    };
    function handleConvertedTextUpdate(expression) {
        setConvertedText([convert2Text(expression)]);
    }

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
        <div className="LatexEditor">
            <h1>시각장애인을 위한 수식 리더기</h1>
            <div className="cateContainer">
                {/* 카테고리 버튼 */}
                {/* 카테고리 추가 시 수정 필요 */}
                <button className="cateName" onClick={()=>setOpCategory('standard')}>{'기본 수식'}</   button> 
                <button className="cateName" onClick={()=>setOpCategory('cases')}>{'경우의 수'}</button>
                <button className="cateName" onClick={()=>setOpCategory('setAndProp')}>{'집합과 명제'}</button> 
                {/* 카테고리에 따른 연산 버튼 리스트 변수명 전달 */}
                <ButtonsContainer 
                    input={input} 
                    handleInputUpdate={handleInputUpdate} 
                    opCategory={`${opCategory}`}
                />
            </div>

            {/* LaTeX 입력란 */}
            <div className="inputContainer">
                <textarea
                    id="latexInput"
                    placeholder="Enter LaTeX here..."
                    value={input}
                    onChange={(e) => {
                        handleInputUpdate(e.target.value)
                    }}
                ></textarea>
                <button className="convertedButton" onClick={handleConvertBtn}>Convert</button>
            </div>
            {/* LaTeX 수식 렌더링 결과 */}
            <div id="latexOutput"></div>
            {/* 변환 후 한국말 결과 */}
            <div className="convertedKorContainer">
                <ul className="convertedKor">
                    {convertedText.map((text, index) => (
                        <div className="speakButtonContainer">
                            <span key={index}>{text}</span>
                            <button className="speakButton" onClick={() => speak(text)}>
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
