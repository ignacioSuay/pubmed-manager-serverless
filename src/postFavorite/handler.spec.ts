import {expect} from "chai";
import {postFavorite} from "./handler";
import {FavoriteItem} from "../model/entity/Favorite";
const  event = require('../../test/resources/inputSamples/saveFavorite.json');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const client = new DynamoDB({region: 'eu-west-1'});

describe('save favorites', () => {

    before(() => {
        const params = {TableName:"Favorite", Key: {"id" :{"S": "testId"}}};
        client.deleteItem(params, function(err, data){
            if(err)
                console.log("error " + err);
            if(data)
                console.log(data);

        })
    });

    it('should save a favorite', async function () {

        //when
        const result = await postFavorite(event);

        //then
        console.log(result);
        const favoritesaved: FavoriteItem = JSON.parse(result.body);
        expect(favoritesaved.publications.length).to.equal(1);
    })
});