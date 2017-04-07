/// <reference path="Token.ts" />
/// <reference path="RawExpression.ts" />

function ParseReferenceExpression(tokens: ParenthesizedToken[]): ReferenceExpression | undefined {
    if (tokens.length != 1) return undefined
    const onlyToken = tokens[0]
    if (onlyToken.Type != "Identifier") return undefined
    return {
        Type: "Reference",
        StartIndex: onlyToken.StartIndex,
        EndIndex: onlyToken.EndIndex,
        Name: onlyToken.Value
    }
}