describe("ExpressionsEquivalent", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const ExpressionsEquivalent = Namespace.__get__("ExpressionsEquivalent")

    Namespace.__set__("BinaryReversible", {
        "Test Non-Reversible Binary Operator": false,
        "Test Reversible Binary Operator": true,
        "Test Alternative Non-Reversible Binary Operator": false,
        "Test Alternative Reversible Binary Operator": true
    })

    function Test(description, expression, pattern, output, expressionsEquivalent, getReturnedPrimitive) {
        it(description, () => {
            Namespace.__set__("ExpressionsEquivalent", expressionsEquivalent || fail)
            Namespace.__set__("GetReturnedPrimitive", getReturnedPrimitive || fail)
            expect(ExpressionsEquivalent(expression, pattern)).toEqual(output)
        })
    }

    Test("boolean false boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Boolean",
            Value: false
        }, true)

    Test("boolean false boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Boolean",
            Value: false
        }, false)

    Test("boolean false integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Boolean",
            Value: false
        }, false)

    Test("boolean false integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Boolean",
            Value: false
        }, false)

    Test("boolean false unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Boolean",
            Value: false
        }, false)

    Test("boolean false non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Boolean",
            Value: false
        }, false)

    Test("boolean false reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Boolean",
            Value: false
        }, false)

    Test("boolean false parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
    }, {
            Type: "Boolean",
            Value: false
        }, false)


    Test("boolean true boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Boolean",
            Value: true
        }, false)

    Test("boolean true boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Boolean",
            Value: true
        }, true)

    Test("boolean true integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Boolean",
            Value: true
        }, false)

    Test("boolean true integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Boolean",
            Value: true
        }, false)

    Test("boolean true unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Boolean",
            Value: true
        }, false)

    Test("boolean true non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Boolean",
            Value: true
        }, false)

    Test("boolean true reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Boolean",
            Value: true
        }, false)

    Test("boolean true parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
    }, {
            Type: "Boolean",
            Value: true
        }, false)


    Test("integer zero boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Integer",
            Value: 0
        }, false)

    Test("integer zero boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Integer",
            Value: 0
        }, false)

    Test("integer zero integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Integer",
            Value: 0
        }, true)

    Test("integer zero integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Integer",
            Value: 0
        }, false)

    Test("integer zero unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Integer",
            Value: 0
        }, false)

    Test("integer zero non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Integer",
            Value: 0
        }, false)

    Test("integer zero reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Integer",
            Value: 0
        }, false)

    Test("integer zero parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
    }, {
            Type: "Integer",
            Value: 0
        }, false)


    Test("integer non-zero boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Integer",
            Value: 37
        }, false)

    Test("integer non-zero boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Integer",
            Value: 37
        }, false)

    Test("integer non-zero integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Integer",
            Value: 37
        }, false)

    Test("integer non-zero integer match", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Integer",
            Value: 37
        }, true)

    Test("integer non-zero integer greater", {
        Type: "Integer",
        Value: 39
    }, {
            Type: "Integer",
            Value: 37
        }, false)

    Test("integer non-zero integer less", {
        Type: "Integer",
        Value: 35
    }, {
            Type: "Integer",
            Value: 37
        }, false)

    Test("integer non-zero unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Integer",
            Value: 37
        }, false)

    Test("integer non-zero non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Integer",
            Value: 37
        }, false)

    Test("integer non-zero reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Integer",
            Value: 37
        }, false)

    Test("integer non-zero parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
    }, {
            Type: "Integer",
            Value: 37
        }, false)


    Test("unary boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, false)

    Test("unary boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, false)

    Test("unary integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, false)

    Test("unary integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, false)

    Test("unary unary correct operator recurses", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, true, (expression, pattern) => {
            expect(expression).toEqual("Test Expression Operand")
            expect(pattern).toEqual("Test Pattern Operand")
            return true
        })

    Test("unary unary correct operator does not recurse", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, false, (expression, pattern) => {
            expect(expression).toEqual("Test Expression Operand")
            expect(pattern).toEqual("Test Pattern Operand")
            return false
        })

    Test("unary unary incorrect operator", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Unary",
            Operator: "Test Incorrect Unary Operator",
            Operand: "Test Pattern Operand"
        }, false)

    Test("unary non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, false)

    Test("unary reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, false)

    Test("unary false parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
    }, {
            Type: "Unary",
            Operator: "Test Unary Operator",
            Operand: "Test Pattern Operand"
        }, false)


    Test("non-reversible binary boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)

    Test("non-reversible binary boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)

    Test("non-reversible binary integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)

    Test("non-reversible binary integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)

    Test("non-reversible binary unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)

    Test("non-reversible binary non-reversible binary correct operator both operands recurse", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, true, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left":
                    expect(pattern).toEqual("Test Pattern Left")
                    return true
                case "Test Expression Right":
                    expect(pattern).toEqual("Test Pattern Right")
                    return true
                default: fail("Unexpected expression")
            }
        })

    Test("non-reversible binary non-reversible binary correct operator left operand does not recurse", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left":
                    expect(pattern).toEqual("Test Pattern Left")
                    return false
                case "Test Expression Right":
                    expect(pattern).toEqual("Test Pattern Right")
                    return true
                default: fail("Unexpected expression")
            }
        })

    Test("non-reversible binary non-reversible binary correct operator right operand does not recurse", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left":
                    expect(pattern).toEqual("Test Pattern Left")
                    return true
                case "Test Expression Right":
                    expect(pattern).toEqual("Test Pattern Right")
                    return false
                default: fail("Unexpected expression")
            }
        })

    Test("non-reversible binary non-reversible binary correct operator neither operand recurses", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left":
                    expect(pattern).toEqual("Test Pattern Left")
                    return false
                case "Test Expression Right":
                    expect(pattern).toEqual("Test Pattern Right")
                    return false
                default: fail("Unexpected expression")
            }
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
        }, false)

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
        }, false)

    Test("non-reversible binary false parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
    }, {
            Type: "Binary",
            Operator: "Test Non-Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)


    Test("reversible binary boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)

    Test("reversible binary boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)

    Test("reversible binary integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)

    Test("reversible binary integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)

    Test("reversible binary unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)

    Test("reversible binary non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)

    Test("reversible binary reversible binary both combinations recurse", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, true, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary no combinations recurse", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only normal orientation recurses", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, true, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only swapped orientation recurses", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, true, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only left side recurses", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only right side recurses", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only original orientation of the left side recurses", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only swapped orientation of the left side recurses", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only original orientation of the right side recurses", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only swapped orientation of the right side recurses", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only original orientation of the left side does not recurse", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, true, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only swapped orientation of the left side does not recurse", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, true, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only original orientation of the right side does not recurse", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, true, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only swapped orientation of the right side does not recurse", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, true, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only the right side of both orientations recurses", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return false
                    case "Test Pattern Right": return true
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
            }
        })

    Test("reversible binary reversible binary only the left side of both orientations recurses", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false, (expression, pattern) => {
            switch (expression) {
                case "Test Expression Left": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                case "Test Expression Right": switch (pattern) {
                    case "Test Pattern Left": return true
                    case "Test Pattern Right": return false
                    default: fail("Unexpected pattern")
                }
                default: fail("Unexpected expression")
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
        }, false)

    Test("reversible binary false parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
    }, {
            Type: "Binary",
            Operator: "Test Reversible Binary Operator",
            Left: "Test Pattern Left",
            Right: "Test Pattern Right"
        }, false)


    Test("parameter boolean false", {
        Type: "Boolean",
        Value: false
    }, {
            Type: "Parameter",
            Name: "Test Name",
            Primitive: "Test Primitive",
            Item: 7
        }, false)

    Test("parameter boolean true", {
        Type: "Boolean",
        Value: true
    }, {
            Type: "Parameter",
            Name: "Test Name",
            Primitive: "Test Primitive",
            Item: 7
        }, false)

    Test("parameter integer zero", {
        Type: "Integer",
        Value: 0
    }, {
            Type: "Parameter",
            Name: "Test Name",
            Primitive: "Test Primitive",
            Item: 7
        }, false)

    Test("parameter integer non-zero", {
        Type: "Integer",
        Value: 37
    }, {
            Type: "Parameter",
            Name: "Test Name",
            Primitive: "Test Primitive",
            Item: 7
        }, false)

    Test("parameter unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Expression Operand"
    }, {
            Type: "Parameter",
            Name: "Test Name",
            Primitive: "Test Primitive",
            Item: 7
        }, false)

    Test("parameter reversible binary", {
        Type: "Binary",
        Operator: "Test Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Parameter",
            Name: "Test Name",
            Primitive: "Test Primitive",
            Item: 7
        }, false)

    Test("parameter non-reversible binary", {
        Type: "Binary",
        Operator: "Test Non-Reversible Binary Operator",
        Left: "Test Expression Left",
        Right: "Test Expression Right"
    }, {
            Type: "Parameter",
            Name: "Test Name",
            Primitive: "Test Primitive",
            Item: 7
        }, false)

    Test("parameter parameter match", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 7
    }, {
            Type: "Parameter",
            Name: "Test Name",
            Primitive: "Test Primitive",
            Item: 7
        }, true)

    Test("parameter parameter incorrect item", {
        Type: "Parameter",
        Name: "Test Name",
        Primitive: "Test Primitive",
        Item: 5
    }, {
            Type: "Parameter",
            Name: "Test Name",
            Primitive: "Test Primitive",
            Item: 7
        }, false)

    Test("parameter parameter incorrect name", {
        Type: "Parameter",
        Name: "Test Alternative Name",
        Primitive: "Test Primitive",
        Item: 7
    }, {
            Type: "Parameter",
            Name: "Test Name",
            Primitive: "Test Primitive",
            Item: 7
        }, false)
})