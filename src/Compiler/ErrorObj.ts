type ErrorType =
    "Unknown"
    | "NextStatementNotFound"
    | "LetWithoutIdentifier"
    | "LetIncorrectIdentifierType"
    | "LambdaWithoutIdentifier"
    | "LambdaIncorrectIdentifierType"
    | "UncalledLambdaInCriticalPath"
    | "IdentifierNotUnique"
    | "ReferenceUndefined"
    | "LambdaExpected"
    | "InconsistentPlurality"
    | "GetItemOutOfRange"
    | "TypeMismatch"

type ErrorObj = {
    readonly Type: ErrorType
    readonly StartIndex: number
    readonly EndIndex: number
}