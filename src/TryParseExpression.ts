/// <reference path="Parenthesize.ts" />
/// <reference path="ParseConstantExpression.ts" />
/// <reference path="ParseOperatorExpression.ts" />
/// <reference path="ParseParenthesesExpression.ts" />

type UnknownExpression = {
    Type: "Unknown"
    StartIndex: number
    EndIndex: number
    Tokens: ParenthesizedToken[]
}

type RawExpression = UnknownExpression | BooleanExpression | IntegerExpression | BinaryExpression | UnaryExpression | LetStatementExpression | LetStatementWithoutIdentifierExpression | LetStatementIncorrectIdentifierTypeExpression | ReturnStatementExpression | NextStatementNotFound

function TryParseExpression(tokens: ParenthesizedToken[]): RawExpression | undefined {
    return ParseConstantExpression(tokens) || ParseParenthesesExpression(tokens) || ParseOperatorExpression(tokens) || undefined
}