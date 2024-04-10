export interface ServiseProviderInterface {
    id: string;
    availability: string;
    estimatedDuration: string;
    tarif: string;
    lastName: string;
    firstName: string;
    email: string;
    phone: string;
    address: string;
    imageUrlUser: string;
    serviceName: string;
    description: string;
    imageUrlService: string[];
    categoryName: string;
}

export interface HistoryInterface {
    id: string;
    address: string;
    date: string;
    hours: string;
    providerName: string;
    serviceName: string;
    serviceImage: string;
}