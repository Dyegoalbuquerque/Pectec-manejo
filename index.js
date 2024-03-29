import express from 'express';
import uplRoute from './routers/upl-router';
import ucRoute from './routers/uc-router';
import utRoute from './routers/ut-router';
import estoqueRoute from './routers/estoque-router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

let router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/api/manejos', uplRoute);
router.use('/api/manejos', ucRoute);
router.use('/api/manejos', utRoute);
router.use('/api/estoques', estoqueRoute);

export default router;
