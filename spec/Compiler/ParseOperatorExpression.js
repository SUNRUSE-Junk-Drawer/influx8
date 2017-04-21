describe("ParseOperatorExpression", () => {
    const Namespace = require("rewire")("../../index.js")
    const ParseOperatorExpression = Namespace.__get__("ParseOperatorExpression")

    Namespace.__set__("Precedence", ["LevelA", "LevelB", "LevelC", "LevelD"])

    Namespace.__set__("ParseOperatorExpressionLevel", (tokens, level) => {
        switch (level) {
            case "LevelA":
                switch (tokens) {
                    case "Test Matches Level A": return "Test Match Level A"
                    case "Test Matches Levels A and C": return "Test Match Level A Over C"
                    case "Test Matches Levels A and D": return "Test Match Level A Over D"
                }
                break
            case "LevelB":
                switch (tokens) {
                    case "Test Matches Levels B and C": return "Test Match Level B Over C"
                }
                break
            case "LevelC":
                switch (tokens) {
                    case "Test Matches Level C": return "Test Match Level C"
                    case "Test Matches Levels A and C": return "Test Match Level C Under A"
                    case "Test Matches Levels B and C": return "Test Match Level C Under B"
                    case "Test Matches Levels C and D": return "Test Match Level C Over D"
                }
                break
            case "LevelD":
                switch (tokens) {
                    case "Test Matches Level D": return "Test Match Level D"
                    case "Test Matches Levels C and D": return "Test Match Level D Under C"
                    case "Test Matches Levels A and D": return "Test Match Level D Under A"
                }
                break
            default:
                fail("Unexpected level \"" + level + "\"")
                break
        }
        return undefined
    })

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseOperatorExpression(input, {
                Type: "Unary",
                Operators: ["Unused First Operator", "Matched Operator", "Unused Last Operator"]
            })).toEqual(output)
        })
    }

    Test("no match", "Test No Match", undefined)

    Test("first level", "Test Matches Level A", "Test Match Level A")
    Test("middle level", "Test Matches Level C", "Test Match Level C")
    Test("last level", "Test Matches Level D", "Test Match Level D")
    Test("first level over middle level", "Test Matches Levels A and C", "Test Match Level A Over C")
    Test("middle level over middle level", "Test Matches Levels B and C", "Test Match Level B Over C")
    Test("middle level over last level", "Test Matches Levels C and D", "Test Match Level C Over D")
    Test("first level over last level", "Test Matches Levels A and D", "Test Match Level A Over D")
})