"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const data_source_1 = require("./data-source");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize();
    console.log("Connected to PostgreSQL");
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolver_1.UserResolver]
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema
    });
    yield server.start();
    const app = (0, express_1.default)();
    server.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("Server running on http://localhost:4000/graphql");
    });
});
main().catch(console.error);
//# sourceMappingURL=index.js.map