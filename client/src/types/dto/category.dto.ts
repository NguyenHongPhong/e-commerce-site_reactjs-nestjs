export type CategoryFormData = {
    name: string;
    description: string;
    images: FileList; // input type file
    parent_id: string
};

export type CategoryOption = {
    id: number;
    name: string;
};

export interface IFormData {
    name: string,
    description: string,
    parentId?: string,
    images: File[]
}

export function toFormData(dto: IFormData): FormData {
    const formData = new FormData();

    formData.append("name", dto.name);
    formData.append("description", dto.description);

    if (dto.parentId) {
        formData.append("parentId", dto.parentId);
    }

    dto.images.forEach((file) => {
        formData.append("images", file);
    });
    return formData;
}
