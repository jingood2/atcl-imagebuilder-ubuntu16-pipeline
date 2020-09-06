
import { Construct, Stack, StackProps, SecretValue } from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { ApplicationStage } from './application-stage';

export class PipelinesStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const sourceArtifact = new codepipeline.Artifact();
        const cloudAssemblyArtifact = new codepipeline.Artifact();

        const pipeline = new CdkPipeline(this,'ImagebuilderPipeline',{

            // The pipeline name
            pipelineName: 'ImagebuilderPipieline',
            cloudAssemblyArtifact,
      
            // Where the source can be found
            sourceAction: new codepipeline_actions.GitHubSourceAction({
              actionName: 'Github',
              output: sourceArtifact,
              oauthToken: SecretValue.secretsManager('atcl/jingood2/github-token'),
              owner: 'jingood2',
              repo: 'atcl-imagebuilder-ubuntu16-pipeline',
              trigger: codepipeline_actions.GitHubTrigger.POLL
            }),
            synthAction: SimpleSynthAction.standardNpmSynth({
              sourceArtifact,
              cloudAssemblyArtifact,
              buildCommand: 'npm run build'
            })
          });
      
          pipeline.addApplicationStage(new ApplicationStage(this,'Deploy',{
            env: { account: '234730403556', region: 'ap-northeast-2' },
          }));

    }
}