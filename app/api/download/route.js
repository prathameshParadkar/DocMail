import { NextResponse } from "next/server"
const puppeteer = require('puppeteer');
import { storage } from "@/app/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req, res) => {

    try {
        const body = await req.json()
        const storage = getStorage();
        const id = uuidv4();
        const storageRef = ref(storage, `DocMail/output-${id}`);

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Set the HTML content or load it from a file
        const htmlContent = body.html;

        await page.setContent(htmlContent);

        // Generate the PDF
        const pdfBuffer = await page.pdf();

        await uploadBytes(storageRef, pdfBuffer, { contentType: 'application/pdf' }).then((snapshot) => {
            // console.log(snapshot)
            console.log('Uploaded a blob or file!')
        });

        let url_ = ''
        await getDownloadURL(ref(storage, `DocMail/output-${id}`)).then((url) => {
            url_ = url

        })
            .catch((error) => {
                console.log(error)
                return NextResponse.json({ message: 'Error' })
            });


        await browser.close();

        return NextResponse.json({ message: 'Success', downloadURL: url_ })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error' })
    }

    // Create a simple HTTP server to serve the PDF with a download link
    // const server = http.createServer((req, res) => {
    //     res.setHeader('Content-Type', 'application/pdf');
    //     res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    //     res.end(pdfBuffer);
    // });

}