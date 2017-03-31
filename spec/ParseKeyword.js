describe("ParseKeyword", function () {
    const ParseKeyword = require("rewire")("../dist/index.js").__get__("ParseKeyword")

    function AcceptsOperator(input) {
        it("accepts operator \"" + input + "\"", function () {
            expect(ParseKeyword({
                StartIndex: 32,
                Text: input
            })).toEqual({
                Type: "Operator",
                StartIndex: 32,
                Symbol: input
            })
        })
    }

    function Rejects(input) {
        it("rejects \"" + input + "\"", function () {
            expect(ParseKeyword({
                StartIndex: 32,
                Text: input
            })).toBeUndefined()
        })
    }

    Rejects("abc")
    Rejects("+")
    Rejects("!")
    Rejects("-")
    AcceptsOperator("and")
    AcceptsOperator("not")
})