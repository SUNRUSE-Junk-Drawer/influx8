/// <reference path="VerifiedExpression.ts" />
/// <reference path="CSyntax.ts" />
/// <reference path="MatchPattern.ts" />
/// <reference path="ApplyMatchToPattern.ts" />

function MatchCSyntaxPatternMatch<TUnary extends string, TBinary extends string, TFunction extends string>(match: PatternMatch, syntax: CSyntax<TUnary, TBinary, TFunction>, pattern: CSyntaxPattern<TUnary, TBinary, TFunction>): CSyntaxMatch<TUnary, TBinary, TFunction> | undefined {
    switch (pattern.Type) {
        case "Unary": {
            const operand: VerifiedExpression[] = []
            for (const dimension of pattern.ResultOperand) operand.push(ApplyMatchToPattern(match, dimension))
            const recursed = MatchCSyntax(operand, syntax)
            if (!recursed) return undefined
            return {
                Type: "Unary",
                Operator: pattern.Operator,
                Operand: recursed
            }
        }

        case "Binary": {
            const left: VerifiedExpression[] = []
            for (const dimension of pattern.ResultLeft) left.push(ApplyMatchToPattern(match, dimension))
            const recursedLeft = MatchCSyntax(left, syntax)
            if (!recursedLeft) return undefined

            const right: VerifiedExpression[] = []
            for (const dimension of pattern.ResultRight) right.push(ApplyMatchToPattern(match, dimension))
            const recursedRight = MatchCSyntax(right, syntax)
            if (!recursedRight) return undefined

            return {
                Type: "Binary",
                Operator: pattern.Operator,
                Left: recursedLeft,
                Right: recursedRight
            }
        }

        case "Function": {
            const args: CSyntaxMatch<TUnary, TBinary, TFunction>[] = []

            for (const argPattern of pattern.ResultArguments) {
                const operand: VerifiedExpression[] = []
                for (const dimension of argPattern) operand.push(ApplyMatchToPattern(match, dimension))
                const recursed = MatchCSyntax(operand, syntax)
                if (!recursed) return undefined
                args.push(recursed)
            }

            return {
                Type: "Function",
                Function: pattern.Function,
                Arguments: args
            }
        }
    }
}

function MatchCSyntaxPattern<TUnary extends string, TBinary extends string, TFunction extends string>(expression: VerifiedExpression[], syntax: CSyntax<TUnary, TBinary, TFunction>, pattern: CSyntaxPattern<TUnary, TBinary, TFunction>): CSyntaxMatch<TUnary, TBinary, TFunction> | undefined {
    // TODO: Looping rather than just taking the first match is probably unnecessary.
    for (const match of MatchPatternSet(expression, pattern.Pattern)) {
        const recursed = MatchCSyntaxPatternMatch(match, syntax, pattern)
        if (recursed) return recursed
    }
    return undefined
}

function MatchCSyntaxConstant<TUnary extends string, TBinary extends string, TFunction extends string>(expression: VerifiedExpression[]): CSyntaxMatch<TUnary, TBinary, TFunction> | undefined {
    if (expression.length != 1) return undefined
    const onlyExpression = expression[0]
    switch (onlyExpression.Type) {
        case "Boolean":
        case "Integer":
            return onlyExpression

        case "Unary":
        case "Binary":
            return undefined
    }
}

function MatchCSyntax<TUnary extends string, TBinary extends string, TFunction extends string>(expression: VerifiedExpression[], syntax: CSyntax<TUnary, TBinary, TFunction>): CSyntaxMatch<TUnary, TBinary, TFunction> | undefined {
    const constant = MatchCSyntaxConstant<TUnary, TBinary, TFunction>(expression)
    if (constant) return constant
    for (const pattern of syntax.Patterns) {
        const match = MatchCSyntaxPattern(expression, syntax, pattern)
        if (match) return match
    }
    return undefined
}