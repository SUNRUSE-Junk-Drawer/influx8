/// <reference path="ParseExpression.ts" />

function ParseParenthesesExpression(tokens: ParenthesizedToken[]): RawExpression | undefined {
    if (tokens.length != 1) return undefined
    const onlyToken = tokens[0]
    if (onlyToken.Type != "Parentheses") return undefined
    return ParseExpression(onlyToken.Contents, onlyToken.StartIndex, onlyToken.EndIndex)
}