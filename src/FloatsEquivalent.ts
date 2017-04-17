function FloatsEquivalent(a: number, b: number): boolean {
    if (a == Infinity && b == Infinity) return true
    return Math.abs(a - b) < 0.0001
}