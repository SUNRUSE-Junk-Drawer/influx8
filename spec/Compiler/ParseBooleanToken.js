describe("ParseBooleanToken", () => {
    const ParseBooleanToken = require("rewire")("../../Exports.js").__get__("ParseBooleanToken")

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseBooleanToken({
                StartIndex: 32,
                Text: input
            })).toEqual(output)
        })
    }

    Test("returns true for true", "true", {
        Type: "Boolean",
        StartIndex: 32,
        EndIndex: 35,
        Value: true
    })

    Test("returns false for false", "false", {
        Type: "Boolean",
        StartIndex: 32,
        EndIndex: 36,
        Value: false
    })

    Test("returns undefined for non-booleans", "misc", undefined)
})