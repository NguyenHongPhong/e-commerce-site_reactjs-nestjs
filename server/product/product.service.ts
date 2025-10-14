import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ShopperRepository } from '@/shopper/shopper.repository';
import {
    ProductDto, ImageDto, CategoryDto,
    createCategoryDro, createProductFeatureDto,
    createProductImgDto,
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

            // 3️⃣ Tạo dữ liệu liên quan TUẦN TỰ

            // Features
            if (productData.features?.length) {
                const featureData = productData.features.map((feat) => ({
                    product_id: productId,
                    feature: feat,
                }));
                await this.productRepo.createProductFeatures(featureData, tx);
            }

            // Product images
            if (productImgs.length) {
                const productImageData = productImgs.map((img) => ({
                    product_id: productId,
                    public_Id: img.originalname,
                    url: img.path,
                }));
                await this.productRepo.createProductImgs(productImageData as createProductImgDto[], tx);
            }

            // Colors
            if (productData.colors?.length) {
                const colorData = productData.colors.map((color) => ({
                    product_id: productId,
                    name: color,
                }));
                await this.productRepo.createProductColors(colorData, tx);
            }

            // Materials
            if (productData.materials?.length) {
                const materialData = productData.materials.map((material) => ({
                    product_id: productId,
                    name: material,
                }));
                await this.productRepo.createProductMaterials(materialData, tx);
            }

            // Sizes
            if (productData.sizes?.length) {
                const sizesData = productData.sizes.map((size) => ({
                    product_id: productId,
                    name: size,
                }));
                await this.productRepo.createProductSizes(sizesData, tx);
            }

            // 4️⃣ Trả kết quả
            return {
                statusCode: 201,
                message: 'Created product successfully',
            };
        });
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

        const productsByCategory = await this.productRepo.getProductsByCategory(category.id);

        if (!productsByCategory) {
            throw new NotFoundException("Not found any product from this category " + category.id);
        }

        const { id, shop_id, ...restProduct } = product;
        const { name } = shop;
        const { name: categoryName } = category;

        return {
            product: restProduct,
            shop: name,
            category: categoryName,
            productsByCategory
        };
    }

}
