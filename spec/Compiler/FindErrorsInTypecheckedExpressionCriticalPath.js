describe("FindErrorsInTypecheckedExpressionCriticalPath", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const FindErrorsInTypecheckedExpressionCriticalPath = Namespace.__get__("FindErrorsInTypecheckedExpressionCriticalPath")

    function Test(description, input, output, findErrorsInTypecheckedExpressionCriticalPath, findErrorsInTypecheckedExpression, findErrorsInUnrolledExpressionCriticalPath, findErrorsInUnrolledExpression, findErrorsInInlinedExpression, findErrorsInRawExpression) {
        describe(description, () => {
            beforeEach(() => Namespace.__set__("FindErrorsInTypecheckedExpressionCriticalPath", findErrorsInTypecheckedExpressionCriticalPath || fail))
            beforeEach(() => Namespace.__set__("FindErrorsInTypecheckedExpression", findErrorsInTypecheckedExpression || fail))
            beforeEach(() => Namespace.__set__("FindErrorsInUnrolledExpressionCriticalPath", findErrorsInUnrolledExpressionCriticalPath || fail))
            beforeEach(() => Namespace.__set__("FindErrorsInUnrolledExpression", findErrorsInUnrolledExpression || fail))
            beforeEach(() => Namespace.__set__("FindErrorsInInlinedExpression", findErrorsInInlinedExpression || fail))
            beforeEach(() => Namespace.__set__("FindErrorsInRawExpression", findErrorsInRawExpression || fail))
            it("returns the expected output", () => expect(FindErrorsInTypecheckedExpressionCriticalPath(input)).toEqual(output))
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

    Test("binary unmatched", {
        Type: "BinaryUnmatched",
        Operator: "test operator",
        Left: "test left",
        Right: "test right",
        StartIndex: 24,
        EndIndex: 32
    }, [
            "test recursed left a",
            "test recursed left b",
            "test recursed left c",
            "test recursed left d",
            "test recursed right a",
            "test recursed right b",
            "test recursed right c",
            {
                Type: "TypeMismatch",
                StartIndex: 24,
                EndIndex: 32
            }
        ], expression => {
            expect(["test left", "test right"]).toContain(expression)
            switch (expression) {
                case "test left": return [
                    "test recursed left a",
                    "test recursed left b",
                    "test recursed left c",
                    "test recursed left d"
                ]
                case "test right": return [
                    "test recursed right a",
                    "test recursed right b",
                    "test recursed right c"
                ]
            }
        })

    Test("binary inconsistent plurality", {
        Type: "BinaryInconsistentPlurality",
        Operator: "test operator",
        Left: ["test left a", "test left b", "test left c"],
        Right: ["test right a", "test right b"],
        StartIndex: 24,
        EndIndex: 32
    }, [
            "test recursed left a a",
            "test recursed left a b",
            "test recursed left a c",
            "test recursed left b a",
            "test recursed left b b",
            "test recursed left c a",
            "test recursed left c b",
            "test recursed left c c",
            "test recursed right a a",
            "test recursed right a b",
            "test recursed right b a",
            "test recursed right b b",
            "test recursed right b c",
            "test recursed right b d",
            {
                Type: "InconsistentPlurality",
                StartIndex: 24,
                EndIndex: 32
            }
        ], expression => {
            expect(["test left a", "test left b", "test left c", "test right a", "test right b"]).toContain(expression)
            switch (expression) {
                case "test left a": return [
                    "test recursed left a a",
                    "test recursed left a b",
                    "test recursed left a c"
                ]
                case "test left b": return [
                    "test recursed left b a",
                    "test recursed left b b"
                ]
                case "test left c": return [
                    "test recursed left c a",
                    "test recursed left c b",
                    "test recursed left c c"
                ]
                case "test right a": return [
                    "test recursed right a a",
                    "test recursed right a b"
                ]
                case "test right b": return [
                    "test recursed right b a",
                    "test recursed right b b",
                    "test recursed right b c",
                    "test recursed right b d"
                ]
            }
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

    Test("unary unmatched", {
        Type: "UnaryUnmatched",
        Operator: "test operator",
        Operand: "test operand",
        StartIndex: 24,
        EndIndex: 32
    }, [
            "test recursed operand a",
            "test recursed operand b",
            "test recursed operand c",
            {
                Type: "TypeMismatch",
                StartIndex: 24,
                EndIndex: 32
            }
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
        NameStartIndex: 5,
        NameEndIndex: 11,
        Value: ["test value a", "test value b", "test value c"],
        Then: "test then"
    }, [
            "test recursed value a a",
            "test recursed value a b",
            "test recursed value a c",
            "test recursed value b a",
            "test recursed value b b",
            "test recursed value c a",
            "test recursed value c b",
            "test recursed value c c",
            "test recursed then a",
            "test recursed then b",
            "test recursed then c",
            "test recursed then d",
            "test recursed then e"
        ], expression => {
            expect(expression).toEqual("test then")
            return [
                "test recursed then a",
                "test recursed then b",
                "test recursed then c",
                "test recursed then d",
                "test recursed then e"
            ]
        }, expression => {
            expect(["test value a", "test value b", "test value c"]).toContain(expression)
            switch (expression) {
                case "test value a": return [
                    "test recursed value a a",
                    "test recursed value a b",
                    "test recursed value a c"
                ]
                case "test value b": return [
                    "test recursed value b a",
                    "test recursed value b b"
                ]
                case "test value c": return [
                    "test recursed value c a",
                    "test recursed value c b",
                    "test recursed value c c"
                ]
            }
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
        Value: ["test value a", "test value b", "test value c"],
        Then: "test then"
    }, [
            {
                Type: "LetIncorrectIdentifierType",
                StartIndex: 24,
                EndIndex: 32
            },
            "test recursed value a a",
            "test recursed value a b",
            "test recursed value a c",
            "test recursed value b a",
            "test recursed value b b",
            "test recursed value c a",
            "test recursed value c b",
            "test recursed value c c",
            "test recursed then a",
            "test recursed then b",
            "test recursed then c",
            "test recursed then d",
            "test recursed then e"
        ], expression => {
            expect(expression).toEqual("test then")
            return [
                "test recursed then a",
                "test recursed then b",
                "test recursed then c",
                "test recursed then d",
                "test recursed then e"
            ]
        }, expression => {
            expect(["test value a", "test value b", "test value c"]).toContain(expression)
            switch (expression) {
                case "test value a": return [
                    "test recursed value a a",
                    "test recursed value a b",
                    "test recursed value a c"
                ]
                case "test value b": return [
                    "test recursed value b a",
                    "test recursed value b b"
                ]
                case "test value c": return [
                    "test recursed value c a",
                    "test recursed value c b",
                    "test recursed value c c"
                ]
            }
        })

    Test("let name not unique", {
        Type: "LetNameNotUnique",
        StartIndex: 24,
        EndIndex: 32,
        Name: "test name",
        NameStartIndex: 5,
        NameEndIndex: 11,
        Value: ["test value a", "test value b", "test value c"],
        Then: "test then"
    }, [
            {
                Type: "IdentifierNotUnique",
                StartIndex: 5,
                EndIndex: 32
            },
            "test recursed value a a",
            "test recursed value a b",
            "test recursed value a c",
            "test recursed value b a",
            "test recursed value b b",
            "test recursed value c a",
            "test recursed value c b",
            "test recursed value c c",
            "test recursed then a",
            "test recursed then b",
            "test recursed then c",
            "test recursed then d",
            "test recursed then e"
        ], expression => {
            expect(expression).toEqual("test then")
            return [
                "test recursed then a",
                "test recursed then b",
                "test recursed then c",
                "test recursed then d",
                "test recursed then e"
            ]
        }, expression => {
            expect(["test value a", "test value b", "test value c"]).toContain(expression)
            switch (expression) {
                case "test value a": return [
                    "test recursed value a a",
                    "test recursed value a b",
                    "test recursed value a c"
                ]
                case "test value b": return [
                    "test recursed value b a",
                    "test recursed value b b"
                ]
                case "test value c": return [
                    "test recursed value c a",
                    "test recursed value c b",
                    "test recursed value c c"
                ]
            }
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
        NameStartIndex: 5,
        NameEndIndex: 15,
        Body: "test body"
    }, [
            {
                Type: "UncalledLambdaInCriticalPath",
                StartIndex: 5,
                EndIndex: 32
            },
            "test recursed body a",
            "test recursed body b",
            "test recursed body c"
        ], undefined, undefined, undefined, undefined, undefined, expression => {
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
    }, [
            {
                Type: "LambdaWithoutIdentifier",
                StartIndex: 24,
                EndIndex: 32
            },
            "test recursed body a",
            "test recursed body b",
            "test recursed body c"
        ], undefined, undefined, expression => {
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
        NameStartIndex: 5,
        NameEndIndex: 11,
        Body: "test body",
    }, [
            {
                Type: "LambdaIncorrectIdentifierType",
                StartIndex: 24,
                EndIndex: 32
            },
            "test recursed body a",
            "test recursed body b",
            "test recursed body c"
        ], undefined, undefined, expression => {
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
        NameStartIndex: 5,
        NameEndIndex: 11,
        Body: "test body",
        Scope: "test scope"
    }, [
            {
                Type: "IdentifierNotUnique",
                StartIndex: 5,
                EndIndex: 32
            },
            "test recursed body a",
            "test recursed body b",
            "test recursed body c"
        ], undefined, undefined, undefined, undefined, undefined, expression => {
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
        Argument: ["test argument a", "test argument b", "test argument c"],
        Result: "test result",
        StartIndex: 24,
        EndIndex: 32
    }, [
            "test recursed lambda a",
            "test recursed lambda b",
            "test recursed lambda c",
            "test recursed argument a a",
            "test recursed argument a b",
            "test recursed argument a c",
            "test recursed argument b a",
            "test recursed argument b b",
            "test recursed argument c a",
            "test recursed argument c b",
            "test recursed argument c c",
            "test recursed result a",
            "test recursed result b",
            "test recursed result c",
            "test recursed result d",
            "test recursed result e"
        ], expression => {
            expect(["test argument a", "test argument b", "test argument c", "test result"]).toContain(expression)
            switch (expression) {
                case "test argument a": return [
                    "test recursed argument a a",
                    "test recursed argument a b",
                    "test recursed argument a c"
                ]
                case "test argument b": return [
                    "test recursed argument b a",
                    "test recursed argument b b"
                ]
                case "test argument c": return [
                    "test recursed argument c a",
                    "test recursed argument c b",
                    "test recursed argument c c"
                ]
                case "test result": return [
                    "test recursed result a",
                    "test recursed result b",
                    "test recursed result c",
                    "test recursed result d",
                    "test recursed result e"
                ]
            }
        }, undefined, undefined, undefined, undefined, expression => {
            expect(expression).toEqual("test lambda")
            return [
                "test recursed lambda a",
                "test recursed lambda b",
                "test recursed lambda c"
            ]
        })

    Test("call lambda expected", {
        Type: "CallLambdaExpected",
        Value: ["test value a", "test value b", "test value c"],
        StartIndex: 24,
        EndIndex: 32
    }, [
            "test recursed value a a",
            "test recursed value a b",
            "test recursed value a c",
            "test recursed value b a",
            "test recursed value b b",
            "test recursed value c a",
            "test recursed value c b",
            "test recursed value c c",
            {
                Type: "LambdaExpected",
                StartIndex: 24,
                EndIndex: 32
            }
        ], expression => {
            expect(["test value a", "test value b", "test value c"]).toContain(expression)
            switch (expression) {
                case "test value a": return [
                    "test recursed value a a",
                    "test recursed value a b",
                    "test recursed value a c"
                ]
                case "test value b": return [
                    "test recursed value b a",
                    "test recursed value b b"
                ]
                case "test value c": return [
                    "test recursed value c a",
                    "test recursed value c b",
                    "test recursed value c c"
                ]
            }
        })

    Test("concatenate left", {
        Type: "ConcatenateLeft",
        Value: "test value",
        StartIndex: 24,
        EndIndex: 32
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

    Test("concatenate right", {
        Type: "ConcatenateRight",
        Value: "test value",
        StartIndex: 24,
        EndIndex: 32
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

    Test("get item", {
        Type: "GetItem",
        Item: 2,
        Of: ["test of a", "test of b", "test of c", "test of d"],
        Value: "test value",
        StartIndex: 24,
        EndIndex: 32
    }, [
            "test recursed value a",
            "test recursed value b",
            "test recursed value c",
            "test recursed of a a",
            "test recursed of a b",
            "test recursed of a c",
            "test recursed of b a",
            "test recursed of b b",
            "test recursed of d a",
            "test recursed of d b",
            "test recursed of d c",
            "test recursed of d d"
        ], expression => {
            expect(["test of a", "test of b", "test value", "test of d"]).toContain(expression)
            switch (expression) {
                case "test of a": return [
                    "test recursed of a a",
                    "test recursed of a b",
                    "test recursed of a c"
                ]
                case "test of b": return [
                    "test recursed of b a",
                    "test recursed of b b"
                ]
                case "test value": return [
                    "test recursed value a",
                    "test recursed value b",
                    "test recursed value c"
                ]
                case "test of d": return [
                    "test recursed of d a",
                    "test recursed of d b",
                    "test recursed of d c",
                    "test recursed of d d"
                ]
            }
        })

    Test("get item out of range", {
        Type: "GetItemOutOfRange",
        Item: "test item",
        Of: ["test of a", "test of b", "test of c", "test of d"],
        StartIndex: 24,
        EndIndex: 32
    }, [
            "test recursed of a a",
            "test recursed of a b",
            "test recursed of a c",
            "test recursed of b a",
            "test recursed of b b",
            "test recursed of c a",
            "test recursed of c b",
            "test recursed of c c",
            "test recursed of d a",
            "test recursed of d b",
            "test recursed of d c",
            "test recursed of d d",
            {
                Type: "GetItemOutOfRange",
                StartIndex: 24,
                EndIndex: 32
            }
        ], expression => {
            expect(["test of a", "test of b", "test of c", "test of d"]).toContain(expression)
            switch (expression) {
                case "test of a": return [
                    "test recursed of a a",
                    "test recursed of a b",
                    "test recursed of a c"
                ]
                case "test of b": return [
                    "test recursed of b a",
                    "test recursed of b b"
                ]
                case "test of c": return [
                    "test recursed of c a",
                    "test recursed of c b",
                    "test recursed of c c"
                ]
                case "test of d": return [
                    "test recursed of d a",
                    "test recursed of d b",
                    "test recursed of d c",
                    "test recursed of d d"
                ]
            }
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