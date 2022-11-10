import {Request, Response, Router} from "express";


const addresses = [{id: 1, value: 'Sukhaya 35'}, {id: 2, value: 'Mira 2'}]

export const addressesRouter = Router({});

addressesRouter.get('/', (req: Request, res: Response) => {
    if (req.query.value) {
        let searchString = req.query.value.toString();
        res.send(addresses.filter(p => p.value.indexOf(searchString) > -1))
    } else {
        res.send(addresses)
    }
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    let address = addresses.find(a => a.id == +req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})
addressesRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < addresses.length; i++ ) {
        if (addresses[i].id === +req.params.id) {
            addresses.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})
addressesRouter.post('/', (req: Request, res: Response) => {
    const newAddress = {
        id: + new Date(),
        value: req.body.value
    }
    addresses.push(newAddress)

    res.status(201).send(newAddress)
})
addressesRouter.put('/:id', (req: Request, res: Response) => {
    let address = addresses.find(a => a.id == +req.params.id)
    if (address) {
        address.value = req.body.value
        res.send(address)
    } else {
        res.send(404)
    }
})