import {Publication, Response} from "../model/publication.type";


const DynamoDB = require('aws-sdk/clients/dynamodb');
import {FavoriteItem} from "../model/entity/Favorite";
import {DataMapper} from "@aws/dynamodb-data-mapper";

const client = new DynamoDB({region: 'eu-west-1'});
const mapper = new DataMapper({client});

export const getFavorites = async (event) => {

    let id = event.pathParameters.id;
    if (!id) {
        return buildResponse(500, "device id is not present");
    }

    console.log("getting favorites for id ", id);

    const searchItem: FavoriteItem = Object.assign(new FavoriteItem, {id: id, publications: null});
    let userPubs: FavoriteItem;
    try {
        userPubs = await mapper.get(searchItem);
    } catch (e) {
        console.log("No item found");
        return buildResponse(200, {});
    }

    return buildResponse(200, userPubs.publications);
};

function buildResponse(status, body): Response {
    return {
        statusCode: status,
        body: JSON.stringify(body),
    }
}