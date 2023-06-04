import {readFile} from 'fs/promises';

const filePath = new URL('../storage/product_list.json', import.meta.url);
// All product list
const productJson = JSON.parse(await readFile(filePath, 'utf8'));

// Get all products
export const getAll = (req, res) => {
    res.status(200).json(productJson);
};

// Get product by shopId and productId
export const getProductById = (req, res) => {
    const params = req.params;
    const shop = productJson.find(shop => shop.shopId === params.shopId);
    let productResult = {};
    if (shop) {
        productResult = shop.shopMenu.find(product => product.productId === parseInt(params.productId)) ?? {message: "No product found"};
    }
    res.status(200).json(productResult);
};
