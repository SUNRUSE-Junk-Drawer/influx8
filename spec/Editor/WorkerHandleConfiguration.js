describe("WorkerHandleConfiguration", () => {
    const rewire = require("rewire")

    global.addEventListener = jasmine.createSpy("addEventListener")
    const namespace = rewire("../../Editor.Worker.js")
    delete global.addEventListener

    const handleConfiguration = namespace.__get__("HandleConfiguration")
    let handleBuild
    let workerConstructor
    let workerInstances
    beforeEach(() => {
        workerInstances = {}
        workerConstructor = jasmine.createSpy("Worker")
        workerConstructor.and.callFake(function (url) {
            workerInstances[url] = this
        })
        namespace.__set__("Worker", workerConstructor)

        handleConfiguration({
            WorkerUrls: ["test worker url a", "test worker url b", "test worker url c"]
        })
    })

    it("creates a worker for every url given", () => expect(workerConstructor.calls.count()).toEqual(3))

    it("creates a worker for the first url given", () => expect(workerConstructor).toHaveBeenCalledWith("test worker url a"))
    it("creates a worker for the second url given", () => expect(workerConstructor).toHaveBeenCalledWith("test worker url b"))
    it("creates a worker for the third url given", () => expect(workerConstructor).toHaveBeenCalledWith("test worker url c"))

    it("stores the worker instances as Workers", () => expect(namespace.__get__("Workers")).toEqual(workerInstances))
})