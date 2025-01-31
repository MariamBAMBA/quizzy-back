import axios from 'axios';

describe('Auth - Signup (e2e)', () => {
  const baseURL = 'http://localhost:3000/api/auth/signup';

  it('should return status 201 and an access_token', async () => {
    const response = await axios.post(baseURL, {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
    });

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('access_token');
    expect(typeof response.data.access_token).toBe('string');
  });

  it('should return 409 if email is already in use', async () => {
    try {
      await axios.post(baseURL, {
        email: 'test@example.com', // Même email pour provoquer un conflit
        password: 'password123',
        username: 'testuser',
      });
    } catch (error) {
      expect(error.response.status).toBe(409);
      expect(error.response.data.message).toBe('Email déjà utilisé');
    }
  });

  it('should return 400 if input data is invalid', async () => {
    try {
      await axios.post(baseURL, {
        email: 'invalid-email',
        password: 'short',
        username: '',
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});
