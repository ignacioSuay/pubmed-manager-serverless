import {expect} from "chai";
import {postFavorite} from "../postFavorite/handler";
import {FavoriteItem} from "../model/entity/Favorite";
import {deleteFavorite} from "./handler";
import {error} from "util";

const event = require('../../test/resources/inputSamples/preSaveFavoriteDeleteTest.json');
const deleteEvent = require('../../test/resources/inputSamples/deleteFavoriteEvent.json');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const client = new DynamoDB({region: 'eu-west-1'});

describe('save favorites', () => {
    const params = {TableName: "Favorite", Key: {"id": {"S": "testDeleteId"}}};

    before((done) => {

        postFavorite(event).then((data) => {
            console.log("saving favorite!!");
            if (data)
                console.log("Saving testDeleteId");
            done()
        }).catch((err => console.log(err)));
    });

    it('should save a favorite', async function () {

        //given
        const iniItem = await client.getItem(params).promise();
        const numPublicationsIni = iniItem.Item.publications.L.length;

        //when
        const result = await deleteFavorite(deleteEvent);

        //then
        // console.log(result);

        const afterItem = await client.getItem(params).promise();
        const numPublicationsAfter = afterItem.Item.publications.L.length;
        expect(numPublicationsIni).to.be.eq(1);
        expect(numPublicationsAfter).to.be.eq(0);
    });

    after((done) => {
        client.deleteItem(params, function (err, data) {
            if (err)
                console.log("error " + err);
            if (data)
                console.log("Deleting testId");
            done()
        })
    });
});