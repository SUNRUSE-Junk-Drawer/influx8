describe("Symbols", () => {
    const Symbols = require("rewire")("../dist/index.js").__get__("Symbols")

    function Maps(symbol, to) {
        it("maps \"" + symbol + "\" to \"" + to + "\"", function () {
            expect(Symbols[symbol]).toEqual(to)
        })
    }

    function DoesNotMap(symbol) {
        it("does not map \"" + symbol + "\"", function () {
            expect(Symbols[symbol]).toBeUndefined()
        })
    }

    Maps("(", "OpeningParenthesis")
    Maps(")", "ClosingParenthesis")
    Maps("-", "Operator")
    Maps("+", "Operator")
    Maps("!", "Operator")
    Maps(":", "Lambda")
    Maps("::", "GetItem")
    DoesNotMap("and")
    DoesNotMap("not")
    DoesNotMap("let", "Statement")
    DoesNotMap("return", "Statement")
})