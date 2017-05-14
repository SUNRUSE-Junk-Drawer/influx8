/// <reference path="WorkerMessages.ts" />

addEventListener("message", e => {
    const request = e.data as WorkerConfigurationRequest | WorkerBuildRequest
    if (request.Type == "Configuration")
        HandleConfiguration(request)
    else
        HandleBuild(request)
})

function HandleConfiguration(request: WorkerConfigurationRequest) {
    // TODO
}

function HandleBuild(request: WorkerBuildRequest) {
    // TODO
}