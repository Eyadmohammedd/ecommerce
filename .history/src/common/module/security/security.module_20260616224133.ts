import { Module } from "@nestjs/common";




@Module({

providers: [SecurityService],

})

export class SecurityModule {
    constructor() {}
}