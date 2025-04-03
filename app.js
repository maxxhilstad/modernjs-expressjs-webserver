const path = require('path')
const express = require('express')
const app = express()
const port = 3000

const root = path.join(__dirname, 'public')

const pokemon = [
    { id: 1, name: 'Bulbasaur', type: 'Grass' },
    { id: 2, name: 'Ivysaur', type: 'Grass' },
    { id: 3, name: 'Venusaur', type: 'Grass' },
    { id: 4, name: 'Charmander', type: 'Fire' },
    { id: 5, name: 'Charmeleon', type: 'Fire' },
    { id: 6, name: 'Charizard', type: 'Fire' },
    { id: 7, name: 'Squirtle', type: 'Water' },
    { id: 8, name: 'Wartortle', type: 'Water' },
    { id: 9, name: 'Blastoise', type: 'Water' },
]

// Allows us to send JSON
app.use(express.json())

// Allows us to respond with static webpages
app.use(express.static('public'))

app.get('/', (request, response) => {
    response.sendFile('index.html', { root })
})

app.get('/pokemon/:id', (request, response) => {
    response.sendFile('index.html', { root })
})

app.get('/type/:type', (request, response) => {
    response.sendFile('index.html', { root })
})

app.get('/api/v1/random-pokemon', (request, response) => {
    const r = Math.floor(Math.random() * 9)
    response.send(pokemon[r])
})

app.get('/api/v1/pokemon/:id', (request, response) => {
    const { id } = request.params

    const found = pokemon.find(p => p.id.toString() === id)

    if(found) response.send(found)
    else response.send({ error: { message: `Could not find Pokemon with id: ${id}` } })
})

app.get('/api/v1/random-pokemon/:type', (request, response) => {
    const { type } = request.params
    const found = pokemon.filter(p => p.type.toLowerCase() === type.toLowerCase())
    const r = Math.floor(Math.random() * found.length)

    if(found.length > 0) response.send(found[r])
    else response.send({ error: { message: `Could not find Pokemon with type: ${type}` } })
})

app.post('/api/v1/add', (request, response) => {
    const { id, name, type } = request.body
    console.log({ id, name, type })
    response.send('testing')
})

app.listen(port, () => console.log(`https://localhost:${port}/`))