import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { uid } = req.body;
    console.log(uid)
    const query = `query {
    info(where:{uid:"${uid}"}){
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
    return res.status(200).json({ data, success: true });
}