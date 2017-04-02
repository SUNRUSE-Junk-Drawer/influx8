/// <reference path="SplitByWhiteSpace.ts" />
/// <reference path="ParseSymbol.ts" />
/// <reference path="UntypedBinary.ts" />
/// <reference path="UntypedUnary.ts" />

const Keywords: { [token: string]: SymbolTokenType } = {}
for (const keyword in UntypedUnaryKeywords) Keywords[keyword] = "Operator"
for (const keyword in UntypedBinaryKeywords) Keywords[keyword] = "Operator"

function ParseKeyword(token: UntypedToken): SymbolToken | undefined {
    if (Object.prototype.hasOwnProperty.call(Keywords, token.Text)) return {
        Type: Keywords[token.Text],
        StartIndex: token.StartIndex,
        Symbol: token.Text
    }

    return undefined
}