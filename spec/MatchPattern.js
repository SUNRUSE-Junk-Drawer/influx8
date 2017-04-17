describe("MatchPattern", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const MatchPattern = Namespace.__get__("MatchPattern")

    Namespace.__set__("BinaryReversible", {
        "Test Non-Reversible Binary Operator": false,
        "Test Reversible Binary Operator": true,
        "Test Alternative Non-Reversible Binary Operator": false,
        "Test Alternative Reversible Binary Operator": true
    })

    function Test(description, expression, pattern, output, matchPattern, combinePatternMatchSets, getReturnedPrimitive) {
        it(description, () => {
            Namespace.__set__("MatchPattern", matchPattern || fail)
            Namespace.__set__("CombinePatternMatchSets", combinePatternMatchSets || fail)
            Namespace.__set__("GetReturnedPrimitive", getReturnedPrimitive || fail)
            expect(MatchPattern(expression, pattern)).toEqual(output)
        })
    }

    Test("any boolean boolean", "Test Expression", {
        Type: "AnyBoolean",
        Name: "Test Name"
    }, [{
        "Test Name": "Test Expression"
    }], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Boolean"
    })

    Test("any boolean integer", "Test Expression", {
        Type: "AnyBoolean",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Integer"
    })

    Test("any boolean float", "Test Expression", {
        Type: "AnyBoolean",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Float"
    })

    Test("any boolean other non-boolean", "Test Expression", {
        Type: "AnyBoolean",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Non-Boolean"
    })

    Test("any boolean undefined", "Test Expression", {
        Type: "AnyBoolean",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return undefined
    })


    Test("any integer integer", "Test Expression", {
        Type: "AnyInteger",
        Name: "Test Name"
    }, [{
        "Test Name": "Test Expression"
    }], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Integer"
    })

    Test("any integer boolean", "Test Expression", {
        Type: "AnyInteger",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Boolean"
    })

    Test("any integer float", "Test Expression", {
        Type: "AnyInteger",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Float"
    })

    Test("any integer other non-integer", "Test Expression", {
        Type: "AnyInteger",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Non-Boolean"
    })

    Test("any integer undefined", "Test Expression", {
        Type: "AnyInteger",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return undefined
    })


    Test("any float integer", "Test Expression", {
        Type: "AnyFloat",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Integer"
    })

    Test("any float boolean", "Test Expression", {
        Type: "AnyFloat",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Boolean"
    })

    Test("any float float", "Test Expression", {
        Type: "AnyFloat",
        Name: "Test Name"
    }, [{
        "Test Name": "Test Expression"
    }], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Float"
    })

    Test("any float other non-float", "Test Expression", {
        Type: "AnyFloat",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return "Non-Boolean"
    })

    Test("any float undefined", "Test Expression", {
        Type: "AnyFloat",
        Name: "Test Name"
    }, [], undefined, undefined, (expression) => {
        expect(expression).toEqual("Test Expression")
        return undefined
    })


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

    Test("boolean false float zero", {
        Type: "Float",
        Value: 0
    }, {
            Type: "Boolean",
            Value: false
        }, [])

    Test("boolean false float non-zero", {
        Type: "Float",
        Value: 37.4
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

    Test("boolean true parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
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

    Test("boolean true float zero", {
        Type: "Float",
        Value: 0
    }, {
            Type: "Boolean",
            Value: true
        }, [])

    Test("boolean true float non-zero", {
        Type: "Float",
        Value: 37.4
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

    Test("boolean true parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
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

    Test("integer zero float zero", {
        Type: "Float",
        Value: 0
    }, {
            Type: "Integer",
            Value: 0
        }, [])

    Test("integer zero float non-zero", {
        Type: "Float",
        Value: 37.4
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

    Test("integer zero parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
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

    Test("integer non-zero float zero", {
        Type: "Float",
        Value: 0
    }, {
            Type: "Integer",
            Value: 37
        }, [])

    Test("integer non-zero float match", {
        Type: "Float",
        Value: 37
    }, {
            Type: "Integer",
            Value: 37
        }, [])

    Test("integer non-zero float greater", {
        Type: "Integer",
        Value: 37.1
    }, {
            Type: "Integer",
            Value: 37
        }, [])

    Test("integer non-zero float less", {
        Type: "Float",
        Value: 37.8
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

    Test("integer non-zero parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
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

    Test("unary float zero", {
        Type: "Float",
        Value: 0
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, [])

    Test("unary float non-zero", {
        Type: "Float",
        Value: 37.4
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

    Test("unary zero parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
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

    Test("non-reversible binary float zero", {
        Type: "Float",
        Value: 0
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("non-reversible binary float non-zero", {
        Type: "Float",
        Value: 37.4
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("non-reversible binary unary", {
        Type: "Unary",
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

    Test("non-reversible binary parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
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

    Test("reversible binary float zero", {
        Type: "Float",
        Value: 0
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("reversible binary float non-zero", {
        Type: "Float",
        Value: 37.4
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])

    Test("reversible binary unary", {
        Type: "Unary",
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

    Test("reversible binary parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, [])


    Test("any parameter boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "AnyParameter",
            Name: "Test Name"
        }, [])

    Test("any parameter boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "AnyParameter",
            Name: "Test Name"
        }, [])

    Test("any parameter integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "AnyParameter",
            Name: "Test Name"
        }, [])

    Test("any parameter integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "AnyParameter",
            Name: "Test Name"
        }, [])

    Test("any parameter float zero", {
        Type: "Float",
        Value: 0
    }, {
            Type: "AnyParameter",
            Name: "Test Name"
        }, [])

    Test("any parameter float non-zero", {
        Type: "Float",
        Value: 37
    }, {
            Type: "AnyParameter",
            Name: "Test Name"
        }, [])

    Test("any parameter unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "AnyParameter",
            Name: "Test Name"
        }, [])

    Test("any parameter non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "AnyParameter",
            Name: "Test Name"
        }, [])

    Test("any parameter reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "AnyParameter",
            Name: "Test Name"
        }, [])

    Test("any parameter parameter", {
        Type: "Parameter",
        Name: "Test Parameter Name",
        Primitive: "Test Primitive",
        Item: 7
    }, {
            Type: "AnyParameter",
            Name: "Test Name"
        }, [{
            "Test Name": {
                Type: "Parameter",
                Name: "Test Parameter Name",
                Primitive: "Test Primitive",
                Item: 7
            }
        }])
})