/// <reference path="CSyntax.ts" />

type JavaScriptUnary = "Negate" | "Not"
type JavaScriptBinary = "And" | "Or" | "Add" | "Subtract" | "Multiply" | "Divide"
type JavaScriptFunction = never

const JavaScriptCSyntax: CSyntax<JavaScriptUnary, JavaScriptBinary, JavaScriptFunction> = {
    UnarySymbolsOrKeywords: {
        Negate: "-",
        Not: "!"
    },
    BinarySymbolsOrKeywords: {
        And: "&&",
        Or: "||",
        Add: "+",
        Subtract: "-",
        Multiply: "*",
        Divide: "/"
    },
    FunctionSymbolsOrKeywords: {},
    Patterns: [{
        Type: "Custom",
        Pattern: [{
            Type: "AnyParameter",
            Name: "Parameter"
        }],
        Convert(match) {
            const parameter = match["Parameter"] as ParameterVerifiedExpression
            if (parameter.Plurality == 1) return {
                Type: "Reference",
                Name: parameter.Name
            }
            return {
                Type: "Reference",
                Name: `${parameter.Name}[${parameter.Item}]`
            }
        }
    }, {
        Type: "Binary",
        Operator: "And",
        Pattern: [{
            Type: "Binary",
            Operator: "AndBoolean",
            Left: { Type: "AnyBoolean", Name: "Left" },
            Right: { Type: "AnyBoolean", Name: "Right" }
        }],
        ResultLeft: [{ Type: "AnyBoolean", Name: "Left" }],
        ResultRight: [{ Type: "AnyBoolean", Name: "Right" }]
    }, {
        Type: "Binary",
        Operator: "Or",
        Pattern: [{
            Type: "Binary",
            Operator: "OrBoolean",
            Left: { Type: "AnyBoolean", Name: "Left" },
            Right: { Type: "AnyBoolean", Name: "Right" }
        }],
        ResultLeft: [{ Type: "AnyBoolean", Name: "Left" }],
        ResultRight: [{ Type: "AnyBoolean", Name: "Right" }]
    }, {
        Type: "Binary",
        Operator: "Add",
        Pattern: [{
            Type: "Binary",
            Operator: "AddInteger",
            Left: { Type: "AnyInteger", Name: "Left" },
            Right: { Type: "AnyInteger", Name: "Right" }
        }],
        ResultLeft: [{ Type: "AnyInteger", Name: "Left" }],
        ResultRight: [{ Type: "AnyInteger", Name: "Right" }]
    }, {
        Type: "Binary",
        Operator: "Subtract",
        Pattern: [{
            Type: "Binary",
            Operator: "SubtractInteger",
            Left: { Type: "AnyInteger", Name: "Left" },
            Right: { Type: "AnyInteger", Name: "Right" }
        }],
        ResultLeft: [{ Type: "AnyInteger", Name: "Left" }],
        ResultRight: [{ Type: "AnyInteger", Name: "Right" }]
    }, {
        Type: "Binary",
        Operator: "Multiply",
        Pattern: [{
            Type: "Binary",
            Operator: "MultiplyInteger",
            Left: { Type: "AnyInteger", Name: "Left" },
            Right: { Type: "AnyInteger", Name: "Right" }
        }],
        ResultLeft: [{ Type: "AnyInteger", Name: "Left" }],
        ResultRight: [{ Type: "AnyInteger", Name: "Right" }]
    }, {
        Type: "Binary",
        Operator: "Add",
        Pattern: [{
            Type: "Binary",
            Operator: "AddFloat",
            Left: { Type: "AnyFloat", Name: "Left" },
            Right: { Type: "AnyFloat", Name: "Right" }
        }],
        ResultLeft: [{ Type: "AnyFloat", Name: "Left" }],
        ResultRight: [{ Type: "AnyFloat", Name: "Right" }]
    }, {
        Type: "Binary",
        Operator: "Subtract",
        Pattern: [{
            Type: "Binary",
            Operator: "SubtractFloat",
            Left: { Type: "AnyFloat", Name: "Left" },
            Right: { Type: "AnyFloat", Name: "Right" }
        }],
        ResultLeft: [{ Type: "AnyFloat", Name: "Left" }],
        ResultRight: [{ Type: "AnyFloat", Name: "Right" }]
    }, {
        Type: "Binary",
        Operator: "Multiply",
        Pattern: [{
            Type: "Binary",
            Operator: "MultiplyFloat",
            Left: { Type: "AnyFloat", Name: "Left" },
            Right: { Type: "AnyFloat", Name: "Right" }
        }],
        ResultLeft: [{ Type: "AnyFloat", Name: "Left" }],
        ResultRight: [{ Type: "AnyFloat", Name: "Right" }]
    }, {
        Type: "Binary",
        Operator: "Divide",
        Pattern: [{
            Type: "Binary",
            Operator: "DivideFloat",
            Left: { Type: "AnyFloat", Name: "Left" },
            Right: { Type: "AnyFloat", Name: "Right" }
        }],
        ResultLeft: [{ Type: "AnyFloat", Name: "Left" }],
        ResultRight: [{ Type: "AnyFloat", Name: "Right" }]
    }, {
        Type: "Unary",
        Operator: "Not",
        Pattern: [{
            Type: "Unary",
            Operator: "NotBoolean",
            Operand: { Type: "AnyBoolean", Name: "Operand" }
        }],
        ResultOperand: [{ Type: "AnyBoolean", Name: "Operand" }],
    }, {
        Type: "Unary",
        Operator: "Negate",
        Pattern: [{
            Type: "Unary",
            Operator: "NegateInteger",
            Operand: { Type: "AnyInteger", Name: "Operand" }
        }],
        ResultOperand: [{ Type: "AnyInteger", Name: "Operand" }],
    }, {
        Type: "Unary",
        Operator: "Negate",
        Pattern: [{
            Type: "Unary",
            Operator: "NegateFloat",
            Operand: { Type: "AnyFloat", Name: "Operand" }
        }],
        ResultOperand: [{ Type: "AnyFloat", Name: "Operand" }],
    }]
}