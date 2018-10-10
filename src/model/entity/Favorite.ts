import {Publication} from "../publication.type";
import {table} from "@aws/dynamodb-data-mapper-annotations";

// @ts-ignore
@table('Favorite')
export class FavoriteItem {
    id: string;
    publications: Publication[];
}