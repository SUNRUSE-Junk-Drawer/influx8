describe("WorkerHandleBuild", () => {
    const rewire = require("rewire")

    global.addEventListener = jasmine.createSpy("addEventListener")
    const namespace = rewire("../../Editor.Worker.js")
    delete global.addEventListener

    const handleBuild = namespace.__get__("HandleBuild")

    function Test(description, verifyExpressionMap, message) {
        describe(description, () => {
            let taskWorkers
            let postMessage
            let ParenthesizeTokens
            let ParseExpression
            let InlineExpression
            let UnrollExpression
            let TypecheckExpression
            let VerifyExpression

            beforeEach(() => {
                taskWorkers = [{
                    postMessage: jasmine.createSpy("postMessage")
                }, {
                    postMessage: jasmine.createSpy("postMessage")
                }, {
                    postMessage: jasmine.createSpy("postMessage")
                }]
                namespace.__set__("TaskWorkers", taskWorkers)

                postMessage = jasmine.createSpy("postMessage")
                namespace.__set__("postMessage", postMessage)

                ParenthesizeTokens = jasmine.createSpy("ParenthesizeTokens")
                ParenthesizeTokens.and.callFake(tokens => {
                    expect(tokens).toEqual("test unparenthesized tokens")
                    return "test parenthesized tokens"
                })
                namespace.__set__("ParenthesizeTokens", ParenthesizeTokens)

                ParseExpression = jasmine.createSpy("ParseExpression")
                ParseExpression.and.callFake((tokens, startIndex, endIndex) => {
                    expect(tokens).toEqual("test parenthesized tokens")
                    expect(startIndex).toEqual(0)
                    expect(endIndex).toEqual(39)
                    return "test parsed expression"
                })
                namespace.__set__("ParseExpression", ParseExpression)

                InlineExpression = jasmine.createSpy("InlineExpression")
                InlineExpression.and.callFake((expression, scope) => {
                    expect(expression).toEqual("test parsed expression")
                    expect(scope).toEqual({})
                    return "test inlined expression"
                })
                namespace.__set__("InlineExpression", InlineExpression)

                UnrollExpression = jasmine.createSpy("UnrollExpression")
                UnrollExpression.and.callFake((expression) => {
                    expect(expression).toEqual("test inlined expression")
                    return [
                        "test unrolled expression a",
                        "test unrolled expression b",
                        "test unrolled expression c",
                        "test unrolled expression d"
                    ]
                })
                namespace.__set__("UnrollExpression", UnrollExpression)

                TypecheckExpression = jasmine.createSpy("TypecheckExpression")
                TypecheckExpression.and.callFake((expression) => {
                    switch (expression) {
                        case "test unrolled expression a": return "test typechecked expression a"
                        case "test unrolled expression b": return "test typechecked expression b"
                        case "test unrolled expression c": return "test typechecked expression c"
                        case "test unrolled expression d": return "test typechecked expression d"
                        default: fail("Unexpected unrolled expression")
                    }
                })
                namespace.__set__("TypecheckExpression", TypecheckExpression)

                VerifyExpression = jasmine.createSpy("VerifyExpression")
                VerifyExpression.and.callFake((expression) => {
                    if (!Object.prototype.hasOwnProperty.call(verifyExpressionMap, expression)) fail("Unexpected typechecked expression")
                    return verifyExpressionMap[expression]
                })
                namespace.__set__("VerifyExpression", VerifyExpression)
            })

            function Run() {
                handleBuild({
                    Tokens: "test unparenthesized tokens",
                    Type: "Build",
                    BuildId: "test build id",
                    SourceLength: 39
                })
            }

            function SendsMessage(description, stage, after, before) {
                describe(description, () => {
                    it("posts the message", () => {
                        Run()
                        expect(postMessage).toHaveBeenCalledWith({
                            Type: "Progress",
                            Stage: stage,
                            BuildId: "test build id"
                        })
                    })
                    it("has executed all callbacks expected to have been executed by the time of posting the message", () => {
                        postMessage.and.callFake(message => { if (message.Stage == stage) after().forEach(callback => expect(callback).toHaveBeenCalled()) })
                        Run()
                    })
                    it("has not executed any callbacks expected not to have been executed by the time of posting the message", () => {
                        postMessage.and.callFake(message => { if (message.Stage == stage) before().forEach(callback => expect(callback).not.toHaveBeenCalled()) })
                        Run()
                    })
                })
            }

            SendsMessage("indicates that the tokens are being parenthesized", "Parenthesizing", () => [], () => [ParenthesizeTokens])
            SendsMessage("indicates that the expression is being parsed", "Parsing", () => [ParenthesizeTokens], () => [ParseExpression])
            SendsMessage("indicates that the expression is being inlined", "Inlining", () => [ParseExpression], () => [InlineExpression])
            SendsMessage("indicates that the expression is being unrolled", "Unrolling", () => [InlineExpression], () => [UnrollExpression])
            SendsMessage("indicates that the expression is being typechecked", "Typechecking", () => [UnrollExpression], () => [TypecheckExpression])
            SendsMessage("indicates that the expression is being verified", "Verifying", () => [TypecheckExpression], () => [VerifyExpression])
            SendsMessage("indicates that the tasks are being ran", "RunningTasks", () => [VerifyExpression], () => [taskWorkers[0].postMessage, taskWorkers[1].postMessage, taskWorkers[2].postMessage])

            describe("orderless checks", () => {
                beforeEach(Run)
                it("does not send further messages", () => expect(postMessage.calls.count()).toEqual(7))
                it("posts a message to the first task worker", () => expect(taskWorkers[0].postMessage.calls.count()).toEqual(1))
                it("posts the expected message to the first task worker", () => expect(taskWorkers[0].postMessage).toHaveBeenCalledWith(message))
                it("posts a message to the second task worker", () => expect(taskWorkers[1].postMessage.calls.count()).toEqual(1))
                it("posts the expected message to the first task worker", () => expect(taskWorkers[1].postMessage).toHaveBeenCalledWith(message))
                it("posts a message to the third task worker", () => expect(taskWorkers[2].postMessage.calls.count()).toEqual(1))
                it("posts the expected message to the first task worker", () => expect(taskWorkers[2].postMessage).toHaveBeenCalledWith(message))
            })
        })
    }

    Test("all dimensions verify", {
        "test typechecked expression a": "test verified expression a",
        "test typechecked expression b": "test verified expression b",
        "test typechecked expression c": "test verified expression c",
        "test typechecked expression d": "test verified expression d"
    }, {
            BuildId: "test build id",
            Typechecked: ["test typechecked expression a", "test typechecked expression b", "test typechecked expression c", "test typechecked expression d"],
            Verified: ["test verified expression a", "test verified expression b", "test verified expression c", "test verified expression d"]
        })

    Test("the first dimension fails to verify", {
        "test typechecked expression a": undefined,
        "test typechecked expression b": "test verified expression b",
        "test typechecked expression c": "test verified expression c",
        "test typechecked expression d": "test verified expression d"
    }, {
            BuildId: "test build id",
            Typechecked: ["test typechecked expression a", "test typechecked expression b", "test typechecked expression c", "test typechecked expression d"],
            Verified: undefined
        })

    Test("a middle dimension fails to verify", {
        "test typechecked expression a": "test verified expression a",
        "test typechecked expression b": "test verified expression b",
        "test typechecked expression c": undefined,
        "test typechecked expression d": "test verified expression d"
    }, {
            BuildId: "test build id",
            Typechecked: ["test typechecked expression a", "test typechecked expression b", "test typechecked expression c", "test typechecked expression d"],
            Verified: undefined
        })

    Test("the last dimension fails to verify", {
        "test typechecked expression a": "test verified expression a",
        "test typechecked expression b": "test verified expression b",
        "test typechecked expression c": "test verified expression c",
        "test typechecked expression d": undefined
    }, {
            BuildId: "test build id",
            Typechecked: ["test typechecked expression a", "test typechecked expression b", "test typechecked expression c", "test typechecked expression d"],
            Verified: undefined
        })
})