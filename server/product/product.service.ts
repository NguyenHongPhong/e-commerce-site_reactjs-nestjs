import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ShopperRepository } from '@/shopper/shopper.repository';
import {
    ProductDto, ImageDto, CategoryDto,
    createCategoryDro, createCategoryImgDto, CreateProductDto,
    createProductImgDto, createProductColorDto
} from './dto';
@Injectable()
export class ProductService {
    constructor(private readonly productRepo: ProductRepository,
        private readonly shopperRepo: ShopperRepository

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


    async create(
        productData: ProductDto,
        productImgs: ImageDto[],
        categoryData: CategoryDto,
        categoryImgs: ImageDto[],
        idUser: string,
    ) {
        const shop = await this.shopperRepo.findShopperByIdUser(idUser);
        if (!shop) throw new NotFoundException('Shop not found for this user');

        const idShop = shop.id;
        let categoryId: number;

        return this.productRepo.$transaction(async (tx) => {

            // 1️⃣ Xử lý Category
            if (categoryData.selectCategory && categoryData.selectCategory !== "NONE") {
                categoryId = Number(categoryData.selectCategory);
            } else {
                const newCategory: createCategoryDro = {
                    name: categoryData.name!,
                    description: categoryData.description!,
                    slug: this.normalizeName(categoryData.name!),
                    id_shop: idShop,
                };

                const cateRs = await this.productRepo.createCategory(newCategory, tx);
                categoryId = cateRs.id;

                if (categoryImgs.length) {
                    const categoryImages = categoryImgs.map((img) => ({
                        category_id: categoryId,
                        publicId: img.originalname!,
                        url: img.path!,
                    }));

                    await this.productRepo.createCategoryImgs(categoryImages, tx);
                }
            }

            // 2️⃣ Tạo Product
            const newProduct = await this.productRepo.create({
                title: productData.title!,
                description: productData.description!,
                price: Number(productData.price),
                slug: this.normalizeName(productData.title!),
                category_id: categoryId,
                shop_id: idShop,
            }, tx);

            const productId = newProduct.id;

            // 3️⃣ Tạo tất cả dữ liệu liên quan song song
            const promises: Promise<any>[] = [];

            // Ảnh product
            if (productImgs.length) {
                const productImageData = productImgs.map((img) => ({
                    product_id: productId,
                    public_Id: img.originalname,
                    url: img.path,
                }));
                promises.push(this.productRepo.createProductImgs(productImageData as createProductImgDto[], tx));
            }

            // Màu sắc
            if (productData.colors?.length) {
                const colorData = productData.colors.map((color) => ({
                    product_id: productId,
                    name: color,
                }));
                promises.push(this.productRepo.createProductColors(colorData, tx));
            }

            // Chất liệu
            if (productData.materials?.length) {
                const materialData = productData.materials.map((material) => ({
                    product_id: productId,
                    name: material,
                }));
                promises.push(this.productRepo.createProductMaterials(materialData, tx));
            }

            // Size
            if (productData.sizes?.length) {
                const sizesData = productData.sizes.map((size) => ({
                    product_id: productId,
                    name: size,
                }));
                promises.push(this.productRepo.createProductSizes(sizesData, tx));
            }

            // Thực hiện tất cả song song
            await Promise.all(promises);

            // 4️⃣ Trả kết quả
            return {
                statusCode: 201,
                message: 'Created product successfully',
            };
        },);
    }

    async getAll() {
        const products = await this.productRepo.getAll();
        if (products) {
            return products;
        }
        throw new NotFoundException("Not found products");
    }

    async getAllCategory() {
        const categories = await this.productRepo.getAllCategory();
        if (categories) {
            return categories;
        }
        throw new NotFoundException("Not found products");
    }

    async getProductById(idClient: string) {
        const product = await this.productRepo.getProductById(idClient);

        if (!product) {
            throw new NotFoundException("Not found product");
        }

        const shop = await this.shopperRepo.findShopById(product.shop_id);
        const category = await this.productRepo.getCategoryById(product.category_id);

        if (!shop) {
            throw new NotFoundException("Not found shop");
        }

        if (!category) {
            throw new NotFoundException("Not found category");
        }


        const { id, shop_id, ...restProduct } = product;
        const { name } = shop;
        const { name: categoryName } = category;

        return {
            product: restProduct,
            shop: name,
            category: categoryName
        };
    }

}
