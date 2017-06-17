describe("StartBuild", () => {
    global.window = {}
    const Namespace = require("rewire")("../../Editor.js")
    delete global.window
    const StartBuild = Namespace.__get__("StartBuild")
    let result
    let editorElement
    let worker
    let throttle
    let configuration
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

        configuration = {
            WhenBuildProgresses: jasmine.createSpy("WhenBuildProgresses"),
            Tasks: [null, null, null, null]
        }

        result = StartBuild(editorElement, "test source code", "test text area wrapping element", throttle, worker, "test build id", configuration)
    })
    it("inserts one element into the editor element", () => expect(editorElement.insertBefore.calls.count()).toEqual(1))
    it("inserts the syntax highlighting element before the textarea's wrapper", () => expect(editorElement.insertBefore).toHaveBeenCalledWith("test syntax highlighting element", "test text area wrapping element"))
    it("returns the editor element", () => expect(result.EditorElement).toBe(editorElement))
    it("returns the syntax highlighting element", () => expect(result.SyntaxHighlightingElement).toEqual("test syntax highlighting element"))
    it("returns the build id", () => expect(result.Id).toEqual("test build id"))
    it("returns a progress of 0", () => expect(result.Progress).toEqual(0))
    it("reports build progress once", () => expect(configuration.WhenBuildProgresses.calls.count()).toEqual(1))
    it("reports that we are waiting for the throttling to finish", () => expect(configuration.WhenBuildProgresses).toHaveBeenCalledWith("Waiting", 0, 12))
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
        it("tells the worker this is a build", () => expect(worker.postMessage.calls.argsFor(0)[0].Type).toEqual("Build"))
        it("posts the tokens to the worker", () => expect(worker.postMessage.calls.argsFor(0)[0].Tokens).toEqual("test tokens"))
        it("posts the source length to the worker", () => expect(worker.postMessage.calls.argsFor(0)[0].SourceLength).toEqual(16))
        it("posts the build id to the worker", () => expect(worker.postMessage.calls.argsFor(0)[0].BuildId).toEqual("test build id"))
        it("does not modify the editor element reference", () => expect(result.EditorElement).toBe(editorElement))
        it("does not modify the syntax highlighting element reference", () => expect(result.SyntaxHighlightingElement).toEqual("test syntax highlighting element"))
        it("does not modify the build id reference", () => expect(result.Id).toEqual("test build id"))
        it("updates progress to be 1", () => expect(result.Progress).toEqual(1))
        it("reports build progress a second time", () => expect(configuration.WhenBuildProgresses.calls.count()).toEqual(2))
        it("reports that we are waiting for the background task to start", () => expect(configuration.WhenBuildProgresses).toHaveBeenCalledWith("Starting", 1, 12))
    })
})