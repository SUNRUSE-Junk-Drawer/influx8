describe("JavaScriptCSyntax", () => {
    const Namespace = require("rewire")("../dist/index.js")
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
    Test("BooleanVectorParameter", "testbvec4a::2", "testbvec4a[2]")
    Test("IntegerScalarParameter", "testinta", "testinta")
    Test("IntegerVectorParameter", "testivec4a::2", "testivec4a[2]")
    Test("FloatScalarParameter", "testfloata", "testfloata")
    Test("FloatVectorParameter", "testvec4a::2", "testvec4a[2]")
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
})