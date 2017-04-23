describe("TypedBinary", () => {
    const Namespace = require("rewire")("../../Exports.js")

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
    DoesNotMapArgumentType("Concatenate", "Boolean")

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
    DoesNotMapArgumentType("Concatenate", "Integer")

    MapsArgumentType("Add", "Float", "AddFloat")
    MapsArgumentType("Subtract", "Float", "SubtractFloat")
    MapsArgumentType("Multiply", "Float", "MultiplyFloat")
    MapsArgumentType("Divide", "Float", "DivideFloat")
    DoesNotMapArgumentType("And", "Float")
    DoesNotMapArgumentType("Or", "Float")
    DoesNotMapArgumentType("Equal", "Float")
    DoesNotMapArgumentType("NotEqual", "Float")
    MapsArgumentType("GreaterThan", "Float", "GreaterThanFloat")
    DoesNotMapArgumentType("GreaterThanOrEqualTo", "Float")
    MapsArgumentType("LessThan", "Float", "LessThanFloat")
    DoesNotMapArgumentType("LessThanOrEqualTo", "Float")
    DoesNotMapArgumentType("Call", "Float")
    DoesNotMapArgumentType("Concatenate", "Float")

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
    MapsReturnType("AddFloat", "Float")
    MapsReturnType("SubtractFloat", "Float")
    MapsReturnType("MultiplyFloat", "Float")
    MapsReturnType("DivideFloat", "Float")
    MapsReturnType("GreaterThanFloat", "Boolean")
    MapsReturnType("LessThanFloat", "Boolean")

    const BinaryReversible = Namespace.__get__("BinaryReversible")

    function IsReversible(operator) {
        it("operator \"" + operator + "\" is reversible", () => expect(BinaryReversible[operator]).toBeTruthy())
    }

    function IsNotReversible(operator) {
        it("operator \"" + operator + "\" is not reversible", () => expect(BinaryReversible[operator]).toBeFalsy())
    }

    IsReversible("AndBoolean")
    IsReversible("OrBoolean")
    IsReversible("EqualBoolean")
    IsReversible("NotEqualBoolean")
    IsReversible("AddInteger")
    IsNotReversible("SubtractInteger")
    IsReversible("MultiplyInteger")
    IsReversible("EqualInteger")
    IsReversible("NotEqualInteger")
    IsNotReversible("GreaterThanInteger")
    IsNotReversible("GreaterThanOrEqualToInteger")
    IsNotReversible("LessThanInteger")
    IsNotReversible("LessThanOrEqualToInteger")
    IsReversible("AddFloat", "Float")
    IsNotReversible("SubtractFloat", "Float")
    IsReversible("MultiplyFloat", "Float")
    IsNotReversible("DivideFloat", "Float")
    IsNotReversible("GreaterThanFloat", "Boolean")
    IsNotReversible("LessThanFloat", "Boolean")
})