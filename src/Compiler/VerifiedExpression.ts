/// <reference path="TypedUnary.ts" />
/// <reference path="TypedBinary.ts" />
/// <reference path="Primitive.ts" />

type BooleanVerifiedExpression = {
    Type: "Boolean"
    Value: boolean
}

type IntegerVerifiedExpression = {
    Type: "Integer"
    Value: number
}

type FloatVerifiedExpression = {
    Type: "Float"
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

type ParameterVerifiedExpression = {
    Type: "Parameter"
    Name: string
    Item: number
    Plurality: number
    Primitive: Primitive
}

type VerifiedExpression = BooleanVerifiedExpression | IntegerVerifiedExpression | FloatVerifiedExpression | UnaryVerifiedExpression | BinaryVerifiedExpression | ParameterVerifiedExpression