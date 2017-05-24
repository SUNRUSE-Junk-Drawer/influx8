/// <reference path="RawExpression.ts" />
/// <reference path="InlinedExpression.ts" />
/// <reference path="InlineExpression.ts" />

function InlineCallExpression(expression: InlinedExpression, argument: InlinedExpression): InlinedExpression {
    switch (expression.Type) {
        case "Boolean":
        case "Integer":
        case "Float":
        case "Unknown":
        case "NextStatementNotFound":
        case "Unary":
        case "Binary":
        case "ReferenceUndefined":
        case "GetItem":
        case "Parameter":
            return {
                Type: "CallLambdaExpected",
                Value: expression,
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex
            }

        case "CallLambdaExpected": return expression

        case "Return":
        case "Reference":
            return InlineCallExpression(expression.Value, argument)

        case "Let":
        case "LetNameNotUnique":
        case "LetWithoutIdentifier":
        case "LetIncorrectIdentifierType":
            return InlineCallExpression(expression.Then, argument)

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