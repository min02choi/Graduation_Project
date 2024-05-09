// mathExpressions.js 파일

const Data = {
    operator: {
        "+": "플러스 ",
        "-": "마이너스 ",
        "\\div": "나누기 ",
        "/": "나누기 ",
        "\\times": "곱하기 ",
        "\\pm": "플마 ",
        "\\mp": "마플 ",
        "=": "는(은) ",
        "^": "제곱 ",
        // "\\left (": "괄호 열고",
        // "\\right )": "괄호 닫고",
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
        "f": "에프",
        "x": "엑스 ",
        "y": "와이 ",
        "z": "제트 ",
        "A": "대문자 에이 ",
        "B": "대문자 비 ",
        "C": "대문자 씨 ",
    },

    math_expression: {
        "\\frac": ["분수 ", 2],
        "\\sqrt": ["루트 ", 1],
        "\\left": ["열림 ", 1],
        "\\right": ["닫힘 ", 1],
        "\\lim":["리미트 ", 2],
    },

    math_expression_pair: {
        "(": ["괄호 ", ")"],
        "\\{": ["중괄호 ", "\\}"],
        "[": ["대괄호 ", "]"],
        "|": ["절댓값 ", "|"],
    }
};
module.exports = Data;
