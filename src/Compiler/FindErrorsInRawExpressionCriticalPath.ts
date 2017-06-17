/// <reference path="FindErrorsInRawExpression.ts" />

function FindErrorsInRawExpressionCriticalPath(expression: RawExpression): ErrorObj[] {
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
        }).concat(FindErrorsInRawExpressionCriticalPath(expression.Then))

        case "LetIncorrectIdentifierType": return AssertErrorObj({
            Type: expression.Type,
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInRawExpression(expression.Value)).concat(FindErrorsInRawExpressionCriticalPath(expression.Then))

        case "LambdaWithoutIdentifier": return AssertErrorObj({
            Type: expression.Type,
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInRawExpression(expression.Body))

        case "LambdaIncorrectIdentifierType": return AssertErrorObj({
            Type: expression.Type,
            StartIndex: expression.NameStartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInRawExpression(expression.Body))

        case "Lambda": return AssertErrorObj({
            Type: "UncalledLambdaInCriticalPath",
            StartIndex: expression.NameStartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInRawExpression(expression.Body))

        case "Unary": return FindErrorsInRawExpressionCriticalPath(expression.Operand)
        case "Binary": return FindErrorsInRawExpressionCriticalPath(expression.Left).concat(FindErrorsInRawExpressionCriticalPath(expression.Right))
        case "GetItem": return FindErrorsInRawExpressionCriticalPath(expression.Of)
        case "Return": return FindErrorsInRawExpressionCriticalPath(expression.Value)
        case "Let": return FindErrorsInRawExpression(expression.Value).concat(FindErrorsInRawExpressionCriticalPath(expression.Then))

        case "Reference":
        case "Boolean":
        case "Integer":
        case "Float":
            return []
    }
}