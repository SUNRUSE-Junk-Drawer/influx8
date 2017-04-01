describe("SymbolAndKeywordOperatorMappings", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const UntypedUnarySymbols = Namespace.__get__("UntypedUnarySymbols")
    const UntypedUnaryKeywords = Namespace.__get__("UntypedUnaryKeywords")
    const UntypedBinarySymbols = Namespace.__get__("UntypedBinarySymbols")
    const UntypedBinaryKeywords = Namespace.__get__("UntypedBinaryKeywords")

    function Maps(source, token, to) {
        it("maps \"" + token + "\" to \"" + to + "\"", () => {
            expect(source[to].indexOf(token)).not.toEqual(-1)
        })
    }

    Maps(UntypedUnarySymbols, "-", "Negate")
    Maps(UntypedUnarySymbols, "!", "Not")

    Maps(UntypedUnaryKeywords, "not", "Not")

    Maps(UntypedBinarySymbols, "+", "Add")
    Maps(UntypedBinarySymbols, "-", "Subtract")
    Maps(UntypedBinarySymbols, "*", "Multiply")
    Maps(UntypedBinarySymbols, "/", "Divide")
    Maps(UntypedBinarySymbols, "&", "And")
    Maps(UntypedBinarySymbols, "&&", "And")
    Maps(UntypedBinarySymbols, "|", "Or")
    Maps(UntypedBinarySymbols, "||", "Or")
    Maps(UntypedBinarySymbols, "=", "Equal")
    Maps(UntypedBinarySymbols, "==", "Equal")
    Maps(UntypedBinarySymbols, "===", "Equal")
    Maps(UntypedBinarySymbols, "!=", "NotEqual")
    Maps(UntypedBinarySymbols, "!==", "NotEqual")
    Maps(UntypedBinarySymbols, "<>", "NotEqual")
    Maps(UntypedBinarySymbols, "<", "LessThan")
    Maps(UntypedBinarySymbols, "<=", "LessThanOrEqualTo")
    Maps(UntypedBinarySymbols, ">", "GreaterThan")
    Maps(UntypedBinarySymbols, ">=", "GreaterThanOrEqualTo")

    Maps(UntypedBinaryKeywords, "and", "And")
    Maps(UntypedBinaryKeywords, "or", "Or")
    Maps(UntypedBinaryKeywords, "is", "Equal")
    Maps(UntypedBinaryKeywords, "equals", "Equal")
    Maps(UntypedBinaryKeywords, "isnt", "NotEqual")
})