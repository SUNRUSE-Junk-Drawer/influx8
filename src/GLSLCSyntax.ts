/// <reference path="CSyntax.ts" />

type GLSLUnary =
    "NotBool"
    | "NegateInt" | "NegateIVec2" | "NegateIVec3" | "NegateIVec4"
    | "NegateFloat" | "NegateVec2" | "NegateVec3" | "NegateVec4"

type GLSLBinary =
    "AndBool" | "OrBool"

type GLSLFunction =
    "NotBVec2" | "NotBVec3" | "NotBVec4"
    | "BVec2" | "BVec3" | "BVec4"
    | "AnyBVec3" | "AnyBVec4"
    | "AllBVec3" | "AllBVec4"
    | "IVec2" | "IVec3" | "IVec4"
    | "Vec2" | "Vec3" | "Vec4"

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
        OrBool: "||"
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
    Patterns: [{
        Type: "Custom",
        Pattern: [{
            Type: "AnyParameter",
            Name: "A"
        }, {
            Type: "AnyParameter",
            Name: "B"
        }, {
            Type: "AnyParameter",
            Name: "C"
        }, {
            Type: "AnyParameter",
            Name: "D"
        }],
        Convert(match) {
            const a = match["A"] as ParameterVerifiedExpression
            if (a.Plurality == 1) return undefined
            const b = match["B"] as ParameterVerifiedExpression
            const c = match["C"] as ParameterVerifiedExpression
            const d = match["D"] as ParameterVerifiedExpression
            if (a.Name != b.Name) return undefined
            if (b.Name != c.Name) return undefined
            if (c.Name != d.Name) return undefined
            if (a.Plurality == 4 && a.Item == 0 && b.Item == 1 && c.Item == 2 && d.Item == 3) return {
                Type: "Reference",
                Name: a.Name
            }
            return {
                Type: "Property",
                Name: "xyzw".charAt(a.Item) + "xyzw".charAt(b.Item) + "xyzw".charAt(c.Item) + "xyzw".charAt(d.Item),
                Of: {
                    Type: "Reference",
                    Name: a.Name
                }
            }
        }
    }, {
        Type: "Custom",
        Pattern: [{
            Type: "AnyParameter",
            Name: "A"
        }, {
            Type: "AnyParameter",
            Name: "B"
        }, {
            Type: "AnyParameter",
            Name: "C"
        }],
        Convert(match) {
            const a = match["A"] as ParameterVerifiedExpression
            if (a.Plurality == 1) return undefined
            const b = match["B"] as ParameterVerifiedExpression
            const c = match["C"] as ParameterVerifiedExpression
            if (a.Name != b.Name) return undefined
            if (b.Name != c.Name) return undefined
            if (a.Plurality == 3 && a.Item == 0 && b.Item == 1 && c.Item == 2) return {
                Type: "Reference",
                Name: a.Name
            }
            return {
                Type: "Property",
                Name: "xyzw".charAt(a.Item) + "xyzw".charAt(b.Item) + "xyzw".charAt(c.Item),
                Of: {
                    Type: "Reference",
                    Name: a.Name
                }
            }
        }
    }, {
        Type: "Custom",
        Pattern: [{
            Type: "AnyParameter",
            Name: "A"
        }, {
            Type: "AnyParameter",
            Name: "B"
        }],
        Convert(match) {
            const a = match["A"] as ParameterVerifiedExpression
            if (a.Plurality == 1) return undefined
            const b = match["B"] as ParameterVerifiedExpression
            if (a.Name != b.Name) return undefined
            if (a.Plurality == 2 && a.Item == 0 && b.Item == 1) return {
                Type: "Reference",
                Name: a.Name
            }
            return {
                Type: "Property",
                Name: "xyzw".charAt(a.Item) + "xyzw".charAt(b.Item),
                Of: {
                    Type: "Reference",
                    Name: a.Name
                }
            }
        }
    }, {
        Type: "Custom",
        Pattern: [{
            Type: "AnyParameter",
            Name: "A"
        }],
        Convert(match) {
            const parameter = match["A"] as ParameterVerifiedExpression
            if (parameter.Plurality == 1) return {
                Type: "Reference",
                Name: parameter.Name
            }
            return {
                Type: "Property",
                Name: "xyzw".charAt(parameter.Item),
                Of: {
                    Type: "Reference",
                    Name: parameter.Name
                }
            }
        }
    }, {
        Type: "Function",
        Function: "AllBVec4",
        Pattern: [{
            Type: "Binary",
            Operator: "AndBoolean",
            Left: { Type: "AnyBoolean", Name: "A" },
            Right: {
                Type: "Binary",
                Operator: "AndBoolean",
                Left: { Type: "AnyBoolean", Name: "B" },
                Right: {
                    Type: "Binary",
                    Operator: "AndBoolean",
                    Left: { Type: "AnyBoolean", Name: "C" },
                    Right: { Type: "AnyBoolean", Name: "D" }
                }
            }
        }],
        ResultArguments: [[{ Type: "AnyBoolean", Name: "A" }, { Type: "AnyBoolean", Name: "B" }, { Type: "AnyBoolean", Name: "C" }, { Type: "AnyBoolean", Name: "D" }]],
    }, {
        Type: "Function",
        Function: "AllBVec3",
        Pattern: [{
            Type: "Binary",
            Operator: "AndBoolean",
            Left: { Type: "AnyBoolean", Name: "A" },
            Right: {
                Type: "Binary",
                Operator: "AndBoolean",
                Left: { Type: "AnyBoolean", Name: "B" },
                Right: { Type: "AnyBoolean", Name: "C" }
            }
        }],
        ResultArguments: [[{ Type: "AnyBoolean", Name: "A" }, { Type: "AnyBoolean", Name: "B" }, { Type: "AnyBoolean", Name: "C" }]],
    }, {
        Type: "Function",
        Function: "AnyBVec4",
        Pattern: [{
            Type: "Binary",
            Operator: "OrBoolean",
            Left: { Type: "AnyBoolean", Name: "A" },
            Right: {
                Type: "Binary",
                Operator: "OrBoolean",
                Left: { Type: "AnyBoolean", Name: "B" },
                Right: {
                    Type: "Binary",
                    Operator: "OrBoolean",
                    Left: { Type: "AnyBoolean", Name: "C" },
                    Right: { Type: "AnyBoolean", Name: "D" }
                }
            }
        }],
        ResultArguments: [[{ Type: "AnyBoolean", Name: "A" }, { Type: "AnyBoolean", Name: "B" }, { Type: "AnyBoolean", Name: "C" }, { Type: "AnyBoolean", Name: "D" }]],
    }, {
        Type: "Function",
        Function: "AnyBVec3",
        Pattern: [{
            Type: "Binary",
            Operator: "OrBoolean",
            Left: { Type: "AnyBoolean", Name: "A" },
            Right: {
                Type: "Binary",
                Operator: "OrBoolean",
                Left: { Type: "AnyBoolean", Name: "B" },
                Right: { Type: "AnyBoolean", Name: "C" }
            }
        }],
        ResultArguments: [[{ Type: "AnyBoolean", Name: "A" }, { Type: "AnyBoolean", Name: "B" }, { Type: "AnyBoolean", Name: "C" }]],
    }, {
        Type: "Binary",
        Operator: "AndBool",
        Pattern: [{
            Type: "Binary",
            Operator: "AndBoolean",
            Left: { Type: "AnyBoolean", Name: "A" },
            Right: { Type: "AnyBoolean", Name: "B" }
        }],
        ResultLeft: [{ Type: "AnyBoolean", Name: "A" }],
        ResultRight: [{ Type: "AnyBoolean", Name: "B" }]
    }, {
        Type: "Binary",
        Operator: "OrBool",
        Pattern: [{
            Type: "Binary",
            Operator: "OrBoolean",
            Left: { Type: "AnyBoolean", Name: "A" },
            Right: { Type: "AnyBoolean", Name: "B" }
        }],
        ResultLeft: [{ Type: "AnyBoolean", Name: "A" }],
        ResultRight: [{ Type: "AnyBoolean", Name: "B" }]
    }, {
        Type: "Function",
        Function: "NotBVec4",
        Pattern: [{
            Type: "Unary",
            Operator: "NotBoolean",
            Operand: { Type: "AnyBoolean", Name: "A" }
        }, {
            Type: "Unary",
            Operator: "NotBoolean",
            Operand: { Type: "AnyBoolean", Name: "B" }
        }, {
            Type: "Unary",
            Operator: "NotBoolean",
            Operand: { Type: "AnyBoolean", Name: "C" }
        }, {
            Type: "Unary",
            Operator: "NotBoolean",
            Operand: { Type: "AnyBoolean", Name: "D" }
        }],
        ResultArguments: [[
            { Type: "AnyBoolean", Name: "A" },
            { Type: "AnyBoolean", Name: "B" },
            { Type: "AnyBoolean", Name: "C" },
            { Type: "AnyBoolean", Name: "D" }
        ]]
    }, {
        Type: "Function",
        Function: "NotBVec3",
        Pattern: [{
            Type: "Unary",
            Operator: "NotBoolean",
            Operand: { Type: "AnyBoolean", Name: "A" }
        }, {
            Type: "Unary",
            Operator: "NotBoolean",
            Operand: { Type: "AnyBoolean", Name: "B" }
        }, {
            Type: "Unary",
            Operator: "NotBoolean",
            Operand: { Type: "AnyBoolean", Name: "C" }
        }],
        ResultArguments: [[
            { Type: "AnyBoolean", Name: "A" },
            { Type: "AnyBoolean", Name: "B" },
            { Type: "AnyBoolean", Name: "C" }
        ]]
    }, {
        Type: "Function",
        Function: "NotBVec2",
        Pattern: [{
            Type: "Unary",
            Operator: "NotBoolean",
            Operand: { Type: "AnyBoolean", Name: "A" }
        }, {
            Type: "Unary",
            Operator: "NotBoolean",
            Operand: { Type: "AnyBoolean", Name: "B" }
        }],
        ResultArguments: [[
            { Type: "AnyBoolean", Name: "A" },
            { Type: "AnyBoolean", Name: "B" }
        ]]
    }, {
        Type: "Unary",
        Operator: "NotBool",
        Pattern: [{
            Type: "Unary",
            Operator: "NotBoolean",
            Operand: { Type: "AnyBoolean", Name: "A" }
        }],
        ResultOperand: [{ Type: "AnyBoolean", Name: "A" }]
    }, {
        Type: "Unary",
        Operator: "NegateIVec4",
        Pattern: [{
            Type: "Unary",
            Operator: "NegateInteger",
            Operand: { Type: "AnyInteger", Name: "A" }
        }, {
            Type: "Unary",
            Operator: "NegateInteger",
            Operand: { Type: "AnyInteger", Name: "B" }
        }, {
            Type: "Unary",
            Operator: "NegateInteger",
            Operand: { Type: "AnyInteger", Name: "C" }
        }, {
            Type: "Unary",
            Operator: "NegateInteger",
            Operand: { Type: "AnyInteger", Name: "D" }
        }],
        ResultOperand: [
            { Type: "AnyInteger", Name: "A" },
            { Type: "AnyInteger", Name: "B" },
            { Type: "AnyInteger", Name: "C" },
            { Type: "AnyInteger", Name: "D" }
        ]
    }, {
        Type: "Unary",
        Operator: "NegateIVec3",
        Pattern: [{
            Type: "Unary",
            Operator: "NegateInteger",
            Operand: { Type: "AnyInteger", Name: "A" }
        }, {
            Type: "Unary",
            Operator: "NegateInteger",
            Operand: { Type: "AnyInteger", Name: "B" }
        }, {
            Type: "Unary",
            Operator: "NegateInteger",
            Operand: { Type: "AnyInteger", Name: "C" }
        }],
        ResultOperand: [
            { Type: "AnyInteger", Name: "A" },
            { Type: "AnyInteger", Name: "B" },
            { Type: "AnyInteger", Name: "C" }
        ]
    }, {
        Type: "Unary",
        Operator: "NegateIVec2",
        Pattern: [{
            Type: "Unary",
            Operator: "NegateInteger",
            Operand: { Type: "AnyInteger", Name: "A" }
        }, {
            Type: "Unary",
            Operator: "NegateInteger",
            Operand: { Type: "AnyInteger", Name: "B" }
        }],
        ResultOperand: [
            { Type: "AnyInteger", Name: "A" },
            { Type: "AnyInteger", Name: "B" }
        ]
    }, {
        Type: "Unary",
        Operator: "NegateInt",
        Pattern: [{
            Type: "Unary",
            Operator: "NegateInteger",
            Operand: { Type: "AnyInteger", Name: "A" }
        }],
        ResultOperand: [{ Type: "AnyInteger", Name: "A" }]
    }, {
        Type: "Unary",
        Operator: "NegateVec4",
        Pattern: [{
            Type: "Unary",
            Operator: "NegateFloat",
            Operand: { Type: "AnyFloat", Name: "A" }
        }, {
            Type: "Unary",
            Operator: "NegateFloat",
            Operand: { Type: "AnyFloat", Name: "B" }
        }, {
            Type: "Unary",
            Operator: "NegateFloat",
            Operand: { Type: "AnyFloat", Name: "C" }
        }, {
            Type: "Unary",
            Operator: "NegateFloat",
            Operand: { Type: "AnyFloat", Name: "D" }
        }],
        ResultOperand: [
            { Type: "AnyFloat", Name: "A" },
            { Type: "AnyFloat", Name: "B" },
            { Type: "AnyFloat", Name: "C" },
            { Type: "AnyFloat", Name: "D" }
        ]
    }, {
        Type: "Unary",
        Operator: "NegateVec3",
        Pattern: [{
            Type: "Unary",
            Operator: "NegateFloat",
            Operand: { Type: "AnyFloat", Name: "A" }
        }, {
            Type: "Unary",
            Operator: "NegateFloat",
            Operand: { Type: "AnyFloat", Name: "B" }
        }, {
            Type: "Unary",
            Operator: "NegateFloat",
            Operand: { Type: "AnyFloat", Name: "C" }
        }],
        ResultOperand: [
            { Type: "AnyFloat", Name: "A" },
            { Type: "AnyFloat", Name: "B" },
            { Type: "AnyFloat", Name: "C" }
        ]
    }, {
        Type: "Unary",
        Operator: "NegateVec2",
        Pattern: [{
            Type: "Unary",
            Operator: "NegateFloat",
            Operand: { Type: "AnyFloat", Name: "A" }
        }, {
            Type: "Unary",
            Operator: "NegateFloat",
            Operand: { Type: "AnyFloat", Name: "B" }
        }],
        ResultOperand: [
            { Type: "AnyFloat", Name: "A" },
            { Type: "AnyFloat", Name: "B" }
        ]
    }, {
        Type: "Unary",
        Operator: "NegateFloat",
        Pattern: [{
            Type: "Unary",
            Operator: "NegateFloat",
            Operand: { Type: "AnyFloat", Name: "A" }
        }],
        ResultOperand: [{ Type: "AnyFloat", Name: "A" }]
    }, {
        Type: "Function",
        Function: "BVec4",
        Pattern: [{
            Type: "AnyBoolean",
            Name: "A"
        }, {
            Type: "AnyBoolean",
            Name: "A"
        }, {
            Type: "AnyBoolean",
            Name: "A"
        }, {
            Type: "AnyBoolean",
            Name: "A"
        }],
        ResultArguments: [
            [{ Type: "AnyBoolean", Name: "A" }]
        ]
    }, {
        Type: "Function",
        Function: "BVec4",
        Pattern: [{
            Type: "AnyBoolean",
            Name: "A"
        }, {
            Type: "AnyBoolean",
            Name: "B"
        }, {
            Type: "AnyBoolean",
            Name: "C"
        }, {
            Type: "AnyBoolean",
            Name: "D"
        }],
        ResultArguments: [
            [{ Type: "AnyBoolean", Name: "A" }],
            [{ Type: "AnyBoolean", Name: "B" }],
            [{ Type: "AnyBoolean", Name: "C" }],
            [{ Type: "AnyBoolean", Name: "D" }]
        ]
    }, {
        Type: "Function",
        Function: "BVec3",
        Pattern: [{
            Type: "AnyBoolean",
            Name: "A"
        }, {
            Type: "AnyBoolean",
            Name: "A"
        }, {
            Type: "AnyBoolean",
            Name: "A"
        }],
        ResultArguments: [
            [{ Type: "AnyBoolean", Name: "A" }]
        ]
    }, {
        Type: "Function",
        Function: "BVec3",
        Pattern: [{
            Type: "AnyBoolean",
            Name: "A"
        }, {
            Type: "AnyBoolean",
            Name: "B"
        }, {
            Type: "AnyBoolean",
            Name: "C"
        }],
        ResultArguments: [
            [{ Type: "AnyBoolean", Name: "A" }],
            [{ Type: "AnyBoolean", Name: "B" }],
            [{ Type: "AnyBoolean", Name: "C" }]
        ]
    }, {
        Type: "Function",
        Function: "BVec2",
        Pattern: [{
            Type: "AnyBoolean",
            Name: "A"
        }, {
            Type: "AnyBoolean",
            Name: "A"
        }],
        ResultArguments: [
            [{ Type: "AnyBoolean", Name: "A" }]
        ]
    }, {
        Type: "Function",
        Function: "BVec2",
        Pattern: [{
            Type: "AnyBoolean",
            Name: "A"
        }, {
            Type: "AnyBoolean",
            Name: "B"
        }],
        ResultArguments: [
            [{ Type: "AnyBoolean", Name: "A" }],
            [{ Type: "AnyBoolean", Name: "B" }]
        ]
    }, {
        Type: "Function",
        Function: "IVec4",
        Pattern: [{
            Type: "AnyInteger",
            Name: "A"
        }, {
            Type: "AnyInteger",
            Name: "A"
        }, {
            Type: "AnyInteger",
            Name: "A"
        }, {
            Type: "AnyInteger",
            Name: "A"
        }],
        ResultArguments: [
            [{ Type: "AnyInteger", Name: "A" }]
        ]
    }, {
        Type: "Function",
        Function: "IVec4",
        Pattern: [{
            Type: "AnyInteger",
            Name: "A"
        }, {
            Type: "AnyInteger",
            Name: "B"
        }, {
            Type: "AnyInteger",
            Name: "C"
        }, {
            Type: "AnyInteger",
            Name: "D"
        }],
        ResultArguments: [
            [{ Type: "AnyInteger", Name: "A" }],
            [{ Type: "AnyInteger", Name: "B" }],
            [{ Type: "AnyInteger", Name: "C" }],
            [{ Type: "AnyInteger", Name: "D" }]
        ]
    }, {
        Type: "Function",
        Function: "IVec3",
        Pattern: [{
            Type: "AnyInteger",
            Name: "A"
        }, {
            Type: "AnyInteger",
            Name: "A"
        }, {
            Type: "AnyInteger",
            Name: "A"
        }],
        ResultArguments: [
            [{ Type: "AnyInteger", Name: "A" }]
        ]
    }, {
        Type: "Function",
        Function: "IVec3",
        Pattern: [{
            Type: "AnyInteger",
            Name: "A"
        }, {
            Type: "AnyInteger",
            Name: "B"
        }, {
            Type: "AnyInteger",
            Name: "C"
        }],
        ResultArguments: [
            [{ Type: "AnyInteger", Name: "A" }],
            [{ Type: "AnyInteger", Name: "B" }],
            [{ Type: "AnyInteger", Name: "C" }]
        ]
    }, {
        Type: "Function",
        Function: "IVec2",
        Pattern: [{
            Type: "AnyInteger",
            Name: "A"
        }, {
            Type: "AnyInteger",
            Name: "A"
        }],
        ResultArguments: [
            [{ Type: "AnyInteger", Name: "A" }]
        ]
    }, {
        Type: "Function",
        Function: "IVec2",
        Pattern: [{
            Type: "AnyInteger",
            Name: "A"
        }, {
            Type: "AnyInteger",
            Name: "B"
        }],
        ResultArguments: [
            [{ Type: "AnyInteger", Name: "A" }],
            [{ Type: "AnyInteger", Name: "B" }]
        ]
    }, {
        Type: "Function",
        Function: "Vec4",
        Pattern: [{
            Type: "AnyFloat",
            Name: "A"
        }, {
            Type: "AnyFloat",
            Name: "A"
        }, {
            Type: "AnyFloat",
            Name: "A"
        }, {
            Type: "AnyFloat",
            Name: "A"
        }],
        ResultArguments: [
            [{ Type: "AnyFloat", Name: "A" }]
        ]
    }, {
        Type: "Function",
        Function: "Vec4",
        Pattern: [{
            Type: "AnyFloat",
            Name: "A"
        }, {
            Type: "AnyFloat",
            Name: "B"
        }, {
            Type: "AnyFloat",
            Name: "C"
        }, {
            Type: "AnyFloat",
            Name: "D"
        }],
        ResultArguments: [
            [{ Type: "AnyFloat", Name: "A" }],
            [{ Type: "AnyFloat", Name: "B" }],
            [{ Type: "AnyFloat", Name: "C" }],
            [{ Type: "AnyFloat", Name: "D" }]
        ]
    }, {
        Type: "Function",
        Function: "Vec3",
        Pattern: [{
            Type: "AnyFloat",
            Name: "A"
        }, {
            Type: "AnyFloat",
            Name: "A"
        }, {
            Type: "AnyFloat",
            Name: "A"
        }],
        ResultArguments: [
            [{ Type: "AnyFloat", Name: "A" }]
        ]
    }, {
        Type: "Function",
        Function: "Vec3",
        Pattern: [{
            Type: "AnyFloat",
            Name: "A"
        }, {
            Type: "AnyFloat",
            Name: "B"
        }, {
            Type: "AnyFloat",
            Name: "C"
        }],
        ResultArguments: [
            [{ Type: "AnyFloat", Name: "A" }],
            [{ Type: "AnyFloat", Name: "B" }],
            [{ Type: "AnyFloat", Name: "C" }]
        ]
    }, {
        Type: "Function",
        Function: "Vec2",
        Pattern: [{
            Type: "AnyFloat",
            Name: "A"
        }, {
            Type: "AnyFloat",
            Name: "A"
        }],
        ResultArguments: [
            [{ Type: "AnyFloat", Name: "A" }]
        ]
    }, {
        Type: "Function",
        Function: "Vec2",
        Pattern: [{
            Type: "AnyFloat",
            Name: "A"
        }, {
            Type: "AnyFloat",
            Name: "B"
        }],
        ResultArguments: [
            [{ Type: "AnyFloat", Name: "A" }],
            [{ Type: "AnyFloat", Name: "B" }]
        ]
    }]
}