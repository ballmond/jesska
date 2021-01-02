const Router = require('./router')
const sanitizeHtml = require('sanitize-html')

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handler(request) {
    const formData = await request.json()
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify({
        text: formData.text,
        clean: sanitizeHtml(formData.text),
    })
    return new Response(body, init)
}

async function handlerSanitize(request) {
    const formData = await request.json()
    const init = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'content-type': 'application/json',
        },
    }
    const body = JSON.stringify({
        text: formData.text,
        clean: sanitizeHtml(formData.text),
    })
    return new Response(body, init)
}

async function handleRequest(request) {
    const r = new Router()
    // Replace with the appropriate paths and handlers
    r.get('.*/bar', () => new Response('responding for /bar'))
    r.get('.*/foo', request => handler(request))
    r.post('.*/foo.*', request => handler(request))
    r.get('/demos/router/foo', request => fetch(request)) // return the response from the origin

    r.get('/', () => new Response('Hello worker!')) // return a default message for the root route

    r.post('/sanitize', request => handlerSanitize(request))

    r.options(
        '.*/*',
        () =>
            new Response('', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            })
    )

    const resp = await r.route(request)
    return resp
}
