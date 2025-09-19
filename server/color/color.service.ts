import { Injectable, InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class ColorService {
    constructor(
    ) {

    };
    //Method to get files from Cloudinary
    async uploadImages(files?: Express.Multer.File[]) {
        if (!files || files.length === 0) return [];
        return files.map(file => ({
            url: file.path,
            public_id: file.filename,
        }));
    }

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


    async create(files: Express.Multer.File[]) {

    }

    async getAll() {
    }

}

