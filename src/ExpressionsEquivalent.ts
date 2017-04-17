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

        case "Float": {
            if (b.Type != "Float") return false
            if (a.Value != b.Value) return false // TODO: should we consider very close numbers the same due to rounding error?
            return true;
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
            if (
                (!ExpressionsEquivalent(a.Left, b.Left) || !ExpressionsEquivalent(a.Right, b.Right))
                && (!BinaryReversible[a.Operator] || !ExpressionsEquivalent(a.Left, b.Right) || !ExpressionsEquivalent(a.Right, b.Left))
            ) return false

            return true
        }

        case "Parameter": {
            if (b.Type != "Parameter") return false
            if (a.Name != b.Name) return false
            if (a.Item != b.Item) return false
            return true
        }
    }
}