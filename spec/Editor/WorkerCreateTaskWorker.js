describe("WorkerCreateTaskWorker", () => {
    const rewire = require("rewire")

    global.addEventListener = jasmine.createSpy("addEventListener")
    const namespace = rewire("../../Editor.Worker.js")
    delete global.addEventListener

    const createTaskWorker = namespace.__get__("CreateTaskWorker")
    let workerConstructor
    let workerInstance
    let taskWorkers
    let postMesage
    beforeEach(() => {
        workerConstructor = jasmine.createSpy("Worker")
        workerConstructor.and.callFake(function (url) {
            workerInstance = this
            workerInstance.addEventListener = jasmine.createSpy("addEventListener")
        })
        namespace.__set__("Worker", workerConstructor)

        taskWorkers = ["test existing worker a", "test existing worker b"]
        namespace.__set__("TaskWorkers", taskWorkers)

        postMessage = jasmine.createSpy("postMessage")
        namespace.__set__("postMessage", postMessage)

        createTaskWorker({
            WorkerUrl: "test worker url"
        })
    })

    it("creates one worker", () => expect(workerConstructor.calls.count()).toEqual(1))
    it("creates the worker using the url", () => expect(workerConstructor).toHaveBeenCalledWith("test worker url"))
    it("adds one event listener", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
    it("listens for messages", () => expect(workerInstance.addEventListener).toHaveBeenCalledWith("message", jasmine.any(Function)))
    it("does not post a message", () => expect(postMessage).not.toHaveBeenCalled())
    it("stores the worker in the Workers object", () => expect(taskWorkers[2]).toBe(workerInstance))
    it("does not modify existing values in the Workers object", () => expect(taskWorkers).toEqual([
        "test existing worker a",
        "test existing worker b",
        jasmine.any(workerConstructor)
    ]))
    describe("on a message being received", () => {
        beforeEach(() => {
            taskWorkers.length = 0
            taskWorkers.push("test new worker a")
            taskWorkers.push("test new worker b")
            workerInstance.addEventListener.calls.argsFor(0)[1]({
                data: {
                    BuildId: "test build id",
                    Data: "test data"
                }
            })
        })
        it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
        it("does not add further event listeners", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
        it("posts one message", () => expect(postMessage.calls.count()).toEqual(1))
        it("posts that a task completed", () => expect(postMessage.calls.argsFor(0)[0].Type).toEqual("TaskCompleted"))
        it("posts the worker url", () => expect(postMessage.calls.argsFor(0)[0].WorkerUrl).toEqual("test worker url"))
        it("posts the build id", () => expect(postMessage.calls.argsFor(0)[0].BuildId).toEqual("test build id"))
        it("posts the data", () => expect(postMessage.calls.argsFor(0)[0].Data).toEqual("test data"))
        it("does not modify the Workers object", () => expect(taskWorkers).toEqual(["test new worker a", "test new worker b"]))
    })
})