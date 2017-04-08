/// <reference path="RawExpression.ts" />
/// <reference path="InlinedExpression.ts" />
/// <reference path="TypedUnary.ts" />
/// <reference path="TypedBinary.ts" />

type UnaryTypecheckedExpression = {
    Type: "Unary",
    Operator: TypedUnary,
    Operand: TypecheckedExpression
}

type UnaryUnmatchedTypecheckedExpression = {
    Type: "UnaryUnmatched",
    Operator: UntypedUnary,
    Operand: TypecheckedExpression
}

type BinaryTypecheckedExpression = {
    Type: "Binary",
    Operator: TypedBinary,
    Left: TypecheckedExpression
    Right: TypecheckedExpression
}

type BinaryUnmatchedTypecheckedExpression = {
    Type: "BinaryUnmatched",
    Operator: UntypedBinary,
    Left: TypecheckedExpression,
    Right: TypecheckedExpression
}

type LetStatementWithoutIdentifierTypecheckedExpression = {
    Type: "LetWithoutIdentifier"
    StartIndex: number
    EndIndex: number
    Then: TypecheckedExpression
}

type LetStatementIncorrectIdentifierTypeTypecheckedExpression = {
    Type: "LetIncorrectIdentifierType"
    StartIndex: number
    EndIndex: number
    ActualType: string
    Value: TypecheckedExpression
    Then: TypecheckedExpression
}

type LetStatementTypecheckedExpression = {
    Type: "Let"
    StartIndex: number
    EndIndex: number
    Name: string
    NameStartIndex: number
    NameEndIndex: number
    Value: TypecheckedExpression
    Then: TypecheckedExpression
}

type LetStatementNameNotUniqueTypecheckedExpression = {
    Type: "LetNameNotUnique"
    StartIndex: number
    EndIndex: number
    Name: string
    NameStartIndex: number
    NameEndIndex: number
    Value: TypecheckedExpression
    Then: TypecheckedExpression
}

type ReturnStatementTypecheckedExpression = {
    Type: "Return"
    StartIndex: number
    EndIndex: number
    Value: TypecheckedExpression
}

type TypecheckedtatementWithoutIdentifierTypecheckedExpression = {
    Type: "LambdaWithoutIdentifier"
    StartIndex: number
    EndIndex: number
    Body: TypecheckedExpression
}

type TypecheckedStatementIncorrectIdentifierTypeTypecheckedExpression = {
    Type: "LambdaIncorrectIdentifierType"
    StartIndex: number
    EndIndex: number
    ActualType: string
    NameStartIndex: number
    NameEndIndex: number
    Body: TypecheckedExpression
}

type ReferenceTypecheckedExpression = {
    Type: "Reference"
    StartIndex: number
    EndIndex: number
    Name: string
    Value: TypecheckedExpression
}

type CallTypecheckedExpression = {
    Type: "Call"
    Lambda: RawExpression
    Argument: TypecheckedExpression
    Result: TypecheckedExpression
}

type CallLambdaExpectedTypecheckedExpression = {
    Type: "CallLambdaExpected"
    Value: TypecheckedExpression
}

type TypecheckedExpression = UnknownExpression | BooleanExpression | IntegerExpression | BinaryTypecheckedExpression | BinaryUnmatchedTypecheckedExpression | UnaryTypecheckedExpression | UnaryUnmatchedTypecheckedExpression | LetStatementTypecheckedExpression | LetStatementWithoutIdentifierTypecheckedExpression | LetStatementIncorrectIdentifierTypeTypecheckedExpression | LetStatementNameNotUniqueTypecheckedExpression | ReturnStatementTypecheckedExpression | NextStatementNotFoundExpression | LambdaInlinedExpression | LambdaStatementWithoutIdentifierInlinedExpression | LambdaStatementIncorrectIdentifierTypeInlinedExpression | LambdaNameNotUniqueInlinedExpression | ReferenceTypecheckedExpression | ReferenceUndefinedInlinedExpression | CallTypecheckedExpression | CallLambdaExpectedTypecheckedExpression