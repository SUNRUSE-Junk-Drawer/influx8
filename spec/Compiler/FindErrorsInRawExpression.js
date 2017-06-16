describe("FindErrorsInRawExpression", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const FindErrorsInRawExpression = Namespace.__get__("FindErrorsInRawExpression")

    function Test(description, input, output, findErrorsInRawExpression) {
        describe(description, () => {
            beforeEach(() => Namespace.__set__("FindErrorsInRawExpression", findErrorsInRawExpression || fail))
            it("returns the expected output", () => expect(FindErrorsInRawExpression(input)).toEqual(output))
        })
    }

    Test("boolean false", {
        Type: "Boolean",
        StartIndex: 24,
        EndIndex: 32,
        Value: false
    }, [])

    Test("boolean true", {
        Type: "Boolean",
        StartIndex: 24,
        EndIndex: 32,
        Value: true
    }, [])

    Test("integer zero", {
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 32,
        Value: 0
    }, [])

    Test("integer nonzero", {
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 32,
        Value: 1345
    }, [])

    Test("float zero", {
        Type: "Float",
        StartIndex: 24,
        EndIndex: 32,
        Value: 0
    }, [])

    Test("float less than one", {
        Type: "Float",
        StartIndex: 24,
        EndIndex: 32,
        Value: 0.6
    }, [])

    Test("float greater than one", {
        Type: "Float",
        StartIndex: 24,
        EndIndex: 32,
        Value: 44.12
    }, [])

    Test("unknown expression", {
        Type: "Unknown",
        StartIndex: 24,
        EndIndex: 32,
        Tokens: "test tokens"
    }, [{
        Type: "Unknown",
        StartIndex: 24,
        EndIndex: 32
    }])

    Test("next statement not found", {
        Type: "NextStatementNotFound",
        StartIndex: 24,
        EndIndex: 32,
        Tokens: "test tokens"
    }, [{
        Type: "NextStatementNotFound",
        StartIndex: 24,
        EndIndex: 32
    }])

    Test("unary", {
        Type: "Unary",
        Operator: "test operator",
        Operand: "test operand",
        StartIndex: 24,
        EndIndex: 32
    }, [
            "test recursed operand a",
            "test recursed operand b",
            "test recursed operand c"
        ], expression => {
            expect(expression).toEqual("test operand")
            return [
                "test recursed operand a",
                "test recursed operand b",
                "test recursed operand c"
            ]
        })

    Test("binary", {
        Type: "Binary",
        Operator: "test operator",
        Left: "test left",
        Right: "test right",
        StartIndex: 24,
        EndIndex: 32
    }, [
            "test recursed left a",
            "test recursed left b",
            "test recursed left c",
            "test recursed right a",
            "test recursed right b",
            "test recursed right c",
            "test recursed right d"
        ], expression => {
            expect(["test left", "test right"]).toContain(expression)
            if (expression == "test left") return [
                "test recursed left a",
                "test recursed left b",
                "test recursed left c"
            ]

            if (expression == "test right") return [
                "test recursed right a",
                "test recursed right b",
                "test recursed right c",
                "test recursed right d"
            ]
        })

    Test("let without identifier", {
        Type: "LetWithoutIdentifier",
        StartIndex: 24,
        EndIndex: 32,
        Then: "test then"
    }, [{
        Type: "LetWithoutIdentifier",
        StartIndex: 24,
        EndIndex: 32
    },
            "test recursed then a",
            "test recursed then b",
            "test recursed then c"
        ], expression => {
            expect(expression).toEqual("test then")
            return [
                "test recursed then a",
                "test recursed then b",
                "test recursed then c"
            ]
        })

    Test("let incorrect identifier type", {
        Type: "LetIncorrectIdentifierType",
        StartIndex: 24,
        EndIndex: 32,
        ActualType: "test actual type",
        Value: "test value",
        Then: "test then"
    }, [{
        Type: "LetIncorrectIdentifierType",
        StartIndex: 24,
        EndIndex: 32
    },
            "test recursed value a",
            "test recursed value b",
            "test recursed value c",
            "test recursed then a",
            "test recursed then b",
            "test recursed then c",
            "test recursed then d"
        ], expression => {
            expect(["test value", "test then"]).toContain(expression)
            if (expression == "test value") return [
                "test recursed value a",
                "test recursed value b",
                "test recursed value c"
            ]

            if (expression == "test then") return [
                "test recursed then a",
                "test recursed then b",
                "test recursed then c",
                "test recursed then d"
            ]
        })

    Test("let", {
        Type: "Let",
        StartIndex: 24,
        EndIndex: 32,
        Name: "test name",
        NameStartIndex: 72,
        NameEndIndex: 85,
        Value: "test value",
        Then: "test then"
    }, [
            "test recursed value a",
            "test recursed value b",
            "test recursed value c",
            "test recursed then a",
            "test recursed then b",
            "test recursed then c",
            "test recursed then d"
        ], expression => {
            expect(["test value", "test then"]).toContain(expression)
            if (expression == "test value") return [
                "test recursed value a",
                "test recursed value b",
                "test recursed value c"
            ]

            if (expression == "test then") return [
                "test recursed then a",
                "test recursed then b",
                "test recursed then c",
                "test recursed then d"
            ]
        })

    Test("return", {
        Type: "Return",
        StartIndex: 24,
        EndIndex: 32,
        Value: "test value"
    }, [
            "test recursed value a",
            "test recursed value b",
            "test recursed value c"
        ], expression => {
            expect(expression).toEqual("test value")
            return [
                "test recursed value a",
                "test recursed value b",
                "test recursed value c"
            ]
        })

    Test("lambda", {
        Type: "Lambda",
        StartIndex: 24,
        EndIndex: 32,
        Name: "test name",
        NameStartIndex: 12,
        NameEndIndex: 15,
        Body: "test body"
    }, [
            "test recursed body a",
            "test recursed body b",
            "test recursed body c"
        ], expression => {
            expect(expression).toEqual("test body")
            return [
                "test recursed body a",
                "test recursed body b",
                "test recursed body c"
            ]
        })

    Test("lambda without identifier", {
        Type: "LambdaWithoutIdentifier",
        StartIndex: 24,
        EndIndex: 32,
        Body: "test body"
    }, [{
        Type: "LambdaWithoutIdentifier",
        StartIndex: 24,
        EndIndex: 32
    },
            "test recursed body a",
            "test recursed body b",
            "test recursed body c"
        ], expression => {
            expect(expression).toEqual("test body")
            return [
                "test recursed body a",
                "test recursed body b",
                "test recursed body c"
            ]
        })

    Test("lambda incorrect identifier type", {
        Type: "LambdaIncorrectIdentifierType",
        StartIndex: 24,
        EndIndex: 32,
        ActualType: "test actual type",
        NameStartIndex: 12,
        NameEndIndex: 15,
        Body: "test body"
    }, [{
        Type: "LambdaIncorrectIdentifierType",
        StartIndex: 12,
        EndIndex: 32
    },
            "test recursed body a",
            "test recursed body b",
            "test recursed body c"
        ], expression => {
            expect(expression).toEqual("test body")
            return [
                "test recursed body a",
                "test recursed body b",
                "test recursed body c"
            ]
        })

    Test("reference", {
        Type: "Reference",
        StartIndex: 24,
        EndIndex: 32,
        Name: "test name"
    }, [])

    Test("get item", {
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 32,
        Item: 4,
        Of: "test of"
    }, [
            "test recursed of a",
            "test recursed of b",
            "test recursed of c"
        ], expression => {
            expect(expression).toEqual("test of")
            return [
                "test recursed of a",
                "test recursed of b",
                "test recursed of c"
            ]
        })
})