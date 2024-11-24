"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Example route to trigger an error
app.get('/error', (req, res, next) => {
    // Simulate an error
    next(new Error('Something went wrong!'));
});
// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message); // Log the error (optional)
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});
// app.use('/api/');
app.get('/', (req, res) => {
    res.send("Hello i'm alive");
});
exports.default = app;
