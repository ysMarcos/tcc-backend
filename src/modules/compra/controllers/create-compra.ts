import { eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { clienteFornecedorTable } from '../../cliente-fornecedor/schema';
import { colaboradorTable } from '../../colaborador/schema';
import { compraInsertSchema, compraTable } from '../schema';

export async function createCompra(request: Request, response: Response){
    const data = request.body;

    const cliforId = Number(data.clienteFornecedorId);
    const colaboradorId = Number(data.colaboradorId);

    const dataCompra = new Date(data.dataCompra)

    const cliforExistsSql = db
        .select({
            id: clienteFornecedorTable.id
        })
        .from(clienteFornecedorTable)
        .where(
            eq(
                clienteFornecedorTable.id, sql.placeholder("cliforId")
            )
        )
        .prepare();

    const colaboradorExistsSql = db
        .select({
            id: colaboradorTable.id
        })
        .from(colaboradorTable)
        .where(
            eq(
                colaboradorTable.id, sql.placeholder("colaboradorId")
            )
        )
        .prepare();

    const sqlQuery = db
        .insert(compraTable)
        .values({
            nf: sql.placeholder("nf"),
            dataCompra: sql.placeholder("dataCompra"),
            valorTotal: sql.placeholder("valorTotal"),
            colaboradorId: sql.placeholder("colaboradorId"),
            clienteFornecedorId: sql.placeholder("clienteFornecedorId")
        })
        .prepare();
    try {
        const isValid = compraInsertSchema.safeParse({
            nf: data.nf,
            dataCompra,
            valorTotal: data.valorTotal,
            colaboradorId,
            clienteFornecedorId: cliforId
        });
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const cliforExists = await cliforExistsSql.execute({ cliforId });
            if(!cliforExists){
                transaction.rollback();
            }
            const colaboradorExists = await colaboradorExistsSql.execute({ colaboradorId });
            if(!colaboradorExists){
                transaction.rollback();
            }
            const result = await sqlQuery.execute({
                nf: data.nf,
                dataCompra,
                valorTotal: data.valorTotal,
                colaboradorId: colaboradorId,
                clienteFornecedorId: cliforId
            })
            if(!result){
                transaction.rollback();
            }
            return result;
        })
        return response.status(201).json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}
