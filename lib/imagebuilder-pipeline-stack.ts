import { Construct, Stack, StackProps, CfnResource, Lazy, Fn, CfnOutput } from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { AmazonLinuxGeneration } from '@aws-cdk/aws-ec2';
import { CfnImageRecipe, CfnComponent, CfnDistributionConfiguration, CfnInfrastructureConfiguration, CfnImage, CfnImagePipeline } from '@aws-cdk/aws-imagebuilder';
import { Role, ServicePrincipal, ManagedPolicy, CfnRole, CfnManagedPolicy, CfnInstanceProfile } from '@aws-cdk/aws-iam';
import { Bucket } from '@aws-cdk/aws-s3';

const path = require('path');
const fs = require('fs');

export interface RecipeStackProps extends StackProps {
    recipeArn: string,
    loggingBucket: Bucket
}

export class ImagebuilderPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props: RecipeStackProps) {
        super(scope, id, props);


       /*  const parentImage = new ec2.AmazonLinuxImage({
            generation: AmazonLinuxGeneration.AMAZON_LINUX_2
        });


        const recipe = new CfnImageRecipe(this,"DockerTestRecipe",{

        components: [
            //{ componentArn : Fn.getAtt(props?.componentId.value, "Arn").toString()},
            { componentArn: "arn:aws:imagebuilder:ap-northeast-2:aws:component/docker-ce-linux/1.0.0/1"},
            { componentArn: "arn:aws:imagebuilder:ap-northeast-2:aws:component/chrony-time-configuration-test/1.0.0/1"},
            { componentArn : props?.component.attrArn.toString()}
        ],
        name: 'InspectorTestImageRecipe',
        parentImage: parentImage.getImage(this).imageId,
        version: '1.0.1',
        }); */

        //recipe.addDependsOn(component); 

        /* const distconfig = new CfnDistributionConfiguration(this, "SampleDistConfiguration",{
            name: "ATCLSampleDistribution",
            description: "Copies AMI to ap-northeast-2 and exports to S3" ,
            distributions: [
                {
                    region: "ap-northeast-2",
                    amiDistributionConfiguration: {
                        name: 'Name ${imagebuilder:buildDate}',
                        description: "An example image name with parameter reference",
                        amiTags: {
                            name: "ATCL AMI"
                        },
                        launchPermission: {
                            userIds: [
                                "234730403556",
                            ]
                        }
                    }
                }
            ]
        });
        */

    
        const infraConfiguration =  new CfnInfrastructureConfiguration(this, "SampleInfraConfiguration",{
            name: "ATCLSampleInfrastructure",
            description: "An example that will retain instances of failed builds",
            instanceTypes: [
                "t3.small"
            ],
            instanceProfileName: "InstanceProfileRoleForImageBuilder", 
            securityGroupIds: [
                "sg-050b64bcd3355d213"
            ],
            subnetId: "subnet-0d7c3373862a46ab0",
            logging: {
                s3Logs : {
                    s3BucketName : props.loggingBucket.bucketName,
                    s3KeyPrefix: "imagebuilder" 
                }
            },
            terminateInstanceOnFailure : true
        });

        const pipeline =  new CfnImagePipeline(this,"InspectorTestImagePipeline",{
            imageRecipeArn: props.recipeArn,
            infrastructureConfigurationArn: infraConfiguration.attrArn,
            name: "inspector-test-linux-pipeline",
            /* schedule: {
                pipelineExecutionStartCondition: "EXPRESSION_MATCH_AND_DEPENDENCY_UPDATES_AVAILABLE",
                scheduleExpression: "* * * * *"
                
            }
 */         }); 


     }



}