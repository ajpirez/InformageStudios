import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from './user/user.module';
import {WarehouseModule} from "./warehouse/warehouse.module";
import {ProductModule} from "./product/product.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get("MONGO_URI"),
            }),
            imports: [ConfigModule],
            inject: [ConfigService],
        }),
        UserModule,
        WarehouseModule,
        ProductModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}
