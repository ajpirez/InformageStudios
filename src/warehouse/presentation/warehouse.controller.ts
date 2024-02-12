import {Body, Controller, Post, Response, UseGuards} from "@nestjs/common";
import {NewWarehouseProps, Warehouse} from "../domain/entities/warehouse";
import {JwtAuthGuard} from "../../shared/auth/guards/jwtAuthGuard";
import {RolesGuard} from "../../shared/auth/guards/roles.guard";
import {RoleDecorator} from "../../shared/auth/decorator/roles.decorator";
import {UserRol} from "../../user/domain/enums/user.rol";
import {WarehouseCreateUseCase} from "../application/use-cases/warehouse.create.use-case";
import {ProcessResponse} from "../../shared/presentation/user.response";
import {WarehouseMappers} from "../infra/mappers/warehouse.mappers";

@Controller('warehouse')
export class WarehouseController {

    constructor(private readonly create: WarehouseCreateUseCase) {
    }

    @RoleDecorator(UserRol.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createWarehouse(@Body() body: NewWarehouseProps, @Response() res) {
        const warehouse = await this.create.execute(body);
        return ProcessResponse.setResponse<Warehouse>(res, warehouse, WarehouseMappers.DomainToDto);
    }

}