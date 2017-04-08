/// <reference path="UntypedUnary.ts" />
/// <reference path="UntypedBinary.ts" />

type BooleanVerifiedExpression = {
    Type: "Boolean"
    Value: boolean
}

type IntegerVerifiedExpression = {
    Type: "Integer"
    Value: number
}

type UnaryVerifiedExpression = {
    Type: "Unary"
    Operator: UntypedUnary
    Operand: VerifiedExpression
}

type BinaryVerifiedExpression = {
    Type: "Binary"
    Operator: UntypedBinary
    Left: VerifiedExpression
    Right: VerifiedExpression
}

type VerifiedExpression = BooleanVerifiedExpression | IntegerVerifiedExpression | UnaryVerifiedExpression | BinaryVerifiedExpression