/// <reference path="CSyntax.ts" />
/// <reference path="GLSLCSyntaxBase.ts" />
/// <reference path="GLSLVectorConstructorPatterns.ts" />
/// <reference path="GLSLParameterPatterns.ts" />
/// <reference path="GLSLBinaryPatterns.ts" />
/// <reference path="GLSLUnaryPatterns.ts" />
/// <reference path="GLSLBooleanPatterns.ts" />

const GLSLCSyntax: CSyntax<GLSLUnary, GLSLBinary, GLSLFunction> = {
    UnarySymbolsOrKeywords: {
        NotBool: "!",
        NegateInt: "-",
        NegateIVec2: "-",
        NegateIVec3: "-",
        NegateIVec4: "-",
        NegateFloat: "-",
        NegateVec2: "-",
        NegateVec3: "-",
        NegateVec4: "-"
    },
    BinarySymbolsOrKeywords: {
        AndBool: "&&",
        OrBool: "||",
        AddInt: "+",
        AddIVec2: "+",
        AddIVec3: "+",
        AddIVec4: "+",
        AddFloat: "+",
        AddVec2: "+",
        AddVec3: "+",
        AddVec4: "+",
        SubtractInt: "-",
        SubtractIVec2: "-",
        SubtractIVec3: "-",
        SubtractIVec4: "-",
        SubtractFloat: "-",
        SubtractVec2: "-",
        SubtractVec3: "-",
        SubtractVec4: "-",
        MultiplyInt: "*",
        MultiplyIVec2: "*",
        MultiplyIVec3: "*",
        MultiplyIVec4: "*",
        MultiplyFloat: "*",
        MultiplyVec2: "*",
        MultiplyVec3: "*",
        MultiplyVec4: "*",
        DivideFloat: "/",
        DivideVec2: "/",
        DivideVec3: "/",
        DivideVec4: "/"
    },
    FunctionSymbolsOrKeywords: {
        NotBVec2: "not",
        NotBVec3: "not",
        NotBVec4: "not",
        BVec2: "bvec2",
        BVec3: "bvec3",
        BVec4: "bvec4",
        AnyBVec3: "any",
        AnyBVec4: "any",
        AllBVec3: "all",
        AllBVec4: "all",
        IVec2: "ivec2",
        IVec3: "ivec3",
        IVec4: "ivec4",
        Vec2: "vec2",
        Vec3: "vec3",
        Vec4: "vec4"
    },
    Patterns: GLSLParameterPatterns
        .concat(GLSLBinaryPatterns)
        .concat(GLSLUnaryPatterns)
        .concat(GLSLBooleanPatterns)
        .concat(GLSLVectorConstructorPatterns)
}