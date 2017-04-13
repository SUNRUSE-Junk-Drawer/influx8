describe("TypedBinary", () => {
    const Namespace = require("rewire")("../dist/index.js")

    const BinaryTypeMappings = Namespace.__get__("BinaryTypeMappings")

    function MapsArgumentType(untyped, primitive, typed) {
        it("maps \"" + untyped + "\" to \"" + typed + "\" when given primitive \"" + primitive + "\"", () => {
            expect(BinaryTypeMappings[untyped][primitive]).toEqual(typed)
        })
    }

    function DoesNotMapArgumentType(untyped, primitive) {
        it("does not map \"" + untyped + "\" when given primitive \"" + primitive + "\"", () => {
            expect(BinaryTypeMappings[untyped][primitive]).toBeUndefined()
        })
    }

    DoesNotMapArgumentType("Add", "Boolean")
    DoesNotMapArgumentType("Subtract", "Boolean")
    DoesNotMapArgumentType("Multiply", "Boolean")
    DoesNotMapArgumentType("Divide", "Boolean")
    MapsArgumentType("And", "Boolean", "AndBoolean")
    MapsArgumentType("Or", "Boolean", "OrBoolean")
    MapsArgumentType("Equal", "Boolean", "EqualBoolean")
    MapsArgumentType("NotEqual", "Boolean", "NotEqualBoolean")
    DoesNotMapArgumentType("GreaterThan", "Boolean")
    DoesNotMapArgumentType("GreaterThanOrEqualTo", "Boolean")
    DoesNotMapArgumentType("LessThan", "Boolean")
    DoesNotMapArgumentType("LessThanOrEqualTo", "Boolean")
    DoesNotMapArgumentType("Call", "Boolean")

    MapsArgumentType("Add", "Integer", "AddInteger")
    MapsArgumentType("Subtract", "Integer", "SubtractInteger")
    MapsArgumentType("Multiply", "Integer", "MultiplyInteger")
    DoesNotMapArgumentType("Divide", "Integer")
    DoesNotMapArgumentType("And", "Integer")
    DoesNotMapArgumentType("Or", "Integer")
    MapsArgumentType("Equal", "Integer", "EqualInteger")
    MapsArgumentType("NotEqual", "Integer", "NotEqualInteger")
    MapsArgumentType("GreaterThan", "Integer", "GreaterThanInteger")
    MapsArgumentType("GreaterThanOrEqualTo", "Integer", "GreaterThanOrEqualToInteger")
    MapsArgumentType("LessThan", "Integer", "LessThanInteger")
    MapsArgumentType("LessThanOrEqualTo", "Integer", "LessThanOrEqualToInteger")
    DoesNotMapArgumentType("Call", "Integer")

    const BinaryReturnTypes = Namespace.__get__("BinaryReturnTypes")

    function MapsReturnType(operator, primitive) {
        it("maps operator \"" + operator + "\" to primitive return type \"" + primitive + "\"", () => {
            expect(BinaryReturnTypes[operator]).toEqual(primitive)
        })
    }

    MapsReturnType("AndBoolean", "Boolean")
    MapsReturnType("OrBoolean", "Boolean")
    MapsReturnType("EqualBoolean", "Boolean")
    MapsReturnType("NotEqualBoolean", "Boolean")
    MapsReturnType("AddInteger", "Integer")
    MapsReturnType("SubtractInteger", "Integer")
    MapsReturnType("MultiplyInteger", "Integer")
    MapsReturnType("EqualInteger", "Boolean")
    MapsReturnType("NotEqualInteger", "Boolean")
    MapsReturnType("GreaterThanInteger", "Boolean")
    MapsReturnType("GreaterThanOrEqualToInteger", "Boolean")
    MapsReturnType("LessThanInteger", "Boolean")
    MapsReturnType("LessThanOrEqualToInteger", "Boolean")
})