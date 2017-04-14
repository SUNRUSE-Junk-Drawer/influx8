/// <reference path="Pattern.ts" />
/// <reference path="GetReturnedPrimitive.ts" />

function CombinePatternMatches(a: PatternMatch, b: PatternMatch): PatternMatch | undefined {
    const combined: { [name: string]: VerifiedExpression } = {}
    for (const key in a) {
        if (Object.prototype.hasOwnProperty.call(b, key) && !MatchPattern(a[key], b[key]).length) return undefined
        combined[key] = a[key]
    }
    for (const key in b) {
        if (Object.prototype.hasOwnProperty.call(a, key)) continue
        combined[key] = b[key]
    }
    return combined
}

function CombinePatternMatchSets(a: PatternMatch[], b: PatternMatch[]): PatternMatch[] {
    const output: PatternMatch[] = []
    for (const fromA of a) for (const fromB of b) {
        const combined = CombinePatternMatches(fromA, fromB)
        if (combined) output.push(combined)
    }
    return output
}

function MatchPattern(expression: VerifiedExpression, pattern: Pattern): PatternMatch[] {
    switch (pattern.Type) {
        case "AnyBoolean": {
            if (GetReturnedPrimitive(expression) != "Boolean") return []
            const output: { [name: string]: VerifiedExpression } = {}
            output[pattern.Name] = expression
            return [output]
        }

        case "AnyInteger": {
            if (GetReturnedPrimitive(expression) != "Integer") return []
            const output: { [name: string]: VerifiedExpression } = {}
            output[pattern.Name] = expression
            return [output]
        }

        case "Boolean": {
            if (expression.Type != "Boolean") return []
            if (expression.Value != pattern.Value) return []
            return [{}]
        }

        case "Integer": {
            if (expression.Type != "Integer") return []
            if (expression.Value != pattern.Value) return []
            return [{}]
        }

        case "Unary": {
            if (expression.Type != "Unary") return []
            if (expression.Operator != pattern.Operator) return []
            return MatchPattern(expression.Operand, pattern.Operand)
        }

        case "Binary": {
            if (expression.Type != "Binary") return []
            if (expression.Operator != pattern.Operator) return []
            const firstSet = CombinePatternMatchSets(MatchPattern(expression.Left, pattern.Left), MatchPattern(expression.Right, pattern.Right))
            if (!BinaryReversible[expression.Operator]) return firstSet
            return firstSet.concat(CombinePatternMatchSets(MatchPattern(expression.Left, pattern.Right), MatchPattern(expression.Right, pattern.Left)))
        }
    }
}

function MatchPatternSet(expressions: VerifiedExpression[], patterns: Pattern[]): PatternMatch[] {
    if (expressions.length != patterns.length) return []
    let matches = MatchPattern(expressions[0], patterns[0])
    for (let i = 1; i < expressions.length; i++) matches = CombinePatternMatchSets(matches, MatchPattern(expressions[i], patterns[i]))
    return matches
}