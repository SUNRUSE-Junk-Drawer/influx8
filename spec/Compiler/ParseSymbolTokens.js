describe("ParseSymbolTokens", () => {
    const Namespace = require("rewire")("../../index.js")
    const ParseSymbolTokens = Namespace.__get__("ParseSymbolTokens")
    Namespace.__set__("Symbols", {
        ">$%": "Short Symbol",
        ">$%!?": "Long Symbol",
        "&&*": "Symbol Similar To Neither"
    })

    function Test(description, input, output, tokensToParse) {
        it(description, () => {
            Namespace.__set__("ParseTokens", (token) => {
                const parsed = tokensToParse[token.Text]
                if (!parsed) fail("Unexpected token \"" + token.Text + "\"")
                expect(token.StartIndex).toEqual(parsed.StartIndex)
                return parsed.Result
            })
            expect(ParseSymbolTokens({
                StartIndex: 32,
                Text: input
            })).toEqual(output)
        })
    }

    Test("no match", "matchesnothing", undefined, {})

    Test("lone short symbol", ">$%", [{
        Type: "Short Symbol",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: ">$%"
    }], fail)

    Test("lone long symbol", ">$%!?", [{
        Type: "Long Symbol",
        StartIndex: 32,
        EndIndex: 36,
        Symbol: ">$%!?"
    }], fail)

    Test("lone symbol similar to neither", "&&*", [{
        Type: "Symbol Similar To Neither",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: "&&*"
    }], fail)

    Test("short symbol at start", ">$%matchesnothing", [{
        Type: "Short Symbol",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: ">$%"
    }, "Misc A", "Misc B"], {
            "matchesnothing": {
                StartIndex: 35,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("symbol similar to neither at start", "&&*matchesnothing", [{
        Type: "Symbol Similar To Neither",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: "&&*"
    }, "Misc A", "Misc B"], {
            "matchesnothing": {
                StartIndex: 35,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("long symbol at start", ">$%!?matchesnothing", [{
        Type: "Long Symbol",
        StartIndex: 32,
        EndIndex: 36,
        Symbol: ">$%!?"
    }, "Misc A", "Misc B"], {
            "matchesnothing": {
                StartIndex: 37,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("short symbol at end", "matchesnothing>$%", ["Misc A", "Misc B", {
        Type: "Short Symbol",
        StartIndex: 46,
        EndIndex: 48,
        Symbol: ">$%"
    }], {
            "matchesnothing": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("long symbol at end", "matchesnothing>$%!?", ["Misc A", "Misc B", {
        Type: "Long Symbol",
        StartIndex: 46,
        EndIndex: 50,
        Symbol: ">$%!?"
    }], {
            "matchesnothing": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("symbol similar to neither at end", "matchesnothing&&*", ["Misc A", "Misc B", {
        Type: "Symbol Similar To Neither",
        StartIndex: 46,
        EndIndex: 48,
        Symbol: "&&*"
    }], {
            "matchesnothing": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("short symbol in middle", "matches>$%nothing", ["Misc A", "Misc B", {
        Type: "Short Symbol",
        StartIndex: 39,
        EndIndex: 41,
        Symbol: ">$%"
    }, "Misc C", "Misc D", "Misc E"], {
            "matches": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "nothing": {
                StartIndex: 42,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("symbol similar to neither in middle", "matches&&*nothing", ["Misc A", "Misc B", {
        Type: "Symbol Similar To Neither",
        StartIndex: 39,
        EndIndex: 41,
        Symbol: "&&*"
    }, "Misc C", "Misc D", "Misc E"], {
            "matches": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "nothing": {
                StartIndex: 42,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("long symbol in middle", "matches>$%!?nothing", ["Misc A", "Misc B", {
        Type: "Long Symbol",
        StartIndex: 39,
        EndIndex: 43,
        Symbol: ">$%!?"
    }, "Misc C", "Misc D", "Misc E"], {
            "matches": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "nothing": {
                StartIndex: 44,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("short symbol at start and short symbol at middle", ">$%matches>$%nothing", [{
        Type: "Short Symbol",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: ">$%"
    }, "Misc A", "Misc B"], {
            "matches>$%nothing": {
                StartIndex: 35,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("short symbol at start and long symbol at middle", ">$%matches>$%!?nothing", [{
        Type: "Short Symbol",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: ">$%"
    }, "Misc A", "Misc B"], {
            "matches>$%!?nothing": {
                StartIndex: 35,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("long symbol at start and short symbol at middle", ">$%!?matches>$%nothing", [{
        Type: "Long Symbol",
        StartIndex: 32,
        EndIndex: 36,
        Symbol: ">$%!?"
    }, "Misc A", "Misc B"], {
            "matches>$%nothing": {
                StartIndex: 37,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("long symbol at start and long symbol at middle", ">$%!?matches>$%!?nothing", [{
        Type: "Long Symbol",
        StartIndex: 32,
        EndIndex: 36,
        Symbol: ">$%!?"
    }, "Misc A", "Misc B"], {
            "matches>$%!?nothing": {
                StartIndex: 37,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("short symbol at middle and short symbol at end", "matches>$%nothing>$%", ["Misc A", "Misc B", {
        Type: "Short Symbol",
        StartIndex: 39,
        EndIndex: 41,
        Symbol: ">$%"
    }, "Misc C", "Misc D", "Misc E"], {
            "matches": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "nothing>$%": {
                StartIndex: 42,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("long symbol at middle and short symbol at end", "matches>$%!?nothing>$%", ["Misc A", "Misc B", {
        Type: "Long Symbol",
        StartIndex: 39,
        EndIndex: 43,
        Symbol: ">$%!?"
    }, "Misc C", "Misc D", "Misc E"], {
            "matches": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "nothing>$%": {
                StartIndex: 44,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("short symbol at middle and long symbol at end", "matches>$%nothing>$%!?", ["Misc A", "Misc B", {
        Type: "Short Symbol",
        StartIndex: 39,
        EndIndex: 41,
        Symbol: ">$%"
    }, "Misc C", "Misc D", "Misc E"], {
            "matches": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "nothing>$%!?": {
                StartIndex: 42,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("long symbol at middle and long symbol at end", "matches>$%!?nothing>$%!?", ["Misc A", "Misc B", {
        Type: "Long Symbol",
        StartIndex: 39,
        EndIndex: 43,
        Symbol: ">$%!?"
    }, "Misc C", "Misc D", "Misc E"], {
            "matches": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "nothing>$%!?": {
                StartIndex: 44,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("short symbol at start and short symbol at end", ">$%matchesnothing>$%", [{
        Type: "Short Symbol",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: ">$%"
    }, "Misc A", "Misc B"], {
            "matchesnothing>$%": {
                StartIndex: 35,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("long symbol at start and short symbol at end", ">$%!?matchesnothing>$%", [{
        Type: "Long Symbol",
        StartIndex: 32,
        EndIndex: 36,
        Symbol: ">$%!?"
    }, "Misc A", "Misc B"], {
            "matchesnothing>$%": {
                StartIndex: 37,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("short symbol at start and long symbol at end", ">$%matchesnothing>$%!?", [{
        Type: "Short Symbol",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: ">$%"
    }, "Misc A", "Misc B"], {
            "matchesnothing>$%!?": {
                StartIndex: 35,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("long symbol at start and long symbol at end", ">$%!?matchesnothing>$%!?", [{
        Type: "Long Symbol",
        StartIndex: 32,
        EndIndex: 36,
        Symbol: ">$%!?"
    }, "Misc A", "Misc B"], {
            "matchesnothing>$%!?": {
                StartIndex: 37,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("short symbol in middle and short symbol in middle", "matc>$%hesnoth>$%ing", ["Misc A", "Misc B", {
        Type: "Short Symbol",
        StartIndex: 36,
        EndIndex: 38,
        Symbol: ">$%"
    }, "Misc C", "Misc D", "Misc E"], {
            "matc": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "hesnoth>$%ing": {
                StartIndex: 39,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("long symbol in middle and short symbol in middle", "matc>$%!?hesnoth>$%ing", ["Misc A", "Misc B", {
        Type: "Long Symbol",
        StartIndex: 36,
        EndIndex: 40,
        Symbol: ">$%!?"
    }, "Misc C", "Misc D", "Misc E"], {
            "matc": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "hesnoth>$%ing": {
                StartIndex: 41,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("short symbol in middle and long symbol in middle", "matc>$%hesnoth>$%!?ing", ["Misc A", "Misc B", {
        Type: "Short Symbol",
        StartIndex: 36,
        EndIndex: 38,
        Symbol: ">$%"
    }, "Misc C", "Misc D", "Misc E"], {
            "matc": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "hesnoth>$%!?ing": {
                StartIndex: 39,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("long symbol in middle and long symbol in middle", "matc>$%!?hesnoth>$%!?ing", ["Misc A", "Misc B", {
        Type: "Long Symbol",
        StartIndex: 36,
        EndIndex: 40,
        Symbol: ">$%!?"
    }, "Misc C", "Misc D", "Misc E"], {
            "matc": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "hesnoth>$%!?ing": {
                StartIndex: 41,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("symbol similar to neither in middle and short symbol in middle", "matc&&*hesnoth>$%ing", ["Misc A", "Misc B", {
        Type: "Symbol Similar To Neither",
        StartIndex: 36,
        EndIndex: 38,
        Symbol: "&&*"
    }, "Misc C", "Misc D", "Misc E"], {
            "matc": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "hesnoth>$%ing": {
                StartIndex: 39,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("symbol similar to neither in middle and long symbol in middle", "matc&&*hesnoth>$%!?ing", ["Misc A", "Misc B", {
        Type: "Symbol Similar To Neither",
        StartIndex: 36,
        EndIndex: 38,
        Symbol: "&&*"
    }, "Misc C", "Misc D", "Misc E"], {
            "matc": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "hesnoth>$%!?ing": {
                StartIndex: 39,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("symbol similar to neither in middle and short symbol at end", "matc&&*hesnoth>$%", ["Misc A", "Misc B", {
        Type: "Symbol Similar To Neither",
        StartIndex: 36,
        EndIndex: 38,
        Symbol: "&&*"
    }, "Misc C", "Misc D", "Misc E"], {
            "matc": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "hesnoth>$%": {
                StartIndex: 39,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("symbol similar to neither in middle and long symbol at end", "matc&&*hesnoth>$%!?", ["Misc A", "Misc B", {
        Type: "Symbol Similar To Neither",
        StartIndex: 36,
        EndIndex: 38,
        Symbol: "&&*"
    }, "Misc C", "Misc D", "Misc E"], {
            "matc": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "hesnoth>$%!?": {
                StartIndex: 39,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("symbol similar to neither at start and short symbol in middle", "&&*hesnoth>$%ing", [{
        Type: "Symbol Similar To Neither",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: "&&*"
    }, "Misc C", "Misc D", "Misc E"], {
            "hesnoth>$%ing": {
                StartIndex: 35,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("symbol similar to neither at start and long symbol in middle", "&&*hesnoth>$%!?ing", [{
        Type: "Symbol Similar To Neither",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: "&&*"
    }, "Misc C", "Misc D", "Misc E"], {
            "hesnoth>$%!?ing": {
                StartIndex: 35,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("symbol similar to neither at start and short symbol at end", "&&*hesnoth>$%", [{
        Type: "Symbol Similar To Neither",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: "&&*"
    }, "Misc C", "Misc D", "Misc E"], {
            "hesnoth>$%": {
                StartIndex: 35,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("symbol similar to neither at start and long symbol at end", "&&*hesnoth>$%!?", [{
        Type: "Symbol Similar To Neither",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: "&&*"
    }, "Misc C", "Misc D", "Misc E"], {
            "hesnoth>$%!?": {
                StartIndex: 35,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("short symbol at start and symbol similar to neither at middle", ">$%matches&&*nothing", [{
        Type: "Short Symbol",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: ">$%"
    }, "Misc A", "Misc B"], {
            "matches&&*nothing": {
                StartIndex: 35,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("long symbol at start and symbol similar to neither at middle", ">$%!?matches&&*nothing", [{
        Type: "Long Symbol",
        StartIndex: 32,
        EndIndex: 36,
        Symbol: ">$%!?"
    }, "Misc A", "Misc B"], {
            "matches&&*nothing": {
                StartIndex: 37,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("short symbol at middle and symbol similar to neither at end", "matches>$%nothing&&*", ["Misc A", "Misc B", {
        Type: "Short Symbol",
        StartIndex: 39,
        EndIndex: 41,
        Symbol: ">$%"
    }, "Misc C", "Misc D", "Misc E"], {
            "matches": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "nothing&&*": {
                StartIndex: 42,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("long symbol at middle and symbol similar to neither at end", "matches>$%!?nothing&&*", ["Misc A", "Misc B", {
        Type: "Long Symbol",
        StartIndex: 39,
        EndIndex: 43,
        Symbol: ">$%!?"
    }, "Misc C", "Misc D", "Misc E"], {
            "matches": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "nothing&&*": {
                StartIndex: 44,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("short symbol at start and symbol similar to neither at end", ">$%matchesnothing&&*", [{
        Type: "Short Symbol",
        StartIndex: 32,
        EndIndex: 34,
        Symbol: ">$%"
    }, "Misc A", "Misc B"], {
            "matchesnothing&&*": {
                StartIndex: 35,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("long symbol at start and symbol similar to neither at end", ">$%!?matchesnothing&&*", [{
        Type: "Long Symbol",
        StartIndex: 32,
        EndIndex: 36,
        Symbol: ">$%!?"
    }, "Misc A", "Misc B"], {
            "matchesnothing&&*": {
                StartIndex: 37,
                Result: ["Misc A", "Misc B"]
            }
        })

    Test("short symbol in middle and symbol similar to neither in middle", "matc>$%hesnoth&&*ing", ["Misc A", "Misc B", {
        Type: "Short Symbol",
        StartIndex: 36,
        EndIndex: 38,
        Symbol: ">$%"
    }, "Misc C", "Misc D", "Misc E"], {
            "matc": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "hesnoth&&*ing": {
                StartIndex: 39,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })

    Test("long symbol in middle and symbol similar to neither in middle", "matc>$%!?hesnoth&&*ing", ["Misc A", "Misc B", {
        Type: "Long Symbol",
        StartIndex: 36,
        EndIndex: 40,
        Symbol: ">$%!?"
    }, "Misc C", "Misc D", "Misc E"], {
            "matc": {
                StartIndex: 32,
                Result: ["Misc A", "Misc B"]
            },
            "hesnoth&&*ing": {
                StartIndex: 41,
                Result: ["Misc C", "Misc D", "Misc E"]
            }
        })
})