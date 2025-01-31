import axios from 'axios';


describe('GET /api/ping', () => {
  it('should return status OK and database status OK', async () => {
      const response = await axios.get('http://localhost:3000/api/ping');
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('OK');
      expect(response.data.details.database).toBe('OK');
  });
});

