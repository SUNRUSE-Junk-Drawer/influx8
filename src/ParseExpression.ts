/// <reference path="TryParseExpression.ts" />
/// <reference path="ParseStatementExpression.ts" />

function ParseExpression(tokens: ParenthesizedToken[], startIndex: number, endIndex: number): RawExpression {
    return TryParseExpression(tokens) || ParseStatementExpression(tokens) || {
        Type: "Unknown",
        StartIndex: startIndex,
        EndIndex: endIndex,
        Tokens: tokens
    }
}