import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '@core/constants/public-route.constants';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
