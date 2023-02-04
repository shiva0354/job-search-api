import request from 'supertest';
import app from '../src/app.js';

describe('Sample Test', () => {

    it('should test that true === true', async () => {
        const res = await request(app).get('/jobs')
        expect(true).toBe(true)
    })
    
})