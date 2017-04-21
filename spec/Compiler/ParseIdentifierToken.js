describe("ParseIdentifierToken", () => {
    const ParseIdentifierToken = require("rewire")("../../index.js").__get__("ParseIdentifierToken")

    function Accepts(input, endIndex) {
        it("accepts \"" + input + "\"", () => {
            expect(ParseIdentifierToken({
                StartIndex: 32,
                Text: input
            })).toEqual({
                Type: "Identifier",
                StartIndex: 32,
                EndIndex: endIndex,
                Value: input
            })
        })
    }

    function Rejects(input) {
        it("rejects \"" + input + "\"", () => {
            expect(ParseIdentifierToken({
                StartIndex: 32,
                Text: input
            })).toBeUndefined()
        })
    }

    Rejects("6")
    Rejects("$")
    Accepts("g", 32)
    Accepts("awfkuih", 38)
    Accepts("_", 32)
    Accepts("______", 37)
    Rejects("67437")
    Rejects("67jfdfj437")
    Rejects("67437_")
    Accepts("_6", 33)
    Accepts("_67437", 37)
    Accepts("_67jfdfj437", 42)
    Rejects("6_")
    Rejects("67437_")
    Rejects("67jfdfj437_")
    Accepts("g6", 33)
    Accepts("g67437", 37)
    Accepts("g67jfdfj437", 42)
    Rejects("6g")
    Rejects("67437g")
    Rejects("67jfdfj437g")
    Accepts("af_3d_6_", 39)
    Accepts("af_3d_6_h", 40)
    Accepts("af_3d_6_4", 40)
    Rejects("6_3d_6_")
    Rejects("6_3d_6_h")
    Rejects("6_3d_6_4")
    Accepts("_3d_6_", 37)
    Accepts("_3d_6_h", 38)
    Accepts("_3d_6_4", 38)

    Rejects("af_3$d_6_")
    Rejects("af_3$d_6_h")
    Rejects("af_3$d_6_4")
    Rejects("6_3d$_6_")
    Rejects("6_3d$_6_h")
    Rejects("6_3d$_6_4")
    Rejects("_3d_$6_")
    Rejects("_3d_$6_h")
    Rejects("_3d_$6_4")

    Rejects("$af_3d_6_")
    Rejects("$af_3d_6_h")
    Rejects("$af_3d_6_4")
    Rejects("$6_3d_6_")
    Rejects("$6_3d_6_h")
    Rejects("$6_3d_6_4")
    Rejects("$_3d_6_")
    Rejects("$_3d_6_h")
    Rejects("$_3d_6_4")

    Rejects("af_3d_6_$")
    Rejects("af_3d_6_h$")
    Rejects("af_3d_6_4$")
    Rejects("6_3d_6_$")
    Rejects("6_3d_6_h$")
    Rejects("6_3d_6_4$")
    Rejects("_3d_6_$")
    Rejects("_3d_6_h$")
    Rejects("_3d_6_4$")
})