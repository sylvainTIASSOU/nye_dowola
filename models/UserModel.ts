export class UserModel {
    lastName: string;
    firstName: string;
    email: string;
    passwords: string;
    role: string;
    phone: number;
    address: string;
    imageUrl: string;
    isVisible?: boolean;
    isActive?: boolean;
    id?: number;

    constructor(
    lastName: string,
    firstName: string,
    email: string,
    passwords: string,
    role: string,
    phone: number,
    address: string,
    imageUrl: string,
    isVisible?: boolean,
    isActive?: boolean,
    ) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.passwords = passwords;
        this.role = role;
        this.phone = phone;
        this.address = address;
        this.imageUrl = imageUrl;
        this.isVisible = isVisible;
        this.isActive = isActive;
    }
}