describe("FindNextStatement", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const FindNextStatement = Namespace.__get__("FindNextStatement")

    function Test(description, input, output, statementParsers) {
        it(description, () => {
            Namespace.__set__("StatementParsers", statementParsers || {
                "Valid Statement": fail,
                "Another Statement": fail,
                "A Third Statement": fail
            })

            expect(FindNextStatement(input)).toEqual(output)
        })
    }

    Test("nothing follows", [{
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }], {
            Type: "NextStatementNotFound",
            Tokens: [{
                Type: "Statement",
                StartIndex: 253,
                EndIndex: 284,
                Symbol: "Valid Statement"
            }]
        })

    Test("one non-statement follows", [{
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }, {
        Type: "Misc A",
        StartIndex: 310,
        EndIndex: 325,
        Symbol: "Valid Statement"
    }], {
            Type: "NextStatementNotFound",
            Tokens: [{
                Type: "Statement",
                StartIndex: 253,
                EndIndex: 284,
                Symbol: "Valid Statement"
            }, {
                Type: "Misc A",
                StartIndex: 310,
                EndIndex: 325,
                Symbol: "Valid Statement"
            }]
        })

    Test("the same statement follows", [{
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }, {
        Type: "Statement",
        StartIndex: 310,
        EndIndex: 325,
        Symbol: "Valid Statement"
    }], {
            Type: "NextStatement",
            StartIndex: 253,
            EndIndex: 284,
            StatementTokens: [],
            NextStatement: "Test Next Statement"
        }, {
            "Valid Statement": tokens => {
                expect(tokens).toEqual([{
                    Type: "Statement",
                    StartIndex: 310,
                    EndIndex: 325,
                    Symbol: "Valid Statement"
                }])
                return "Test Next Statement"
            },
            "Another Valid Statement": fail,
            "A Third Statement": fail
        })

    Test("a different statement follows", [{
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }, {
        Type: "Statement",
        StartIndex: 310,
        EndIndex: 325,
        Symbol: "Another Valid Statement"
    }], {
            Type: "NextStatement",
            StartIndex: 253,
            EndIndex: 284,
            StatementTokens: [],
            NextStatement: "Test Next Statement"
        }, {
            "Valid Statement": fail,
            "Another Valid Statement": tokens => {
                expect(tokens).toEqual([{
                    Type: "Statement",
                    StartIndex: 310,
                    EndIndex: 325,
                    Symbol: "Another Valid Statement"
                }])
                return "Test Next Statement"
            },
            "A Third Statement": fail
        })

    Test("the same statement follows three times", [{
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }, {
        Type: "Statement",
        StartIndex: 310,
        EndIndex: 325,
        Symbol: "Valid Statement"
    }, {
        Type: "Statement",
        StartIndex: 360,
        EndIndex: 371,
        Symbol: "Valid Statement"
    }], {
            Type: "NextStatement",
            StartIndex: 253,
            EndIndex: 284,
            StatementTokens: [],
            NextStatement: "Test Next Statement"
        }, {
            "Valid Statement": tokens => {
                expect(tokens).toEqual([{
                    Type: "Statement",
                    StartIndex: 310,
                    EndIndex: 325,
                    Symbol: "Valid Statement"
                }, {
                    Type: "Statement",
                    StartIndex: 360,
                    EndIndex: 371,
                    Symbol: "Valid Statement"
                }])
                return "Test Next Statement"
            },
            "Another Valid Statement": fail,
            "A Third Statement": fail
        })

    Test("three different statements", [{
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }, {
        Type: "Statement",
        StartIndex: 310,
        EndIndex: 325,
        Symbol: "Another Valid Statement"
    }, {
        Type: "Statement",
        StartIndex: 360,
        EndIndex: 371,
        Symbol: "A Third Statement"
    }], {
            Type: "NextStatement",
            StartIndex: 253,
            EndIndex: 284,
            StatementTokens: [],
            NextStatement: "Test Next Statement"
        }, {
            "Valid Statement": fail,
            "Another Valid Statement": tokens => {
                expect(tokens).toEqual([{
                    Type: "Statement",
                    StartIndex: 310,
                    EndIndex: 325,
                    Symbol: "Another Valid Statement"
                }, {
                    Type: "Statement",
                    StartIndex: 360,
                    EndIndex: 371,
                    Symbol: "A Third Statement"
                }])
                return "Test Next Statement"
            },
            "A Third Statement": fail
        })

    Test("two statements with non-statements in between", [{
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }, {
        Type: "Misc A",
        StartIndex: 310,
        EndIndex: 325,
        Symbol: "Misc A"
    }, {
        Type: "Misc B",
        StartIndex: 333,
        EndIndex: 342,
        Symbol: "Misc B"
    }, {
        Type: "Statement",
        StartIndex: 360,
        EndIndex: 371,
        Symbol: "Another Valid Statement"
    }], {
            Type: "NextStatement",
            StartIndex: 253,
            EndIndex: 284,
            StatementTokens: [{
                Type: "Misc A",
                StartIndex: 310,
                EndIndex: 325,
                Symbol: "Misc A"
            }, {
                Type: "Misc B",
                StartIndex: 333,
                EndIndex: 342,
                Symbol: "Misc B"
            }],
            NextStatement: "Test Next Statement"
        }, {
            "Valid Statement": fail,
            "Another Valid Statement": tokens => {
                expect(tokens).toEqual([{
                    Type: "Statement",
                    StartIndex: 360,
                    EndIndex: 371,
                    Symbol: "Another Valid Statement"
                }])
                return "Test Next Statement"
            },
            "A Third Statement": fail
        })

    Test("two statements with non-statements in between and after", [{
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }, {
        Type: "Misc A",
        StartIndex: 310,
        EndIndex: 325,
        Symbol: "Misc A"
    }, {
        Type: "Misc B",
        StartIndex: 333,
        EndIndex: 342,
        Symbol: "Misc B"
    }, {
        Type: "Statement",
        StartIndex: 360,
        EndIndex: 371,
        Symbol: "Another Valid Statement"
    }, {
        Type: "Misc C",
        StartIndex: 384,
        EndIndex: 391,
        Symbol: "Misc C"
    }, {
        Type: "Misc D",
        StartIndex: 402,
        EndIndex: 404,
        Symbol: "Misc D"
    }, {
        Type: "Misc E",
        StartIndex: 432,
        EndIndex: 463,
        Symbol: "Misc E"
    }], {
            Type: "NextStatement",
            StartIndex: 253,
            EndIndex: 284,
            StatementTokens: [{
                Type: "Misc A",
                StartIndex: 310,
                EndIndex: 325,
                Symbol: "Misc A"
            }, {
                Type: "Misc B",
                StartIndex: 333,
                EndIndex: 342,
                Symbol: "Misc B"
            }],
            NextStatement: "Test Next Statement"
        }, {
            "Valid Statement": fail,
            "Another Valid Statement": tokens => {
                expect(tokens).toEqual([{
                    Type: "Statement",
                    StartIndex: 360,
                    EndIndex: 371,
                    Symbol: "Another Valid Statement"
                }, {
                    Type: "Misc C",
                    StartIndex: 384,
                    EndIndex: 391,
                    Symbol: "Misc C"
                }, {
                    Type: "Misc D",
                    StartIndex: 402,
                    EndIndex: 404,
                    Symbol: "Misc D"
                }, {
                    Type: "Misc E",
                    StartIndex: 432,
                    EndIndex: 463,
                    Symbol: "Misc E"
                }])
                return "Test Next Statement"
            },
            "A Third Statement": fail
        })

    Test("two statements with non-statements after", [{
        Type: "Statement",
        StartIndex: 253,
        EndIndex: 284,
        Symbol: "Valid Statement"
    }, {
        Type: "Statement",
        StartIndex: 360,
        EndIndex: 371,
        Symbol: "Another Valid Statement"
    }, {
        Type: "Misc C",
        StartIndex: 384,
        EndIndex: 391,
        Symbol: "Misc C"
    }, {
        Type: "Misc D",
        StartIndex: 402,
        EndIndex: 404,
        Symbol: "Misc D"
    }, {
        Type: "Misc E",
        StartIndex: 432,
        EndIndex: 463,
        Symbol: "Misc E"
    }], {
            Type: "NextStatement",
            StartIndex: 253,
            EndIndex: 284,
            StatementTokens: [],
            NextStatement: "Test Next Statement"
        }, {
            "Valid Statement": fail,
            "Another Valid Statement": tokens => {
                expect(tokens).toEqual([{
                    Type: "Statement",
                    StartIndex: 360,
                    EndIndex: 371,
                    Symbol: "Another Valid Statement"
                }, {
                    Type: "Misc C",
                    StartIndex: 384,
                    EndIndex: 391,
                    Symbol: "Misc C"
                }, {
                    Type: "Misc D",
                    StartIndex: 402,
                    EndIndex: 404,
                    Symbol: "Misc D"
                }, {
                    Type: "Misc E",
                    StartIndex: 432,
                    EndIndex: 463,
                    Symbol: "Misc E"
                }])
                return "Test Next Statement"
            },
            "A Third Statement": fail
        })
})