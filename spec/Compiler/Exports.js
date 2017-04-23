describe("exports", () => {
    const Namespace = require("rewire")("../../Exports.js")
    function Exports(name) {
        it(name, () => expect(Namespace[name]).toBe(Namespace.__get__(name)))
    }

    Exports("Compile")
    Exports("GLSLCSyntax")
    Exports("JavaScriptCSyntax")
    Exports("ParseUntypedTokens")
    Exports("ParseTokens")
    Exports("ParenthesizeTokens")
    Exports("ParseExpression")
    Exports("InlineExpression")
    Exports("UnrollExpression")
    Exports("TypecheckExpression")
    Exports("VerifyExpression")
    Exports("MatchCSyntax")
    Exports("GenerateCSyntax")
})