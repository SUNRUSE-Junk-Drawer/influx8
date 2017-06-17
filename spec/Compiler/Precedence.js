describe("Precedence", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const Precedence = Namespace.__get__("Precedence")

    describe("includes", () => {
        function Run(type, source, allowedTypes) {
            describe(type.toLowerCase(), () => {
                const symbols = Namespace.__get__("Untyped" + type + source)
                for (const key in symbols) {
                    it("\"" + symbols[key] + "\" once", () => {
                        let count = 0
                        Precedence.forEach(level => {
                            if (allowedTypes.indexOf(level.Type) != -1 && level.Operators.indexOf(symbols[key]) != -1) count++
                        })
                        expect(count).toEqual(1)
                    })
                }
            })
        }

        Run("Unary", "Symbols", ["Unary"])
        Run("Unary", "Keywords", ["Unary"])
        Run("Binary", "Symbols", ["BinaryLeftToRight", "BinaryRightToLeft"])
        Run("Binary", "Keywords", ["BinaryLeftToRight", "BinaryRightToLeft"])
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

    Order("Call", "Concatenate")
    Order("Concatenate", "And")
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
    SameLevel("Negate", "Sine")
    SameLevel("Negate", "Tangent")
    SameLevel("Negate", "Logarithm")

    function Type(operator, type) {
        it("defines \"" + operator + "\" as \"" + type + "\"", () => {
            expect(Precedence[LevelOf(operator)].Type).toEqual(type)
        })
    }

    Type("And", "BinaryLeftToRight")
    Type("Not", "Unary")
    Type("Or", "BinaryLeftToRight")
    Type("Equal", "BinaryLeftToRight")
    Type("NotEqual", "BinaryLeftToRight")
    Type("GreaterThan", "BinaryLeftToRight")
    Type("GreaterThanOrEqualTo", "BinaryLeftToRight")
    Type("LessThan", "BinaryLeftToRight")
    Type("LessThanOrEqualTo", "BinaryLeftToRight")
    Type("Call", "BinaryRightToLeft")
    Type("Concatenate", "BinaryLeftToRight")
    Type("Subtract", "BinaryLeftToRight")
    Type("Add", "BinaryLeftToRight")
    Type("Multiply", "BinaryLeftToRight")
    Type("Divide", "BinaryLeftToRight")
    Type("Negate", "Unary")
})