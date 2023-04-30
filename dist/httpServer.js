"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Database_1 = require("./db/Database");
const UserRoute_1 = __importDefault(require("./endpoints/user/UserRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, Database_1.startDB)();
app.use(express_1.default.json());
app.use('/api/publicUsers', UserRoute_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cFNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2h0dHBTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBNkI7QUFDN0Isb0RBQTJCO0FBRTNCLDRDQUF1QztBQUV2QywyRUFBa0Q7QUFFbEQsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUVmLE1BQU0sR0FBRyxHQUFvQixJQUFBLGlCQUFPLEdBQUUsQ0FBQTtBQUN0QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtBQUU3QixJQUFBLGtCQUFPLEdBQUUsQ0FBQTtBQUVULEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBRXZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsbUJBQVMsQ0FBQyxDQUFBO0FBRXRDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ3BFLENBQUMsQ0FBQyxDQUFBIn0=