describe("TypedUnary", () => {
    const Namespace = require("rewire")("../../Exports.js")

    const UnaryTypeMappings = Namespace.__get__("UnaryTypeMappings")

    function MapsArgumentType(untyped, primitive, typed) {
        it("maps \"" + untyped + "\" to \"" + typed + "\" when given primitive \"" + primitive + "\"", () => {
            expect(UnaryTypeMappings[untyped][primitive]).toEqual(typed)
        })
    }

    function DoesNotMapArgumentType(untyped, primitive) {
        it("does not map \"" + untyped + "\" when given primitive \"" + primitive + "\"", () => {
            expect(UnaryTypeMappings[untyped][primitive]).toBeUndefined()
        })
    }

    DoesNotMapArgumentType("Negate", "Boolean")
    MapsArgumentType("Not", "Boolean", "NotBoolean")
    MapsArgumentType("Negate", "Integer", "NegateInteger")
    DoesNotMapArgumentType("Not", "Integer")
    MapsArgumentType("Negate", "Float", "NegateFloat")
    DoesNotMapArgumentType("Not", "Float")

    const UnaryReturnTypes = Namespace.__get__("UnaryReturnTypes")

    function MapsReturnType(operator, primitive) {
        it("maps operator \"" + operator + "\" to primitive return type \"" + primitive + "\"", () => {
            expect(UnaryReturnTypes[operator]).toEqual(primitive)
        })
    }

    MapsReturnType("NegateInteger", "Integer")
    MapsReturnType("NegateFloat", "Float")
    MapsReturnType("NotBoolean", "Boolean")
    MapsReturnType("SineFloat", "Float")
    MapsReturnType("TangentFloat", "Float")
    MapsReturnType("LogarithmFloat", "Float")
})