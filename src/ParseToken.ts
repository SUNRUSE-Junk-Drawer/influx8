/// <reference path="SplitByWhiteSpace.ts" />
/// <reference path="ParseBoolean.ts" />
/// <reference path="ParseInteger.ts" />
/// <reference path="ParseSymbol.ts" />

type Token = BooleanToken | IntegerToken | SymbolToken | UnknownToken

function ParseToken(token: UntypedToken): Token[] {
    const primitive = ParseBoolean(token) || ParseInteger(token)
    if (primitive) return [primitive]
    return ParseSymbol(token) || [{
        Type: "Unknown",
        StartIndex: token.StartIndex,
        Text: token.Text
    }]
}