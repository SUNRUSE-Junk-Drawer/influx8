/// <reference path="Token.ts" />
/// <reference path="RawExpression.ts" />
/// <reference path="TryParseExpression.ts" />

function ParseGetItemExpression(tokens: ParenthesizedToken[]): GetItemRawExpression | undefined {
    if (tokens.length != 3) return undefined
    const getItemToken = tokens[1]
    if (getItemToken.Type != "GetItem") return undefined
    const itemToken = tokens[2]
    if (itemToken.Type != "Integer") return undefined
    const ofExpression = TryParseExpression([tokens[0]])
    if (!ofExpression) return undefined
    return {
        Type: "GetItem",
        Item: itemToken.Value,
        Of: ofExpression,
        StartIndex: tokens[0].StartIndex,
        EndIndex: tokens[2].EndIndex
    }
}