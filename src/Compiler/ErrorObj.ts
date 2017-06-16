type ErrorType =
    "Unknown"
    | "NextStatementNotFound"
    | "LetWithoutIdentifier"
    | "LetIncorrectIdentifierType"
    | "LambdaWithoutIdentifier"
    | "LambdaIncorrectIdentifierType"

type ErrorObj = {
    readonly Type: ErrorType
    readonly StartIndex: number
    readonly EndIndex: number
}