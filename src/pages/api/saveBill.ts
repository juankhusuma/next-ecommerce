import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { uid, price } = req.body;

    const { data } = await axios.post(process.env.GRAPHCMS_URL!, {
        query: `
        mutation {
            createPurchase(data: {
                    uid: "${uid}"
                    price: ${price}
                }) {
                id
                uid
                price
                createdAt
            }
        }
        `
    }, {
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_PERMANENTAUTH_TOKEN}`
        }
    });
    const pid = data.data.createPurchase.id;
    const d = await axios.post(process.env.GRAPHCMS_URL!, {
        query: `
        mutation {
            publishPurchase(where:{id:"${pid}"}) {
                id
            }
        }
        `
    }, {
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_PERMANENTAUTH_TOKEN}`
        }
    });

    return res.status(200).json({ success: true });
}