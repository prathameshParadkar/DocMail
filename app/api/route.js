// const Mailjet = require('node-mailjet');

import { NextResponse } from "next/server";

// const mailjet = new Mailjet({
//     apiKey: process.env.MJ_APIKEY_PUBLIC || ,
//     apiSecret: process.env.MJ_APIKEY_PRIVATE || 
// });

// const Mailjet = require('node-mailjet');
// const mailjet = Mailjet.apiConnect(
//     'c897fd4c68a21197b3b9814cbd49ea0f',
//     '7854e91b8d593d1876cef035cf8b95a9',
// );

// const request = mailjet
//     .post('send', { version: 'v3.1' })
//     .request({
//         Messages: [
//             {
//                 From: {
//                     Email: "pilot@mailjet.com",
//                     Name: "Mailjet Pilot"
//                 },
//                 To: [
//                     {
//                         Email: "passenger1@mailjet.com",
//                         Name: "passenger 1"
//                     }
//                 ],
//                 Subject: "Your email flight plan!",
//                 TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
//                 HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
//             }
//         ]
//     })

// request
//     .then((result) => {
//         console.log(result.body)
//     })
//     .catch((err) => {
//         console.log(err.statusCode)
//     })

export default function handler(req, res) {
    // res.status(200).json({ message: 'Hello from Next.js!' })
    NextResponse.json({ message: 'Hello from Next.js!' })
}