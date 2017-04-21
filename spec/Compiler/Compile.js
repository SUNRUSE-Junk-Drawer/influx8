describe("compile", () => {
    const Namespace = require("rewire")("../../index.js")
    const Compile = Namespace.__get__("Compile")

    function Test(description, untypedTokens, untypedToTypedTokensMap, typedTokens, parenthesizedTokens, startIndex, endIndex, unrolledToTypecheckedExpressionsMap, typecheckedToVerifiedExpressionsMap, verifiedExpressions, matchedCSyntax, result) {
        it(description, () => {
            Namespace.__set__("ParseUntypedTokens", (source) => {
                expect(source).toEqual("Test Source")
                return untypedTokens
            })
            Namespace.__set__("ParseTokens", (untypedToken) => {
                if (untypedToTypedTokensMap) {
                    expect(Object.prototype.hasOwnProperty.call(untypedToTypedTokensMap, untypedToken)).toBeTruthy()
                    return untypedToTypedTokensMap[untypedToken]
                } else fail("Tokens were not expected to be parsed")
            })
            Namespace.__set__("ParenthesizeTokens", (actualTypedTokens) => {
                if (parenthesizedTokens) {
                    expect(actualTypedTokens).toEqual(typedTokens)
                    return parenthesizedTokens
                } else fail("Tokens were not expected to be parenthesized")
            })
            Namespace.__set__("ParseExpression", (tokens, actualStartIndex, actualEndIndex) => {
                if (parenthesizedTokens) {
                    expect(tokens).toEqual(parenthesizedTokens)
                    expect(actualStartIndex).toEqual(startIndex)
                    expect(actualEndIndex).toEqual(endIndex)
                    return "test parsed expression"
                } else fail("Tokens were not expected to be parsed into an expression")
            })
            Namespace.__set__("InlineExpression", (parsed, scope) => {
                expect(parsed).toEqual("test parsed expression")
                expect(scope).toEqual("Test Scope")
                return "test inlined expression"
            })
            Namespace.__set__("UnrollExpression", (inlined) => {
                expect(inlined).toEqual("test inlined expression")
                return ["test unrolled expression a", "test unrolled expression b", "test unrolled expression c", "test unrolled expression d"]
            })
            Namespace.__set__("TypecheckExpression", (expression) => {
                if (unrolledToTypecheckedExpressionsMap) {
                    expect(Object.prototype.hasOwnProperty.call(unrolledToTypecheckedExpressionsMap, expression)).toBeTruthy()
                    return unrolledToTypecheckedExpressionsMap[expression]
                } else fail("Exrpessions were not expected to be typechecked")
            })
            Namespace.__set__("VerifyExpression", (expression) => {
                if (typecheckedToVerifiedExpressionsMap) {
                    expect(Object.prototype.hasOwnProperty.call(typecheckedToVerifiedExpressionsMap, expression)).toBeTruthy()
                    return typecheckedToVerifiedExpressionsMap[expression]
                } else fail("Expressions were not expected to be verified")
            })
            Namespace.__set__("MatchCSyntax", (expressions, syntax) => {
                if (verifiedExpressions) {
                    expect(expressions).toEqual(verifiedExpressions)
                    expect(syntax).toEqual("Test Syntax")
                    return matchedCSyntax
                } else fail("The C syntax was not expected to be matched")
            })
            Namespace.__set__("GenerateCSyntax", (match, syntax) => {
                if (matchedCSyntax) {
                    expect(match).toEqual(matchedCSyntax)
                    expect(syntax).toEqual("Test Syntax")
                    return "test generated c syntax"
                } else fail("The C syntax was not expected to be generated")
            })
            expect(Compile("Test Source", "Test Syntax", "Test Scope")).toEqual(result)
        })
    }

    Test("no tokens", [], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)

    Test(
        "one parenthesized token where the first expression does not verify",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }],
        32, 47,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": undefined,
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        undefined,
        undefined,
        undefined
    )

    Test(
        "one parenthesized token where the second expression does not verify",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }],
        32, 47,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": undefined,
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        undefined,
        undefined,
        undefined
    )

    Test(
        "one parenthesized token where the last expression does not verify",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }],
        32, 47,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": undefined
        },
        undefined,
        undefined,
        undefined
    )

    Test(
        "one parenthesized token where all expressions verify but the result does not match to a C syntax",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }],
        32, 47,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        ["test verified expression a", "test verified expression b", "test verified expression c", "test verified expression d"],
        undefined,
        undefined
    )

    Test(
        "one parenthesized token where all expressions verify and the result matches the C syntax",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }],
        32, 47,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        ["test verified expression a", "test verified expression b", "test verified expression c", "test verified expression d"],
        "test matched c syntax",
        "test generated c syntax"
    )


    Test(
        "two parenthesized tokens where the first expression does not verify",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }, { StartIndex: 65, EndIndex: 72 }],
        32, 72,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": undefined,
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        undefined,
        undefined,
        undefined
    )

    Test(
        "two parenthesized tokens where the second expression does not verify",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }, { StartIndex: 65, EndIndex: 72 }],
        32, 72,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": undefined,
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        undefined,
        undefined,
        undefined
    )

    Test(
        "two parenthesized tokens where the last expression does not verify",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }, { StartIndex: 65, EndIndex: 72 }],
        32, 72,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": undefined
        },
        undefined,
        undefined,
        undefined
    )

    Test(
        "two parenthesized tokens where all expressions verify but the result does not match to a C syntax",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }, { StartIndex: 65, EndIndex: 72 }],
        32, 72,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        ["test verified expression a", "test verified expression b", "test verified expression c", "test verified expression d"],
        undefined,
        undefined
    )

    Test(
        "two parenthesized tokens where all expressions verify and the result matches the C syntax",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }, { StartIndex: 65, EndIndex: 72 }],
        32, 72,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        ["test verified expression a", "test verified expression b", "test verified expression c", "test verified expression d"],
        "test matched c syntax",
        "test generated c syntax"
    )


    Test(
        "three parenthesized tokens where the first expression does not verify",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }, { StartIndex: 65, EndIndex: 72 }, { StartIndex: 88, EndIndex: 96 }],
        32, 96,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": undefined,
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        undefined,
        undefined,
        undefined
    )

    Test(
        "three parenthesized tokens where the second expression does not verify",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }, { StartIndex: 65, EndIndex: 72 }, { StartIndex: 88, EndIndex: 96 }],
        32, 96,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": undefined,
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        undefined,
        undefined,
        undefined
    )

    Test(
        "three parenthesized tokens where the last expression does not verify",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }, { StartIndex: 65, EndIndex: 72 }, { StartIndex: 88, EndIndex: 96 }],
        32, 96,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": undefined
        },
        undefined,
        undefined,
        undefined
    )

    Test(
        "three parenthesized tokens where all expressions verify but the result does not match to a C syntax",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }, { StartIndex: 65, EndIndex: 72 }, { StartIndex: 88, EndIndex: 96 }],
        32, 96,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        ["test verified expression a", "test verified expression b", "test verified expression c", "test verified expression d"],
        undefined,
        undefined
    )

    Test(
        "three parenthesized tokens where all expressions verify and the result matches the C syntax",
        ["test untyped token a", "test untyped token b", "test untyped token c"],
        {
            "test untyped token a": ["test typed token a a", "test typed token a b"],
            "test untyped token b": ["test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d"],
            "test untyped token c": ["test typed token c a", "test typed token c b", "test typed token c c"]
        },
        [
            "test typed token a a", "test typed token a b",
            "test typed token b a", "test typed token b b", "test typed token b c", "test typed token b d",
            "test typed token c a", "test typed token c b", "test typed token c c"
        ],
        [{ StartIndex: 32, EndIndex: 47 }, { StartIndex: 65, EndIndex: 72 }, { StartIndex: 88, EndIndex: 96 }],
        32, 96,
        {
            "test unrolled expression a": "test typechecked expression a",
            "test unrolled expression b": "test typechecked expression b",
            "test unrolled expression c": "test typechecked expression c",
            "test unrolled expression d": "test typechecked expression d"
        },
        {
            "test typechecked expression a": "test verified expression a",
            "test typechecked expression b": "test verified expression b",
            "test typechecked expression c": "test verified expression c",
            "test typechecked expression d": "test verified expression d"
        },
        ["test verified expression a", "test verified expression b", "test verified expression c", "test verified expression d"],
        "test matched c syntax",
        "test generated c syntax"
    )
})