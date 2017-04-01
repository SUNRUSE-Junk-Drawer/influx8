/// <reference path="ParseToken.ts" />

type ParenthesesToken = {
    Type: "Parentheses"
    StartIndex: number
    EndIndex: number
    Contents: ParenthesizedToken[]
}

type ParenthesizedToken =
    IntegerToken | BooleanToken | SymbolToken | IdentifierToken | UnknownToken | ParenthesesToken | {
        Type: "UnopenedParenthesis"
        StartIndex: number
    } | {
        Type: "UnclosedParenthesis"
        StartIndex: number
    }

function Parenthesize(tokens: Token[]): ParenthesizedToken[] {
    const output: ParenthesizedToken[] = []
    const stack: ParenthesesToken[] = []

    for (const token of tokens) {
        switch (token.Type) {
            case "OpeningParenthesis": {
                const newParentheses: ParenthesesToken = {
                    Type: "Parentheses",
                    StartIndex: token.StartIndex,
                    // If the parentheses are closed, this is updated to the StartIndex of the closing parenthesis.
                    // Otherwise, this token will be replaced with an UnclosedParenthesis and this property is not returned.
                    EndIndex: 0,
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
                    StartIndex: token.StartIndex
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

    while (stack.length) {
        // If there were unclosed parentheses, replace them with UnclosedParenthesis tokens and move their contents into the parent parentheses/the root scope.
        const last = stack.pop()
        if (!last) throw "This should not be possible, but is required to satisfy the typechecker"
        const parent = stack.length ? stack[stack.length - 1].Contents : output
        let index = parent.indexOf(last)
        parent.splice(index, 1, {
            Type: "UnclosedParenthesis",
            StartIndex: last.StartIndex
        })
        for (const token of last.Contents) {
            index++ // Every time we splice an item in, we need to increment the index otherwise we splice in reverse order.
            parent.splice(index, 0, token)
        }
    }

    return output
}