describe("ParseStatementExpression", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const ParseStatementExpression = Namespace.__get__("ParseStatementExpression")

    function Test(description, input, output, statementParser) {
        it(description, () => {
            Namespace.__set__("StatementParsers", {
                "Valid Statement": statementParser || fail,
                "Another Statement": fail
            })

            expect(ParseStatementExpression(input)).toEqual(output)
        })
    }

    Test("nothing", [], undefined)

    Test("one statement keyword", [{
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }], "Test Result", (tokens) => {
        expect(tokens).toEqual([{
            Type: "Statement",
            StartIndex: 253,
            EndIndex: 284,
            Symbol: "Valid Statement"
        }])
        return "Test Result"
    })

    Test("one non-statement", [{
        Type: "Misc",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }], undefined)

    Test("one non-statement, then one statement keyword", [{
        Type: "Misc",
        StartIndex: 100,
        EndIndex: 123,
        Symbol: "Valid Statement"
    }, {
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }], undefined)

    Test("multiple non-statements, then one statement keyword", [{
        Type: "Misc Type A",
        StartIndex: 100,
        EndIndex: 123,
        Symbol: "Misc Symbol A"
    }, {
        Type: "Misc Type B",
        StartIndex: 163,
        EndIndex: 184,
        Symbol: "Misc Symbol B"
    }, {
        Type: "Misc Type C",
        StartIndex: 193,
        EndIndex: 204,
        Symbol: "Misc Symbol C"
    }, {
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }], undefined)

    Test("one statement keyword, then one non-statement", [{
        Type: "Statement",
        StartIndex: 100,
        EndIndex: 123,
        Symbol: "Valid Statement"
    }, {
        Type: "Misc",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }], "Test Result", (tokens) => {
        expect(tokens).toEqual([{
            Type: "Statement",
            StartIndex: 100,
            EndIndex: 123,
            Symbol: "Valid Statement"
        }, {
            Type: "Misc",
            StartIndex: 253,
            EndIndex: 284,
            Symbol: "Valid Statement"
        }])
        return "Test Result"
    })

    Test("one statement keyword, then multiple non-statements", [{
        Type: "Statement",
        StartIndex: 100,
        EndIndex: 123,
        Symbol: "Valid Statement"
    }, {
        Type: "Misc Type A",
        StartIndex: 200,
        EndIndex: 223,
        Symbol: "Misc Symbol A"
    }, {
        Type: "Misc Type B",
        StartIndex: 263,
        EndIndex: 284,
        Symbol: "Misc Symbol B"
    }, {
        Type: "Misc Type C",
        StartIndex: 293,
        EndIndex: 304,
        Symbol: "Misc Symbol C"
    }], "Test Result", (tokens) => {
        expect(tokens).toEqual([{
            Type: "Statement",
            StartIndex: 100,
            EndIndex: 123,
            Symbol: "Valid Statement"
        }, {
            Type: "Misc Type A",
            StartIndex: 200,
            EndIndex: 223,
            Symbol: "Misc Symbol A"
        }, {
            Type: "Misc Type B",
            StartIndex: 263,
            EndIndex: 284,
            Symbol: "Misc Symbol B"
        }, {
            Type: "Misc Type C",
            StartIndex: 293,
            EndIndex: 304,
            Symbol: "Misc Symbol C"
        }])
        return "Test Result"
    })

    Test("one statement keyword, then multiple non-statements and the same statement keyword", [{
        Type: "Statement",
        StartIndex: 100,
        EndIndex: 123,
        Symbol: "Valid Statement"
    }, {
        Type: "Misc Type A",
        StartIndex: 200,
        EndIndex: 223,
        Symbol: "Misc Symbol A"
    }, {
        Type: "Statement",
        StartIndex: 263,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }, {
        Type: "Misc Type C",
        StartIndex: 293,
        EndIndex: 304,
        Symbol: "Misc Symbol C"
    }], "Test Result", (tokens) => {
        expect(tokens).toEqual([{
            Type: "Statement",
            StartIndex: 100,
            EndIndex: 123,
            Symbol: "Valid Statement"
        }, {
            Type: "Misc Type A",
            StartIndex: 200,
            EndIndex: 223,
            Symbol: "Misc Symbol A"
        }, {
            Type: "Statement",
            StartIndex: 263,
            EndIndex: 284,
            Symbol: "Valid Statement"
        }, {
            Type: "Misc Type C",
            StartIndex: 293,
            EndIndex: 304,
            Symbol: "Misc Symbol C"
        }])
        return "Test Result"
    })

    Test("one statement keyword, then multiple non-statements and another statement keyword", [{
        Type: "Statement",
        StartIndex: 100,
        EndIndex: 123,
        Symbol: "Valid Statement"
    }, {
        Type: "Misc Type A",
        StartIndex: 200,
        EndIndex: 223,
        Symbol: "Misc Symbol A"
    }, {
        Type: "Statement",
        StartIndex: 263,
        EndIndex: 284,
        Symbol: "Another Statement"
    }, {
        Type: "Misc Type C",
        StartIndex: 293,
        EndIndex: 304,
        Symbol: "Misc Symbol C"
    }], "Test Result", (tokens) => {
        expect(tokens).toEqual([{
            Type: "Statement",
            StartIndex: 100,
            EndIndex: 123,
            Symbol: "Valid Statement"
        }, {
            Type: "Misc Type A",
            StartIndex: 200,
            EndIndex: 223,
            Symbol: "Misc Symbol A"
        }, {
            Type: "Statement",
            StartIndex: 263,
            EndIndex: 284,
            Symbol: "Another Statement"
        }, {
            Type: "Misc Type C",
            StartIndex: 293,
            EndIndex: 304,
            Symbol: "Misc Symbol C"
        }])
        return "Test Result"
    })
})