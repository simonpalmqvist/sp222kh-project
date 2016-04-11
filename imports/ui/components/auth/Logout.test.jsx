/* eslint-env mocha */
/**
 * @description Integration tests for client side logout flow
 * @author simonpalmqvist
 */

//Modules
import { Meteor } from "meteor/meteor";
import chai from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";

//Components
import Logout from "./Logout";


//Init should
const should = chai.should();


if (Meteor.isClient) {
    describe("Logout component", function() {

        beforeEach((done) => {
            //Reset database
            const server = Meteor.connect(Meteor.absoluteUrl());
            server.call("test.resetdb");

            server.call("test.create-user", (error, account) => {
                Meteor.loginWithPassword(account.email, account.password, () => {
                    done();
                });
            });

        });

        describe("User", function(done) {
            it("Should be able to logout", function() {

                Meteor.user().should.exist;

                //Render component
                let logout = ReactTestUtils.renderIntoDocument(<Logout/>);

            });

        });

    });
}