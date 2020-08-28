import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

function verificaTokenEsqueciSenha (request: Request, response: Response, next:Function){
    const token=<string>request.headers.token;
    if(!token){
        return response.status(401).json();
    }else{
        const senhaToken=process.env.SENHA_TOKEN_ESQUECI;
        if(!senhaToken){
            return response.status(500).json();
        }
        try{
            let tokenValidado = <any>jwt.verify(token,senhaToken);
            response.locals.email = tokenValidado.email;
            return next();
        }catch(err){
            response.status(401).json();
        }
    }
}

export default verificaTokenEsqueciSenha;