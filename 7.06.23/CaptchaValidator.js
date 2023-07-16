export default class CaptchaValidator {
    constructor(captchas) {
        this.captchas = captchas;
    }

    validateCaptcha(sid, userAnswer) {
        const captchaValue = this.captchas.getCaptchaValue(sid);
        if (!captchaValue) {
            return false;
        }
        return captchaValue === userAnswer;
    }
}