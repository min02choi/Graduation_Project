export const Data = {
    zeroPriority: {
        "<": "0순위 크다",
        ">": "0순위 작다",
        "\\le": "0순위 크거나 같다",
        "\\ge": "0순위 작거나 같다.",
        "\\in": "0순위 원소가 포함한다.",
        "\\ni": "0순위 원소가 포함된다.",
        "\\notin": "0순위 원소가 포함되지 않는다.",
        "\\not\\ni": "0순위 원소가 포함되지 않는다.",
        "\\subset": "0순위 집합을 포함한다.",
        "\\supset": "0순위 집합을 포함한다.",
        "\\subseteq": "0순위 집합을 포함하거나 같다.",
        "\\supseteq": "0순위 집합을 포함하거나 같다.",
        "\\not\\subset": "0순위 집합을 포함하지 않는다.",
        "\\not\\supset": "0순위 집합을 포함하지 않는다.",
        "\\nsubseteq": "0순위 집합을 포함하거나 같다.",
        "\\nsupseteq": "0순위 집합을 포함하거나 같다.",
        "\\Rightarrow": "0순위 필요조건",
        "\\Longrightarrow": "0순위 필요조건",
        "\\Leftarrow": "0순위 충분조건",
        "\\Longleftarrow": "0순위 충분조건",
        "\\Leftrightarrow": "0순위 필요충분조건",
        "\\Longleftrightarrow": "0순위 필요충분조건",
    },
    firstPriority: { // 원자 연산자 -> 우선순위가 필요할 듯,,, 0순위 부등호, 집합기호, 1순위(원자 단위) firstPriority: 일대일 매칭이 가능한 것, 2순위: 괄호 포함
        "+": "플러스 ",
        "-": "마이너스 ",
        "\\div": "나누기 ",
        "/": "나누기 ",
        "\\times": "곱하기 ",
        "\\pm": "플마 ",
        "\\mp": "마플 ",
        "=": "는(은) ",
        "\\infty": " 무한대 ",
        "\\pi": " 파이 ",
        "\\triangle": " 삼각형 ",
        "\\Box": " 사각형 ",
        "\\angle": " 각 ",
        "<": " 크다 ",
        ">": " 작다 ",
        "\\le": " 크거나 같다 ",
        "\\ge": " 작거나 같다 ",
        "\\in": " 가 오른쪽에 포함된다 ",
        "\\ni": " 가 왼쪽에 포함된다 ",
        "\\notin": " 가 오른쪽에 포함되지 않는다 ",
        "\\not\\ni": " 가 왼쪽에 포함되지 않는다 ",
        "\\subset": " 가 오른쪽에 포함된다 ",
        "\\supset": " 가 왼쪽에 포함된다 ",
        "\\subseteq": " 가 오른쪽에 포함되거나 같다 ",
        "\\supseteq": " 가 왼쪽에 포함되거나 같다 ",
        "\\not\\subset": " 가 오른쪽에 포함되지 않는다 ",
        "\\not\\supset": " 가 왼쪽에 포함되지 않는다 ",
        "\\nsubseteq": " 가 오른쪽에 포함하지 않거나 같은 집합이 아니다 ",
        "\\nsupseteq": " 가 왼쪽에 포함하지 않거나 같은 집합이 아니다 ",
        "\\cap": " 교집합 ",
        "\\cup": " 합집합 ",
        "\\varnothing": " 공집합 ",
        "\\sim": " 부정 ", // 부정 뿐만 아니라 비슷하지 않음이라는 뜻도 있음
        "_":"아래첨 ",
        "^":"위첨 ",
    },
    number: {
        "0": "영",
        "1": "일",
        "2": "이",
        "3": "삼",
        "4": "사",
        "5": "오",
        "6": "육",
        "7": "칠",
        "8": "팔",
        "9": "구",
    },

    word: {
        "a": "에이 ",
        "b": "비 ",
        "c": "씨 ",
        "e": "이 ",
        "f": "에프 ",
        "p": "피 ",
        "x": "엑스 ",
        "y": "와이 ",
        "z": "지 ",
        "A": "대문자 에이 ",
        "B": "대문자 비 ",
        "C": "대문자 씨 ",
        "F": "대문자 에프 ", 
    },

    // latex 문법: [한국 독음, 영어 표기, 중괄호 개수]
    // 중괄호 개수는 현재 미사용
    math_expression: {
        // "^": ["제곱", 2],
        //"\\frac": ["분수 ", 2],
        //"\\sqrt": ["루트 ", 1],
        //"\\left": ["열림 ", 1],
        //"\\right": ["닫힘 ", 1],
        //"\\lim":["리미트 ", 2],
        // "\\sin": ["싸인", 2],
        // "\\cos": ["코싸인", 2],
        // "\\tan": ["탄젠트", 2],
        //"\\dot": ["무한소수", 2],
        // "\\overline": ["무한소수", 2],

        "\\frac": ["분수 ", "frac", 2],
        "\\sqrt": ["루트 ", "sqrt", 1],
        "\\left": ["열림 ", "left", 1],
        "\\right": ["닫힘 ", "right", 1],
        "\\lim":["리미트 ", "lim", 2],
        "^": ["위첨자 ", "superscript", 1],
        "_": ["아래첨자 ", "subscript", 1],

        "\\sin": ["싸인", "sct", 2],
        "\\cos": ["코싸인", "sct", 2],
        "\\tan": ["탄젠트", "sct", 2],
        "\\overline": ["무한소수", "overline", 2],
    },

    math_expression_pair: {
        // "(": ["괄호 ", ")"],
        // "{": ["중괄호 ", "}"],
        // "[": ["대괄호 ", "]"],
        // "|": ["절댓값 ", "|"],

        "(": ["괄호 ", ")"],
        "\\(": ["괄호 ", "\\)"],
        "\\{": ["중괄호 ", "\\}"],
        "[": ["대괄호 ", "]"],
        "\\[": ["대괄호 ", "\\]"],
        "|": ["절댓값 ", "|"],
        "\\|": ["절댓값 ", "\\|"],
    }
};
