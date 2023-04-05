import { Request, Response, Router } from "express";
import productService from "../services/product.service";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        return res.send(products);
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const productCreated = await productService.createProduct(req.body);

        return res.status(201).send(productCreated);
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

export default router;