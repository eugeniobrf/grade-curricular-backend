import nodemailer from 'nodemailer';

export default async function enviaEmail(destinatario:string, nomeUser:string, token:string){ 
    try{
        var smtpConfig = {
            service: 'Hotmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SENHAEMAIL
            }
        }
        const transporter = nodemailer.createTransport(smtpConfig);
        let info = await transporter.sendMail(
            {
                from: process.env.EMAIL,
                to: destinatario,
                subject: "Recupere sua senha - Grade Curricular Interativa",
                text: `
                    Olá ${nomeUser},
                    Para recuperar sua senha, por favor clique no link abaixo e informe sua matricula e sua nova senha: https://link.com/${token}.
                    Por motivos de segurança, o link acima só será válido durante os próximos 30 minutos.
                    Se você não deseja redefinir sua senha ou não solicitou estas informações, pode ignorar este e-mail com segurança.
                `,
                html: `
                    <h1>Olá ${nomeUser},</h1><br>
                    <h2>Para recuperar sua senha, por favor clique no link a seguir e informe sua matricula e sua nova senha: <b><a href=https://link.com/${token}>https://link.com/${token}</a></b>.</h2><br>
                    <h3>Por motivos de segurança, o link acima só será válido durante os próximos 60 minutos.<br>
                    Se você não deseja redefinir sua senha ou não solicitou estas informações, pode ignorar este e-mail.</h3>
                `
            }
        );
        return 200;
    }catch(err){
        console.log(err);
        return 500;
    }
}