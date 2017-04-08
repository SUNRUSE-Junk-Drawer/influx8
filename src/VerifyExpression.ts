/// <reference path="InlinedExpression.ts" />
/// <reference path="VerifiedExpression.ts" />

function VerifyExpression(expression: InlinedExpression): VerifiedExpression | undefined {
    switch (expression.Type) {
        case "Boolean": return {
            Type: "Boolean",
            Value: expression.Value
        }

        case "Integer": return {
            Type: "Integer",
            Value: expression.Value
        }

        case "Unary": {
            const operand = VerifyExpression(expression.Operand)
            if (!operand) return undefined
            return {
                Type: "Unary",
                Operator: expression.Operator,
                Operand: operand
            }
        }

        case "Binary": {
            const left = VerifyExpression(expression.Left)
            if (!left) return undefined
            const right = VerifyExpression(expression.Right)
            if (!right) return undefined
            return {
                Type: "Binary",
                Operator: expression.Operator,
                Left: left,
                Right: right
            }
        }

        case "Let":
        case "LetWithoutIdentifier":
        case "LetIncorrectIdentifierType":
        case "LetNameNotUnique":
            return VerifyExpression(expression.Then)

        case "Return":
        case "Reference":
            return VerifyExpression(expression.Value)

        case "Call":
            return VerifyExpression(expression.Result)

        case "Lambda":
        case "LambdaWithoutIdentifier":
        case "LambdaNameNotUnique":
        case "LambdaExpected":
        case "LambdaIncorrectIdentifierType":
        case "ReferenceUndefined":
        case "Unknown":
        case "NextStatementNotFound":
            return undefined
    }
}