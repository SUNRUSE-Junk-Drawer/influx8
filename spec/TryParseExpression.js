describe("TryParseExpression", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const TryParseExpression = Namespace.__get__("TryParseExpression")

    Namespace.__set__("ParseConstantExpression", (tokens) => {
        switch (tokens) {
            case "Matches Constant": return "Matched Constant"
        }
    })

    Namespace.__set__("ParseOperatorExpression", (tokens) => {
        switch (tokens) {
            case "Matches Operator": return "Matched Operator"
        }
    })

    Namespace.__set__("ParseParenthesesExpression", (tokens) => {
        switch (tokens) {
            case "Matches Parentheses": return "Matched Parentheses"
        }
    })

    function Test(description, input, output) {
        it(description, () => {
            expect(TryParseExpression(input)).toEqual(output)
        })
    }

    Test("no match", "Matches Nothing", undefined)
    Test("constant", "Matches Constant", "Matched Constant")
    Test("operator", "Matches Operator", "Matched Operator")
    Test("parentheses", "Matches Parentheses", "Matched Parentheses")
})