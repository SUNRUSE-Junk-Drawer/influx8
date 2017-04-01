describe("ParseExpression", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const ParseExpression = Namespace.__get__("ParseExpression")

    function Test(description, parseTo, returns) {
        it(description, () => {
            Namespace.__set__("TryParseExpression", (tokens) => {
                expect(tokens).toEqual("Test Input")
                return parseTo
            })
            expect(ParseExpression("Test Input", 4234, 4992)).toEqual(returns)
        })
    }

    Test("successful", "Test Result", "Test Result")
    Test("unsuccessful", undefined, {
        Type: "Unknown",
        Tokens: "Test Input",
        StartIndex: 4234,
        EndIndex: 4992
    })
})