/// <reference path="UntypedBinary.ts" />
/// <reference path="Primitive.ts" />

type TypedBinary =
    "AndBoolean" | "OrBoolean" | "EqualBoolean" | "NotEqualBoolean"
    | "AddInteger" | "SubtractInteger" | "MultiplyInteger" | "EqualInteger" | "NotEqualInteger" | "GreaterThanInteger" | "LessThanInteger" | "GreaterThanOrEqualToInteger" | "LessThanOrEqualToInteger"

const BinaryTypeMappings: {
    [untyped in UntypedBinary]: {
        [primitive in Primitive]: TypedBinary | undefined
    }
} = {
        And: {
            Boolean: "AndBoolean",
            Integer: undefined
        },
        Or: {
            Boolean: "OrBoolean",
            Integer: undefined
        },
        "Equal": {
            Boolean: "EqualBoolean",
            Integer: "EqualInteger"
        },
        "NotEqual": {
            Boolean: "NotEqualBoolean",
            Integer: "NotEqualInteger"
        },
        "Add": {
            Boolean: undefined,
            Integer: "AddInteger"
        },
        "Subtract": {
            Boolean: undefined,
            Integer: "SubtractInteger"
        },
        "Multiply": {
            Boolean: undefined,
            Integer: "MultiplyInteger"
        },
        "Divide": {
            Boolean: undefined,
            Integer: undefined
        },
        "GreaterThan": {
            Boolean: undefined,
            Integer: "GreaterThanInteger"
        },
        "GreaterThanOrEqualTo": {
            Boolean: undefined,
            Integer: "GreaterThanOrEqualToInteger"
        },
        "LessThan": {
            Boolean: undefined,
            Integer: "LessThanInteger"
        },
        "LessThanOrEqualTo": {
            Boolean: undefined,
            Integer: "LessThanOrEqualToInteger"
        },
        "Call": { // This should never be emitted, but is in the UntypedBinary type.
            Boolean: undefined,
            Integer: undefined
        }
    }

const BinaryReturnTypes: {[operator in TypedBinary]: Primitive} = {
    AndBoolean: "Boolean",
    OrBoolean: "Boolean",
    EqualBoolean: "Boolean",
    NotEqualBoolean: "Boolean",
    AddInteger: "Integer",
    SubtractInteger: "Integer",
    MultiplyInteger: "Integer",
    EqualInteger: "Boolean",
    NotEqualInteger: "Boolean",
    GreaterThanInteger: "Boolean",
    GreaterThanOrEqualToInteger: "Boolean",
    LessThanInteger: "Boolean",
    LessThanOrEqualToInteger: "Boolean"
}