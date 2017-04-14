/// <reference path="VerifiedExpression.ts" />
/// <reference path="TypedUnary.ts" />
/// <reference path="TypedBinary.ts" />

type AnyBooleanPattern = {
    Type: "AnyBoolean"
    Name: string
}

type AnyIntegerPattern = {
    Type: "AnyInteger"
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

type Pattern = AnyBooleanPattern | AnyIntegerPattern | BinaryPattern | UnaryPattern | BooleanPattern | IntegerPattern

type PatternMatch = { [name: string]: VerifiedExpression }