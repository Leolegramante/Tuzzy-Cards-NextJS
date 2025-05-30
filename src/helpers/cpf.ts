export function isValidCPF(cpf: string): boolean {
    // Remove máscara
    const cleanCPF = cpf.replace(/\D/g, '');

    if (!/^\d{11}$/.test(cleanCPF)) return false;

    // Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    const digits = cleanCPF.split('').map(Number);

    // Valida o primeiro dígito verificador
    const sum1 = digits
        .slice(0, 9)
        .reduce((acc, val, i) => acc + val * (10 - i), 0);
    const check1 = (sum1 * 10) % 11 % 10;
    if (check1 !== digits[9]) return false;

    // Valida o segundo dígito verificador
    const sum2 = digits
        .slice(0, 10)
        .reduce((acc, val, i) => acc + val * (11 - i), 0);
    const check2 = (sum2 * 10) % 11 % 10;
    return check2 === digits[10];
}
