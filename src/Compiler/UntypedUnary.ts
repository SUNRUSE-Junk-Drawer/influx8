type UntypedUnary = "Not" | "Negate" | "Sine" | "Tangent" | "Logarithm"

const UntypedUnarySymbols: { [symbol: string]: UntypedUnary } = {
    "!": "Not",
    "-": "Negate"
}

const UntypedUnaryKeywords: { [keyword: string]: UntypedUnary } = {
    "not": "Not",
    "sin": "Sine",
    "tan": "Tangent",
    "log": "Logarithm"
}

const UntypedUnaryKeywordsAndSymbols: { [keywordOrSymbol: string]: UntypedUnary } = {}
for (const symbol in UntypedUnarySymbols) UntypedUnaryKeywordsAndSymbols[symbol] = UntypedUnarySymbols[symbol]
for (const keyword in UntypedUnaryKeywords) UntypedUnaryKeywordsAndSymbols[keyword] = UntypedUnaryKeywords[keyword]