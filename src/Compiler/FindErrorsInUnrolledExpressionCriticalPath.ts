/// <reference path="FindErrorsInUnrolledExpression.ts" />

function FindErrorsInUnrolledExpressionCriticalPath(expression: UnrolledExpression): ErrorObj[] {
    function AssertErrorObj(item: ErrorObj): ErrorObj[] { return [item] }

    switch (expression.Type) {
        case "ConcatenateLeft":
        case "ConcatenateRight":
        case "Return":
            return FindErrorsInUnrolledExpressionCriticalPath(expression.Value)

        case "Unary": return FindErrorsInUnrolledExpressionCriticalPath(expression.Operand)
        case "Binary": return FindErrorsInUnrolledExpressionCriticalPath(expression.Left).concat(FindErrorsInUnrolledExpressionCriticalPath(expression.Right))
        case "BinaryInconsistentPlurality": {
            const output: ErrorObj[] = []
            for (const dimension of expression.Left) for (const error of FindErrorsInUnrolledExpressionCriticalPath(dimension)) output.push(error)
            for (const dimension of expression.Right) for (const error of FindErrorsInUnrolledExpressionCriticalPath(dimension)) output.push(error)
            output.push({
                Type: "InconsistentPlurality",
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex
            })
            return output
        }

        case "Unknown": return [{
            Type: "Unknown",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }]

        case "NextStatementNotFound": return [{
            Type: "NextStatementNotFound",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }]

        case "GetItem": {
            const output: ErrorObj[] = []
            for (const error of FindErrorsInUnrolledExpressionCriticalPath(expression.Value)) output.push(error)
            for (let i = 0; i < expression.Of.length; i++) if (i != expression.Item) for (const error of FindErrorsInUnrolledExpressionCriticalPath(expression.Of[i])) output.push(error)
            return output
        }

        case "GetItemOutOfRange": {
            const output: ErrorObj[] = []
            for (const dimension of expression.Of) for (const error of FindErrorsInUnrolledExpressionCriticalPath(dimension)) output.push(error)
            output.push({
                Type: "GetItemOutOfRange",
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex
            })
            return output
        }

        case "ReferenceUndefined": return [{
            Type: "ReferenceUndefined",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }]

        case "Call": {
            const output: ErrorObj[] = []
            for (const error of FindErrorsInRawExpression(expression.Lambda)) output.push(error)
            for (const dimension of expression.Argument) for (const error of FindErrorsInUnrolledExpression(dimension)) output.push(error)
            for (const error of FindErrorsInUnrolledExpressionCriticalPath(expression.Result)) output.push(error)
            return output
        }

        case "CallLambdaExpected": {
            const output: ErrorObj[] = []
            for (const dimension of expression.Value) for (const error of FindErrorsInUnrolledExpression(dimension)) output.push(error)
            output.push({
                Type: "LambdaExpected",
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex
            })
            return output
        }

        case "Let": {
            const output: ErrorObj[] = []
            for (const dimension of expression.Value) for (const error of FindErrorsInUnrolledExpression(dimension)) output.push(error)
            for (const error of FindErrorsInUnrolledExpressionCriticalPath(expression.Then)) output.push(error)
            return output
        }

        case "LetWithoutIdentifier": return AssertErrorObj({
            Type: "LetWithoutIdentifier",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInUnrolledExpressionCriticalPath(expression.Then))

        case "LetIncorrectIdentifierType": {
            const output = AssertErrorObj({
                Type: "LetIncorrectIdentifierType",
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex
            })
            for (const dimension of expression.Value) for (const error of FindErrorsInUnrolledExpression(dimension)) output.push(error)
            for (const error of FindErrorsInUnrolledExpressionCriticalPath(expression.Then)) output.push(error)
            return output
        }

        case "LetNameNotUnique": {
            const output = AssertErrorObj({
                Type: "IdentifierNotUnique",
                StartIndex: expression.NameStartIndex,
                EndIndex: expression.EndIndex
            })
            for (const dimension of expression.Value) for (const error of FindErrorsInUnrolledExpression(dimension)) output.push(error)
            for (const error of FindErrorsInUnrolledExpressionCriticalPath(expression.Then)) output.push(error)
            return output
        }

        case "Lambda": return AssertErrorObj({
            Type: "UncalledLambdaInCriticalPath",
            StartIndex: expression.NameStartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInRawExpression(expression.Body))

        case "LambdaWithoutIdentifier": return AssertErrorObj({
            Type: "LambdaWithoutIdentifier",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInUnrolledExpressionCriticalPath(expression.Body))

        case "LambdaIncorrectIdentifierType": return AssertErrorObj({
            Type: "LambdaIncorrectIdentifierType",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInUnrolledExpressionCriticalPath(expression.Body))

        case "LambdaNameNotUnique": return AssertErrorObj({
            Type: "IdentifierNotUnique",
            StartIndex: expression.NameStartIndex,
            EndIndex: expression.EndIndex
        }).concat(FindErrorsInRawExpression(expression.Body))

        case "Reference":
        case "Boolean":
        case "Integer":
        case "Float":
        case "Parameter":
            return []
    }
}