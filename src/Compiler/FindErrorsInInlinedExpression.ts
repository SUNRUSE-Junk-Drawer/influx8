/// <reference path="FindErrorsInRawExpression.ts" />

function FindErrorsInInlinedExpression(expression: InlinedExpression): ErrorObj[] {
    function AssertErrorObj(item: ErrorObj): ErrorObj[] { return [item] }

    switch (expression.Type) {
        case "Unknown":
        case "NextStatementNotFound": return [{
            Type: expression.Type,
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }]

        case "LetWithoutIdentifier": return AssertErrorObj({
            Type: expression.Type,
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInInlinedExpression(expression.Then))

        case "LetIncorrectIdentifierType": return AssertErrorObj({
            Type: expression.Type,
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInInlinedExpression(expression.Value)).concat(FindErrorsInInlinedExpression(expression.Then))

        case "LetNameNotUnique": return AssertErrorObj({
            Type: "IdentifierNotUnique",
            StartIndex: expression.NameStartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInInlinedExpression(expression.Value)).concat(FindErrorsInInlinedExpression(expression.Then))

        case "LambdaWithoutIdentifier": return AssertErrorObj({
            Type: expression.Type,
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInInlinedExpression(expression.Body))

        case "LambdaIncorrectIdentifierType": return AssertErrorObj({
            Type: expression.Type,
            StartIndex: expression.NameStartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInInlinedExpression(expression.Body))

        case "LambdaNameNotUnique": return AssertErrorObj({
            Type: "IdentifierNotUnique",
            StartIndex: expression.NameStartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInRawExpression(expression.Body))

        case "ReferenceUndefined": return AssertErrorObj({
            Type: "ReferenceUndefined",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        })

        case "Call": return FindErrorsInRawExpression(expression.Lambda).concat(FindErrorsInInlinedExpression(expression.Argument)).concat(FindErrorsInInlinedExpression(expression.Result))

        case "CallLambdaExpected": return FindErrorsInInlinedExpression(expression.Value).concat([{
            Type: "LambdaExpected",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }])

        case "Unary": return FindErrorsInInlinedExpression(expression.Operand)
        case "Binary": return FindErrorsInInlinedExpression(expression.Left).concat(FindErrorsInInlinedExpression(expression.Right))
        case "GetItem": return FindErrorsInInlinedExpression(expression.Of)
        case "Lambda": return FindErrorsInRawExpression(expression.Body)
        case "Return": return FindErrorsInInlinedExpression(expression.Value)
        case "Let": return FindErrorsInInlinedExpression(expression.Value).concat(FindErrorsInInlinedExpression(expression.Then))

        case "Reference":
        case "Boolean":
        case "Integer":
        case "Float":
        case "Parameter":
            return []
    }
}