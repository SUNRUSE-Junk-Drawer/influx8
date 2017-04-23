describe("MatchCSyntaxPatternMatch", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const MatchCSyntaxPatternMatch = Namespace.__get__("MatchCSyntaxPatternMatch")

    function Test(description, pattern, output, applyMatchToPattern, matchCSyntax) {
        it(description, () => {
            Namespace.__set__("ApplyMatchToPattern", applyMatchToPattern || fail)
            Namespace.__set__("MatchCSyntax", matchCSyntax || fail)
            expect(MatchCSyntaxPatternMatch("Test Match", "Test Syntax", pattern)).toEqual(output)
        })
    }

    Test("unary operand recurses", {
        Type: "Unary",
        Operator: "Test Operator",
        Pattern: "Test Matched Pattern",
        ResultOperand: ["Test Result Operand A", "Test Result Operand B", "Test Result Operand C"]
    }, {
            Type: "Unary",
            Operator: "Test Operator",
            Operand: "Test Recursed Operand"
        }, (match, pattern) => {
            expect(match).toEqual("Test Match")
            switch (pattern) {
                case "Test Result Operand A": return "Test Recursed Operand A"
                case "Test Result Operand B": return "Test Recursed Operand B"
                case "Test Result Operand C": return "Test Recursed Operand C"
                default: fail("Unexpected pattern")
            }
        }, (expression, syntax) => {
            expect(expression).toEqual(["Test Recursed Operand A", "Test Recursed Operand B", "Test Recursed Operand C"])
            expect(syntax).toEqual("Test Syntax")
            return "Test Recursed Operand"
        })

    Test("unary operand does not recurse", {
        Type: "Unary",
        Operator: "Test Operator",
        Pattern: "Test Matched Pattern",
        ResultOperand: ["Test Result Operand A", "Test Result Operand B", "Test Result Operand C"]
    }, undefined, (match, pattern) => {
        expect(match).toEqual("Test Match")
        switch (pattern) {
            case "Test Result Operand A": return "Test Recursed Operand A"
            case "Test Result Operand B": return "Test Recursed Operand B"
            case "Test Result Operand C": return "Test Recursed Operand C"
            default: fail("Unexpected pattern")
        }
    }, (expression, syntax) => {
        expect(expression).toEqual(["Test Recursed Operand A", "Test Recursed Operand B", "Test Recursed Operand C"])
        expect(syntax).toEqual("Test Syntax")
        return undefined
    })

    Test("binary left and right recurse", {
        Type: "Binary",
        Operator: "Test Operator",
        Pattern: "Test Matched Pattern",
        ResultLeft: ["Test Result Left A", "Test Result Left B"],
        ResultRight: ["Test Result Right A", "Test Result Right B", "Test Result Right C", "Test Result Right D"]
    }, {
            Type: "Binary",
            Operator: "Test Operator",
            Left: "Test Recursed Left",
            Right: "Test Recursed Right"
        }, (match, pattern) => {
            expect(match).toEqual("Test Match")
            switch (pattern) {
                case "Test Result Left A": return "Test Recursed Left A"
                case "Test Result Left B": return "Test Recursed Left B"
                case "Test Result Right A": return "Test Recursed Right A"
                case "Test Result Right B": return "Test Recursed Right B"
                case "Test Result Right C": return "Test Recursed Right C"
                case "Test Result Right D": return "Test Recursed Right D"
                default: fail("Unexpected pattern")
            }
        }, (expression, syntax) => {
            expect(syntax).toEqual("Test Syntax")
            switch (expression.length) {
                case 2:
                    expect(expression).toEqual(["Test Recursed Left A", "Test Recursed Left B"])
                    return "Test Recursed Left"
                case 4:
                    expect(expression).toEqual(["Test Recursed Right A", "Test Recursed Right B", "Test Recursed Right C", "Test Recursed Right D"])
                    return "Test Recursed Right"
                default: fail("Unexpected expression length")
            }
        })

    Test("binary left does not recurse", {
        Type: "Binary",
        Operator: "Test Operator",
        Pattern: "Test Matched Pattern",
        ResultLeft: ["Test Result Left A", "Test Result Left B"],
        ResultRight: ["Test Result Right A", "Test Result Right B", "Test Result Right C", "Test Result Right D"]
    }, undefined, (match, pattern) => {
        expect(match).toEqual("Test Match")
        switch (pattern) {
            case "Test Result Left A": return "Test Recursed Left A"
            case "Test Result Left B": return "Test Recursed Left B"
            case "Test Result Right A": return "Test Recursed Right A"
            case "Test Result Right B": return "Test Recursed Right B"
            case "Test Result Right C": return "Test Recursed Right C"
            case "Test Result Right D": return "Test Recursed Right D"
            default: fail("Unexpected pattern")
        }
    }, (expression, syntax) => {
        expect(syntax).toEqual("Test Syntax")
        switch (expression.length) {
            case 2:
                expect(expression).toEqual(["Test Recursed Left A", "Test Recursed Left B"])
                return undefined
            case 4:
                expect(expression).toEqual(["Test Recursed Right A", "Test Recursed Right B", "Test Recursed Right C", "Test Recursed Right D"])
                return "Test Recursed Right"
            default: fail("Unexpected expression length")
        }
    })

    Test("binary right does not recurse", {
        Type: "Binary",
        Operator: "Test Operator",
        Pattern: "Test Matched Pattern",
        ResultLeft: ["Test Result Left A", "Test Result Left B"],
        ResultRight: ["Test Result Right A", "Test Result Right B", "Test Result Right C", "Test Result Right D"]
    }, undefined, (match, pattern) => {
        expect(match).toEqual("Test Match")
        switch (pattern) {
            case "Test Result Left A": return "Test Recursed Left A"
            case "Test Result Left B": return "Test Recursed Left B"
            case "Test Result Right A": return "Test Recursed Right A"
            case "Test Result Right B": return "Test Recursed Right B"
            case "Test Result Right C": return "Test Recursed Right C"
            case "Test Result Right D": return "Test Recursed Right D"
            default: fail("Unexpected pattern")
        }
    }, (expression, syntax) => {
        expect(syntax).toEqual("Test Syntax")
        switch (expression.length) {
            case 2:
                expect(expression).toEqual(["Test Recursed Left A", "Test Recursed Left B"])
                return "Test Recursed Left"
            case 4:
                expect(expression).toEqual(["Test Recursed Right A", "Test Recursed Right B", "Test Recursed Right C", "Test Recursed Right D"])
                return undefined
            default: fail("Unexpected expression length")
        }
    })

    Test("binary left and right do not recurse", {
        Type: "Binary",
        Operator: "Test Operator",
        Pattern: "Test Matched Pattern",
        ResultLeft: ["Test Result Left A", "Test Result Left B"],
        ResultRight: ["Test Result Right A", "Test Result Right B", "Test Result Right C", "Test Result Right D"]
    }, undefined, (match, pattern) => {
        expect(match).toEqual("Test Match")
        switch (pattern) {
            case "Test Result Left A": return "Test Recursed Left A"
            case "Test Result Left B": return "Test Recursed Left B"
            case "Test Result Right A": return "Test Recursed Right A"
            case "Test Result Right B": return "Test Recursed Right B"
            case "Test Result Right C": return "Test Recursed Right C"
            case "Test Result Right D": return "Test Recursed Right D"
            default: fail("Unexpected pattern")
        }
    }, (expression, syntax) => {
        expect(syntax).toEqual("Test Syntax")
        switch (expression.length) {
            case 2:
                expect(expression).toEqual(["Test Recursed Left A", "Test Recursed Left B"])
                return undefined
            case 4:
                expect(expression).toEqual(["Test Recursed Right A", "Test Recursed Right B", "Test Recursed Right C", "Test Recursed Right D"])
                return undefined
            default: fail("Unexpected expression length")
        }
    })

    Test("function no arguments", {
        Type: "Function",
        Function: "Test Function",
        Pattern: "Test Matched Pattern",
        ResultArguments: []
    }, {
            Type: "Function",
            Function: "Test Function",
            Arguments: []
        })

    Test("function one argument recurses", {
        Type: "Function",
        Function: "Test Function",
        Pattern: "Test Matched Pattern",
        ResultArguments: [["Test Result Operand A", "Test Result Operand B", "Test Result Operand C"]]
    }, {
            Type: "Function",
            Function: "Test Function",
            Arguments: ["Test Recursed Operand"]
        }, (match, pattern) => {
            expect(match).toEqual("Test Match")
            switch (pattern) {
                case "Test Result Operand A": return "Test Recursed Operand A"
                case "Test Result Operand B": return "Test Recursed Operand B"
                case "Test Result Operand C": return "Test Recursed Operand C"
                default: fail("Unexpected pattern")
            }
        }, (expression, syntax) => {
            expect(expression).toEqual(["Test Recursed Operand A", "Test Recursed Operand B", "Test Recursed Operand C"])
            expect(syntax).toEqual("Test Syntax")
            return "Test Recursed Operand"
        })

    Test("function one argument does not recurse", {
        Type: "Function",
        Function: "Test Function",
        Pattern: "Test Matched Pattern",
        ResultArguments: [["Test Result Operand A", "Test Result Operand B", "Test Result Operand C"]]
    }, undefined, (match, pattern) => {
        expect(match).toEqual("Test Match")
        switch (pattern) {
            case "Test Result Operand A": return "Test Recursed Operand A"
            case "Test Result Operand B": return "Test Recursed Operand B"
            case "Test Result Operand C": return "Test Recursed Operand C"
            default: fail("Unexpected pattern")
        }
    }, (expression, syntax) => {
        expect(expression).toEqual(["Test Recursed Operand A", "Test Recursed Operand B", "Test Recursed Operand C"])
        expect(syntax).toEqual("Test Syntax")
        return undefined
    })

    Test("function two arguments recurse", {
        Type: "Function",
        Function: "Test Function",
        Pattern: "Test Matched Pattern",
        ResultArguments: [
            ["Test Result Left A", "Test Result Left B"],
            ["Test Result Right A", "Test Result Right B", "Test Result Right C", "Test Result Right D"]
        ]
    }, {
            Type: "Function",
            Function: "Test Function",
            Arguments: ["Test Recursed Left", "Test Recursed Right"]
        }, (match, pattern) => {
            expect(match).toEqual("Test Match")
            switch (pattern) {
                case "Test Result Left A": return "Test Recursed Left A"
                case "Test Result Left B": return "Test Recursed Left B"
                case "Test Result Right A": return "Test Recursed Right A"
                case "Test Result Right B": return "Test Recursed Right B"
                case "Test Result Right C": return "Test Recursed Right C"
                case "Test Result Right D": return "Test Recursed Right D"
                default: fail("Unexpected pattern")
            }
        }, (expression, syntax) => {
            expect(syntax).toEqual("Test Syntax")
            switch (expression.length) {
                case 2:
                    expect(expression).toEqual(["Test Recursed Left A", "Test Recursed Left B"])
                    return "Test Recursed Left"
                case 4:
                    expect(expression).toEqual(["Test Recursed Right A", "Test Recursed Right B", "Test Recursed Right C", "Test Recursed Right D"])
                    return "Test Recursed Right"
                default: fail("Unexpected expression length")
            }
        })

    Test("function two arguments left does not recurse", {
        Type: "Function",
        Function: "Test Function",
        Pattern: "Test Matched Pattern",
        ResultArguments: [
            ["Test Result Left A", "Test Result Left B"],
            ["Test Result Right A", "Test Result Right B", "Test Result Right C", "Test Result Right D"]
        ]
    }, undefined, (match, pattern) => {
        expect(match).toEqual("Test Match")
        switch (pattern) {
            case "Test Result Left A": return "Test Recursed Left A"
            case "Test Result Left B": return "Test Recursed Left B"
            case "Test Result Right A": return "Test Recursed Right A"
            case "Test Result Right B": return "Test Recursed Right B"
            case "Test Result Right C": return "Test Recursed Right C"
            case "Test Result Right D": return "Test Recursed Right D"
            default: fail("Unexpected pattern")
        }
    }, (expression, syntax) => {
        expect(syntax).toEqual("Test Syntax")
        switch (expression.length) {
            case 2:
                expect(expression).toEqual(["Test Recursed Left A", "Test Recursed Left B"])
                return undefined
            case 4:
                expect(expression).toEqual(["Test Recursed Right A", "Test Recursed Right B", "Test Recursed Right C", "Test Recursed Right D"])
                return "Test Recursed Right"
            default: fail("Unexpected expression length")
        }
    })

    Test("function two arguments right does not recurse", {
        Type: "Function",
        Function: "Test Function",
        Pattern: "Test Matched Pattern",
        ResultArguments: [
            ["Test Result Left A", "Test Result Left B"],
            ["Test Result Right A", "Test Result Right B", "Test Result Right C", "Test Result Right D"]
        ]
    }, undefined, (match, pattern) => {
        expect(match).toEqual("Test Match")
        switch (pattern) {
            case "Test Result Left A": return "Test Recursed Left A"
            case "Test Result Left B": return "Test Recursed Left B"
            case "Test Result Right A": return "Test Recursed Right A"
            case "Test Result Right B": return "Test Recursed Right B"
            case "Test Result Right C": return "Test Recursed Right C"
            case "Test Result Right D": return "Test Recursed Right D"
            default: fail("Unexpected pattern")
        }
    }, (expression, syntax) => {
        expect(syntax).toEqual("Test Syntax")
        switch (expression.length) {
            case 2:
                expect(expression).toEqual(["Test Recursed Left A", "Test Recursed Left B"])
                return "Test Recursed Left"
            case 4:
                expect(expression).toEqual(["Test Recursed Right A", "Test Recursed Right B", "Test Recursed Right C", "Test Recursed Right D"])
                return undefined
            default: fail("Unexpected expression length")
        }
    })

    Test("function two arguments left and right do not recurse", {
        Type: "Function",
        Function: "Test Function",
        Pattern: "Test Matched Pattern",
        ResultArguments: [
            ["Test Result Left A", "Test Result Left B"],
            ["Test Result Right A", "Test Result Right B", "Test Result Right C", "Test Result Right D"]
        ]
    }, undefined, (match, pattern) => {
        expect(match).toEqual("Test Match")
        switch (pattern) {
            case "Test Result Left A": return "Test Recursed Left A"
            case "Test Result Left B": return "Test Recursed Left B"
            case "Test Result Right A": return "Test Recursed Right A"
            case "Test Result Right B": return "Test Recursed Right B"
            case "Test Result Right C": return "Test Recursed Right C"
            case "Test Result Right D": return "Test Recursed Right D"
            default: fail("Unexpected pattern")
        }
    }, (expression, syntax) => {
        expect(syntax).toEqual("Test Syntax")
        switch (expression.length) {
            case 2:
                expect(expression).toEqual(["Test Recursed Left A", "Test Recursed Left B"])
                return undefined
            case 4:
                expect(expression).toEqual(["Test Recursed Right A", "Test Recursed Right B", "Test Recursed Right C", "Test Recursed Right D"])
                return undefined
            default: fail("Unexpected expression length")
        }
    })

    Test("function three arguments recurse", {
        Type: "Function",
        Function: "Test Function",
        Pattern: "Test Matched Pattern",
        ResultArguments: [
            ["Test Result A A", "Test Result A B"],
            ["Test Result B A", "Test Result B B", "Test Result B C", "Test Result B D"],
            ["Test Result C A", "Test Result C B", "Test Result C C"]
        ]
    }, {
            Type: "Function",
            Function: "Test Function",
            Arguments: ["Test Recursed A", "Test Recursed B", "Test Recursed C"]
        }, (match, pattern) => {
            expect(match).toEqual("Test Match")
            switch (pattern) {
                case "Test Result A A": return "Test Recursed A A"
                case "Test Result A B": return "Test Recursed A B"
                case "Test Result B A": return "Test Recursed B A"
                case "Test Result B B": return "Test Recursed B B"
                case "Test Result B C": return "Test Recursed B C"
                case "Test Result B D": return "Test Recursed B D"
                case "Test Result C A": return "Test Recursed C A"
                case "Test Result C B": return "Test Recursed C B"
                case "Test Result C C": return "Test Recursed C C"
                default: fail("Unexpected pattern")
            }
        }, (expression, syntax) => {
            expect(syntax).toEqual("Test Syntax")
            switch (expression.length) {
                case 2:
                    expect(expression).toEqual(["Test Recursed A A", "Test Recursed A B"])
                    return "Test Recursed A"
                case 4:
                    expect(expression).toEqual(["Test Recursed B A", "Test Recursed B B", "Test Recursed B C", "Test Recursed B D"])
                    return "Test Recursed B"
                case 3:
                    expect(expression).toEqual(["Test Recursed C A", "Test Recursed C B", "Test Recursed C C"])
                    return "Test Recursed C"
                default: fail("Unexpected expression length")
            }
        })

    Test("function three arguments first does not recurse", {
        Type: "Function",
        Function: "Test Function",
        Pattern: "Test Matched Pattern",
        ResultArguments: [
            ["Test Result A A", "Test Result A B"],
            ["Test Result B A", "Test Result B B", "Test Result B C", "Test Result B D"],
            ["Test Result C A", "Test Result C B", "Test Result C C"]
        ]
    }, undefined, (match, pattern) => {
        expect(match).toEqual("Test Match")
        switch (pattern) {
            case "Test Result A A": return "Test Recursed A A"
            case "Test Result A B": return "Test Recursed A B"
            case "Test Result B A": return "Test Recursed B A"
            case "Test Result B B": return "Test Recursed B B"
            case "Test Result B C": return "Test Recursed B C"
            case "Test Result B D": return "Test Recursed B D"
            case "Test Result C A": return "Test Recursed C A"
            case "Test Result C B": return "Test Recursed C B"
            case "Test Result C C": return "Test Recursed C C"
            default: fail("Unexpected pattern")
        }
    }, (expression, syntax) => {
        expect(syntax).toEqual("Test Syntax")
        switch (expression.length) {
            case 2:
                expect(expression).toEqual(["Test Recursed A A", "Test Recursed A B"])
                return undefined
            case 4:
                expect(expression).toEqual(["Test Recursed B A", "Test Recursed B B", "Test Recursed B C", "Test Recursed B D"])
                return "Test Recursed B"
            case 3:
                expect(expression).toEqual(["Test Recursed C A", "Test Recursed C B", "Test Recursed C C"])
                return "Test Recursed C"
            default: fail("Unexpected expression length")
        }
    })

    Test("function three arguments second does not recurse", {
        Type: "Function",
        Function: "Test Function",
        Pattern: "Test Matched Pattern",
        ResultArguments: [
            ["Test Result A A", "Test Result A B"],
            ["Test Result B A", "Test Result B B", "Test Result B C", "Test Result B D"],
            ["Test Result C A", "Test Result C B", "Test Result C C"]
        ]
    }, undefined, (match, pattern) => {
        expect(match).toEqual("Test Match")
        switch (pattern) {
            case "Test Result A A": return "Test Recursed A A"
            case "Test Result A B": return "Test Recursed A B"
            case "Test Result B A": return "Test Recursed B A"
            case "Test Result B B": return "Test Recursed B B"
            case "Test Result B C": return "Test Recursed B C"
            case "Test Result B D": return "Test Recursed B D"
            case "Test Result C A": return "Test Recursed C A"
            case "Test Result C B": return "Test Recursed C B"
            case "Test Result C C": return "Test Recursed C C"
            default: fail("Unexpected pattern")
        }
    }, (expression, syntax) => {
        expect(syntax).toEqual("Test Syntax")
        switch (expression.length) {
            case 2:
                expect(expression).toEqual(["Test Recursed A A", "Test Recursed A B"])
                return "Test Recursed A"
            case 4:
                expect(expression).toEqual(["Test Recursed B A", "Test Recursed B B", "Test Recursed B C", "Test Recursed B D"])
                return undefined
            case 3:
                expect(expression).toEqual(["Test Recursed C A", "Test Recursed C B", "Test Recursed C C"])
                return "Test Recursed C"
            default: fail("Unexpected expression length")
        }
    })

    Test("function three arguments third does not recurse", {
        Type: "Function",
        Function: "Test Function",
        Pattern: "Test Matched Pattern",
        ResultArguments: [
            ["Test Result A A", "Test Result A B"],
            ["Test Result B A", "Test Result B B", "Test Result B C", "Test Result B D"],
            ["Test Result C A", "Test Result C B", "Test Result C C"]
        ]
    }, undefined, (match, pattern) => {
        expect(match).toEqual("Test Match")
        switch (pattern) {
            case "Test Result A A": return "Test Recursed A A"
            case "Test Result A B": return "Test Recursed A B"
            case "Test Result B A": return "Test Recursed B A"
            case "Test Result B B": return "Test Recursed B B"
            case "Test Result B C": return "Test Recursed B C"
            case "Test Result B D": return "Test Recursed B D"
            case "Test Result C A": return "Test Recursed C A"
            case "Test Result C B": return "Test Recursed C B"
            case "Test Result C C": return "Test Recursed C C"
            default: fail("Unexpected pattern")
        }
    }, (expression, syntax) => {
        expect(syntax).toEqual("Test Syntax")
        switch (expression.length) {
            case 2:
                expect(expression).toEqual(["Test Recursed A A", "Test Recursed A B"])
                return "Test Recursed A"
            case 4:
                expect(expression).toEqual(["Test Recursed B A", "Test Recursed B B", "Test Recursed B C", "Test Recursed B D"])
                return "Test Recursed B"
            case 3:
                expect(expression).toEqual(["Test Recursed C A", "Test Recursed C B", "Test Recursed C C"])
                return undefined
            default: fail("Unexpected expression length")
        }
    })

    Test("custom", {
        Type: "Custom",
        Pattern: "Test Matched Pattern",
        Convert: (match) => {
            expect(match).toEqual("Test Match")
            return "Test Recursed Match"
        }
    }, "Test Recursed Match")
})