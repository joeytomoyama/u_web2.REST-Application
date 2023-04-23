"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TestRoutes_1 = __importDefault(require("./endpoints/test/TestRoutes"));
const app = (0, express_1.default)();
const port = 8080;
app.use('/', TestRoutes_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cFNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2h0dHBTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBNkI7QUFFN0IsNkVBQW9EO0FBRXBELE1BQU0sR0FBRyxHQUFvQixJQUFBLGlCQUFPLEdBQUUsQ0FBQTtBQUN0QyxNQUFNLElBQUksR0FBVyxJQUFJLENBQUE7QUFFekIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsb0JBQVUsQ0FBQyxDQUFBO0FBRXhCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ3BFLENBQUMsQ0FBQyxDQUFBIn0=