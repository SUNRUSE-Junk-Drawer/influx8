/// <reference path="Token.ts" />
/// <reference path="ParseStatementExpression.ts" />

const Keywords: { [token: string]: SymbolTokenType } = {}
for (const keyword in UntypedUnaryKeywords) Keywords[keyword] = "Operator"
for (const keyword in UntypedBinaryKeywords) Keywords[keyword] = "Operator"
for (const keyword in StatementParsers) Keywords[keyword] = "Statement"

function ParseKeywordToken(token: UntypedToken): SymbolToken | undefined {
    if (Object.prototype.hasOwnProperty.call(Keywords, token.Text)) return {
        Type: Keywords[token.Text],
        StartIndex: token.StartIndex,
        EndIndex: token.StartIndex + token.Text.length - 1,
        Symbol: token.Text
    }

    return undefined
}