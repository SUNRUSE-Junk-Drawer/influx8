describe("WorkerHandleConfiguration", () => {
    const rewire = require("rewire")

    global.addEventListener = jasmine.createSpy("addEventListener")
    const namespace = rewire("../../Editor.Worker.js")
    delete global.addEventListener

    const handleConfiguration = namespace.__get__("HandleConfiguration")
    let createTaskWorker
    beforeEach(() => {
        createTaskWorker = jasmine.createSpy("CreateTaskWorker")
        namespace.__set__("CreateTaskWorker", createTaskWorker)

        handleConfiguration({
            TaskWorkerUrls: ["test worker url a", "test worker url b", "test worker url c"]
        })
    })

    it("creates a worker for every url given", () => expect(createTaskWorker.calls.count()).toEqual(3))

    it("creates a worker for the first url given", () => expect(createTaskWorker).toHaveBeenCalledWith("test worker url a"))
    it("creates a worker for the second url given", () => expect(createTaskWorker).toHaveBeenCalledWith("test worker url b"))
    it("creates a worker for the third url given", () => expect(createTaskWorker).toHaveBeenCalledWith("test worker url c"))
})