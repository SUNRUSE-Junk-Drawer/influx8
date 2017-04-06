describe("ParenthesizeTokens", () => {
    const ParenthesizeTokens = require("rewire")("../dist/index.js").__get__("ParenthesizeTokens")

    function Test(description, input, output) {
        it(description, () => {
            expect(ParenthesizeTokens(input)).toEqual(output)
        })
    }

    Test("nothing", [], [])

    Test("one non-parenthesis", [{
        Type: "Misc A",
        Value: "Value A",
        StartIndex: 32,
        EndIndex: 45
    }], [{
        Type: "Misc A",
        Value: "Value A",
        StartIndex: 32,
        EndIndex: 45
    }])

    Test("multiple non-parentheses", [{
        Type: "Misc A",
        Value: "Value A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Misc B",
        Value: "Value B",
        StartIndex: 11,
        EndIndex: 14
    }, {
        Type: "Misc C",
        Value: "Value C",
        StartIndex: 32,
        EndIndex: 35
    }], [{
        Type: "Misc A",
        Value: "Value A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Misc B",
        Value: "Value B",
        StartIndex: 11,
        EndIndex: 14
    }, {
        Type: "Misc C",
        Value: "Value C",
        StartIndex: 32,
        EndIndex: 35
    }])

    Test("one opening parenthesis", [{
        Type: "OpeningParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }], [{
        Type: "UnclosedParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }])

    Test("one closing parenthesis", [{
        Type: "ClosingParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }], [{
        Type: "UnopenedParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }])

    Test("empty parentheses", [{
        Type: "OpeningParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }], [{
        Type: "Parentheses",
        StartIndex: 32,
        EndIndex: 48,
        Contents: []
    }])

    Test("backwards empty parentheses", [{
        Type: "ClosingParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }], [{
        Type: "UnopenedParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }])

    Test("empty parentheses closed twice", [{
        Type: "OpeningParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 73,
        EndIndex: 78
    }], [{
        Type: "Parentheses",
        StartIndex: 32,
        EndIndex: 48,
        Contents: []
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 73,
        EndIndex: 78
    }])

    Test("empty parentheses opened twice", [{
        Type: "OpeningParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 73,
        EndIndex: 78
    }], [{
        Type: "UnclosedParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "Parentheses",
        StartIndex: 48,
        EndIndex: 73,
        Contents: []
    }])

    Test("double empty parentheses", [{
        Type: "OpeningParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 73,
        EndIndex: 78
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97,
        EndIndex: 100
    }], [{
        Type: "Parentheses",
        StartIndex: 32,
        EndIndex: 48,
        Contents: []
    }, {
        Type: "Parentheses",
        StartIndex: 73,
        EndIndex: 97,
        Contents: []
    }])

    Test("double opening parentheses then empty parentheses", [{
        Type: "OpeningParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 73,
        EndIndex: 78
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97,
        EndIndex: 100
    }], [{
        Type: "UnclosedParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }, {
        Type: "Parentheses",
        StartIndex: 73,
        EndIndex: 97,
        Contents: []
    }])

    Test("double closing parentheses then empty parentheses", [{
        Type: "ClosingParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 73,
        EndIndex: 78
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97,
        EndIndex: 100
    }], [{
        Type: "UnopenedParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }, {
        Type: "Parentheses",
        StartIndex: 73,
        EndIndex: 97,
        Contents: []
    }])

    Test("empty parentheses then double opening parentheses", [{
        Type: "OpeningParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 73,
        EndIndex: 78
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 97,
        EndIndex: 100
    }], [{
        Type: "Parentheses",
        StartIndex: 32,
        EndIndex: 48,
        Contents: []
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 73,
        EndIndex: 78
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 97,
        EndIndex: 100
    }])

    Test("empty parentheses then double closing parentheses", [{
        Type: "OpeningParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 73,
        EndIndex: 78
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97,
        EndIndex: 100
    }], [{
        Type: "Parentheses",
        StartIndex: 32,
        EndIndex: 48,
        Contents: []
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 73,
        EndIndex: 78
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 97,
        EndIndex: 100
    }])

    Test("nested empty parentheses", [{
        Type: "OpeningParenthesis",
        StartIndex: 32,
        EndIndex: 35
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 48,
        EndIndex: 52
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 73,
        EndIndex: 78
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97,
        EndIndex: 100
    }], [{
        Type: "Parentheses",
        StartIndex: 32,
        EndIndex: 97,
        Contents: [{
            Type: "Parentheses",
            StartIndex: 48,
            EndIndex: 73,
            Contents: []
        }]
    }])

    Test("complex scenario", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61,
            EndIndex: 67
        }, {
            Type: "Inside Left B",
            StartIndex: 83,
            EndIndex: 89
        }, {
            Type: "Inside Left C",
            StartIndex: 105,
            EndIndex: 108
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149,
                EndIndex: 152
            }, {
                Type: "Deep Left B",
                StartIndex: 161,
                EndIndex: 164
            }, {
                Type: "Deep Left C",
                StartIndex: 183,
                EndIndex: 186
            }]
        }, {
            Type: "Middle",
            StartIndex: 227,
            EndIndex: 234
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261,
                EndIndex: 267
            }, {
                Type: "Deep Right B",
                StartIndex: 283,
                EndIndex: 286
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327,
            EndIndex: 329
        }, {
            Type: "Inside Right B",
            StartIndex: 349,
            EndIndex: 355
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unclosed parenthesis a", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 10,
        EndIndex: 78
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 10,
        EndIndex: 78
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61,
            EndIndex: 67
        }, {
            Type: "Inside Left B",
            StartIndex: 83,
            EndIndex: 89
        }, {
            Type: "Inside Left C",
            StartIndex: 105,
            EndIndex: 108
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149,
                EndIndex: 152
            }, {
                Type: "Deep Left B",
                StartIndex: 161,
                EndIndex: 164
            }, {
                Type: "Deep Left C",
                StartIndex: 183,
                EndIndex: 186
            }]
        }, {
            Type: "Middle",
            StartIndex: 227,
            EndIndex: 234
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261,
                EndIndex: 267
            }, {
                Type: "Deep Right B",
                StartIndex: 283,
                EndIndex: 286
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327,
            EndIndex: 329
        }, {
            Type: "Inside Right B",
            StartIndex: 349,
            EndIndex: 355
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unclosed parenthesis b", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 72,
        EndIndex: 78
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Parentheses",
        StartIndex: 72,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left B",
            StartIndex: 83,
            EndIndex: 89
        }, {
            Type: "Inside Left C",
            StartIndex: 105,
            EndIndex: 108
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149,
                EndIndex: 152
            }, {
                Type: "Deep Left B",
                StartIndex: 161,
                EndIndex: 164
            }, {
                Type: "Deep Left C",
                StartIndex: 183,
                EndIndex: 186
            }]
        }, {
            Type: "Middle",
            StartIndex: 227,
            EndIndex: 234
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261,
                EndIndex: 267
            }, {
                Type: "Deep Right B",
                StartIndex: 283,
                EndIndex: 286
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327,
            EndIndex: 329
        }, {
            Type: "Inside Right B",
            StartIndex: 349,
            EndIndex: 355
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unclosed parenthesis c", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 154,
        EndIndex: 157
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 361,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149,
            EndIndex: 152
        }, {
            Type: "Parentheses",
            StartIndex: 154,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left B",
                StartIndex: 161,
                EndIndex: 164
            }, {
                Type: "Deep Left C",
                StartIndex: 183,
                EndIndex: 186
            }]
        }, {
            Type: "Middle",
            StartIndex: 227,
            EndIndex: 234
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261,
                EndIndex: 267
            }, {
                Type: "Deep Right B",
                StartIndex: 283,
                EndIndex: 286
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327,
            EndIndex: 329
        }, {
            Type: "Inside Right B",
            StartIndex: 349,
            EndIndex: 355
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unclosed parenthesis d", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle A",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 231,
        EndIndex: 231
    }, {
        Type: "Middle B",
        StartIndex: 234,
        EndIndex: 241
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 211,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149,
            EndIndex: 152
        }, {
            Type: "Deep Left B",
            StartIndex: 161,
            EndIndex: 164
        }, {
            Type: "Deep Left C",
            StartIndex: 183,
            EndIndex: 186
        }]
    }, {
        Type: "Middle A",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "Parentheses",
        StartIndex: 231,
        EndIndex: 361,
        Contents: [{
            Type: "Middle B",
            StartIndex: 234,
            EndIndex: 241
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261,
                EndIndex: 267
            }, {
                Type: "Deep Right B",
                StartIndex: 283,
                EndIndex: 286
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327,
            EndIndex: 329
        }, {
            Type: "Inside Right B",
            StartIndex: 349,
            EndIndex: 355
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unclosed parenthesis e", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 272,
        EndIndex: 274
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 211,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149,
            EndIndex: 152
        }, {
            Type: "Deep Left B",
            StartIndex: 161,
            EndIndex: 164
        }, {
            Type: "Deep Left C",
            StartIndex: 183,
            EndIndex: 186
        }]
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "Parentheses",
        StartIndex: 249,
        EndIndex: 361,
        Contents: [{
            Type: "Deep Right A",
            StartIndex: 261,
            EndIndex: 267
        }, {
            Type: "Parentheses",
            StartIndex: 272,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right B",
                StartIndex: 283,
                EndIndex: 286
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327,
            EndIndex: 329
        }, {
            Type: "Inside Right B",
            StartIndex: 349,
            EndIndex: 355
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unclosed parenthesis f", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 331,
        EndIndex: 336
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 211,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149,
            EndIndex: 152
        }, {
            Type: "Deep Left B",
            StartIndex: 161,
            EndIndex: 164
        }, {
            Type: "Deep Left C",
            StartIndex: 183,
            EndIndex: 186
        }]
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "Parentheses",
        StartIndex: 249,
        EndIndex: 305,
        Contents: [{
            Type: "Deep Right A",
            StartIndex: 261,
            EndIndex: 267
        }, {
            Type: "Deep Right B",
            StartIndex: 283,
            EndIndex: 286
        }]
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Parentheses",
        StartIndex: 331,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Right B",
            StartIndex: 349,
            EndIndex: 355
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unclosed parenthesis g", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 412,
        EndIndex: 415
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61,
            EndIndex: 67
        }, {
            Type: "Inside Left B",
            StartIndex: 83,
            EndIndex: 89
        }, {
            Type: "Inside Left C",
            StartIndex: 105,
            EndIndex: 108
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149,
                EndIndex: 152
            }, {
                Type: "Deep Left B",
                StartIndex: 161,
                EndIndex: 164
            }, {
                Type: "Deep Left C",
                StartIndex: 183,
                EndIndex: 186
            }]
        }, {
            Type: "Middle",
            StartIndex: 227,
            EndIndex: 234
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261,
                EndIndex: 267
            }, {
                Type: "Deep Right B",
                StartIndex: 283,
                EndIndex: 286
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327,
            EndIndex: 329
        }, {
            Type: "Inside Right B",
            StartIndex: 349,
            EndIndex: 355
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 412,
        EndIndex: 415
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unopened parenthesis a", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 20,
        EndIndex: 23
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 20,
        EndIndex: 23
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61,
            EndIndex: 67
        }, {
            Type: "Inside Left B",
            StartIndex: 83,
            EndIndex: 89
        }, {
            Type: "Inside Left C",
            StartIndex: 105,
            EndIndex: 108
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149,
                EndIndex: 152
            }, {
                Type: "Deep Left B",
                StartIndex: 161,
                EndIndex: 164
            }, {
                Type: "Deep Left C",
                StartIndex: 183,
                EndIndex: 186
            }]
        }, {
            Type: "Middle",
            StartIndex: 227,
            EndIndex: 234
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261,
                EndIndex: 267
            }, {
                Type: "Deep Right B",
                StartIndex: 283,
                EndIndex: 286
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327,
            EndIndex: 329
        }, {
            Type: "Inside Right B",
            StartIndex: 349,
            EndIndex: 355
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unopened parenthesis b", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97,
        EndIndex: 100
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 97,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61,
            EndIndex: 67
        }, {
            Type: "Inside Left B",
            StartIndex: 83,
            EndIndex: 89
        }]
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 211,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149,
            EndIndex: 152
        }, {
            Type: "Deep Left B",
            StartIndex: 161,
            EndIndex: 164
        }, {
            Type: "Deep Left C",
            StartIndex: 183,
            EndIndex: 186
        }]
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "Parentheses",
        StartIndex: 249,
        EndIndex: 305,
        Contents: [{
            Type: "Deep Right A",
            StartIndex: 261,
            EndIndex: 267
        }, {
            Type: "Deep Right B",
            StartIndex: 283,
            EndIndex: 286
        }]
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unopened parenthesis c", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 177,
        EndIndex: 179
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 361,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149,
            EndIndex: 152
        }, {
            Type: "Deep Left B",
            StartIndex: 161,
            EndIndex: 164
        }, {
            Type: "Parentheses",
            StartIndex: 177,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left C",
                StartIndex: 183,
                EndIndex: 186
            }]
        }, {
            Type: "Middle",
            StartIndex: 227,
            EndIndex: 234
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261,
                EndIndex: 267
            }, {
                Type: "Deep Right B",
                StartIndex: 283,
                EndIndex: 286
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327,
            EndIndex: 329
        }, {
            Type: "Inside Right B",
            StartIndex: 349,
            EndIndex: 355
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unopened parenthesis d", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle A",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 231,
        EndIndex: 231
    }, {
        Type: "Middle B",
        StartIndex: 235,
        EndIndex: 238
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 231,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61,
            EndIndex: 67
        }, {
            Type: "Inside Left B",
            StartIndex: 83,
            EndIndex: 89
        }, {
            Type: "Inside Left C",
            StartIndex: 105,
            EndIndex: 108
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149,
                EndIndex: 152
            }, {
                Type: "Deep Left B",
                StartIndex: 161,
                EndIndex: 164
            }, {
                Type: "Deep Left C",
                StartIndex: 183,
                EndIndex: 186
            }]
        }, {
            Type: "Middle A",
            StartIndex: 227,
            EndIndex: 234
        }]
    }, {
        Type: "Middle B",
        StartIndex: 235,
        EndIndex: 238
    }, {
        Type: "Parentheses",
        StartIndex: 249,
        EndIndex: 305,
        Contents: [{
            Type: "Deep Right A",
            StartIndex: 261,
            EndIndex: 267
        }, {
            Type: "Deep Right B",
            StartIndex: 283,
            EndIndex: 286
        }]
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unopened parenthesis e", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 274,
        EndIndex: 279
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 305,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61,
            EndIndex: 67
        }, {
            Type: "Inside Left B",
            StartIndex: 83,
            EndIndex: 89
        }, {
            Type: "Inside Left C",
            StartIndex: 105,
            EndIndex: 108
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149,
                EndIndex: 152
            }, {
                Type: "Deep Left B",
                StartIndex: 161,
                EndIndex: 164
            }, {
                Type: "Deep Left C",
                StartIndex: 183,
                EndIndex: 186
            }]
        }, {
            Type: "Middle",
            StartIndex: 227,
            EndIndex: 234
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 274,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261,
                EndIndex: 267
            }]
        }, {
            Type: "Deep Right B",
            StartIndex: 283,
            EndIndex: 286
        }]
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unopened parenthesis f", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 331,
        EndIndex: 336
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 331,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61,
            EndIndex: 67
        }, {
            Type: "Inside Left B",
            StartIndex: 83,
            EndIndex: 89
        }, {
            Type: "Inside Left C",
            StartIndex: 105,
            EndIndex: 108
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149,
                EndIndex: 152
            }, {
                Type: "Deep Left B",
                StartIndex: 161,
                EndIndex: 164
            }, {
                Type: "Deep Left C",
                StartIndex: 183,
                EndIndex: 186
            }]
        }, {
            Type: "Middle",
            StartIndex: 227,
            EndIndex: 234
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261,
                EndIndex: 267
            }, {
                Type: "Deep Right B",
                StartIndex: 283,
                EndIndex: 286
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327,
            EndIndex: 329
        }]
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])

    Test("complex scenario unopened parenthesis g", [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49,
        EndIndex: 54
    }, {
        Type: "Inside Left A",
        StartIndex: 61,
        EndIndex: 67
    }, {
        Type: "Inside Left B",
        StartIndex: 83,
        EndIndex: 89
    }, {
        Type: "Inside Left C",
        StartIndex: 105,
        EndIndex: 108
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127,
        EndIndex: 131
    }, {
        Type: "Deep Left A",
        StartIndex: 149,
        EndIndex: 152
    }, {
        Type: "Deep Left B",
        StartIndex: 161,
        EndIndex: 164
    }, {
        Type: "Deep Left C",
        StartIndex: 183,
        EndIndex: 186
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211,
        EndIndex: 217
    }, {
        Type: "Middle",
        StartIndex: 227,
        EndIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249,
        EndIndex: 253
    }, {
        Type: "Deep Right A",
        StartIndex: 261,
        EndIndex: 267
    }, {
        Type: "Deep Right B",
        StartIndex: 283,
        EndIndex: 286
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305,
        EndIndex: 312
    }, {
        Type: "Inside Right A",
        StartIndex: 327,
        EndIndex: 329
    }, {
        Type: "Inside Right B",
        StartIndex: 349,
        EndIndex: 355
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361,
        EndIndex: 374
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 412,
        EndIndex: 417
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }], [{
        Type: "Preceding A",
        StartIndex: 5,
        EndIndex: 7
    }, {
        Type: "Preceding B",
        StartIndex: 27,
        EndIndex: 31
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61,
            EndIndex: 67
        }, {
            Type: "Inside Left B",
            StartIndex: 83,
            EndIndex: 89
        }, {
            Type: "Inside Left C",
            StartIndex: 105,
            EndIndex: 108
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149,
                EndIndex: 152
            }, {
                Type: "Deep Left B",
                StartIndex: 161,
                EndIndex: 164
            }, {
                Type: "Deep Left C",
                StartIndex: 183,
                EndIndex: 186
            }]
        }, {
            Type: "Middle",
            StartIndex: 227,
            EndIndex: 234
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261,
                EndIndex: 267
            }, {
                Type: "Deep Right B",
                StartIndex: 283,
                EndIndex: 286
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327,
            EndIndex: 329
        }, {
            Type: "Inside Right B",
            StartIndex: 349,
            EndIndex: 355
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383,
        EndIndex: 394
    }, {
        Type: "Trailing B",
        StartIndex: 405,
        EndIndex: 408
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 412,
        EndIndex: 417
    }, {
        Type: "Trailing C",
        StartIndex: 427,
        EndIndex: 429
    }])
})