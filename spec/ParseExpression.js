describe("ParseExpression", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const ParseExpression = Namespace.__get__("ParseExpression")

    Namespace.__set__("ParseConstantExpression", (tokens) => {
        switch (tokens) {
            case "Matches Constant": return "Matched Constant"
        }
    })

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseExpression(input)).toEqual(output)
        })
    }

    Test("no match", "Matches Nothing", undefined)
    Test("constant", "Matches Constant", "Matched Constant")
})