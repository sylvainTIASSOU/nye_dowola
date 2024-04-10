
export class ProviderModel {

    availability: string;
    estimatedDuration: number;
    tarif: number;
    userId: number;
    serviceId: number;
    isVisible?: boolean;
    isActive?: boolean;
    id?: number;
    constructor(

        availability: string,
    estimatedDuration: number,
    tarif: number,
    userId: number,
    serviceId: number,
    isVisible?: boolean,
    isActive?: boolean,
    ) {

    this.availability = availability;
    this.estimatedDuration = estimatedDuration;
    this.tarif = tarif;
    this.isVisible= isVisible;
    this.isActive = isActive;
    this.userId = userId;
    this.serviceId = serviceId;
    }
}