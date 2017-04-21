/// <reference path="CSyntax.ts" />
/// <reference path="GLSLCSyntaxBase.ts" />

const GLSLParameterPatterns: CSyntaxPattern<GLSLUnary, GLSLBinary, GLSLFunction>[] = [{
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
}]