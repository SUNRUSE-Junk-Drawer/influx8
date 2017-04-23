describe("ParseFloatToken", () => {
    const ParseFloatToken = require("rewire")("../../Exports.js").__get__("ParseFloatToken")

    function Test(description, input, output) {
        it(description, () => {
            expect(ParseFloatToken({
                StartIndex: 32,
                Text: input
            })).toEqual(output)
        })
    }

    Test("unsigned nondigit", "g", undefined)
    Test("unsigned nondigits", "gefsefsef", undefined)
    Test("unsigned zero", "0", undefined)
    Test("unsigned zeroes", "00000", undefined)
    Test("unsigned zeroes point zeroes point zeroes", "00.000.000", undefined)
    Test("unsigned zeroes point zeroes point", "00.000.", undefined)
    Test("unsigned point zeroes point zeroes", ".000.000", undefined)

    Test("unsigned zero point zero", "0.0", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 34,
        Value: 0
    })

    Test("unsigned zeroes point zero", "0000.0", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 37,
        Value: 0
    })

    Test("unsigned zero point zeroes", "0.00000", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 38,
        Value: 0
    })

    Test("unsigned zeroes point zeroes", "00000.00000", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 42,
        Value: 0
    })

    Test("unsigned zero point", "0.", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 33,
        Value: 0
    })

    Test("unsigned zeroes point", "0000.", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 36,
        Value: 0
    })

    Test("unsigned digit point", "8.", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 33,
        Value: 8
    })

    Test("unsigned digits point", "324878.", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 38,
        Value: 324878
    })

    Test("unsigned digit zeroes point", "8000.", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 36,
        Value: 8000
    })

    Test("unsigned digits zeroes point", "324878000.", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 41,
        Value: 324878000
    })

    Test("unsigned zeroes digit point", "0008.", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 36,
        Value: 8
    })

    Test("unsigned zeroes digits point", "000324878.", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 41,
        Value: 324878
    })

    Test("unsigned zeroes digit zeroes point", "008000.", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 38,
        Value: 8000
    })

    Test("unsigned zeroes digits zeroes point", "00324878000.", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 43,
        Value: 324878000
    })

    Test("unsigned nondigit digits point", "g324878.", undefined)
    Test("unsigned digits nondigit digits point", "324g878.", undefined)
    Test("unsigned digits nondigit point", "324878g.", undefined)
    Test("unsigned nondigit point", "g.", undefined)

    Test("unsigned point zero", "0.", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 33,
        Value: 0
    })

    Test("unsigned point zeroes", ".0000", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 36,
        Value: 0
    })

    Test("unsigned point digit", ".8", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 33,
        Value: 0.8
    })

    Test("unsigned point digits", ".324878", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 38,
        Value: 0.324878
    })

    Test("unsigned point digit zeroes", ".8000", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 36,
        Value: 0.8
    })

    Test("unsigned point digits zeroes", ".324878000", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 41,
        Value: 0.324878
    })

    Test("unsigned point zeroes digit", ".0008", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 36,
        Value: 0.0008
    })

    Test("unsigned point zeroes digits", ".000324878", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 41,
        Value: 0.000324878
    })

    Test("unsigned point zeroes digit zeroes", ".008000", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 38,
        Value: 0.008
    })

    Test("unsigned point zeroes digits zeroes", ".00324878000", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 43,
        Value: 0.00324878
    })

    Test("unsigned point nondigit digits", ".g324878", undefined)
    Test("unsigned point digits nondigit digits", ".324g878", undefined)
    Test("unsigned point digits nondigit", ".324878g", undefined)
    Test("unsigned point nondigit", ".g", undefined)

    Test("unsigned digits point digits", "83479.23844", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 42,
        Value: 83479.23844
    })

    Test("unsigned zeroes digits point digits", "000083479.23844", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 46,
        Value: 83479.23844
    })

    Test("unsigned digits digits point digits", "8347900.23844", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 44,
        Value: 8347900.23844
    })

    Test("unsigned digits point zeroes digits", "83479.0023844", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 44,
        Value: 83479.0023844
    })

    Test("unsigned digits point digits", "83479.2384400", {
        Type: "Float",
        StartIndex: 32,
        EndIndex: 44,
        Value: 83479.23844
    })

    Test("unsigned digits point digits point", "83479.23844.", undefined)
    Test("unsigned digits point digits point digits", "83479.23844.123", undefined)
    Test("unsigned point digits point digits", ".83479.23844.", undefined)
    Test("unsigned digits point point digits point", "83479..23844", undefined)

    Test("unsigned nondigit digits point digits", "g83479.23844", undefined)
    Test("unsigned digits nondigit digits point digits", "234g83479.23844", undefined)
    Test("unsigned digits nondigit point digits", "83479g.23844", undefined)
    Test("unsigned digits point nondigit digits", "83479.g23844", undefined)
    Test("unsigned digits point digits nondigit digits", "83479.238g44", undefined)
    Test("unsigned digits point digits nondigits", "83479.23844g", undefined)


    Test("positive nondigit", "+g", undefined)
    Test("positive nondigits", "+gefsefsef", undefined)
    Test("positive zero", "+0", undefined)
    Test("positive zeroes", "+00000", undefined)
    Test("positive zeroes point zeroes point zeroes", "+00.000.000", undefined)
    Test("positive zeroes point zeroes point", "+00.000.", undefined)
    Test("positive point zeroes point zeroes", "+.000.000", undefined)
    Test("positive zero point zero", "+0.0", undefined)
    Test("positive zeroes point zero", "+0000.0", undefined)
    Test("positive zero point zeroes", "+0.00000", undefined)
    Test("positive zeroes point zeroes", "+00000.00000", undefined)
    Test("positive zero point", "+0.", undefined)
    Test("positive zeroes point", "+0000.", undefined)
    Test("positive digit point", "+8.", undefined)
    Test("positive digits point", "+324878.", undefined)
    Test("positive digit zeroes point", "+8000.", undefined)
    Test("positive digits zeroes point", "+324878000.", undefined)
    Test("positive zeroes digit point", "+0008.", undefined)
    Test("positive zeroes digits point", "+000324878.", undefined)
    Test("positive zeroes digit zeroes point", "+008000.", undefined)
    Test("positive zeroes digits zeroes point", "+00324878000.", undefined)
    Test("positive nondigit digits point", "+g324878.", undefined)
    Test("positive digits nondigit digits point", "+324g878.", undefined)
    Test("positive digits nondigit point", "+324878g.", undefined)
    Test("positive nondigit point", "+g.", undefined)
    Test("positive point zero", "+0.", undefined)
    Test("positive point zeroes", "+.0000", undefined)
    Test("positive point digit", "+.8", undefined)
    Test("positive point digits", "+.324878", undefined)
    Test("positive point digit zeroes", "+.8000", undefined)
    Test("positive point digits zeroes", "+.324878000", undefined)
    Test("positive point zeroes digit", "+.0008", undefined)
    Test("positive point zeroes digits", "+.000324878", undefined)
    Test("positive point zeroes digit zeroes", "+.008000", undefined)
    Test("positive point zeroes digits zeroes", "+.00324878000", undefined)
    Test("positive point nondigit digits", "+.g324878", undefined)
    Test("positive point digits nondigit digits", "+.324g878", undefined)
    Test("positive point digits nondigit", "+.324878g", undefined)
    Test("positive point nondigit", "+.g", undefined)
    Test("positive digits point digits", "+83479.23844", undefined)
    Test("positive zeroes digits point digits", "+000083479.23844", undefined)
    Test("positive digits digits point digits", "+8347900.23844", undefined)
    Test("positive digits point zeroes digits", "+83479.0023844", undefined)
    Test("positive digits point digits", "+83479.2384400", undefined)
    Test("positive digits point digits point", "+83479.23844.", undefined)
    Test("positive digits point digits point digits", "+83479.23844.123", undefined)
    Test("positive point digits point digits", "+.83479.23844.", undefined)
    Test("positive digits point point digits point", "+83479..23844", undefined)
    Test("positive nondigit digits point digits", "+g83479.23844", undefined)
    Test("positive digits nondigit digits point digits", "+234g83479.23844", undefined)
    Test("positive digits nondigit point digits", "+83479g.23844", undefined)
    Test("positive digits point nondigit digits", "+83479.g23844", undefined)
    Test("positive digits point digits nondigit digits", "+83479.238g44", undefined)
    Test("positive digits point digits nondigits", "+83479.23844g", undefined)

    Test("negative nondigit", "-g", undefined)
    Test("negative nondigits", "-gefsefsef", undefined)
    Test("negative zero", "-0", undefined)
    Test("negative zeroes", "-00000", undefined)
    Test("negative zeroes point zeroes point zeroes", "-00.000.000", undefined)
    Test("negative zeroes point zeroes point", "-00.000.", undefined)
    Test("negative point zeroes point zeroes", "-.000.000", undefined)
    Test("negative zero point zero", "-0.0", undefined)
    Test("negative zeroes point zero", "-0000.0", undefined)
    Test("negative zero point zeroes", "-0.00000", undefined)
    Test("negative zeroes point zeroes", "-00000.00000", undefined)
    Test("negative zero point", "-0.", undefined)
    Test("negative zeroes point", "-0000.", undefined)
    Test("negative digit point", "-8.", undefined)
    Test("negative digits point", "-324878.", undefined)
    Test("negative digit zeroes point", "-8000.", undefined)
    Test("negative digits zeroes point", "-324878000.", undefined)
    Test("negative zeroes digit point", "-0008.", undefined)
    Test("negative zeroes digits point", "-000324878.", undefined)
    Test("negative zeroes digit zeroes point", "-008000.", undefined)
    Test("negative zeroes digits zeroes point", "-00324878000.", undefined)
    Test("negative nondigit digits point", "-g324878.", undefined)
    Test("negative digits nondigit digits point", "-324g878.", undefined)
    Test("negative digits nondigit point", "-324878g.", undefined)
    Test("negative nondigit point", "-g.", undefined)
    Test("negative point zero", "-0.", undefined)
    Test("negative point zeroes", "-.0000", undefined)
    Test("negative point digit", "-.8", undefined)
    Test("negative point digits", "-.324878", undefined)
    Test("negative point digit zeroes", "-.8000", undefined)
    Test("negative point digits zeroes", "-.324878000", undefined)
    Test("negative point zeroes digit", "-.0008", undefined)
    Test("negative point zeroes digits", "-.000324878", undefined)
    Test("negative point zeroes digit zeroes", "-.008000", undefined)
    Test("negative point zeroes digits zeroes", "-.00324878000", undefined)
    Test("negative point nondigit digits", "-.g324878", undefined)
    Test("negative point digits nondigit digits", "-.324g878", undefined)
    Test("negative point digits nondigit", "-.324878g", undefined)
    Test("negative point nondigit", "-.g", undefined)
    Test("negative digits point digits", "-83479.23844", undefined)
    Test("negative zeroes digits point digits", "-000083479.23844", undefined)
    Test("negative digits digits point digits", "-8347900.23844", undefined)
    Test("negative digits point zeroes digits", "-83479.0023844", undefined)
    Test("negative digits point digits", "-83479.2384400", undefined)
    Test("negative digits point digits point", "-83479.23844.", undefined)
    Test("negative digits point digits point digits", "-83479.23844.123", undefined)
    Test("negative point digits point digits", "-.83479.23844.", undefined)
    Test("negative digits point point digits point", "-83479..23844", undefined)
    Test("negative nondigit digits point digits", "-g83479.23844", undefined)
    Test("negative digits nondigit digits point digits", "-234g83479.23844", undefined)
    Test("negative digits nondigit point digits", "-83479g.23844", undefined)
    Test("negative digits point nondigit digits", "-83479.g23844", undefined)
    Test("negative digits point digits nondigit digits", "-83479.238g44", undefined)
    Test("negative digits point digits nondigits", "-83479.23844g", undefined)
})