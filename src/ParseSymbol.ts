/// <reference path="ParseToken.ts" />
/// <reference path="UntypedUnary.ts" />
/// <reference path="UntypedBinary.ts" />

type SymbolTokenType = "OpeningParenthesis" | "ClosingParenthesis" | "Operator"

type SymbolToken = {
    Type: SymbolTokenType
    StartIndex: number
    EndIndex: number
    Symbol: string
}

type UnknownToken = {
    Type: "Unknown"
    StartIndex: number
    EndIndex: number
    Text: string
}

const Symbols: { [symbol: string]: SymbolTokenType } = {
    "(": "OpeningParenthesis",
    ")": "ClosingParenthesis"
}
for (const symbol in UntypedUnarySymbols) Symbols[symbol] = "Operator"
for (const symbol in UntypedBinarySymbols) Symbols[symbol] = "Operator"

function ParseSymbol(token: UntypedToken): Token[] | undefined {
    let longestSymbol: string | undefined = undefined
    let longestSymbolIndex = token.Text.length
    for (const symbol in Symbols) {
        const index = token.Text.indexOf(symbol)
        if (index == -1) continue
        if (index > longestSymbolIndex) continue
        if (index == longestSymbolIndex && longestSymbol && symbol.length < longestSymbol.length) continue
        longestSymbol = symbol
        longestSymbolIndex = index
    }
    if (!longestSymbol) return undefined
    const results: Token[] = []
    if (longestSymbolIndex > 0) for (const result of ParseToken({
        StartIndex: token.StartIndex,
        Text: token.Text.substring(0, longestSymbolIndex)
    })) results.push(result)
    results.push({
        Type: Symbols[longestSymbol],
        StartIndex: token.StartIndex + longestSymbolIndex,
        EndIndex: token.StartIndex + longestSymbolIndex + longestSymbol.length - 1,
        Symbol: longestSymbol
    })
    if (longestSymbolIndex + longestSymbol.length < token.Text.length) for (const result of ParseToken({
        StartIndex: token.StartIndex + longestSymbolIndex + longestSymbol.length,
        Text: token.Text.substring(longestSymbolIndex + longestSymbol.length)
    })) results.push(result)
    return results
}