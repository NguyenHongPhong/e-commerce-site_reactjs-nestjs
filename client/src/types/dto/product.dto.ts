export interface ICategoryDto {
    name?: string,
    description?: string,
    selectCategory?: string
};
export interface IProductDto {
    title?: string,
    colors?: string[],
    description?: string,
    materials?: string[],
    sizes?: string[],
    price?: string,
}

export interface IGalleryProductDto {
    id: string,
    url: string,
    public_Id: string,
    product_id: string
}

export interface IPropsGallery {
    images: IGalleryProductDto[]
}

