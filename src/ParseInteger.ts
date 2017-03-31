/// <reference path="SplitByWhiteSpace.ts" />

type IntegerToken = {
    Type: "Integer"
    StartIndex: number
    Value: number
}

function ParseInteger(token: UntypedToken): IntegerToken | undefined {
    if (!/^\d+$/.test(token.Text)) return
    return {
        Type: "Integer",
        StartIndex: token.StartIndex,
        Value: parseInt(token.Text)
    }
}