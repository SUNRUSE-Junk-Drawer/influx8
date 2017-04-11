describe("CompileToJavaScript", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const CompileToJavaScript = Namespace.__get__("CompileToJavaScript")
    const JavaScriptUnarySymbolsOrKeywords = Namespace.__get__("JavaScriptUnarySymbolsOrKeywords")
    const JavaScriptBinarySymbolsOrKeywords = Namespace.__get__("JavaScriptBinarySymbolsOrKeywords")

    Namespace.__set__("JavaScriptUnarySymbolsOrKeywords", {
        "Test Red Herring A": "TestRedHerringValueA",
        "Test Unary Operator": "TestUnaryOperatorSymbolOrKeyword",
        "Test Red Herring B": "TestRedHerringValueB"
    })

    Namespace.__set__("JavaScriptBinarySymbolsOrKeywords", {
        "Test Red Herring A": "TestRedHerringValueA",
        "Test Binary Operator": "TestBinaryOperatorSymbolOrKeyword",
        "Test Red Herring B": "TestRedHerringValueB"
    })

    function Test(description, input, output, compileToJavaScript) {
        it(description, () => {
            Namespace.__set__("CompileToJavaScript", compileToJavaScript || fail)
            expect(CompileToJavaScript(input)).toEqual(output)
        })
    }

    Test("boolean true", {
        Type: "Boolean",
        Value: true
    }, "true")

    Test("boolean false", {
        Type: "Boolean",
        Value: false
    }, "false")

    Test("integer zero", {
        Type: "Integer",
        Value: 0
    }, "0")

    Test("integer positive", {
        Type: "Integer",
        Value: 467
    }, "467")

    Test("integer negative", {
        Type: "Integer",
        Value: -467
    }, "-467")

    Test("unary", {
        Type: "Unary",
        Operator: "Test Unary Operator",
        Operand: "Test Operand"
    }, "(TestUnaryOperatorSymbolOrKeywordTest Recursed Operand)", (expression) => {
        expect(expression).toEqual("Test Operand")
        return "Test Recursed Operand"
    })

    Test("binary", {
        Type: "Binary",
        Operator: "Test Binary Operator",
        Left: "Test Left",
        Right: "Test Right"
    }, "(Test Recursed Left TestBinaryOperatorSymbolOrKeyword Test Recursed Right)", (expression) => {
        switch (expression) {
            case "Test Left": return "Test Recursed Left"
            case "Test Right": return "Test Recursed Right"
            default: fail("unexpected expression")
        }
    })

    function MapsUnary(typedUnary, symbolOrKeyword) {
        it("maps typed unary \"" + typedUnary + "\" to symbol or keyword \"" + symbolOrKeyword + "\"", () => {
            expect(JavaScriptUnarySymbolsOrKeywords[typedUnary]).toEqual(symbolOrKeyword)
        })
    }

    MapsUnary("NotBoolean", "!")
    MapsUnary("NegateInteger", "-")

    function MapsBinary(typedBinary, symbolOrKeyword) {
        it("maps typed binary \"" + typedBinary + "\" to symbol or keyword \"" + symbolOrKeyword + "\"", () => {
            expect(JavaScriptBinarySymbolsOrKeywords[typedBinary]).toEqual(symbolOrKeyword)
        })
    }

    MapsBinary("AndBoolean", "&&")
    MapsBinary("OrBoolean", "||")
    MapsBinary("EqualBoolean", "==")
    MapsBinary("NotEqualBoolean", "!=")

    MapsBinary("AddInteger", "+")
    MapsBinary("SubtractInteger", "-")
    MapsBinary("MultiplyInteger", "*")
    MapsBinary("EqualInteger", "==")
    MapsBinary("NotEqualInteger", "!=")
    MapsBinary("GreaterThanInteger", ">")
    MapsBinary("LessThanInteger", "<")
    MapsBinary("GreaterThanOrEqualToInteger", ">=")
    MapsBinary("LessThanOrEqualToInteger", "<=")
})