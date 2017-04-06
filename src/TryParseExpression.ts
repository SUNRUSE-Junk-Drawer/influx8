/// <reference path="Expression.ts" />
/// <reference path="Parenthesize.ts" />
/// <reference path="ParseConstantExpression.ts" />
/// <reference path="ParseOperatorExpression.ts" />
/// <reference path="ParseParenthesesExpression.ts" />

function TryParseExpression(tokens: ParenthesizedToken[]): RawExpression | undefined {
    return ParseConstantExpression(tokens) || ParseParenthesesExpression(tokens) || ParseOperatorExpression(tokens) || undefined
}