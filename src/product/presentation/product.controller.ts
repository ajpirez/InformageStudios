import {Body, Controller, Get, Post, Query, Response, UseGuards} from "@nestjs/common";
import {ProductCreateUseCase} from "../application/use-cases/product.create.use-case";
import {RoleDecorator} from "../../shared/auth/decorator/roles.decorator";
import {UserRol} from "../../user/domain/enums/user.rol";
import {JwtAuthGuard} from "../../shared/auth/guards/jwtAuthGuard";
import {RolesGuard} from "../../shared/auth/guards/roles.guard";
import {Product} from "../../product/domain/entities/product";
import {ProcessResponse} from "../../shared/presentation/user.response";
import {ProductMappers} from "../../product/infra/mappers/product.mappers";
import {NewProductProps} from "../domain/entities/product";
import {ProductFindOneUseCase} from "../application/use-cases/product.find-one.use-case";
import {ProductUpdateUnitsUseCase} from "../application/use-cases/product.update-units.use-case";
import {ProductFindAllUseCase} from "../application/use-cases/product.find-all.use-case";

@Controller('product')
export class ProductController {

    constructor(
        private readonly create: ProductCreateUseCase,
        private readonly findOne: ProductFindOneUseCase,
        private readonly updateUnits: ProductUpdateUnitsUseCase,
        private readonly findAll: ProductFindAllUseCase) {
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getProduct(@Query() id, @Response() res) {
        const product = await this.findOne.execute({id});
        return ProcessResponse.setResponse<Product>(res, product, ProductMappers.DomainToDto);
    }

    @Get('all')
    @UseGuards(JwtAuthGuard)
    async getAllProduct(@Query() warehouse, @Response() res) {
        const products = await this.findAll.execute(warehouse);
        return ProcessResponse.setResponse<Product[]>(res, products, (p) => p.map(ProductMappers.DomainToDto));
    }

    @RoleDecorator(UserRol.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createProduct(@Body() body: NewProductProps, @Response() res) {
        const product = await this.create.execute(body);
        return ProcessResponse.setResponse<Product>(res, product, ProductMappers.DomainToDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('take_units')
    async takeUnits(@Body() body, @Response() res) {
        const product = await this.updateUnits.execute({
            id: body.id,
            amount: -body.amount
        });

        return ProcessResponse.setResponse<Product>(res, product, ProductMappers.DomainToDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add_units')
    async addUnits(@Body() body, @Response() res) {
        const product = await this.updateUnits.execute(body);
        return ProcessResponse.setResponse<Product>(res, product, ProductMappers.DomainToDto);
    }
}