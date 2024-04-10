export class LoginModel {
    phone: number;
    passwords: string;

    constructor(
        phone: number,
        passwords: string,
    ) {
        this.passwords = passwords;
        this.phone = phone;
    }
}