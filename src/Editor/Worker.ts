/// <reference path="WorkerMessages.ts" />

addEventListener("message", e => {
    const request = e.data as WorkerConfigurationRequest | WorkerBuildRequest
    if (request.Type == "Configuration")
        HandleConfiguration(request)
    else
        HandleBuild(request)
})

const TaskWorkers: { [workerUrl: string]: Worker } = {}

function CreateTaskWorker(workerUrl: string): void {
    const worker = new Worker(workerUrl)
    worker.addEventListener("message", e => {
        const workerResponse = e.data as TaskResponse
        const response: TaskCompletedWorkerResponse = {
            Type: "TaskCompleted",
            WorkerUrl: workerUrl,
            BuildId: workerResponse.BuildId,
            Data: workerResponse.Data
        };
        // todo: Why does this not accept the typing information we specified in the tsconfig, and use the browser postMessage?
        (postMessage as any)(response)
    })
    TaskWorkers[workerUrl] = worker
}

function HandleConfiguration(request: WorkerConfigurationRequest) {
    for (const workerUrl of request.TaskWorkerUrls) CreateTaskWorker(workerUrl)
}

function HandleBuild(request: WorkerBuildRequest) {
    // TODO
}