import { eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { pessoaTable } from '../../pessoa/schema';
import { clienteFornecedorTable, clienteFornecedorInsertSchema } from '../schema';
import { createPessoa } from '../../pessoa/controllers';

export async function createClienteFornecedor(request: Request, response: Response){
    const data = request.body;

    const sqlQuery = db
        .insert(clienteFornecedorTable)
        .values({
            pessoaId: sql.placeholder("pessoaId"),
            isCliente: sql.placeholder("isCliente")
        })
        .prepare();

    try {
        const result = await db.transaction(async (transaction) => {
            const newPessoa = await createPessoa({
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                cadastro: data.cadastro,
                registro: data.registro,
            })

            if(newPessoa instanceof Error) transaction.rollback();


            const result = await sqlQuery.execute({
                pessoaId: newPessoa.insertId,
                isCliente: data.isCliente
            });

            if(!result) transaction.rollback();
            return result;
        });

        return response.status(201).json(result)
    } catch(error){
        return response.status(400).json(error);
    }
}
