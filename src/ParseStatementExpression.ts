/// <reference path="TryParseExpression.ts" />

function ParseStatementExpression(tokens: ParenthesizedToken[]): RawExpression | undefined {
    if (!tokens.length) return undefined
    const firstToken = tokens[0]
    if (firstToken.Type != "Statement") return undefined
    return StatementParsers[firstToken.Symbol](tokens)
}

const StatementParsers: { [keyword: string]: (tokens: ParenthesizedToken[]) => RawExpression } = {
    "let": tokens => {
        const nextStatement = FindNextStatement(tokens)
        if (nextStatement.Type == "NextStatementNotFound") return nextStatement
        if (nextStatement.StatementTokens.length < 1) return {
            Type: "LetWithoutIdentifier",
            StartIndex: nextStatement.StartIndex,
            EndIndex: nextStatement.EndIndex,
            Then: nextStatement.NextStatement
        }
        const nameToken = nextStatement.StatementTokens[0]
        if (nameToken.Type != "Identifier") return {
            Type: "LetIncorrectIdentifierType",
            StartIndex: nameToken.StartIndex,
            EndIndex: nameToken.EndIndex,
            ActualType: nameToken.Type,
            Value: ParseExpression(nextStatement.StatementTokens.slice(1), nextStatement.StartIndex, nameToken.EndIndex),
            Then: nextStatement.NextStatement
        }
        return {
            Type: "Let",
            StartIndex: nextStatement.StartIndex,
            EndIndex: nextStatement.EndIndex,
            Name: nameToken.Value,
            NameStartIndex: nameToken.StartIndex,
            NameEndIndex: nameToken.EndIndex,
            Value: ParseExpression(nextStatement.StatementTokens.slice(1), nextStatement.StartIndex, nameToken.EndIndex),
            Then: nextStatement.NextStatement
        }
    },
    "return": tokens => ({
        Type: "Return",
        StartIndex: tokens[0].StartIndex,
        EndIndex: tokens[0].EndIndex,
        Value: ParseExpression(tokens.slice(1), tokens[0].StartIndex, tokens[0].EndIndex)
    })
}

type NextStatementFound = {
    Type: "NextStatement"
    StartIndex: number
    EndIndex: number
    StatementTokens: ParenthesizedToken[]
    NextStatement: RawExpression
}


function FindNextStatement(tokens: ParenthesizedToken[]): NextStatementFound | NextStatementNotFound {
    for (let i = 1; i < tokens.length; i++) {
        const token = tokens[i]
        if (token.Type != "Statement") continue
        return {
            Type: "NextStatement",
            StartIndex: tokens[0].StartIndex,
            EndIndex: tokens[0].EndIndex,
            StatementTokens: tokens.slice(1, i),
            NextStatement: StatementParsers[token.Symbol](tokens.slice(i))
        }
    }
    return {
        Type: "NextStatementNotFound",
        Tokens: tokens
    }
}