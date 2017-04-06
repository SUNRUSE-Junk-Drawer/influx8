type BooleanExpression = {
    Type: "Boolean"
    StartIndex: number
    Value: boolean
}

type IntegerExpression = {
    Type: "Integer"
    StartIndex: number
    Value: number
}

type UnaryExpression = {
    Type: "Unary",
    Operator: UntypedUnary,
    Operand: RawExpression
}

type BinaryExpression = {
    Type: "Binary",
    Operator: UntypedBinary,
    Left: RawExpression
    Right: RawExpression
}

type LetStatementWithoutIdentifierExpression = {
    Type: "LetWithoutIdentifier"
    StartIndex: number
    EndIndex: number
    Then: RawExpression
}

type LetStatementIncorrectIdentifierTypeExpression = {
    Type: "LetIncorrectIdentifierType"
    StartIndex: number
    EndIndex: number
    ActualType: string
    Value: RawExpression
    Then: RawExpression
}

type LetStatementExpression = {
    Type: "Let"
    StartIndex: number
    EndIndex: number
    Name: string
    NameStartIndex: number
    NameEndIndex: number
    Value: RawExpression
    Then: RawExpression
}

type ReturnStatementExpression = {
    Type: "Return"
    StartIndex: number
    EndIndex: number
    Value: RawExpression
}

type UnknownExpression = {
    Type: "Unknown"
    StartIndex: number
    EndIndex: number
    Tokens: ParenthesizedToken[]
}

type NextStatementNotFound = {
    Type: "NextStatementNotFound"
    Tokens: ParenthesizedToken[]
}

type RawExpression = UnknownExpression | BooleanExpression | IntegerExpression | BinaryExpression | UnaryExpression | LetStatementExpression | LetStatementWithoutIdentifierExpression | LetStatementIncorrectIdentifierTypeExpression | ReturnStatementExpression | NextStatementNotFound