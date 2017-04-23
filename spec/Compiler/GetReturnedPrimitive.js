describe("GetReturnedPrimitive", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const GetReturnedPrimitive = Namespace.__get__("GetReturnedPrimitive")
    Namespace.__set__("BinaryReturnTypes", {
        "Test Binary A": "Test Binary Type A",
        "Test Binary B": "Test Binary Type B",
        "Test Binary C": "Test Binary Type C"
    })

    Namespace.__set__("UnaryReturnTypes", {
        "Test Unary A": "Test Unary Type A",
        "Test Unary B": "Test Unary Type B",
        "Test Unary C": "Test Unary Type C"
    })

    function Test(description, input, output, getReturnedPrimitive) {
        it(description, () => {
            Namespace.__set__("GetReturnedPrimitive", getReturnedPrimitive || fail)
            expect(GetReturnedPrimitive(input)).toEqual(output)
        })
    }

    Test("unknown", {
        Type: "Unknown",
        StartIndex: 32,
        EndIndex: 48,
        Tokens: "Anything"
    }, undefined)

    Test("boolean", {
        Type: "Boolean",
        StartIndex: 32,
        EndIndex: 48,
        Value: "Anything"
    }, "Boolean")

    Test("integer", {
        Type: "Integer",
        StartIndex: 32,
        EndIndex: 48,
        Value: "Anything"
    }, "Integer")

    Test("float", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 48,
        Value: "Anything"
    }, "Float")

    Test("binary", {
        Type: "Binary",
        Operator: "Test Binary B",
        Left: "Test Left",
        Right: "Test Right"
    }, "Test Binary Type B")

    Test("binary unmatched", {
        Type: "BinaryUnmatched",
        Operator: "Test Operator",
        Left: "Test Left",
        Right: "Test Right"
    }, undefined)

    Test("unary", {
        Type: "Unary",
        Operator: "Test Unary B",
        Operand: "Test Operand"
    }, "Test Unary Type B")

    Test("unary unmatched", {
        Type: "UnaryUnmatched",
        Operator: "Test Operator",
        Operand: "Test Left"
    }, undefined)

    Test("let", {
        Type: "Let",
        StartIndex: 32,
        EndIndex: 48,
        Name: "Test Name",
        NameStartIndex: 12,
        NameEndIndex: 17,
        Value: "Test Value",
        Then: "Test Then"
    }, "Test Recursed Then", (expression) => {
        expect(expression).toEqual("Test Then")
        return "Test Recursed Then"
    })

    Test("let without identifier", {
        Type: "LetWithoutIdentifier",
        StartIndex: 32,
        EndIndex: 48,
        Then: "Test Then"
    }, "Test Recursed Then", (expression) => {
        expect(expression).toEqual("Test Then")
        return "Test Recursed Then"
    })

    Test("let incorrect identifier type", {
        Type: "LetIncorrectIdentifierType",
        StartIndex: 32,
        EndIndex: 48,
        ActualType: "Test Actual Type",
        Value: "Test Value",
        Then: "Test Then"
    }, "Test Recursed Then", (expression) => {
        expect(expression).toEqual("Test Then")
        return "Test Recursed Then"
    })

    Test("let name not unique", {
        Type: "LetNameNotUnique",
        StartIndex: 32,
        EndIndex: 48,
        Name: "Test Name",
        NameStartIndex: 12,
        NameEndIndex: 17,
        Value: "Test Value",
        Then: "Test Then"
    }, "Test Recursed Then", (expression) => {
        expect(expression).toEqual("Test Then")
        return "Test Recursed Then"
    })

    Test("return", {
        Type: "Return",
        StartIndex: 32,
        EndIndex: 48,
        Value: "Test Value"
    }, "Test Recursed Value", (expression) => {
        expect(expression).toEqual("Test Value")
        return "Test Recursed Value"
    })

    Test("next statement not found", {
        Type: "NextStatementNotFound",
        Tokens: "Test Tokens"
    }, undefined)

    Test("lambda", {
        Type: "Lambda",
        StartIndex: 32,
        EndIndex: 48,
        Name: "Test Name",
        NameStartIndex: 12,
        NameEndIndex: 17,
        Body: "Test Body",
        Scope: "Test Scope"
    }, undefined)

    Test("lambda without identifier", {
        Type: "LambdaWithoutIdentifier",
        StartIndex: 32,
        EndIndex: 48,
        Body: "Test Body"
    }, undefined)

    Test("lambda incorrect identifier type", {
        Type: "LambdaIncorrectIdentifierType",
        StartIndex: 32,
        EndIndex: 48,
        ActualType: "Test Actual Type",
        NameStartIndex: 12,
        NameEndIndex: 17,
        Body: "Test Body"
    }, undefined)

    Test("lambda name not unique", {
        Type: "LambdaNameNotUnique",
        StartIndex: 32,
        EndIndex: 48,
        Name: "Test Name",
        NameStartIndex: 12,
        NameEndIndex: 17,
        Body: "Test Body",
        Scope: "Test Scope"
    }, undefined)

    Test("reference", {
        Type: "Reference",
        StartIndex: 32,
        EndIndex: 48,
        Name: "Test Name",
        Value: "Test Value"
    }, "Test Recursed Value", (expression) => {
        expect(expression).toEqual("Test Value")
        return "Test Recursed Value"
    })

    Test("reference undefined", {
        Type: "ReferenceUndefined",
        StartIndex: 32,
        EndIndex: 48,
        Name: "Test Name"
    }, undefined)

    Test("call", {
        Type: "Call",
        Lambda: "Test Lambda",
        Argument: "Test Argument",
        Result: "Test Result"
    }, "Test Recursed Result", (expression) => {
        expect(expression).toEqual("Test Result")
        return "Test Recursed Result"
    })

    Test("call lambda expected", {
        Type: "CallLambdaExpected",
        Value: "Test Value"
    }, undefined)

    Test("concatenate left", {
        Type: "ConcatenateLeft",
        Value: "Test Value"
    }, "Test Recursed Value", (expression) => {
        expect(expression).toEqual("Test Value")
        return "Test Recursed Value"
    })

    Test("concatenate right", {
        Type: "ConcatenateRight",
        Value: "Test Value"
    }, "Test Recursed Value", (expression) => {
        expect(expression).toEqual("Test Value")
        return "Test Recursed Value"
    })

    Test("binary inconsistent plurality", {
        Type: "BinaryInconsistentPlurality",
        Operator: "Test Operator",
        Left: ["Test Left A", "Test Left B", "Test Left C"],
        Right: ["Test Right A", "Test Right B", "Test Right C", "Test Right D"],
    }, undefined)

    Test("get item", {
        Type: "GetItem",
        Item: "Test Item",
        Of: "Test Of",
        Value: "Test Value"
    }, "Test Recursed Value", (expression) => {
        expect(expression).toEqual("Test Value")
        return "Test Recursed Value"
    })

    Test("get item out of range", {
        Type: "GetItemOutOfRange",
        Item: "Test Item",
        Of: "Test Of"
    })

    Test("verified boolean", {
        Type: "Boolean",
        Value: "Anything"
    }, "Boolean")

    Test("verified integer", {
        Type: "Integer",
        Value: "Anything"
    }, "Integer")

    Test("verified float", {
        Type: "Float",
        Value: "Anything"
    }, "Float")

    Test("verified binary", {
        Type: "Binary",
        Operator: "Test Binary B",
        Left: "Test Left",
        Right: "Test Right"
    }, "Test Binary Type B")

    Test("verified unary", {
        Type: "Unary",
        Operator: "Test Unary B",
        Operand: "Test Operand"
    }, "Test Unary Type B")

    Test("verified parameter", {
        Type: "Parameter",
        Name: "Test Name",
        Item: 5,
        Primitive: "Test Primitive",
        Plurality: 10
    }, "Test Primitive")
})