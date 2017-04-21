/// <reference path="CSyntax.ts" />
/// <reference path="GLSLCSyntaxBase.ts" />

const GLSLBinaryPatterns: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] = [{
    Type: "Binary",
    Operator: "AddIVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A W" },
        Right: { Type: "AnyInteger", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }, { Type: "AnyInteger", Name: "A W" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "AddIVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B Z" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A W" },
        Right: { Type: "AnyInteger", Name: "B W" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }, { Type: "AnyInteger", Name: "A W" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }, { Type: "AnyInteger", Name: "B Z" }, { Type: "AnyInteger", Name: "B W" }]
}, {
    Type: "Binary",
    Operator: "AddIVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "AddIVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B Z" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }, { Type: "AnyInteger", Name: "B Z" }]
}, {
    Type: "Binary",
    Operator: "AddIVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "AddIVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }]
}, {
    Type: "Binary",
    Operator: "AddInt",
    Pattern: [{
        Type: "Binary",
        Operator: "AddInteger",
        Left: { Type: "AnyInteger", Name: "X" },
        Right: { Type: "AnyInteger", Name: "Y" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "X" }],
    ResultRight: [{ Type: "AnyInteger", Name: "Y" }]
}, {
    Type: "Binary",
    Operator: "AddVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A W" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }, { Type: "AnyFloat", Name: "A W" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "AddVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A W" },
        Right: { Type: "AnyFloat", Name: "B W" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }, { Type: "AnyFloat", Name: "A W" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }, { Type: "AnyFloat", Name: "B W" }]
}, {
    Type: "Binary",
    Operator: "AddVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "AddVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }]
}, {
    Type: "Binary",
    Operator: "AddVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "AddVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }]
}, {
    Type: "Binary",
    Operator: "AddFloat",
    Pattern: [{
        Type: "Binary",
        Operator: "AddFloat",
        Left: { Type: "AnyFloat", Name: "X" },
        Right: { Type: "AnyFloat", Name: "Y" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "X" }],
    ResultRight: [{ Type: "AnyFloat", Name: "Y" }]
}, {
    Type: "Binary",
    Operator: "MultiplyIVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A W" },
        Right: { Type: "AnyInteger", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }, { Type: "AnyInteger", Name: "A W" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "MultiplyIVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B Z" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A W" },
        Right: { Type: "AnyInteger", Name: "B W" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }, { Type: "AnyInteger", Name: "A W" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }, { Type: "AnyInteger", Name: "B Z" }, { Type: "AnyInteger", Name: "B W" }]
}, {
    Type: "Binary",
    Operator: "MultiplyIVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "MultiplyIVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B Z" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }, { Type: "AnyInteger", Name: "B Z" }]
}, {
    Type: "Binary",
    Operator: "MultiplyIVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "MultiplyIVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }]
}, {
    Type: "Binary",
    Operator: "MultiplyInt",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyInteger",
        Left: { Type: "AnyInteger", Name: "X" },
        Right: { Type: "AnyInteger", Name: "Y" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "X" }],
    ResultRight: [{ Type: "AnyInteger", Name: "Y" }]
}, {
    Type: "Binary",
    Operator: "MultiplyVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A W" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }, { Type: "AnyFloat", Name: "A W" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "MultiplyVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A W" },
        Right: { Type: "AnyFloat", Name: "B W" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }, { Type: "AnyFloat", Name: "A W" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }, { Type: "AnyFloat", Name: "B W" }]
}, {
    Type: "Binary",
    Operator: "MultiplyVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "MultiplyVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }]
}, {
    Type: "Binary",
    Operator: "MultiplyVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "MultiplyVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }]
}, {
    Type: "Binary",
    Operator: "MultiplyFloat",
    Pattern: [{
        Type: "Binary",
        Operator: "MultiplyFloat",
        Left: { Type: "AnyFloat", Name: "X" },
        Right: { Type: "AnyFloat", Name: "Y" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "X" }],
    ResultRight: [{ Type: "AnyFloat", Name: "Y" }]
}, {
    Type: "Binary",
    Operator: "SubtractIVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A W" },
        Right: { Type: "AnyInteger", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }, { Type: "AnyInteger", Name: "A W" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "SubtractIVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A" },
        Right: { Type: "AnyInteger", Name: "B Z" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A" },
        Right: { Type: "AnyInteger", Name: "B W" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }, { Type: "AnyInteger", Name: "B Z" }, { Type: "AnyInteger", Name: "B W" }]
}, {
    Type: "Binary",
    Operator: "SubtractIVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B Z" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A W" },
        Right: { Type: "AnyInteger", Name: "B W" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }, { Type: "AnyInteger", Name: "A W" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }, { Type: "AnyInteger", Name: "B Z" }, { Type: "AnyInteger", Name: "B W" }]
}, {
    Type: "Binary",
    Operator: "SubtractIVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "SubtractIVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A" },
        Right: { Type: "AnyInteger", Name: "B Z" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }, { Type: "AnyInteger", Name: "B Z" }]
}, {
    Type: "Binary",
    Operator: "SubtractIVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A Z" },
        Right: { Type: "AnyInteger", Name: "B Z" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }, { Type: "AnyInteger", Name: "A Z" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }, { Type: "AnyInteger", Name: "B Z" }]
}, {
    Type: "Binary",
    Operator: "SubtractIVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "SubtractIVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }]
}, {
    Type: "Binary",
    Operator: "SubtractIVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A X" },
        Right: { Type: "AnyInteger", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "A Y" },
        Right: { Type: "AnyInteger", Name: "B Y" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "A X" }, { Type: "AnyInteger", Name: "A Y" }],
    ResultRight: [{ Type: "AnyInteger", Name: "B X" }, { Type: "AnyInteger", Name: "B Y" }]
}, {
    Type: "Binary",
    Operator: "SubtractInt",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractInteger",
        Left: { Type: "AnyInteger", Name: "X" },
        Right: { Type: "AnyInteger", Name: "Y" }
    }],
    ResultLeft: [{ Type: "AnyInteger", Name: "X" }],
    ResultRight: [{ Type: "AnyInteger", Name: "Y" }]
}, {
    Type: "Binary",
    Operator: "SubtractVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B W" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }, { Type: "AnyFloat", Name: "B W" }]
}, {
    Type: "Binary",
    Operator: "SubtractVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A W" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }, { Type: "AnyFloat", Name: "A W" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "SubtractVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A W" },
        Right: { Type: "AnyFloat", Name: "B W" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }, { Type: "AnyFloat", Name: "A W" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }, { Type: "AnyFloat", Name: "B W" }]
}, {
    Type: "Binary",
    Operator: "SubtractVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }]
}, {
    Type: "Binary",
    Operator: "SubtractVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "SubtractVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }]
}, {
    Type: "Binary",
    Operator: "SubtractVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "SubtractVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }]
}, {
    Type: "Binary",
    Operator: "SubtractVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }]
}, {
    Type: "Binary",
    Operator: "SubtractFloat",
    Pattern: [{
        Type: "Binary",
        Operator: "SubtractFloat",
        Left: { Type: "AnyFloat", Name: "X" },
        Right: { Type: "AnyFloat", Name: "Y" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "X" }],
    ResultRight: [{ Type: "AnyFloat", Name: "Y" }]
}, {
    Type: "Binary",
    Operator: "DivideVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B W" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }, { Type: "AnyFloat", Name: "B W" }]
}, {
    Type: "Binary",
    Operator: "DivideVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A W" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }, { Type: "AnyFloat", Name: "A W" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "DivideVec4",
    Pattern: [{
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A W" },
        Right: { Type: "AnyFloat", Name: "B W" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }, { Type: "AnyFloat", Name: "A W" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }, { Type: "AnyFloat", Name: "B W" }]
}, {
    Type: "Binary",
    Operator: "DivideVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }]
}, {
    Type: "Binary",
    Operator: "DivideVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "DivideVec3",
    Pattern: [{
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A Z" },
        Right: { Type: "AnyFloat", Name: "B Z" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }, { Type: "AnyFloat", Name: "A Z" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }, { Type: "AnyFloat", Name: "B Z" }]
}, {
    Type: "Binary",
    Operator: "DivideVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B" }]
}, {
    Type: "Binary",
    Operator: "DivideVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }]
}, {
    Type: "Binary",
    Operator: "DivideVec2",
    Pattern: [{
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A X" },
        Right: { Type: "AnyFloat", Name: "B X" }
    }, {
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "A Y" },
        Right: { Type: "AnyFloat", Name: "B Y" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "A X" }, { Type: "AnyFloat", Name: "A Y" }],
    ResultRight: [{ Type: "AnyFloat", Name: "B X" }, { Type: "AnyFloat", Name: "B Y" }]
}, {
    Type: "Binary",
    Operator: "DivideFloat",
    Pattern: [{
        Type: "Binary",
        Operator: "DivideFloat",
        Left: { Type: "AnyFloat", Name: "X" },
        Right: { Type: "AnyFloat", Name: "Y" }
    }],
    ResultLeft: [{ Type: "AnyFloat", Name: "X" }],
    ResultRight: [{ Type: "AnyFloat", Name: "Y" }]
}]