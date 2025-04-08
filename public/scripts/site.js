(async () => {

const h2 = document.querySelector('h2')
const h3 = document.querySelector('h3')

const { pathname } = window.location
const [ , searchType, id ] = pathname.split('/')

const url = (() => {
    // searchType === 'pokemon'
    // ? `/api/v1/pokemon/${id}`
    // : '/api/v1/random-pokemon'
    if (searchType === 'pokemon') return `/api/v1/pokemon/${id}`
    if (searchType === 'type') return `/api/v1/pokemon/random/${id}`
    return '/api/v1/pokemon/random'
})()

const result = await fetch(url)
const { name, type } = await result.json()

h2.textContent = name
h3.textContent = type



})()