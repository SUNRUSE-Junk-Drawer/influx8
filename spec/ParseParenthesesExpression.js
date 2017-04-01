describe("ParseParenthesesExpression", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const ParseParenthesesExpression = Namespace.__get__("ParseParenthesesExpression")

    Namespace.__set__("TryParseExpression", (tokens) => {
        expect(tokens).toEqual("Test Child Tokens")
        return "Test Parsed Child Expression"
    })

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseParenthesesExpression(input)).toEqual(output)
        })
    }

    Test("nothing", [], undefined)

    Test("one non-parentheses", [{
        Type: "Misc A",
        StartIndex: 253
    }], undefined)

    Test("multiple non-parentheses", [{
        Type: "Misc A",
        StartIndex: 253
    }, {
        Type: "Misc B",
        StartIndex: 342
    }], undefined)

    Test("one parentheses", [{
        Type: "Parentheses",
        StartIndex: 253,
        Contents: "Test Child Tokens"
    }], "Test Parsed Child Expression")

    Test("two parentheses", [{
        Type: "Parentheses",
        StartIndex: 253,
        Contents: "Test Child Tokens A"
    }, {
        Type: "Parentheses",
        StartIndex: 342,
        Contents: "Test Child Tokens B"
    }], undefined)

    Test("one parentheses, one non-parentheses", [{
        Type: "Parentheses",
        StartIndex: 253,
        Contents: "Test Child Tokens"
    }, {
        Type: "Misc B",
        StartIndex: 342
    }], undefined)

    Test("one non-parentheses, one parentheses", [{
        Type: "Misc A",
        StartIndex: 253
    }, {
        Type: "Parentheses",
        StartIndex: 342,
        Contents: "Test Child Token"
    }], undefined)
})