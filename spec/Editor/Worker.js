describe("Worker", () => {
    const rewire = require("rewire")
    let namespace
    beforeEach(() => {
        global.addEventListener = jasmine.createSpy("addEventListener")
        global.postMessage = jasmine.createSpy("postMessage")
        namespace = rewire("../../Editor.Worker.js")
    })
    afterEach(() => {
        delete global.addEventListener
        delete global.postMessage
    })
    it("adds one event listener", () => expect(global.addEventListener.calls.count()).toEqual(1))
    it("listens for messages", () => expect(global.addEventListener).toHaveBeenCalledWith("message", jasmine.any(Function)))
    it("does not post a message", () => expect(global.postMessage).not.toHaveBeenCalled())
    describe("on receiving a build message", () => {
        beforeEach(() => {
            global.addEventListener.calls.argsFor(0)[1]({
                data: {
                    Type: "Build",
                    BuildId: "test build id"
                }
            })
        })
        it("does not add further event listeners", () => expect(global.addEventListener.calls.count()).toEqual(1))
        it("posts a single message", () => expect(global.postMessage.calls.count()).toEqual(1))
        it("posts the build id", () => expect(global.postMessage.calls.argsFor(0)[0].BuildId).toEqual("test build id"))
    })
})