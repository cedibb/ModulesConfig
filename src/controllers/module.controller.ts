/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express';
import Module from '../services/module.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const moduleController = {
  async get(req: Request, res: Response) {
    try {
      const module = await Module.getSingle(+req.params.id);

      if (module === null) {
        res.sendStatus(404);
        return;
      }

      res.json(module);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          res.sendStatus(404);
        }
      }
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const modules = await Module.getAll();

      if ('server' in req.query && typeof req.query.server === 'string') {
        const imports: any = {};

        let response = {};

        switch (req.query.server) {
          case 'dev':
            modules.forEach((module) => {
              imports[String(module.Name)] = module.PathDEV;
            });
            break;
          case 'qa':
            modules.forEach((module) => {
              imports[String(module.Name)] = module.PathQA;
            });
            break;
          case 'swp':
            modules.forEach((module) => {
              imports[String(module.Name)] = module.PathSWP;
            });
            break;
          default:
            modules.forEach((module) => {
              imports[String(module.Name)] = module.PathPRD;
            });
            break;
        }
        response = {
          imports
        };

        res.json(response);
      } else {
        res.json(modules);
      }
    } catch (e) {
      res.json(e);
    }
  },

  async post(req: Request, res: Response) {
    try {
      const modules = await Module.register(req.body);
      res.status(201).json(modules);
    } catch (e) {
      res.sendStatus(500);
    }
  },

  async put(req: Request, res: Response) {
    try {
      const module = await Module.update(+req.params.id, req.body);
      res.json(module);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(500);
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const deleted = await Module.unregister(+req.params.id);
      res.json(deleted);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(500);
    }
  }
};

export default moduleController;
