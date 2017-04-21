/// <reference path="CSyntax.ts" />
/// <reference path="GLSLCSyntaxBase.ts" />

const GLSLBooleanPatterns: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] = [{
    Type: "Function",
    Function: "AllBVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "AndBoolean",
        Left: { Type: "AnyBoolean", Name: "A" },
        Right: {
            Type: "Binary",
            Operator: "AndBoolean",
            Left: { Type: "AnyBoolean", Name: "B" },
            Right: {
                Type: "Binary",
                Operator: "AndBoolean",
                Left: { Type: "AnyBoolean", Name: "C" },
                Right: { Type: "AnyBoolean", Name: "D" }
            }
        }
    }],
    ResultArguments: [[{ Type: "AnyBoolean", Name: "A" }, { Type: "AnyBoolean", Name: "B" }, { Type: "AnyBoolean", Name: "C" }, { Type: "AnyBoolean", Name: "D" }]],
}, {
    Type: "Function",
    Function: "AllBVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "AndBoolean",
        Left: { Type: "AnyBoolean", Name: "A" },
        Right: {
            Type: "Binary",
            Operator: "AndBoolean",
            Left: { Type: "AnyBoolean", Name: "B" },
            Right: { Type: "AnyBoolean", Name: "C" }
        }
    }],
    ResultArguments: [[{ Type: "AnyBoolean", Name: "A" }, { Type: "AnyBoolean", Name: "B" }, { Type: "AnyBoolean", Name: "C" }]],
}, {
    Type: "Function",
    Function: "AnyBVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "OrBoolean",
        Left: { Type: "AnyBoolean", Name: "A" },
        Right: {
            Type: "Binary",
            Operator: "OrBoolean",
            Left: { Type: "AnyBoolean", Name: "B" },
            Right: {
                Type: "Binary",
                Operator: "OrBoolean",
                Left: { Type: "AnyBoolean", Name: "C" },
                Right: { Type: "AnyBoolean", Name: "D" }
            }
        }
    }],
    ResultArguments: [[{ Type: "AnyBoolean", Name: "A" }, { Type: "AnyBoolean", Name: "B" }, { Type: "AnyBoolean", Name: "C" }, { Type: "AnyBoolean", Name: "D" }]],
}, {
    Type: "Function",
    Function: "AnyBVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "OrBoolean",
        Left: { Type: "AnyBoolean", Name: "A" },
        Right: {
            Type: "Binary",
            Operator: "OrBoolean",
            Left: { Type: "AnyBoolean", Name: "B" },
            Right: { Type: "AnyBoolean", Name: "C" }
        }
    }],
    ResultArguments: [[{ Type: "AnyBoolean", Name: "A" }, { Type: "AnyBoolean", Name: "B" }, { Type: "AnyBoolean", Name: "C" }]],
}, {
    Type: "Binary",
    Operator: "AndBool",
    Pattern: [{
        Type: "Binary",
        Operator: "AndBoolean",
        Left: { Type: "AnyBoolean", Name: "A" },
        Right: { Type: "AnyBoolean", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyBoolean", Name: "A" }],
    ResultRight: [{ Type: "AnyBoolean", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "OrBool",
    Pattern: [{
        Type: "Binary",
        Operator: "OrBoolean",
        Left: { Type: "AnyBoolean", Name: "A" },
        Right: { Type: "AnyBoolean", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyBoolean", Name: "A" }],
    ResultRight: [{ Type: "AnyBoolean", Name: "B" }]
}, {
    Type: "Custom",
    Pattern: [{
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "Operand" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "Operand" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "Operand" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "Operand" }
    }],
    Convert(match) {
        const operand = MatchCSyntax([match["Operand"]], GLSLCSyntax)
        if (!operand) return undefined
        return {
            Type: "Function",
            Function: "BVec4",
            Arguments: [{
                Type: "Unary",
                Operator: "NotBool",
                Operand: operand
            }]
        }
    }
}, {
    Type: "Function",
    Function: "NotBVec4",
    Pattern: [{
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "A" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "B" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "C" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "D" }
    }],
    ResultArguments: [[
        { Type: "AnyBoolean", Name: "A" },
        { Type: "AnyBoolean", Name: "B" },
        { Type: "AnyBoolean", Name: "C" },
        { Type: "AnyBoolean", Name: "D" }
    ]]
}, {
    Type: "Custom",
    Pattern: [{
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "Operand" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "Operand" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "Operand" }
    }],
    Convert(match) {
        const operand = MatchCSyntax([match["Operand"]], GLSLCSyntax)
        if (!operand) return undefined
        return {
            Type: "Function",
            Function: "BVec3",
            Arguments: [{
                Type: "Unary",
                Operator: "NotBool",
                Operand: operand
            }]
        }
    }
}, {
    Type: "Function",
    Function: "NotBVec3",
    Pattern: [{
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "A" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "B" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "C" }
    }],
    ResultArguments: [[
        { Type: "AnyBoolean", Name: "A" },
        { Type: "AnyBoolean", Name: "B" },
        { Type: "AnyBoolean", Name: "C" }
    ]]
}, {
    Type: "Custom",
    Pattern: [{
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "Operand" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "Operand" }
    }],
    Convert(match) {
        const operand = MatchCSyntax([match["Operand"]], GLSLCSyntax)
        if (!operand) return undefined
        return {
            Type: "Function",
            Function: "BVec2",
            Arguments: [{
                Type: "Unary",
                Operator: "NotBool",
                Operand: operand
            }]
        }
    }
}, {
    Type: "Function",
    Function: "NotBVec2",
    Pattern: [{
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "A" }
    }, {
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "B" }
    }],
    ResultArguments: [[
        { Type: "AnyBoolean", Name: "A" },
        { Type: "AnyBoolean", Name: "B" }
    ]]
}, {
    Type: "Unary",
    Operator: "NotBool",
    Pattern: [{
        Type: "Unary",
        Operator: "NotBoolean",
        Operand: { Type: "AnyBoolean", Name: "A" }
    }],
    ResultOperand: [{ Type: "AnyBoolean", Name: "A" }]
}]