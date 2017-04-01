type UntypedBinary = "Add" | "Subtract" | "Multiply" | "Divide" | "And" | "Or" | "Equal" | "NotEqual" | "GreaterThan" | "LessThan" | "GreaterThanOrEqualTo" | "LessThanOrEqualTo"

const UntypedBinarySymbols: { [symbol: string]: UntypedBinary } = {
    "+": "Add",
    "-": "Subtract",
    "*": "Multiply",
    "/": "Divide",
    "&": "And",
    "&&": "And",
    "|": "Or",
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
    "<=": "LessThanOrEqualTo"
}

const UntypedBinaryKeywords: { [keyword: string]: UntypedBinary } = {
    and: "And",
    or: "Or",
    is: "Equal",
    equals: "Equal",
    isnt: "NotEqual"
}