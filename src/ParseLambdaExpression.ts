/// <reference path="ParseExpression.ts" />

function ParseLambdaExpression(tokens: ParenthesizedToken[]): LambdaRawExpression | LambdaStatementIncorrectIdentifierTypeRawExpression | LambdaStatementWithoutIdentifierRawExpression | undefined {
    switch (tokens.length) {
        case 0: return undefined
        case 1: {
            const onlyToken = tokens[0]
            if (onlyToken.Type != "Lambda") return undefined
            return {
                Type: "LambdaWithoutIdentifier",
                StartIndex: onlyToken.StartIndex,
                EndIndex: onlyToken.EndIndex,
                Body: ParseExpression([], onlyToken.StartIndex, onlyToken.EndIndex)
            }
        }
        default: {
            const lambdaToken = tokens[1]
            const nameToken = tokens[0]

            if (nameToken.Type == "Lambda") return {
                Type: "LambdaWithoutIdentifier",
                StartIndex: nameToken.StartIndex,
                EndIndex: nameToken.EndIndex,
                Body: ParseExpression(tokens.slice(1), nameToken.StartIndex, nameToken.EndIndex)
            }

            if (lambdaToken.Type == "Lambda") {
                if (nameToken.Type == "Identifier") return {
                    Type: "Lambda",
                    StartIndex: lambdaToken.StartIndex,
                    EndIndex: lambdaToken.EndIndex,
                    Name: nameToken.Value,
                    NameStartIndex: nameToken.StartIndex,
                    NameEndIndex: nameToken.EndIndex,
                    Body: ParseExpression(tokens.slice(2), nameToken.StartIndex, lambdaToken.EndIndex)
                }

                return {
                    Type: "LambdaIncorrectIdentifierType",
                    StartIndex: lambdaToken.StartIndex,
                    EndIndex: lambdaToken.EndIndex,
                    ActualType: nameToken.Type,
                    NameStartIndex: nameToken.StartIndex,
                    NameEndIndex: nameToken.EndIndex,
                    Body: ParseExpression(tokens.slice(2), nameToken.StartIndex, lambdaToken.EndIndex),
                }
            }

            return undefined
        }
    }
}