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
    images: File[],
    folder_name: string
}

export type typeCategories = {
    id: string,
    name: string,
    slug: string,
    description: string,
    parent_id: number,
    is_active: boolean,
    updatedAt: string,
    createAt: string
}

export type typeCategoryImgs = {
    categoryId: string;
    imgs: { url: string; publicId: string; main: boolean }
}

export interface CategoryImageDto {
    url: string;
    publicId: string;
    main: boolean;
}

// A single category
export interface CategoryDto {
    id: string;
    name: string;
    description: string;
    slug: string;
    parent_id: number;
    is_active: boolean;
    createAt: string;   // ISO date string from backend
    updatedAt: string;  // ISO date string from backend
    imgs: CategoryImageDto[];
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

    formData.append("folder", dto.folder_name);
    return formData;
}
