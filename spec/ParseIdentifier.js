describe("ParseIdentifier", function () {
    const ParseIdentifier = require("rewire")("../dist/index.js").__get__("ParseIdentifier")

    function Accepts(input) {
        it("accepts \"" + input + "\"", function () {
            expect(ParseIdentifier({
                StartIndex: 32,
                Text: input
            })).toEqual({
                Type: "Identifier",
                StartIndex: 32,
                Value: input
            })
        })
    }

    function Rejects(input) {
        it("rejects \"" + input + "\"", function () {
            expect(ParseIdentifier({
                StartIndex: 32,
                Text: input
            })).toBeUndefined()
        })
    }

    Rejects("6")
    Rejects("$")
    Accepts("g")
    Accepts("awfkuih")
    Accepts("_")
    Accepts("______")
    Rejects("67437")
    Rejects("67jfdfj437")
    Rejects("67437_")
    Accepts("_6")
    Accepts("_67437")
    Accepts("_67jfdfj437")
    Rejects("6_")
    Rejects("67437_")
    Rejects("67jfdfj437_")
    Accepts("g6")
    Accepts("g67437")
    Accepts("g67jfdfj437")
    Rejects("6g")
    Rejects("67437g")
    Rejects("67jfdfj437g")
    Accepts("af_3d_6_")
    Accepts("af_3d_6_h")
    Accepts("af_3d_6_4")
    Rejects("6_3d_6_")
    Rejects("6_3d_6_h")
    Rejects("6_3d_6_4")
    Accepts("_3d_6_")
    Accepts("_3d_6_h")
    Accepts("_3d_6_4")

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