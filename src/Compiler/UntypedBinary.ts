type UntypedBinary = "Add" | "Subtract" | "Multiply" | "Divide" | "And" | "Or" | "Equal" | "NotEqual" | "GreaterThan" | "LessThan" | "GreaterThanOrEqualTo" | "LessThanOrEqualTo" | "Call" | "Concatenate" | "Exponentiate"

const UntypedBinarySymbols: { [symbol: string]: UntypedBinary } = {
    "+": "Add",
    "-": "Subtract",
    "*": "Multiply",
    "/": "Divide",
    "&&": "And",
    "||": "Or",
    "=": "Equal",
    "==": "Equal",
    "===": "Equal",
    "!=": "NotEqual",
    "!==": "NotEqual",
    "<>": "NotEqual",
    ">": "GreaterThan",
    "<": "LessThan",
    ">=": "GreaterThanOrEqualTo",
    "<=": "LessThanOrEqualTo",
    "|": "Call",
    ",": "Concatenate",
    "^": "Exponentiate",
    "**": "Exponentiate"
}

const UntypedBinaryKeywords: { [keyword: string]: UntypedBinary } = {
    and: "And",
    or: "Or",
    is: "Equal",
    equals: "Equal",
    isnt: "NotEqual",
    pow: "Exponentiate"
}

const UntypedBinaryKeywordsAndSymbols: { [keywordOrSymbol: string]: UntypedBinary } = {}
for (const symbol in UntypedBinarySymbols) UntypedBinaryKeywordsAndSymbols[symbol] = UntypedBinarySymbols[symbol]
for (const keyword in UntypedBinaryKeywords) UntypedBinaryKeywordsAndSymbols[keyword] = UntypedBinaryKeywords[keyword]