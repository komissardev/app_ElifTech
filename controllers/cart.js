import {
    readFile,
    writeFile
} from 'fs/promises';

const filePath = new URL('../storage/carts.json', import.meta.url);
// All carts list
const cartJson = JSON.parse(await readFile(filePath, 'utf8'));

// Get all carts
export const getAll = (req, res) => {
    res.status(200).json(cartJson);
};

export const updateCart = (req, res) => {
    console.log(req.body);
    const params = req.body;
    // Find cart in storage
    let cart = cartJson.find(cart => cart.cartId === params.cartId);
    console.log(cart)
    if (cart) {
        const index = cartJson.findIndex(item => item.cartId === params.cartId);
        cartJson.splice(index, 1);
        cartJson.push(req.body);
        writeFile(filePath, JSON.stringify(cartJson), 'utf8');
    } else {
        cartJson.push(req.body);
        writeFile(filePath, JSON.stringify(cartJson), 'utf8');
    }

    res.status(200).json(params.cartId);
};