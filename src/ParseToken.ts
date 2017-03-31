/// <reference path="SplitByWhiteSpace.ts" />
/// <reference path="ParseBoolean.ts" />
/// <reference path="ParseInteger.ts" />
/// <reference path="ParseSymbol.ts" />
/// <reference path="ParseIdentifier.ts" />

type Token = BooleanToken | IntegerToken | IdentifierToken | SymbolToken | UnknownToken

function ParseToken(token: UntypedToken): Token[] {
    const primitive = ParseBoolean(token) || ParseInteger(token) || ParseIdentifier(token)
    if (primitive) return [primitive]
    return ParseSymbol(token) || [{
        Type: "Unknown",
        StartIndex: token.StartIndex,
        Text: token.Text
    }]
}