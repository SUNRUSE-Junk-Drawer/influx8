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

        function Test(description, input, output, parseExpression) {
            it(description, () => {
                Namespace.__set__("ParseExpression", parseExpression || fail)
                expect(ParseOperatorExpressionLevel(input, {
                    Type: "Unary",
                    Operators: ["Unused First Operator", "Matched Operator", "Unused Last Operator"]
                })).toEqual(output)
            })
        }

        Test("nothing", [], undefined)

        Test("one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3487,
            Symbol: "Anything A"
        }], undefined)

        Test("one token which is an operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is an operator which is on the object prototype", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "constructor"
        }], undefined)

        Test("one token which is a unary operator from the correct precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Unary Symbol From Another Precedence Level"
        }], undefined)

        Test("one token which is a binary operator from the another precedence level", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Binary Symbol From Another Precedence Level"
        }], undefined)

        Test("one token which is not an operator then one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3487,
            Symbol: "Anything A"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }], undefined)


        Test("one token which is an operator which is on the object prototype then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "constructor"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }], undefined)

        Test("one token which is an operator from the correct precedence level then one token which is not an operator and parses", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }], {
                Type: "UntypedUnary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    Symbol: "Anything B"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then one token which is not an operator and does not parse", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }], undefined, (tokens) => {
            expect(tokens).toEqual([{
                Type: "Misc B",
                StartIndex: 3643,
                Symbol: "Anything B"
            }])
            return undefined
        })

        Test("one token which is a unary operator from the correct precedence level then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }], undefined)

        Test("one token which is a binary operator from the another precedence level then one token which is not an operator", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }], undefined)


        Test("one token which is an operator which is on the object prototype then multiple tokens which are not operators", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "constructor"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            Symbol: "Anything D"
        }], undefined)

        Test("one token which is an operator from the correct precedence level then multiple tokens which are not operators and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            Symbol: "Anything D"
        }], {
                Type: "UntypedUnary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    Symbol: "Anything B"
                }, {
                    Type: "Misc C",
                    StartIndex: 3712,
                    Symbol: "Anything C"
                }, {
                    Type: "Misc D",
                    StartIndex: 3784,
                    Symbol: "Anything D"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then multiple tokens which are not operators and do not parse", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            Symbol: "Anything D"
        }], undefined, (tokens) => {
            expect(tokens).toEqual([{
                Type: "Misc B",
                StartIndex: 3643,
                Symbol: "Anything B"
            }, {
                Type: "Misc C",
                StartIndex: 3712,
                Symbol: "Anything C"
            }, {
                Type: "Misc D",
                StartIndex: 3784,
                Symbol: "Anything D"
            }])
            return undefined
        })

        Test("one token which is a unary operator from the correct precedence level then multiple tokens which are not operators", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Unary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            Symbol: "Anything D"
        }], undefined)

        Test("one token which is a binary operator from the another precedence level then multiple tokens which are not operators", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Binary Symbol From Another Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            Symbol: "Anything D"
        }], undefined)


        Test("one token which is not an operator then a token which is an operator on the correct precedence level", [{
            Type: "Misc A",
            StartIndex: 3487,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("multiple tokens which are not operators then a token which is an operator on the correct precedence level", [{
            Type: "Misc A",
            StartIndex: 3487,
            Symbol: "Anything A"
        }, {
            Type: "Misc B",
            StartIndex: 3520,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3599,
            Symbol: "Anything C"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            Symbol: "Symbol From The Correct Precedence Level"
        }], undefined)

        Test("one token which is not an operator then a token which is an operator on the correct precedence level then one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3487,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3724,
            Symbol: "Anything C"
        }], undefined)

        Test("multiple tokens which are not operators then a token which is an operator on the correct precedence level then one token which is not an operator", [{
            Type: "Misc A",
            StartIndex: 3487,
            Symbol: "Anything A"
        }, {
            Type: "Misc B",
            StartIndex: 3520,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3599,
            Symbol: "Anything C"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc E",
            StartIndex: 3724,
            Symbol: "Anything E"
        }], undefined)

        Test("one token which is not an operator then a token which is an operator on the correct precedence level then multiple tokens which are not an operators", [{
            Type: "Misc A",
            StartIndex: 3487,
            Symbol: "Anything A"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3724,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3854,
            Symbol: "Anything D"
        }], undefined)

        Test("multiple tokens which are not operators then a token which is an operator on the correct precedence level then multiple tokens which are not operators", [{
            Type: "Misc A",
            StartIndex: 3487,
            Symbol: "Anything A"
        }, {
            Type: "Misc B",
            StartIndex: 3520,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3599,
            Symbol: "Anything C"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc E",
            StartIndex: 3724,
            Symbol: "Anything E"
        }, {
            Type: "Misc F",
            StartIndex: 3775,
            Symbol: "Anything F"
        }], undefined)


        Test("one token which is an operator from the correct precedence level then multiple tokens of which the first is the same operator and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            Symbol: "Anything D"
        }], {
                Type: "UntypedUnary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Operator",
                    StartIndex: 3643,
                    Symbol: "Symbol From The Correct Precedence Level"
                }, {
                    Type: "Misc C",
                    StartIndex: 3712,
                    Symbol: "Anything C"
                }, {
                    Type: "Misc D",
                    StartIndex: 3784,
                    Symbol: "Anything D"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then multiple tokens of which the middle is the same operator and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }, {
            Type: "Operator",
            StartIndex: 3712,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            Symbol: "Anything D"
        }], {
                Type: "UntypedUnary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    Symbol: "Anything B"
                }, {
                    Type: "Operator",
                    StartIndex: 3712,
                    Symbol: "Symbol From The Correct Precedence Level"
                }, {
                    Type: "Misc D",
                    StartIndex: 3784,
                    Symbol: "Anything D"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then multiple tokens of which the last is the same operator and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            Symbol: "Anything C"
        }, {
            Type: "Operator",
            StartIndex: 3784,
            Symbol: "Symbol From The Correct Precedence Level"
        }], {
                Type: "UntypedUnary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    Symbol: "Anything B"
                }, {
                    Type: "Misc C",
                    StartIndex: 3712,
                    Symbol: "Anything C"
                }, {
                    Type: "Operator",
                    StartIndex: 3784,
                    Symbol: "Symbol From The Correct Precedence Level"
                }])
                return "Test Operand"
            })


        Test("one token which is an operator from the correct precedence level then multiple tokens of which the first is from the same precedence level and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Operator",
            StartIndex: 3643,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            Symbol: "Anything C"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            Symbol: "Anything D"
        }], {
                Type: "UntypedUnary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Operator",
                    StartIndex: 3643,
                    Symbol: "Another Symbol From The Correct Precedence Level"
                }, {
                    Type: "Misc C",
                    StartIndex: 3712,
                    Symbol: "Anything C"
                }, {
                    Type: "Misc D",
                    StartIndex: 3784,
                    Symbol: "Anything D"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then multiple tokens of which the middle is from the same precedence level and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }, {
            Type: "Operator",
            StartIndex: 3712,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc D",
            StartIndex: 3784,
            Symbol: "Anything D"
        }], {
                Type: "UntypedUnary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    Symbol: "Anything B"
                }, {
                    Type: "Operator",
                    StartIndex: 3712,
                    Symbol: "Another Symbol From The Correct Precedence Level"
                }, {
                    Type: "Misc D",
                    StartIndex: 3784,
                    Symbol: "Anything D"
                }])
                return "Test Operand"
            })

        Test("one token which is an operator from the correct precedence level then multiple tokens of which the last is from the same precedence level and parse", [{
            Type: "Operator",
            StartIndex: 3487,
            Symbol: "Symbol From The Correct Precedence Level"
        }, {
            Type: "Misc B",
            StartIndex: 3643,
            Symbol: "Anything B"
        }, {
            Type: "Misc C",
            StartIndex: 3712,
            Symbol: "Anything C"
        }, {
            Type: "Operator",
            StartIndex: 3784,
            Symbol: "Another Symbol From The Correct Precedence Level"
        }], {
                Type: "UntypedUnary",
                Operator: "Matched Operator",
                Operand: "Test Operand"
            }, (tokens) => {
                expect(tokens).toEqual([{
                    Type: "Misc B",
                    StartIndex: 3643,
                    Symbol: "Anything B"
                }, {
                    Type: "Misc C",
                    StartIndex: 3712,
                    Symbol: "Anything C"
                }, {
                    Type: "Operator",
                    StartIndex: 3784,
                    Symbol: "Another Symbol From The Correct Precedence Level"
                }])
                return "Test Operand"
            })
    })

    xdescribe("binary", () => {
    })
})