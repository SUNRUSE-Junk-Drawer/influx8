/// <reference path="TypecheckedExpression.ts" />
/// <reference path="Primitive.ts" />
/// <reference path="TypedUnary.ts" />
/// <reference path="TypedBinary.ts" />

function GetReturnedPrimitive(expression: TypecheckedExpression | VerifiedExpression): Primitive | undefined {
    switch (expression.Type) {
        case "Boolean": return "Boolean"
        case "Integer": return "Integer"
        case "Unary": return UnaryReturnTypes[expression.Operator]
        case "Binary": return BinaryReturnTypes[expression.Operator]
        case "Return":
        case "Reference":
        case "ConcatenateLeft":
        case "ConcatenateRight":
            return GetReturnedPrimitive(expression.Value)
        case "Let":
        case "LetNameNotUnique":
        case "LetWithoutIdentifier":
        case "LetIncorrectIdentifierType":
            return GetReturnedPrimitive(expression.Then)
        case "Call":
            return GetReturnedPrimitive(expression.Result)
        case "Unknown":
        case "ReferenceUndefined":
        case "CallLambdaExpected":
        case "BinaryUnmatched":
        case "BinaryInconsistentPlurality":
        case "UnaryUnmatched":
        case "NextStatementNotFound":
        case "Lambda":
        case "LambdaWithoutIdentifier":
        case "LambdaIncorrectIdentifierType":
        case "LambdaNameNotUnique":
            return undefined
    }
}