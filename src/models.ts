import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

export const {
  dataSource: DataSource,
  dataSourceField: DataSourceField,
  dataSourceModuleType: DataSourceModuleType,
  dataSourceModule: DataSourceModule,
  product: Product,
  seller: Seller,
  sellsEntry: SellsEntry,
  user: User
} = prisma;
