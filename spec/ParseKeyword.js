describe("ParseKeyword", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const ParseKeyword = Namespace.__get__("ParseKeyword")

    Namespace.__set__("Keywords", {
        "Valid Keyword": "Valid Keyword Type"
    })

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseKeyword({
                StartIndex: 32,
                Text: input
            })).toEqual(output)
        })
    }

    Test("invalid keyword", "Invalid Keyword", undefined)
    Test("invalid keyword from object prototype", "constructor", undefined)
    Test("valid keyword", "Valid Keyword", {
        Type: "Valid Keyword Type",
        StartIndex: 32,
        Symbol: "Valid Keyword"
    })
})