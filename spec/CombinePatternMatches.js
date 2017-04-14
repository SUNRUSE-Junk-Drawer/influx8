describe("CombinePatternMatches", () => {
    const Namespace = require("rewire")("../dist/index.js")
    const CombinePatternMatches = Namespace.__get__("CombinePatternMatches")

    function Test(description, a, b, output, matchPattern) {
        it(description, () => {
            Namespace.__set__("MatchPattern", matchPattern || fail)
            expect(CombinePatternMatches(a, b)).toEqual(output)
        })
    }

    Test("nothing and nothing", {}, {}, {})

    Test("something and nothing", {
        "Test Key A": "Test Value A",
        "Test Key B": "Test Value B"
    }, {}, {
            "Test Key A": "Test Value A",
            "Test Key B": "Test Value B"
        })

    Test("nothing and something", {
        "Test Key A": "Test Value A",
        "Test Key B": "Test Value B"
    }, {}, {
            "Test Key A": "Test Value A",
            "Test Key B": "Test Value B"
        })

    Test("something and something else", {
        "Test Key A": "Test Value A",
        "Test Key B": "Test Value B"
    }, {
            "Test Key C": "Test Value C",
            "Test Key D": "Test Value D",
            "Test Key E": "Test Value E"
        }, {
            "Test Key A": "Test Value A",
            "Test Key B": "Test Value B",
            "Test Key C": "Test Value C",
            "Test Key D": "Test Value D",
            "Test Key E": "Test Value E"
        })


    Test("two sets where everything matches", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B"
        }, {
            "Test Key A": "Test Value A A",
            "Test Key B": "Test Value A B"
        }, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return ["Test Result A"]
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return ["Test Result B"]
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where the first does not match", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return []
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return ["Test Result B"]
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where the second does not match", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return ["Test Result A"]
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return []
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where nothing matches", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return []
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return []
                default: fail("Unexpected expression")
            }
        })


    Test("two sets where everything matches and the first set contains its own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B",
        "Test Key C": "Test Value A C",
        "Test Key D": "Test Value A D"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B"
        }, {
            "Test Key A": "Test Value A A",
            "Test Key B": "Test Value A B",
            "Test Key C": "Test Value A C",
            "Test Key D": "Test Value A D"
        }, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return ["Test Result A"]
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return ["Test Result B"]
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where the first does not match and the first set contains its own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B",
        "Test Key C": "Test Value A C",
        "Test Key D": "Test Value A D"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return []
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return ["Test Result B"]
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where the second does not match and the first set contains its own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B",
        "Test Key C": "Test Value A C",
        "Test Key D": "Test Value A D"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return ["Test Result A"]
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return []
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where nothing matches and the first set contains its own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B",
        "Test Key C": "Test Value A C",
        "Test Key D": "Test Value A D"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return []
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return []
                default: fail("Unexpected expression")
            }
        })


    Test("two sets where everything matches and the second set contains its own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, {
            "Test Key A": "Test Value A A",
            "Test Key B": "Test Value A B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return ["Test Result A"]
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return ["Test Result B"]
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where the first does not match and the second set contains its own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return []
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return ["Test Result B"]
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where the second does not match and the second set contains its own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return ["Test Result A"]
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return []
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where nothing matches and the second set contains its own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return []
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return []
                default: fail("Unexpected expression")
            }
        })


    Test("two sets where everything matches and the sets contain their own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B",
        "Test Key E": "Test value A E",
        "Test Key F": "Test value A F",
        "Test Key G": "Test value A G"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, {
            "Test Key A": "Test Value A A",
            "Test Key B": "Test Value A B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D",
            "Test Key E": "Test value A E",
            "Test Key F": "Test value A F",
            "Test Key G": "Test value A G"
        }, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return ["Test Result A"]
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return ["Test Result B"]
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where the first does not match and the sets contain their own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B",
        "Test Key E": "Test value A E",
        "Test Key F": "Test value A F",
        "Test Key G": "Test value A G"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return []
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return ["Test Result B"]
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where the second does not match and the sets contain their own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B",
        "Test Key E": "Test value A E",
        "Test Key F": "Test value A F",
        "Test Key G": "Test value A G"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return ["Test Result A"]
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return []
                default: fail("Unexpected expression")
            }
        })

    Test("two sets where nothing matches and the sets contain their own items", {
        "Test Key A": "Test Value A A",
        "Test Key B": "Test Value A B",
        "Test Key E": "Test value A E",
        "Test Key F": "Test value A F",
        "Test Key G": "Test value A G"
    }, {
            "Test Key A": "Test Value B A",
            "Test Key B": "Test Value B B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, undefined, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return []
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return []
                default: fail("Unexpected expression")
            }
        })

    Test("is not confused by properties from the Object prototype when in both sets", {
        "constructor": "Test Value A A",
        "Test Key B": "Test Value A B",
        "Test Key E": "Test value A E",
        "Test Key F": "Test value A F",
        "Test Key G": "Test value A G"
    }, {
            "constructor": "Test Value B A",
            "Test Key B": "Test Value B B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, {
            "constructor": "Test Value A A",
            "Test Key B": "Test Value A B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D",
            "Test Key E": "Test value A E",
            "Test Key F": "Test value A F",
            "Test Key G": "Test value A G"
        }, (expression, pattern) => {
            switch (expression) {
                case "Test Value A A":
                    expect(pattern).toEqual("Test Value B A")
                    return ["Test Result A"]
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return ["Test Result B"]
                default: fail("Unexpected expression")
            }
        })

    Test("is not confused by properties from the Object prototype when in the first set", {
        "constructor": "Test Value A A",
        "Test Key B": "Test Value A B",
        "Test Key E": "Test value A E",
        "Test Key F": "Test value A F",
        "Test Key G": "Test value A G"
    }, {
            "Test Key B": "Test Value B B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, {
            "constructor": "Test Value A A",
            "Test Key B": "Test Value A B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D",
            "Test Key E": "Test value A E",
            "Test Key F": "Test value A F",
            "Test Key G": "Test value A G"
        }, (expression, pattern) => {
            switch (expression) {
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return ["Test Result B"]
                default: fail("Unexpected expression")
            }
        })

    Test("is not confused by properties from the Object prototype when in the second set", {
        "Test Key B": "Test Value A B",
        "Test Key E": "Test value A E",
        "Test Key F": "Test value A F",
        "Test Key G": "Test value A G"
    }, {
            "constructor": "Test Value B A",
            "Test Key B": "Test Value B B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D"
        }, {
            "constructor": "Test Value B A",
            "Test Key B": "Test Value A B",
            "Test Key C": "Test Value B C",
            "Test Key D": "Test Value B D",
            "Test Key E": "Test value A E",
            "Test Key F": "Test value A F",
            "Test Key G": "Test value A G"
        }, (expression, pattern) => {
            switch (expression) {
                case "Test Value A B":
                    expect(pattern).toEqual("Test Value B B")
                    return ["Test Result B"]
                default: fail("Unexpected expression")
            }
        })
})