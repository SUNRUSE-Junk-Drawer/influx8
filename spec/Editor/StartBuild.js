describe("StartBuild", () => {
    const Namespace = require("rewire")("../../Editor.js")
    const StartBuild = Namespace.__get__("StartBuild")
    let result
    let editorElement
    let worker
    let throttle
    beforeEach(() => {
        Namespace.__set__("ParseToTokens", (source) => {
            expect(source).toEqual("test source code")
            return "test tokens"
        })
        Namespace.__set__("CreateSyntaxHighlightingElement", (tokens, source) => {
            expect(tokens).toEqual("test tokens")
            expect(source).toEqual("test source code")
            return "test syntax highlighting element"
        })
        editorElement = {
            insertBefore: jasmine.createSpy("insertBefore")
        }
        worker = {
            postMessage: jasmine.createSpy("postMessage")
        }
        throttle = jasmine.createSpy("throttle")
        result = StartBuild(editorElement, "test source code", "test text area wrapping element", throttle, worker, "test build id")
    })
    it("inserts one element into the editor element", () => expect(editorElement.insertBefore.calls.count()).toEqual(1))
    it("inserts the syntax highlighting element before the textarea's wrapper", () => expect(editorElement.insertBefore).toHaveBeenCalledWith("test syntax highlighting element", "test text area wrapping element"))
    it("returns the editor element", () => expect(result.EditorElement).toBe(editorElement))
    it("returns the syntax highlighting element", () => expect(result.SyntaxHighlightingElement).toEqual("test syntax highlighting element"))
    it("returns the build id", () => expect(result.Id).toEqual("test build id"))
    it("does not post a message to the worker", () => expect(worker.postMessage).not.toHaveBeenCalled())
    it("throttles one callback", () => expect(throttle.calls.count()).toEqual(1))
    it("throttles a callback", () => expect(throttle).toHaveBeenCalledWith(jasmine.any(Function)))
    describe("when the throttled callback executes", () => {
        beforeEach(() => {
            const callback = throttle.calls.argsFor(0)[0]
            editorElement.insertBefore.calls.reset()
            throttle.calls.reset()
            callback()
        })
        it("does not insert further elements into the editor element", () => expect(editorElement.insertBefore).not.toHaveBeenCalled())
        it("does not throttle further callbacks", () => expect(throttle).not.toHaveBeenCalled())
        it("posts one message to the worker", () => expect(worker.postMessage.calls.count()).toEqual(1))
        it("posts the tokens to the worker", () => expect(worker.postMessage.calls.argsFor(0)[0].Tokens).toEqual("test tokens"))
        it("posts the source length to the worker", () => expect(worker.postMessage.calls.argsFor(0)[0].SourceLength).toEqual(16))
        it("posts the build id to the worker", () => expect(worker.postMessage.calls.argsFor(0)[0].BuildId).toEqual("test build id"))
    })
})