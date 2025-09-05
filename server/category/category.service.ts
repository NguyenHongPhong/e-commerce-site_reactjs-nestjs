import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { categoryDto } from './dto/category';
import { CategoryRepository } from './category.repository';
import { CategoryImagesRepository } from '../category_images/category_images.repository';
@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository,
        private readonly categoryImagesRepository: CategoryImagesRepository
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


    async create(data: categoryDto, files: Express.Multer.File[]) {
        const newCategory = {
            name: data.name,
            slug: this.normalizeName(data.name),
            description: data.description,
            parent_id: data.parentId ? Number(data.parentId) : 0
        }

        const category = await this.categoryRepository.create(newCategory);

        if (category) {
            const images = await this.uploadImages(files);
            const img = await this.categoryImagesRepository.insertMany(category.id, images);
            const imgFiles = img.map(image => {
                const { url, ...rest } = image;
                return url;
            })

            const { is_active, updatedAt, ...rest } = category;
            const result = { ...rest, imgFiles };

            return { ok: true, data: result }
        }
        throw new InternalServerErrorException('Failed to insert category image.');
    }

    async getAll() {
        const categories = await this.categoryRepository.getAll();
        if (categories) {
            const result = await Promise.all(
                categories.map(async (category) => {
                    const rs = await this.categoryImagesRepository.getAllByCategoryId(category.id);
                    return { ...category, imgs: rs };
                })
            );
            return result;
        }
    }

}

