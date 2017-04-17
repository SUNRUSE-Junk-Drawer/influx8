/// <reference path="Token.ts" />
/// <reference path="ParseBooleanToken.ts" />
/// <reference path="ParseIntegerToken.ts" />
/// <reference path="ParseSymbolTokens.ts" />
/// <reference path="ParseIdentifierToken.ts" />
/// <reference path="ParseKeywordToken.ts" />
/// <reference path="ParseFloatToken.ts" />

function ParseTokens(token: UntypedToken): UnparenthesizedToken[] {
    const primitive = ParseBooleanToken(token) || ParseIntegerToken(token) || ParseFloatToken(token) || ParseKeywordToken(token) || ParseIdentifierToken(token)
    if (primitive) return [primitive]
    return ParseSymbolTokens(token) || [{
        Type: "Unknown",
        StartIndex: token.StartIndex,
        EndIndex: token.StartIndex + token.Text.length - 1,
        Text: token.Text
    }]
}