/// <reference path="TypecheckedExpression.ts" />
/// <reference path="VerifiedExpression.ts" />

function VerifyExpression(expression: TypecheckedExpression): VerifiedExpression | undefined {
    switch (expression.Type) {
        case "Parameter": return expression

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
        case "ConcatenateLeft":
        case "ConcatenateRight":
        case "GetItem":
            return VerifyExpression(expression.Value)

        case "Call":
            return VerifyExpression(expression.Result)

        case "Lambda":
        case "LambdaWithoutIdentifier":
        case "LambdaNameNotUnique":
        case "CallLambdaExpected":
        case "LambdaIncorrectIdentifierType":
        case "ReferenceUndefined":
        case "Unknown":
        case "NextStatementNotFound":
        case "UnaryUnmatched":
        case "BinaryUnmatched":
        case "BinaryInconsistentPlurality":
        case "GetItemOutOfRange":
            return undefined
    }
}