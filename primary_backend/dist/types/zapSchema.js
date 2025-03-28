"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapCreateSchema = void 0;
const zod_1 = require("zod");
exports.zapCreateSchema = zod_1.z.object({
    availabletriggerId: zod_1.z.string(),
    triggerMetadata: zod_1.z.any().optional(),
    actions: zod_1.z.array(zod_1.z.object({
        availableactionId: zod_1.z.string(),
        actionMetadata: zod_1.z.any().optional()
    }))
});
/**
 *
 * {
 "availabletriggerId": "webhook",
    "triggerMetadata":"",
    "actions": [{
        "availableactionId": "bounty",
        "actionMetadata": ""
    }]
}
 */ 
