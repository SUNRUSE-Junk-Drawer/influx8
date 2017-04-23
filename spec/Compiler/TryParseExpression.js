describe("TryParseExpression", () => {
    const Namespace = require("rewire")("../../Exports.js")
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

    Namespace.__set__("ParseReferenceExpression", (tokens) => {
        switch (tokens) {
            case "Matches Reference": return "Matched Reference"
        }
    })

    Namespace.__set__("ParseGetItemExpression", (tokens) => {
        switch (tokens) {
            case "Matches Get Item": return "Matched Get Item"
        }
    })

    function Test(description, input, output) {
        it(description, () => {
            expect(TryParseExpression(input)).toEqual(output)
        })
    }

    Test("no match", "Matches Nothing", undefined)
    Test("constant", "Matches Constant", "Matched Constant")
    Test("reference", "Matches Reference", "Matched Reference")
    Test("operator", "Matches Operator", "Matched Operator")
    Test("parentheses", "Matches Parentheses", "Matched Parentheses")
    Test("get item", "Matches Get Item", "Matched Get Item")
})