/// <reference path="SplitByWhiteSpace.ts" />
/// <reference path="ParseSymbol.ts" />
/// <reference path="UntypedBinary.ts" />
/// <reference path="UntypedUnary.ts" />

function ParseKeyword(token: UntypedToken): SymbolToken | undefined {
    if (Object.prototype.hasOwnProperty.call(UntypedUnaryKeywords, token.Text) || Object.prototype.hasOwnProperty.call(UntypedBinaryKeywords, token.Text)) return {
        Type: "Operator",
        StartIndex: token.StartIndex,
        Symbol: token.Text
    }

    return undefined
}