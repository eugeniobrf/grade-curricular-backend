import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import crudBanco from '../database/crudBanco';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const tempoToken = '10h';

export default class usuarioController{
    static async addUsuario(request: Request, response: Response){
        let {nome, matricula, email, curso, senha, grade} = request.body;
        senha = await bcrypt.hash(senha,saltRounds);
        const {inserido,status} = await crudBanco.adicionar('usuario',{nome, matricula, email, curso, senha, grade},['nome','matricula','email','curso','grade']);
        return response.status(status).json(inserido);
    }

    static async login(request: Request, response: Response){
        const {matricula,senha} = request.body;
        const {select,status} = await crudBanco.listar('usuario',['*'],'',{},{"matricula": matricula});
        const selected = select[0];
        if(status===500){
            return response.status(status).json(select);
        }else{
            if(!selected){
                return response.status(400).json({erro: "Matricula não existe"}); 
            }else{
                try{
                    const match = await bcrypt.compare(senha,selected.senha);
                    if(!match){
                        return response.status(400).json({erro: "Senha incorreta!!!"});
                    }else{
                        const senhaToken=process.env.SENHA_TOKEN;
                        if(!senhaToken){
                            return response.status(500).json();
                        }
                        const token = jwt.sign({'matricula':selected.matricula,'curso': selected.curso,'grade': selected.grade},senhaToken,{'expiresIn': tempoToken});
                        return response.status(200).json(
                            {
                                "nome": selected.nome,
                                "matricula": selected.matricula,
                                "email": selected.email,
                                "curso": selected.curso,
                                "grade": selected.grade,
                                "token": token
                            }
                        );
                    }
                }catch{
                    return response.status(500).json();
                }
            }
        }
        
        
        // if(!result){
        //     return response.status(400).json({erro: "Matricula não existe"});
        // }else{
        //     try{
        //         const match = await bcrypt.compare(senha,result.senha);
        //         if( match ){
        //             const token = jwt.sign({'matricula':result.matricula,'curso': result.curso,'grade': result.grade},segredo, {expiresIn: '24h'});
        //             return response.status(200).json(
        //                 {
        //                     "nome": result.nome,
        //                     "matricula": result.matricula,
        //                     "email": result.email,
        //                     "curso": result.curso,
        //                     "grade": result.grade,
        //                     "token": token
        //                 }
        //             );
        //         }else{
        //             return response.status(400).json({erro: "Senha incorreta!!!"});
        //         }
        //     }catch(err){
        //         console.log(err);
        //         return response.status(500).json();
        //     }
        // }
    }
}