describe("ParseOperatorExpressionLevel", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const ParseOperatorExpressionLevel = Namespace.__get__("ParseOperatorExpressionLevel")

    describe("unary", () => {
        beforeAll(() => {
            Namespace.__set__("UntypedUnaryKeywordsAndSymbols", {
                "Symbol From The Correct Precedence Level": "Matched Operator",
                "Another Symbol From The Correct Precedence Level": "Another Matched Operator",
                "Unary Symbol From Another Precedence Level": "Operator From Wrong Precedence Level"
            })

            Namespace.__set__("UntypedBinaryKeywordsAndSymbols", {
                "Binary Symbol From Another Precedence Level": "Binary Operator"
            })
        })

        function Test(description, input, output, tryParseExpression) {
            it(description, () => {
                Namespace.__set__("TryParseExpression", tryParseExpression || fail)
                expect(ParseOperatorExpressionLevel(input, {
                    Type: "Unary",
                    Operators: ["Unused First Operator", "Matched Operator", "Another Matched Operator", "Unused Last Operator"]
                })).toEqual(output)
            })
        }

        Test("nothing", [], undefined)

        Test("one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything A"
        }], undefined)

        Test("one token which is an operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is an operator which is on the object prototype", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "constructor"
        }], undefined)

        Test("one token which is a unary operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)

        Test("one token which is a binary operator from the another precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)

        Test("one token which is not an operator then one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything A"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            EndIndex: 3680,
            Symbol: "Anything B"
        }], undefined)


        Test("one token which is an operator which is on the object prototype then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "constructor"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            EndIndex: 3680,
            Symbol: "Anything B"
        }], undefined)

        Test("one token which is an operator from the correct precedence level then one token which is not an operator and parses", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }], {
                Type: "Unary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    EndIndex: 3680,
                    Symbol: "Anything B"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then one token which is not an operator and does not parse", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }], undefined, (tokens) => {
            expect(tokens).toEqual([{
                Type: "Misc B",
                StartIndex: 3643,
                EndIndex: 3680,
                Symbol: "Anything B"
            }])
            return undefined
        })

        Test("one token which is a unary operator from the correct precedence level then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }], undefined)

        Test("one token which is a binary operator from the another precedence level then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }], undefined)


        Test("one token which is an operator which is on the object prototype then multiple tokens which are not operators", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "constructor"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            EndIndex: 3735,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            EndIndex: 3798,
            Symbol: "Anything D"
        }], undefined)

        Test("one token which is an operator from the correct precedence level then multiple tokens which are not operators and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            EndIndex: 3735,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            EndIndex: 3798,
            Symbol: "Anything D"
        }], {
                Type: "Unary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    EndIndex: 3680,
                    Symbol: "Anything B"
                }, {
                    Type: "Misc C",
                    StartIndex: 3712,
                    EndIndex: 3735,
                    Symbol: "Anything C"
                }, {
                    Type: "Misc D",
                    StartIndex: 3784,
                    EndIndex: 3798,
                    Symbol: "Anything D"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then multiple tokens which are not operators and do not parse", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            EndIndex: 3735,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            EndIndex: 3798,
            Symbol: "Anything D"
        }], undefined, (tokens) => {
            expect(tokens).toEqual([{
                Type: "Misc B",
                StartIndex: 3643,
                EndIndex: 3680,
                Symbol: "Anything B"
            }, {
                Type: "Misc C",
                StartIndex: 3712,
                EndIndex: 3735,
                Symbol: "Anything C"
            }, {
                Type: "Misc D",
                StartIndex: 3784,
                EndIndex: 3798,
                Symbol: "Anything D"
            }])
            return undefined
        })

        Test("one token which is a unary operator from the correct precedence level then multiple tokens which are not operators", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            EndIndex: 3735,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            EndIndex: 3798,
            Symbol: "Anything D"
        }], undefined)

        Test("one token which is a binary operator from the another precedence level then multiple tokens which are not operators", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            EndIndex: 3735,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            EndIndex: 3798,
            Symbol: "Anything D"
        }], undefined)


        Test("one token which is not an operator then a token which is an operator on the correct precedence level", [{
            Type: "Misc A",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("multiple tokens which are not operators then a token which is an operator on the correct precedence level", [{
            Type: "Misc A",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything A"
        }, {
            Type: "Misc B",
            StartIndex: 3520,
            EndIndex: 3531,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3599,
            EndIndex: 3602,
            Symbol: "Anything C"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is not an operator then a token which is an operator on the correct precedence level then one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3724,
            EndIndex: 3729,
            Symbol: "Anything C"
        }], undefined)

        Test("multiple tokens which are not operators then a token which is an operator on the correct precedence level then one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything A"
        }, {
            Type: "Misc B",
            StartIndex: 3520,
            EndIndex: 3531,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3599,
            EndIndex: 3602,
            Symbol: "Anything C"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc E",
            StartIndex: 3724,
            EndIndex: 3729,
            EndIndex: 3729,
            Symbol: "Anything E"
        }], undefined)

        Test("one token which is not an operator then a token which is an operator on the correct precedence level then multiple tokens which are not an operators", [{
            Type: "Misc A",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3724,
            EndIndex: 3729,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3854,
            EndIndex: 3857,
            Symbol: "Anything D"
        }], undefined)

        Test("multiple tokens which are not operators then a token which is an operator on the correct precedence level then multiple tokens which are not operators", [{
            Type: "Misc A",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything A"
        }, {
            Type: "Misc B",
            StartIndex: 3520,
            EndIndex: 3531,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3599,
            EndIndex: 3602,
            Symbol: "Anything C"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc E",
            StartIndex: 3724,
            EndIndex: 3729,
            Symbol: "Anything E"
        }, {
            Type: "Misc F",
            StartIndex: 3775,
            EndIndex: 3778,
            Symbol: "Anything F"
        }], undefined)


        Test("one token which is an operator from the correct precedence level then multiple tokens of which the first is the same operator and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            EndIndex: 3735,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            EndIndex: 3798,
            Symbol: "Anything D"
        }], {
                Type: "Unary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Operator",
                    StartIndex: 3643,
                    EndIndex: 3680,
                    Symbol: "Symbol From The Correct Precedence Level"
                }, {
                    Type: "Misc C",
                    StartIndex: 3712,
                    EndIndex: 3735,
                    Symbol: "Anything C"
                }, {
                    Type: "Misc D",
                    StartIndex: 3784,
                    EndIndex: 3798,
                    Symbol: "Anything D"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then multiple tokens of which the middle is the same operator and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }, {
            Type: "Operator",
            StartIndex: 3712,
            EndIndex: 3735,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            EndIndex: 3798,
            Symbol: "Anything D"
        }], {
                Type: "Unary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    EndIndex: 3680,
                    Symbol: "Anything B"
                }, {
                    Type: "Operator",
                    StartIndex: 3712,
                    EndIndex: 3735,
                    Symbol: "Symbol From The Correct Precedence Level"
                }, {
                    Type: "Misc D",
                    StartIndex: 3784,
                    EndIndex: 3798,
                    Symbol: "Anything D"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then multiple tokens of which the last is the same operator and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            EndIndex: 3735,
            Symbol: "Anything C"
        }, {
            Type: "Operator",
            StartIndex: 3784,
            EndIndex: 3798,
            Symbol: "Symbol From The Correct Precedence Level"
        }], {
                Type: "Unary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    EndIndex: 3680,
                    Symbol: "Anything B"
                }, {
                    Type: "Misc C",
                    StartIndex: 3712,
                    EndIndex: 3735,
                    Symbol: "Anything C"
                }, {
                    Type: "Operator",
                    StartIndex: 3784,
                    EndIndex: 3798,
                    Symbol: "Symbol From The Correct Precedence Level"
                }])
                return "Test Operand"
            })


        Test("one token which is an operator from the correct precedence level then multiple tokens of which the first is from the same precedence level and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            EndIndex: 3735,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            EndIndex: 3798,
            Symbol: "Anything D"
        }], {
                Type: "Unary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Operator",
                    StartIndex: 3643,
                    EndIndex: 3680,
                    Symbol: "Another Symbol From The Correct Precedence Level"
                }, {
                    Type: "Misc C",
                    StartIndex: 3712,
                    EndIndex: 3735,
                    Symbol: "Anything C"
                }, {
                    Type: "Misc D",
                    StartIndex: 3784,
                    EndIndex: 3798,
                    Symbol: "Anything D"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then multiple tokens of which the middle is from the same precedence level and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }, {
            Type: "Operator",
            StartIndex: 3712,
            EndIndex: 3735,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            EndIndex: 3798,
            Symbol: "Anything D"
        }], {
                Type: "Unary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    EndIndex: 3680,
                    Symbol: "Anything B"
                }, {
                    Type: "Operator",
                    StartIndex: 3712,
                    EndIndex: 3735,
                    Symbol: "Another Symbol From The Correct Precedence Level"
                }, {
                    Type: "Misc D",
                    StartIndex: 3784,
                    EndIndex: 3798,
                    Symbol: "Anything D"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then multiple tokens of which the last is from the same precedence level and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            EndIndex: 3680,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            EndIndex: 3735,
            Symbol: "Anything C"
        }, {
            Type: "Operator",
            StartIndex: 3784,
            EndIndex: 3798,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }], {
                Type: "Unary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    EndIndex: 3680,
                    Symbol: "Anything B"
                }, {
                    Type: "Misc C",
                    StartIndex: 3712,
                    EndIndex: 3735,
                    Symbol: "Anything C"
                }, {
                    Type: "Operator",
                    StartIndex: 3784,
                    EndIndex: 3798,
                    Symbol: "Another Symbol From The Correct Precedence Level"
                }])
                return "Test Operand"
            })
    })

    describe("binary left to right", () => {
        beforeAll(() => {
            Namespace.__set__("UntypedUnaryKeywordsAndSymbols", {
                "Unary Symbol From Another Precedence Level": "Binary Operator"
            })

            Namespace.__set__("UntypedBinaryKeywordsAndSymbols", {
                "Symbol From The Correct Precedence Level": "Matched Operator",
                "Another Symbol From The Correct Precedence Level": "Another Matched Operator",
                "Binary Symbol From Another Precedence Level": "Operator From Wrong Precedence Level"
            })
        })

        function Test(description, input, output, tryParseExpression) {
            it(description, () => {
                Namespace.__set__("TryParseExpression", tryParseExpression || fail)
                expect(ParseOperatorExpressionLevel(input, {
                    Type: "BinaryLeftToRight",
                    Operators: ["Unused First Operator", "Matched Operator", "Another Matched Operator", "Unused Last Operator"]
                })).toEqual(output)
            })
        }

        Test("nothing", [], undefined)
        Test("one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything A"
        }], undefined)
        Test("one token which is an operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is a unary operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is an operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is not an operator then one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Anything A"
        }, {
            Type: "Misc B",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything B"
        }], undefined)
        Test("one token which is not an operator then one token which is an operator from another precedence level", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is not an operator then one token which is a unary operator from another precedence level", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is not an operator then one token which is an operator from the correct precedence level", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is an operator from another precedence level then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything B"
        }], undefined)
        Test("one token which is an operator from another precedence level then one token which is an operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is an operator from another precedence level then one token which is a unary operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is an operator from another precedence level then one token which is an operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is a unary operator from another precedence level then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything B"
        }], undefined)
        Test("one token which is a unary operator from another precedence level then one token which is an operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is a unary operator from another precedence level then one token which is a unary operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is a unary operator from another precedence level then one token which is an operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is an operator from the correct precedence level then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything B"
        }], undefined)
        Test("one token which is an operator from the correct precedence level then one token which is an operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is an operator from the correct precedence level then one token which is a unary operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is an operator from the correct precedence level then one token which is the same operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)
        Test("one token which is an operator from the correct precedence level then one token which is a different operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is not an operator which parses then an operator from another precedence level then one token which is not an operator which parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], undefined)

        Test("one token which is not an operator which parses then a unary operator from another precedence level then one token which is not an operator which parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], undefined)

        Test("one token which is not an operator which parses then an operator from the correct precedence level then one token which is not an operator which parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc C",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value C"
                    }])
                    return "Parsed Right"
                }
            })

        Test("one token which is not an operator which does not parse then an operator from the correct precedence level then one token which is not an operator which parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], undefined, (tokens) => {
            if (tokens[0].Symbol == "Value A") {
                expect(tokens).toEqual([{
                    Type: "Misc A",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value A"
                }])
                return undefined
            } else {
                expect(tokens).toEqual([{
                    Type: "Misc C",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value C"
                }])
                return "Parsed Right"
            }
        })

        Test("one token which is not an operator which parses then an operator from the correct precedence level then one token which is not an operator which does not parse", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], undefined, (tokens) => {
            if (tokens[0].Symbol == "Value A") {
                expect(tokens).toEqual([{
                    Type: "Misc A",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value A"
                }])
                return "Parsed Left"
            } else {
                expect(tokens).toEqual([{
                    Type: "Misc C",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value C"
                }])
                return undefined
            }
        })

        Test("one token which is not an operator which does not parse then an operator from the correct precedence level then one token which is not an operator which does not parse", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], undefined, (tokens) => {
            if (tokens[0].Symbol == "Value A") {
                expect(tokens).toEqual([{
                    Type: "Misc A",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value A"
                }])
                return undefined
            } else {
                expect(tokens).toEqual([{
                    Type: "Misc C",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value C"
                }])
                return undefined
            }
        })

        Test("one token which is an operator which parses then an operator from the correct precedence level then one token which is not an operator which parses", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Another Symbol From The Correct Precedence Level") {
                    expect(tokens).toEqual([{
                        Type: "Operator",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Another Symbol From The Correct Precedence Level"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc C",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value C"
                    }])
                    return "Parsed Right"
                }
            })

        Test("one token which is not an operator which parses then an operator from the correct precedence level then one token which is an operator which parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Operator",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Another Symbol From The Correct Precedence Level"
                    }])
                    return "Parsed Right"
                }
            })

        Test("multiple tokens which are not operators which parse then an operator from the correct precedence level then multiple tokens which are not operators which parse", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Misc E",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value E"
        }, {
            Type: "Misc F",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value F"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Misc E",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value E"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value F"
                    }])
                    return "Parsed Right"
                }
            })

        Test("the same operator twice where the first parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Operator",
                        StartIndex: 3233,
                        EndIndex: 3244,
                        Symbol: "Symbol From The Correct Precedence Level"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right"
                }
            })

        Test("two different operators where the first parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Operator",
                        StartIndex: 3233,
                        EndIndex: 3244,
                        Symbol: "Another Symbol From The Correct Precedence Level"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right"
                }
            })

        Test("two operators where the first parses and the second is from another precedence level", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Operator",
                        StartIndex: 3233,
                        EndIndex: 3244,
                        Symbol: "Binary Symbol From Another Precedence Level"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right"
                }
            })

        Test("two operators where the first parses and the second is from another precedence level", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Operator",
                        StartIndex: 3233,
                        EndIndex: 3244,
                        Symbol: "Unary Symbol From Another Precedence Level"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right"
                }
            })

        Test("the same operator twice where only the second parses due to the left side", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left B",
                Right: "Parsed Right B"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    if (tokens.length == 2) {
                        expect(tokens).toEqual([{
                            Type: "Misc A",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value A"
                        }, {
                            Type: "Misc B",
                            StartIndex: 3256,
                            EndIndex: 3259,
                            Symbol: "Value B"
                        }])
                        return undefined
                    } else {
                        expect(tokens).toEqual([{
                            Type: "Misc A",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value A"
                        }, {
                            Type: "Misc B",
                            StartIndex: 3256,
                            EndIndex: 3259,
                            Symbol: "Value B"
                        }, {
                            Type: "Operator",
                            StartIndex: 3487,
                            EndIndex: 3520,
                            Symbol: "Symbol From The Correct Precedence Level"
                        }, {
                            Type: "Misc D",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value D"
                        }])
                        return "Parsed Left B"
                    }
                } else if (tokens[0].Symbol == "Value D") {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Operator",
                        StartIndex: 3233,
                        EndIndex: 3244,
                        Symbol: "Symbol From The Correct Precedence Level"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right A"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right B"
                }
            })

        Test("the same operator twice where only the second parses due to the right side", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left B",
                Right: "Parsed Right B"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    if (tokens.length == 2) {
                        expect(tokens).toEqual([{
                            Type: "Misc A",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value A"
                        }, {
                            Type: "Misc B",
                            StartIndex: 3256,
                            EndIndex: 3259,
                            Symbol: "Value B"
                        }])
                        return "Parsed Left A"
                    } else {
                        expect(tokens).toEqual([{
                            Type: "Misc A",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value A"
                        }, {
                            Type: "Misc B",
                            StartIndex: 3256,
                            EndIndex: 3259,
                            Symbol: "Value B"
                        }, {
                            Type: "Operator",
                            StartIndex: 3487,
                            EndIndex: 3520,
                            Symbol: "Symbol From The Correct Precedence Level"
                        }, {
                            Type: "Misc D",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value D"
                        }])
                        return "Parsed Left B"
                    }
                } else if (tokens[0].Symbol == "Value D") {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Operator",
                        StartIndex: 3233,
                        EndIndex: 3244,
                        Symbol: "Symbol From The Correct Precedence Level"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return undefined
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right B"
                }
            })

        Test("two operators where the first is from the wrong precedence layer", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }, {
                        Type: "Operator",
                        StartIndex: 3487,
                        EndIndex: 3520,
                        Symbol: "Binary Symbol From Another Precedence Level"
                    }, {
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right"
                }
            })
    })

    describe("binary right to left", () => {
        beforeAll(() => {
            Namespace.__set__("UntypedUnaryKeywordsAndSymbols", {
                "Unary Symbol From Another Precedence Level": "Binary Operator"
            })

            Namespace.__set__("UntypedBinaryKeywordsAndSymbols", {
                "Symbol From The Correct Precedence Level": "Matched Operator",
                "Another Symbol From The Correct Precedence Level": "Another Matched Operator",
                "Binary Symbol From Another Precedence Level": "Operator From Wrong Precedence Level"
            })
        })

        function Test(description, input, output, tryParseExpression) {
            it(description, () => {
                Namespace.__set__("TryParseExpression", tryParseExpression || fail)
                expect(ParseOperatorExpressionLevel(input, {
                    Type: "BinaryRightToLeft",
                    Operators: ["Unused First Operator", "Matched Operator", "Another Matched Operator", "Unused Last Operator"]
                })).toEqual(output)
            })
        }

        Test("nothing", [], undefined)
        Test("one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything A"
        }], undefined)
        Test("one token which is an operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is a unary operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is an operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is not an operator then one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Anything A"
        }, {
            Type: "Misc B",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything B"
        }], undefined)
        Test("one token which is not an operator then one token which is an operator from another precedence level", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is not an operator then one token which is a unary operator from another precedence level", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is not an operator then one token which is an operator from the correct precedence level", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is an operator from another precedence level then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything B"
        }], undefined)
        Test("one token which is an operator from another precedence level then one token which is an operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is an operator from another precedence level then one token which is a unary operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is an operator from another precedence level then one token which is an operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is a unary operator from another precedence level then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything B"
        }], undefined)
        Test("one token which is a unary operator from another precedence level then one token which is an operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is a unary operator from another precedence level then one token which is a unary operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is a unary operator from another precedence level then one token which is an operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is an operator from the correct precedence level then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Anything B"
        }], undefined)
        Test("one token which is an operator from the correct precedence level then one token which is an operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is an operator from the correct precedence level then one token which is a unary operator from another precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)
        Test("one token which is an operator from the correct precedence level then one token which is the same operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)
        Test("one token which is an operator from the correct precedence level then one token which is a different operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is not an operator which parses then an operator from another precedence level then one token which is not an operator which parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], undefined)

        Test("one token which is not an operator which parses then a unary operator from another precedence level then one token which is not an operator which parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], undefined)

        Test("one token which is not an operator which parses then an operator from the correct precedence level then one token which is not an operator which parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc C",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value C"
                    }])
                    return "Parsed Right"
                }
            })

        Test("one token which is not an operator which does not parse then an operator from the correct precedence level then one token which is not an operator which parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], undefined, (tokens) => {
            if (tokens[0].Symbol == "Value A") {
                expect(tokens).toEqual([{
                    Type: "Misc A",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value A"
                }])
                return undefined
            } else {
                expect(tokens).toEqual([{
                    Type: "Misc C",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value C"
                }])
                return "Parsed Right"
            }
        })

        Test("one token which is not an operator which parses then an operator from the correct precedence level then one token which is not an operator which does not parse", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], undefined, (tokens) => {
            if (tokens[0].Symbol == "Value A") {
                expect(tokens).toEqual([{
                    Type: "Misc A",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value A"
                }])
                return "Parsed Left"
            } else {
                expect(tokens).toEqual([{
                    Type: "Misc C",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value C"
                }])
                return undefined
            }
        })

        Test("one token which is not an operator which does not parse then an operator from the correct precedence level then one token which is not an operator which does not parse", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], undefined, (tokens) => {
            if (tokens[0].Symbol == "Value A") {
                expect(tokens).toEqual([{
                    Type: "Misc A",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value A"
                }])
                return undefined
            } else {
                expect(tokens).toEqual([{
                    Type: "Misc C",
                    StartIndex: 3214,
                    EndIndex: 3219,
                    Symbol: "Value C"
                }])
                return undefined
            }
        })

        Test("one token which is an operator which parses then an operator from the correct precedence level then one token which is not an operator which parses", [{
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value C"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Another Symbol From The Correct Precedence Level") {
                    expect(tokens).toEqual([{
                        Type: "Operator",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Another Symbol From The Correct Precedence Level"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc C",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value C"
                    }])
                    return "Parsed Right"
                }
            })

        Test("one token which is not an operator which parses then an operator from the correct precedence level then one token which is an operator which parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Operator",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Another Symbol From The Correct Precedence Level"
                    }])
                    return "Parsed Right"
                }
            })

        Test("multiple tokens which are not operators which parse then an operator from the correct precedence level then multiple tokens which are not operators which parse", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Misc E",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value E"
        }, {
            Type: "Misc F",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value F"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Misc E",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value E"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value F"
                    }])
                    return "Parsed Right"
                }
            })

        Test("the same operator twice where the first parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }, {
                        Type: "Operator",
                        StartIndex: 3487,
                        EndIndex: 3520,
                        Symbol: "Symbol From The Correct Precedence Level"
                    }, {
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right"
                }
            })

        Test("two different operators where the first parses", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Another Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }, {
                        Type: "Operator",
                        StartIndex: 3487,
                        EndIndex: 3520,
                        Symbol: "Symbol From The Correct Precedence Level"
                    }, {
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right"
                }
            })

        Test("two operators where the first parses and the second is from another precedence level", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Operator",
                        StartIndex: 3233,
                        EndIndex: 3244,
                        Symbol: "Binary Symbol From Another Precedence Level"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right"
                }
            })

        Test("two operators where the first parses and the second is from another precedence level", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Operator",
                        StartIndex: 3233,
                        EndIndex: 3244,
                        Symbol: "Unary Symbol From Another Precedence Level"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right"
                }
            })

        Test("the same operator twice where only the second parses due to the left side", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left B",
                Right: "Parsed Right B"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    if (tokens.length == 2) {
                        expect(tokens).toEqual([{
                            Type: "Misc A",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value A"
                        }, {
                            Type: "Misc B",
                            StartIndex: 3256,
                            EndIndex: 3259,
                            Symbol: "Value B"
                        }])
                        return undefined
                    } else {
                        expect(tokens).toEqual([{
                            Type: "Misc A",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value A"
                        }, {
                            Type: "Misc B",
                            StartIndex: 3256,
                            EndIndex: 3259,
                            Symbol: "Value B"
                        }, {
                            Type: "Operator",
                            StartIndex: 3487,
                            EndIndex: 3520,
                            Symbol: "Symbol From The Correct Precedence Level"
                        }, {
                            Type: "Misc D",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value D"
                        }])
                        return "Parsed Left B"
                    }
                } else if (tokens[0].Symbol == "Value D") {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Operator",
                        StartIndex: 3233,
                        EndIndex: 3244,
                        Symbol: "Symbol From The Correct Precedence Level"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right A"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right B"
                }
            })

        Test("the same operator twice where only the second parses due to the right side", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left B",
                Right: "Parsed Right B"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    if (tokens.length == 2) {
                        expect(tokens).toEqual([{
                            Type: "Misc A",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value A"
                        }, {
                            Type: "Misc B",
                            StartIndex: 3256,
                            EndIndex: 3259,
                            Symbol: "Value B"
                        }])
                        return "Parsed Left A"
                    } else {
                        expect(tokens).toEqual([{
                            Type: "Misc A",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value A"
                        }, {
                            Type: "Misc B",
                            StartIndex: 3256,
                            EndIndex: 3259,
                            Symbol: "Value B"
                        }, {
                            Type: "Operator",
                            StartIndex: 3487,
                            EndIndex: 3520,
                            Symbol: "Symbol From The Correct Precedence Level"
                        }, {
                            Type: "Misc D",
                            StartIndex: 3214,
                            EndIndex: 3219,
                            Symbol: "Value D"
                        }])
                        return "Parsed Left B"
                    }
                } else if (tokens[0].Symbol == "Value D") {
                    expect(tokens).toEqual([{
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }, {
                        Type: "Operator",
                        StartIndex: 3233,
                        EndIndex: 3244,
                        Symbol: "Symbol From The Correct Precedence Level"
                    }, {
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return undefined
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right B"
                }
            })

        Test("two operators where the first is from the wrong precedence layer", [{
            Type: "Misc A",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value A"
        }, {
            Type: "Misc B",
            StartIndex: 3256,
            EndIndex: 3259,
            Symbol: "Value B"
        }, {
            Type: "Operator",
            StartIndex: 3487,
            EndIndex: 3520,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3214,
            EndIndex: 3219,
            Symbol: "Value D"
        }, {
            Type: "Operator",
            StartIndex: 3233,
            EndIndex: 3244,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc F",
            StartIndex: 3464,
            EndIndex: 3471,
            Symbol: "Value F"
        }, {
            Type: "Misc G",
            StartIndex: 3684,
            EndIndex: 3689,
            Symbol: "Value G"
        }, {
            Type: "Misc H",
            StartIndex: 3699,
            EndIndex: 3704,
            Symbol: "Value H"
        }], {
                Type: "Binary",
                Operator: "Matched Operator",
                Left: "Parsed Left",
                Right: "Parsed Right"
            }, (tokens) => {
                if (tokens[0].Symbol == "Value A") {
                    expect(tokens).toEqual([{
                        Type: "Misc A",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value A"
                    }, {
                        Type: "Misc B",
                        StartIndex: 3256,
                        EndIndex: 3259,
                        Symbol: "Value B"
                    }, {
                        Type: "Operator",
                        StartIndex: 3487,
                        EndIndex: 3520,
                        Symbol: "Binary Symbol From Another Precedence Level"
                    }, {
                        Type: "Misc D",
                        StartIndex: 3214,
                        EndIndex: 3219,
                        Symbol: "Value D"
                    }])
                    return "Parsed Left"
                } else {
                    expect(tokens).toEqual([{
                        Type: "Misc F",
                        StartIndex: 3464,
                        EndIndex: 3471,
                        Symbol: "Value F"
                    }, {
                        Type: "Misc G",
                        StartIndex: 3684,
                        EndIndex: 3689,
                        Symbol: "Value G"
                    }, {
                        Type: "Misc H",
                        StartIndex: 3699,
                        EndIndex: 3704,
                        Symbol: "Value H"
                    }])
                    return "Parsed Right"
                }
            })
    })
})