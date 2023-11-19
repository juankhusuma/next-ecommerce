import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { uid } = req.body;
    console.log(uid)
    const { data } = await axios.post(process.env.GRAPHCMS_URL!, {
        query: `
        query {
            purchases(where:{uid: "${uid}"}) {
              price
              createdAt
            }
            items(where:{uid: "${uid}"}) {
                amount
                price
                product {
                    name
                }
            }
          }
        `
    }, {
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_PERMANENTAUTH_TOKEN}`
        }
    });
    console.log(data);
    return res.status(200).json({ data, success: true });
}