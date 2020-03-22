import { platformNode } from '@notadd/platform-node';
import { Module, MAIN_PATH, Injector, Controller } from '@notadd/core';
import { GraphqlModule, Query, Args } from '@notadd/graphql';
import { ApolloFastifyModule } from '@notadd/apollo-fastify';
import { TypeormPostgresEnvModule } from '@notadd/typeorm';
import { RedisEnvModule } from '@notadd/redis';
@Controller()
export class VersionController {

    @Query()
    version(): string {
        return require('../package.json').version;
    }

    @Query()
    error(@Args('message') message: string): any {
        throw new Error(message)
    }
}
@Module({
    providers: [],
    imports: [
        GraphqlModule.forDefault((injector: Injector) => injector),
        TypeormPostgresEnvModule.forRoot(),
        RedisEnvModule.forRoot(),
        ApolloFastifyModule
    ],
    controllers: [
        VersionController
    ]
})
export class AppModule { }

platformNode([{
    provide: MAIN_PATH,
    useValue: __filename
}]).bootstrapModule(AppModule)