describe("SetupChangeListener", () => {
    global.window = {}
    const Namespace = require("rewire")("../../Editor.js")
    delete global.window
    const SetupChangeListener = Namespace.__get__("SetupChangeListener")
    let Throttle
    let StartBuild
    let UpdateBuild
    let EndBuild
    let workerConstructor
    let workerInstance
    let textArea
    let configuration
    beforeEach(() => {
        workerConstructor = jasmine.createSpy("Worker")
        workerConstructor.and.callFake(function () {
            workerInstance = this
            workerInstance.addEventListener = jasmine.createSpy("addEventListener")
            workerInstance.postMessage = jasmine.createSpy("postMessage")
        })
        Namespace.__set__("Worker", workerConstructor)

        Throttle = jasmine.createSpy("Throttle")
        Throttle.and.returnValue("test throttle")
        Namespace.__set__("Throttle", Throttle)

        StartBuild = jasmine.createSpy("StartBuild")
        StartBuild.and.callFake((editorElement, source, textAreaWrappingElement) => {
            expect(EndBuild.calls.count()).toEqual(StartBuild.calls.count() - 1, "Builds started without ending the previous")
            switch (source) {
                case "test source code a": return "test build a"
                case "test source code b": return "test build b"
                case "test source code c": return "test build c"
                case "test source code d": return "test build d"
                default: fail("Unexpected source")
            }
        })
        Namespace.__set__("StartBuild", StartBuild)

        UpdateBuild = jasmine.createSpy("UpdateBuild")
        Namespace.__set__("UpdateBuild", UpdateBuild)

        EndBuild = jasmine.createSpy("EndBuild")
        Namespace.__set__("EndBuild", EndBuild)

        textArea = {
            value: "test source code a",
            addEventListener: jasmine.createSpy("addEventListener")
        }

        configuration = {
            Tasks: [{
                WorkerUrl: "test worker url a",
                Misc: "test value a"
            }, {
                WorkerUrl: "test worker url b",
                Misc: "test value b"
            }, {
                WorkerUrl: "test worker url c",
                Misc: "test value c"
            }]
        }

        result = SetupChangeListener("test editor element", textArea, "test text area wrapping element", configuration)
    })
    it("creates one worker", () => expect(workerConstructor.calls.count()).toEqual(1))
    it("creates a worker for the worker script", () => expect(workerConstructor).toHaveBeenCalledWith("Editor.Worker.min.js"))
    it("adds one event listener to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
    it("listens for messages from the worker", () => expect(workerInstance.addEventListener).toHaveBeenCalledWith("message", jasmine.any(Function)))
    it("posts one message to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
    it("tells the worker this is configuration", () => expect(workerInstance.postMessage.calls.argsFor(0)[0].Type).toEqual("Configuration"))
    it("gives the worker the worker URLs", () => expect(workerInstance.postMessage.calls.argsFor(0)[0].Tasks).toEqual([{
        WorkerUrl: "test worker url a"
    }, {
        WorkerUrl: "test worker url b"
    }, {
        WorkerUrl: "test worker url c"
    }]))
    it("creates one throttle", () => expect(Throttle.calls.count()).toEqual(1))
    it("creates a throttle for 500 milliseconds", () => expect(Throttle).toHaveBeenCalledWith(500))
    it("adds two event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
    it("adds an event listener for input", () => expect(textArea.addEventListener).toHaveBeenCalledWith("change", jasmine.any(Function)))
    it("adds an event listener for changes", () => expect(textArea.addEventListener).toHaveBeenCalledWith("input", jasmine.any(Function)))
    it("gives both event listeners the same callback", () => expect(textArea.addEventListener.calls.argsFor(0)[1]).toBe(textArea.addEventListener.calls.argsFor(1)[1]))
    it("starts one build", () => expect(StartBuild.calls.count()).toEqual(1))
    it("gives the build the editor element, source code text area wrapping element, throttle, worker and build id", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code a", "test text area wrapping element", "test throttle", workerInstance, 0))
    it("does not update a build", () => expect(UpdateBuild.calls.count()).toEqual(0))
    it("does not end a build", () => expect(EndBuild.calls.count()).toEqual(0))
    describe("when the worker posts a message", () => {
        beforeEach(() => {
            workerInstance.addEventListener.calls.argsFor(0)[1]({ data: "test response a" })
        })
        it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
        it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
        it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
        it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
        it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
        it("does not start a new build", () => expect(StartBuild.calls.count()).toEqual(1))
        it("updates the build once", () => expect(UpdateBuild.calls.count()).toEqual(1))
        it("updates the build with the response from the worker", () => expect(UpdateBuild).toHaveBeenCalledWith(configuration, "test build a", "test response a"))
        it("does not end a build", () => expect(EndBuild.calls.count()).toEqual(0))
        describe("when the worker posts a message", () => {
            beforeEach(() => {
                workerInstance.addEventListener.calls.argsFor(0)[1]({ data: "test response b" })
            })
            it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
            it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
            it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
            it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
            it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
            it("does not start a new build", () => expect(StartBuild.calls.count()).toEqual(1))
            it("updates the build again", () => expect(UpdateBuild.calls.count()).toEqual(2))
            it("updates the build with the response from the worker", () => expect(UpdateBuild).toHaveBeenCalledWith(configuration, "test build a", "test response b"))
            it("does not end a build", () => expect(EndBuild.calls.count()).toEqual(0))
        })
        describe("on executing a textarea callback", () => {
            beforeEach(() => {
                textArea.value = "test source code b"
                textArea.addEventListener.calls.argsFor(0)[1]()
            })
            it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
            it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
            it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
            it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
            it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
            it("starts a second build", () => expect(StartBuild.calls.count()).toEqual(2))
            it("gives the build the editor element, source code and text area wrapping element, throttle, worker and build id", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code b", "test text area wrapping element", "test throttle", workerInstance, 1))
            it("does not update another build", () => expect(UpdateBuild.calls.count()).toEqual(1))
            it("ends one build", () => expect(EndBuild.calls.count()).toEqual(1))
            it("ends the previously started build", () => expect(EndBuild).toHaveBeenCalledWith("test build a"))
            describe("when the worker posts a message", () => {
                beforeEach(() => {
                    workerInstance.addEventListener.calls.argsFor(0)[1]({ data: "test response b" })
                })
                it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
                it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
                it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
                it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
                it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
                it("does not start a new build", () => expect(StartBuild.calls.count()).toEqual(2))
                it("updates the build again", () => expect(UpdateBuild.calls.count()).toEqual(2))
                it("updates the build with the response from the worker", () => expect(UpdateBuild).toHaveBeenCalledWith(configuration, "test build b", "test response b"))
                it("does not end another build", () => expect(EndBuild.calls.count()).toEqual(1))
            })
            describe("on executing another textarea callback", () => {
                beforeEach(() => {
                    textArea.value = "test source code c"
                    textArea.addEventListener.calls.argsFor(0)[1]()
                })
                it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
                it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
                it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
                it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
                it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
                it("starts a third build", () => expect(StartBuild.calls.count()).toEqual(3))
                it("gives the build the editor element, source code and text area wrapping element, throttle, worker and build id", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code c", "test text area wrapping element", "test throttle", workerInstance, 2))
                it("does not update another build", () => expect(UpdateBuild.calls.count()).toEqual(1))
                it("ends another build", () => expect(EndBuild.calls.count()).toEqual(2))
                it("ends the previously started build", () => expect(EndBuild).toHaveBeenCalledWith("test build b"))
                describe("when the worker posts a message", () => {
                    beforeEach(() => {
                        workerInstance.addEventListener.calls.argsFor(0)[1]({ data: "test response b" })
                    })
                    it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
                    it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
                    it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
                    it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
                    it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
                    it("does not start a new build", () => expect(StartBuild.calls.count()).toEqual(3))
                    it("updates the build again", () => expect(UpdateBuild.calls.count()).toEqual(2))
                    it("updates the build with the response from the worker", () => expect(UpdateBuild).toHaveBeenCalledWith(configuration, "test build c", "test response b"))
                    it("does not end another build", () => expect(EndBuild.calls.count()).toEqual(2))
                })
                describe("on executing another textarea callback", () => {
                    beforeEach(() => {
                        textArea.value = "test source code d"
                        textArea.addEventListener.calls.argsFor(0)[1]()
                    })
                    it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
                    it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
                    it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
                    it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
                    it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
                    it("starts a fourth build", () => expect(StartBuild.calls.count()).toEqual(4))
                    it("gives the build the editor element, source code and text area wrapping element, throttle, worker and build id", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code d", "test text area wrapping element", "test throttle", workerInstance, 3))
                    it("does not update another build", () => expect(UpdateBuild.calls.count()).toEqual(1))
                    it("ends another build", () => expect(EndBuild.calls.count()).toEqual(3))
                    it("ends the previously started build", () => expect(EndBuild).toHaveBeenCalledWith("test build c"))
                })
            })
        })
    })
    describe("on executing a textarea callback", () => {
        beforeEach(() => {
            textArea.value = "test source code b"
            textArea.addEventListener.calls.argsFor(0)[1]()
        })
        it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
        it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
        it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
        it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
        it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
        it("starts a second build", () => expect(StartBuild.calls.count()).toEqual(2))
        it("gives the build the editor element, source code and text area wrapping element, throttle, worker and build id", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code b", "test text area wrapping element", "test throttle", workerInstance, 1))
        it("does not update a build", () => expect(UpdateBuild.calls.count()).toEqual(0))
        it("ends one build", () => expect(EndBuild.calls.count()).toEqual(1))
        it("ends the previously started build", () => expect(EndBuild).toHaveBeenCalledWith("test build a"))
        describe("when the worker posts a message", () => {
            beforeEach(() => {
                workerInstance.addEventListener.calls.argsFor(0)[1]({ data: "test response a" })
            })
            it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
            it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
            it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
            it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
            it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
            it("does not start a new build", () => expect(StartBuild.calls.count()).toEqual(2))
            it("updates the build once", () => expect(UpdateBuild.calls.count()).toEqual(1))
            it("updates the build with the response from the worker", () => expect(UpdateBuild).toHaveBeenCalledWith(configuration, "test build b", "test response a"))
            it("does not end another build", () => expect(EndBuild.calls.count()).toEqual(1))
            describe("when the worker posts a message", () => {
                beforeEach(() => {
                    workerInstance.addEventListener.calls.argsFor(0)[1]({ data: "test response b" })
                })
                it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
                it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
                it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
                it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
                it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
                it("does not start a new build", () => expect(StartBuild.calls.count()).toEqual(2))
                it("updates the build again", () => expect(UpdateBuild.calls.count()).toEqual(2))
                it("updates the build with the response from the worker", () => expect(UpdateBuild).toHaveBeenCalledWith(configuration, "test build b", "test response b"))
                it("does not end nother build", () => expect(EndBuild.calls.count()).toEqual(1))
            })
            describe("on executing a textarea callback", () => {
                beforeEach(() => {
                    textArea.value = "test source code c"
                    textArea.addEventListener.calls.argsFor(0)[1]()
                })
                it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
                it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
                it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
                it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
                it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
                it("starts a third build", () => expect(StartBuild.calls.count()).toEqual(3))
                it("gives the build the editor element, source code and text area wrapping element, throttle, worker and build id", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code c", "test text area wrapping element", "test throttle", workerInstance, 2))
                it("does not update another build", () => expect(UpdateBuild.calls.count()).toEqual(1))
                it("ends one build", () => expect(EndBuild.calls.count()).toEqual(2))
                it("ends the previously started build", () => expect(EndBuild).toHaveBeenCalledWith("test build b"))
                describe("when the worker posts a message", () => {
                    beforeEach(() => {
                        workerInstance.addEventListener.calls.argsFor(0)[1]({ data: "test response b" })
                    })
                    it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
                    it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
                    it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
                    it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
                    it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
                    it("does not start a new build", () => expect(StartBuild.calls.count()).toEqual(3))
                    it("updates the build again", () => expect(UpdateBuild.calls.count()).toEqual(2))
                    it("updates the build with the response from the worker", () => expect(UpdateBuild).toHaveBeenCalledWith(configuration, "test build c", "test response b"))
                    it("does not end another build", () => expect(EndBuild.calls.count()).toEqual(2))
                })
                describe("on executing another textarea callback", () => {
                    beforeEach(() => {
                        textArea.value = "test source code d"
                        textArea.addEventListener.calls.argsFor(0)[1]()
                    })
                    it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
                    it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
                    it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
                    it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
                    it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
                    it("starts a fourth build", () => expect(StartBuild.calls.count()).toEqual(4))
                    it("gives the build the editor element, source code and text area wrapping element, throttle, worker and build id", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code d", "test text area wrapping element", "test throttle", workerInstance, 3))
                    it("does not update another build", () => expect(UpdateBuild.calls.count()).toEqual(1))
                    it("ends another build", () => expect(EndBuild.calls.count()).toEqual(3))
                    it("ends the previously started build", () => expect(EndBuild).toHaveBeenCalledWith("test build c"))
                })
            })
        })
        describe("on executing another textarea callback", () => {
            beforeEach(() => {
                textArea.value = "test source code c"
                textArea.addEventListener.calls.argsFor(0)[1]()
            })
            it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
            it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
            it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
            it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
            it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
            it("starts a third build", () => expect(StartBuild.calls.count()).toEqual(3))
            it("gives the build the editor element, source code and text area wrapping element, throttle, worker and build id", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code c", "test text area wrapping element", "test throttle", workerInstance, 2))
            it("does not update a build", () => expect(UpdateBuild.calls.count()).toEqual(0))
            it("ends another build", () => expect(EndBuild.calls.count()).toEqual(2))
            it("ends the previously started build", () => expect(EndBuild).toHaveBeenCalledWith("test build b"))
            describe("on executing another textarea callback", () => {
                beforeEach(() => {
                    textArea.value = "test source code d"
                    textArea.addEventListener.calls.argsFor(0)[1]()
                })
                it("does not create further workers", () => expect(workerConstructor.calls.count()).toEqual(1))
                it("does not add further event listeners to the worker", () => expect(workerInstance.addEventListener.calls.count()).toEqual(1))
                it("does not post further messages to the worker", () => expect(workerInstance.postMessage.calls.count()).toEqual(1))
                it("does not create further throttles", () => expect(Throttle.calls.count()).toEqual(1))
                it("does not add further event listeners to the text area", () => expect(textArea.addEventListener.calls.count()).toEqual(2))
                it("starts a fourth build", () => expect(StartBuild.calls.count()).toEqual(4))
                it("gives the build the editor element, source code and text area wrapping element, throttle, worker and build id", () => expect(StartBuild).toHaveBeenCalledWith("test editor element", "test source code d", "test text area wrapping element", "test throttle", workerInstance, 3))
                it("does not update a build", () => expect(UpdateBuild.calls.count()).toEqual(0))
                it("ends another build", () => expect(EndBuild.calls.count()).toEqual(3))
                it("ends the previously started build", () => expect(EndBuild).toHaveBeenCalledWith("test build c"))
            })
        })
    })
})