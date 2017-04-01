type UntypedUnary = "Not" | "Negate"

const UntypedUnarySymbols: { [symbol: string]: UntypedUnary } = {
    "!": "Not",
    "-": "Negate"
}

const UntypedUnaryKeywords: { [keyword: string]: UntypedUnary } = {
    "not": "Not"
}