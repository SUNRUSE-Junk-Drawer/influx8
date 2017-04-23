it("ParseToTokens", () => {
    const Namespace = require("rewire")("../../Editor.js")
    const ParseToTokens = Namespace.__get__("ParseToTokens")
    Namespace.__set__("ParseUntypedTokens", (source) => {
        expect(source).toEqual("test source code")
        return ["test token a", "test token b", "test token c"]
    })
    Namespace.__set__("ParseTokens", (token) => {
        switch (token) {
            case "test token a": return ["test token aa", "test token ab"]
            case "test token b": return ["test token ba", "test token bb", "test token bc", "test token bd"]
            case "test token c": return ["test token ca", "test token cb", "test token cc"]
            default: fail("Unexpected token")
        }
    })
    expect(ParseToTokens("test source code")).toEqual(["test token aa", "test token ab", "test token ba", "test token bb", "test token bc", "test token bd", "test token ca", "test token cb", "test token cc"])
})