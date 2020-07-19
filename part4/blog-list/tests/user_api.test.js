const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('4.16 adding new user', () => {
    test('creation fails when username missing', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
            username: '',
            name: 'admin',
            password: 'password',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
  
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails when password missing', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
            username: 'admin',
            name: 'admin',
            password: '',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
  
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails when username length is less than 3', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
            username: 'a',
            name: 'admin',
            password: 'password',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
  
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails when password length is less than 3', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
            username: 'admin',
            name: 'admin',
            password: 'p',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
  
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})