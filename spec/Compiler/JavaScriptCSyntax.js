describe("JavaScriptCSyntax", () => {
    const Namespace = require("rewire")("../../Exports.js")
    const Compile = Namespace.__get__("Compile")
    const JavaScriptCSyntax = Namespace.__get__("JavaScriptCSyntax")

    function Test(description, input, output) {
        it(description, () => {
            expect(Compile(input, JavaScriptCSyntax, {
                "testbvec4a": {
                    Type: "Parameter",
                    Name: "testbvec4a",
                    Primitive: "Boolean",
                    Plurality: 4
                },
                "testbvec4b": {
                    Type: "Parameter",
                    Name: "testbvec4b",
                    Primitive: "Boolean",
                    Plurality: 4
                },
                "testbvec3a": {
                    Type: "Parameter",
                    Name: "testbvec3a",
                    Primitive: "Boolean",
                    Plurality: 3
                },
                "testbvec3b": {
                    Type: "Parameter",
                    Name: "testbvec3b",
                    Primitive: "Boolean",
                    Plurality: 3
                },
                "testbvec2a": {
                    Type: "Parameter",
                    Name: "testbvec2a",
                    Primitive: "Boolean",
                    Plurality: 2
                },
                "testbvec2b": {
                    Type: "Parameter",
                    Name: "testbvec2b",
                    Primitive: "Boolean",
                    Plurality: 2
                },
                "testboola": {
                    Type: "Parameter",
                    Name: "testboola",
                    Primitive: "Boolean",
                    Plurality: 1
                },
                "testboolb": {
                    Type: "Parameter",
                    Name: "testboolb",
                    Primitive: "Boolean",
                    Plurality: 1
                },
                "testboolc": {
                    Type: "Parameter",
                    Name: "testboolc",
                    Primitive: "Boolean",
                    Plurality: 1
                },
                "testboold": {
                    Type: "Parameter",
                    Name: "testboold",
                    Primitive: "Boolean",
                    Plurality: 1
                },
                "testivec4a": {
                    Type: "Parameter",
                    Name: "testivec4a",
                    Primitive: "Integer",
                    Plurality: 4
                },
                "testivec4b": {
                    Type: "Parameter",
                    Name: "testivec4b",
                    Primitive: "Integer",
                    Plurality: 4
                },
                "testivec3a": {
                    Type: "Parameter",
                    Name: "testivec3a",
                    Primitive: "Integer",
                    Plurality: 3
                },
                "testivec3b": {
                    Type: "Parameter",
                    Name: "testivec3b",
                    Primitive: "Integer",
                    Plurality: 3
                },
                "testivec2a": {
                    Type: "Parameter",
                    Name: "testivec2a",
                    Primitive: "Integer",
                    Plurality: 2
                },
                "testivec2b": {
                    Type: "Parameter",
                    Name: "testivec2b",
                    Primitive: "Integer",
                    Plurality: 2
                },
                "testinta": {
                    Type: "Parameter",
                    Name: "testinta",
                    Primitive: "Integer",
                    Plurality: 1
                },
                "testintb": {
                    Type: "Parameter",
                    Name: "testintb",
                    Primitive: "Integer",
                    Plurality: 1
                },
                "testintc": {
                    Type: "Parameter",
                    Name: "testintc",
                    Primitive: "Integer",
                    Plurality: 1
                },
                "testintd": {
                    Type: "Parameter",
                    Name: "testintd",
                    Primitive: "Integer",
                    Plurality: 1
                },
                "testvec4a": {
                    Type: "Parameter",
                    Name: "testvec4a",
                    Primitive: "Float",
                    Plurality: 4
                },
                "testvec4b": {
                    Type: "Parameter",
                    Name: "testvec4b",
                    Primitive: "Float",
                    Plurality: 4
                },
                "testvec3a": {
                    Type: "Parameter",
                    Name: "testvec3a",
                    Primitive: "Float",
                    Plurality: 3
                },
                "testvec3b": {
                    Type: "Parameter",
                    Name: "testvec3b",
                    Primitive: "Float",
                    Plurality: 3
                },
                "testvec2a": {
                    Type: "Parameter",
                    Name: "testvec2a",
                    Primitive: "Float",
                    Plurality: 2
                },
                "testvec2b": {
                    Type: "Parameter",
                    Name: "testvec2b",
                    Primitive: "Float",
                    Plurality: 2
                },
                "testfloata": {
                    Type: "Parameter",
                    Name: "testfloata",
                    Primitive: "Float",
                    Plurality: 1
                },
                "testfloatb": {
                    Type: "Parameter",
                    Name: "testfloatb",
                    Primitive: "Float",
                    Plurality: 1
                },
                "testfloatc": {
                    Type: "Parameter",
                    Name: "testfloatc",
                    Primitive: "Float",
                    Plurality: 1
                },
                "testfloatd": {
                    Type: "Parameter",
                    Name: "testfloatd",
                    Primitive: "Float",
                    Plurality: 1
                }
            })).toEqual(output)
        })
    }

    Test("BooleanTrue", "true", "true")
    Test("BooleanFalse", "false", "false")
    Test("Integer", "3548", "3548")
    Test("Float", "35.48", "35.48")
    Test("BooleanScalarParameter", "testboola", "testboola")
    Test("BooleanVectorParameter", "testbvec4a#2", "testbvec4a[2]")
    Test("IntegerScalarParameter", "testinta", "testinta")
    Test("IntegerVectorParameter", "testivec4a#2", "testivec4a[2]")
    Test("FloatScalarParameter", "testfloata", "testfloata")
    Test("FloatVectorParameter", "testvec4a#2", "testvec4a[2]")
    Test("AndBool", "testboola and testboolb", "(testboola && testboolb)")
    Test("OrBool", "testboola or testboolb", "(testboola || testboolb)")
    Test("NotBool", "not testboola", "(!testboola)")
    Test("AddInteger", "testinta + testintb", "(testinta + testintb)")
    Test("SubtractInteger", "testinta - testintb", "(testinta - testintb)")
    Test("MultiplyInteger", "testinta * testintb", "(testinta * testintb)")
    Test("NegateInteger", "-testinta", "(-testinta)")
    Test("AddFloat", "testfloata + testfloatb", "(testfloata + testfloatb)")
    Test("SubtractFloat", "testfloata - testfloatb", "(testfloata - testfloatb)")
    Test("MultiplyFloat", "testfloata * testfloatb", "(testfloata * testfloatb)")
    Test("DivideFloat", "testfloata / testfloatb", "(testfloata / testfloatb)")
    Test("NegateFloat", "-testfloata", "(-testfloata)")
    Test("Float Vec2", "testfloata, testfloatb", "[testfloata, testfloatb]")
    Test("Float Vec3", "testfloata, testfloatb, testfloatc", "[testfloata, testfloatb, testfloatc]")
    Test("Float Vec4", "testfloata, testfloatb, testfloatc, testfloatd", "[testfloata, testfloatb, testfloatc, testfloatd]")
    Test("Int Vec2", "testinta, testintb", "[testinta, testintb]")
    Test("Int Vec3", "testinta, testintb, testintc", "[testinta, testintb, testintc]")
    Test("Int Vec4", "testinta, testintb, testintc, testintd", "[testinta, testintb, testintc, testintd]")
    Test("Bool Vec2", "testboola, testboolb", "[testboola, testboolb]")
    Test("Bool Vec3", "testboola, testboolb, testboolc", "[testboola, testboolb, testboolc]")
    Test("Bool Vec4", "testboola, testboolb, testboolc, testboold", "[testboola, testboolb, testboolc, testboold]")
    Test("Add Int IVec2", "testinta + testivec2a", "[(testinta + testivec2a[0]), (testinta + testivec2a[1])]")
    Test("Add Int IVec3", "testinta + testivec3a", "[(testinta + testivec3a[0]), (testinta + testivec3a[1]), (testinta + testivec3a[2])]")
    Test("Add Int IVec4", "testinta + testivec4a", "[(testinta + testivec4a[0]), (testinta + testivec4a[1]), (testinta + testivec4a[2]), (testinta + testivec4a[3])]")
    Test("Add IVec2 Int", "testivec2a + testinta", "[(testivec2a[0] + testinta), (testivec2a[1] + testinta)]")
    Test("Add IVec3 Int", "testivec3a + testinta", "[(testivec3a[0] + testinta), (testivec3a[1] + testinta), (testivec3a[2] + testinta)]")
    Test("Add IVec4 Int", "testivec4a + testinta", "[(testivec4a[0] + testinta), (testivec4a[1] + testinta), (testivec4a[2] + testinta), (testivec4a[3] + testinta)]")
    Test("Add IVec2 IVec2", "testivec2a + testivec2b", "[(testivec2a[0] + testivec2b[0]), (testivec2a[1] + testivec2b[1])]")
    Test("Add IVec3 IVec3", "testivec3a + testivec3b", "[(testivec3a[0] + testivec3b[0]), (testivec3a[1] + testivec3b[1]), (testivec3a[2] + testivec3b[2])]")
    Test("Add IVec4 IVec4", "testivec4a + testivec4b", "[(testivec4a[0] + testivec4b[0]), (testivec4a[1] + testivec4b[1]), (testivec4a[2] + testivec4b[2]), (testivec4a[3] + testivec4b[3])]")
    Test("Subtract Int IVec2", "testinta - testivec2a", "[(testinta - testivec2a[0]), (testinta - testivec2a[1])]")
    Test("Subtract Int IVec3", "testinta - testivec3a", "[(testinta - testivec3a[0]), (testinta - testivec3a[1]), (testinta - testivec3a[2])]")
    Test("Subtract Int IVec4", "testinta - testivec4a", "[(testinta - testivec4a[0]), (testinta - testivec4a[1]), (testinta - testivec4a[2]), (testinta - testivec4a[3])]")
    Test("Subtract IVec2 Int", "testivec2a - testinta", "[(testivec2a[0] - testinta), (testivec2a[1] - testinta)]")
    Test("Subtract IVec3 Int", "testivec3a - testinta", "[(testivec3a[0] - testinta), (testivec3a[1] - testinta), (testivec3a[2] - testinta)]")
    Test("Subtract IVec4 Int", "testivec4a - testinta", "[(testivec4a[0] - testinta), (testivec4a[1] - testinta), (testivec4a[2] - testinta), (testivec4a[3] - testinta)]")
    Test("Subtract IVec2 IVec2", "testivec2a - testivec2b", "[(testivec2a[0] - testivec2b[0]), (testivec2a[1] - testivec2b[1])]")
    Test("Subtract IVec3 IVec3", "testivec3a - testivec3b", "[(testivec3a[0] - testivec3b[0]), (testivec3a[1] - testivec3b[1]), (testivec3a[2] - testivec3b[2])]")
    Test("Subtract IVec4 IVec4", "testivec4a - testivec4b", "[(testivec4a[0] - testivec4b[0]), (testivec4a[1] - testivec4b[1]), (testivec4a[2] - testivec4b[2]), (testivec4a[3] - testivec4b[3])]")
    Test("Multiply Int IVec2", "testinta * testivec2a", "[(testinta * testivec2a[0]), (testinta * testivec2a[1])]")
    Test("Multiply Int IVec3", "testinta * testivec3a", "[(testinta * testivec3a[0]), (testinta * testivec3a[1]), (testinta * testivec3a[2])]")
    Test("Multiply Int IVec4", "testinta * testivec4a", "[(testinta * testivec4a[0]), (testinta * testivec4a[1]), (testinta * testivec4a[2]), (testinta * testivec4a[3])]")
    Test("Multiply IVec2 Int", "testivec2a * testinta", "[(testivec2a[0] * testinta), (testivec2a[1] * testinta)]")
    Test("Multiply IVec3 Int", "testivec3a * testinta", "[(testivec3a[0] * testinta), (testivec3a[1] * testinta), (testivec3a[2] * testinta)]")
    Test("Multiply IVec4 Int", "testivec4a * testinta", "[(testivec4a[0] * testinta), (testivec4a[1] * testinta), (testivec4a[2] * testinta), (testivec4a[3] * testinta)]")
    Test("Multiply IVec2 IVec2", "testivec2a * testivec2b", "[(testivec2a[0] * testivec2b[0]), (testivec2a[1] * testivec2b[1])]")
    Test("Multiply IVec3 IVec3", "testivec3a * testivec3b", "[(testivec3a[0] * testivec3b[0]), (testivec3a[1] * testivec3b[1]), (testivec3a[2] * testivec3b[2])]")
    Test("Multiply IVec4 IVec4", "testivec4a * testivec4b", "[(testivec4a[0] * testivec4b[0]), (testivec4a[1] * testivec4b[1]), (testivec4a[2] * testivec4b[2]), (testivec4a[3] * testivec4b[3])]")
    Test("Add Float Vec2", "testfloata + testvec2a", "[(testfloata + testvec2a[0]), (testfloata + testvec2a[1])]")
    Test("Add Float Vec3", "testfloata + testvec3a", "[(testfloata + testvec3a[0]), (testfloata + testvec3a[1]), (testfloata + testvec3a[2])]")
    Test("Add Float Vec4", "testfloata + testvec4a", "[(testfloata + testvec4a[0]), (testfloata + testvec4a[1]), (testfloata + testvec4a[2]), (testfloata + testvec4a[3])]")
    Test("Add Vec2 Float", "testvec2a + testfloata", "[(testvec2a[0] + testfloata), (testvec2a[1] + testfloata)]")
    Test("Add Vec3 Float", "testvec3a + testfloata", "[(testvec3a[0] + testfloata), (testvec3a[1] + testfloata), (testvec3a[2] + testfloata)]")
    Test("Add Vec4 Float", "testvec4a + testfloata", "[(testvec4a[0] + testfloata), (testvec4a[1] + testfloata), (testvec4a[2] + testfloata), (testvec4a[3] + testfloata)]")
    Test("Add Vec2 Vec2", "testvec2a + testvec2b", "[(testvec2a[0] + testvec2b[0]), (testvec2a[1] + testvec2b[1])]")
    Test("Add Vec3 Vec3", "testvec3a + testvec3b", "[(testvec3a[0] + testvec3b[0]), (testvec3a[1] + testvec3b[1]), (testvec3a[2] + testvec3b[2])]")
    Test("Add Vec4 Vec4", "testvec4a + testvec4b", "[(testvec4a[0] + testvec4b[0]), (testvec4a[1] + testvec4b[1]), (testvec4a[2] + testvec4b[2]), (testvec4a[3] + testvec4b[3])]")
    Test("Subtract Float Vec2", "testfloata - testvec2a", "[(testfloata - testvec2a[0]), (testfloata - testvec2a[1])]")
    Test("Subtract Float Vec3", "testfloata - testvec3a", "[(testfloata - testvec3a[0]), (testfloata - testvec3a[1]), (testfloata - testvec3a[2])]")
    Test("Subtract Float Vec4", "testfloata - testvec4a", "[(testfloata - testvec4a[0]), (testfloata - testvec4a[1]), (testfloata - testvec4a[2]), (testfloata - testvec4a[3])]")
    Test("Subtract Vec2 Float", "testvec2a - testfloata", "[(testvec2a[0] - testfloata), (testvec2a[1] - testfloata)]")
    Test("Subtract Vec3 Float", "testvec3a - testfloata", "[(testvec3a[0] - testfloata), (testvec3a[1] - testfloata), (testvec3a[2] - testfloata)]")
    Test("Subtract Vec4 Float", "testvec4a - testfloata", "[(testvec4a[0] - testfloata), (testvec4a[1] - testfloata), (testvec4a[2] - testfloata), (testvec4a[3] - testfloata)]")
    Test("Subtract Vec2 Vec2", "testvec2a - testvec2b", "[(testvec2a[0] - testvec2b[0]), (testvec2a[1] - testvec2b[1])]")
    Test("Subtract Vec3 Vec3", "testvec3a - testvec3b", "[(testvec3a[0] - testvec3b[0]), (testvec3a[1] - testvec3b[1]), (testvec3a[2] - testvec3b[2])]")
    Test("Subtract Vec4 Vec4", "testvec4a - testvec4b", "[(testvec4a[0] - testvec4b[0]), (testvec4a[1] - testvec4b[1]), (testvec4a[2] - testvec4b[2]), (testvec4a[3] - testvec4b[3])]")
    Test("Multiply Float Vec2", "testfloata * testvec2a", "[(testfloata * testvec2a[0]), (testfloata * testvec2a[1])]")
    Test("Multiply Float Vec3", "testfloata * testvec3a", "[(testfloata * testvec3a[0]), (testfloata * testvec3a[1]), (testfloata * testvec3a[2])]")
    Test("Multiply Float Vec4", "testfloata * testvec4a", "[(testfloata * testvec4a[0]), (testfloata * testvec4a[1]), (testfloata * testvec4a[2]), (testfloata * testvec4a[3])]")
    Test("Multiply Vec2 Float", "testvec2a * testfloata", "[(testvec2a[0] * testfloata), (testvec2a[1] * testfloata)]")
    Test("Multiply Vec3 Float", "testvec3a * testfloata", "[(testvec3a[0] * testfloata), (testvec3a[1] * testfloata), (testvec3a[2] * testfloata)]")
    Test("Multiply Vec4 Float", "testvec4a * testfloata", "[(testvec4a[0] * testfloata), (testvec4a[1] * testfloata), (testvec4a[2] * testfloata), (testvec4a[3] * testfloata)]")
    Test("Multiply Vec2 Vec2", "testvec2a * testvec2b", "[(testvec2a[0] * testvec2b[0]), (testvec2a[1] * testvec2b[1])]")
    Test("Multiply Vec3 Vec3", "testvec3a * testvec3b", "[(testvec3a[0] * testvec3b[0]), (testvec3a[1] * testvec3b[1]), (testvec3a[2] * testvec3b[2])]")
    Test("Multiply Vec4 Vec4", "testvec4a * testvec4b", "[(testvec4a[0] * testvec4b[0]), (testvec4a[1] * testvec4b[1]), (testvec4a[2] * testvec4b[2]), (testvec4a[3] * testvec4b[3])]")
    Test("Divide Float Vec2", "testfloata / testvec2a", "[(testfloata / testvec2a[0]), (testfloata / testvec2a[1])]")
    Test("Divide Float Vec3", "testfloata / testvec3a", "[(testfloata / testvec3a[0]), (testfloata / testvec3a[1]), (testfloata / testvec3a[2])]")
    Test("Divide Float Vec4", "testfloata / testvec4a", "[(testfloata / testvec4a[0]), (testfloata / testvec4a[1]), (testfloata / testvec4a[2]), (testfloata / testvec4a[3])]")
    Test("Divide Vec2 Float", "testvec2a / testfloata", "[(testvec2a[0] / testfloata), (testvec2a[1] / testfloata)]")
    Test("Divide Vec3 Float", "testvec3a / testfloata", "[(testvec3a[0] / testfloata), (testvec3a[1] / testfloata), (testvec3a[2] / testfloata)]")
    Test("Divide Vec4 Float", "testvec4a / testfloata", "[(testvec4a[0] / testfloata), (testvec4a[1] / testfloata), (testvec4a[2] / testfloata), (testvec4a[3] / testfloata)]")
    Test("Divide Vec2 Vec2", "testvec2a / testvec2b", "[(testvec2a[0] / testvec2b[0]), (testvec2a[1] / testvec2b[1])]")
    Test("Divide Vec3 Vec3", "testvec3a / testvec3b", "[(testvec3a[0] / testvec3b[0]), (testvec3a[1] / testvec3b[1]), (testvec3a[2] / testvec3b[2])]")
    Test("Divide Vec4 Vec4", "testvec4a / testvec4b", "[(testvec4a[0] / testvec4b[0]), (testvec4a[1] / testvec4b[1]), (testvec4a[2] / testvec4b[2]), (testvec4a[3] / testvec4b[3])]")
    Test("Not BVec2", "not testbvec2a", "[(!testbvec2a[0]), (!testbvec2a[1])]")
    Test("Not BVec3", "not testbvec3a", "[(!testbvec3a[0]), (!testbvec3a[1]), (!testbvec3a[2])]")
    Test("Not BVec4", "not testbvec4a", "[(!testbvec4a[0]), (!testbvec4a[1]), (!testbvec4a[2]), (!testbvec4a[3])]")
    Test("Negate IVec2", "-testivec2a", "[(-testivec2a[0]), (-testivec2a[1])]")
    Test("Negate IVec3", "-testivec3a", "[(-testivec3a[0]), (-testivec3a[1]), (-testivec3a[2])]")
    Test("Negate IVec4", "-testivec4a", "[(-testivec4a[0]), (-testivec4a[1]), (-testivec4a[2]), (-testivec4a[3])]")
    Test("Negate Vec2", "-testvec2a", "[(-testvec2a[0]), (-testvec2a[1])]")
    Test("Negate Vec3", "-testvec3a", "[(-testvec3a[0]), (-testvec3a[1]), (-testvec3a[2])]")
    Test("Negate Vec4", "-testvec4a", "[(-testvec4a[0]), (-testvec4a[1]), (-testvec4a[2]), (-testvec4a[3])]")
})