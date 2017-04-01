describe("Precedence", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const Precedence = Namespace.__get__("Precedence")

    describe("includes", () => {
        function Run(type, source) {
            describe(type.toLowerCase(), () => {
                const symbols = Namespace.__get__("Untyped" + type + source)
                for (const key in symbols) {
                    it("\"" + symbols[key] + "\" once", () => {
                        let count = 0
                        Precedence.forEach(level => {
                            if (level.Type == type && level.Operators.indexOf(symbols[key]) != -1) count++
                        })
                        expect(count).toEqual(1)
                    })
                }
            })
        }

        Run("Unary", "Symbols")
        Run("Unary", "Keywords")
        Run("Binary", "Symbols")
        Run("Binary", "Keywords")
    })

    function LevelOf(operator) {
        for (let i = 0; i < Precedence.length; i++) if (Precedence[i].Operators.indexOf(operator) != -1) return i
    }

    function SameLevel(a, b) {
        it("places \"" + a + "\" and \"" + b + "\" at the same level", () => expect(LevelOf(a)).toEqual(LevelOf(b)))
    }

    function Order(over, under) {
        it("places \"" + over + "\" over \"" + under + "\"", () => expect(LevelOf(over) < LevelOf(under)).toBeTruthy())
    }

    Order("And", "Not")
    Order("Not", "Or")
    Order("Or", "Equal")
    SameLevel("Equal", "NotEqual")
    SameLevel("Equal", "GreaterThan")
    SameLevel("Equal", "LessThan")
    SameLevel("Equal", "GreaterThanOrEqualTo")
    SameLevel("Equal", "LessThanOrEqualTo")
    Order("Equal", "Subtract")
    Order("Subtract", "Add")
    Order("Add", "Multiply")
    Order("Multiply", "Divide")
    Order("Divide", "Negate")
})