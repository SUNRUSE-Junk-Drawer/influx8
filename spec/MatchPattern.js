describe("MatchPattern", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const MatchPattern = Namespace.__get__("MatchPattern")

    Namespace.__set__("BinaryReversible", {
        "Test Non-Reversible Binary Operator": false,
        "Test Reversible Binary Operator": true,
        "Test Alternative Non-Reversible Binary Operator": false,
        "Test Alternative Reversible Binary Operator": true
    })

    function Test(description, expression, pattern, output, matchPattern, combinePatternMatchSets) {
        it(description, () => {
            Namespace.__set__("MatchPattern", matchPattern || fail)
            Namespace.__set__("CombinePatternMatchSets", combinePatternMatchSets || fail)
            expect(MatchPattern(expression, pattern)).toEqual(output)
        })
    }

    Test("anything boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Any",
            Name: "Test Name"
        }, [{
            "Test Name": {
                Type: "Boolean",
                Value: false
            }
        }])

    Test("anything boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Any",
            Name: "Test Name"
        }, [{
            "Test Name": {
                Type: "Boolean",
                Value: true
            }
        }])

    Test("anything integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Any",
            Name: "Test Name"
        }, [{
            "Test Name": {
                Type: "Integer",
                Value: 0
            }
        }])

    Test("anything integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Any",
            Name: "Test Name"
        }, [{
            "Test Name": {
                Type: "Integer",
                Value: 37
            }
        }])

    Test("anything unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Any",
            Name: "Test Name"
        }, [{
            "Test Name": {
                Type: "Unary",
                Operator: "Test Unary Operator",
                Operand: "Test Expression Operand"
            }
        }])

    Test("anything non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Any",
            Name: "Test Name"
        }, [{
            "Test Name": {
                Type: "Binary",
                Operator: "Test Non-Reversible Binary Operator",
                Left: "Test Expression Left",
                Right: "Test Expression Right"
            }
        }])

    Test("anything reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Any",
            Name: "Test Name"
        }, [{
            "Test Name": {
                Type: "Binary",
                Operator: "Test Reversible Binary Operator",
                Left: "Test Expression Left",
                Right: "Test Expression Right"
            }
        }])


    Test("boolean false boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Boolean",
            Value: false
        }, [{}])

    Test("boolean false boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Boolean",
            Value: false
        }, [])

    Test("boolean false integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Boolean",
            Value: false
        }, [])

    Test("boolean false integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Boolean",
            Value: false
        }, [])

    Test("boolean false unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Boolean",
            Value: false
        }, [])

    Test("boolean false non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Boolean",
            Value: false
        }, [])

    Test("boolean false reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Boolean",
            Value: false
        }, [])


    Test("boolean true boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Boolean",
            Value: true
        }, [])

    Test("boolean true boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Boolean",
            Value: true
        }, [{}])

    Test("boolean true integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Boolean",
            Value: true
        }, [])

    Test("boolean true integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Boolean",
            Value: true
        }, [])

    Test("boolean true unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Boolean",
            Value: true
        }, [])

    Test("boolean true non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Boolean",
            Value: true
        }, [])

    Test("boolean true reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Boolean",
            Value: true
        }, [])


    Test("integer zero boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Integer",
            Value: 0
        }, [])

    Test("integer zero boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Integer",
            Value: 0
        }, [])

    Test("integer zero integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Integer",
            Value: 0
        }, [{}])

    Test("integer zero integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Integer",
            Value: 0
        }, [])

    Test("integer zero unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Integer",
            Value: 0
        }, [])

    Test("integer zero non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Integer",
            Value: 0
        }, [])

    Test("integer zero reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Integer",
            Value: 0
        }, [])


    Test("integer non-zero boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Integer",
            Value: 37
        }, [])

    Test("integer non-zero boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Integer",
            Value: 37
        }, [])

    Test("integer non-zero integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Integer",
            Value: 37
        }, [])

    Test("integer non-zero integer match", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Integer",
            Value: 37
        }, [{}])

    Test("integer non-zero integer greater", {
        Type: "Integer",
        Value: 39
    }, {
            Type: "Integer",
            Value: 37
        }, [])

    Test("integer non-zero integer less", {
        Type: "Integer",
        Value: 35
    }, {
            Type: "Integer",
            Value: 37
        }, [])

    Test("integer non-zero unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Integer",
            Value: 37
        }, [])

    Test("integer non-zero non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Integer",
            Value: 37
        }, [])

    Test("integer non-zero reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Integer",
            Value: 37
        }, [])


    Test("unary boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, [])

    Test("unary boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, [])

    Test("unary integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, [])

    Test("unary integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, [])

    Test("unary unary correct operator", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, "Test Recursed Matches", (expression, pattern) => {
            expect(expression).toEqual("Test Expression Operand")
            expect(pattern).toEqual("Test Pattern Operand")
            return "Test Recursed Matches"
        })

    Test("unary unary incorrect operator", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Unary",
            Operator: "Test Incorrect Unary Operator",
            Operand: "Test Pattern Operand"
        }, [])

    Test("unary non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, [])

    Test("unary reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, [])


    Test("non-reversible binary boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("non-reversible binary boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("non-reversible binary integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("non-reversible binary integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("non-reversible binary unary", {
        Type: "non-reversible binary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("non-reversible binary non-reversible binary correct operator", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, ["Test Result A A", "Test Result A B", "Test Result A C"], (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left":
                    expect(pattern).toEqual("Test Pattern Left")
                    return "Test Matches Left"
                case "Test Expression Right":
                    expect(pattern).toEqual("Test Pattern Right")
                    return "Test Matches Right"
                default: fail("Unexpected expression")
            }
        }, (a, b) => {
            expect(a).toEqual("Test Matches Left")
            expect(b).toEqual("Test Matches Right")
            return ["Test Result A A", "Test Result A B", "Test Result A C"]
        })

    Test("non-reversible binary non-reversible binary incorrect operator", {
        Type: "Binary",
        Operator: "Test Alternative Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("non-reversible binary reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])


    Test("reversible binary boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("reversible binary boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("reversible binary integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("reversible binary integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("reversible binary unary", {
        Type: "reversible binary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("reversible binary non-reversible binary correct operator", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("reversible binary reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, ["Test Result A A", "Test Result A B", "Test Result A C", "Test Result B A", "Test Result B B", "Test Result B C", "Test Result B D"], (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return "Test Matches Left Left"
                    case "Test Pattern Right": return "Test Matches Left Right"
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return "Test Matches Right Left"
                    case "Test Pattern Right": return "Test Matches Right Right"
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        }, (a, b) => {
            switch (a) {
                case "Test Matches Left Left":
                    expect(b).toEqual("Test Matches Right Right")
                    return ["Test Result A A", "Test Result A B", "Test Result A C"]
                case "Test Matches Left Right":
                    expect(b).toEqual("Test Matches Right Left")
                    return ["Test Result B A", "Test Result B B", "Test Result B C", "Test Result B D"]
                default: fail("Unexpected match set")
            }
        })

    Test("reversible binary reversible binary incorrect operator", {
        Type: "Binary",
        Operator: "Test Alternative Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])
})