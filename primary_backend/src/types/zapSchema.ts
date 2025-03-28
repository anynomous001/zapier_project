import { z } from 'zod';


export const zapCreateSchema = z.object({
    availabletriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableactionId: z.string(),
        actionMetadata: z.any().optional()
    }))



})

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