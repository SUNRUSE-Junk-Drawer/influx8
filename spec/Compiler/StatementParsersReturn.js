describe("StatementParsers return", () => {
    const Namespace = require("rewire")("../../index.js")
    const StatementParsers = Namespace.__get__("StatementParsers")

    Namespace.__set__("ParseExpression", (tokens, startIndex, endIndex) => {
        expect(tokens).toEqual(["Test Token A", "Test Token B", "Test Token C"])
        expect(startIndex).toEqual(36)
        expect(endIndex).toEqual(41)
        return "Test Parsed Expression"
    })

    it("successful", () => expect(StatementParsers.return([{
        StartIndex: 36,
        EndIndex: 41
    }, "Test Token A", "Test Token B", "Test Token C"])).toEqual({
        Type: "Return",
        StartIndex: 36,
        EndIndex: 41,
        Value: "Test Parsed Expression"
    }))
})