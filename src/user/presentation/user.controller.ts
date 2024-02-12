import {Body, Controller, Post, Put, Request, Response, UseGuards} from "@nestjs/common";
import {UserCreateUseCase} from "../application/useCases/user.create.use-case";
import {User} from "../domain/entities/user";
import {ProcessResponse} from "../../shared/presentation/user.response";
import {UserMapper} from "../infra/mappers/user.mapper";
import {UserRol} from "../domain/enums/user.rol";
import {RoleDecorator} from "../../shared/auth/decorator/roles.decorator";
import {RolesGuard} from "../../shared/auth/guards/roles.guard";
import {UserUpdateRolUseCase} from "../application/useCases/user.update-rol.use-case";
import {LocalAuthGuard} from "../../shared/auth/guards/localAuthGuard";
import {LoginUseCase} from "../application/useCases/user.login.use-case";
import {JwtAuthGuard} from "../../shared/auth/guards/jwtAuthGuard";

@Controller('user')
export class UserController {

    constructor(
        private readonly create: UserCreateUseCase,
        private readonly rol: UserUpdateRolUseCase,
        private readonly _login: LoginUseCase) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public async login(@Body() login: { email: string, password: string }, @Response() res, @Request() req) {
        const l = await this._login.execute(req.user);
        return ProcessResponse.setResponse(res, l, (a) => a);
    }


    @Post("register")
    public async register(@Body() user, @Response() res) {
        const ans = await this.create.execute({
            ...user,
            rol: UserRol.ADMIN
        });
        return ProcessResponse.setResponse<User>(res, ans, UserMapper.DomainToDto);
    }

    @RoleDecorator(UserRol.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put("update_rol")
    public async updateRol(@Body() input: { id: string }, @Response() res) {
        const ans = await this.rol.execute(input);
        return ProcessResponse.setResponse<User>(res, ans, UserMapper.DomainToDto);
    }
}