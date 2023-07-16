import Captcha from 'captcha-generator-alphanumeric';
import fs from 'fs';
import path from 'path';

export default class CaptchaGenerator {
    constructor() {
        this.captchas = {};
    }

    generateCaptcha() {
        const sid = this.getSID();
        console.log("  New SID =", sid);

        const captcha = new Captcha();
        const captcha_id = Object.keys(this.captchas).length;
        const captchaUrl = `captcha/${captcha_id}.png`;
        const captchaFile = path.join(process.cwd(), 'public', 'captcha', `${captcha_id}.png`);
        this.captchas[sid] = { value: captcha.value, file: captchaFile };

        const captchaOut = fs.createWriteStream(captchaFile);
        captcha.PNGStream.pipe(captchaOut);
        captchaOut.on('finish', () => {
            return {
                sid,
                captchaUrl
            };
        });
    }

    getCaptchaValue(sid) {
        return this.captchas[sid]?.value;
    }

    deleteCaptchaFile(sid) {
        if (this.captchas[sid]?.file) {
            fs.rm(this.captchas[sid].file, (err) => console.log(err));
            this.captchas[sid].value = null;
            this.captchas[sid].file = null;
        }
    }

    getSID() {
        const time = new Date().getTime();
        const salt = Math.trunc(Math.random() * 1000000000);
        return salt.toString(16) + Object.keys(this.captchas).length.toString(16) + time.toString(16);
    }
}