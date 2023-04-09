import request from 'supertest';
import app from '../..';

describe('User Controller', () => {
  let accessToken: string;

  beforeAll(async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'testuser@example.com', password: 'password' });

    accessToken = response.body.access_token;
  });

  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('users');
      expect(Array.isArray(response.body.users)).toBe(true);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'password',
        firstName: 'New',
        lastName: 'User',
      };

      const response = await request(app)
        .post('/users')
        .send(userData)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toMatchObject({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
    });

    it('should return an error if email is missing', async () => {
      const userData = {
        password: 'password',
        firstName: 'New',
        lastName: 'User',
      };

      const response = await request(app)
        .post('/users')
        .send(userData)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('email');
    });
  });
});
function beforeAll(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}

