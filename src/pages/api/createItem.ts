import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { uid, id, price, amount } = req.body;

    const r = await fetch(process.env.GRAPHCMS_URL!, {
        method: "POST",
        body: JSON.stringify({

            query: `
            mutation {
                createItem(data:{
                    amount:${amount}
                    price:${price}
                    uid:"${uid}"
                    product:{
                      connect:{
                        id:"${id}"
                      }
                    }
                }) {
                    id
                    product {
                      name
                      id
                    }
                    amount
                    price
                }
            }
            `
        }),
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_PERMANENTAUTH_TOKEN}`
        }
    });
    const { data, errors } = await r.json();
    console.log(errors);
    const pid = data.createItem.id;
    const d = await axios.post(process.env.GRAPHCMS_URL!, {
        query: `
        mutation {
            publishItem(where:{id:"${pid}"}) {
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