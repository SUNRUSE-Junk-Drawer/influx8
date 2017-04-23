describe("ParseLambdaExpression", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const ParseLambdaExpression = Namespace.__get__("ParseLambdaExpression")

    function Test(description, input, output, parseExpression) {
        it(description, () => {
            Namespace.__set__("ParseExpression", parseExpression || fail)
            expect(ParseLambdaExpression(input)).toEqual(output)
        })
    }

    Test("nothing", [], undefined)

    Test("one token which is neither an identifier nor lambda", [{
        Type: "Misc A",
        StartIndex: 32,
        EndIndex: 47
    }], undefined)

    Test("one token which is a lambda", [{
        Type: "Lambda",
        StartIndex: 32,
        EndIndex: 47
    }], {
            Type: "LambdaWithoutIdentifier",
            StartIndex: 32,
            EndIndex: 47,
            Body: "Test Parsed Tokens"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([])
            expect(startIndex).toEqual(32)
            expect(endIndex).toEqual(47)
            return "Test Parsed Tokens"
        })

    Test("one token which is an identifier", [{
        Type: "Identifier",
        StartIndex: 32,
        EndIndex: 47,
        Value: "Test Identifier"
    }], undefined)

    Test("one token which is neither an identifier nor lambda, then a lambda", [{
        Type: "Misc A",
        StartIndex: 32,
        EndIndex: 47
    }, {
        Type: "Lambda",
        StartIndex: 65,
        EndIndex: 87
    }], {
            Type: "LambdaIncorrectIdentifierType",
            StartIndex: 65,
            EndIndex: 87,
            ActualType: "Misc A",
            NameStartIndex: 32,
            NameEndIndex: 47,
            Body: "Test Parsed Tokens"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([])
            expect(startIndex).toEqual(32)
            expect(endIndex).toEqual(87)
            return "Test Parsed Tokens"
        })

    Test("one token which is an identifier, then a lambda", [{
        Type: "Identifier",
        StartIndex: 32,
        EndIndex: 47,
        Value: "Test Identifier"
    }, {
        Type: "Lambda",
        StartIndex: 65,
        EndIndex: 87
    }], {
            Type: "Lambda",
            StartIndex: 65,
            EndIndex: 87,
            Name: "Test Identifier",
            NameStartIndex: 32,
            NameEndIndex: 47,
            Body: "Test Parsed Tokens"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([])
            expect(startIndex).toEqual(32)
            expect(endIndex).toEqual(87)
            return "Test Parsed Tokens"
        })

    Test("one token which is a lambda, then a lambda", [{
        Type: "Lambda",
        StartIndex: 32,
        EndIndex: 47
    }, {
        Type: "Lambda",
        StartIndex: 65,
        EndIndex: 87
    }], {
            Type: "LambdaWithoutIdentifier",
            StartIndex: 32,
            EndIndex: 47,
            Body: "Test Parsed Tokens"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([{
                Type: "Lambda",
                StartIndex: 65,
                EndIndex: 87
            }])
            expect(startIndex).toEqual(32)
            expect(endIndex).toEqual(47)
            return "Test Parsed Tokens"
        })

    Test("one token which is neither an identifier nor lambda, then miscellaneous tokens", [{
        Type: "Misc A",
        StartIndex: 32,
        EndIndex: 47
    }, {
        Type: "Misc B",
        StartIndex: 101,
        EndIndex: 124
    }, {
        Type: "Identifier",
        StartIndex: 137,
        EndIndex: 157,
        Text: "Irrelevant"
    }, {
        Type: "Misc C",
        StartIndex: 165,
        EndIndex: 178
    }, {
        Type: "Lambda",
        StartIndex: 184,
        EndIndex: 194
    }, {
        Type: "Misc D",
        StartIndex: 212,
        EndIndex: 225
    }], undefined)

    Test("one token which is a lambda, then miscellaneous tokens", [{
        Type: "Lambda",
        StartIndex: 32,
        EndIndex: 47
    }, {
        Type: "Misc B",
        StartIndex: 101,
        EndIndex: 124
    }, {
        Type: "Identifier",
        StartIndex: 137,
        EndIndex: 157,
        Text: "Irrelevant"
    }, {
        Type: "Misc C",
        StartIndex: 165,
        EndIndex: 178
    }, {
        Type: "Lambda",
        StartIndex: 184,
        EndIndex: 194
    }, {
        Type: "Misc D",
        StartIndex: 212,
        EndIndex: 225
    }], {
            Type: "LambdaWithoutIdentifier",
            StartIndex: 32,
            EndIndex: 47,
            Body: "Test Parsed Tokens"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([{
                Type: "Misc B",
                StartIndex: 101,
                EndIndex: 124
            }, {
                Type: "Identifier",
                StartIndex: 137,
                EndIndex: 157,
                Text: "Irrelevant"
            }, {
                Type: "Misc C",
                StartIndex: 165,
                EndIndex: 178
            }, {
                Type: "Lambda",
                StartIndex: 184,
                EndIndex: 194
            }, {
                Type: "Misc D",
                StartIndex: 212,
                EndIndex: 225
            }])
            expect(startIndex).toEqual(32)
            expect(endIndex).toEqual(47)
            return "Test Parsed Tokens"
        })

    Test("one token which is an identifier, then miscellaneous tokens", [{
        Type: "Identifier",
        StartIndex: 32,
        EndIndex: 47,
        Value: "Test Identifier"
    }, {
        Type: "Misc B",
        StartIndex: 101,
        EndIndex: 124
    }, {
        Type: "Identifier",
        StartIndex: 137,
        EndIndex: 157,
        Text: "Irrelevant"
    }, {
        Type: "Misc C",
        StartIndex: 165,
        EndIndex: 178
    }, {
        Type: "Lambda",
        StartIndex: 184,
        EndIndex: 194
    }, {
        Type: "Misc D",
        StartIndex: 212,
        EndIndex: 225
    }], undefined)

    Test("one token which is neither an identifier nor lambda, then a lambda, then miscellaneous tokens", [{
        Type: "Misc A",
        StartIndex: 32,
        EndIndex: 47
    }, {
        Type: "Lambda",
        StartIndex: 65,
        EndIndex: 87
    }, {
        Type: "Misc B",
        StartIndex: 101,
        EndIndex: 124
    }, {
        Type: "Identifier",
        StartIndex: 137,
        EndIndex: 157,
        Text: "Irrelevant"
    }, {
        Type: "Misc C",
        StartIndex: 165,
        EndIndex: 178
    }, {
        Type: "Lambda",
        StartIndex: 184,
        EndIndex: 194
    }, {
        Type: "Misc D",
        StartIndex: 212,
        EndIndex: 225
    }], {
            Type: "LambdaIncorrectIdentifierType",
            StartIndex: 65,
            EndIndex: 87,
            ActualType: "Misc A",
            NameStartIndex: 32,
            NameEndIndex: 47,
            Body: "Test Parsed Tokens"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([{
                Type: "Misc B",
                StartIndex: 101,
                EndIndex: 124
            }, {
                Type: "Identifier",
                StartIndex: 137,
                EndIndex: 157,
                Text: "Irrelevant"
            }, {
                Type: "Misc C",
                StartIndex: 165,
                EndIndex: 178
            }, {
                Type: "Lambda",
                StartIndex: 184,
                EndIndex: 194
            }, {
                Type: "Misc D",
                StartIndex: 212,
                EndIndex: 225
            }])
            expect(startIndex).toEqual(32)
            expect(endIndex).toEqual(87)
            return "Test Parsed Tokens"
        })

    Test("one token which is an identifier, then a lambda, then miscellaneous tokens", [{
        Type: "Identifier",
        StartIndex: 32,
        EndIndex: 47,
        Value: "Test Identifier"
    }, {
        Type: "Lambda",
        StartIndex: 65,
        EndIndex: 87
    }, {
        Type: "Misc B",
        StartIndex: 101,
        EndIndex: 124
    }, {
        Type: "Identifier",
        StartIndex: 137,
        EndIndex: 157,
        Text: "Irrelevant"
    }, {
        Type: "Misc C",
        StartIndex: 165,
        EndIndex: 178
    }, {
        Type: "Lambda",
        StartIndex: 184,
        EndIndex: 194
    }, {
        Type: "Misc D",
        StartIndex: 212,
        EndIndex: 225
    }], {
            Type: "Lambda",
            StartIndex: 65,
            EndIndex: 87,
            Name: "Test Identifier",
            NameStartIndex: 32,
            NameEndIndex: 47,
            Body: "Test Parsed Tokens"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([{
                Type: "Misc B",
                StartIndex: 101,
                EndIndex: 124
            }, {
                Type: "Identifier",
                StartIndex: 137,
                EndIndex: 157,
                Text: "Irrelevant"
            }, {
                Type: "Misc C",
                StartIndex: 165,
                EndIndex: 178
            }, {
                Type: "Lambda",
                StartIndex: 184,
                EndIndex: 194
            }, {
                Type: "Misc D",
                StartIndex: 212,
                EndIndex: 225
            }])
            expect(startIndex).toEqual(32)
            expect(endIndex).toEqual(87)
            return "Test Parsed Tokens"
        })

    Test("one token which is a lambda, then a lambda, then miscellaneous tokens", [{
        Type: "Lambda",
        StartIndex: 32,
        EndIndex: 47
    }, {
        Type: "Lambda",
        StartIndex: 65,
        EndIndex: 87
    }, {
        Type: "Misc B",
        StartIndex: 101,
        EndIndex: 124
    }, {
        Type: "Identifier",
        StartIndex: 137,
        EndIndex: 157,
        Text: "Irrelevant"
    }, {
        Type: "Misc C",
        StartIndex: 165,
        EndIndex: 178
    }, {
        Type: "Lambda",
        StartIndex: 184,
        EndIndex: 194
    }, {
        Type: "Misc D",
        StartIndex: 212,
        EndIndex: 225
    }], {
            Type: "LambdaWithoutIdentifier",
            StartIndex: 32,
            EndIndex: 47,
            Body: "Test Parsed Tokens"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([{
                Type: "Lambda",
                StartIndex: 65,
                EndIndex: 87
            }, {
                Type: "Misc B",
                StartIndex: 101,
                EndIndex: 124
            }, {
                Type: "Identifier",
                StartIndex: 137,
                EndIndex: 157,
                Text: "Irrelevant"
            }, {
                Type: "Misc C",
                StartIndex: 165,
                EndIndex: 178
            }, {
                Type: "Lambda",
                StartIndex: 184,
                EndIndex: 194
            }, {
                Type: "Misc D",
                StartIndex: 212,
                EndIndex: 225
            }])
            expect(startIndex).toEqual(32)
            expect(endIndex).toEqual(47)
            return "Test Parsed Tokens"
        })
})