/// <reference path="InlinedExpression.ts" />
/// <reference path="TypecheckedExpression.ts" />
/// <reference path="GetReturnedPrimitive.ts" />
/// <reference path="TypedUnary.ts" />
/// <reference path="TypedBinary.ts" />

function TypecheckExpression(expression: UnrolledExpression): TypecheckedExpression {
    switch (expression.Type) {
        case "Unknown":
        case "Boolean":
        case "Integer":
        case "NextStatementNotFound":
        case "ReferenceUndefined":
        case "Lambda":
        case "LambdaWithoutIdentifier":
        case "LambdaIncorrectIdentifierType":
        case "LambdaNameNotUnique":
            return expression

        case "Unary": {
            const operand = TypecheckExpression(expression.Operand)
            const operandPrimitive = GetReturnedPrimitive(operand)
            if (operandPrimitive) {
                const operator = UnaryTypeMappings[expression.Operator][operandPrimitive]
                if (operator) return {
                    Type: "Unary",
                    Operator: operator,
                    Operand: operand
                }
            }
            return {
                Type: "UnaryUnmatched",
                Operator: expression.Operator,
                Operand: operand
            }
        }

        case "Binary": {
            const leftOperand = TypecheckExpression(expression.Left)
            const rightOperand = TypecheckExpression(expression.Right)
            const operandPrimitive = GetReturnedPrimitive(leftOperand)
            if (operandPrimitive && operandPrimitive == GetReturnedPrimitive(rightOperand)) {
                const operator = BinaryTypeMappings[expression.Operator][operandPrimitive]
                if (operator) return {
                    Type: "Binary",
                    Operator: operator,
                    Left: leftOperand,
                    Right: rightOperand
                }
            }
            return {
                Type: "BinaryUnmatched",
                Operator: expression.Operator,
                Left: leftOperand,
                Right: rightOperand
            }
        }

        case "BinaryInconsistentPlurality": {
            const output: BinaryInconsistentPluralityTypecheckedExpression = {
                Type: "BinaryInconsistentPlurality",
                Operator: expression.Operator,
                Left: [],
                Right: []
            }

            for (const operand of expression.Left) output.Left.push(TypecheckExpression(operand))
            for (const operand of expression.Right) output.Right.push(TypecheckExpression(operand))

            return output
        }

        case "Reference": return {
            Type: "Reference",
            Name: expression.Name,
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex,
            Value: TypecheckExpression(expression.Value)
        }

        case "Return": return {
            Type: "Return",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex,
            Value: TypecheckExpression(expression.Value)
        }

        case "Call": return {
            Type: "Call",
            Lambda: expression.Lambda,
            Argument: TypecheckExpression(expression.Argument as UnrolledExpression /* TODO: This breaks the type system. */),
            Result: TypecheckExpression(expression.Result)
        }

        case "CallLambdaExpected": return {
            Type: "CallLambdaExpected",
            Value: TypecheckExpression(expression.Value as UnrolledExpression /* TODO: This breaks the type system. */)
        }

        case "Let": return {
            Type: "Let",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex,
            Name: expression.Name,
            NameStartIndex: expression.NameStartIndex,
            NameEndIndex: expression.NameEndIndex,
            Value: TypecheckExpression(expression.Value as UnrolledExpression /* TODO: This breaks the type system. */),
            Then: TypecheckExpression(expression.Then)
        }

        case "LetNameNotUnique": return {
            Type: "LetNameNotUnique",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex,
            Name: expression.Name,
            NameStartIndex: expression.NameStartIndex,
            NameEndIndex: expression.NameEndIndex,
            Value: TypecheckExpression(expression.Value as UnrolledExpression /* TODO: This breaks the type system. */),
            Then: TypecheckExpression(expression.Then)
        }

        case "LetWithoutIdentifier": return {
            Type: "LetWithoutIdentifier",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex,
            Then: TypecheckExpression(expression.Then)
        }

        case "LetIncorrectIdentifierType": return {
            Type: "LetIncorrectIdentifierType",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex,
            ActualType: expression.ActualType,
            Value: TypecheckExpression(expression.Value as UnrolledExpression /* TODO: This breaks the type system. */),
            Then: TypecheckExpression(expression.Then)
        }

        case "ConcatenateLeft": return {
            Type: "ConcatenateLeft",
            Value: TypecheckExpression(expression.Value)
        }

        case "ConcatenateRight": return {
            Type: "ConcatenateRight",
            Value: TypecheckExpression(expression.Value)
        }

        case "GetItem": {
            const output: GetItemTypecheckedExpression = {
                Type: "GetItem",
                Item: expression.Item,
                Of: [],
                Value: TypecheckExpression(expression.Value)
            }

            for (const item of expression.Of) output.Of.push(TypecheckExpression(item))
            return output
        }

        case "GetItemOutOfRange": {
            const output: GetItemOutOfRangeTypecheckedExpression = {
                Type: "GetItemOutOfRange",
                Item: expression.Item,
                Of: []
            }

            for (const item of expression.Of) output.Of.push(TypecheckExpression(item))
            return output
        }
    }
}