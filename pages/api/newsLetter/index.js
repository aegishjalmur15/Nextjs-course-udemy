import { connectDatabase, insertDocument } from '../../../helpers/db-utils';
async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    

    const client = await connectDatabase();

    
    try{
        await insertDocument(client,'emails',{ email: email });

        res.status(200).json();
    }catch(err){    
        if(err.code === 11000){

          res.status(409).json()
        }
        else{
          res.status(500).json()
        }
    }
    client.close();
  }
}

export default handler;
