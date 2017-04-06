type UntypedToken = {
    StartIndex: number
    Text: string
}

type BooleanToken = {
    Type: "Boolean"
    StartIndex: number
    EndIndex: number
    Value: boolean
}

type IntegerToken = {
    Type: "Integer"
    StartIndex: number
    EndIndex: number
    Value: number
}

type IdentifierToken = {
    Type: "Identifier"
    StartIndex: number
    EndIndex: number
    Value: string
}

type SymbolTokenType = "OpeningParenthesis" | "ClosingParenthesis" | "Operator" | "Statement"

type SymbolToken = {
    Type: SymbolTokenType
    StartIndex: number
    EndIndex: number
    Symbol: string
}

type UnknownToken = {
    Type: "Unknown"
    StartIndex: number
    EndIndex: number
    Text: string
}

type Token = BooleanToken | IntegerToken | IdentifierToken | SymbolToken | UnknownToken

type ParenthesesToken = {
    Type: "Parentheses"
    StartIndex: number
    EndIndex: number
    Contents: ParenthesizedToken[]
}

type UnopenedParenthesisToken = {
    Type: "UnopenedParenthesis"
    StartIndex: number
    EndIndex: number
}

type UnclosedParenthesisToken = {
    Type: "UnclosedParenthesis"
    StartIndex: number
    EndIndex: number
}

type ParenthesizedToken = Token | ParenthesesToken | UnopenedParenthesisToken | UnclosedParenthesisToken