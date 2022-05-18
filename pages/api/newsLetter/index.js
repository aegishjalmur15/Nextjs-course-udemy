import fs from 'fs/promises';
import path from 'path';

async function handler(req,res){
    if(req.method === 'POST'){
        const email = req.body.email;
        const emailsPath = path.join(__dirname, "..","..","..","..","data","emails.json")

        const file = await fs.readFile(emailsPath);

        const emails = JSON.parse(file);
        let emailAlreadyRegistered= false
        for(let i =0; i< emails.length; i++){
            if(emails[i].email === email){
                emailAlreadyRegistered = true;
                break;
            }
        }

        if(emailAlreadyRegistered){
            return res.status(409).json({email:'email already exists'});
        }

        emails.push({email:email});

        await fs.writeFile(emailsPath,JSON.stringify(emails));
        

        return   res.status(200).json({response:'ok'});
    }
}

export default handler;