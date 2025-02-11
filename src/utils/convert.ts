export default function convert(amount: number | bigint) {
    if (typeof amount !== "number") {
        return amount
    }
    if (amount >= 1000000000) {
        const t = (amount / 1000000000).toFixed(0)
        return t + "B"
    }
    if (amount >= 1000000) {
        const t = (amount / 1000000).toFixed(0)
        return t + "M"
    }
    return new Intl.NumberFormat().format(amount)
}