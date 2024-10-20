import { useState, useEffect, useRef } from "react";
import {FullDivEquation} from "../utils/FullDivEquation";
import {ShortDivEquation} from "../utils/ShortDivEquation";
import Standard from "../components/Standard";
import Cases from "../components/Cases";
import SetAndProp from "../components/SetAndProp";
import Matrix from "../components/Matrix";
import React from 'react';
import AWS from 'aws-sdk';

function LatexEditor() {
    const [input, setInput] = useState('');
    const [opCategory, setOpCategory] = useState('Standard');
    const [convertedFullText, setConvertedFullText] = useState([]);
    const [convertedShortText, setConvertedShortText] = useState([]);
    const [isInputChanged, setIsInputChanged] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [fullText_SSML, setFullText_SSML] = useState("");
    const [shortText_SSML, setShortText_SSML] = useState("");
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
        // input이 변경되었을 때만 변환 텍스트 초기화
        if (isInputChanged) {
            setConvertedFullText([]);  // input이 변경되면 변환 텍스트 초기화
            setConvertedShortText([]);
        }
    }, [isInputChanged]);

    useEffect(() => {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(cursor, cursor);
      }, [cursor]);

    // 한국말 변환 convert 버튼 이벤트
    const handleConvertBtn = () => {
        const expression = input; // 변환할 수식을 여기에 입력하세요
        console.log('LatexEditor expression', expression);
        // SSML 구조로 바꾸기 -> 띄어쓰기 기준으로 읽어주는 속도를 조절하여 더 잘 들리기 위함.
        const ft = FullDivEquation(expression);
        const st = ShortDivEquation(expression);

        setConvertedFullText([ft]);
        setConvertedShortText([st]);

        var splitFullText = ft.split(" ");
        var splitShortText = st.split(" ");
        var ft_SSML = "<speak>" + splitFullText.join(" <break time='200ms'/> ") + "</speak>";
        var st_SSML = "<speak>" + splitShortText.join(" <break time='200ms'/> ") + "</speak>";

        // 상태 업데이트
        setFullText_SSML(ft_SSML);
        setShortText_SSML(st_SSML);
        
        // ft_SSML을 직접 로그에 출력
        console.log("react상 변환 후: ", ft_SSML);
        setIsInputChanged(false);

    };

    // fullText_SSML이 변경되었을 때 실행될 후속 작업
    useEffect(() => {
        
    }, [fullText_SSML]); // fullText_SSML이 변경될 때마다 실행됨

    // shortText_SSML이 변경되었을 때 실행될 후속 작업
    useEffect(() => {
        
    }, [shortText_SSML]); // shortText_SSML이 변경될 때마다 실행됨

    // input이 변경되었을 때 호출되는 함수 -> input이 변경되면 한글 변환부분을 없애기 위함
    const handleInputChange = (e) => {
        setInput(e.target.value);
        setIsInputChanged(true);  // input이 변경되었음을 알림
        console.log("handleInputChange: ", isInputChanged);
    };

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
    const polly = new AWS.Polly({
        region: 'ap-northeast-2',
        accessKeyId: '',
        secretAccessKey: ''
    });

    const speak = (text, rate = 1.0) => {
        const params = {
          OutputFormat: 'mp3',
          Text: text,
          VoiceId: 'Seoyeon', // 원하는 한국어 음성
          LanguageCode: 'ko-KR',
          TextType: 'ssml',
          Engine: 'neural'
        };
      
        polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const audio = new Audio(URL.createObjectURL(new Blob([data.AudioStream])));
                audio.playbackRate = rate; // playbackRate로 속도 조절
                audio.play();
            }
        });
    };

    // 배속값 업데이트
    const handleSpeedChange = (event) => {
        const newSpeed = parseFloat(event.target.value);
        setSpeed(newSpeed);
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
                    onChange={handleInputChange}
                ></textarea>
                <button className="converted-button" onClick={handleConvertBtn}>Convert</button>
            </div>
            {/* LaTeX 수식 렌더링 결과 */}
            <div id="latex-output"></div>
            {/* 변환 후 한국말 결과 */}
            {/* full 버전 */}
            <div className="converted-kor-container">
                <ul className="converted-kor">
                    {convertedFullText.map((text, index) => (
                        <div className="speak-button-container">
                            <span key={index}>{text}</span>
                            {/* <span >{convertedFullText}</span> */}
                            <button className="speak-button" onClick={() => speak(fullText_SSML, speed)}>
                                <img alt="a" src="https://banner2.cleanpng.com/20180702/sop/kisspng-sound-icon-acoustic-wave-5b3a33b2e1d025.2913981015305409789249.jpg" width="40" height="30"/>
                            </button>
                            <label htmlFor="speedSlider">배속: {speed}x</label>
                            <input
                                type="range"
                                id="speedSlider"
                                min="0.5"
                                max="2.0"
                                step="0.1"
                                value={speed}
                                onChange={handleSpeedChange}
                            />

                        </div>
                        
                    ))}
                </ul>
            </div>
            {/* 간략 버전 */}
            <div className="converted-kor-container">
                <ul className="converted-kor">
                    {convertedShortText.map((text, index) => (
                        <div className="speak-button-container">
                            <span key={index}>{text}</span>
                            <button className="speak-button" onClick={() => speak(shortText_SSML, speed)}>
                                <img alt="a" src="https://banner2.cleanpng.com/20180702/sop/kisspng-sound-icon-acoustic-wave-5b3a33b2e1d025.2913981015305409789249.jpg" width="40" height="30"/>
                            </button>
                            <label htmlFor="speedSlider">배속: {speed}x</label>
                            <input
                                type="range"
                                id="speedSlider"
                                min="0.5"
                                max="2.0"
                                step="0.1"
                                value={speed}
                                onChange={handleSpeedChange}
                            />

                        </div>
                        
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default LatexEditor;
