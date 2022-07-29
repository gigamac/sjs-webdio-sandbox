import 'expect-webdriverio';

import { Given, Then, When } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight } from '@serenity-js/core';

import { ExecuteScript, LastScriptExecution, Navigate, Page } from '@serenity-js/web';
import { Authenticate, VerifyAuthentication } from '../../test/authentication';
import { PickExample } from '../../test/examples';
import { Ensure } from '@serenity-js/assertions/lib/Ensure';
import { equals } from '@serenity-js/assertions/lib/expectations/equals';
import { isTrue, includes } from '@serenity-js/assertions';
import _ = require('lodash');
import { isEqual } from 'lodash';
/**
 * Below step definitions use Cucumber Expressions
 * see: https://cucumber.io/docs/cucumber/cucumber-expressions/
 *
 * {actor} and {pronoun} are custom expressions defined under support/parameters.ts
 */
Given('{actor} starts with the {string} example', async (actor: Actor, exampleName: string) =>
    actor.attemptsTo(
        Navigate.to('/'),
        PickExample.called(exampleName),
    )
);

Given('{actor} opens {string}', async (actor: Actor, localPath: string) =>
    actor.attemptsTo(
        Navigate.to(localPath),
    )
);

//    When she logs in using "<username>" and "<password>"
When('{pronoun} log(s) in using {string} and {string}', async (actor: Actor, username: string, password: string) =>
    actor.attemptsTo(
        Authenticate.using(username, password),
    )
);

/**
 * If you need to use a RegExp instead of Cucumber Expressions like {actor} and {pronoun}
 * you can use actorCalled(name) and actorInTheSpotlight() instead
 *
 *  see: https://serenity-js.org/modules/core/function/index.html#static-function-actorCalled
 *  see: https://serenity-js.org/modules/core/function/index.html#static-function-actorInTheSpotlight
 */
Then('{pronoun} should see that authentication has {word}', async (pronoun, expectedOutcome) =>
    {actorInTheSpotlight().attemptsTo(
        VerifyAuthentication[expectedOutcome](),
    )}
);

Then('{pronoun} should run a script', (pronoun)=>
    actorInTheSpotlight().attemptsTo(
        ExecuteScript.sync(`return { theValue: foodieObject.menu.carbs}`),
        Ensure.that(LastScriptExecution.result<{ theValue: string }>().isPresent(), isTrue())
    )
);

Then('{pronoun} should see that {string} has value', (pronoun, theObjectString: string, expectedValue: string) => {
    // console.log('<+++ objectString  ++>', `return {theValue: ${theObjectString}`);
    actorInTheSpotlight().attemptsTo(
        Ensure.that(LastScriptExecution.result<{ theValue: string }>().theValue, equals(expectedValue)),
    );
}
);

