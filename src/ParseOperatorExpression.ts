/// <reference path="Precedence.ts" />
/// <reference path="ParseExpression.ts" />

type UntypedUnaryExpression = {
    Type: "UntypedUnary",
    Operator: UntypedUnary,
    Operand: RawExpression
}

type UntypedBinaryExpression = {
    Type: "UntypedBinary",
    Operator: UntypedBinary,
    Left: RawExpression
    Right: RawExpression
}

function ParseOperatorExpressionLevel(tokens: ParenthesizedToken[], level: PrecedenceLevel): UntypedUnaryExpression | UntypedBinaryExpression | undefined {
    if (level.Type == "Unary") {
        if (tokens.length < 2) return undefined
        const firstToken = tokens[0]
        if (firstToken.Type != "Operator") return undefined
        if (!Object.prototype.hasOwnProperty.call(UntypedUnaryKeywordsAndSymbols, firstToken.Symbol)) return undefined
        const operator = UntypedUnaryKeywordsAndSymbols[firstToken.Symbol]
        if (level.Operators.indexOf(operator) == -1) return undefined
        const operand = ParseExpression(tokens.slice(1))
        if (!operand) return undefined
        return {
            Type: "UntypedUnary",
            Operator: operator,
            Operand: operand
        }
    }
    return undefined
}

function ParseOperatorExpression(tokens: ParenthesizedToken[]): UntypedUnaryExpression | UntypedBinaryExpression | undefined {
    for (const level of Precedence) {
        const expression = ParseOperatorExpressionLevel(tokens, level)
        if (expression) return expression
    }
    return undefined
}