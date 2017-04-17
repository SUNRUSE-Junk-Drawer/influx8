/// <reference path="Token.ts" />

function ParseFloatToken(token: UntypedToken): FloatToken | undefined {
    if (!/^\d+\.$|^\.\d+$|^\d+\.\d+$/.test(token.Text)) return
    return {
        Type: "Float",
        StartIndex: token.StartIndex,
        EndIndex: token.StartIndex + token.Text.length - 1,
        Value: parseFloat(token.Text)
    }
}