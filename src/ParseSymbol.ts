/// <reference path="ParseToken.ts" />

type SymbolTokenType = "OpeningParenthesis" | "ClosingParenthesis"

type SymbolToken = {
    Type: SymbolTokenType
    StartIndex: number
    Symbol: string
}

type UnknownToken = {
    Type: "Unknown"
    StartIndex: number
    Text: string
}

const Symbols: { [symbol: string]: SymbolTokenType } = {
    "(": "OpeningParenthesis",
    ")": "ClosingParenthesis"
}

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
        Symbol: longestSymbol
    })
    if (longestSymbolIndex + longestSymbol.length < token.Text.length) for (const result of ParseToken({
        StartIndex: token.StartIndex + longestSymbolIndex + longestSymbol.length,
        Text: token.Text.substring(longestSymbolIndex + longestSymbol.length)
    })) results.push(result)
    return results
}