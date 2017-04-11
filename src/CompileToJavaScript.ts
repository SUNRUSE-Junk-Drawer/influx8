/// <reference path="VerifiedExpression.ts" />

const JavaScriptUnarySymbolsOrKeywords: {[operator in TypedUnary]: string} = {
    NotBoolean: "!",
    NegateInteger: "-"
}

const JavaScriptBinarySymbolsOrKeywords: {[operator in TypedBinary]: string} = {
    AndBoolean: "&&",
    OrBoolean: "||",
    EqualBoolean: "==",
    NotEqualBoolean: "!=",

    AddInteger: "+",
    SubtractInteger: "-",
    MultiplyInteger: "*",
    EqualInteger: "==",
    NotEqualInteger: "!=",
    GreaterThanInteger: ">",
    GreaterThanOrEqualToInteger: ">=",
    LessThanInteger: "<",
    LessThanOrEqualToInteger: "<="
}

function CompileToJavaScript(expression: VerifiedExpression): string {
    switch (expression.Type) {
        case "Boolean":
        case "Integer":
            return JSON.stringify(expression.Value)

        case "Unary":
            return `(${JavaScriptUnarySymbolsOrKeywords[expression.Operator]}${CompileToJavaScript(expression.Operand)})`

        case "Binary":
            return `(${CompileToJavaScript(expression.Left)} ${JavaScriptBinarySymbolsOrKeywords[expression.Operator]} ${CompileToJavaScript(expression.Right)})`
    }
}