export function isValidPhone(phone: string): boolean {
    const digits = phone.replace(/\D/g, '');

    // Deve conter 10 ou 11 dígitos
    if (!(digits.length === 10 || digits.length === 11)) return false;

    const ddd = digits.slice(0, 2);
    const number = digits.slice(2);

    // DDDs válidos geralmente são entre 11 e 99
    if (Number(ddd) < 11 || Number(ddd) > 99) return false;

    // Se for celular, o terceiro dígito (início do número) deve ser 9
    return !(digits.length === 11 && number[0] !== '9');
}