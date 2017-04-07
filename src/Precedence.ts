/// <reference path="UntypedUnary.ts" />
/// <reference path="UntypedBinary.ts" />

type PrecedenceLevel =
    {
        Type: "Unary"
        Operators: UntypedUnary[]
    } | {
        Type: "Binary"
        Operators: UntypedBinary[]
    }

const Precedence: PrecedenceLevel[] = [{
    Type: "Binary",
    Operators: ["And"]
}, {
    Type: "Unary",
    Operators: ["Not"]
}, {
    Type: "Binary",
    Operators: ["Or"]
}, {
    Type: "Binary",
    Operators: ["Equal", "NotEqual", "GreaterThan", "GreaterThanOrEqualTo", "LessThan", "LessThanOrEqualTo"]
}, {
    Type: "Binary",
    Operators: ["Call"]
}, {
    Type: "Binary",
    Operators: ["Subtract"]
}, {
    Type: "Binary",
    Operators: ["Add"]
}, {
    Type: "Binary",
    Operators: ["Multiply"]
}, {
    Type: "Binary",
    Operators: ["Divide"]
}, {
    Type: "Unary",
    Operators: ["Negate"]
}]