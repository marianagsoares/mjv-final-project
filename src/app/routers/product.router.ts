import { Request, Response, Router } from "express";
import productService from "../services/product.service";
import { auth } from '../middleware/auth.middleware';
const { authPage } = require('../middleware/permission.middleware');

const router = Router();

router.use(auth);

router.get('/',  authPage(["Administrador", "Colaborador"]), async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        return res.send(products);
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

router.get('/:code', authPage(["Administrador", "Colaborador"]), async (req: Request, res: Response) => {
    const { code } = req.params;

    try {
        const product = await productService.getProductByCode(code);
        return res.send(product);
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

router.post('/', authPage(["Administrador"]), async (req: Request, res: Response) => {
    try {
        const productCreated = await productService.createProduct(req.body);
        
        return res.status(201).send(productCreated);
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

router.put('/:id', authPage(["Administrador"]), async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const productUpdated = await productService.updateProduct(id, req.body);

        res.send(productUpdated);
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

router.delete('/:id', authPage(["Administrador"]), async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await productService.deleteProduct(id);

        return res.status(204).send();
    } catch (error: any) {
        return res.status(error.getStatusCode()).send({ message: error.message });
    }
});

export default router;