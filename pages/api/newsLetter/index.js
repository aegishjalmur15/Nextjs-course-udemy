import { connectDatabase, insertDocument } from '../../../helpers/db-utils';
async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    

    const client = await connectDatabase();

    
    try{
        await insertDocument(client,'emails',{ email: email });

        res.status(200).json({message:"Success!"});
    }catch(err){    
        if(err.code === 11000){

          res.status(409).json({message:"Email Already Exists!"})
        }
        else{
          res.status(500).json({message:"Server Error!"})
        }
    }
    client.close();
  }
}

export default handler;
