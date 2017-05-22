/// <reference path="SyntaxHighlighting.ts" />
/// <reference path="Build.ts" />
/// <reference path="Throttle.ts" />

function CreateTextAreaWrappingElement(textarea: HTMLElement) {
    const wrapper = document.createElement("div")
    wrapper.style.position = "absolute"
    wrapper.style.left = "0"
    wrapper.style.top = "0"
    wrapper.style.right = "0"
    wrapper.style.bottom = "0"
    wrapper.style.padding = "inherit"
    wrapper.appendChild(textarea)
    return wrapper
}

function CreateTextArea(source: string): HTMLTextAreaElement {
    const textarea = document.createElement("textarea")
    textarea.style.color = "inherit"
    textarea.style.webkitTextFillColor = "transparent"
    textarea.style.width = "100%"
    textarea.style.height = "100%"
    textarea.style.whiteSpace = "pre-wrap"
    textarea.style.fontFamily = "inherit"
    textarea.style.fontSize = "inherit"
    textarea.style.fontStretch = "inherit"
    textarea.style.fontStyle = "inherit"
    textarea.style.fontWeight = "inherit"
    textarea.style.fontVariant = "inherit"
    textarea.style.fontSizeAdjust = "inherit"
    textarea.style.fontFeatureSettings = "inherit"
    textarea.style.textAlign = "inherit"
    textarea.style.textAlignLast = "inherit"
    textarea.style.textAnchor = "inherit"
    textarea.style.textDecoration = "inherit"
    textarea.style.textIndent = "inherit"
    textarea.style.textJustify = "inherit"
    textarea.style.textKashida = "inherit"
    textarea.style.textKashidaSpace = "inherit"
    textarea.style.textOverflow = "inherit"
    textarea.style.textShadow = "inherit"
    textarea.style.textTransform = "inherit"
    textarea.style.textUnderlinePosition = "inherit"
    textarea.style.lineHeight = "inherit"
    textarea.style.lineBreak = "inherit"
    textarea.style.margin = "0"
    textarea.style.padding = "0"
    textarea.style.background = "none"
    textarea.style.border = "none"
    textarea.style.outline = "none"
    textarea.style.overflow = "hidden"
    textarea.style.resize = "none"
    textarea.spellcheck = false
    textarea.value = source
    return textarea
}

type Configuration = {
    readonly Tasks: {
        WorkerUrl: string
    }[]
}

function SetupChangeListener(editorElement: Element, textArea: HTMLTextAreaElement, textAreaWrappingElement: Element, configuration: Configuration) {
    const throttle = Throttle(500)
    const worker = new Worker("Editor.Worker.min.js")
    let buildId = 0
    let build = StartBuild(editorElement, textArea.value, textAreaWrappingElement, throttle, worker, buildId++)

    // todo on error?
    worker.addEventListener("message", e => UpdateBuild(build, e.data))

    const tasks: WorkerConfigurationRequestTask[] = []
    for (const task of configuration.Tasks) tasks.push({
        WorkerUrl: task.WorkerUrl
    })

    const request: WorkerConfigurationRequest = {
        Type: "Configuration",
        Tasks: tasks
    }
    worker.postMessage(request)

    textArea.addEventListener("input", RespondToChange)
    textArea.addEventListener("change", RespondToChange)
    function RespondToChange() {
        EndBuild(build)
        build = StartBuild(editorElement, textArea.value, textAreaWrappingElement, throttle, worker, buildId++)
    }
}

(window as any).SUNRUSEInfluxEditor = function SUNRUSEInfluxEditor(editorElement: Element, configuration: Configuration) {
    const source = editorElement.textContent || ""
    editorElement.textContent = ""
    const textArea = CreateTextArea(source)
    const textAreaWrappingElement = CreateTextAreaWrappingElement(textArea)
    editorElement.appendChild(textAreaWrappingElement)
    SetupChangeListener(editorElement, textArea, textAreaWrappingElement, configuration)
}