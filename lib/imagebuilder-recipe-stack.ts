import * as cdk from '@aws-cdk/core';
import * as ib from '@aws-cdk/aws-imagebuilder';
import * as ec2 from '@aws-cdk/aws-ec2';
import { version } from 'process';
import { AmazonLinuxGeneration } from '@aws-cdk/aws-ec2';
import { StackProps, PhysicalName } from '@aws-cdk/core';
import { CfnComponent } from '@aws-cdk/aws-imagebuilder';

const path = require('path');
const fs = require('fs');

export interface ComponentStackProps extends StackProps {
    component: CfnComponent
}

export class ImagebuilderRecipeStack extends cdk.Stack {

  public readonly recipeArn: string;

  constructor(scope: cdk.Construct, id: string, props?: ComponentStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // 01. create component

    // 02. create recipe
    /* const parentImage = new ec2.AmazonLinuxImage({
      generation: AmazonLinuxGeneration.AMAZON_LINUX_2
    });
 */
    const recipe = new ib.CfnImageRecipe(this,"ATCL-UBUNTU16-RECIPE",{
      components: [
        //{ componentArn : Fn.getAtt(props?.componentId.value, "Arn").toString()},
        { componentArn: "arn:aws:imagebuilder:ap-northeast-2:aws:component/docker-ce-ubuntu/1.0.0/1"},
        { componentArn : props?.component.attrArn.toString()}
      ],      
      name: 'atcl-ubuntu-16-Recipe',
      parentImage: "arn:aws:imagebuilder:ap-northeast-2:aws:image/ubuntu-server-16-lts-x86/2020.8.17",
      version: '1.0.0',
    });

    this.recipeArn = recipe.attrArn;

  }
}
