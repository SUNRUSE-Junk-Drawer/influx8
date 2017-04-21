/// <reference path="CSyntax.ts" />
/// <reference path="GLSLCSyntaxBase.ts" />

const GLSLVectorConstructorPatterns: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] = [{
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