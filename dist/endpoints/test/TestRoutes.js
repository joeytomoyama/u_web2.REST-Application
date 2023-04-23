"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.get('/json', (req, res) => {
    res.json('Hallo');
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VuZHBvaW50cy90ZXN0L1Rlc3RSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBNkI7QUFFN0IsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUUvQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBQzVCLENBQUMsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNyQixDQUFDLENBQUMsQ0FBQTtBQUVGLGtCQUFlLE1BQU0sQ0FBQSJ9