describe("Symbols", () => {
    const Symbols = require("rewire")("../dist/index.js").__get__("Symbols")

    function Maps(symbol, to) {
        it("maps \"" + symbol + "\" to \"" + to + "\"", function () {
            expect(Symbols[symbol]).toEqual(to)
        })
    }

    Maps("(", "OpeningParenthesis")
    Maps(")", "ClosingParenthesis")
})