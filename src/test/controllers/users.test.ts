import { describe, expect, test } from 'bun:test';
import app from "../../api/routes";
import { UserSchema } from "../../entities/models/user";

describe('Should return many users', () => {
    test('GET /api/users', async () => {
        const res = await app.request('/api/users', { method: 'GET' });
        const users = await res.json();

        expect(res.status).toBe(200);
        expect(Array.isArray(users)).toBe(true); 

        users.forEach((user: any) => {
            const parsedUser = UserSchema.safeParse(user);
            expect(parsedUser.success).toBe(true); 
        });
    });
});