describe("GenerateCSyntax", () => {
    const Namespace = require("rewire")("../../index.js")
    const GenerateCSyntax = Namespace.__get__("GenerateCSyntax")

    function Test(description, input, output, generateCSyntax) {
        it(description, () => {
            Namespace.__set__("GenerateCSyntax", generateCSyntax || fail)
            expect(GenerateCSyntax(input, {
                UnarySymbolsOrKeywords: {
                    "Test Unary Operator A": "Test Unary Keyword Or Symbol A",
                    "Test Unary Operator B": "Test Unary Keyword Or Symbol B",
                    "Test Unary Operator C": "Test Unary Keyword Or Symbol C"
                },
                BinarySymbolsOrKeywords: {
                    "Test Binary Operator A": "Test Binary Keyword Or Symbol A",
                    "Test Binary Operator B": "Test Binary Keyword Or Symbol B",
                    "Test Binary Operator C": "Test Binary Keyword Or Symbol C"
                },
                FunctionSymbolsOrKeywords: {
                    "Test Function A": "Test Function Keyword Or Symbol A",
                    "Test Function B": "Test Function Keyword Or Symbol B",
                    "Test Function C": "Test Function Keyword Or Symbol C"
                }
            })).toEqual(output)
        })
    }

    Test("boolean false", {
        Type: "Boolean",
        Value: false
    }, "false")

    Test("boolean true", {
        Type: "Boolean",
        Value: true
    }, "true")

    Test("integer zero", {
        Type: "Integer",
        Value: 0
    }, "0")

    Test("integer non-zero", {
        Type: "Integer",
        Value: 37
    }, "37")

    Test("float zero", {
        Type: "Float",
        Value: 0
    }, "0.0")

    Test("float integer", {
        Type: "Float",
        Value: 37
    }, "37.0")

    Test("float integer trailing zeroes", {
        Type: "Float",
        Value: 3700
    }, "3700.0")

    Test("float float", {
        Type: "Float",
        Value: 37.4
    }, "37.4")

    Test("float fractional", {
        Type: "Float",
        Value: 0.4
    }, "0.4")

    Test("float fractional point has trailing zeroes", {
        Type: "Float",
        Value: 0.004
    }, "0.004")

    Test("float float integer has trailing zeroes", {
        Type: "Float",
        Value: 3700.4
    }, "3700.4")

    Test("float float point has trailing zeroes", {
        Type: "Float",
        Value: 37.0004
    }, "37.0004")

    Test("unary", {
        Type: "Unary",
        Operator: "Test Unary Operator B",
        Operand: "Test Operand"
    }, "(Test Unary Keyword Or Symbol BTest Recursed Operand)", (expression, syntax) => {
        expect(expression).toEqual("Test Operand")
        expect(syntax).toEqual({
            UnarySymbolsOrKeywords: {
                "Test Unary Operator A": "Test Unary Keyword Or Symbol A",
                "Test Unary Operator B": "Test Unary Keyword Or Symbol B",
                "Test Unary Operator C": "Test Unary Keyword Or Symbol C"
            },
            BinarySymbolsOrKeywords: {
                "Test Binary Operator A": "Test Binary Keyword Or Symbol A",
                "Test Binary Operator B": "Test Binary Keyword Or Symbol B",
                "Test Binary Operator C": "Test Binary Keyword Or Symbol C"
            },
            FunctionSymbolsOrKeywords: {
                "Test Function A": "Test Function Keyword Or Symbol A",
                "Test Function B": "Test Function Keyword Or Symbol B",
                "Test Function C": "Test Function Keyword Or Symbol C"
            }
        })
        return "Test Recursed Operand"
    })

    Test("binary", {
        Type: "Binary",
        Operator: "Test Binary Operator B",
        Left: "Test Left",
        Right: "Test Right"
    }, "(Test Recursed Left Test Binary Keyword Or Symbol B Test Recursed Right)", (expression, syntax) => {
        expect(syntax).toEqual({
            UnarySymbolsOrKeywords: {
                "Test Unary Operator A": "Test Unary Keyword Or Symbol A",
                "Test Unary Operator B": "Test Unary Keyword Or Symbol B",
                "Test Unary Operator C": "Test Unary Keyword Or Symbol C"
            },
            BinarySymbolsOrKeywords: {
                "Test Binary Operator A": "Test Binary Keyword Or Symbol A",
                "Test Binary Operator B": "Test Binary Keyword Or Symbol B",
                "Test Binary Operator C": "Test Binary Keyword Or Symbol C"
            },
            FunctionSymbolsOrKeywords: {
                "Test Function A": "Test Function Keyword Or Symbol A",
                "Test Function B": "Test Function Keyword Or Symbol B",
                "Test Function C": "Test Function Keyword Or Symbol C"
            }
        })
        switch (expression) {
            case "Test Left": return "Test Recursed Left"
            case "Test Right": return "Test Recursed Right"
            default: fail("Unexpected expression")
        }
    })

    Test("function without arguments", {
        Type: "Function",
        Function: "Test Function B",
        Arguments: []
    }, "Test Function Keyword Or Symbol B()")

    Test("function with one argument", {
        Type: "Function",
        Function: "Test Function B",
        Arguments: ["Test Argument A"]
    }, "Test Function Keyword Or Symbol B(Test Recursed Argument A)", (expression, syntax) => {
        expect(syntax).toEqual({
            UnarySymbolsOrKeywords: {
                "Test Unary Operator A": "Test Unary Keyword Or Symbol A",
                "Test Unary Operator B": "Test Unary Keyword Or Symbol B",
                "Test Unary Operator C": "Test Unary Keyword Or Symbol C"
            },
            BinarySymbolsOrKeywords: {
                "Test Binary Operator A": "Test Binary Keyword Or Symbol A",
                "Test Binary Operator B": "Test Binary Keyword Or Symbol B",
                "Test Binary Operator C": "Test Binary Keyword Or Symbol C"
            },
            FunctionSymbolsOrKeywords: {
                "Test Function A": "Test Function Keyword Or Symbol A",
                "Test Function B": "Test Function Keyword Or Symbol B",
                "Test Function C": "Test Function Keyword Or Symbol C"
            }
        })
        switch (expression) {
            case "Test Argument A": return "Test Recursed Argument A"
            default: fail("Unexpected expression")
        }
    })

    Test("function with two arguments", {
        Type: "Function",
        Function: "Test Function B",
        Arguments: ["Test Argument A", "Test Argument B"]
    }, "Test Function Keyword Or Symbol B(Test Recursed Argument A, Test Recursed Argument B)", (expression, syntax) => {
        expect(syntax).toEqual({
            UnarySymbolsOrKeywords: {
                "Test Unary Operator A": "Test Unary Keyword Or Symbol A",
                "Test Unary Operator B": "Test Unary Keyword Or Symbol B",
                "Test Unary Operator C": "Test Unary Keyword Or Symbol C"
            },
            BinarySymbolsOrKeywords: {
                "Test Binary Operator A": "Test Binary Keyword Or Symbol A",
                "Test Binary Operator B": "Test Binary Keyword Or Symbol B",
                "Test Binary Operator C": "Test Binary Keyword Or Symbol C"
            },
            FunctionSymbolsOrKeywords: {
                "Test Function A": "Test Function Keyword Or Symbol A",
                "Test Function B": "Test Function Keyword Or Symbol B",
                "Test Function C": "Test Function Keyword Or Symbol C"
            }
        })
        switch (expression) {
            case "Test Argument A": return "Test Recursed Argument A"
            case "Test Argument B": return "Test Recursed Argument B"
            default: fail("Unexpected expression")
        }
    })

    Test("function with three arguments", {
        Type: "Function",
        Function: "Test Function B",
        Arguments: ["Test Argument A", "Test Argument B", "Test Argument C"]
    }, "Test Function Keyword Or Symbol B(Test Recursed Argument A, Test Recursed Argument B, Test Recursed Argument C)", (expression, syntax) => {
        expect(syntax).toEqual({
            UnarySymbolsOrKeywords: {
                "Test Unary Operator A": "Test Unary Keyword Or Symbol A",
                "Test Unary Operator B": "Test Unary Keyword Or Symbol B",
                "Test Unary Operator C": "Test Unary Keyword Or Symbol C"
            },
            BinarySymbolsOrKeywords: {
                "Test Binary Operator A": "Test Binary Keyword Or Symbol A",
                "Test Binary Operator B": "Test Binary Keyword Or Symbol B",
                "Test Binary Operator C": "Test Binary Keyword Or Symbol C"
            },
            FunctionSymbolsOrKeywords: {
                "Test Function A": "Test Function Keyword Or Symbol A",
                "Test Function B": "Test Function Keyword Or Symbol B",
                "Test Function C": "Test Function Keyword Or Symbol C"
            }
        })
        switch (expression) {
            case "Test Argument A": return "Test Recursed Argument A"
            case "Test Argument B": return "Test Recursed Argument B"
            case "Test Argument C": return "Test Recursed Argument C"
            default: fail("Unexpected expression")
        }
    })

    Test("property", {
        Type: "Property",
        Name: "Test Name",
        Of: "Test Of"
    }, "Test Recursed Of.Test Name", (expression, syntax) => {
        expect(syntax).toEqual({
            UnarySymbolsOrKeywords: {
                "Test Unary Operator A": "Test Unary Keyword Or Symbol A",
                "Test Unary Operator B": "Test Unary Keyword Or Symbol B",
                "Test Unary Operator C": "Test Unary Keyword Or Symbol C"
            },
            BinarySymbolsOrKeywords: {
                "Test Binary Operator A": "Test Binary Keyword Or Symbol A",
                "Test Binary Operator B": "Test Binary Keyword Or Symbol B",
                "Test Binary Operator C": "Test Binary Keyword Or Symbol C"
            },
            FunctionSymbolsOrKeywords: {
                "Test Function A": "Test Function Keyword Or Symbol A",
                "Test Function B": "Test Function Keyword Or Symbol B",
                "Test Function C": "Test Function Keyword Or Symbol C"
            }
        })
        expect(expression).toEqual("Test Of")
        return "Test Recursed Of"
    })

    Test("reference", {
        Type: "Reference",
        Name: "Test Name"
    }, "Test Name")

    Test("block empty", {
        Type: "Block",
        Opener: "Test Opener",
        Delimiter: "Test Delimiter",
        Closer: "Test Closer",
        Contents: []
    }, "Test OpenerTest Closer")

    Test("block one item", {
        Type: "Block",
        Opener: "Test Opener",
        Delimiter: "Test Delimiter",
        Closer: "Test Closer",
        Contents: ["Test Item"]
    }, "Test OpenerTest Recursed ItemTest Closer", (expression, syntax) => {
        expect(syntax).toEqual({
            UnarySymbolsOrKeywords: {
                "Test Unary Operator A": "Test Unary Keyword Or Symbol A",
                "Test Unary Operator B": "Test Unary Keyword Or Symbol B",
                "Test Unary Operator C": "Test Unary Keyword Or Symbol C"
            },
            BinarySymbolsOrKeywords: {
                "Test Binary Operator A": "Test Binary Keyword Or Symbol A",
                "Test Binary Operator B": "Test Binary Keyword Or Symbol B",
                "Test Binary Operator C": "Test Binary Keyword Or Symbol C"
            },
            FunctionSymbolsOrKeywords: {
                "Test Function A": "Test Function Keyword Or Symbol A",
                "Test Function B": "Test Function Keyword Or Symbol B",
                "Test Function C": "Test Function Keyword Or Symbol C"
            }
        })
        expect(expression).toEqual("Test Item")
        return "Test Recursed Item"
    })

    Test("block two items", {
        Type: "Block",
        Opener: "Test Opener",
        Delimiter: "Test Delimiter",
        Closer: "Test Closer",
        Contents: ["Test Item A", "Test Item B"]
    }, "Test OpenerTest Recursed Item ATest DelimiterTest Recursed Item BTest Closer", (expression, syntax) => {
        expect(syntax).toEqual({
            UnarySymbolsOrKeywords: {
                "Test Unary Operator A": "Test Unary Keyword Or Symbol A",
                "Test Unary Operator B": "Test Unary Keyword Or Symbol B",
                "Test Unary Operator C": "Test Unary Keyword Or Symbol C"
            },
            BinarySymbolsOrKeywords: {
                "Test Binary Operator A": "Test Binary Keyword Or Symbol A",
                "Test Binary Operator B": "Test Binary Keyword Or Symbol B",
                "Test Binary Operator C": "Test Binary Keyword Or Symbol C"
            },
            FunctionSymbolsOrKeywords: {
                "Test Function A": "Test Function Keyword Or Symbol A",
                "Test Function B": "Test Function Keyword Or Symbol B",
                "Test Function C": "Test Function Keyword Or Symbol C"
            }
        })
        switch (expression) {
            case "Test Item A": return "Test Recursed Item A"
            case "Test Item B": return "Test Recursed Item B"
            default: fail("Unexpected expression")
        }
    })

    Test("block three items", {
        Type: "Block",
        Opener: "Test Opener",
        Delimiter: "Test Delimiter",
        Closer: "Test Closer",
        Contents: ["Test Item A", "Test Item B", "Test Item C"]
    }, "Test OpenerTest Recursed Item ATest DelimiterTest Recursed Item BTest DelimiterTest Recursed Item CTest Closer", (expression, syntax) => {
        expect(syntax).toEqual({
            UnarySymbolsOrKeywords: {
                "Test Unary Operator A": "Test Unary Keyword Or Symbol A",
                "Test Unary Operator B": "Test Unary Keyword Or Symbol B",
                "Test Unary Operator C": "Test Unary Keyword Or Symbol C"
            },
            BinarySymbolsOrKeywords: {
                "Test Binary Operator A": "Test Binary Keyword Or Symbol A",
                "Test Binary Operator B": "Test Binary Keyword Or Symbol B",
                "Test Binary Operator C": "Test Binary Keyword Or Symbol C"
            },
            FunctionSymbolsOrKeywords: {
                "Test Function A": "Test Function Keyword Or Symbol A",
                "Test Function B": "Test Function Keyword Or Symbol B",
                "Test Function C": "Test Function Keyword Or Symbol C"
            }
        })
        switch (expression) {
            case "Test Item A": return "Test Recursed Item A"
            case "Test Item B": return "Test Recursed Item B"
            case "Test Item C": return "Test Recursed Item C"
            default: fail("Unexpected expression")
        }
    })
})