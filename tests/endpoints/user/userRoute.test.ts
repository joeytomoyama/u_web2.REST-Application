const express = require('express')
const request = require('supertest')
const app = require('../../../src/httpServer')

let server: any

beforeAll(() => {
    server = app.listen(80); // Start the server
});

afterAll((done) => {
    server.close(done); // Close the server
});

describe('GET /publicUsers', () => {
    it('should return a list of applications', async () => {
        const res = await request(server).get('/api/publicUsers')
    //   expect(res.status).toBe(200)
    //   expect(res.body).toBeDefined()
        console.log(res)
      // Add more assertions as needed
    })
  })