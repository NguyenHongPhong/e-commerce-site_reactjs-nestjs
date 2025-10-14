import { ReactElement } from "react"

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
    features: { value: string }[];
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

export interface ITag {
    idx: number,
    label: string,
    content: ReactElement
}

export interface ITags {
    tags: ITag[];
}

export interface ICommentUser {
    name: string,
    rate: number,
    commentedAt: string,
    content: string
};

export interface IProductImage {
    id: number;
    url: string;
    public_Id: string;
    product_id: string;
}

export interface IRate {
    user_id: string;
    product_id: string;
    star_rating: number;
}

export interface ISimilarProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    slug: string;
    category_id: number;
    shop_id: string;
    sold: number;
    rate_star: number;
    rate_count: number;
    created_at: string;  // hoặc Date nếu bạn convert
    updated_at: string;  // hoặc Date nếu bạn convert
    product_Images: IProductImage[];
    rates: IRate[];
}



export interface IResponsiveCasourel {
    superLargeDesktop: {
        breakpoint: { max: number; min: number };
        items: number;
    };
    desktop: {
        breakpoint: { max: number; min: number };
        items: number;
    };
    tablet: {
        breakpoint: { max: number; min: number };
        items: number;
    };
    mobile: {
        breakpoint: { max: number; min: number };
        items: number;
    };
    [key: string]: { breakpoint: { max: number; min: number }; items: number }; // ✅ index signature
}


export interface ICustomListProps<T> {
    items: T[];
    renderItem: (item: T, idx: number) => ReactElement;
    fullSlider?: boolean;
    responsiveCasourel: IResponsiveCasourel
}
