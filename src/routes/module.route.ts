import express from 'express';
import moduleController from '../controllers/module.controller';
import {
  idInput,
  serverInput,
  createModuleInput,
  updateModuleInput
} from '../schemas/module.schema';
import validateInput from '../middleware/validateInput';

const moduleRoute = express.Router();

moduleRoute.get('/', validateInput(serverInput), moduleController.getAll);

moduleRoute.post('/', validateInput(createModuleInput), moduleController.post);

moduleRoute.get('/:id', validateInput(idInput), moduleController.get);

moduleRoute.put('/:id', validateInput(updateModuleInput), moduleController.put);

moduleRoute.delete('/:id', validateInput(idInput), moduleController.delete);

export default moduleRoute;
