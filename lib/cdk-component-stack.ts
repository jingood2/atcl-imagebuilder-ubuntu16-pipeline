import { Construct, Stack, StackProps, CfnOutput } from '@aws-cdk/core';
import { CfnComponent } from '@aws-cdk/aws-imagebuilder';

const path = require('path');
const fs = require('fs');

export class ComponentStack extends Stack {

    public readonly cfnComponent : CfnComponent;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const doc:string = fs.readFileSync( path.join(__dirname,'../','component/helloworld-document.yaml'), 'utf8');

        const component = new CfnComponent(this, "CdkComponentStack", {
            name: "atcl-ubuntu-component",
            description: "An example component that builds, validates and tests an image 2",
            platform: "Linux",
            version: "1.0.0",
            data: doc,
        });

        this.cfnComponent = component;
    }
}