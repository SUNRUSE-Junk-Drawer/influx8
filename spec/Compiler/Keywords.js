describe("Keywords", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const Keywords = Namespace.__get__("Keywords")
    const StatementParsers = Namespace.__get__("StatementParsers")

    function Maps(keyword, to) {
        it("maps \"" + keyword + "\" to \"" + to + "\"", function () {
            expect(Keywords[keyword]).toEqual(to)
        })
    }

    function DoesNotMap(keyword) {
        it("does not map \"" + keyword + "\"", function () {
            expect(Keywords[keyword]).toBeUndefined()
        })
    }

    DoesNotMap("(")
    DoesNotMap(")")
    DoesNotMap("-")
    DoesNotMap("+")
    DoesNotMap("!")
    DoesNotMap(":")
    DoesNotMap("#")
    Maps("and", "Operator")
    Maps("not", "Operator")

    it("every statement keyword has a parser", () => {
        for (const keyword in Keywords) {
            if (Keywords[keyword] != "Statement") continue
            expect(StatementParsers[keyword]).toEqual(jasmine.any(Function))
        }
    })

    it("every statement parser has a keyword", () => {
        for (const keyword in StatementParsers) {
            expect(Keywords[keyword]).toEqual("Statement")
        }
    })
})