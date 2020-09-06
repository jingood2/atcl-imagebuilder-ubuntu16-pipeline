import { stringToCloudFormation, Stack, StackProps } from "@aws-cdk/core";
import { Construct } from '@aws-cdk/core';
import { Bucket } from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";

export class ImagebuilderS3Stack extends Stack {
    public readonly s3Bucket: Bucket;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props );

        this.s3Bucket = new Bucket(this, 'MyBucket',{
            bucketName: "atcl-imagebuilder-bucket",
            publicReadAccess: false
        });

        /* const policy = new iam.PolicyStatement();
        policy.addActions('s3:PutObject');
        policy.addResources(this.s3Bucket.bucketArn + "/*")
        policy.addPrincipals(new iam.ServicePrincipal("*.amazonaws.com"));
        //                                new iam.ServicePrincipal("imagebuilder.amazonaws.com"));

        this.s3Bucket.addToResourcePolicy(policy);
 */
     }

}