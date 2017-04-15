describe("Keywords", () => {
    const Keywords = require("rewire")("../dist/index.js").__get__("Keywords")

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
    DoesNotMap("::")
    Maps("and", "Operator")
    Maps("not", "Operator")
    Maps("let", "Statement")
    Maps("return", "Statement")
})