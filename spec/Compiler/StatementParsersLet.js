describe("StatementParsers let", () => {
    const Namespace = require("rewire")("../../index.js")
    const StatementParsers = Namespace.__get__("StatementParsers")

    function Test(description, foundStatement, output, parseExpression) {
        it(description, () => {
            Namespace.__set__("FindNextStatement", tokens => {
                expect(tokens).toEqual("Test Tokens")
                return foundStatement
            })
            Namespace.__set__("ParseExpression", parseExpression || fail)

            expect(StatementParsers.let("Test Tokens")).toEqual(output)
        })
    }

    Test("no next statement", {
        Type: "NextStatementNotFound",
        Tokens: "Test Tokens"
    }, {
            Type: "NextStatementNotFound",
            Tokens: "Test Tokens"
        })

    Test("no tokens", {
        Type: "NextStatement",
        StartIndex: 36,
        EndIndex: 41,
        StatementTokens: [],
        NextStatement: "Test Next Statement",
    }, {
            Type: "LetWithoutIdentifier",
            StartIndex: 36,
            EndIndex: 41,
            Then: "Test Next Statement"
        })

    Test("one token which is not an identifier", {
        Type: "NextStatement",
        StartIndex: 36,
        EndIndex: 41,
        StatementTokens: [{
            Type: "Misc A",
            StartIndex: 65,
            EndIndex: 78,
            Value: "Value A"
        }],
        NextStatement: "Test Next Statement",
    }, {
            Type: "LetIncorrectIdentifierType",
            StartIndex: 65,
            EndIndex: 78,
            ActualType: "Misc A",
            Value: "Test Parsed Expression",
            Then: "Test Next Statement"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([])
            expect(startIndex).toEqual(36)
            expect(endIndex).toEqual(78)
            return "Test Parsed Expression"
        })

    Test("one token which is an identifier", {
        Type: "NextStatement",
        StartIndex: 36,
        EndIndex: 41,
        StatementTokens: [{
            Type: "Identifier",
            StartIndex: 65,
            EndIndex: 78,
            Value: "Value A"
        }],
        NextStatement: "Test Next Statement",
    }, {
            Type: "Let",
            StartIndex: 36,
            EndIndex: 41,
            Name: "Value A",
            NameStartIndex: 65,
            NameEndIndex: 78,
            Value: "Test Parsed Expression",
            Then: "Test Next Statement"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([])
            expect(startIndex).toEqual(36)
            expect(endIndex).toEqual(78)
            return "Test Parsed Expression"
        })

    Test("one token which is an identifier followed by multiple tokens", {
        Type: "NextStatement",
        StartIndex: 36,
        EndIndex: 41,
        StatementTokens: [{
            Type: "Identifier",
            StartIndex: 65,
            EndIndex: 78,
            Value: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 101,
            EndIndex: 130,
            Value: "Value B"
        }, {
            Type: "Identifier",
            StartIndex: 145,
            EndIndex: 160,
            Value: "Value C"
        }, {
            Type: "Misc D",
            StartIndex: 170,
            EndIndex: 180,
            Value: "Value D"
        }],
        NextStatement: "Test Next Statement",
    }, {
            Type: "Let",
            StartIndex: 36,
            EndIndex: 41,
            Name: "Value A",
            NameStartIndex: 65,
            NameEndIndex: 78,
            Value: "Test Parsed Expression",
            Then: "Test Next Statement"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([{
                Type: "Misc B",
                StartIndex: 101,
                EndIndex: 130,
                Value: "Value B"
            }, {
                Type: "Identifier",
                StartIndex: 145,
                EndIndex: 160,
                Value: "Value C"
            }, {
                Type: "Misc D",
                StartIndex: 170,
                EndIndex: 180,
                Value: "Value D"
            }])
            expect(startIndex).toEqual(36)
            expect(endIndex).toEqual(78)
            return "Test Parsed Expression"
        })

    Test("one token which is not an identifier followed by multiple tokens", {
        Type: "NextStatement",
        StartIndex: 36,
        EndIndex: 41,
        StatementTokens: [{
            Type: "Misc A",
            StartIndex: 65,
            EndIndex: 78,
            Value: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 101,
            EndIndex: 130,
            Value: "Value B"
        }, {
            Type: "Identifier",
            StartIndex: 145,
            EndIndex: 160,
            Value: "Value C"
        }, {
            Type: "Misc D",
            StartIndex: 170,
            EndIndex: 180,
            Value: "Value D"
        }],
        NextStatement: "Test Next Statement",
    }, {
            Type: "LetIncorrectIdentifierType",
            StartIndex: 65,
            EndIndex: 78,
            ActualType: "Misc A",
            Value: "Test Parsed Expression",
            Then: "Test Next Statement"
        }, (tokens, startIndex, endIndex) => {
            expect(tokens).toEqual([{
                Type: "Misc B",
                StartIndex: 101,
                EndIndex: 130,
                Value: "Value B"
            }, {
                Type: "Identifier",
                StartIndex: 145,
                EndIndex: 160,
                Value: "Value C"
            }, {
                Type: "Misc D",
                StartIndex: 170,
                EndIndex: 180,
                Value: "Value D"
            }])
            expect(startIndex).toEqual(36)
            expect(endIndex).toEqual(78)
            return "Test Parsed Expression"
        })
})