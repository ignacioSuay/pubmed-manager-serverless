import {Publication, Response} from "../model/publication.type";


const DynamoDB = require('aws-sdk/clients/dynamodb');
import {FavoriteItem} from "../model/entity/Favorite";
import {DataMapper} from "@aws/dynamodb-data-mapper";

const client = new DynamoDB({region: 'eu-west-1'});
const mapper = new DataMapper({client});

export const deleteFavorite = async (event) => {
    console.log(event);
    let deviceId = event.pathParameters.deviceId;
    let pubId = event.pathParameters.pubId;

    const searchItem: FavoriteItem = Object.assign(new FavoriteItem, {id: deviceId, publications: null});
    let userPubs: FavoriteItem;
    try {
        userPubs = await mapper.get(searchItem);
    } catch (e) {
        console.log("No item found");
        return buildResponse(500, "No id found with device Id: " + deviceId);
    }


    const pubs = userPubs.publications.filter( (pub) => pub.uid !== pubId);

    const favItem : FavoriteItem =  Object.assign(new FavoriteItem, {id: deviceId, publications: pubs});

    let savedItem;
    try {
        console.log("saving: ", JSON.stringify(favItem));
        savedItem = await mapper.put({item: favItem});
        console.log("Item saved in db", savedItem);
    } catch (e) {
        console.log("Error while saving into db", e);
        return buildResponse(500, e);
    }

    return buildResponse(200, savedItem);
};

function buildResponse(status, body): Response {
    return {
        statusCode: status,
        body: JSON.stringify(body),
    }
}