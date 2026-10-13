// Bỏ dấu, bỏ khoảng trắng, viết hoa: "Chủ nghĩa" -> "CHUNGHIA"
export const normalize = (str = '') =>
    str
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/đ/gi, 'd')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toUpperCase();
