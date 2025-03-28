"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.authmiddleware, (req, res) => {
    console.log(req.body);
    res.send('Zap received');
});
router.get('/zaps', auth_1.authmiddleware, (req, res) => {
    console.log(req.body);
    res.send('Zap received');
});
router.get('/:zapId', auth_1.authmiddleware, (req, res) => {
    console.log(req.body);
    res.send('Zap received');
});
exports.zapRouter = router;
