describe("Parenthesize", () => {
    const Parenthesize = require("rewire")("../dist/index.js").__get__("Parenthesize")

    function Test(description, input, output) {
        it(description, () => {
            expect(Parenthesize(input)).toEqual(output)
        })
    }

    Test("nothing", [], [])

    Test("one non-parenthesis", [{
        Type: "Misc A",
        Value: "Value A",
        StartIndex: 32
    }], [{
        Type: "Misc A",
        Value: "Value A",
        StartIndex: 32
    }])

    Test("multiple non-parentheses", [{
        Type: "Misc A",
        Value: "Value A",
        StartIndex: 5
    }, {
        Type: "Misc B",
        Value: "Value B",
        StartIndex: 11
    }, {
        Type: "Misc C",
        Value: "Value C",
        StartIndex: 32
    }], [{
        Type: "Misc A",
        Value: "Value A",
        StartIndex: 5
    }, {
        Type: "Misc B",
        Value: "Value B",
        StartIndex: 11
    }, {
        Type: "Misc C",
        Value: "Value C",
        StartIndex: 32
    }])

    Test("one opening parenthesis", [{
        Type: "OpeningParenthesis",
        StartIndex: 32
    }], [{
        Type: "UnclosedParenthesis",
        StartIndex: 32
    }])

    Test("one closing parenthesis", [{
        Type: "ClosingParenthesis",
        StartIndex: 32
    }], [{
        Type: "UnopenedParenthesis",
        StartIndex: 32
    }])

    Test("empty parentheses", [{
        Type: "OpeningParenthesis",
        StartIndex: 32
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48
    }], [{
        Type: "Parentheses",
        StartIndex: 32,
        EndIndex: 48,
        Contents: []
    }])

    Test("backwards empty parentheses", [{
        Type: "ClosingParenthesis",
        StartIndex: 32
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 48
    }], [{
        Type: "UnopenedParenthesis",
        StartIndex: 32
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 48
    }])

    Test("empty parentheses closed twice", [{
        Type: "OpeningParenthesis",
        StartIndex: 32
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 73
    }], [{
        Type: "Parentheses",
        StartIndex: 32,
        EndIndex: 48,
        Contents: []
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 73
    }])

    Test("empty parentheses opened twice", [{
        Type: "OpeningParenthesis",
        StartIndex: 32
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 48
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 73
    }], [{
        Type: "UnclosedParenthesis",
        StartIndex: 32
    }, {
        Type: "Parentheses",
        StartIndex: 48,
        EndIndex: 73,
        Contents: []
    }])

    Test("double empty parentheses", [{
        Type: "OpeningParenthesis",
        StartIndex: 32
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 73
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97
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
        StartIndex: 32
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 48
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 73
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97
    }], [{
        Type: "UnclosedParenthesis",
        StartIndex: 32
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 48
    }, {
        Type: "Parentheses",
        StartIndex: 73,
        EndIndex: 97,
        Contents: []
    }])

    Test("double closing parentheses then empty parentheses", [{
        Type: "ClosingParenthesis",
        StartIndex: 32
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 73
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97
    }], [{
        Type: "UnopenedParenthesis",
        StartIndex: 32
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 48
    }, {
        Type: "Parentheses",
        StartIndex: 73,
        EndIndex: 97,
        Contents: []
    }])

    Test("empty parentheses then double opening parentheses", [{
        Type: "OpeningParenthesis",
        StartIndex: 32
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 73
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 97
    }], [{
        Type: "Parentheses",
        StartIndex: 32,
        EndIndex: 48,
        Contents: []
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 73
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 97
    }])

    Test("empty parentheses then double closing parentheses", [{
        Type: "OpeningParenthesis",
        StartIndex: 32
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 48
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 73
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97
    }], [{
        Type: "Parentheses",
        StartIndex: 32,
        EndIndex: 48,
        Contents: []
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 73
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 97
    }])

    Test("nested empty parentheses", [{
        Type: "OpeningParenthesis",
        StartIndex: 32
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 48
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 73
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97
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
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61
        }, {
            Type: "Inside Left B",
            StartIndex: 83
        }, {
            Type: "Inside Left C",
            StartIndex: 105
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149
            }, {
                Type: "Deep Left B",
                StartIndex: 161
            }, {
                Type: "Deep Left C",
                StartIndex: 183
            }]
        }, {
            Type: "Middle",
            StartIndex: 227
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261
            }, {
                Type: "Deep Right B",
                StartIndex: 283
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327
        }, {
            Type: "Inside Right B",
            StartIndex: 349
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unclosed parenthesis a", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 10
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 10
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61
        }, {
            Type: "Inside Left B",
            StartIndex: 83
        }, {
            Type: "Inside Left C",
            StartIndex: 105
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149
            }, {
                Type: "Deep Left B",
                StartIndex: 161
            }, {
                Type: "Deep Left C",
                StartIndex: 183
            }]
        }, {
            Type: "Middle",
            StartIndex: 227
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261
            }, {
                Type: "Deep Right B",
                StartIndex: 283
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327
        }, {
            Type: "Inside Right B",
            StartIndex: 349
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unclosed parenthesis b", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 72
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Parentheses",
        StartIndex: 72,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left B",
            StartIndex: 83
        }, {
            Type: "Inside Left C",
            StartIndex: 105
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149
            }, {
                Type: "Deep Left B",
                StartIndex: 161
            }, {
                Type: "Deep Left C",
                StartIndex: 183
            }]
        }, {
            Type: "Middle",
            StartIndex: 227
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261
            }, {
                Type: "Deep Right B",
                StartIndex: 283
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327
        }, {
            Type: "Inside Right B",
            StartIndex: 349
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unclosed parenthesis c", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 154
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49,
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 361,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149
        }, {
            Type: "Parentheses",
            StartIndex: 154,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left B",
                StartIndex: 161
            }, {
                Type: "Deep Left C",
                StartIndex: 183
            }]
        }, {
            Type: "Middle",
            StartIndex: 227
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261
            }, {
                Type: "Deep Right B",
                StartIndex: 283
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327
        }, {
            Type: "Inside Right B",
            StartIndex: 349
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unclosed parenthesis d", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle A",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 231
    }, {
        Type: "Middle B",
        StartIndex: 234
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 211,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149
        }, {
            Type: "Deep Left B",
            StartIndex: 161
        }, {
            Type: "Deep Left C",
            StartIndex: 183
        }]
    }, {
        Type: "Middle A",
        StartIndex: 227
    }, {
        Type: "Parentheses",
        StartIndex: 231,
        EndIndex: 361,
        Contents: [{
            Type: "Middle B",
            StartIndex: 234
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261
            }, {
                Type: "Deep Right B",
                StartIndex: 283
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327
        }, {
            Type: "Inside Right B",
            StartIndex: 349
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unclosed parenthesis e", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 272
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 211,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149
        }, {
            Type: "Deep Left B",
            StartIndex: 161
        }, {
            Type: "Deep Left C",
            StartIndex: 183
        }]
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "Parentheses",
        StartIndex: 249,
        EndIndex: 361,
        Contents: [{
            Type: "Deep Right A",
            StartIndex: 261
        }, {
            Type: "Parentheses",
            StartIndex: 272,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right B",
                StartIndex: 283
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327
        }, {
            Type: "Inside Right B",
            StartIndex: 349
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unclosed parenthesis f", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 331
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 211,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149
        }, {
            Type: "Deep Left B",
            StartIndex: 161
        }, {
            Type: "Deep Left C",
            StartIndex: 183
        }]
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "Parentheses",
        StartIndex: 249,
        EndIndex: 305,
        Contents: [{
            Type: "Deep Right A",
            StartIndex: 261
        }, {
            Type: "Deep Right B",
            StartIndex: 283
        }]
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Parentheses",
        StartIndex: 331,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Right B",
            StartIndex: 349
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unclosed parenthesis g", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 412
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61
        }, {
            Type: "Inside Left B",
            StartIndex: 83
        }, {
            Type: "Inside Left C",
            StartIndex: 105
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149
            }, {
                Type: "Deep Left B",
                StartIndex: 161
            }, {
                Type: "Deep Left C",
                StartIndex: 183
            }]
        }, {
            Type: "Middle",
            StartIndex: 227
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261
            }, {
                Type: "Deep Right B",
                StartIndex: 283
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327
        }, {
            Type: "Inside Right B",
            StartIndex: 349
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 412
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unopened parenthesis a", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 20
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 20
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61
        }, {
            Type: "Inside Left B",
            StartIndex: 83
        }, {
            Type: "Inside Left C",
            StartIndex: 105
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149
            }, {
                Type: "Deep Left B",
                StartIndex: 161
            }, {
                Type: "Deep Left C",
                StartIndex: 183
            }]
        }, {
            Type: "Middle",
            StartIndex: 227
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261
            }, {
                Type: "Deep Right B",
                StartIndex: 283
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327
        }, {
            Type: "Inside Right B",
            StartIndex: 349
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unopened parenthesis b", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 97
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 97,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61
        }, {
            Type: "Inside Left B",
            StartIndex: 83
        }]
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 211,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149
        }, {
            Type: "Deep Left B",
            StartIndex: 161
        }, {
            Type: "Deep Left C",
            StartIndex: 183
        }]
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "Parentheses",
        StartIndex: 249,
        EndIndex: 305,
        Contents: [{
            Type: "Deep Right A",
            StartIndex: 261
        }, {
            Type: "Deep Right B",
            StartIndex: 283
        }]
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unopened parenthesis c", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 177
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "UnclosedParenthesis",
        StartIndex: 49,
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "Parentheses",
        StartIndex: 127,
        EndIndex: 361,
        Contents: [{
            Type: "Deep Left A",
            StartIndex: 149
        }, {
            Type: "Deep Left B",
            StartIndex: 161
        }, {
            Type: "Parentheses",
            StartIndex: 177,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left C",
                StartIndex: 183
            }]
        }, {
            Type: "Middle",
            StartIndex: 227
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261
            }, {
                Type: "Deep Right B",
                StartIndex: 283
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327
        }, {
            Type: "Inside Right B",
            StartIndex: 349
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unopened parenthesis d", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle A",
        StartIndex: 227
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 231
    }, {
        Type: "Middle B",
        StartIndex: 235
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 231,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61
        }, {
            Type: "Inside Left B",
            StartIndex: 83
        }, {
            Type: "Inside Left C",
            StartIndex: 105
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149
            }, {
                Type: "Deep Left B",
                StartIndex: 161
            }, {
                Type: "Deep Left C",
                StartIndex: 183
            }]
        }, {
            Type: "Middle A",
            StartIndex: 227
        }]
    }, {
        Type: "Middle B",
        StartIndex: 235
    }, {
        Type: "Parentheses",
        StartIndex: 249,
        EndIndex: 305,
        Contents: [{
            Type: "Deep Right A",
            StartIndex: 261
        }, {
            Type: "Deep Right B",
            StartIndex: 283
        }]
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unopened parenthesis e", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 274
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 305,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61
        }, {
            Type: "Inside Left B",
            StartIndex: 83
        }, {
            Type: "Inside Left C",
            StartIndex: 105
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149
            }, {
                Type: "Deep Left B",
                StartIndex: 161
            }, {
                Type: "Deep Left C",
                StartIndex: 183
            }]
        }, {
            Type: "Middle",
            StartIndex: 227
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 274,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261
            }]
        }, {
            Type: "Deep Right B",
            StartIndex: 283
        }]
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unopened parenthesis f", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 331
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 331,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61
        }, {
            Type: "Inside Left B",
            StartIndex: 83
        }, {
            Type: "Inside Left C",
            StartIndex: 105
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149
            }, {
                Type: "Deep Left B",
                StartIndex: 161
            }, {
                Type: "Deep Left C",
                StartIndex: 183
            }]
        }, {
            Type: "Middle",
            StartIndex: 227
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261
            }, {
                Type: "Deep Right B",
                StartIndex: 283
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327
        }]
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])

    Test("complex scenario unopened parenthesis g", [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 49
    }, {
        Type: "Inside Left A",
        StartIndex: 61
    }, {
        Type: "Inside Left B",
        StartIndex: 83
    }, {
        Type: "Inside Left C",
        StartIndex: 105
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 127
    }, {
        Type: "Deep Left A",
        StartIndex: 149
    }, {
        Type: "Deep Left B",
        StartIndex: 161
    }, {
        Type: "Deep Left C",
        StartIndex: 183
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 211
    }, {
        Type: "Middle",
        StartIndex: 227
    }, {
        Type: "OpeningParenthesis",
        StartIndex: 249
    }, {
        Type: "Deep Right A",
        StartIndex: 261
    }, {
        Type: "Deep Right B",
        StartIndex: 283
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 305
    }, {
        Type: "Inside Right A",
        StartIndex: 327
    }, {
        Type: "Inside Right B",
        StartIndex: 349
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 361
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "ClosingParenthesis",
        StartIndex: 412
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }], [{
        Type: "Preceding A",
        StartIndex: 5
    }, {
        Type: "Preceding B",
        StartIndex: 27
    }, {
        Type: "Parentheses",
        StartIndex: 49,
        EndIndex: 361,
        Contents: [{
            Type: "Inside Left A",
            StartIndex: 61
        }, {
            Type: "Inside Left B",
            StartIndex: 83
        }, {
            Type: "Inside Left C",
            StartIndex: 105
        }, {
            Type: "Parentheses",
            StartIndex: 127,
            EndIndex: 211,
            Contents: [{
                Type: "Deep Left A",
                StartIndex: 149
            }, {
                Type: "Deep Left B",
                StartIndex: 161
            }, {
                Type: "Deep Left C",
                StartIndex: 183
            }]
        }, {
            Type: "Middle",
            StartIndex: 227
        }, {
            Type: "Parentheses",
            StartIndex: 249,
            EndIndex: 305,
            Contents: [{
                Type: "Deep Right A",
                StartIndex: 261
            }, {
                Type: "Deep Right B",
                StartIndex: 283
            }]
        }, {
            Type: "Inside Right A",
            StartIndex: 327
        }, {
            Type: "Inside Right B",
            StartIndex: 349
        }]
    }, {
        Type: "Trailing A",
        StartIndex: 383
    }, {
        Type: "Trailing B",
        StartIndex: 405
    }, {
        Type: "UnopenedParenthesis",
        StartIndex: 412
    }, {
        Type: "Trailing C",
        StartIndex: 427
    }])
})