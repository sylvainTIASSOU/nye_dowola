export class CategoryModel {

    categoryName: string;
    imageUrl: string;
    isVisible?: boolean;
    isActive?: boolean;
    id?: number;

    constructor(
    categoryName: string,
    imageUrl: string,
    isVisible: boolean,
    isActive: boolean,
    ) {
    this.categoryName = categoryName;
    this.imageUrl = imageUrl;
    this.isVisible = isVisible;
    this.isActive = isActive;
    }
}