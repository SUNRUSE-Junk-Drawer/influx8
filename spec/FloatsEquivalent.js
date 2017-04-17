describe("FloatsEquivalent", () => {
    const FloatsEquivalent = require("rewire")("../dist/index.js").__get__("FloatsEquivalent")

    function Test(description, a, b, output) {
        it(description, () => {
            expect(FloatsEquivalent(a, b)).toEqual(output)
        })
    }

    Test("zero zero", 0, 0, true)
    Test("zero close to zero", 0, 0.00001, true)
    Test("close to zero zero", 0.00001, 0, true)
    Test("zero further from zero", 0, 0.0001, false)
    Test("further from zero zero", 0.0001, 0, false)
    Test("further from zero further from zero", 0.0001, 0.0001, true)
    Test("further from zero close to further from zero", 0.0001, 0.00011, true)
    Test("close to further from zero further from zero", 0.00011, 0.0001, true)
    Test("further from further from zero further from zero", 0.0002, 0.0001, false)
    Test("further from zero further from further from zero", 0.0001, 0.0002, false)
    Test("further from further from zero further from further from zero", 0.0002, 0.0002, true)
    Test("close to further from further from zero further from further from zero", 0.00021, 0.0002, true)
    Test("further from further from zero close to further from further from zero", 0.0002, 0.00021, true)
    Test("NaN NaN", NaN, NaN, false) // I don't really agree with this, but it will be consistent with what compile targets do.
    Test("zero NaN", 0, NaN, false)
    Test("NaN zero", NaN, 0, false)
    Test("non-zero NaN", 2.4, NaN, false)
    Test("NaN non-zero", NaN, 2.4, false)
    Test("Infinity NaN", Infinity, NaN, false)
    Test("NaN Infinity", NaN, Infinity, false)
    Test("Infinity Infinity", Infinity, Infinity, true)
    Test("zero Infinity", 0, Infinity, false)
    Test("Infinity zero", Infinity, 0, false)
    Test("non-zero Infinity", 2.4, Infinity, false)
    Test("Infinity non-zero", Infinity, 2.4, false)
})