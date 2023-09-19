import { and, between, eq, gt, isNotNull, like, or, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { itemTable } from "../schema";

export async function listItemTest(request: Request, response: Response) {
    const { query } = request;
    const { nome, limit, page, valorMin, valorMax } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
    .select()
    .from(itemTable)
    .where(
        and(
            like(itemTable.nome, sql.placeholder("nome")),
            between(itemTable.valorUnitario, sql.placeholder("valorMin"), sql.placeholder("valorMax"))
        )
    )
    .orderBy(
        itemTable.nome,
        itemTable.valorUnitario
    )
    .limit(limitReference)
    .offset(offset)
    .prepare();

    try {
        const itens = await sqlQuery.execute({
            nome: `%${nome}%`,
            valorMin: Number(valorMin),
            valorMax: Number(valorMax)
        });
        response.status(200).json(itens);
    } catch(error){
        return response.status(500).json(error);
    }
}

/**
 * use tcc;
select * from `unidade-medida`;
insert into `unidade-medida` values (null, "kg", sysdate());

insert into item
values
(null, "aaa", 525, 1, sysdate()),
(null, "baa", 5236, 1, sysdate()),
(null, "caa", 234, 1, sysdate()),
(null, "daa", 523, 1, sysdate()),
(null, "eaa", 124, 1, sysdate()),
(null, "faa", 2, 1, sysdate()),
(null, "gaa", 6265, 1, sysdate()),
(null, "haa", 2369, 1, sysdate()),
(null, "iaa", 838, 1, sysdate()),
(null, "jaa", 569, 1, sysdate()),
(null, "kaa", 1, 1, sysdate()),
(null, "laa", 74, 1, sysdate()),
(null, "maa", 20, 1, sysdate()),
(null, "naa", 378, 1, sysdate()),
(null, "oaa", 200, 1, sysdate()),
(null, "paa", 1258, 1, sysdate()),
(null, "qaa", 5.5, 1, sysdate()),
(null, "raa", 1245, 1, sysdate()),
(null, "saa", 24, 1, sysdate()),
(null, "taa", 982, 1, sysdate()),
(null, "uaa", 90, 1, sysdate()),
(null, "vaa", 100, 1, sysdate()),
(null, "waa", 10000, 1, sysdate()),
(null, "xaa", 52, 1, sysdate()),
(null, "yaa", 29, 1, sysdate()),
(null, "zaa", 5, 1, sysdate())


 */
