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
            Integer: undefined,
            Float: undefined
        },
        Or: {
            Boolean: "OrBoolean",
            Integer: undefined,
            Float: undefined
        },
        "Equal": {
            Boolean: "EqualBoolean",
            Integer: "EqualInteger",
            Float: undefined
        },
        "NotEqual": {
            Boolean: "NotEqualBoolean",
            Integer: "NotEqualInteger",
            Float: undefined
        },
        "Add": {
            Boolean: undefined,
            Integer: "AddInteger",
            Float: undefined
        },
        "Subtract": {
            Boolean: undefined,
            Integer: "SubtractInteger",
            Float: undefined
        },
        "Multiply": {
            Boolean: undefined,
            Integer: "MultiplyInteger",
            Float: undefined
        },
        "Divide": {
            Boolean: undefined,
            Integer: undefined,
            Float: undefined
        },
        "GreaterThan": {
            Boolean: undefined,
            Integer: "GreaterThanInteger",
            Float: undefined
        },
        "GreaterThanOrEqualTo": {
            Boolean: undefined,
            Integer: "GreaterThanOrEqualToInteger",
            Float: undefined
        },
        "LessThan": {
            Boolean: undefined,
            Integer: "LessThanInteger",
            Float: undefined
        },
        "LessThanOrEqualTo": {
            Boolean: undefined,
            Integer: "LessThanOrEqualToInteger",
            Float: undefined
        },
        "Call": { // This should never be emitted, but is in the UntypedBinary type.
            Boolean: undefined,
            Integer: undefined,
            Float: undefined
        },
        "Concatenate": { // This should never be emitted, but is in the UntypedBinary type.
            Boolean: undefined,
            Integer: undefined,
            Float: undefined
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

const BinaryReversible: {[operator in TypedBinary]: boolean} = {
    AndBoolean: true,
    OrBoolean: true,
    EqualBoolean: true,
    NotEqualBoolean: true,
    AddInteger: true,
    SubtractInteger: false,
    MultiplyInteger: true,
    EqualInteger: true,
    NotEqualInteger: true,
    GreaterThanInteger: false,
    GreaterThanOrEqualToInteger: false,
    LessThanInteger: false,
    LessThanOrEqualToInteger: false
}