
export class ServiceModel {

    serviceName: string;
    description: string;
    imageUrl: string[];
    categoryId: number;
    isVisible?: boolean;
    isActive?: boolean;
    id?: number;
    constructor(
    serviceName: string,
    description: string,
    imageUrl: string[],
    categoryId: number,
    isVisible?: boolean,
    isActive?: boolean,
    ) {
        this.serviceName = serviceName;
    this.description = description;
    this.imageUrl = imageUrl;
    this.categoryId = categoryId;
    this.isVisible = isVisible;
    this.isActive = isActive;
    }
}