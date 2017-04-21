/// <reference path="RawExpression.ts" />
/// <reference path="UnrolledExpression.ts" />
/// <reference path="TypedUnary.ts" />
/// <reference path="TypedBinary.ts" />
/// <reference path="Primitive.ts" />

type ConcatenateLeftTypecheckedExpression = {
    Type: "ConcatenateLeft"
    Value: TypecheckedExpression
}

type ConcatenateRightTypecheckedExpression = {
    Type: "ConcatenateRight"
    Value: TypecheckedExpression
}

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

type BinaryInconsistentPluralityTypecheckedExpression = {
    Type: "BinaryInconsistentPlurality"
    Operator: UntypedBinary
    Left: TypecheckedExpression[]
    Right: TypecheckedExpression[]
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
    Value: TypecheckedExpression[]
    Then: TypecheckedExpression
}

type LetStatementTypecheckedExpression = {
    Type: "Let"
    StartIndex: number
    EndIndex: number
    Name: string
    NameStartIndex: number
    NameEndIndex: number
    Value: TypecheckedExpression[]
    Then: TypecheckedExpression
}

type LetStatementNameNotUniqueTypecheckedExpression = {
    Type: "LetNameNotUnique"
    StartIndex: number
    EndIndex: number
    Name: string
    NameStartIndex: number
    NameEndIndex: number
    Value: TypecheckedExpression[]
    Then: TypecheckedExpression
}

type ReturnStatementTypecheckedExpression = {
    Type: "Return"
    StartIndex: number
    EndIndex: number
    Value: TypecheckedExpression
}

type LambdaStatementWithoutIdentifierTypecheckedExpression = {
    Type: "LambdaWithoutIdentifier"
    StartIndex: number
    EndIndex: number
    Body: TypecheckedExpression
}

type LambdaStatementIncorrectIdentifierTypeTypecheckedExpression = {
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
    Argument: TypecheckedExpression[]
    Result: TypecheckedExpression
}

type CallLambdaExpectedTypecheckedExpression = {
    Type: "CallLambdaExpected"
    Value: TypecheckedExpression[]
}

type GetItemTypecheckedExpression = {
    Type: "GetItem"
    Item: number
    Of: TypecheckedExpression[]
    Value: TypecheckedExpression
}

type GetItemOutOfRangeTypecheckedExpression = {
    Type: "GetItemOutOfRange"
    Item: number
    Of: TypecheckedExpression[]
}

type ParameterTypecheckedExpression = {
    Type: "Parameter"
    Name: string
    Primitive: Primitive
    Item: number
    Plurality: number
}

type TypecheckedExpression = UnknownExpression | BooleanExpression | IntegerExpression | BinaryTypecheckedExpression | BinaryUnmatchedTypecheckedExpression | BinaryInconsistentPluralityTypecheckedExpression | UnaryTypecheckedExpression | UnaryUnmatchedTypecheckedExpression | LetStatementTypecheckedExpression | LetStatementWithoutIdentifierTypecheckedExpression | LetStatementIncorrectIdentifierTypeTypecheckedExpression | LetStatementNameNotUniqueTypecheckedExpression | ReturnStatementTypecheckedExpression | NextStatementNotFoundExpression | LambdaUnrolledExpression | LambdaStatementWithoutIdentifierUnrolledExpression | LambdaStatementIncorrectIdentifierTypeUnrolledExpression | LambdaNameNotUniqueUnrolledExpression | ReferenceTypecheckedExpression | ReferenceUndefinedUnrolledExpression | CallTypecheckedExpression | CallLambdaExpectedTypecheckedExpression | ConcatenateLeftTypecheckedExpression | ConcatenateRightTypecheckedExpression | GetItemTypecheckedExpression | GetItemOutOfRangeTypecheckedExpression | ParameterTypecheckedExpression | FloatExpression