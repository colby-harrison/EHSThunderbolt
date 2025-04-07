// middleware.ts | DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
// if you do not know what is going on in this file without comments
// you should not be messing with this file

import { clerkMiddleware } from '@clerk/astro/server';

export const onRequest = clerkMiddleware();
