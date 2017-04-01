type UntypedUnary = "Not" | "Negate"

const UntypedUnarySymbols: { [symbol: string]: UntypedUnary } = {
    "!": "Not",
    "-": "Negate"
}

const UntypedUnaryKeywords: { [keyword: string]: UntypedUnary } = {
    "not": "Not"
}

const UntypedUnaryKeywordsAndSymbols: { [keywordOrSymbol: string]: UntypedUnary } = {}
for (const symbol in UntypedUnarySymbols) UntypedUnaryKeywordsAndSymbols[symbol] = UntypedUnarySymbols[symbol]
for (const keyword in UntypedUnaryKeywords) UntypedUnaryKeywordsAndSymbols[keyword] = UntypedUnaryKeywords[keyword]