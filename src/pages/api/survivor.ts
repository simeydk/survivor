import { NextApiRequest, NextApiResponse } from 'next';
import { getAll, update } from '../../lib/survivor';

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
    
    console.log(req.method, '/api/survivor', req.body && JSON.parse(req.body))

    let data
    let response

    switch (req.method) {
        case 'GET':
            const values = await getAll();
            res.status(200).json(values);
            break;

        // case 'POST':
        //     console.log(req.body)
        //     data = JSON.parse(req.body)
        //     response = await create(data)
        //     res.status(200).json(response);
        //     break;

        case 'PUT':
            console.log(req.body)
            data = JSON.parse(req.body)
            response = await update(data)
            // @ts-ignore
            res.unstable_revalidate('/')
            res.status(200).json(response);
            break;



        default:
            res.status(400).json({ error: 'Only GET and PUT requests allowed' });
            break;
    }
  }
  