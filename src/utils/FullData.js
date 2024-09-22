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
        "\\pm": "플러스마이너스 ",
        "\\mp": "마이너스플러스 ",
        "=": "* ",
        "\\infty": "무한대 ",
        "\\pi": "파이 ",
        "\\triangle": "삼각형 ",
        "\\Box": "사각형 ",
        "\\angle": "각 ",
        "<": "크다 ",
        ">": "작다 ",
        "\\le": "크거나 같다 ",
        "\\ge": "작거나 같다 ",
        "\\in": "# 오른쪽에 포함된다 ",
        "\\ni": "# 왼쪽에 포함된다 ",
        "\\notin": "# 오른쪽에 포함되지 않는다 ",
        "\\not\\ni": "# 왼쪽에 포함되지 않는다 ",
        "\\subset": "# 오른쪽에 포함된다 ",
        "\\supset": "# 왼쪽에 포함된다 ",
        "\\subseteq": "# 오른쪽에 포함되거나 같다 ",
        "\\supseteq": "# 왼쪽에 포함되거나 같다 ",
        "\\not\\subset": "# 오른쪽에 포함되지 않는다 ",
        "\\not\\supset": "# 왼쪽에 포함되지 않는다 ",
        "\\cap": "교집합 ",
        "\\cup": "합집합 ",
        "\\varnothing": "공집합 ",
        "\\sim": "부정 ", // 부정 뿐만 아니라 비슷하지 않음이라는 뜻도 있음

        "_":"아래첨 ",
        "^":"위첨 ",

        "\\prime": "프라임 ",
        ":": "대 ",
        ",": "콤마 ",
    },

    number: {
        "0": "영 ",
        "1": "일 ",
        "2": "이 ",
        "3": "삼 ",
        "4": "사 ",
        "5": "오 ",
        "6": "육 ",
        "7": "칠 ",
        "8": "팔 ",
        "9": "구 ",
    },

    word: {
        "a": "에이 ",
        "b": "비 ",
        "c": "씨 ",
        "e": "이 ",
        "f": "에프 ",
        "g": "쥐 ",
        "h": "에이치 ",
        "i": "아이 ",
        "j": "제이 ",
        "k": "케이 ",
        "l": "엘 ",
        "n": "엔 ",
        "m": "엠 ",
        "o": "오 ",
        "p": "피 ",
        "q": "큐 ",
        "r": "알 ",
        "s": "에스 ",
        "t": "티 ",
        "u": "유 ",
        "v": "브이 ",
        "w": "더블유 ",
        "x": "엑스 ",
        "y": "와이 ",
        "z": "지 ",
        "A": "대문자 에이 ",
        "B": "대문자 비 ",
        "C": "대문자 씨 ",
        "D": "대문자 디 ",
        "E": "대문자 이 ",
        "F": "대문자 에프 ", 
        "G": "대문자 쥐 ",
        "H": "대문자 에이치 ",
        "I": "대문자 아이 ",
        "J": "대문자 제이 ",
        "K": "대문자 케이 ",
        "L": "대문자 엘 ",
        "N": "대문자 엔 ",
        "M": "대문자 엠 ",
        "O": "대문자 오 ",
        "P": "대문자 피 ",
        "Q": "대문자 큐 ",
        "R": "대문자 알 ",
        "S": "대문자 에스 ",
        "T": "대문자 티 ",
        "U": "대문자 유 ",
        "V": "대문자 브이 ",
        "W": "대문자 더블유 ",
        "X": "대문자 엑스 ",
        "Y": "대문자 와이 ",
        "Z": "대문자 지 ",
        ".": "점 ",
    },

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
        "\\overline": ["선분", "overline", 1], 
        "\\overrightarrow": ["반직선", "overline", 1],
        "\\overleftrightarrow": ["직선", "overleftrightarrow", 1],
        "\\dot": ["무한소수", "dot", 2],

        "\\begin": ["행렬시작", "begin", 2],
        "\\end": ["행렬시작", "end", 2],

    },

    math_expression_pair: {
        // "\\(": ["괄호 ", "\\)"],
        // "\\[": ["대괄호 ", "\\]"],
        // "\\|": ["절댓값 ", "\\|"],

        "(": ["괄호 ", ")"],
        "\\{": ["중괄호 ", "\\}"],
        "[": ["대괄호 ", "]"],
        "|": ["절댓값 ", "|"],
    }
};
