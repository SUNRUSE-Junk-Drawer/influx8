/// <reference path="UntypedBinary.ts" />
/// <reference path="Primitive.ts" />

type TypedBinary =
    "AndBoolean" | "OrBoolean" | "EqualBoolean" | "NotEqualBoolean"
    | "AddInteger" | "SubtractInteger" | "MultiplyInteger" | "EqualInteger" | "NotEqualInteger" | "GreaterThanInteger" | "LessThanInteger" | "GreaterThanOrEqualToInteger" | "LessThanOrEqualToInteger"
    | "AddFloat" | "SubtractFloat" | "MultiplyFloat" | "DivideFloat" | "GreaterThanFloat" | "LessThanFloat" | "ExponentiateFloat"

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
            Float: "AddFloat"
        },
        "Subtract": {
            Boolean: undefined,
            Integer: "SubtractInteger",
            Float: "SubtractFloat"
        },
        "Multiply": {
            Boolean: undefined,
            Integer: "MultiplyInteger",
            Float: "MultiplyFloat"
        },
        "Divide": {
            Boolean: undefined,
            Integer: undefined,
            Float: "DivideFloat"
        },
        "GreaterThan": {
            Boolean: undefined,
            Integer: "GreaterThanInteger",
            Float: "GreaterThanFloat"
        },
        "GreaterThanOrEqualTo": {
            Boolean: undefined,
            Integer: "GreaterThanOrEqualToInteger",
            Float: undefined
        },
        "LessThan": {
            Boolean: undefined,
            Integer: "LessThanInteger",
            Float: "LessThanFloat"
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
        },
        "Exponentiate": {
            Boolean: undefined,
            Integer: undefined,
            Float: "ExponentiateFloat"
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
    LessThanOrEqualToInteger: "Boolean",
    AddFloat: "Float",
    SubtractFloat: "Float",
    MultiplyFloat: "Float",
    DivideFloat: "Float",
    GreaterThanFloat: "Boolean",
    LessThanFloat: "Boolean",
    ExponentiateFloat: "Float"
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
    LessThanOrEqualToInteger: false,
    AddFloat: true,
    SubtractFloat: false,
    MultiplyFloat: true,
    DivideFloat: false,
    GreaterThanFloat: false,
    LessThanFloat: false,
    ExponentiateFloat: false
}