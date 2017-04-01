/// <reference path="Parenthesize.ts" />
/// <reference path="ParseConstantExpression.ts" />
/// <reference path="ParseOperatorExpression.ts" />
/// <reference path="ParseParenthesesExpression.ts" />

type UnknownExpression = {
    Type: "Unknown"
    Tokens: ParenthesizedToken[]
}

type RawExpression = UnknownExpression | BooleanExpression | IntegerExpression | UntypedBinaryExpression | UntypedUnaryExpression

function TryParseExpression(tokens: ParenthesizedToken[]): RawExpression | undefined {
    return ParseConstantExpression(tokens) || ParseParenthesesExpression(tokens) || ParseOperatorExpression(tokens) || undefined
}