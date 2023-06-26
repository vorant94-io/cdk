#!/usr/bin/env node
import 'source-map-support/register';
import { Vorant94IoStack } from '../lib/vorant94-io-stack';
import { App } from 'aws-cdk-lib';
import { createEnv } from '../lib/core';

const env = createEnv();

const app = new App({
  context: { env },
});

new Vorant94IoStack(app, `vorant94-io--${env.NODE_ENV}`, {
  env: {
    region: env.AWS_REGION,
  },
});
