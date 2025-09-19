// export interface CategoryImageDto {
//     url: string;
//     publicId: string;
//     main: boolean;
// }

// export function toFormData(dto: any): FormData {
//     const formData = new FormData();

//     formData.append("name", dto.name);
//     formData.append("description", dto.description);

//     if (dto.parentId) {
//         formData.append("parentId", dto.parentId);
//     }

//     dto.images.forEach((file) => {
//         formData.append("images", file);
//     });
//     return formData;
// }