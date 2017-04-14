/// <reference path="VerifiedExpression.ts" />

function ExpressionsEquivalent(a: VerifiedExpression, b: VerifiedExpression): boolean {
    switch (a.Type) {
        case "Boolean": {
            if (b.Type != "Boolean") return false
            if (a.Value != b.Value) return false
            return true
        }

        case "Integer": {
            if (b.Type != "Integer") return false
            if (a.Value != b.Value) return false
            return true
        }

        case "Unary": {
            if (b.Type != "Unary") return false
            if (a.Operator != b.Operator) return false
            if (!ExpressionsEquivalent(a.Operand, b.Operand)) return false
            return true
        }

        case "Binary": {
            if (b.Type != "Binary") return false
            if (a.Operator != b.Operator) return false
            if (!ExpressionsEquivalent(a.Left, b.Left)) return false
            if (!ExpressionsEquivalent(a.Right, b.Right)) return false
            return true
        }
    }
}