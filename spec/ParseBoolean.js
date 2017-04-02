describe("ParseBoolean", () => {
    const ParseBoolean = require("rewire")("../dist/index.js").__get__("ParseBoolean")

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseBoolean({
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