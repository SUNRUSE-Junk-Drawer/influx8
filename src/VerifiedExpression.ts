/// <reference path="TypedUnary.ts" />
/// <reference path="TypedBinary.ts" />

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
    Operator: TypedUnary
    Operand: VerifiedExpression
}

type BinaryVerifiedExpression = {
    Type: "Binary"
    Operator: TypedBinary
    Left: VerifiedExpression
    Right: VerifiedExpression
}

type VerifiedExpression = BooleanVerifiedExpression | IntegerVerifiedExpression | UnaryVerifiedExpression | BinaryVerifiedExpression