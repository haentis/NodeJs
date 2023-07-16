import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import CaptchaGenerator from './CaptchaGenerator.js';
import CaptchaValidator from './CaptchaValidator.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const captchaGenerator = new CaptchaGenerator();
const captchaValidator = new CaptchaValidator(captchaGenerator);

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
    const { sid, captchaUrl } = captchaGenerator.generateCaptcha();
    res.setHeader('Set-Cookie', `sid=${sid}; Max-Age=220; HttpOnly`);
    res.type('html');
    res.end(`
        <img src="${captchaUrl}"/><br>
        <form action="/login" method="post">
            <input type="text" name="captcha"/>
            <input type="submit"/>
        </form>
    `);
});

function getCookies(cookieString) {
    let cookies = {};
    const cookieArray = cookieString.split(';');
    for (let x of cookieArray) {
        const [key, value] = x.trim().split('=');
        cookies[key] = value;
    }
    return cookies;
}

app.post('/login', (req, res) => {
    const cookies = getCookies(req.header('Cookie'));
    const sid = cookies.sid;
    if (sid) {
        const userAnswer = req.body['captcha'];
        const solved = captchaValidator.validateCaptcha(sid, userAnswer);
        captchaGenerator.deleteCaptchaFile(sid);
        res.type('html');
        res.end(`
            <p>CAPTCHA VALID: ${solved}</p>
        `);
    }
});

app.listen(3000, () => {
    console.log('server started');
});