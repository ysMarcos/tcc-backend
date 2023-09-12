import { eq } from "drizzle-orm";
import { db } from "../db/index.js";

export async function dataExists(data: any, schema: any, field: any): Promise<Boolean> {
    const dataExists = await db
        .select({id: schema.id})
        .from(schema)
        .where(eq(schema[field], data[field]))
        .limit(1);

    if(dataExists[0]) return true;
    return false;
}
