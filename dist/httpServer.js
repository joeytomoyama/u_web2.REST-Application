"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Database_1 = require("./db/Database");
const TestRoutes_1 = __importDefault(require("./endpoints/test/TestRoutes"));
// import { start } from 'repl'
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, Database_1.startDB)();
// app.use(express.json())
app.use('/', TestRoutes_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cFNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2h0dHBTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBNkI7QUFDN0Isb0RBQTJCO0FBRzNCLDRDQUF1QztBQUV2Qyw2RUFBb0Q7QUFDcEQsK0JBQStCO0FBRS9CLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7QUFFZixNQUFNLEdBQUcsR0FBb0IsSUFBQSxpQkFBTyxHQUFFLENBQUE7QUFDdEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUE7QUFFN0IsSUFBQSxrQkFBTyxHQUFFLENBQUE7QUFFVCwwQkFBMEI7QUFFMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsb0JBQVUsQ0FBQyxDQUFBO0FBRXhCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ3BFLENBQUMsQ0FBQyxDQUFBIn0=