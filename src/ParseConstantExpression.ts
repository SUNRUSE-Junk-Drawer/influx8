/// <reference path="Parenthesize.ts" />

type BooleanExpression = {
    Type: "Boolean"
    StartIndex: number
    Value: boolean
}

type IntegerExpression = {
    Type: "Integer"
    StartIndex: number
    Value: number
}

function ParseConstantExpression(tokens: ParenthesizedToken[]): BooleanExpression | IntegerExpression | undefined {
    if (tokens.length != 1) return undefined
    const onlyToken = tokens[0]
    switch (onlyToken.Type) {
        case "Boolean": return {
            Type: "Boolean",
            StartIndex: onlyToken.StartIndex,
            Value: onlyToken.Value
        }
        case "Integer": return {
            Type: "Integer",
            StartIndex: onlyToken.StartIndex,
            Value: onlyToken.Value
        }
    }
    return undefined
}