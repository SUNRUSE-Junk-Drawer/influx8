/// <reference path="Token.ts" />
/// <reference path="VerifiedExpression.ts" />
/// <reference path="ParseUntypedTokens.ts" />
/// <reference path="ParseTokens.ts" />
/// <reference path="ParenthesizeTokens.ts" />
/// <reference path="ParseExpression.ts" />
/// <reference path="InlineExpression.ts" />
/// <reference path="UnrollExpression.ts" />
/// <reference path="TypecheckExpression.ts" />
/// <reference path="VerifyExpression.ts" />
/// <reference path="MatchCSyntax.ts" />
/// <reference path="GenerateCSyntax.ts" />
/// <reference path="FindErrorsInRawExpressionCriticalPath.ts" />
/// <reference path="FindErrorsInInlinedExpression.ts" />

function Compile<TUnary extends string, TBinary extends string, TFunction extends string>(source: string, syntax: CSyntax<TUnary, TBinary, TFunction>, scope: Scope): string | undefined {
    const untypedTokens = ParseUntypedTokens(source)
    if (!untypedTokens.length) return undefined
    const typedTokens: UnparenthesizedToken[] = []
    for (const untypedToken of untypedTokens) for (const typedToken of ParseTokens(untypedToken)) typedTokens.push(typedToken)
    const parenthesized = ParenthesizeTokens(typedTokens)
    const parsed = ParseExpression(parenthesized, parenthesized[0].StartIndex, parenthesized[parenthesized.length - 1].EndIndex)
    const inlined = InlineExpression(parsed, scope)
    const unrolled = UnrollExpression(inlined)
    const all: VerifiedExpression[] = []
    for (const dimension of unrolled) {
        const typechecked = TypecheckExpression(dimension)
        const verified = VerifyExpression(typechecked)
        if (!verified) return undefined
        all.push(verified)
    }
    const matched = MatchCSyntax(all, syntax)
    if (!matched) return undefined
    return GenerateCSyntax<TUnary, TBinary, TFunction>(matched, syntax)
}