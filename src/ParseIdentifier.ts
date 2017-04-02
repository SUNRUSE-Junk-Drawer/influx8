/// <reference path="SplitByWhiteSpace.ts" />

type IdentifierToken = {
    Type: "Identifier"
    StartIndex: number
    EndIndex: number
    Value: string
}

function ParseIdentifier(token: UntypedToken): IdentifierToken | undefined {
    if (!/^[a-z_][a-z_0-9]*$/.test(token.Text)) return undefined
    return {
        Type: "Identifier",
        StartIndex: token.StartIndex,
        EndIndex: token.StartIndex + token.Text.length - 1,
        Value: token.Text
    }
}