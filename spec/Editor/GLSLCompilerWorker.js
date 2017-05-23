describe("GLSLCompilerWorker", () => {
    const rewire = require("rewire")
    let namespace
    let matchCSyntax
    let generateCSyntax
    beforeEach(() => {
        global.addEventListener = jasmine.createSpy("addEventListener")
        global.postMessage = jasmine.createSpy("postMessage")

        namespace = rewire("../../Editor.GLSLCompilerWorker.js")

        matchCSyntax = jasmine.createSpy("MatchCSyntax")
        namespace.__set__("MatchCSyntax", matchCSyntax)

        generateCSyntax = jasmine.createSpy("GenerateCSyntax")
        namespace.__set__("GenerateCSyntax", generateCSyntax)

        namespace.__set__("GLSLCSyntax", "test glsl c syntax")
    })
    afterEach(() => {
        delete global.addEventListener
        delete global.postMessage
    })
    it("adds one event listener", () => expect(global.addEventListener.calls.count()).toEqual(1))
    it("listens for messages", () => expect(global.addEventListener).toHaveBeenCalledWith("message", jasmine.any(Function)))
    it("does not post a message", () => expect(global.postMessage).not.toHaveBeenCalled())
    it("does not match C syntax", () => expect(matchCSyntax).not.toHaveBeenCalled())
    it("does not generate C syntax", () => expect(generateCSyntax).not.toHaveBeenCalled())

    describe("on receiving a message without a verified expression", () => {
        beforeEach(() => {
            global.addEventListener.calls.argsFor(0)[1]({
                data: {
                    BuildId: "test build id",
                    Typechecked: "test typechecked",
                    Verified: undefined
                }
            })
        })
        it("does not add further event listeners", () => expect(global.addEventListener.calls.count()).toEqual(1))
        it("does not match C syntax", () => expect(matchCSyntax).not.toHaveBeenCalled())
        it("does not generate C syntax", () => expect(generateCSyntax).not.toHaveBeenCalled())
        it("posts one message", () => expect(global.postMessage.calls.count()).toEqual(1))
        it("posts the build id", () => expect(global.postMessage.calls.argsFor(0)[0].BuildId).toEqual("test build id"))
        it("posts undefined data", () => expect(global.postMessage.calls.argsFor(0)[0].Data).toBeUndefined())
    })

    describe("on receiving a message with a verified expression which does not match", () => {
        beforeEach(() => {
            global.addEventListener.calls.argsFor(0)[1]({
                data: {
                    BuildId: "test build id",
                    Typechecked: "test typechecked",
                    Verified: "test verified"
                }
            })
        })
        it("does not add further event listeners", () => expect(global.addEventListener.calls.count()).toEqual(1))
        it("matches one expression and C syntax", () => expect(matchCSyntax.calls.count()).toEqual(1))
        it("matches the verified expression and GLSL C syntax", () => expect(matchCSyntax).toHaveBeenCalledWith("test verified", "test glsl c syntax"))
        it("does not generate C syntax", () => expect(generateCSyntax).not.toHaveBeenCalled())
        it("posts one message", () => expect(global.postMessage.calls.count()).toEqual(1))
        it("posts the build id", () => expect(global.postMessage.calls.argsFor(0)[0].BuildId).toEqual("test build id"))
        it("posts undefined data", () => expect(global.postMessage.calls.argsFor(0)[0].Data).toBeUndefined())
    })

    describe("on receiving a message with a verified expression which matches", () => {
        beforeEach(() => {
            matchCSyntax.and.returnValue("test matched c syntax")
            generateCSyntax.and.returnValue("test generated c syntax")
            global.addEventListener.calls.argsFor(0)[1]({
                data: {
                    BuildId: "test build id",
                    Typechecked: "test typechecked",
                    Verified: "test verified"
                }
            })
        })
        it("does not add further event listeners", () => expect(global.addEventListener.calls.count()).toEqual(1))
        it("matches one expression and C syntax", () => expect(matchCSyntax.calls.count()).toEqual(1))
        it("matches the verified expression and GLSL C syntax", () => expect(matchCSyntax).toHaveBeenCalledWith("test verified", "test glsl c syntax"))
        it("generates one C syntax", () => expect(generateCSyntax.calls.count()).toEqual(1))
        it("generates C syntax from the matched expression", () => expect(generateCSyntax).toHaveBeenCalledWith("test matched c syntax", "test glsl c syntax"))
        it("posts one message", () => expect(global.postMessage.calls.count()).toEqual(1))
        it("posts the build id", () => expect(global.postMessage.calls.argsFor(0)[0].BuildId).toEqual("test build id"))
        it("posts the generated C syntax as data", () => expect(global.postMessage.calls.argsFor(0)[0].Data).toEqual("test generated c syntax"))
    })
})