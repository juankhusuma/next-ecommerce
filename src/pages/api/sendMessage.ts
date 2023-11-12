import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, subject, message } = req.body;
    const { data } = await axios.post(process.env.GRAPHCMS_URL!, {
        query: `
        mutation {
            createMessage(data: {
                name: "${name}"
                email: "${email}"
                subject: "${subject}"
                content: "${message}"
                }) {
                id
                name
                email
                subject
                content
            }
        }
        `
    }, {
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_PERMANENTAUTH_TOKEN}`
        }
    });
    console.log(data)
    return res.status(200).json(data);
}