import { Construct, Stage, StageProps } from '@aws-cdk/core';
import { ComponentStack } from './cdk-component-stack';
import { ImagebuilderRecipeStack } from './imagebuilder-recipe-stack';
import { ImagebuilderS3Stack } from './imagebuilder-s3-stack';
import { ImagebuilderPipelineStack } from './imagebuilder-pipeline-stack';

export class ApplicationStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const componentStack = new ComponentStack(this, 'ImagebuilderComponentStack');

        const recipeStack = new ImagebuilderRecipeStack(this, "ImagebuilderRecipeStack",{
            component: componentStack.cfnComponent
        });

        const s3Stack = new ImagebuilderS3Stack(this,"ImagebuilderS3BucketStack");

        new ImagebuilderPipelineStack(this, 'ImagebuilderPipelineStack',{
            recipeArn: recipeStack.recipeArn,
            loggingBucket: s3Stack.s3Bucket
        });

    }
}