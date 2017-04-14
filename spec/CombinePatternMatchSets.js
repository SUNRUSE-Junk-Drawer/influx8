describe("CombinePatternMatchSets", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const CombinePatternMatchSets = Namespace.__get__("CombinePatternMatchSets")

    function Test(description, a, b, output, combinePatternMatches) {
        it(description, () => {
            Namespace.__set__("CombinePatternMatches", combinePatternMatches || fail)
            expect(CombinePatternMatchSets(a, b)).toEqual(output)
        })
    }

    Test("nothing", [], [], [])
    Test("first set only", ["Test Match A A", "Test Match A B", "Test Match A C"], [], [])
    Test("second set only", [], ["Test Match B A", "Test Match B B", "Test Match B C"], [])
    Test("both sets", ["Test Match A A", "Test Match A B", "Test Match A C"], ["Test Match B A", "Test Match B B", "Test Match B C", "Test Match B D"], [
        "Test Match - A A",
        "Test Match - A B",
        "Test Match - A D",
        "Test Match - B B",
        "Test Match - B C",
        "Test Match - C C",
        "Test Match - C D"
    ], (a, b) => {
        switch (a) {
            case "Test Match A A": switch (b) {
                case "Test Match B A": return "Test Match - A A"
                case "Test Match B B": return "Test Match - A B"
                case "Test Match B C": return undefined
                case "Test Match B D": return "Test Match - A D"
                default: "Unexpected b"
            }
            case "Test Match A B": switch (b) {
                case "Test Match B A": return undefined
                case "Test Match B B": return "Test Match - B B"
                case "Test Match B C": return "Test Match - B C"
                case "Test Match B D": return undefined
                default: "Unexpected b"
            }
            case "Test Match A C": switch (b) {
                case "Test Match B A": return undefined
                case "Test Match B B": return undefined
                case "Test Match B C": return "Test Match - C C"
                case "Test Match B D": return "Test Match - C D"
                default: "Unexpected b"
            }
            default: fail("Unexpected a")
        }
    })
})