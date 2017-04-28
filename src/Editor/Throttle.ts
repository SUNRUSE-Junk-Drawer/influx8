function Throttle(milliseconds: number) {
    let timeout: number | undefined = undefined
    return (callback: Function) => {
        if (timeout !== undefined) clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeout = undefined
            callback()
        }, milliseconds) as any // TODO: Sometimes it compiles with a NodeJS timer class, is there a better workaround for this?
    }
}