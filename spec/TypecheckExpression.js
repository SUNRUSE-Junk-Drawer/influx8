describe("TypecheckExpression", () => {
    const Namespace = require("rewire")("../dist/index.js")
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
        Argument: "Test Expression Argument",
        Result: "Test Result"
    }, {
            Type: "Call",
            Lambda: "Test Lambda",
            Argument: "Test Recursed Expression Argument",
            Result: "Test Recursed Result"
        }, (expression) => {
            switch (expression) {
                case "Test Expression Argument": return "Test Recursed Expression Argument"
                case "Test Result": return "Test Recursed Result"
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
        Tokens: "Irrelevant"
    }, {
            Type: "NextStatementNotFound",
            Tokens: "Irrelevant"
        })

    Test("unary operand valid but unmatched", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Operand"
    }, {
            Type: "UnaryUnmatched",
            Operator: "Test Unary Operator",
            Operand: "Test Recursed Operand"
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
        Operand: "Test Operand"
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
        Operand: "Test Operand"
    }, {
            Type: "UnaryUnmatched",
            Operator: "Test Unary Operator",
            Operand: "Test Recursed Operand"
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
        Right: "Test Right Operand"
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
        Right: "Test Right Operand"
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
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
                case "Test Recursed Right Operand": return "Test Alternative Valid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left matched right mismatched", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand"
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
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
                case "Test Recursed Right Operand": return "Test Invalid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left matched right invalid", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand"
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
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
                case "Test Recursed Right Operand": return undefined
                default: fail("Unexpected expression")
            }
        })

    Test("binary left mismatched right matched", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand"
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
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
                case "Test Recursed Left Operand": return "Test Invalid Primitive"
                case "Test Recursed Right Operand": return "Test Valid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left mismatched right mismatched same", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand"
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
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
                case "Test Recursed Left Operand": return "Test Invalid Primitive"
                case "Test Recursed Right Operand": return "Test Invalid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left mismatched right mismatched different", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand"
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
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
                case "Test Recursed Left Operand": return "Test Invalid Primitive"
                case "Test Recursed Right Operand": return "Test Alternative Invalid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left mismatched right invalid", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand"
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
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
                case "Test Recursed Left Operand": return "Test Invalid Primitive"
                case "Test Recursed Right Operand": return undefined
                default: fail("Unexpected expression")
            }
        })

    Test("binary left invalid right matched", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand"
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
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
                case "Test Recursed Left Operand": return undefined
                case "Test Recursed Right Operand": return "Test Valid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left invalid right mismatched", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand"
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
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
                case "Test Recursed Left Operand": return undefined
                case "Test Recursed Right Operand": return "Test Invalid Primitive"
                default: fail("Unexpected expression")
            }
        })

    Test("binary left invalid right invalid", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left Operand",
        Right: "Test Right Operand"
    }, {
            Type: "BinaryUnmatched",
            Operator: "Test Binary Operator",
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
        Value: "Test Value",
        Then: "Test Then"
    }, {
            Type: "Let",
            StartIndex: 56,
            EndIndex: 63,
            Name: "Test Name",
            NameStartIndex: 32,
            NameEndIndex: 41,
            Value: "Test Recursed Value",
            Then: "Test Recursed Then"
        }, (expression) => {
            switch (expression) {
                case "Test Value": return "Test Recursed Value"
                case "Test Then": return "Test Recursed Then"
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
        Value: "Test Value",
        Then: "Test Then"
    }, {
            Type: "LetNameNotUnique",
            StartIndex: 56,
            EndIndex: 63,
            Name: "Test Name",
            NameStartIndex: 32,
            NameEndIndex: 41,
            Value: "Test Recursed Value",
            Then: "Test Recursed Then"
        }, (expression) => {
            switch (expression) {
                case "Test Value": return "Test Recursed Value"
                case "Test Then": return "Test Recursed Then"
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
        Value: "Test Value",
        Then: "Test Then"
    }, {
            Type: "LetIncorrectIdentifierType",
            StartIndex: 56,
            EndIndex: 63,
            ActualType: "Test Actual Type",
            Value: "Test Recursed Value",
            Then: "Test Recursed Then"
        }, (expression) => {
            switch (expression) {
                case "Test Value": return "Test Recursed Value"
                case "Test Then": return "Test Recursed Then"
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
        Value: "Test Value"
    }, {
            Type: "CallLambdaExpected",
            Value: "Test Recursed Value"
        }, (expression) => {
            expect(expression).toEqual("Test Value")
            return "Test Recursed Value"
        })
})