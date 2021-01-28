'use strict'

const Product = require('../models/product');

function getProducts(req, res) {
    Product.find({}, (err, product) => {
        if(err) return res.status(500).send({ message: `Error al realizar peticion => ${err}` });
        if(!product) return res.status(400).send({ message: 'No existen productos' });
        
        res.status(200).send({ product });
    });
}

function getProduct(red, res) {
    let productId = req.params.producId;

    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).send({ message: `Error al realizar peticion => ${err}` });
        if(!product) return res.status(400).send({ message: 'El producto no existe' });

        res.status(200).send({ product });
    });
}

function saveProduct(req, res) {
    console.log('POST /api/product');
    console.log(req.body);

    let product = new Product();

    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, productStore) => {
        if(err) res.status(err).send({ message: `Error al guardar en la base de datos => ${err}` });

        res.status(200).send({ product: productStore });
    });
}

function updateProduct(req, res) {
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
        if(err) res.status(500).send({ message: 'Error al actualizar el producto' });

        res.status(200).send({product: productUpdate});

    });
}

function deleteProduct(req, res) {
    let productId = req.params.productId;

    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).send({ message: `Error al realizar peticion => ${err}` });
        if(!product) return res.status(400).send({ message: 'El producto no existe' });

        product.remove( err => {
            if(err) return res.status(500).send({ message: `Error al realizar peticion => ${err}` });
            res.status(200).send({ message: 'Producto eliminado correctamente' });
        });

    });
}

module.exports = {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}