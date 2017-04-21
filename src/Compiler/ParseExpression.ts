/// <reference path="TryParseExpression.ts" />
/// <reference path="ParseStatementExpression.ts" />
/// <reference path="ParseLambdaExpression.ts" />

function ParseExpression(tokens: ParenthesizedToken[], startIndex: number, endIndex: number): RawExpression {
    return TryParseExpression(tokens) || ParseStatementExpression(tokens) || ParseLambdaExpression(tokens) || {
        Type: "Unknown",
        StartIndex: startIndex,
        EndIndex: endIndex,
        Tokens: tokens
    }
}