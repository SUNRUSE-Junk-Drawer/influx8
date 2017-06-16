/// <reference path="ErrorObj.ts" />

function FindErrorsInRawExpression(expression: RawExpression): ErrorObj[] {
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
        }).concat(FindErrorsInRawExpression(expression.Then))

        case "LetIncorrectIdentifierType": return AssertErrorObj({
            Type: expression.Type,
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInRawExpression(expression.Value)).concat(FindErrorsInRawExpression(expression.Then))

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

        case "Unary": return FindErrorsInRawExpression(expression.Operand)
        case "Binary": return FindErrorsInRawExpression(expression.Left).concat(FindErrorsInRawExpression(expression.Right))
        case "GetItem": return FindErrorsInRawExpression(expression.Of)
        case "Lambda": return FindErrorsInRawExpression(expression.Body)
        case "Return": return FindErrorsInRawExpression(expression.Value)
        case "Let": return FindErrorsInRawExpression(expression.Value).concat(FindErrorsInRawExpression(expression.Then))

        case "Reference":
        case "Boolean":
        case "Integer":
        case "Float":
            return []
    }
}