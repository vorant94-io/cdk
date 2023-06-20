#!/usr/bin/env node
import 'source-map-support/register';
import { CloudStack } from '../lib/cloud-stack';
import {App} from "aws-cdk-lib";
import {createEnv} from "../lib/core";

const env = createEnv();

const app = new App({
  context: {env}
});

new CloudStack(app, `vorant94-io--${env.CDK_ENV}`, {
  env: {
    region: env.AWS_REGION
  }
});
