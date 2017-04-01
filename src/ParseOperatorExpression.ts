/// <reference path="Precedence.ts" />
/// <reference path="TryParseExpression.ts" />

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
        const operand = TryParseExpression(tokens.slice(1))
        if (!operand) return undefined
        return {
            Type: "UntypedUnary",
            Operator: operator,
            Operand: operand
        }
    } else for (let i = 1; i < tokens.length - 1; i++) {
        const token = tokens[i]
        if (token.Type != "Operator") continue
        if (!Object.prototype.hasOwnProperty.call(UntypedBinaryKeywordsAndSymbols, token.Symbol)) continue
        const operator = UntypedBinaryKeywordsAndSymbols[token.Symbol]
        if (level.Operators.indexOf(operator) == -1) continue
        const left = TryParseExpression(tokens.slice(0, i))
        if (!left) continue
        const right = TryParseExpression(tokens.slice(i + 1))
        if (!right) continue
        return {
            Type: "UntypedBinary",
            Operator: operator,
            Left: left,
            Right: right
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