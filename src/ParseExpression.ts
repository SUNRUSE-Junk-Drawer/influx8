/// <reference path="TryParseExpression.ts" />

function ParseExpression(tokens: ParenthesizedToken[], startIndex: number, endIndex: number): RawExpression {
    return TryParseExpression(tokens) || {
        Type: "Unknown",
        StartIndex: startIndex,
        EndIndex: endIndex,
        Tokens: tokens
    }
}