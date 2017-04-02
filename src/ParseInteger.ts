/// <reference path="SplitByWhiteSpace.ts" />

type IntegerToken = {
    Type: "Integer"
    StartIndex: number
    EndIndex: number
    Value: number
}

function ParseInteger(token: UntypedToken): IntegerToken | undefined {
    if (!/^\d+$/.test(token.Text)) return
    return {
        Type: "Integer",
        StartIndex: token.StartIndex,
        EndIndex: token.StartIndex + token.Text.length - 1,
        Value: parseInt(token.Text)
    }
}