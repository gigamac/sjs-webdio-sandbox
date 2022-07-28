Feature: querying a mock page

  In order to learn how to use Serenity/JS with Cucumber and WebdriverIO
  As a Curious Developer
  I'd like to see an example

  Background:
    Given Arthur opens "/mockpage"

  Scenario Outline: Opening a mock page to check a js

    ["The Internet"](https://the-internet.herokuapp.com/) is an example application
    that captures prominent and ugly functionality found on the web.
    Perfect for writing automated acceptance tests against 😎

    Note: With **Serenity/JS** you can use [Markdown](https://en.wikipedia.org/wiki/Markdown)
    to better describe each `Feature` and `Scenario`.

    Then he should see that "<object>" has value
      """
      <value>
      """

    Examples:
      | object                  | value  |
      | foodieObject.menu.carbs | potato |
