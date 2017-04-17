/// <reference path="UntypedUnary.ts" />
/// <reference path="Primitive.ts" />

type TypedUnary = "NotBoolean" | "NegateInteger" | "NegateFloat"

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
        }
    }

const UnaryReturnTypes: {[operator in TypedUnary]: Primitive} = {
    NotBoolean: "Boolean",
    NegateInteger: "Integer",
    NegateFloat: "Float"
}