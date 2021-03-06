import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

function verificaToken (request: Request, response: Response, next:Function){
    const token=<string>request.headers.token;
    if(!token){
        return response.status(401).json();
    }else{
        const senhaToken=process.env.SENHA_TOKEN;
        if(!senhaToken){
            return response.status(500).json();
        }
        try{
            let tokenValidado = <any>jwt.verify(token,senhaToken);
            response.locals.matricula = tokenValidado.matricula;
            if(!process.env.TEMPO_TOKEN){
                response.status(500).json();
            }else{
                const newToken = jwt.sign({'matricula': tokenValidado.matricula},senhaToken,{'expiresIn': parseInt(process.env.TEMPO_TOKEN)});
                response.setHeader('token',newToken);
                return next();
            }
        }catch(err){
            response.status(401).json();
        }
    }
}

export default verificaToken;