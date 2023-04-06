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

router.get('/:code', async (req: Request, res: Response) => {
    const { code } = req.params;

    try {
        const product = await productService.getProductByCode(code);
        return res.send(product);
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

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const productUpdated = await productService.updateProduct(id, req.body);

        res.send(productUpdated);
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await productService.deleteProduct(id);

        return res.status(204).send();
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

export default router;