"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = require("./router");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/online_planner", router_1.routers);
const start = async () => {
    try {
        await mongoose_1.default.connect('mongodb+srv://olgrachov:VjtIGuwf68FGecIf@cluster0.bkuqaxn.mongodb.net/online_planner?retryWrites=true&w=majority');
        console.log("MONGO_DB - connected");
        app.listen(PORT, () => {
            console.log(`server listening on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log("SERVER ERROR =>", error);
    }
};
start();
//# sourceMappingURL=index.js.map