describe("ParseInteger", function () {
    const ParseInteger = require("rewire")("../dist/index.js").__get__("ParseInteger")

    function Test(description, input, output) {
        it(description, function () {
            expect(ParseInteger({
                StartIndex: 32,
                Text: input
            })).toEqual(output)
        })
    }

    Test("unsigned zero", "0", {
        Type: "Integer",
        StartIndex: 32,
        Value: 0
    })
    Test("unsigned zeroes", "0000", {
        Type: "Integer",
        StartIndex: 32,
        Value: 0
    })
    Test("unsigned single digit", "4", {
        Type: "Integer",
        StartIndex: 32,
        Value: 4
    })
    Test("unsigned digits", "764", {
        Type: "Integer",
        StartIndex: 32,
        Value: 764
    })
    Test("unsigned digits with preceding zeroes", "00582", {
        Type: "Integer",
        StartIndex: 32,
        Value: 00582
    })
    Test("unsigned digits with trailing zeroes", "7854400", {
        Type: "Integer",
        StartIndex: 32,
        Value: 7854400
    })
    Test("unsigned nondigit", "g", undefined)
    Test("unsigned nondigit between digits", "77g640", undefined)
    Test("unsigned nondigit before digits", "g640", undefined)
    Test("unsigned nondigit after digits", "640g", undefined)

    Test("positive zero", "+0", {
        Type: "Integer",
        StartIndex: 32,
        Value: 0
    })
    Test("positive zeroes", "+0000", {
        Type: "Integer",
        StartIndex: 32,
        Value: 0
    })
    Test("positive single digit", "+4", {
        Type: "Integer",
        StartIndex: 32,
        Value: 4
    })
    Test("positive digits", "+764", {
        Type: "Integer",
        StartIndex: 32,
        Value: 764
    })
    Test("positive digits with preceding zeroes", "+00582", {
        Type: "Integer",
        StartIndex: 32,
        Value: 00582
    })
    Test("positive digits with trailing zeroes", "+7854400", {
        Type: "Integer",
        StartIndex: 32,
        Value: 7854400
    })
    Test("positive nondigit", "+g", undefined)
    Test("positive nondigit between digits", "+77g640", undefined)
    Test("positive nondigit before digits", "+g640", undefined)
    Test("positive nondigit after digits", "+640g", undefined)
    Test("positive nondigit before sign", "g+640", undefined)
    Test("positive digit before sign", "7+640", undefined)

    Test("negative zero", "-0", {
        Type: "Integer",
        StartIndex: 32,
        Value: 0
    })
    Test("negative zeroes", "-0000", {
        Type: "Integer",
        StartIndex: 32,
        Value: 0
    })
    Test("negative single digit", "-4", {
        Type: "Integer",
        StartIndex: 32,
        Value: -4
    })
    Test("negative digits", "-764", {
        Type: "Integer",
        StartIndex: 32,
        Value: -764
    })
    Test("negative digits with preceding zeroes", "-00582", {
        Type: "Integer",
        StartIndex: 32,
        Value: -00582
    })
    Test("negative digits with trailing zeroes", "-7854400", {
        Type: "Integer",
        StartIndex: 32,
        Value: -7854400
    })
    Test("negative nondigit", "-g", undefined)
    Test("negative nondigit between digits", "-77g640", undefined)
    Test("negative nondigit before digits", "-g640", undefined)
    Test("negative nondigit after digits", "-640g", undefined)
    Test("negative nondigit before sign", "g-640", undefined)
    Test("negative digit before sign", "7-640", undefined)
})