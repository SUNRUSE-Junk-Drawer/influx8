/// <reference path="UntypedUnary.ts" />
/// <reference path="UntypedBinary.ts" />

type PrecedenceLevel =
    {
        Type: "Unary"
        Operators: UntypedUnary[]
    } | {
        Type: "BinaryLeftToRight"
        Operators: UntypedBinary[]
    } | {
        Type: "BinaryRightToLeft"
        Operators: UntypedBinary[]
    }

const Precedence: PrecedenceLevel[] = [{
    Type: "BinaryLeftToRight",
    Operators: ["And"]
}, {
    Type: "Unary",
    Operators: ["Not"]
}, {
    Type: "BinaryLeftToRight",
    Operators: ["Or"]
}, {
    Type: "BinaryLeftToRight",
    Operators: ["Equal", "NotEqual", "GreaterThan", "GreaterThanOrEqualTo", "LessThan", "LessThanOrEqualTo"]
}, {
    Type: "BinaryRightToLeft",
    Operators: ["Call"]
}, {
    Type: "BinaryLeftToRight",
    Operators: ["Subtract"]
}, {
    Type: "BinaryLeftToRight",
    Operators: ["Add"]
}, {
    Type: "BinaryLeftToRight",
    Operators: ["Multiply"]
}, {
    Type: "BinaryLeftToRight",
    Operators: ["Divide"]
}, {
    Type: "Unary",
    Operators: ["Negate"]
}]