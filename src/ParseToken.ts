/// <reference path="Token.ts" />
/// <reference path="ParseBoolean.ts" />
/// <reference path="ParseInteger.ts" />
/// <reference path="ParseSymbol.ts" />
/// <reference path="ParseIdentifier.ts" />
/// <reference path="ParseKeyword.ts" />

function ParseToken(token: UntypedToken): Token[] {
    const primitive = ParseBoolean(token) || ParseInteger(token) || ParseKeyword(token) || ParseIdentifier(token)
    if (primitive) return [primitive]
    return ParseSymbol(token) || [{
        Type: "Unknown",
        StartIndex: token.StartIndex,
        EndIndex: token.StartIndex + token.Text.length - 1,
        Text: token.Text
    }]
}