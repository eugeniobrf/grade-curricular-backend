import db from "../database/conexao";

export default class crudBanco{
    static async adicionar(tabela:string, insert={}, retorno=['*']){
        try{
            const [inserido] = await db(tabela).insert(insert).returning(retorno);
            if(inserido){
                return {'inserido':inserido, 'status':201};
            }else{
                return {'status': 400}
            }
        }catch(err){
            console.log(err);
            if(err.code==='23505' || err.code==='23503'){
                return {'status':400};
            }else{
                return {'status':500};
            }
        }
    }
    
    static async listar(tabela:string, colunas:string[], joinTable='',join={}, where={}, orderBy=['']){
        try{
            let query = db(tabela).select(colunas);
            if(joinTable!==''){
                query = query.join(joinTable,join);
            }
            if(where!=={}){
                query = query.where(where);
            }
            if(orderBy[0]!==''){
                query = query.orderBy(orderBy);
            }
            const select = await query;
            return {'select': select, 'status': 200};
        }catch(err){
            return {'select':[],'status': 500};
        }
    }

    static async delete(tabela: string, chave={}){
        try{
            const qtd = await db(tabela).where(chave).del();
            if(qtd){
                return 200;
            }else{
                return 400;
            }
        }catch(err){
            return 500;
        }
    }

    static async editar(tabela: string, chave={},update={}, select = ["*"]){
        try{
            const editado = await db(tabela).update(update).where(chave).returning(select);
            return {"editado":editado,status:200};
        }catch(err){
            if(err.code==='SQLITE_CONSTRAINT' || err.code==='23505' || err.code==='23503'){
                return {'status':400};
            }else{
                return {'status':500};
            }
        }
    }
}