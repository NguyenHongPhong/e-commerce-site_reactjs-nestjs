// import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { CreateProductDto } from './dto';
// import { ProductRepository } from './shopper.repository';
// import { ColorRepository } from '@/color/color.repository';
// import { MaterialRepository } from '@/material/material.repository';
// import { SizeRepository } from '@/size/size.repository';
// import { ProductImgRepository } from '@/product_img/product.img.repository';
// import { PrismaService } from '@/prisma/prisma.service';
// @Injectable()
// export class ShopperService {
//     constructor(private readonly productRepo: ProductRepository,
//         private readonly colorRepo: ColorRepository,
//         private readonly materialRepo: MaterialRepository,
//         private readonly sizeRepo: SizeRepository,
//         private readonly productImgRepo: ProductImgRepository,
//         private readonly prisma: PrismaService
//     ) {

//     };
//     //Method to get files from Cloudinary
//     async uploadImages(files?: Express.Multer.File[]) {
//         if (!files || files.length === 0) return [];
//         return files.map(file => ({
//             url: file.path,
//             public_id: file.filename,
//         }));
//     }

//     normalizeName(text: string): string {
//         return text
//             .toLowerCase()
//             .normalize("NFD")                     // split accents (e.g. é -> e + ́)
//             .replace(/[\u0300-\u036f]/g, "")      // remove accents
//             .replace(/[^a-z0-9\s-]/g, "")         // remove special chars (keep letters, numbers, spaces, -)
//             .trim()
//             .replace(/\s+/g, "-")                 // spaces -> -
//             .replace(/-+/g, "-");                 // collapse multiple -
//     }


//     async create(data: CreateProductDto, logo: Express.Multer.File[], banner: Express.Multer.File[]) {
//         return this.prisma.$transaction(async (tx) => {
//             // 1. Create product
//             const product = await tx.product.create({
//                 data: {
//                     title: data.title,
//                     slug: this.normalizeName(data.title),
//                     description: data.description,
//                     price: data.price,
//                     category_id: data.category,
//                 },
//             });

//             // 2. Prepare related data
//             const colors = data.colors?.map((c) => ({ name: c, product_id: product.id })) ?? [];
//             const materials = data.materials?.map((m) => ({ name: m, product_id: product.id })) ?? [];
//             const sizes = data.sizes?.map((s) => ({ name: s, product_id: product.id })) ?? [];

//             // Upload files and attach product_id
//             const imgs = await this.uploadImages(files);
//             const imgsWithProductId = imgs.map((img) => ({
//                 url: img.url,
//                 public_Id: img.public_id,
//                 product_id: product.id,
//             }));

//             // 3. Insert relations in parallel
//             await Promise.all([
//                 colors.length && tx.color.createMany({ data: colors, skipDuplicates: true }),
//                 materials.length && tx.material.createMany({ data: materials, skipDuplicates: true }),
//                 sizes.length && tx.size.createMany({ data: sizes, skipDuplicates: true }),
//                 imgsWithProductId.length && tx.product_Images.createMany({ data: imgsWithProductId }),
//             ]);

//             // 4. Return standardized response
//             return {
//                 statusCode: 201,
//                 message: 'Product created successfully',
//                 data: product,
//             };
//         }, {
//             timeout: 20000,
//         });
//     }




// }
