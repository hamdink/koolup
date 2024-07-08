// adminResto.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Admin = () => SetMetadata('roles', ['admin']);
export const Resto = () => SetMetadata('roles', ['resto']);
