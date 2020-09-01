#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkImageBuilderStack } from '../lib/cdk-image-builder-stack';

const app = new cdk.App();
new CdkImageBuilderStack(app, 'CdkImageBuilderStack');
