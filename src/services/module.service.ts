import prisma from '../db/prisma';
import {
  CreateModuleInputType,
  UpdateModuleInputType
} from '../schemas/module.schema';

const moduleService = {
  async register(data: CreateModuleInputType) {
    const registeredModule = await prisma.microfrontmodules.create({ data });
    return registeredModule;
  },

  async getSingle(Id: number) {
    const singleModule = await prisma.microfrontmodules.findUnique({
      where: { Id }
    });
    return singleModule;
  },

  async getAll(names: string[] = []) {
    let queryArgs = {};
    if (names.length > 0)
      queryArgs = {
        where: {
          Name: { in: names }
        }
      };
    const modules = await prisma.microfrontmodules.findMany(queryArgs);
    return modules;
  },

  async update(Id: number, data: UpdateModuleInputType) {
    const updatedModule = await prisma.microfrontmodules.update({
      where: { Id },
      data
    });
    return updatedModule;
  },

  async unregister(Id: number) {
    const unregisteredModule = await prisma.microfrontmodules.delete({
      where: { Id }
    });
    return unregisteredModule;
  }
};

export default moduleService;
