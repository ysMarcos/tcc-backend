import bcrypt from "bcrypt"

export async function hashSenha(senha: string) {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(senha, salt);
}
