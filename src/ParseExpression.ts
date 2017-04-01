/// <reference path="Parenthesize.ts" />
/// <reference path="ParseConstantExpression.ts" />
/// <reference path="ParseOperatorExpression.ts" />

type UnknownExpression = {
    Type: "Unknown"
    Tokens: ParenthesizedToken[]
}

type RawExpression = UnknownExpression | BooleanExpression | IntegerExpression | UntypedBinaryExpression | UntypedUnaryExpression

function ParseExpression(tokens: ParenthesizedToken[]): RawExpression | undefined {
    return ParseConstantExpression(tokens) || ParseOperatorExpression(tokens)
}