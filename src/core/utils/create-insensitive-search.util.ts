import { Prisma } from '@prisma/client';

export const createInsensitiveSearch = (
  property: string,
  searchText: string,
):
  | { [key: string]: Prisma.StringNullableFilter | Prisma.StringFilter }
  | object => {
  return searchText.length
    ? { [property]: { contains: searchText, mode: 'insensitive' } }
    : {};
};
