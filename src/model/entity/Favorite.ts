import {Publication} from "../publication.type";
import {hashKey, table, attribute} from "@aws/dynamodb-data-mapper-annotations";

@table('Favorite')
export class FavoriteItem {

    @hashKey()
    id: string;

    @attribute()
    publications: Publication[];
}