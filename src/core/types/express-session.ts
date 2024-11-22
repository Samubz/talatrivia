import { ISession } from '@src/auth/domain/token-payload.domain';
import { Request } from 'express';
export type ExpressRequest = Request & { session: ISession };