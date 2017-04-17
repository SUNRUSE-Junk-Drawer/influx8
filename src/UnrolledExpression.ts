/// <reference path="InlinedExpression.ts" />

type ConcatenateLeftUnrolledExpression = {
    Type: "ConcatenateLeft"
    Value: UnrolledExpression
}

type ConcatenateRightUnrolledExpression = {
    Type: "ConcatenateRight"
    Value: UnrolledExpression
}

type UnaryUnrolledExpression = {
    Type: "Unary"
    Operator: UntypedUnary
    Operand: UnrolledExpression
}

type BinaryUnrolledExpression = {
    Type: "Binary"
    Operator: UntypedBinary
    Left: UnrolledExpression
    Right: UnrolledExpression
}

type BinaryInconsistentPluralityUnrolledExpression = {
    Type: "BinaryInconsistentPlurality"
    Operator: UntypedBinary
    Left: UnrolledExpression[]
    Right: UnrolledExpression[]
}

type LetStatementWithoutIdentifierUnrolledExpression = {
    Type: "LetWithoutIdentifier"
    StartIndex: number
    EndIndex: number
    Then: UnrolledExpression
}

type LetStatementIncorrectIdentifierTypeUnrolledExpression = {
    Type: "LetIncorrectIdentifierType"
    StartIndex: number
    EndIndex: number
    ActualType: string
    Value: UnrolledExpression[]
    Then: UnrolledExpression
}

type LetStatementUnrolledExpression = {
    Type: "Let"
    StartIndex: number
    EndIndex: number
    Name: string
    NameStartIndex: number
    NameEndIndex: number
    Value: UnrolledExpression[]
    Then: UnrolledExpression
}

type LetStatementNameNotUniqueUnrolledExpression = {
    Type: "LetNameNotUnique"
    StartIndex: number
    EndIndex: number
    Name: string
    NameStartIndex: number
    NameEndIndex: number
    Value: UnrolledExpression[]
    Then: UnrolledExpression
}

type ReturnStatementUnrolledExpression = {
    Type: "Return"
    StartIndex: number
    EndIndex: number
    Value: UnrolledExpression
}

type LambdaUnrolledExpression = {
    Type: "Lambda"
    StartIndex: number
    EndIndex: number
    Name: string
    NameStartIndex: number
    NameEndIndex: number
    Body: RawExpression
    Scope: Scope
}

type LambdaStatementWithoutIdentifierUnrolledExpression = {
    Type: "LambdaWithoutIdentifier"
    StartIndex: number
    EndIndex: number
    Body: UnrolledExpression
}

type LambdaStatementIncorrectIdentifierTypeUnrolledExpression = {
    Type: "LambdaIncorrectIdentifierType"
    StartIndex: number
    EndIndex: number
    ActualType: string
    NameStartIndex: number
    NameEndIndex: number
    Body: UnrolledExpression
}

type LambdaNameNotUniqueUnrolledExpression = {
    Type: "LambdaNameNotUnique"
    StartIndex: number
    EndIndex: number
    Name: string
    NameStartIndex: number
    NameEndIndex: number
    Body: RawExpression
    Scope: Scope
}

type ReferenceUnrolledExpression = {
    Type: "Reference"
    StartIndex: number
    EndIndex: number
    Name: string
    Value: UnrolledExpression
}

type ReferenceUndefinedUnrolledExpression = {
    Type: "ReferenceUndefined"
    StartIndex: number
    EndIndex: number
    Name: string
}

type CallUnrolledExpression = {
    Type: "Call"
    Lambda: RawExpression
    Argument: UnrolledExpression[]
    Result: UnrolledExpression
}

type CallLambdaExpectedUnrolledExpression = {
    Type: "CallLambdaExpected"
    Value: UnrolledExpression[]
}

type GetItemUnrolledExpression = {
    Type: "GetItem"
    Item: number
    Of: UnrolledExpression[]
    Value: UnrolledExpression
}

type GetItemOutOfRangeUnrolledExpression = {
    Type: "GetItemOutOfRange"
    Item: number
    Of: UnrolledExpression[]
}

type ParameterUnrolledExpression = {
    Type: "Parameter"
    Name: string
    Primitive: Primitive
    Item: number
    Plurality: number
}

type UnrolledExpression = ConcatenateLeftUnrolledExpression | ConcatenateRightUnrolledExpression | UnknownExpression | BooleanExpression | IntegerExpression | BinaryUnrolledExpression | BinaryInconsistentPluralityUnrolledExpression | UnaryUnrolledExpression | LetStatementUnrolledExpression | LetStatementWithoutIdentifierUnrolledExpression | LetStatementIncorrectIdentifierTypeUnrolledExpression | LetStatementNameNotUniqueUnrolledExpression | ReturnStatementUnrolledExpression | NextStatementNotFoundExpression | LambdaUnrolledExpression | LambdaStatementWithoutIdentifierUnrolledExpression | LambdaStatementIncorrectIdentifierTypeUnrolledExpression | LambdaNameNotUniqueUnrolledExpression | ReferenceUnrolledExpression | ReferenceUndefinedUnrolledExpression | CallUnrolledExpression | CallLambdaExpectedUnrolledExpression | GetItemUnrolledExpression | GetItemOutOfRangeUnrolledExpression | ParameterUnrolledExpression | FloatExpression