/// <reference path="SplitByWhiteSpace.ts" />
/// <reference path="ParseSymbol.ts" />
/// <reference path="UntypedBinary.ts" />
/// <reference path="UntypedUnary.ts" />

function ParseKeyword(token: UntypedToken): SymbolToken | undefined {
    for (const operator in UntypedUnaryKeywords) for (const keyword of UntypedUnaryKeywords[operator as UntypedUnary]) if (keyword == token.Text) return {
        Type: "Operator",
        StartIndex: token.StartIndex,
        Symbol: token.Text
    }

    for (const operator in UntypedBinaryKeywords) for (const keyword of UntypedBinaryKeywords[operator as UntypedBinary]) if (keyword == token.Text) return {
        Type: "Operator",
        StartIndex: token.StartIndex,
        Symbol: token.Text
    }

    return undefined
}