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
            Tasks: ["test worker task a", "test worker task b", "test worker task c"]
        })
    })

    it("creates a worker for every task given", () => expect(createTaskWorker.calls.count()).toEqual(3))

    it("creates a worker for the first task given", () => expect(createTaskWorker).toHaveBeenCalledWith("test worker task a", 0))
    it("creates a worker for the second task given", () => expect(createTaskWorker).toHaveBeenCalledWith("test worker task b", 1))
    it("creates a worker for the third task given", () => expect(createTaskWorker).toHaveBeenCalledWith("test worker task c", 2))
})