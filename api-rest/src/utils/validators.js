/**
 * Conjunto de validadores utilitários para regras de cadastro.
 */

/** Valida CPF com 11 dígitos numéricos (pode iniciar com 0) */
function isValidCPF(cpf) {
    return /^\d{11}$/.test(String(cpf));
}

/** Valida nome entre 3 e 100 caracteres */
function isValidName(name) {
    const len = String(name || '').trim().length;
    return len >= 3 && len <= 100;
}

/** Valida data no formato dd/mm/aaaa (sem validar calendário bissexto em profundidade) */
function isValidDatePtBr(dateStr) {
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(dateStr || ''));
    if (!match) return false;
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    // Ajuste simples para meses com 30 dias e fevereiro
    const monthsWith30 = [4, 6, 9, 11];
    if (monthsWith30.includes(month) && day > 30) return false;
    if (month === 2) {
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        const maxDay = isLeap ? 29 : 28;
        if (day > maxDay) return false;
    }
    return true;
}

/** Calcula idade em anos completos a partir de data dd/mm/aaaa */
function calculateAge(dateStr) {
    const [d, m, y] = String(dateStr).split('/').map((v) => Number(v));
    const birth = new Date(y, m - 1, d);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const beforeBirthday =
        today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
    if (beforeBirthday) age -= 1;
    return age;
}

/** Verifica se data dd/mm/aaaa representa idade >= 18 anos */
function isAdult(dateStr) {
    if (!isValidDatePtBr(dateStr)) return false;
    return calculateAge(dateStr) >= 18;
}

/** Valida senha alfanumérica entre 5 e 12 caracteres */
function isValidPassword(password) {
    return /^[A-Za-z0-9]{5,12}$/.test(String(password || ''));
}

/** Valida e-mail em formato simples */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''));
}

/** Valida campos textuais opcionais por tamanho mínimo e máximo */
function isValidOptionalText(text, min, max) {
    const value = String(text || '').trim();
    if (value.length === 0) return false;
    return value.length >= min && value.length <= max;
}

/** Valida UF com exatamente 2 letras */
function isValidState(uf) {
    return /^[A-Za-z]{2}$/.test(String(uf || ''));
}

/** Valida telefone com 11 dígitos numéricos */
function isValidPhone(phone) {
    return /^\d{11}$/.test(String(phone || ''));
}

module.exports = {
    isValidCPF,
    isValidName,
    isValidDatePtBr,
    calculateAge,
    isAdult,
    isValidPassword,
    isValidEmail,
    isValidOptionalText,
    isValidState,
    isValidPhone,
};


