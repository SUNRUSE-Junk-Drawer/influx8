describe("MatchCSyntaxConstant", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const MatchCSyntaxConstant = Namespace.__get__("MatchCSyntaxConstant")

    function Test(description, expression, output) {
        it(description, () => {
            expect(MatchCSyntaxConstant(expression)).toEqual(output)
        })
    }

    Test("boolean", [{
        Type: "Boolean",
        Value: "Anything"
    }], {
            Type: "Boolean",
            Value: "Anything"
        })

    Test("integer", [{
        Type: "Integer",
        Value: "Anything"
    }], {
            Type: "Integer",
            Value: "Anything"
        })

    Test("float", [{
        Type: "Float",
        Value: "Anything"
    }], {
            Type: "Float",
            Value: "Anything"
        })

    Test("non-constant", [{
        Type: "Misc A",
        Value: "Anything"
    }], undefined)

    Test("boolean then boolean", [{
        Type: "Boolean",
        Value: "Anything A"
    }, {
        Type: "Boolean",
        Value: "Anything B"
    }], undefined)

    Test("integer then boolean", [{
        Type: "Integer",
        Value: "Anything A"
    }, {
        Type: "Boolean",
        Value: "Anything B"
    }], undefined)

    Test("float then boolean", [{
        Type: "Float",
        Value: "Anything A"
    }, {
        Type: "Boolean",
        Value: "Anything B"
    }], undefined)

    Test("integer then integer", [{
        Type: "Integer",
        Value: "Anything A"
    }, {
        Type: "Integer",
        Value: "Anything B"
    }], undefined)

    Test("integer then float", [{
        Type: "Integer",
        Value: "Anything A"
    }, {
        Type: "Float",
        Value: "Anything B"
    }], undefined)

    Test("integer then float", [{
        Type: "Boolean",
        Value: "Anything A"
    }, {
        Type: "Float",
        Value: "Anything B"
    }], undefined)

    Test("boolean then integer", [{
        Type: "Boolean",
        Value: "Anything A"
    }, {
        Type: "Integer",
        Value: "Anything B"
    }], undefined)

    Test("float then integer", [{
        Type: "Float",
        Value: "Anything A"
    }, {
        Type: "Integer",
        Value: "Anything B"
    }], undefined)

    Test("float then float", [{
        Type: "Float",
        Value: "Anything A"
    }, {
        Type: "Float",
        Value: "Anything B"
    }], undefined)

    Test("boolean then non-constant", [{
        Type: "Boolean",
        Value: "Anything A"
    }, {
        Type: "Misc B",
        Value: "Anything B"
    }], undefined)

    Test("integer then non-constant", [{
        Type: "Integer",
        Value: "Anything A"
    }, {
        Type: "Misc B",
        Value: "Anything B"
    }], undefined)

    Test("non-constant then boolean", [{
        Type: "Misc A",
        Value: "Anything A"
    }, {
        Type: "Boolean",
        Value: "Anything B"
    }], undefined)

    Test("non-constant then integer", [{
        Type: "Misc A",
        Value: "Anything A"
    }, {
        Type: "Integer",
        Value: "Anything B"
    }], undefined)

    Test("non-constant then float", [{
        Type: "Misc A",
        Value: "Anything A"
    }, {
        Type: "Float",
        Value: "Anything B"
    }], undefined)

    Test("float then non-constant", [{
        Type: "Float",
        Value: "Anything A"
    }, {
        Type: "Misc B",
        Value: "Anything B"
    }], undefined)

    Test("non-constant then non-constant", [{
        Type: "Misc A",
        Value: "Anything A"
    }, {
        Type: "Misc B",
        Value: "Anything B"
    }], undefined)
})