describe("StartBuild", () => {
    const Namespace = require("rewire")("../../Editor.js")
    const Throttle = Namespace.__get__("Throttle")
    let setTimeout
    let clearTimeout
    let result
    beforeEach(function () {
        setTimeout = jasmine.createSpy("setTimeout")
        Namespace.__set__("setTimeout", setTimeout)
        clearTimeout = jasmine.createSpy("clearTimeout")
        Namespace.__set__("clearTimeout", clearTimeout)
        result = Throttle(2358)
    })
    it("does not set a timeout", () => expect(setTimeout).not.toHaveBeenCalled())
    it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
    it("returns a function", () => expect(result).toEqual(jasmine.any(Function)))
    describe("on calling the result", () => {
        let callbackA
        beforeEach(() => {
            callbackA = jasmine.createSpy("callbackA")
            setTimeout.and.returnValue("test timeout a")
            result(callbackA)
        })
        it("sets one timeout", () => expect(setTimeout.calls.count()).toEqual(1))
        it("provides the correct timeout duration", () => expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2358))
        it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
        it("does not call the callback", () => expect(callbackA).not.toHaveBeenCalled())
        describe("on interrupting that timeout", () => {
            let callbackB
            beforeEach(() => {
                setTimeout.calls.reset()
                callbackB = jasmine.createSpy("callbackB")
                setTimeout.and.returnValue("test timeout b")
                result(callbackB)
            })
            it("sets one timeout", () => expect(setTimeout.calls.count()).toEqual(1))
            it("provides the correct timeout duration", () => expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2358))
            it("clears one timeout", () => expect(clearTimeout.calls.count()).toEqual(1))
            it("clears the previously set timeout", () => expect(clearTimeout).toHaveBeenCalledWith("test timeout a"))
            it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
            it("does not call the second callback", () => expect(callbackB).not.toHaveBeenCalled())
            describe("on interrupting that timeout", () => {
                let callbackC
                beforeEach(() => {
                    setTimeout.calls.reset()
                    clearTimeout.calls.reset()
                    callbackC = jasmine.createSpy("callbackC")
                    setTimeout.and.returnValue("test timeout b")
                    result(callbackC)
                })
                it("sets one timeout", () => expect(setTimeout.calls.count()).toEqual(1))
                it("provides the correct timeout duration", () => expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2358))
                it("clears one timeout", () => expect(clearTimeout.calls.count()).toEqual(1))
                it("clears the previously set timeout", () => expect(clearTimeout).toHaveBeenCalledWith("test timeout b"))
                it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                it("does not call the second callback", () => expect(callbackB).not.toHaveBeenCalled())
                it("does not call the third callback", () => expect(callbackC).not.toHaveBeenCalled())
                describe("on interrupting that timeout", () => {
                    let callbackD
                    beforeEach(() => {
                        setTimeout.calls.reset()
                        clearTimeout.calls.reset()
                        callbackD = jasmine.createSpy("callbackD")
                        setTimeout.and.returnValue("test timeout b")
                        result(callbackD)
                    })
                    it("sets one timeout", () => expect(setTimeout.calls.count()).toEqual(1))
                    it("provides the correct timeout duration", () => expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2358))
                    it("clears one timeout", () => expect(clearTimeout.calls.count()).toEqual(1))
                    it("clears the previously set timeout", () => expect(clearTimeout).toHaveBeenCalledWith("test timeout b"))
                    it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                    it("does not call the second callback", () => expect(callbackB).not.toHaveBeenCalled())
                    it("does not call the third callback", () => expect(callbackC).not.toHaveBeenCalled())
                    it("does not call the fourth callback", () => expect(callbackD).not.toHaveBeenCalled())
                })
                describe("on elapsing that timeout", () => {
                    beforeEach(() => {
                        let callback = setTimeout.calls.argsFor(0)[0]
                        setTimeout.calls.reset()
                        clearTimeout.calls.reset()
                        callback()
                    })
                    it("does not set a timeout", () => expect(setTimeout).not.toHaveBeenCalled())
                    it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
                    it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                    it("does not call the second callback", () => expect(callbackB).not.toHaveBeenCalled())
                    it("calls the third callback once", () => expect(callbackC.calls.count()).toEqual(1))
                })
            })
            describe("on elapsing that timeout", () => {
                beforeEach(() => {
                    let callback = setTimeout.calls.argsFor(0)[0]
                    setTimeout.calls.reset()
                    clearTimeout.calls.reset()
                    callback()
                })
                it("does not set a timeout", () => expect(setTimeout).not.toHaveBeenCalled())
                it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
                it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                it("calls the second callback once", () => expect(callbackB.calls.count()).toEqual(1))
                describe("on starting a new timeout", () => {
                    let callbackC
                    beforeEach(() => {
                        setTimeout.calls.reset()
                        callbackB.calls.reset()
                        callbackC = jasmine.createSpy("callbackC")
                        setTimeout.and.returnValue("test timeout b")
                        result(callbackC)
                    })
                    it("sets one timeout", () => expect(setTimeout.calls.count()).toEqual(1))
                    it("provides the correct timeout duration", () => expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2358))
                    it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
                    it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                    it("does not call the second callback again", () => expect(callbackB).not.toHaveBeenCalled())
                    it("does not call the third callback", () => expect(callbackC).not.toHaveBeenCalled())
                    describe("on interrupting that timeout", () => {
                        let callbackD
                        beforeEach(() => {
                            setTimeout.calls.reset()
                            clearTimeout.calls.reset()
                            callbackD = jasmine.createSpy("callbackD")
                            setTimeout.and.returnValue("test timeout b")
                            result(callbackD)
                        })
                        it("sets one timeout", () => expect(setTimeout.calls.count()).toEqual(1))
                        it("provides the correct timeout duration", () => expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2358))
                        it("clears one timeout", () => expect(clearTimeout.calls.count()).toEqual(1))
                        it("clears the previously set timeout", () => expect(clearTimeout).toHaveBeenCalledWith("test timeout b"))
                        it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                        it("does not call the second callback again", () => expect(callbackB).not.toHaveBeenCalled())
                        it("does not call the third callback", () => expect(callbackC).not.toHaveBeenCalled())
                        it("does not call the fourth callback", () => expect(callbackD).not.toHaveBeenCalled())
                    })
                    describe("on elapsing that timeout", () => {
                        beforeEach(() => {
                            let callback = setTimeout.calls.argsFor(0)[0]
                            setTimeout.calls.reset()
                            clearTimeout.calls.reset()
                            callback()
                        })
                        it("does not set a timeout", () => expect(setTimeout).not.toHaveBeenCalled())
                        it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
                        it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                        it("does not call the second callback again", () => expect(callbackB).not.toHaveBeenCalled())
                        it("calls the third callback once", () => expect(callbackC.calls.count()).toEqual(1))
                    })
                })
            })
        })
        describe("on elapsing that timeout", () => {
            beforeEach(() => {
                let callback = setTimeout.calls.argsFor(0)[0]
                setTimeout.calls.reset()
                callback()
            })
            it("does not set a timeout", () => expect(setTimeout).not.toHaveBeenCalled())
            it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
            it("calls the callback once", () => expect(callbackA.calls.count()).toEqual(1))
            describe("starting a new timeout", () => {
                let callbackB
                beforeEach(() => {
                    setTimeout.calls.reset()
                    callbackA.calls.reset()
                    callbackB = jasmine.createSpy("callbackB")
                    setTimeout.and.returnValue("test timeout b")
                    result(callbackB)
                })
                it("sets one timeout", () => expect(setTimeout.calls.count()).toEqual(1))
                it("provides the correct timeout duration", () => expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2358))
                it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
                it("does not call the first callback again", () => expect(callbackA).not.toHaveBeenCalled())
                it("does not call the second callback", () => expect(callbackB).not.toHaveBeenCalled())
                describe("on interrupting that timeout", () => {
                    let callbackC
                    beforeEach(() => {
                        setTimeout.calls.reset()
                        clearTimeout.calls.reset()
                        callbackC = jasmine.createSpy("callbackC")
                        setTimeout.and.returnValue("test timeout b")
                        result(callbackC)
                    })
                    it("sets one timeout", () => expect(setTimeout.calls.count()).toEqual(1))
                    it("provides the correct timeout duration", () => expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2358))
                    it("clears one timeout", () => expect(clearTimeout.calls.count()).toEqual(1))
                    it("clears the previously set timeout", () => expect(clearTimeout).toHaveBeenCalledWith("test timeout b"))
                    it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                    it("does not call the second callback", () => expect(callbackB).not.toHaveBeenCalled())
                    it("does not call the third callback", () => expect(callbackC).not.toHaveBeenCalled())
                    describe("on interrupting that timeout", () => {
                        let callbackD
                        beforeEach(() => {
                            setTimeout.calls.reset()
                            clearTimeout.calls.reset()
                            callbackD = jasmine.createSpy("callbackD")
                            setTimeout.and.returnValue("test timeout b")
                            result(callbackD)
                        })
                        it("sets one timeout", () => expect(setTimeout.calls.count()).toEqual(1))
                        it("provides the correct timeout duration", () => expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2358))
                        it("clears one timeout", () => expect(clearTimeout.calls.count()).toEqual(1))
                        it("clears the previously set timeout", () => expect(clearTimeout).toHaveBeenCalledWith("test timeout b"))
                        it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                        it("does not call the second callback", () => expect(callbackB).not.toHaveBeenCalled())
                        it("does not call the third callback", () => expect(callbackC).not.toHaveBeenCalled())
                        it("does not call the fourth callback", () => expect(callbackD).not.toHaveBeenCalled())
                    })
                    describe("on elapsing that timeout", () => {
                        beforeEach(() => {
                            let callback = setTimeout.calls.argsFor(0)[0]
                            setTimeout.calls.reset()
                            clearTimeout.calls.reset()
                            callback()
                        })
                        it("does not set a timeout", () => expect(setTimeout).not.toHaveBeenCalled())
                        it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
                        it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                        it("does not call the second callback", () => expect(callbackB).not.toHaveBeenCalled())
                        it("calls the third callback once", () => expect(callbackC.calls.count()).toEqual(1))
                    })
                })
                describe("on elapsing that timeout", () => {
                    beforeEach(() => {
                        let callback = setTimeout.calls.argsFor(0)[0]
                        setTimeout.calls.reset()
                        clearTimeout.calls.reset()
                        callback()
                    })
                    it("does not set a timeout", () => expect(setTimeout).not.toHaveBeenCalled())
                    it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
                    it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                    it("calls the second callback once", () => expect(callbackB.calls.count()).toEqual(1))
                    describe("on starting a new timeout", () => {
                        let callbackC
                        beforeEach(() => {
                            setTimeout.calls.reset()
                            callbackB.calls.reset()
                            callbackC = jasmine.createSpy("callbackC")
                            setTimeout.and.returnValue("test timeout b")
                            result(callbackC)
                        })
                        it("sets one timeout", () => expect(setTimeout.calls.count()).toEqual(1))
                        it("provides the correct timeout duration", () => expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2358))
                        it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
                        it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                        it("does not call the second callback again", () => expect(callbackB).not.toHaveBeenCalled())
                        it("does not call the third callback", () => expect(callbackC).not.toHaveBeenCalled())
                        describe("on interrupting that timeout", () => {
                            let callbackD
                            beforeEach(() => {
                                setTimeout.calls.reset()
                                clearTimeout.calls.reset()
                                callbackD = jasmine.createSpy("callbackD")
                                setTimeout.and.returnValue("test timeout b")
                                result(callbackD)
                            })
                            it("sets one timeout", () => expect(setTimeout.calls.count()).toEqual(1))
                            it("provides the correct timeout duration", () => expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 2358))
                            it("clears one timeout", () => expect(clearTimeout.calls.count()).toEqual(1))
                            it("clears the previously set timeout", () => expect(clearTimeout).toHaveBeenCalledWith("test timeout b"))
                            it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                            it("does not call the second callback again", () => expect(callbackB).not.toHaveBeenCalled())
                            it("does not call the third callback", () => expect(callbackC).not.toHaveBeenCalled())
                            it("does not call the fourth callback", () => expect(callbackD).not.toHaveBeenCalled())
                        })
                        describe("on elapsing that timeout", () => {
                            beforeEach(() => {
                                let callback = setTimeout.calls.argsFor(0)[0]
                                setTimeout.calls.reset()
                                clearTimeout.calls.reset()
                                callback()
                            })
                            it("does not set a timeout", () => expect(setTimeout).not.toHaveBeenCalled())
                            it("does not clear a timeout", () => expect(clearTimeout).not.toHaveBeenCalled())
                            it("does not call the first callback", () => expect(callbackA).not.toHaveBeenCalled())
                            it("does not call the second callback again", () => expect(callbackB).not.toHaveBeenCalled())
                            it("calls the third callback once", () => expect(callbackC.calls.count()).toEqual(1))
                        })
                    })
                })
            })
        })
    })
})