describe("MatchPatternSet", () => {
    const Namespace = require("rewire")("../../index.js")
    const MatchPatternSet = Namespace.__get__("MatchPatternSet")

    function Test(description, expression, pattern, output, matchPatternSet, combinePatternMatchSets) {
        it(description, () => {
            Namespace.__set__("MatchPattern", matchPatternSet || fail)
            Namespace.__set__("CombinePatternMatchSets", combinePatternMatchSets || fail)
            expect(MatchPatternSet(expression, pattern)).toEqual(output)
        })
    }

    Test(
        "incorrect number of items",
        ["Test Expression A", "Test Expression B", "Test Expression C"],
        ["Test Pattern A", "Test Pattern B", "Test Pattern C", "Test Pattern D"],
        []
    )

    Test(
        "correct number of items",
        ["Test Expression A", "Test Expression B", "Test Expression C", "Test Expression D"],
        ["Test Pattern A", "Test Pattern B", "Test Pattern C", "Test Pattern D"],
        "Test Matches G",
        (expression, pattern) => {
            switch (expression) {
                case "Test Expression A":
                    expect(pattern).toEqual("Test Pattern A")
                    return "Test Matches A"
                case "Test Expression B":
                    expect(pattern).toEqual("Test Pattern B")
                    return "Test Matches B"
                case "Test Expression C":
                    expect(pattern).toEqual("Test Pattern C")
                    return "Test Matches C"
                case "Test Expression D":
                    expect(pattern).toEqual("Test Pattern D")
                    return "Test Matches D"
                default: fail("Unexpected expression")
            }
        },
        (a, b) => {
            switch (a) {
                case "Test Matches A":
                    expect(b).toEqual("Test Matches B")
                    return "Test Matches E"
                case "Test Matches E":
                    expect(b).toEqual("Test Matches C")
                    return "Test Matches F"
                case "Test Matches F":
                    expect(b).toEqual("Test Matches D")
                    return "Test Matches G"
                default: fail("Unexpected match set")
            }
        }
    )
})