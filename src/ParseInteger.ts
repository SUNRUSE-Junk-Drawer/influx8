/// <reference path="SplitByWhiteSpace.ts" />

type IntegerToken = {
    Type: "Integer"
    StartIndex: number
    Value: number
}

function ParseInteger(token: UntypedToken): IntegerToken | undefined {
    if (!/^[+-]?\d+$/.test(token.Text)) return
    const value = parseInt(token.Text)
    return {
        Type: "Integer",
        StartIndex: token.StartIndex,
        Value: value == -0 ? 0 : value
    }
}