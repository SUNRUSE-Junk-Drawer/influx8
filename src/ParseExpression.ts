/// <reference path="Parenthesize.ts" />
/// <reference path="ParseConstantExpression.ts" />

type UnknownExpression = {
    Type: "Unknown"
    Tokens: ParenthesizedToken[]
}

type RawExpression = UnknownExpression | BooleanExpression | IntegerExpression

function ParseExpression(tokens: ParenthesizedToken[]): RawExpression | undefined {
    return ParseConstantExpression(tokens)
}