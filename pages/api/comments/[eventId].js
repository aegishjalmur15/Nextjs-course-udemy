import fs from 'fs/promises';
import path from 'path';
async function handler(req,res){
    if(req.method === 'POST'){
        const {email, name,text } = req.body;
        const eventId = req.query.eventId;
        const commentsPath = path.join(process.cwd.toString(),"..","data","comments.json")

        const file = await fs.readFile(commentsPath);
        
        const comments = JSON.parse(file);

        comments.push({eventId, email, name, text});

        await fs.writeFile(commentsPath,JSON.stringify(comments));

        return res.status(200);
    
    }
}

export default handler;