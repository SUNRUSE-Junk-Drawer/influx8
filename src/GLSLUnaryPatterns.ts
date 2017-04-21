/// <reference path="CSyntax.ts" />
/// <reference path="GLSLCSyntaxBase.ts" />

const GLSLUnaryPatterns: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] = [{
    Type: "Unary",
    Operator: "NegateIVec4",
    Pattern: [{
        Type: "Unary",
        Operator: "NegateInteger",
        Operand: { Type: "AnyInteger", Name: "A" }
    }, {
        Type: "Unary",
        Operator: "NegateInteger",
        Operand: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Unary",
        Operator: "NegateInteger",
        Operand: { Type: "AnyInteger", Name: "C" }
    }, {
        Type: "Unary",
        Operator: "NegateInteger",
        Operand: { Type: "AnyInteger", Name: "D" }
    }],
    ResultOperand: [
        { Type: "AnyInteger", Name: "A" },
        { Type: "AnyInteger", Name: "B" },
        { Type: "AnyInteger", Name: "C" },
        { Type: "AnyInteger", Name: "D" }
    ]
}, {
    Type: "Unary",
    Operator: "NegateIVec3",
    Pattern: [{
        Type: "Unary",
        Operator: "NegateInteger",
        Operand: { Type: "AnyInteger", Name: "A" }
    }, {
        Type: "Unary",
        Operator: "NegateInteger",
        Operand: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Unary",
        Operator: "NegateInteger",
        Operand: { Type: "AnyInteger", Name: "C" }
    }],
    ResultOperand: [
        { Type: "AnyInteger", Name: "A" },
        { Type: "AnyInteger", Name: "B" },
        { Type: "AnyInteger", Name: "C" }
    ]
}, {
    Type: "Unary",
    Operator: "NegateIVec2",
    Pattern: [{
        Type: "Unary",
        Operator: "NegateInteger",
        Operand: { Type: "AnyInteger", Name: "A" }
    }, {
        Type: "Unary",
        Operator: "NegateInteger",
        Operand: { Type: "AnyInteger", Name: "B" }
    }],
    ResultOperand: [
        { Type: "AnyInteger", Name: "A" },
        { Type: "AnyInteger", Name: "B" }
    ]
}, {
    Type: "Unary",
    Operator: "NegateInt",
    Pattern: [{
        Type: "Unary",
        Operator: "NegateInteger",
        Operand: { Type: "AnyInteger", Name: "A" }
    }],
    ResultOperand: [{ Type: "AnyInteger", Name: "A" }]
}, {
    Type: "Unary",
    Operator: "NegateVec4",
    Pattern: [{
        Type: "Unary",
        Operator: "NegateFloat",
        Operand: { Type: "AnyFloat", Name: "A" }
    }, {
        Type: "Unary",
        Operator: "NegateFloat",
        Operand: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Unary",
        Operator: "NegateFloat",
        Operand: { Type: "AnyFloat", Name: "C" }
    }, {
        Type: "Unary",
        Operator: "NegateFloat",
        Operand: { Type: "AnyFloat", Name: "D" }
    }],
    ResultOperand: [
        { Type: "AnyFloat", Name: "A" },
        { Type: "AnyFloat", Name: "B" },
        { Type: "AnyFloat", Name: "C" },
        { Type: "AnyFloat", Name: "D" }
    ]
}, {
    Type: "Unary",
    Operator: "NegateVec3",
    Pattern: [{
        Type: "Unary",
        Operator: "NegateFloat",
        Operand: { Type: "AnyFloat", Name: "A" }
    }, {
        Type: "Unary",
        Operator: "NegateFloat",
        Operand: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Unary",
        Operator: "NegateFloat",
        Operand: { Type: "AnyFloat", Name: "C" }
    }],
    ResultOperand: [
        { Type: "AnyFloat", Name: "A" },
        { Type: "AnyFloat", Name: "B" },
        { Type: "AnyFloat", Name: "C" }
    ]
}, {
    Type: "Unary",
    Operator: "NegateVec2",
    Pattern: [{
        Type: "Unary",
        Operator: "NegateFloat",
        Operand: { Type: "AnyFloat", Name: "A" }
    }, {
        Type: "Unary",
        Operator: "NegateFloat",
        Operand: { Type: "AnyFloat", Name: "B" }
    }],
    ResultOperand: [
        { Type: "AnyFloat", Name: "A" },
        { Type: "AnyFloat", Name: "B" }
    ]
}, {
    Type: "Unary",
    Operator: "NegateFloat",
    Pattern: [{
        Type: "Unary",
        Operator: "NegateFloat",
        Operand: { Type: "AnyFloat", Name: "A" }
    }],
    ResultOperand: [{ Type: "AnyFloat", Name: "A" }]
}, {
    Type: "Function",
    Function: "BVec4",
    Pattern: [{
        Type: "AnyBoolean",
        Name: "A"
    }, {
        Type: "AnyBoolean",
        Name: "A"
    }, {
        Type: "AnyBoolean",
        Name: "A"
    }, {
        Type: "AnyBoolean",
        Name: "A"
    }],
    ResultArguments: [
        [{ Type: "AnyBoolean", Name: "A" }]
    ]
}]