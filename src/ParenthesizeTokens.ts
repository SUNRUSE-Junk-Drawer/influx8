/// <reference path="Token.ts" />

function ParenthesizeTokens(tokens: UnparenthesizedToken[]): ParenthesizedToken[] {
    const output: ParenthesizedToken[] = []
    const stack: ParenthesesToken[] = []

    for (const token of tokens) {
        switch (token.Type) {
            case "OpeningParenthesis": {
                const newParentheses: ParenthesesToken = {
                    Type: "Parentheses",
                    StartIndex: token.StartIndex,
                    // If the parentheses are closed, this is updated to the StartIndex of the closing parenthesis.
                    // Otherwise, this token will be replaced with an UnclosedParenthesis and this property is returned there.
                    EndIndex: token.EndIndex,
                    Contents: []
                }

                if (stack.length)
                    stack[stack.length - 1].Contents.push(newParentheses)
                else
                    output.push(newParentheses)

                stack.push(newParentheses)
            } break
            case "ClosingParenthesis": {
                if (stack.length) {
                    stack[stack.length - 1].EndIndex = token.StartIndex
                    stack.length--
                } else output.push({
                    Type: "UnopenedParenthesis",
                    StartIndex: token.StartIndex,
                    EndIndex: token.EndIndex
                })
            } break
            default: {
                if (stack.length)
                    stack[stack.length - 1].Contents.push(token)
                else
                    output.push(token)
            } break
        }
    }

    // If there were unclosed parentheses, replace them with UnclosedParenthesis tokens and move their contents into the parent parentheses/the root scope.
    let unclosedParenthesis = stack.pop()
    while (unclosedParenthesis) {
        const parent = stack.length ? stack[stack.length - 1].Contents : output
        let index = parent.indexOf(unclosedParenthesis)
        parent.splice(index, 1, {
            Type: "UnclosedParenthesis",
            StartIndex: unclosedParenthesis.StartIndex,
            EndIndex: unclosedParenthesis.EndIndex
        })
        for (const token of unclosedParenthesis.Contents) {
            index++ // Every time we splice an item in, we need to increment the index otherwise we splice in reverse order.
            parent.splice(index, 0, token)
        }
        unclosedParenthesis = stack.pop()
    }

    return output
}