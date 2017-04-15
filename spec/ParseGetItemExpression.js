describe("ParseGetItemExpression", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const ParseGetItemExpression = Namespace.__get__("ParseGetItemExpression")

    function Test(description, tokens, output, tryParseExpression) {
        it(description, () => {
            Namespace.__set__("TryParseExpression", tryParseExpression || fail)
            expect(ParseGetItemExpression(tokens)).toEqual(output)
        })
    }

    Test("nothing", [], undefined)

    Test("one non-get item", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }], undefined)

    Test("two non-get item", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }, {
        Type: "Misc B",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B",
        Misc: "Value B"
    }], undefined)

    Test("three non-get item", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }, {
        Type: "Misc B",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B",
        Misc: "Value B"
    }, {
        Type: "Misc C",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C",
        Misc: "Value C"
    }], undefined)

    Test("four non-get item", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }, {
        Type: "Misc B",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B",
        Misc: "Value B"
    }, {
        Type: "Misc C",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C",
        Misc: "Value C"
    }, {
        Type: "Misc D",
        StartIndex: 81,
        EndIndex: 98,
        Symbol: "Anything D",
        Misc: "Value D"
    }], undefined)

    Test("one get item", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }], undefined)

    Test("two get item", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }], undefined)

    Test("three get item", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "GetItem",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C"
    }], undefined)

    Test("four get item", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "GetItem",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C"
    }, {
        Type: "GetItem",
        StartIndex: 81,
        EndIndex: 98,
        Symbol: "Anything D"
    }], undefined)

    Test("one integer", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 281
    }], undefined)

    Test("two integer", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 281
    }, {
        Type: "Integer",
        StartIndex: 45,
        EndIndex: 49,
        Value: 6402
    }], undefined)

    Test("three integer", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 281
    }, {
        Type: "Integer",
        StartIndex: 45,
        EndIndex: 49,
        Value: 6402
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 42
    }], undefined)

    Test("four integer", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 281
    }, {
        Type: "Integer",
        StartIndex: 45,
        EndIndex: 49,
        Value: 6402
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 42
    }, {
        Type: "Integer",
        StartIndex: 81,
        EndIndex: 98,
        Value: 872
    }], undefined)


    Test("one misc, one get item", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }], undefined)

    Test("one integer, one get item", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 8372
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }], undefined)

    Test("one get item, one misc", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }, {
        Type: "Misc B",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B",
        Misc: "Value B"
    }], undefined)

    Test("one get item, one integer", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }, {
        Type: "Integer",
        StartIndex: 45,
        EndIndex: 49,
        Value: 3947
    }], undefined)

    Test("one integer, one misc", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 239
    }, {
        Type: "Misc B",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B",
        Misc: "Value B"
    }], undefined)

    Test("one misc, one integer", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Value: 239,
        Symbol: "Anything A",
        Value: "Value A"
    }, {
        Type: "Integer",
        StartIndex: 45,
        EndIndex: 49,
        Value: 7923
    }], undefined)


    Test("one misc, one get item, one misc", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "Misc C",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C",
        Misc: "Value C"
    }], undefined)

    Test("one integer, one get item, one misc", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 8372
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "Misc C",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C",
        Misc: "Value C"
    }], undefined)

    Test("one get item, one misc, one misc", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }, {
        Type: "Misc B",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B",
        Misc: "Value B"
    }, {
        Type: "Misc C",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C",
        Misc: "Value C"
    }], undefined)

    Test("one get item, one integer, one misc", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }, {
        Type: "Integer",
        StartIndex: 45,
        EndIndex: 49,
        Value: 3947
    }, {
        Type: "Misc C",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C",
        Misc: "Value C"
    }], undefined)

    Test("one integer, one misc, one misc", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 239
    }, {
        Type: "Misc B",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B",
        Misc: "Value B"
    }, {
        Type: "Misc C",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C",
        Misc: "Value C"
    }], undefined)

    Test("one misc, one integer, one misc", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Value: 239,
        Symbol: "Anything A",
        Value: "Value A"
    }, {
        Type: "Integer",
        StartIndex: 45,
        EndIndex: 49,
        Value: 7923
    }, {
        Type: "Misc C",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C",
        Misc: "Value C"
    }], undefined)


    Test("one misc, one get item, one get item", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "GetItem",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C"
    }], undefined)

    Test("one integer, one get item, one get item", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 8372
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "GetItem",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C"
    }], undefined)

    Test("one get item, one misc, one get item", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }, {
        Type: "Misc B",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B",
        Misc: "Value B"
    }, {
        Type: "GetItem",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C"
    }], undefined)

    Test("one get item, one integer, one get item", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }, {
        Type: "Integer",
        StartIndex: 45,
        EndIndex: 49,
        Value: 3947
    }, {
        Type: "GetItem",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C"
    }], undefined)

    Test("one integer, one misc, one get item", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 239
    }, {
        Type: "Misc B",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B",
        Misc: "Value B"
    }, {
        Type: "GetItem",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C"
    }], undefined)

    Test("one misc, one integer, one get item", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Value: 239,
        Symbol: "Anything A",
        Value: "Value A"
    }, {
        Type: "Integer",
        StartIndex: 45,
        EndIndex: 49,
        Value: 7923
    }, {
        Type: "GetItem",
        StartIndex: 66,
        EndIndex: 72,
        Symbol: "Anything C"
    }], undefined)


    Test("one misc, one get item, one integer recurses", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 2373
    }], {
            Type: "GetItem",
            Item: 2373,
            Of: "Test Recursed Tokens"
        }, (tokens) => {
            expect(tokens).toEqual([{
                Type: "Misc A",
                StartIndex: 24,
                EndIndex: 35,
                Symbol: "Anything A",
                Misc: "Value A"
            }])
            return "Test Recursed Tokens"
        })

    Test("one misc, one get item, one integer does not recurse", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 2373
    }], undefined, (tokens) => {
        expect(tokens).toEqual([{
            Type: "Misc A",
            StartIndex: 24,
            EndIndex: 35,
            Symbol: "Anything A",
            Misc: "Value A"
        }])
        return undefined
    })

    Test("one integer, one get item, one integer recurses", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 8372
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 2373
    }], {
            Type: "GetItem",
            Item: 2373,
            Of: "Test Recursed Tokens"
        }, (tokens) => {
            expect(tokens).toEqual([{
                Type: "Integer",
                StartIndex: 24,
                EndIndex: 35,
                Value: 8372
            }])
            return "Test Recursed Tokens"
        })

    Test("one integer, one get item, one integer does not recurse", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 8372
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 2373
    }], undefined, (tokens) => {
        expect(tokens).toEqual([{
            Type: "Integer",
            StartIndex: 24,
            EndIndex: 35,
            Value: 8372
        }])
        return undefined
    })

    Test("one get item, one misc, one integer", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }, {
        Type: "Misc B",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B",
        Misc: "Value B"
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 2373
    }], undefined)

    Test("one get item, one integer, one integer", [{
        Type: "GetItem",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A"
    }, {
        Type: "Integer",
        StartIndex: 45,
        EndIndex: 49,
        Value: 3947
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 2373
    }], undefined)

    Test("one integer, one misc, one integer", [{
        Type: "Integer",
        StartIndex: 24,
        EndIndex: 35,
        Value: 239
    }, {
        Type: "Misc B",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B",
        Misc: "Value B"
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 2373
    }], undefined)

    Test("one misc, one integer, one integer", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Value: 239,
        Symbol: "Anything A",
        Value: "Value A"
    }, {
        Type: "Integer",
        StartIndex: 45,
        EndIndex: 49,
        Value: 7923
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 2373
    }], undefined)

    Test("one misc, one get item, one integer, one misc", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 2373
    }, {
        Type: "Misc D",
        StartIndex: 81,
        EndIndex: 98,
        Symbol: "Anything D",
        Misc: "Value D"
    }], undefined)

    Test("one misc, one get item, one integer, one get item", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 2373
    }, {
        Type: "GetItem",
        StartIndex: 81,
        EndIndex: 98,
        Symbol: "Anything D"
    }], undefined)

    Test("one misc, one get item, one integer, one integer", [{
        Type: "Misc A",
        StartIndex: 24,
        EndIndex: 35,
        Symbol: "Anything A",
        Misc: "Value A"
    }, {
        Type: "GetItem",
        StartIndex: 45,
        EndIndex: 49,
        Symbol: "Anything B"
    }, {
        Type: "Integer",
        StartIndex: 66,
        EndIndex: 72,
        Value: 2373
    }, {
        Type: "Integer",
        StartIndex: 81,
        EndIndex: 98,
        Value: 347
    }], undefined)
})