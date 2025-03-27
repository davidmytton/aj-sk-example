import { redirect, type Handle } from '@sveltejs/kit';
import { middleware_aj } from '$lib/server/arcjet';
import { sequence } from '@sveltejs/kit/hooks';

const middleware: Handle = async ({ event, resolve }) => {

    const path = event.url.pathname;

    const decision = await middleware_aj.protect(event);

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            return redirect(303, '/rate-limited?redirect=' + path);
        }
        //,,,
    }

    console.log("Arcjet ID: " + decision.id);

    // ...
    return resolve(event);
};

export const handle = sequence(middleware);