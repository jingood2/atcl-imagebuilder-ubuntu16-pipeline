#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ImagebuilderRecipeStack } from '../lib/imagebuilder-recipe-stack';
import { ComponentStack } from '../lib/cdk-component-stack';
import { ImagebuilderPipelineStack } from '../lib/imagebuilder-pipeline-stack';
import { ImagebuilderS3Stack } from '../lib/imagebuilder-s3-stack';
import { PipelinesStack } from '../lib/pipelines-stack';

const app = new cdk.App();
/* const componentStack = new ComponentStack(app, 'ImagebuilderComponentStack');

const recipeStack = new ImagebuilderRecipeStack(app, "ImagebuilderRecipeStack",{
    component: componentStack.cfnComponent
});

const s3Stack = new ImagebuilderS3Stack(app,"ImagebuilderS3BucketStack");

new ImagebuilderPipelineStack(app, 'ImagebuilderPipelineStack',{
    recipeArn: recipeStack.recipeArn,
    loggingBucket: s3Stack.s3Bucket
});
 */

 new PipelinesStack(app, "ImagebuilderPipelineStack",{
    env: {
        account: '234730403556',
        region: 'ap-northeast-2'
    }
 })