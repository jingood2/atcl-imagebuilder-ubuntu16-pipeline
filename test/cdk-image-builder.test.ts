import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { ComponentStack } from '../lib/cdk-component-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ComponentStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
