export type CategoryFormData = {
    name: string;
    description: string;
    images: FileList; // input type file
    parent_id: number
};

export type CategoryOption = {
    id: number;
    name: string;
};

export interface ICategoryDto {
    name: string;
    description: string;
    images: FileList;
    parent_id: number
}

export interface IFormData {
    name: string,
    description: string,
    files: File[]
}