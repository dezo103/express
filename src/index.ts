import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3000

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const addresses = [{id: 1, value: 'Sukhaya 35'}, {id: 2, value: 'Mira 2'}]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)


app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }
})
app.get('/products/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id)

    if (product) {
        res.send(product)
    } else {
            res.send(404)
        }
})
app.get('/addresses', (req: Request, res: Response) => {
    if (req.query.value) {
        let searchString = req.query.value.toString();
        res.send(addresses.filter(p => p.value.indexOf(searchString) > -1))
    } else {
        res.send(addresses)
    }
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    let address = addresses.find(a => a.id == +req.params.id)
    if (address) {
        res.send(address)
        } else {
                res.send(404)
    }
})

app.delete('/addresses/:id', (req: Request, res: Response) => {
    for (let i = 0; i < addresses.length; i++ ) {
        if (addresses[i].id === +req.params.id) {
            addresses.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

app.post('/addresses', (req: Request, res: Response) => {
    const newAddress = {
        id: + new Date(),
        value: req.body.value
    }
    addresses.push(newAddress)

    res.status(201).send(newAddress)
})

app.put('/addresses/:id', (req: Request, res: Response) => {
    let address = addresses.find(a => a.id == +req.params.id)
    if (address) {
        address.value = req.body.value
        res.send(address)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})