/// <reference path="Token.ts" />

function ParseIntegerToken(token: UntypedToken): IntegerToken | undefined {
    if (!/^\d+$/.test(token.Text)) return
    return {
        Type: "Integer",
        StartIndex: token.StartIndex,
        EndIndex: token.StartIndex + token.Text.length - 1,
        Value: parseInt(token.Text)
    }
}