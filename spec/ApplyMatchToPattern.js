describe("ApplyMatchToPattern", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const ApplyMatchToPattern = Namespace.__get__("ApplyMatchToPattern")

    function Test(description, pattern, output, applyMatchToPattern) {
        it(description, () => {
            Namespace.__set__("ApplyMatchToPattern", applyMatchToPattern || fail)
            expect(ApplyMatchToPattern({
                "Test Key A": "Test Value A",
                "Test Key B": "Test Value B",
                "Test Key C": "Test Value C"
            }, pattern)).toEqual(output)
        })
    }

    Test("boolean", {
        Type: "Boolean",
        Value: "Anything"
    }, {
            Type: "Boolean",
            Value: "Anything"
        })

    Test("integer", {
        Type: "Integer",
        Value: "Anything"
    }, {
            Type: "Integer",
            Value: "Anything"
        })

    Test("any boolean", {
        Type: "AnyBoolean",
        Name: "Test Key A"
    }, "Test Value A")

    Test("any integer", {
        Type: "AnyInteger",
        Name: "Test Key A"
    }, "Test Value A")

    Test("any parameter", {
        Type: "AnyParameter",
        Name: "Test Key A"
    }, "Test Value A")

    Test("unary", {
        Type: "Unary",
        Operator: "Test Operator",
        Operand: "Test Operand"
    }, {
            Type: "Unary",
            Operator: "Test Operator",
            Operand: "Test Recursed Operand"
        }, (match, pattern) => {
            expect(match).toEqual({
                "Test Key A": "Test Value A",
                "Test Key B": "Test Value B",
                "Test Key C": "Test Value C"
            })
            expect(pattern).toEqual("Test Operand")
            return "Test Recursed Operand"
        })

    Test("binary", {
        Type: "Binary",
        Operator: "Test Operator",
        Left: "Test Left",
        Right: "Test Right"
    }, {
            Type: "Binary",
            Operator: "Test Operator",
            Left: "Test Recursed Left",
            Right: "Test Recursed Right"
        }, (match, pattern) => {
            expect(match).toEqual({
                "Test Key A": "Test Value A",
                "Test Key B": "Test Value B",
                "Test Key C": "Test Value C"
            })
            switch (pattern) {
                case "Test Left": return "Test Recursed Left"
                case "Test Right": return "Test Recursed Right"
                default: fail("Unexpected pattern")
            }
        })
})