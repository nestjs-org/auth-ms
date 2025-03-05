import 'dotenv/config';
import * as joi from "joi";

interface Vars{
    PORT: number;
    NATS_SERVERS: string;
    JWT_SECRET: string;
}

const {error, value} = joi.object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.string().required(),
    JWT_SECRET: joi.string().required()
})
.unknown(true).validate(process.env)

const vars: Vars = {
    PORT: value.PORT,
    NATS_SERVERS: value.NATS_SERVERS,
    JWT_SECRET: value.JWT_SECRET
};
export const envs = {
    port: vars.PORT,
    nats_servers: vars.NATS_SERVERS,
    jwt_secret: vars.JWT_SECRET
}