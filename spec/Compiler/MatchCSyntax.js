describe("MatchCSyntax", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const MatchCSyntax = Namespace.__get__("MatchCSyntax")

    Namespace.__set__("MatchCSyntaxConstant", (expression) => {
        switch (expression) {
            case "Test Constant Expression": return "Test Recursed Constant Expression"
            case "Test First Pattern Expression": return undefined
            case "Test Middle Pattern Expression": return undefined
            case "Test Last Pattern Expression": return undefined
            case "Test First And Middle Pattern Expression": return undefined
            case "Test First And Last Pattern Expression": return undefined
            case "Test Middle And Middle Pattern Expression": return undefined
            case "Test Middle And Last Pattern Expression": return undefined
            case "Test Constant And First Pattern Expression": return "Test Recursed Constant Over First Pattern Expression"
            case "Test Constant And Middle Pattern Expression": return "Test Recursed Constant Over Middle Pattern Expression"
            case "Test Constant And Last Pattern Expression": return "Test Recursed Constant Over Last Pattern Expression"
            default: fail("Unexpected expression")
        }
    })

    Namespace.__set__("MatchCSyntaxPattern", (expression, syntax, pattern) => {
        expect(syntax).toEqual({ Patterns: ["Test Pattern A", "Test Pattern B", "Test Pattern C", "Test Pattern D"] })
        switch (expression) {
            case "Test Constant Expression": switch (pattern) {
                case "Test Pattern A": return undefined
                case "Test Pattern B": return undefined
                case "Test Pattern C": return undefined
                case "Test Pattern D": return undefined
                default: fail("Unexpected pattern")
            }
            case "Test First Pattern Expression": switch (pattern) {
                case "Test Pattern A": return "Test Recursed First Pattern Expression"
                case "Test Pattern B": return undefined
                case "Test Pattern C": return undefined
                case "Test Pattern D": return undefined
                default: fail("Unexpected pattern")
            }
            case "Test Middle Pattern Expression": switch (pattern) {
                case "Test Pattern A": return undefined
                case "Test Pattern B": return "Test Recursed Middle Pattern Expression"
                case "Test Pattern C": return undefined
                case "Test Pattern D": return undefined
                default: fail("Unexpected pattern")
            }
            case "Test Last Pattern Expression": switch (pattern) {
                case "Test Pattern A": return undefined
                case "Test Pattern B": return undefined
                case "Test Pattern C": return undefined
                case "Test Pattern D": return "Test Recursed Last Pattern Expression"
                default: fail("Unexpected pattern")
            }
            case "Test First And Middle Pattern Expression": switch (pattern) {
                case "Test Pattern A": return "Test Recursed First Over Middle Pattern Expression"
                case "Test Pattern B": return undefined
                case "Test Pattern C": return "Test Recursed Middle Under First Pattern Expression"
                case "Test Pattern D": return undefined
                default: fail("Unexpected pattern")
            }
            case "Test First And Last Pattern Expression": switch (pattern) {
                case "Test Pattern A": return "Test Recursed First Over Last Pattern Expression"
                case "Test Pattern B": return undefined
                case "Test Pattern C": return undefined
                case "Test Pattern D": return "Test Recursed Last Under First Pattern Expression"
                default: fail("Unexpected pattern")
            }
            case "Test Middle And Middle Pattern Expression": switch (pattern) {
                case "Test Pattern A": return undefined
                case "Test Pattern B": return "Test Recursed Middle Over Middle Pattern Expression"
                case "Test Pattern C": return "Test Recursed Middle Under Middle Pattern Expression"
                case "Test Pattern D": return undefined
                default: fail("Unexpected pattern")
            }
            case "Test Middle And Last Pattern Expression": switch (pattern) {
                case "Test Pattern A": return undefined
                case "Test Pattern B": return "Test Recursed Middle Over Last Pattern Expression"
                case "Test Pattern C": return undefined
                case "Test Pattern D": return "Test Recursed Last Under Middle Pattern Expression"
                default: fail("Unexpected pattern")
            }
            case "Test Constant And First Pattern Expression": switch (pattern) {
                case "Test Pattern A": return "Test Recursed First Pattern Under Constant Expression"
                case "Test Pattern B": return undefined
                case "Test Pattern C": return undefined
                case "Test Pattern D": return undefined
                default: fail("Unexpected pattern")
            }
            case "Test Constant And Middle Pattern Expression": switch (pattern) {
                case "Test Pattern A": return undefined
                case "Test Pattern B": return "Test Recursed Middle Pattern Under Constant Expression"
                case "Test Pattern C": return undefined
                case "Test Pattern D": return undefined
                default: fail("Unexpected pattern")
            }
            case "Test Constant And Last Pattern Expression": switch (pattern) {
                case "Test Pattern A": return undefined
                case "Test Pattern B": return undefined
                case "Test Pattern C": return undefined
                case "Test Pattern D": return "Test Recursed Last Pattern Under Constant Expression"
                default: fail("Unexpected pattern")
            }
            default: fail("Unexpected expression")
        }
    })

    function Test(description, expression, output) {
        it(description, () => {
            expect(MatchCSyntax(expression, { Patterns: ["Test Pattern A", "Test Pattern B", "Test Pattern C", "Test Pattern D"] })).toEqual(output)
        })
    }

    Test("constant", "Test Constant Expression", "Test Recursed Constant Expression")
    Test("first pattern", "Test First Pattern Expression", "Test Recursed First Pattern Expression")
    Test("middle pattern", "Test Middle Pattern Expression", "Test Recursed Middle Pattern Expression")
    Test("last pattern", "Test Last Pattern Expression", "Test Recursed Last Pattern Expression")
    Test("first and middle pattern", "Test First And Middle Pattern Expression", "Test Recursed First Over Middle Pattern Expression")
    Test("first and last pattern", "Test First And Last Pattern Expression", "Test Recursed First Over Last Pattern Expression")
    Test("middle and middle pattern", "Test Middle And Middle Pattern Expression", "Test Recursed Middle Over Middle Pattern Expression")
    Test("middle and last pattern", "Test Middle And Last Pattern Expression", "Test Recursed Middle Over Last Pattern Expression")
    Test("constant and first pattern", "Test Constant And First Pattern Expression", "Test Recursed Constant Over First Pattern Expression")
    Test("constant and middle pattern", "Test Constant And Middle Pattern Expression", "Test Recursed Constant Over Middle Pattern Expression")
    Test("constant and last pattern", "Test Constant And Last Pattern Expression", "Test Recursed Constant Over Last Pattern Expression")
})