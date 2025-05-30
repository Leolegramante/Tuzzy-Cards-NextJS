export function toCents(value: string): number {
    const numeric = value.replace(/\D/g, '');
    return parseInt(numeric, 10);
}