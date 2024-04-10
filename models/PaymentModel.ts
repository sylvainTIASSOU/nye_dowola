export class PaymentModel {
    amount: number;
    paymentDate: string;
    paymentStatus: string;
    customerId: number;
    appId: number;
    id?: number;

    constructor(
        amount: number,
        paymentDate: string,
        paymentStatus: string,
        customerId: number,
        appId: number,
    ) {

        this.amount = amount;
        this.paymentDate = paymentDate;
        this.customerId = customerId;
        this.paymentStatus = paymentStatus;
        this.appId = appId;
    }
}