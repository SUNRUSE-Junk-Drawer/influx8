type UntypedUnary = "Not" | "Negate" | "Fold"

const UntypedUnarySymbols: {[operator in UntypedUnary]: string[]} = {
    Not: ["!"],
    Negate: ["-"],
    Fold: []
}

const UntypedUnaryKeywords: {[operator in UntypedUnary]: string[]} = {
    Not: ["not"],
    Negate: [],
    Fold: ["fold"],
}