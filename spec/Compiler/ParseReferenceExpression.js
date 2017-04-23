describe("ParseReferenceExpression", () => {
    const ParseReferenceExpression = require("rewire")("../../Exports.js").__get__("ParseReferenceExpression")

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseReferenceExpression(input)).toEqual(output)
        })
    }

    Test("nothing", [], undefined)

    Test("single non-identifier", [{
        Type: "Misc A",
        StartIndex: 89,
        EndIndex: 140,
        Value: "Anything A"
    }], undefined)

    Test("single identifier", [{
        Type: "Identifier",
        StartIndex: 89,
        EndIndex: 140,
        Value: "Anything A"
    }], {
            Type: "Reference",
            StartIndex: 89,
            EndIndex: 140,
            Name: "Anything A"
        })

    Test("single non-identifier then single non-identifier", [{
        Type: "Misc A",
        StartIndex: 89,
        EndIndex: 140,
        Value: "Anything A"
    }, {
        Type: "Misc B",
        StartIndex: 163,
        EndIndex: 175,
        Value: "Anything B"
    }], undefined)

    Test("single identifier then single non-identifier", [{
        Type: "Identifier",
        StartIndex: 89,
        EndIndex: 140,
        Value: "Anything A"
    }, {
        Type: "Misc B",
        StartIndex: 163,
        EndIndex: 175,
        Value: "Anything B"
    }], undefined)

    Test("single non-identifier then single identifier", [{
        Type: "Misc A",
        StartIndex: 89,
        EndIndex: 140,
        Value: "Anything A"
    }, {
        Type: "Identifier",
        StartIndex: 163,
        EndIndex: 175,
        Value: "Anything B"
    }], undefined)
})