import { UserRepository } from './../user/user.repository';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ShopperDTO } from './dto';
import { registerShopperDto } from './dto';
import { ShopperRepository } from './shopper.repository';
@Injectable()
export class ShopperService {
    constructor(
        private readonly shopperRepository: ShopperRepository,
        private readonly userRepository: UserRepository,
    ) {

    };

    normalizeName(text: string): string {
        return text
            .toLowerCase()
            .normalize("NFD")                     // split accents (e.g. é -> e + ́)
            .replace(/[\u0300-\u036f]/g, "")      // remove accents
            .replace(/[^a-z0-9\s-]/g, "")         // remove special chars (keep letters, numbers, spaces, -)
            .trim()
            .replace(/\s+/g, "-")                 // spaces -> -
            .replace(/-+/g, "-");                 // collapse multiple -
    }


    async create(data: ShopperDTO, logo: Express.Multer.File | undefined, banner: Express.Multer.File | undefined, idUser: string) {
        let phoneNumber = "";
        if (!logo) {
            throw new BadRequestException('Missed logo');
        }

        if (!banner) {
            throw new BadRequestException('Missed banner');
        }

        if (data.contactRegistered) {
            const phone = await this.userRepository.findPhoneNumberById(idUser);
            if (phone) phoneNumber = phone;
        } else {
            phoneNumber = data.contactShopper;
        }

        const newShop: registerShopperDto = {
            user_id: idUser,
            name: data.name,
            description: data.description,
            address: data.address,
            slug: this.normalizeName(data.name),
            logo_url: logo.path,
            banner_url: banner.path,
            location_lat: data.latitude,
            location_lng: data.longitude,
            phone_number: phoneNumber
        };

        const shopperRegistered = await this.shopperRepository.create(newShop);

        if (shopperRegistered) {
            return {
                status: 200,
                message: "Your registration has been received. Please wait for admin approval to become an active shopper. We're going to notify through your email later.",
            };
        }

        throw new InternalServerErrorException("Registed failed");
    }
}
