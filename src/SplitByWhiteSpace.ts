/// <reference path="Token.ts" />

function SplitByWhiteSpace(source: string): UntypedToken[] {
    let token: UntypedToken | undefined = undefined
    const tokens: UntypedToken[] = []

    // TODO: Is this Unicode safe?
    for (let i = 0; i < source.length; i++) {
        const character = source.charAt(i)
        if (character.trim().length) {
            if (token) {
                token.Text += character.toLowerCase()
            } else {
                token = {
                    StartIndex: i,
                    Text: character.toLowerCase()
                }
                tokens.push(token)
            }
        } else if (token) token = undefined
    }

    return tokens
}