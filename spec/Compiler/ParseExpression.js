describe("ParseExpression", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const ParseExpression = Namespace.__get__("ParseExpression")

    Namespace.__set__("TryParseExpression", (tokens) => {
        switch (tokens) {
            case "Valid Expression": return "Test Expression"
            case "Invalid Expression": return undefined
            case "Valid Statement": return undefined
            case "Valid Lambda Expression": return undefined
            default: fail()
        }
    })

    Namespace.__set__("ParseStatementExpression", (tokens) => {
        switch (tokens) {
            case "Valid Expression": return undefined
            case "Invalid Expression": return undefined
            case "Valid Statement": return "Test Statement"
            case "Valid Lambda Expression": return undefined
            default: fail()
        }
    })

    Namespace.__set__("ParseLambdaExpression", (tokens) => {
        switch (tokens) {
            case "Valid Expression": return undefined
            case "Invalid Expression": return undefined
            case "Valid Statement": return undefined
            case "Valid Lambda Expression": return "Test Parsed Lambda Expression"
            default: fail()
        }
    })

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseExpression(input, 4234, 4992)).toEqual(output)
        })
    }

    Test("valid expression", "Valid Expression", "Test Expression")
    Test("statement", "Valid Statement", "Test Statement")
    Test("lambda expression", "Valid Lambda Expression", "Test Parsed Lambda Expression")
    Test("invalid expression", "Invalid Expression", {
        Type: "Unknown",
        Tokens: "Invalid Expression",
        StartIndex: 4234,
        EndIndex: 4992
    })
})