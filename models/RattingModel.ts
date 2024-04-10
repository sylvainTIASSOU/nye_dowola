export class RattingModel {

    comment: string;
    note: number;
    isVisible: boolean;
    isActive: boolean;
    userId: number;
    appId: number;
    id?: number;

    constructor(
    comment: string,
    note: number,
    isVisible: boolean,
    isActive: boolean,
    userId: number,
    appId: number,
    ) {
        this.comment = comment;
        this.note = note;
        this.isVisible = isVisible;
        this.isActive = isActive;
        this.userId = userId;
        this.appId = appId;

    }
}