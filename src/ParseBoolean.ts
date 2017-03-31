/// <reference path="SplitByWhiteSpace.ts" />

type BooleanToken = {
    Type: "Boolean"
    StartIndex: number
    Value: boolean
}

function ParseBoolean(token: UntypedToken): BooleanToken | undefined {
    switch (token.Text) {
        case "false": return {
            Type: "Boolean",
            StartIndex: token.StartIndex,
            Value: false
        }
        case "true": return {
            Type: "Boolean",
            StartIndex: token.StartIndex,
            Value: true
        }
        default: return undefined
    }
}