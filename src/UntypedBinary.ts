type UntypedBinary = "Add" | "Subtract" | "Multiply" | "Divide" | "And" | "Or" | "Equal" | "NotEqual" | "GreaterThan" | "LessThan" | "GreaterThanOrEqualTo" | "LessThanOrEqualTo"

const UntypedBinarySymbols: {[operator in UntypedBinary]: string[]} = {
    Add: ["+"],
    Subtract: ["-"],
    Multiply: ["*"],
    Divide: ["/"],
    And: ["&", "&&"],
    Or: ["|", "||"],
    Equal: ["=", "==", "==="],
    NotEqual: ["!=", "!==", "<>"],
    GreaterThan: [">"],
    LessThan: ["<"],
    GreaterThanOrEqualTo: [">="],
    LessThanOrEqualTo: ["<="]
}

const UntypedBinaryKeywords: {[operator in UntypedBinary]: string[]} = {
    Add: [],
    Subtract: [],
    Multiply: [],
    Divide: [],
    And: ["and"],
    Or: ["or"],
    Equal: ["is", "equals"],
    NotEqual: ["isnt"],
    GreaterThan: [],
    LessThan: [],
    GreaterThanOrEqualTo: [],
    LessThanOrEqualTo: []
}