describe("MatchCSyntaxPattern", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const MatchCSyntaxPattern = Namespace.__get__("MatchCSyntaxPattern")

    function Test(description, output, matchPatternSet, matchCSyntaxPatternMatch) {
        it(description, () => {
            Namespace.__set__("MatchPatternSet", matchPatternSet || fail)
            Namespace.__set__("MatchCSyntaxPatternMatch", matchCSyntaxPatternMatch || fail)
            expect(MatchCSyntaxPattern("Test Expression", "Test Syntax", { Pattern: "Test Pattern" })).toEqual(output)
        })
    }

    Test("no matches returns undefined", undefined, (expression, pattern) => {
        expect(expression).toEqual("Test Expression")
        expect(pattern).toEqual("Test Pattern")
        return []
    })

    Test("no matches recurse returns undefined", undefined, (expression, pattern) => {
        expect(expression).toEqual("Test Expression")
        expect(pattern).toEqual("Test Pattern")
        return ["Test Match A", "Test Match B", "Test Match C"]
    }, (match, syntax, pattern) => {
        expect(syntax).toEqual("Test Syntax")
        expect(pattern).toEqual({ Pattern: "Test Pattern" })
        switch (match) {
            case "Test Match A": return undefined
            case "Test Match B": return undefined
            case "Test Match C": return undefined
            default: fail("Unexpected pattern match")
        }
    })

    Test("first match recurses returns first", "Test Recursed Match A", (expression, pattern) => {
        expect(expression).toEqual("Test Expression")
        expect(pattern).toEqual("Test Pattern")
        return ["Test Match A", "Test Match B", "Test Match C"]
    }, (match, syntax, pattern) => {
        expect(syntax).toEqual("Test Syntax")
        expect(pattern).toEqual({ Pattern: "Test Pattern" })
        switch (match) {
            case "Test Match A": return "Test Recursed Match A"
            case "Test Match B": return undefined
            case "Test Match C": return undefined
            default: fail("Unexpected pattern match")
        }
    })

    Test("second match recurses returns second", "Test Recursed Match B", (expression, pattern) => {
        expect(expression).toEqual("Test Expression")
        expect(pattern).toEqual("Test Pattern")
        return ["Test Match A", "Test Match B", "Test Match C"]
    }, (match, syntax, pattern) => {
        expect(syntax).toEqual("Test Syntax")
        expect(pattern).toEqual({ Pattern: "Test Pattern" })
        switch (match) {
            case "Test Match A": return undefined
            case "Test Match B": return "Test Recursed Match B"
            case "Test Match C": return undefined
            default: fail("Unexpected pattern match")
        }
    })

    Test("third match recurses returns third", "Test Recursed Match C", (expression, pattern) => {
        expect(expression).toEqual("Test Expression")
        expect(pattern).toEqual("Test Pattern")
        return ["Test Match A", "Test Match B", "Test Match C"]
    }, (match, syntax, pattern) => {
        expect(syntax).toEqual("Test Syntax")
        expect(pattern).toEqual({ Pattern: "Test Pattern" })
        switch (match) {
            case "Test Match A": return undefined
            case "Test Match B": return undefined
            case "Test Match C": return "Test Recursed Match C"
            default: fail("Unexpected pattern match")
        }
    })

    Test("first and second match recurses returns first", "Test Recursed Match A", (expression, pattern) => {
        expect(expression).toEqual("Test Expression")
        expect(pattern).toEqual("Test Pattern")
        return ["Test Match A", "Test Match B", "Test Match C"]
    }, (match, syntax, pattern) => {
        expect(syntax).toEqual("Test Syntax")
        expect(pattern).toEqual({ Pattern: "Test Pattern" })
        switch (match) {
            case "Test Match A": return "Test Recursed Match A"
            case "Test Match B": return "Test Recursed Match B"
            case "Test Match C": return undefined
            default: fail("Unexpected pattern match")
        }
    })

    Test("first and third match recurses returns first", "Test Recursed Match A", (expression, pattern) => {
        expect(expression).toEqual("Test Expression")
        expect(pattern).toEqual("Test Pattern")
        return ["Test Match A", "Test Match B", "Test Match C"]
    }, (match, syntax, pattern) => {
        expect(syntax).toEqual("Test Syntax")
        expect(pattern).toEqual({ Pattern: "Test Pattern" })
        switch (match) {
            case "Test Match A": return "Test Recursed Match A"
            case "Test Match B": return undefined
            case "Test Match C": return "Test Recursed Match C"
            default: fail("Unexpected pattern match")
        }
    })

    Test("all match recurses returns first", "Test Recursed Match A", (expression, pattern) => {
        expect(expression).toEqual("Test Expression")
        expect(pattern).toEqual("Test Pattern")
        return ["Test Match A", "Test Match B", "Test Match C"]
    }, (match, syntax, pattern) => {
        expect(syntax).toEqual("Test Syntax")
        expect(pattern).toEqual({ Pattern: "Test Pattern" })
        switch (match) {
            case "Test Match A": return "Test Recursed Match A"
            case "Test Match B": return "Test Recursed Match B"
            case "Test Match C": return "Test Recursed Match C"
            default: fail("Unexpected pattern match")
        }
    })

    Test("second and third match recurses returns second", "Test Recursed Match B", (expression, pattern) => {
        expect(expression).toEqual("Test Expression")
        expect(pattern).toEqual("Test Pattern")
        return ["Test Match A", "Test Match B", "Test Match C"]
    }, (match, syntax, pattern) => {
        expect(syntax).toEqual("Test Syntax")
        expect(pattern).toEqual({ Pattern: "Test Pattern" })
        switch (match) {
            case "Test Match A": return undefined
            case "Test Match B": return "Test Recursed Match B"
            case "Test Match C": return "Test Recursed Match C"
            default: fail("Unexpected pattern match")
        }
    })
})