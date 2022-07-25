const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const item = require("../fakeDb")

router.get('/', function (req, res){
    res.json(item)
})

router.post('/', function (req, res, next){
    try{
        if(!req.body.name && !req.body.price) 
        throw new ExpressError("Please enter item name or price", 400)
        const newItem = { 
        name: req.body.name,
        price: req.body.price
        }
        item.push(newItem)
        res.status(201).json(`added: ${{ item: newItem } }`)
    }catch(e) {
        next(e)
    }
})

router.get('/:name', (req, res) => {
    const list = item.find( items => (items.name, items.price) === (req.params.name, req.items.price));
    if(list === undefined){
        throw new ExpressError("Not on list", 404)
    }
    res.json({ items: list})
})

router.patch("items/:name", (req, res) => {
    const list = item.find( items => (items.name,items.price) === (req.params.name, req.params.name));
    if(list === undefined){
    throw new ExpressError("Not on list", 404)
    }
    list.name =req.body.name
    list.price = req.body.list
    res.json({ items: list })
})

router.delete("/:name", (req, res) => {
    const list = item.find( items => (items.name,items.price) === (req.params.name, req.params.name));
        if(list === undefined){
        throw new ExpressError("Not on list", 404)
    }

    items.splice(list, 1)
    res.json({message: "Deleted"})
})

module.exports = router;
