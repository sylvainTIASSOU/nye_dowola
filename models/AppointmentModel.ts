export class AppointmentModel {

    appointmentDate: string;
    appointmentHours: string;
    address: string;
    appointmentStatus: string;
    providerId: number;
    userId: number;
    id?: number;

    constructor(
    appointmentDate: string,
    appointmentHours: string,
    address: string,
    appointmentStatus: string,
    providerId: number,
    userId: number,
    id?: number,
    ) {
        this.appointmentDate = appointmentDate;
        this.appointmentHours = appointmentHours;
        this.address = address;
        this.appointmentStatus = appointmentStatus;
        this.providerId = providerId;
        this.userId= userId;
        this.id = id;
    }
}