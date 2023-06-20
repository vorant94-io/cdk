import fs from 'fs';
import path from 'path';
import {config} from "dotenv";
import {SpinUpFailed} from "../shared/error";
import joi from 'joi';

export function createEnv(): Env {
  const isDotenvPresent = fs.existsSync(path.resolve('./.env'));
  if (isDotenvPresent) {
    const { error } = config();
    if (error != null) {
      throw new SpinUpFailed(error.message);
    }
  }

  const { value, error } = joi
      .object<Env, true>({
        CDK_ENV: joi.string().allow('DEV', 'PROD').required(),
        AWS_REGION: joi.string().when('NODE_ENV', {
          is: 'DEV',
          then: joi.optional().default('eu-central-1'),
          otherwise: joi.required(),
        }),
      })
      .options({ stripUnknown: true })
      .validate(process.env);
  if (error != null) {
    throw new SpinUpFailed(error.message);
  }

  return value;
}

export type NodeEnv = 'DEV' | 'PROD';

export interface Env {
  CDK_ENV: NodeEnv;
  AWS_REGION: string;
}
