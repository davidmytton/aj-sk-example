// lib/server/arcjet/index.ts

import { ARCJET_KEY } from '$env/static/private';
import arcjet, { detectBot, shield, slidingWindow, validateEmail } from '@arcjet/sveltekit';

export const middleware_aj = arcjet({
    key: ARCJET_KEY,
    rules: [
        shield({
            mode: 'LIVE'
        }),
        detectBot({
            mode: 'LIVE',
            allow: ['CATEGORY:SEARCH_ENGINE']
        }),
        slidingWindow({
            mode: 'LIVE',
            interval: 15,
            max: 25
        })
    ]
});

export const email_aj = arcjet({
    key: ARCJET_KEY,
    rules: [
        validateEmail({
            mode: "LIVE",
            deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS", "FREE"],
        }),
    ],
});