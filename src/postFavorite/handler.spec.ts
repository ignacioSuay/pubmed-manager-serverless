import {expect} from "chai";
import {DataMapper} from "@aws/dynamodb-data-mapper";
import {mock} from "ts-mockito";
import {postFavorite} from "./handler";
import {FavoriteItem} from "../model/entity/Favorite";
import {id} from "aws-sdk/clients/datapipeline";
import {Publication} from "../model/publication.type";
const  event = require('../../test/resources/inputSamples/saveFavorite.json');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const client = new DynamoDB({region: 'eu-west-1'});
const mapper = new DataMapper({client});


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