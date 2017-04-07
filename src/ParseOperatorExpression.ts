/// <reference path="Precedence.ts" />
/// <reference path="TryParseExpression.ts" />

function ParseOperatorExpressionLevel(tokens: ParenthesizedToken[], level: PrecedenceLevel): UnaryRawExpression | BinaryRawExpression | undefined {
    function TryBinary(operators: UntypedBinary[], i: number): BinaryRawExpression | undefined {
        const token = tokens[i]
        if (token.Type != "Operator") return undefined
        if (!Object.prototype.hasOwnProperty.call(UntypedBinaryKeywordsAndSymbols, token.Symbol)) return undefined
        const operator = UntypedBinaryKeywordsAndSymbols[token.Symbol]
        if (operators.indexOf(operator) == -1) return undefined
        const left = TryParseExpression(tokens.slice(0, i))
        if (!left) return undefined
        const right = TryParseExpression(tokens.slice(i + 1))
        if (!right) return undefined
        return {
            Type: "Binary",
            Operator: operator,
            Left: left,
            Right: right
        }
    }

    switch (level.Type) {
        case "Unary": {
            if (tokens.length < 2) return undefined
            const firstToken = tokens[0]
            if (firstToken.Type != "Operator") return undefined
            if (!Object.prototype.hasOwnProperty.call(UntypedUnaryKeywordsAndSymbols, firstToken.Symbol)) return undefined
            const operator = UntypedUnaryKeywordsAndSymbols[firstToken.Symbol]
            if (level.Operators.indexOf(operator) == -1) return undefined
            const operand = TryParseExpression(tokens.slice(1))
            if (!operand) return undefined
            return {
                Type: "Unary",
                Operator: operator,
                Operand: operand
            }
        }

        case "BinaryLeftToRight": {
            for (let i = 1; i < tokens.length - 1; i++) {
                const result = TryBinary(level.Operators, i)
                if (result) return result
            }
            return undefined
        }

        case "BinaryRightToLeft": {
            for (let i = tokens.length - 2; i > 0; i--) {
                const result = TryBinary(level.Operators, i)
                if (result) return result
            }
            return undefined
        }
    }
}

function ParseOperatorExpression(tokens: ParenthesizedToken[]): UnaryRawExpression | BinaryRawExpression | undefined {
    for (const level of Precedence) {
        const expression = ParseOperatorExpressionLevel(tokens, level)
        if (expression) return expression
    }
    return undefined
}