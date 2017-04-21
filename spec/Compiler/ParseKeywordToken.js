describe("ParseKeywordToken", () => {
    const Namespace = require("rewire")("../../index.js")
    const ParseKeywordToken = Namespace.__get__("ParseKeywordToken")

    Namespace.__set__("Keywords", {
        "Valid Keyword": "Valid Keyword Type"
    })

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseKeywordToken({
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
        EndIndex: 44,
        Symbol: "Valid Keyword"
    })
})