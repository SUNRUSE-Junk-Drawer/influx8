describe("SymbolAndKeywordOperatorMappings", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const UntypedUnarySymbols = Namespace.__get__("UntypedUnarySymbols")
    const UntypedUnaryKeywords = Namespace.__get__("UntypedUnaryKeywords")
    const UntypedUnaryKeywordsAndSymbols = Namespace.__get__("UntypedUnaryKeywordsAndSymbols")
    const UntypedBinarySymbols = Namespace.__get__("UntypedBinarySymbols")
    const UntypedBinaryKeywords = Namespace.__get__("UntypedBinaryKeywords")
    const UntypedBinaryKeywordsAndSymbols = Namespace.__get__("UntypedBinaryKeywordsAndSymbols")

    function Maps(source, collection, token, to) {
        it("maps \"" + token + "\" to \"" + to + "\"", () => {
            expect(source[token]).toEqual(to)
        })
        it("includes \"" + token + "\"", () => {
            expect(collection[token]).toEqual(to)
        })
    }

    Maps(UntypedUnarySymbols, UntypedUnaryKeywordsAndSymbols, "-", "Negate")
    Maps(UntypedUnarySymbols, UntypedUnaryKeywordsAndSymbols, "!", "Not")

    Maps(UntypedUnaryKeywords, UntypedUnaryKeywordsAndSymbols, "not", "Not")

    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "+", "Add")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "-", "Subtract")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "*", "Multiply")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "/", "Divide")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "&", "And")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "&&", "And")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "|", "Or")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "||", "Or")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "=", "Equal")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "==", "Equal")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "===", "Equal")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "!=", "NotEqual")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "!==", "NotEqual")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "<>", "NotEqual")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "<", "LessThan")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, "<=", "LessThanOrEqualTo")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, ">", "GreaterThan")
    Maps(UntypedBinarySymbols, UntypedBinaryKeywordsAndSymbols, ">=", "GreaterThanOrEqualTo")

    Maps(UntypedBinaryKeywords, UntypedBinaryKeywordsAndSymbols, "and", "And")
    Maps(UntypedBinaryKeywords, UntypedBinaryKeywordsAndSymbols, "or", "Or")
    Maps(UntypedBinaryKeywords, UntypedBinaryKeywordsAndSymbols, "is", "Equal")
    Maps(UntypedBinaryKeywords, UntypedBinaryKeywordsAndSymbols, "equals", "Equal")
    Maps(UntypedBinaryKeywords, UntypedBinaryKeywordsAndSymbols, "isnt", "NotEqual")
})