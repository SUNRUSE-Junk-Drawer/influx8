describe("Worker", () => {
    const rewire = require("rewire")
    let namespace
    let handleConfiguration
    let handleBuild
    beforeEach(() => {
        global.addEventListener = jasmine.createSpy("addEventListener")
        namespace = rewire("../../Editor.Worker.js")

        handleConfiguration = jasmine.createSpy("HandleConfiguration")
        namespace.__set__("HandleConfiguration", handleConfiguration)

        handleBuild = jasmine.createSpy("HandleBuild")
        namespace.__set__("HandleBuild", handleBuild)
    })
    afterEach(() => {
        delete global.addEventListener
    })
    it("adds one event listener", () => expect(global.addEventListener.calls.count()).toEqual(1))
    it("listens for messages", () => expect(global.addEventListener).toHaveBeenCalledWith("message", jasmine.any(Function)))
    it("does not handle configuration", () => expect(handleConfiguration).not.toHaveBeenCalled())
    it("does not handle a build", () => expect(handleBuild).not.toHaveBeenCalled())
    describe("on receiving a configuration message", () => {
        beforeEach(() => {
            global.addEventListener.calls.argsFor(0)[1]({
                data: {
                    Type: "Configuration",
                    Misc: "Value"
                }
            })
        })
        it("does not add further event listeners", () => expect(global.addEventListener.calls.count()).toEqual(1))
        it("handles configuration once", () => expect(handleConfiguration.calls.count()).toEqual(1))
        it("passes the request", () => expect(handleConfiguration).toHaveBeenCalledWith({
            Type: "Configuration",
            Misc: "Value"
        }))
        it("does not handle a build", () => expect(handleBuild).not.toHaveBeenCalled())
    })
    describe("on receiving a configuration message", () => {
        beforeEach(() => {
            global.addEventListener.calls.argsFor(0)[1]({
                data: {
                    Type: "Build",
                    Misc: "Value"
                }
            })
        })
        it("does not add further event listeners", () => expect(global.addEventListener.calls.count()).toEqual(1))
        it("does not handle configuration", () => expect(handleConfiguration).not.toHaveBeenCalled())
        it("handles a single build", () => expect(handleBuild.calls.count()).toEqual(1))
        it("passes the request", () => expect(handleBuild).toHaveBeenCalledWith({
            Type: "Build",
            Misc: "Value"
        }))
    })
})