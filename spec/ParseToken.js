describe("ParseToken", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const ParseToken = Namespace.__get__("ParseToken")

    Namespace.__set__("ParseInteger", (token) => {
        expect(token.StartIndex).toEqual(32)
        switch (token.Text) {
            case "Matches Integer": return "Matched Integer"
            case "Matches Integer And Symbol": return "Matched Integer Over Symbol"
        }
    })

    Namespace.__set__("ParseBoolean", (token) => {
        expect(token.StartIndex).toEqual(32)
        switch (token.Text) {
            case "Matches Boolean": return "Matched Boolean"
            case "Matches Boolean And Symbol": return "Matched Boolean Over Symbol"
        }
    })

    Namespace.__set__("ParseSymbol", (token) => {
        expect(token.StartIndex).toEqual(32)
        switch (token.Text) {
            case "Matches Symbol": return "Matched Symbol"
        }
    })

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseToken({
                StartIndex: 32,
                Text: input
            })).toEqual(output)
        })
    }

    Test("no match", "Matches Nothing", [{
        Type: "Unknown",
        StartIndex: 32,
        Text: "Matches Nothing"
    }])

    Test("integer", "Matches Integer", ["Matched Integer"])
    Test("boolean", "Matches Boolean", ["Matched Boolean"])
    Test("symbol", "Matches Symbol", "Matched Symbol")
    Test("integer over symbol", "Matches Integer And Symbol", ["Matched Integer Over Symbol"])
    Test("boolean over symbol", "Matches Boolean And Symbol", ["Matched Boolean Over Symbol"])
})