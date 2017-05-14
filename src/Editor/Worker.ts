/// <reference path="WorkerMessages.ts" />

addEventListener("message", e => {
    const request = e.data as WorkerConfigurationRequest | WorkerBuildRequest
    if (request.Type == "Configuration")
        HandleConfiguration(request)
    else
        HandleBuild(request)
})

const Workers: { [url: string]: Worker } = {}

function HandleConfiguration(request: WorkerConfigurationRequest) {
    for (const workerUrl of request.WorkerUrls) Workers[workerUrl] = new Worker(workerUrl)
}

function HandleBuild(request: WorkerBuildRequest) {
    // TODO
}