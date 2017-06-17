/// <reference path="UntypedUnary.ts" />
/// <reference path="Primitive.ts" />

type TypedUnary = "NotBoolean" | "NegateInteger" | "NegateFloat" | "SineFloat" | "TangentFloat" | "LogarithmFloat"

const UnaryTypeMappings: {
    [untyped in UntypedUnary]: {
        [primitive in Primitive]: TypedUnary | undefined
    }
} = {
        Not: {
            Boolean: "NotBoolean",
            Integer: undefined,
            Float: undefined
        },
        Negate: {
            Boolean: undefined,
            Integer: "NegateInteger",
            Float: "NegateFloat"
        },
        Sine: {
            Boolean: undefined,
            Integer: undefined,
            Float: "SineFloat"
        },
        Tangent: {
            Boolean: undefined,
            Integer: undefined,
            Float: "TangentFloat"
        },
        Logarithm: {
            Boolean: undefined,
            Integer: undefined,
            Float: "LogarithmFloat"
        }
    }

const UnaryReturnTypes: {[operator in TypedUnary]: Primitive} = {
    NotBoolean: "Boolean",
    NegateInteger: "Integer",
    NegateFloat: "Float",
    SineFloat: "Float",
    TangentFloat: "Float",
    LogarithmFloat: "Float"
}