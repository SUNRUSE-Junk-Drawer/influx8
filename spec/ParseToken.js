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
            case "Matches Boolean And Identifier": return "Matched Boolean Over Identifier"
            case "Matches Boolean And Symbol": return "Matched Boolean Over Symbol"
        }
    })

    Namespace.__set__("ParseIdentifier", (token) => {
        expect(token.StartIndex).toEqual(32)
        switch (token.Text) {
            case "Matches Identifier": return "Matched Identifier"
            case "Matches Boolean And Identifier": return "Matched Identifier Under Boolean"
            case "Matches Keyword And Identifier": return "Matched Identifier Under Keyword"
            case "Matches Identifier And Symbol": return "Matched Identifier Over Symbol"
        }
    })

    Namespace.__set__("ParseKeyword", (token) => {
        expect(token.StartIndex).toEqual(32)
        switch (token.Text) {
            case "Matches Keyword": return "Matched Keyword"
            case "Matches Keyword And Identifier": return "Matched Keyword Over Identifier"
            case "Matches Keyword And Symbol": return "Matched Keyword Over Symbol"
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
    Test("identifier", "Matches Identifier", ["Matched Identifier"])
    Test("symbol", "Matches Symbol", "Matched Symbol")
    Test("integer over symbol", "Matches Integer And Symbol", ["Matched Integer Over Symbol"])
    Test("boolean over symbol", "Matches Boolean And Symbol", ["Matched Boolean Over Symbol"])
    Test("boolean over identifier", "Matches Boolean And Identifier", ["Matched Boolean Over Identifier"])
    Test("identifier over symbol", "Matches Identifier And Symbol", ["Matched Identifier Over Symbol"])
    Test("keyword over identifier", "Matches Keyword And Identifier", ["Matched Keyword Over Identifier"])
    Test("keyword over symbol", "Matches Keyword And Symbol", ["Matched Keyword Over Symbol"])
})