/// <reference path="../Compiler/Token.ts" />

type WorkerConfigurationRequest = {
    readonly Type: "Configuration"
    readonly TaskWorkerUrls: string[]
}

type WorkerBuildRequest = {
    readonly Type: "Build"
    readonly Tokens: UnparenthesizedToken[]
    readonly BuildId: number
    readonly SourceLength: number
}

type TaskCompletedWorkerResponse = {
    readonly Type: "TaskCompleted"
    readonly WorkerUrl: string
    readonly BuildId: number
    readonly Data: any
}

type TaskResponse = {
    readonly BuildId: number
    readonly Data: any
}