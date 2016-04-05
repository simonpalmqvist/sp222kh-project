/* eslint-env mocha */

import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";

import { _ } from "meteor/underscore";
import { sinon } from "meteor/practicalmeteor:sinon";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import { createItems, stubItems, restoreCollections } from "../../api/test-utils";

import Main from "./Dashboard";

if (Meteor.isClient) {
    describe("Main page", () => {
        beforeEach(() => {
            stubItems();

            sinon.stub(Meteor, "subscribe", () => {
                return {
                    subscriptionId: 0,
                    ready: () => true
                };
            });
        });

        afterEach(() => {
            restoreCollections();
            Meteor.subscribe.restore();
        });


        it("Renders correctly with items", () => {
            const numberOfItems = 3;
            const items = createItems(numberOfItems);

            const main = ReactTestUtils.renderIntoDocument(<Main />);

            //Update state
            main.updateList();

            const list = ReactTestUtils.findRenderedDOMComponentWithTag(main, "ul");

            const listTexts = _.map(list.children, (el) => el.textContent);
            const itemTexts = _.map(items, (item) => item.text);

            expect(list.children.length).to.equal(numberOfItems);
            expect(listTexts).to.deep.equal(itemTexts);
        });
    });
}
