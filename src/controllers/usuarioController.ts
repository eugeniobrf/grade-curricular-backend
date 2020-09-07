import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import crudBanco from '../database/crudBanco';
import jwt from 'jsonwebtoken';
import enviaEmail from '../utils/enviaEmail';

const saltRounds = process.env.SALTROUNDS;
let tempoTokenString=process.env.TEMPO_TOKEN;
let tempoToken:number;
if(tempoTokenString){
    tempoToken = parseInt(tempoTokenString);
}


export default class usuarioController{
    static async addUsuario(request: Request, response: Response){
        const {nome, matricula, email, curso, senha, grade} = request.body;
        if(!(nome && matricula && email && curso && senha && grade)){
            return response.status(400).json();
        }else{
            try{
                if(senha.lenght<7 || senha.lenght>100){
                    return response.status(400).json();
                }
                if(!(saltRounds)){
                    return response.status(500).json();
                }
                const senhaCriptografada = await bcrypt.hash(senha,parseInt(saltRounds));
                const {inserido,status} = await crudBanco.adicionar('usuario',{nome, matricula, email, curso, "senha":senhaCriptografada, grade},['nome','matricula','email','curso','grade']);
                return response.status(status).json(inserido);
            }catch(err){
                return response.status(500).json();
            }
        }
    }

    static async login(request: Request, response: Response){
        const {matricula,senha} = request.body;
        if(!(matricula && senha)){
            return response.status(400).json();
        }
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
                        if(!senhaToken || !tempoToken){
                            return response.status(500).json();
                        }
                        const token = jwt.sign({'matricula': selected.matricula},senhaToken,{'expiresIn': tempoToken});
                        response.setHeader('token',token);
                        return response.status(200).json(
                            {
                                "nome": selected.nome,
                                "matricula": selected.matricula,
                                "email": selected.email,
                                "curso": selected.curso,
                                "grade": selected.grade,
                            }
                        );
                    }
                }catch{
                    return response.status(500).json();
                }
            }
        }
    }

    static async editarUsuario(request: Request, response: Response){
        const matriculaAntiga = response.locals.matricula;
        const {nome, matricula, email, curso, grade} = request.body;
        if(!(nome || matricula || email || curso || grade)){
            return response.status(400).json();
        }
        let editar = <any>{};
        if(nome){
            editar.nome=nome;
        }
        if(matricula){
            editar.matricula=matricula;
        }
        if(email){
            editar.email=email;
        }
        if(curso){
            editar.curso=curso;
        }
        if(grade){
            editar.grade=grade;
        }
        const {editado,status} = await crudBanco.editar('usuario',{"matricula":matriculaAntiga}, editar, ['nome','matricula','email','curso','grade']);
        if(status===200){
            const senhaToken=process.env.SENHA_TOKEN;
            if(!senhaToken || !tempoToken){
                return response.status(500).json();
            }
            const token = jwt.sign({'matricula': editado.matricula,'curso': editado.curso, 'grade': editado.grade},senhaToken,{'expiresIn': tempoToken});
            response.setHeader('token',token);
            return response.status(status).json(editado);
        }
        return response.status(status).json();
    }

    static async editarSenhaUsuario(request:Request,response:Response){
        const matricula = response.locals.matricula;
        const {select,status} = await crudBanco.listar('usuario',['*'],'',{},{"matricula": matricula});
        const selected = select[0];
        if(status===500){
            return response.status(status).json(select);
        }else{
            if(!selected){
                return response.status(500).json(); 
            }else{
                let {senhaAntiga,senhaNova} = request.body;
                let match;
                try{
                    match = await bcrypt.compare(senhaAntiga.toString(),selected.senha.toString());
                }catch(err){
                    return response.status(500).json();
                }
                if(!match){
                    return response.status(400).json({erro: "Senha antiga incorreta!!!"});
                }else{
                    try{
                        if(!saltRounds){
                            return response.status(500).json();
                        }
                        senhaNova = await bcrypt.hash(senhaNova,parseInt(saltRounds));
                        const {editado,status} = await crudBanco.editar('usuario',{'matricula':matricula},{'senha':senhaNova}, ['nome','matricula','email','curso','grade']);
                        return response.status(status).json(editado);
                    }catch(err){
                        return response.status(500).json();
                    }
                }
            }
        }
    }

    static async excluirUsuario(request:Request,response:Response){
        const matricula = response.locals.matricula;
        const {select,status} = await crudBanco.listar('usuario',['*'],'',{},{"matricula": matricula});
        const selected = select[0];
        if(status===500){
            return response.status(status).json(select);
        }else{
            if(!selected){
                return response.status(500).json(); 
            }else{
                const {senha} = request.body;
                let match;
                try{
                    match = await bcrypt.compare(senha,selected.senha);
                }catch(err){
                    return response.status(500).json();
                }
                if(!match){
                    return response.status(400).json({erro: "Senha incorreta!!!"});
                }else{
                    const statusRemove = await crudBanco.delete('usuario',{'matricula':matricula});
                    return response.status(statusRemove).json();
                }
            }
        }
    }

    static async esqueciSenha(request:Request,response:Response){
        const {email} = request.body;
        if(!email){
            return response.status(400).json();
        }
        const {select,status} = await crudBanco.listar('usuario',['nome','matricula','email'],'',{},{email});
        const selected = select[0];
        if(status===500){
            return response.status(status).json();
        }else{
            if(!selected){
                return response.status(400).json({erro: "Email não existe"}); 
            }else{
                try{
                    const senhaToken=process.env.SENHA_TOKEN_ESQUECI;
                    if(!senhaToken){
                        return response.status(500).json();
                    }
                    const token = jwt.sign({'email': email},senhaToken,{'expiresIn': '1h'});
                    const s = await enviaEmail(selected.email,selected.nome,token);
                    return response.status(s).json();
                }catch{
                    return response.status(500).json();
                }
            }
        }
    }

    static async esqueciSenhaModificaSenha(request:Request,response:Response){
        const email = response.locals.email;
        const {matricula,novaSenha} = request.body;
        const {select,status} = await crudBanco.listar('usuario',['*'],'',{},{matricula,email});
        if(status==500){
            return response.status(500).json();
        }
        const selected = select[0];
        if(!selected){
            return response.status(400).json({"erro": "Matricula não bate com o email"});
        }
        try{
            if(!saltRounds){
                return response.status(500).json();
            }
            const senhaCriptografada = await bcrypt.hash(novaSenha,saltRounds);
            const {editado,status} = await crudBanco.editar('usuario',{matricula,email},{'senha':senhaCriptografada}, ['nome','matricula','email','curso','grade']);
            return response.status(status).json(editado);
        }catch(err){
            return response.status(500).json();
        }
    }
}