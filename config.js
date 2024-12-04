import dotenv from "dotenv";
dotenv.config();

const config = {
    API_PORT : process.env.API_PORT || 3000,
    GRPC_PORT : process.env.GRPC_PORT || 4000,
};
export default config;