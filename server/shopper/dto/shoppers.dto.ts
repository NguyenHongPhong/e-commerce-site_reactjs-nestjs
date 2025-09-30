export type ShopperDTO = {
    userId: string,
    name: string;
    description: string;
    contactShopper: string;
    contactRegistered: string;
    address: string;
    latitude: number;
    longitude: number;
};

export type registerShopperDto = {
    name: string;
    user_id: string;
    slug: string;
    logo_url: string;
    banner_url: string;
    description: string;
    phone_number: string;
    address: string;
    location_lat: number;
    location_lng: number;
}

