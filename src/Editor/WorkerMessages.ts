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

// Note: adding new stages will require modifications to anywhere which computes the total (UpdateBuild, StartBuild).
type BuildStage = "Waiting" | "Starting" | "Parenthesizing" | "Parsing" | "Inlining" | "Unrolling" | "Typechecking" | "Verifying" | "RunningTasks" | "Done"

type ProgressWorkerResponse = {
    readonly Type: "Progress"
    readonly Stage: BuildStage
    readonly BuildId: number
}

type TaskCompletedWorkerResponse = {
    readonly Type: "TaskCompleted"
    readonly TaskIndex: number
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