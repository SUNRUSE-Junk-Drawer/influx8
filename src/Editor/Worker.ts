/// <reference path="WorkerMessages.ts" />

addEventListener("message", e => {
    const data = e.data as WorkerBuildRequest
    const response: WorkerResponse = {
        BuildId: data.BuildId
    }
    postMessage(response)
})