import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { uid, phone, address } = req.body;
    console.log(uid)
    const query = `mutation {
    upsertInfo(where:{uid:"${uid}"}, upsert:{
        update:{
            uid:"${uid}"
            phone:"${phone}"
            address:"${address}"
        },
        create:{
            uid:"${uid}"
            phone:"${phone}"
            address:"${address}"
        }
        }){
        phone
        address
        }}`
    const { data } = await axios.post(process.env.GRAPHCMS_URL!, {
        query
    }, {
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_PERMANENTAUTH_TOKEN}`
        }
    });
    console.log(data);
    const q = `
        mutation {
            publishInfo(where:{uid:"${uid}"}) {
                id
            }
        }
        `
    const d = await axios.post(process.env.GRAPHCMS_URL!, {
        query: q
    }, {
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_PERMANENTAUTH_TOKEN}`
        }
    });
    return res.status(200).json({ data, success: true });
}