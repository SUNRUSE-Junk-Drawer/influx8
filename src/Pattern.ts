/// <reference path="VerifiedExpression.ts" />
/// <reference path="TypedUnary.ts" />
/// <reference path="TypedBinary.ts" />
/// <reference path="Primitive.ts" />

type AnyBooleanPattern = {
    Type: "AnyBoolean"
    Name: string
}

type AnyIntegerPattern = {
    Type: "AnyInteger"
    Name: string
}

type AnyFloatPattern = {
    Type: "AnyFloat"
    Name: string
}

type AnyParameterPattern = {
    Type: "AnyParameter"
    Name: string
}

type BinaryPattern = {
    Type: "Binary"
    Operator: TypedBinary
    Left: Pattern
    Right: Pattern
}

type UnaryPattern = {
    Type: "Unary"
    Operator: TypedUnary
    Operand: Pattern
}

type BooleanPattern = {
    Type: "Boolean"
    Value: boolean
}

type IntegerPattern = {
    Type: "Integer"
    Value: number
}

type Pattern = AnyBooleanPattern | AnyIntegerPattern | AnyFloatPattern | BinaryPattern | UnaryPattern | BooleanPattern | IntegerPattern | AnyParameterPattern

type PatternMatch = { [name: string]: VerifiedExpression }