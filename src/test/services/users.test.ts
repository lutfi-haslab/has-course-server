import { beforeEach, describe, expect, it } from 'bun:test';
import { UserSchema } from '../../entities/models/user';
import { UsersService } from '../../services/users';

// Mock the Context
const createMockContext = () => {
    return {
        get: (key: string) => {
            if (key === 'supabaseClient') {
                return {
                    from: () => ({
                        select: async () => ({
                            data: [UserSchema.parse({})],
                            error: null,
                            count: 0,
                            status: 200,
                        })
                    }),
                };
            }
            if (key === 'parentSpan') {
                return null; // You can return a mock parentSpan if needed
            }
        },
    } as any;
};

describe('UsersService', () => {
    let mockContext: any;

    beforeEach(() => {
        mockContext = createMockContext();
    });

    it('should return users matching the schema', async () => {
        const usersService = UsersService(mockContext);
        const users = await usersService.getUsers();
        users.forEach(user => {
            const parsedUser = UserSchema.safeParse(user);
            expect(parsedUser.success).toBe(true);
        });

        expect(users.length).toBeGreaterThanOrEqual(0);
    });
});
