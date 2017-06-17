describe("FindErrorsInInlinedExpression", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const FindErrorsInInlinedExpression = Namespace.__get__("FindErrorsInInlinedExpression")

    function Test(description, input, output, findErrorsInInlinedExpression, findErrorsInRawExpression) {
        describe(description, () => {
            beforeEach(() => Namespace.__set__("FindErrorsInInlinedExpression", findErrorsInInlinedExpression || fail))
            beforeEach(() => Namespace.__set__("FindErrorsInRawExpression", findErrorsInRawExpression || fail))
            it("returns the expected output", () => expect(FindErrorsInInlinedExpression(input)).toEqual(output))
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

    Test("unknown", {
        Type: "Unknown",
        StartIndex: 24,
        EndIndex: 32,
        Tokens: "test tokens"
    }, [{
        Type: "Unknown",
        StartIndex: 24,
        EndIndex: 32
    }])

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

    Test("let name not unique", {
        Type: "LetNameNotUnique",
        StartIndex: 24,
        EndIndex: 32,
        Name: "test name",
        NameStartIndex: 8,
        NameEndIndex: 15,
        Value: "test value",
        Then: "test then"
    }, [{
        Type: "IdentifierNotUnique",
        StartIndex: 8,
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
        ], undefined, expression => {
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

    Test("lambda name not unique", {
        Type: "LambdaNameNotUnique",
        StartIndex: 24,
        EndIndex: 32,
        Name: "test name",
        NameStartIndex: 12,
        NameEndIndex: 15,
        Body: "test body",
        Scope: "test scope"
    }, [{
        Type: "IdentifierNotUnique",
        StartIndex: 12,
        EndIndex: 32
    },
            "test recursed body a",
            "test recursed body b",
            "test recursed body c"
        ], undefined, expression => {
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
        Name: "test name",
        Value: "test value"
    }, [])

    Test("undefined reference", {
        Type: "ReferenceUndefined",
        StartIndex: 24,
        EndIndex: 32,
        Name: "test name"
    }, [{
        Type: "ReferenceUndefined",
        StartIndex: 24,
        EndIndex: 32
    }])

    Test("call", {
        Type: "Call",
        Lambda: "test lambda",
        Argument: "test argument",
        Result: "test result",
        StartIndex: 24,
        EndIndex: 32
    }, [
            "test recursed lambda a",
            "test recursed lambda b",
            "test recursed argument a",
            "test recursed argument b",
            "test recursed argument c",
            "test recursed argument d",
            "test recursed result a",
            "test recursed result b",
            "test recursed result c"
        ], expression => {
            expect(["test argument", "test result"]).toContain(expression)
            if (expression == "test argument") return [
                "test recursed argument a",
                "test recursed argument b",
                "test recursed argument c",
                "test recursed argument d"
            ]
            if (expression == "test result") return [
                "test recursed result a",
                "test recursed result b",
                "test recursed result c"
            ]
        }, expression => {
            expect(expression).toEqual("test lambda")
            return [
                "test recursed lambda a",
                "test recursed lambda b"
            ]
        })

    Test("call lambda expected", {
        Type: "CallLambdaExpected",
        Value: "test value",
        StartIndex: 24,
        EndIndex: 32
    }, [
            "test recursed value a",
            "test recursed value b",
            "test recursed value c",
            {
                Type: "LambdaExpected",
                StartIndex: 24,
                EndIndex: 32
            }], expression => {
                expect(expression).toEqual("test value")
                return [
                    "test recursed value a",
                    "test recursed value b",
                    "test recursed value c"
                ]
            })

    Test("get item", {
        Type: "GetItem",
        Item: "test item",
        Of: "test of",
        StartIndex: 24,
        EndIndex: 32
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

    Test("parameter", {
        Type: "Parameter",
        Name: "test name",
        Primitive: "test primitive",
        Plurality: "test plurality",
        StartIndex: 24,
        EndIndex: 32
    }, [])
})