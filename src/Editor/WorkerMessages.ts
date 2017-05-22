/// <reference path="../Compiler/Token.ts" />
/// <reference path="../Compiler/TypecheckedExpression.ts" />
/// <reference path="../Compiler/VerifiedExpression.ts" />

type WorkerConfigurationRequestTask = {
    readonly WorkerUrl: string
}

type WorkerConfigurationRequest = {
    readonly Type: "Configuration"
    readonly Tasks: WorkerConfigurationRequestTask[]
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

type TaskRequest = {
    readonly BuildId: number
    readonly Typechecked: TypecheckedExpression[]
    readonly Verified: VerifiedExpression[] | undefined
}

type TaskResponse = {
    readonly BuildId: number
    readonly Data: any
}