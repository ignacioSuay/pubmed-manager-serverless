import {Publication, Response} from "../model/publication.type";


const  DynamoDB = require('aws-sdk/clients/dynamodb');
import {FavoriteItem} from "../model/entity/Favorite";
import {DataMapper} from "@aws/dynamodb-data-mapper";

const client = new DynamoDB({region: 'eu-west-1'});
const mapper = new DataMapper({client});

export const saveFavorite = async (event) => {
  console.log(event);

    const item = event.body.item;
    const id = event.body.id;
    const getParams = {
        TableName: 'Favorite.ts',
        id: {S: id}
    };

    console.log("id is "+ id + "pub is " + item);
    const searchItem : FavoriteItem = {id: id, publications: null};
    const userPubs : FavoriteItem = await mapper.get(searchItem);

    let pubs : Publication[] = userPubs.publications ? [...userPubs.publications, item] : [item];

    console.log("pubs is"+ JSON.stringify(pubs) );
    const params = {
        TableName: 'Favorite.ts',
        Item: {id: id, publications: pubs}
    };

    const favItem : FavoriteItem = {id: id, publications: pubs};

    console.log("saving into db");
    mapper.put({item: favItem}).then((data) => {
        console.log("Favorite.ts Item with id " + id + "saved" + item);
        buildResponse(200, data);
    }).catch((err) =>{
        console.log("Error" + err);
        buildResponse(500, err)
    });
    // mapper.put(params, function(err, data){
    //     if(err) {
    //         console.log("Error" + err);
    //         buildResponse(500, err)
    //     }else {
    //         console.log("Favorite.ts Item with id " + id + "saved" + item);
    //         buildResponse(200, data);
    //     }
    // })
};

function buildResponse(status, body): Response {

    return {
        statusCode: status,
        body: JSON.stringify(body),
    }
}