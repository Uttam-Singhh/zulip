"use strict";

const {strict: assert} = require("assert");

const rewiremock = require("rewiremock/node");

const {zrequire} = require("../zjsunit/namespace");
const {run_test} = require("../zjsunit/test");

rewiremock.enable();
const compose_pm_pill = {__esModule: true};

rewiremock("../../static/js/compose_pm_pill").with(compose_pm_pill);

const compose_state = zrequire("compose_state");

run_test("private_message_recipient", (override) => {
    let emails;
    override(compose_pm_pill, "set_from_emails", (value) => {
        emails = value;
    });

    override(compose_pm_pill, "get_emails", () => emails);

    compose_state.private_message_recipient("fred@fred.org");
    assert.equal(compose_state.private_message_recipient(), "fred@fred.org");
});
rewiremock.disable();
