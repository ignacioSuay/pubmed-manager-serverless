import {FavoriteItem, Publication, Response} from "../model/publication.type";

const aws = require('aws-sdk');

aws.config.update({region:'eu-west-1'});
const db = new aws.DynamoDB();

export const saveFavorite = async (event) => {
  console.log(event);

    const item = event.body.item;
    const id = event.body.id;
    const getParams = {
        TableName: 'Favorite',
        id: {S: id}
    };

    const userPubs : FavoriteItem = await db.getItem(getParams);
    let pubs : Publication[] = userPubs.publications ? [...userPubs.publications, item] : [item];

    const saveFavItem:FavoriteItem = {id: id, publications: pubs};
    const params = {
        TableName: 'Favorite',
        Item: saveFavItem
    };

    db.putItem(params, function(err, data){
        if(err) {
            console.log("Error" + err);
            buildResponse(500, err)
        }else {
            console.log("Favorite Item with id " + id + "saved" + item);
            buildResponse(200, data);
        }
    })
};

function buildResponse(status, body): Response {

    return {
        statusCode: status,
        body: JSON.stringify(body),
    }
}