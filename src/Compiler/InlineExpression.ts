/// <reference path="RawExpression.ts" />
/// <reference path="InlinedExpression.ts" />
/// <reference path="InlineCallExpression.ts" />

function InlineExpression(expression: RawExpression, scope: Scope): InlinedExpression {
    switch (expression.Type) {
        case "Unknown":
        case "Boolean":
        case "Integer":
        case "Float":
        case "NextStatementNotFound":
            return expression

        case "Unary": return {
            Type: "Unary",
            Operator: expression.Operator,
            Operand: InlineExpression(expression.Operand, scope),
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex
        }

        case "Binary": {
            if (expression.Operator == "Call") {
                const argument = InlineExpression(expression.Right, scope)
                return {
                    Type: "Call",
                    Lambda: expression.Left,
                    Argument: argument,
                    Result: InlineCallExpression(InlineExpression(expression.Left, scope), argument)
                }
            }
            return {
                Type: "Binary",
                Operator: expression.Operator,
                Left: InlineExpression(expression.Left, scope),
                Right: InlineExpression(expression.Right, scope),
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex
            }
        }

        case "LetWithoutIdentifier": return {
            Type: "LetWithoutIdentifier",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex,
            Then: InlineExpression(expression.Then, scope)
        }

        case "LetIncorrectIdentifierType": return {
            Type: "LetIncorrectIdentifierType",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex,
            ActualType: expression.ActualType,
            Value: InlineExpression(expression.Value, scope),
            Then: InlineExpression(expression.Then, scope),
        }

        case "Let": {
            const inlinedValue = InlineExpression(expression.Value, scope)
            const newScope = JSON.parse(JSON.stringify(scope))
            newScope[expression.Name] = inlinedValue

            if (Object.prototype.hasOwnProperty.call(scope, expression.Name)) return {
                Type: "LetNameNotUnique",
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex,
                Name: expression.Name,
                NameStartIndex: expression.NameStartIndex,
                NameEndIndex: expression.NameEndIndex,
                Value: inlinedValue,
                Then: InlineExpression(expression.Then, newScope)
            }

            return {
                Type: "Let",
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex,
                Name: expression.Name,
                NameStartIndex: expression.NameStartIndex,
                NameEndIndex: expression.NameEndIndex,
                Value: inlinedValue,
                Then: InlineExpression(expression.Then, newScope)
            }
        }

        case "Return": return {
            Type: "Return",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex,
            Value: InlineExpression(expression.Value, scope)
        }

        case "Lambda": {
            if (Object.prototype.hasOwnProperty.call(scope, expression.Name)) return {
                Type: "LambdaNameNotUnique",
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex,
                Name: expression.Name,
                NameStartIndex: expression.NameStartIndex,
                NameEndIndex: expression.NameEndIndex,
                Body: expression.Body,
                Scope: scope
            }

            return {
                Type: "Lambda",
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex,
                Name: expression.Name,
                NameStartIndex: expression.NameStartIndex,
                NameEndIndex: expression.NameEndIndex,
                Body: expression.Body,
                Scope: scope
            }
        }

        case "LambdaWithoutIdentifier": return {
            Type: "LambdaWithoutIdentifier",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex,
            Body: InlineExpression(expression.Body, scope)
        }

        case "LambdaIncorrectIdentifierType": return {
            Type: "LambdaIncorrectIdentifierType",
            StartIndex: expression.StartIndex,
            EndIndex: expression.EndIndex,
            ActualType: expression.ActualType,
            NameStartIndex: expression.NameStartIndex,
            NameEndIndex: expression.NameEndIndex,
            Body: InlineExpression(expression.Body, scope)
        }

        case "Reference": {
            if (!Object.prototype.hasOwnProperty.call(scope, expression.Name)) return {
                Type: "ReferenceUndefined",
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex,
                Name: expression.Name
            }

            return {
                Type: "Reference",
                StartIndex: expression.StartIndex,
                EndIndex: expression.EndIndex,
                Name: expression.Name,
                Value: scope[expression.Name]
            }
        }

        case "GetItem": return {
            Type: "GetItem",
            Item: expression.Item,
            Of: InlineExpression(expression.Of, scope)
        }
    }
}