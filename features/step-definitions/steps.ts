import 'expect-webdriverio';

import { Given, Then, When } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight } from '@serenity-js/core';

import { ExecuteScript, LastScriptExecution, Navigate } from '@serenity-js/web';
import { Authenticate, VerifyAuthentication } from '../../test/authentication';
import { PickExample } from '../../test/examples';
import { Ensure } from '@serenity-js/assertions/lib/Ensure';
import { equals } from '@serenity-js/assertions';

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
        Navigate.to(`http://localhost:9005${localPath}`),
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
Then('{pronoun} should see that authentication has {word}', async (pronoun, expectedOutcome ) =>
    actorInTheSpotlight().attemptsTo(
        VerifyAuthentication[expectedOutcome](),
    )
);

Then('{pronoun} should see that {string} has value', async (pronoun, theObjectString: string, theValue: string) =>{
    console.log('<+++ objectString  ++>',theValue);
    const theObject = JSON.parse(theValue);
    console.log('<+++ the parsed object :', theObject);

    actorInTheSpotlight().attemptsTo(
        ExecuteScript.async(() => {
            return {
                theFoodie: window.foodieObject
            }
          }),
        Ensure.that(LastScriptExecution.result<{ theFoodie: string}>().theFoodie, equals(theValue)),
    );
    console.log('<--- the field --->',LastScriptExecution.result<{ theFoodie: string}>().theFoodie);
}
);

