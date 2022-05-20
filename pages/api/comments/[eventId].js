import { connectDatabase, getAllDocuments, insertDocument} from '../../../helpers/db-utils';
async function handler(req,res){
    if(req.method === 'POST'){
        const {email, name,text } = req.body;
        const eventId = req.query.eventId;
        
        const newComment ={
            eventId,
            email,
            name,
            text,
        }
        const client = await connectDatabase();

        await insertDocument(client,'comments',newComment);

        return res.status(200).json({message:"success"});
    }
    else if(req.method === "GET"){
        const eventId = req.query.eventId;

        const client = await connectDatabase();
        

        const commentsForRequestedEvent = (await getAllDocuments(client,'comments'))
        .filter(com=> com.eventId === eventId);

        return res.status(200).json(commentsForRequestedEvent);
    }

}

export default handler;