describe("TypecheckExpression", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const TypecheckExpression = Namespace.__get__("TypecheckExpression")

    Namespace.__set__("UnaryTypeMappings", {
        "Test Red Herring A": {
            "Test Valid Primitive": "Test Red Herring Mapping A A",
            "Test Invalid Primitive": "Test Red Herring Mapping A B"
        },
        "Test Unary Operator": {
            "Test Valid Primitive": "Test Matched Unary Operator",
            "Test Invalid Primitive": undefined
        },
        "Test Red Herring B": {
            "Test Valid Primitive": undefined,
            "Test Invalid Primitive": "Test Red Herring Mapping B"
        }
    })

    Namespace.__set__("BinaryTypeMappings", {
        "Test Red Herring A": {
            "Test Valid Primitive": "Test Red Herring Mapping A A",
            "Test Alternative Valid Primitive": "Test Red Herring Mapping A B",
            "Test Invalid Primitive": "Test Red Herring Mapping A C",
            "Test Alternative Invalid Primitive": "Test Red Herring Mapping A D"
        },
        "Test Binary Operator": {
            "Test Valid Primitive": "Test Matched Binary Operator",
            "Test Alternative Valid Primitive": "Test Alternative Matched Binary Operator",
            "Test Invalid Primitive": undefined,
            "Test Alternative Invalid Primitive": undefined
        },
        "Test Red Herring B": {
            "Test Valid Primitive": undefined,
            "Test Alternative Valid Primitive": undefined,
            "Test Invalid Primitive": "Test Red Herring Mapping B A",
            "Test Alternative Invalid Primitive": "Test Red Herring Mapping B B"
        }
    })

    function Test(description, expression, output, typecheckExpression, getReturnedPrimitive) {
        it(description, () => {
            Namespace.__set__("TypecheckExpression", typecheckExpression || fail)
            Namespace.__set__("GetReturnedPrimitive", getReturnedPrimitive || fail)
            expect(TypecheckExpression(expression)).toEqual(output)
        })
    }

    Test("call", {
        Type: "Call",
        Lambda: "Test Lambda",
        Argument: ["Test Expression Argument A", "Test Expression Argument B", "Test Expression Argument C"],
        Result: "Test Result",
        StartIndex: 32,
        EndIndex: 47
    }, {
            Type: "Call",
            Lambda: "Test Lambda",
            Argument: ["Test Recursed Expression Argument A", "Test Recursed Expression Argument B", "Test Recursed Expression Argument C"],
            Result: "Test Recursed Result"
        }, (expression) => {
            switch (expression) {
                case "Test Expression Argument": return "Test Recursed Expression Argument"
                case "Test Result": return "Test Recursed Result"
                case "Test Expression Argument A": return "Test Recursed Expression Argument A"
                case "Test Expression Argument B": return "Test Recursed Expression Argument B"
                case "Test Expression Argument C": return "Test Recursed Expression Argument C"
                default: fail("Unexpected expression")
            }
        })

    Test("boolean", {
        Type: "Boolean",
        StartIndex: 32,
        EndIndex: 48,
        Value: "Irrelevant"
    }, {
            Type: "Boolean",
            StartIndex: 32,
            EndIndex: 48,
            Value: "Irrelevant"
        })

    Test("integer", {
        Type: "Integer",
        StartIndex: 32,
        EndIndex: 48,
        Value: "Irrelevant"
    }, {
            Type: "Integer",
            StartIndex: 32,
            EndIndex: 48,
            Value: "Irrelevant"
        })

    Test("float", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 48,
        Value: "Irrelevant"
    }, {
            Type: "Float",
            StartIndex: 32,
            EndIndex: 48,
            Value: "Irrelevant"
        })

    Test("unknown", {
        Type: "Unknown",
        StartIndex: 32,
        EndIndex: 48,
        Tokens: "Irrelevant"
    }, {
            Type: "Unknown",
            StartIndex: 32,
            EndIndex: 48,
            Tokens: "Irrelevant"
        })

    Test("next statement not found", {
        Type: "NextStatementNotFound",
        Tokens: "Irrelevant",
        StartIndex: 32,
        EndIndex: 48
    }, {
            Type: "NextStatementNotFound",
            Tokens: "Irrelevant",
            StartIndex: 32,
            EndIndex: 48
        })

    Test("unary operand valid but unmatched", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "UnaryUnmatched",
            Operator: "Test Unary Operator",
            Operand: "Test Recursed Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            expect(expression).toEqual("Test Operand")
            return "Test Recursed Operand"
        }, (expression) => {
            expect(expression).toEqual("Test Recursed Operand")
            return "Test Invalid Primitive"
        })

    Test("unary operand valid with match", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "Unary",
            Operator: "Test Matched Unary Operator",
            Operand: "Test Recursed Operand"
        }, (expression) => {
            expect(expression).toEqual("Test Operand")
            return "Test Recursed Operand"
        }, (expression) => {
            expect(expression).toEqual("Test Recursed Operand")
            return "Test Valid Primitive"
        })

    Test("unary operand invalid", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "UnaryUnmatched",
            Operator: "Test Unary Operator",
            Operand: "Test Recursed Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            expect(expression).toEqual("Test Operand")
            return "Test Recursed Operand"
        }, (expression) => {
            expect(expression).toEqual("Test Recursed Operand")
            return undefined
        })

    Test("binary left matched right matched same", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "Binary",
            Operator: "Test Matched Binary Operator",
            Left: "Test Recursed Left Operand",
            Right: "Test Recursed Right Operand"
        }, (expression) => {
            switch (expression) {
                case "Test Left Operand": return "Test Recursed Left Operand"
                case "Test Right Operand": return "Test Recursed Right Operand"
                default: fail("Unexpected expression")
            }
        }, (expression) => {
            switch (expression) {
                case "Test Recursed Left Operand": return "Test Valid Primitive"
                case "Test Recursed Right Operand": return "Test Valid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left matched right matched different", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
            Left: "Test Recursed Left Operand",
            Right: "Test Recursed Right Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            switch (expression) {
                case "Test Left Operand": return "Test Recursed Left Operand"
                case "Test Right Operand": return "Test Recursed Right Operand"
                default: fail("Unexpected expression")
            }
        }, (expression) => {
            switch (expression) {
                case "Test Recursed Left Operand": return "Test Valid Primitive"
                case "Test Recursed Right Operand": return "Test Alternative Valid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left matched right mismatched", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
            Left: "Test Recursed Left Operand",
            Right: "Test Recursed Right Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            switch (expression) {
                case "Test Left Operand": return "Test Recursed Left Operand"
                case "Test Right Operand": return "Test Recursed Right Operand"
                default: fail("Unexpected expression")
            }
        }, (expression) => {
            switch (expression) {
                case "Test Recursed Left Operand": return "Test Valid Primitive"
                case "Test Recursed Right Operand": return "Test Invalid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left matched right invalid", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
            Left: "Test Recursed Left Operand",
            Right: "Test Recursed Right Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            switch (expression) {
                case "Test Left Operand": return "Test Recursed Left Operand"
                case "Test Right Operand": return "Test Recursed Right Operand"
                default: fail("Unexpected expression")
            }
        }, (expression) => {
            switch (expression) {
                case "Test Recursed Left Operand": return "Test Valid Primitive"
                case "Test Recursed Right Operand": return undefined
                default: fail("Unexpected expression")
            }
        })

    Test("binary left mismatched right matched", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
            Left: "Test Recursed Left Operand",
            Right: "Test Recursed Right Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            switch (expression) {
                case "Test Left Operand": return "Test Recursed Left Operand"
                case "Test Right Operand": return "Test Recursed Right Operand"
                default: fail("Unexpected expression")
            }
        }, (expression) => {
            switch (expression) {
                case "Test Recursed Left Operand": return "Test Invalid Primitive"
                case "Test Recursed Right Operand": return "Test Valid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left mismatched right mismatched same", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
            Left: "Test Recursed Left Operand",
            Right: "Test Recursed Right Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            switch (expression) {
                case "Test Left Operand": return "Test Recursed Left Operand"
                case "Test Right Operand": return "Test Recursed Right Operand"
                default: fail("Unexpected expression")
            }
        }, (expression) => {
            switch (expression) {
                case "Test Recursed Left Operand": return "Test Invalid Primitive"
                case "Test Recursed Right Operand": return "Test Invalid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left mismatched right mismatched different", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
            Left: "Test Recursed Left Operand",
            Right: "Test Recursed Right Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            switch (expression) {
                case "Test Left Operand": return "Test Recursed Left Operand"
                case "Test Right Operand": return "Test Recursed Right Operand"
                default: fail("Unexpected expression")
            }
        }, (expression) => {
            switch (expression) {
                case "Test Recursed Left Operand": return "Test Invalid Primitive"
                case "Test Recursed Right Operand": return "Test Alternative Invalid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left mismatched right invalid", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
            Left: "Test Recursed Left Operand",
            Right: "Test Recursed Right Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            switch (expression) {
                case "Test Left Operand": return "Test Recursed Left Operand"
                case "Test Right Operand": return "Test Recursed Right Operand"
                default: fail("Unexpected expression")
            }
        }, (expression) => {
            switch (expression) {
                case "Test Recursed Left Operand": return "Test Invalid Primitive"
                case "Test Recursed Right Operand": return undefined
                default: fail("Unexpected expression")
            }
        })

    Test("binary left invalid right matched", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
            Left: "Test Recursed Left Operand",
            Right: "Test Recursed Right Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            switch (expression) {
                case "Test Left Operand": return "Test Recursed Left Operand"
                case "Test Right Operand": return "Test Recursed Right Operand"
                default: fail("Unexpected expression")
            }
        }, (expression) => {
            switch (expression) {
                case "Test Recursed Left Operand": return undefined
                case "Test Recursed Right Operand": return "Test Valid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left invalid right mismatched", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
            Left: "Test Recursed Left Operand",
            Right: "Test Recursed Right Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            switch (expression) {
                case "Test Left Operand": return "Test Recursed Left Operand"
                case "Test Right Operand": return "Test Recursed Right Operand"
                default: fail("Unexpected expression")
            }
        }, (expression) => {
            switch (expression) {
                case "Test Recursed Left Operand": return undefined
                case "Test Recursed Right Operand": return "Test Invalid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left invalid right invalid", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand",
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
            Left: "Test Recursed Left Operand",
            Right: "Test Recursed Right Operand",
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            switch (expression) {
                case "Test Left Operand": return "Test Recursed Left Operand"
                case "Test Right Operand": return "Test Recursed Right Operand"
                default: fail("Unexpected expression")
            }
        }, (expression) => {
            switch (expression) {
                case "Test Recursed Left Operand": return undefined
                case "Test Recursed Right Operand": return undefined
                default: fail("Unexpected expression")
            }
        })

    Test("let", {
        Type: "Let",
        StartIndex: 56,
        EndIndex: 63,
        Name: "Test Name",
        NameStartIndex: 32,
        NameEndIndex: 41,
        Value: ["Test Value A", "Test Value B", "Test Value C"],
        Then: "Test Then"
    }, {
            Type: "Let",
            StartIndex: 56,
            EndIndex: 63,
            Name: "Test Name",
            NameStartIndex: 32,
            NameEndIndex: 41,
            Value: ["Test Recursed Value A", "Test Recursed Value B", "Test Recursed Value C"],
            Then: "Test Recursed Then"
        }, (expression) => {
            switch (expression) {
                case "Test Value": return "Test Recursed Value"
                case "Test Then": return "Test Recursed Then"
                case "Test Value A": return "Test Recursed Value A"
                case "Test Value B": return "Test Recursed Value B"
                case "Test Value C": return "Test Recursed Value C"
                default: fail("Unexpected expression")
            }
        })

    Test("let name not unique", {
        Type: "LetNameNotUnique",
        StartIndex: 56,
        EndIndex: 63,
        Name: "Test Name",
        NameStartIndex: 32,
        NameEndIndex: 41,
        Value: ["Test Value A", "Test Value B", "Test Value C"],
        Then: "Test Then"
    }, {
            Type: "LetNameNotUnique",
            StartIndex: 56,
            EndIndex: 63,
            Name: "Test Name",
            NameStartIndex: 32,
            NameEndIndex: 41,
            Value: ["Test Recursed Value A", "Test Recursed Value B", "Test Recursed Value C"],
            Then: "Test Recursed Then"
        }, (expression) => {
            switch (expression) {
                case "Test Value": return "Test Recursed Value"
                case "Test Then": return "Test Recursed Then"
                case "Test Value A": return "Test Recursed Value A"
                case "Test Value B": return "Test Recursed Value B"
                case "Test Value C": return "Test Recursed Value C"
                default: fail("Unexpected expression")
            }
        })

    Test("let without identifier", {
        Type: "LetWithoutIdentifier",
        StartIndex: 56,
        EndIndex: 63,
        Then: "Test Then"
    }, {
            Type: "LetWithoutIdentifier",
            StartIndex: 56,
            EndIndex: 63,
            Then: "Test Recursed Then"
        }, (expression) => {
            expect(expression).toEqual("Test Then")
            return "Test Recursed Then"
        })

    Test("let incorrect identifier type", {
        Type: "LetIncorrectIdentifierType",
        StartIndex: 56,
        EndIndex: 63,
        ActualType: "Test Actual Type",
        Value: ["Test Value A", "Test Value B", "Test Value C"],
        Then: "Test Then"
    }, {
            Type: "LetIncorrectIdentifierType",
            StartIndex: 56,
            EndIndex: 63,
            ActualType: "Test Actual Type",
            Value: ["Test Recursed Value A", "Test Recursed Value B", "Test Recursed Value C"],
            Then: "Test Recursed Then"
        }, (expression) => {
            switch (expression) {
                case "Test Value": return "Test Recursed Value"
                case "Test Then": return "Test Recursed Then"
                case "Test Value A": return "Test Recursed Value A"
                case "Test Value B": return "Test Recursed Value B"
                case "Test Value C": return "Test Recursed Value C"
                default: fail("Unexpected expression")
            }
        })

    Test("return", {
        Type: "Return",
        StartIndex: 56,
        EndIndex: 63,
        Value: "Test Value"
    }, {
            Type: "Return",
            StartIndex: 56,
            EndIndex: 63,
            Value: "Test Recursed Value"
        }, (expression) => {
            expect(expression).toEqual("Test Value")
            return "Test Recursed Value"
        })

    Test("lambda", {
        Type: "Lambda",
        StartIndex: 56,
        EndIndex: 63,
        Name: "Test Name",
        NameStartIndex: 32,
        NameEndIndex: 41,
        Body: "Test Body",
    }, {
            Type: "Lambda",
            StartIndex: 56,
            EndIndex: 63,
            Name: "Test Name",
            NameStartIndex: 32,
            NameEndIndex: 41,
            Body: "Test Body",
        })

    Test("lambda without identifier", {
        Type: "LambdaWithoutIdentifier",
        StartIndex: 32,
        EndIndex: 48,
        Body: "Test Body"
    }, {
            Type: "LambdaWithoutIdentifier",
            StartIndex: 32,
            EndIndex: 48,
            Body: "Test Body"
        })

    Test("lambda incorrect identifier type", {
        Type: "LambdaIncorrectIdentifierType",
        StartIndex: 56,
        EndIndex: 63,
        Name: "Test Name",
        NameStartIndex: 32,
        NameEndIndex: 41,
        Body: "Test Body"
    }, {
            Type: "LambdaIncorrectIdentifierType",
            StartIndex: 56,
            EndIndex: 63,
            Name: "Test Name",
            NameStartIndex: 32,
            NameEndIndex: 41,
            Body: "Test Body"
        })

    Test("lambda name not unique", {
        Type: "LambdaNameNotUnique",
        StartIndex: 56,
        EndIndex: 63,
        Name: "test scope key b",
        NameStartIndex: 32,
        NameEndIndex: 41,
        Body: "Test Body",
        Scope: {
            "test scope key a": "test scope value a",
            "test scope key b": "test scope value b",
            "test scope key c": "test scope value c"
        }
    }, {
            Type: "LambdaNameNotUnique",
            StartIndex: 56,
            EndIndex: 63,
            Name: "test scope key b",
            NameStartIndex: 32,
            NameEndIndex: 41,
            Body: "Test Body",
            Scope: {
                "test scope key a": "test scope value a",
                "test scope key b": "test scope value b",
                "test scope key c": "test scope value c"
            }
        })

    Test("reference", {
        Type: "Reference",
        StartIndex: 32,
        EndIndex: 48,
        Name: "Test Name",
        Value: "Test Value"
    }, {
            Type: "Reference",
            StartIndex: 32,
            EndIndex: 48,
            Name: "Test Name",
            Value: "Test Recursed Value"
        }, (expression) => {
            expect(expression).toEqual("Test Value")
            return "Test Recursed Value"
        })

    Test("reference undefined", {
        Type: "ReferenceUndefined",
        StartIndex: 32,
        EndIndex: 48,
        Name: "Irrelevant"
    }, {
            Type: "ReferenceUndefined",
            StartIndex: 32,
            EndIndex: 48,
            Name: "Irrelevant"
        })

    Test("lambda expected", {
        Type: "CallLambdaExpected",
        Value: ["Test Value A", "Test Value B", "Test Value C"],
        StartIndex: 32,
        EndIndex: 47
    }, {
            Type: "CallLambdaExpected",
            Value: ["Test Recursed Value A", "Test Recursed Value B", "Test Recursed Value C"]
        }, (expression) => {
            switch (expression) {
                case "Test Value A": return "Test Recursed Value A"
                case "Test Value B": return "Test Recursed Value B"
                case "Test Value C": return "Test Recursed Value C"
                default: fail("Unexpected expression")
            }
        })

    Test("concatenate left", {
        Type: "ConcatenateLeft",
        Value: "Test Value",
        StartIndex: 32,
        EndIndex: 47
    }, {
            Type: "ConcatenateLeft",
            Value: "Test Recursed Value"
        }, (expression) => {
            expect(expression).toEqual("Test Value")
            return "Test Recursed Value"
        })

    Test("concatenate right", {
        Type: "ConcatenateRight",
        Value: "Test Value",
        StartIndex: 32,
        EndIndex: 47
    }, {
            Type: "ConcatenateRight",
            Value: "Test Recursed Value"
        }, (expression) => {
            expect(expression).toEqual("Test Value")
            return "Test Recursed Value"
        })

    Test("binary inconsistent plurality", {
        Type: "BinaryInconsistentPlurality",
        Operator: "Any Operator",
        Left: ["Test Left A", "Test Left B", "Test Left C"],
        Right: ["Test Right A", "Test Right B", "Test Right C", "Test Right D"],
        StartIndex: 56,
        EndIndex: 75
    }, {
            Type: "BinaryInconsistentPlurality",
            Operator: "Any Operator",
            Left: ["Test Recursed Left A", "Test Recursed Left B", "Test Recursed Left C"],
            Right: ["Test Recursed Right A", "Test Recursed Right B", "Test Recursed Right C", "Test Recursed Right D"],
            StartIndex: 56,
            EndIndex: 75
        }, (expression) => {
            switch (expression) {
                case "Test Left A": return "Test Recursed Left A"
                case "Test Left B": return "Test Recursed Left B"
                case "Test Left C": return "Test Recursed Left C"
                case "Test Right A": return "Test Recursed Right A"
                case "Test Right B": return "Test Recursed Right B"
                case "Test Right C": return "Test Recursed Right C"
                case "Test Right D": return "Test Recursed Right D"
                default: fail("Unexpected expression")
            }
        })

    Test("get item", {
        Type: "GetItem",
        Item: "Test Item",
        Of: ["Test Of A", "Test Of B", "Test Of C"],
        Value: "Test Value",
        StartIndex: 32,
        EndIndex: 47
    }, {
            Type: "GetItem",
            Item: "Test Item",
            Of: ["Test Recursed Of A", "Test Recursed Of B", "Test Recursed Of C"],
            Value: "Test Recursed Value"
        }, (expression) => {
            switch (expression) {
                case "Test Of A": return "Test Recursed Of A"
                case "Test Of B": return "Test Recursed Of B"
                case "Test Of C": return "Test Recursed Of C"
                case "Test Value": return "Test Recursed Value"
                default: fail("Unexpected expression")
            }
        })

    Test("get item out of range", {
        Type: "GetItemOutOfRange",
        Item: "Test Item",
        Of: ["Test Of A", "Test Of B", "Test Of C"],
        StartIndex: 32,
        EndIndex: 47
    }, {
            Type: "GetItemOutOfRange",
            Item: "Test Item",
            Of: ["Test Recursed Of A", "Test Recursed Of B", "Test Recursed Of C"]
        }, (expression) => {
            switch (expression) {
                case "Test Of A": return "Test Recursed Of A"
                case "Test Of B": return "Test Recursed Of B"
                case "Test Of C": return "Test Recursed Of C"
                default: fail("Unexpected expression")
            }
        })

    Test("parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Item: 7,
        Primitive: "Test Primitive",
        Plurality: 10,
        StartIndex: 32,
        EndIndex: 47
    }, {
            Type: "Parameter",
            Name: "Test Name",
            Item: 7,
            Primitive: "Test Primitive",
            Plurality: 10,
            StartIndex: 32,
            EndIndex: 47
        })
})