/// <reference path="RawExpression.ts" />
/// <reference path="InlinedExpression.ts" />
/// <reference path="InlineExpression.ts" />

function InlineCallExpression(expression: InlinedExpression, argument: InlinedExpression): InlinedExpression {
    switch (expression.Type) {
        case "Boolean":
        case "Integer":
        case "Unknown":
        case "NextStatementNotFound":
        case "Unary":
        case "Binary":
        case "ReferenceUndefined":
            return {
                Type: "LambdaExpected",
                Value: expression
            }

        case "LambdaExpected": return expression

        case "Return":
        case "Reference":
            return InlineCallExpression(expression.Value, argument)

        // todo does letnamenotunique override scope?
        case "Let":
        case "LetNameNotUnique":
            return InlineCallExpression(expression.Then, argument)

        case "LetWithoutIdentifier": throw "TODO: requires value inlined"
        case "LetIncorrectIdentifierType": throw "TODO: requires value inlined"

        case "LambdaWithoutIdentifier":
        case "LambdaIncorrectIdentifierType":
            return expression.Body

        case "Call": return InlineCallExpression(expression.Result, argument)

        case "Lambda":
        case "LambdaNameNotUnique": {
            const scopeCopy: Scope = JSON.parse(JSON.stringify(expression.Scope))
            scopeCopy[expression.Name] = argument
            return InlineExpression(expression.Body, scopeCopy)
        }
    }
}