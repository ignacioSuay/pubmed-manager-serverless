import {expect} from "chai";
import {postFavorite} from "./handler";
import {FavoriteItem} from "../model/entity/Favorite";
const  event = require('../../test/resources/inputSamples/saveFavorite.json');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const client = new DynamoDB({region: 'eu-west-1'});

describe('save favorites', () => {

    before((done) => {
        const params = {TableName:"Favorite", Key: {"id" :{"S": "testId"}}};
        client.deleteItem(params, function(err, data){
            if(err)
                console.log("error " + err);
            if(data)
                console.log("Deleting testId");
            done()
        })
    });

    it('should save a favorite', async function () {

        //when
        const result = await postFavorite(event);

        //then
        console.log(result);
        const favoriteSaved: FavoriteItem = JSON.parse(result.body);
        expect(favoriteSaved.id).to.eq("testId");
        expect(favoriteSaved.publications.length).to.equal(1);
        expect(favoriteSaved.publications[0].authors.length).to.equal(8);
        expect(favoriteSaved.publications[0].epubdate).to.equal("2015 Jan 10");
        expect(favoriteSaved.publications[0].doi).to.equal("10.1016/j.ejim.2014.12.010");
        expect(favoriteSaved.publications[0].title).to.equal("Cardiovascular profile in critically ill elderly medical patients: prevalence, mortality and length of stay.");
        expect(favoriteSaved.publications[0].uid).to.equal("25582073");
        expect(favoriteSaved.publications[0].pubtype[0]).to.equal("Journal Article");
    })
});