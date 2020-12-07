import express = require('express');
import cookieSession = require('cookie-session')

declare module 'express' {
    interface Request {
        session: cookieSession.Session<{ userId: number}>;
        sessionOptions: cookieSession.Options;
        databaseConnection;
    }
}