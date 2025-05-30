export function formatCentsToBRL(cents: number): string {
    const valueInReais = cents / 100;
    return valueInReais.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}