import bcrypt from "bcrypt"

export async function hashSenha(senha: string) {
    const salt = 12;
    return bcrypt.hash(senha, salt);
}
