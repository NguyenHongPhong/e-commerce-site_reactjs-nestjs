import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import {
    ProductDto, ImageDto, CategoryDto,
    createCategoryDro, createCategoryImgDto, CreateProductDto,
    createProductImgDto, createProductColorDto
} from './dto';
@Injectable()
export class ProductService {
    constructor(private readonly productRepo: ProductRepository
    ) { };
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


    async create(productData: ProductDto, productImgs: ImageDto[], categoryData: CategoryDto, categoryImgs: ImageDto[], idShop: string) {
        const newCategory: createCategoryDro = {
            name: categoryData.name!,
            description: categoryData.description!,
            slug: this.normalizeName(categoryData.name!),
            id_shop: idShop
        };

        /**Thêm category */
        const { id } = await this.productRepo.createCategory(newCategory);

        const categoryImages = categoryImgs.map((img) => {
            const rs: createCategoryImgDto = {
                category_id: id,
                publicId: img.originalname!,
                url: img.path!
            }
            return rs;
        });

        /**Thêm ảnh category */
        const categoryImageRs = await this.productRepo.createCategoryImgs(categoryImages);


        const newProduct: CreateProductDto = {
            title: productData.title!,
            description: productData.description!,
            price: Number(productData.price!),
            slug: this.normalizeName(productData.title!),
            category_id: id,
            shop_id: idShop
        };

        /** Thêm product */

        const { id: idProduct } = await this.productRepo.create(newProduct);

        const productImages = productImgs.map((img) => {
            const rs: createProductImgDto = {
                product_id: idProduct,
                public_Id: img.originalname!,
                url: img.path!
            }
            return rs;
        });

        /**Thêm ảnh product */
        const prdImgs = await this.productRepo.createProductImgs(productImages);


        /** Thêm màu cho sản phẩm */
        const colors = productData.colors!.map((color) => {
            const col: createProductColorDto = {
                name: color,
                product_id: idProduct
            }
            return col;
        })

        const prdColor = await this.productRepo.createProductColors(colors);

        /** Thêm chất liệu của sản phẩm */
        const materials = productData.materials!.map((material) => {
            const col: createProductColorDto = {
                name: material,
                product_id: idProduct
            }
            return col;
        })

        const prdMaterial = await this.productRepo.createProductMaterials(materials);



    }


    async getAll() {
        const products = await this.productRepo.getAll();
        if (products) {
            return products;
        }
        throw new NotFoundException("Not found products");
    }

}
