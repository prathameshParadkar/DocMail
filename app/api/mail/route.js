// const Mailjet = require('node-mailjet');

import { NextRequest, NextResponse } from "next/server"
// import { Mailjet } from "node-mailjet"

const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(
    'c897fd4c68a21197b3b9814cbd49ea0f',
    '7854e91b8d593d1876cef035cf8b95a9',
);

export const POST = async (req, res) => {

    try {
        const body = await req.json()
        const request = mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'par76.pkar@gmail.com',
                            Name: 'DocMail Team'
                        },
                        To: [
                            {
                                Email: body.email,
                                Name: body.name
                            }
                        ],
                        Subject: body.subject,
                        HTMLPart: body.html
                    }
                ]
            })

        request
            .then((result) => {
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err.statusCode)
            })

        return NextResponse.json({ message: 'Success' })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error' })
    }

}
