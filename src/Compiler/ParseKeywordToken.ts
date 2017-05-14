/// <reference path="Token.ts" />

const Keywords: { [token: string]: SymbolTokenType } = {
    let: "Statement",
    return: "Statement"
}

for (const keyword in UntypedUnaryKeywords) Keywords[keyword] = "Operator"
for (const keyword in UntypedBinaryKeywords) Keywords[keyword] = "Operator"

function ParseKeywordToken(token: UntypedToken): SymbolToken | undefined {
    if (Object.prototype.hasOwnProperty.call(Keywords, token.Text)) return {
        Type: Keywords[token.Text],
        StartIndex: token.StartIndex,
        EndIndex: token.StartIndex + token.Text.length - 1,
        Symbol: token.Text
    }

    return undefined
}