const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const protect = require('../middleware/auth.middleware');

const app = express();

app.get('/protected', protect, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

beforeAll(() => {
    process.env.JWT_SECRET = 'test-jwt-secret';
});

describe('Authentication middleware', () => {
    test('returns 401 when no token is provided', async () => {
        const response = await request(app).get('/protected');

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe(
            'Authentication token is required.'
        );
    });

    test('returns 401 when the token is invalid', async () => {
        const response = await request(app)
            .get('/protected')
            .set('Authorization', 'Bearer invalid-token');

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe(
            'Invalid or expired authentication token.'
        );
    });

    test('allows access when the token is valid', async () => {
        const token = jwt.sign(
            { id: 'test-user-id' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const response = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.user.id).toBe('test-user-id');
    });
});