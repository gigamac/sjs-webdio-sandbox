Feature: querying a mock page

  In order to learn how to use Serenity/JS with Cucumber and WebdriverIO
  As a Curious Developer
  I'd like to see an example

  Background:
    Given Arthur opens "/mockpage"

  Scenario Outline: Opening a mock page to check a js

    Then he should run a script to retrieve object "<objectKey>" with "<value>"

    #    And he should see the object has value "<value>"

    Examples:
      | objectKey               | value  |
      | foodieObject.menu.carbs | potato |
      | foodieObject.menu.carbs | gnocci |

  Scenario Outline: Opening a mock page passing an object to check a js

    Then he should run a script to retrieve object "<objectKey>" with:
      """
      {
        "prots": "butterbeans",
        "carbs": "<carb>",
        "veg": "broccoli"
      }
      """

    #    And he should see the object has value "<value>"

    Examples:
      | objectKey         | carb |
      | foodieObject.menu | gnocci|
      | foodieObject.menu | potato|
