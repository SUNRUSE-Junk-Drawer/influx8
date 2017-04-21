type GLSLUnary =
    "NotBool"
    | "NegateInt" | "NegateIVec2" | "NegateIVec3" | "NegateIVec4"
    | "NegateFloat" | "NegateVec2" | "NegateVec3" | "NegateVec4"

type GLSLBinary =
    "AndBool" | "OrBool"
    | "AddInt" | "AddIVec2" | "AddIVec3" | "AddIVec4"
    | "AddFloat" | "AddVec2" | "AddVec3" | "AddVec4"
    | "SubtractInt" | "SubtractIVec2" | "SubtractIVec3" | "SubtractIVec4"
    | "SubtractFloat" | "SubtractVec2" | "SubtractVec3" | "SubtractVec4"
    | "MultiplyInt" | "MultiplyIVec2" | "MultiplyIVec3" | "MultiplyIVec4"
    | "MultiplyFloat" | "MultiplyVec2" | "MultiplyVec3" | "MultiplyVec4"
    | "DivideFloat" | "DivideVec2" | "DivideVec3" | "DivideVec4"

type GLSLFunction =
    "NotBVec2" | "NotBVec3" | "NotBVec4"
    | "BVec2" | "BVec3" | "BVec4"
    | "AnyBVec3" | "AnyBVec4"
    | "AllBVec3" | "AllBVec4"
    | "IVec2" | "IVec3" | "IVec4"
    | "Vec2" | "Vec3" | "Vec4"

type GLSLOperatorType = {
    ParameterFromName(name: string): Pattern
}

const IntegerGLSLOperatorType: GLSLOperatorType = {
    ParameterFromName(name: string): AnyIntegerPattern {
        return {
            Type: "AnyInteger",
            Name: name
        }
    }
}

const FloatGLSLOperatorType: GLSLOperatorType = {
    ParameterFromName(name: string): AnyFloatPattern {
        return {
            Type: "AnyFloat",
            Name: name
        }
    }
}