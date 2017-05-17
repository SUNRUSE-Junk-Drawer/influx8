/// <reference path="WorkerMessages.ts" />
/// <reference path="../Compiler/ParenthesizeTokens.ts" />
/// <reference path="../Compiler/ParseExpression.ts" />
/// <reference path="../Compiler/InlineExpression.ts" />
/// <reference path="../Compiler/UnrollExpression.ts" />
/// <reference path="../Compiler/TypecheckExpression.ts" />
/// <reference path="../Compiler/VerifyExpression.ts" />

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
    const parenthesized = ParenthesizeTokens(request.Tokens)
    const expression = ParseExpression(parenthesized, 0, request.SourceLength)
    const inlined = InlineExpression(expression, {})
    const unrolled = UnrollExpression(inlined)
    const typechecked: TypecheckedExpression[] = []
    for (const dimension of unrolled) typechecked.push(TypecheckExpression(dimension))
    const verified: VerifiedExpression[] = []
    for (const dimension of typechecked) {
        const verifiedDimension = VerifyExpression(dimension)
        if (!verifiedDimension) break
        verified.push(verifiedDimension)
    }
    const taskRequest: TaskRequest = {
        BuildId: request.BuildId,
        Typechecked: typechecked,
        Verified: verified.length == typechecked.length ? verified : undefined
    }
    for (const workerUrl in TaskWorkers) TaskWorkers[workerUrl].postMessage(taskRequest)
}