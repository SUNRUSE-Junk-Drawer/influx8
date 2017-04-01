type UntypedUnary = "Not" | "Negate"

const UntypedUnarySymbols: {[operator in UntypedUnary]: string[]} = {
    Not: ["!"],
    Negate: ["-"],
}

const UntypedUnaryKeywords: {[operator in UntypedUnary]: string[]} = {
    Not: ["not"],
    Negate: []
}