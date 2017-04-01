describe("ParseConstantExpression", () => {
    const ParseConstantExpression = require("rewire")("../dist/index.js").__get__("ParseConstantExpression")

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseConstantExpression(input)).toEqual(output)
        })
    }

    Test("nothing", [], undefined)

    Test("single boolean", [{
        Type: "Boolean",
        StartIndex: 89,
        Value: "Anything A"
    }], {
            Type: "Boolean",
            StartIndex: 89,
            Value: "Anything A"
        })

    Test("multiple booleans", [{
        Type: "Boolean",
        StartIndex: 89,
        Value: "Anything A"
    }, {
        Type: "Boolean",
        StartIndex: 114,
        Value: "Anything B"
    }], undefined)

    Test("single integer", [{
        Type: "Integer",
        StartIndex: 89,
        Value: "Anything A"
    }], {
            Type: "Integer",
            StartIndex: 89,
            Value: "Anything A"
        })

    Test("multiple integers", [{
        Type: "Integer",
        StartIndex: 89,
        Value: "Anything A"
    }, {
        Type: "Integer",
        StartIndex: 114,
        Value: "Anything B"
    }], undefined)

    Test("single no match", [{
        Type: "Misc A",
        StartIndex: 89,
        Value: "Anything B"
    }], undefined)

    Test("multiple no match", [{
        Type: "Misc A",
        StartIndex: 89,
        Value: "Anything B"
    }, {
        Type: "Misc B",
        StartIndex: 114,
        Value: "Anything B"
    }], undefined)

    Test("integer then boolean", [{
        Type: "Integer",
        StartIndex: 89,
        Value: "Anything A"
    }, {
        Type: "Boolean",
        StartIndex: 114,
        Value: "Anything B"
    }], undefined)

    Test("boolean then integer", [{
        Type: "Boolean",
        StartIndex: 89,
        Value: "Anything A"
    }, {
        Type: "Integer",
        StartIndex: 114,
        Value: "Anything B"
    }], undefined)

    Test("unmatched then integer", [{
        Type: "Misc A",
        StartIndex: 89,
        Value: "Anything A"
    }, {
        Type: "Integer",
        StartIndex: 114,
        Value: "Anything B"
    }], undefined)

    Test("unmatched then boolean", [{
        Type: "Misc A",
        StartIndex: 89,
        Value: "Anything A"
    }, {
        Type: "Boolean",
        StartIndex: 114,
        Value: "Anything B"
    }], undefined)

    Test("integer then unmatched", [{
        Type: "Integer",
        StartIndex: 89,
        Value: "Anything A"
    }, {
        Type: "Misc B",
        StartIndex: 114,
        Value: "Anything B"
    }], undefined)

    Test("boolean then unmatched", [{
        Type: "Boolean",
        StartIndex: 89,
        Value: "Anything A"
    }, {
        Type: "Misc B",
        StartIndex: 114,
        Value: "Anything B"
    }], undefined)
})