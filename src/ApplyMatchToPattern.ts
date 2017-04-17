/// <reference path="Pattern.ts" />
/// <reference path="VerifiedExpression.ts" />

function ApplyMatchToPattern(match: PatternMatch, pattern: Pattern): VerifiedExpression {
    switch (pattern.Type) {
        case "Boolean":
        case "Integer":
            return pattern
        case "AnyBoolean":
        case "AnyInteger":
        case "AnyFloat":
        case "AnyParameter":
            return match[pattern.Name]
        case "Unary": return {
            Type: "Unary",
            Operator: pattern.Operator,
            Operand: ApplyMatchToPattern(match, pattern.Operand)
        }
        case "Binary": return {
            Type: "Binary",
            Operator: pattern.Operator,
            Left: ApplyMatchToPattern(match, pattern.Left),
            Right: ApplyMatchToPattern(match, pattern.Right)
        }
    }
}