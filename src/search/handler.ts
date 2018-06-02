import axios from "axios";
import {PubMedSearch, PubMedSummary, PubMedSummaryItem} from "../model/pubmed/pubmed.types";
import {Publication, Author} from "../model/publication.type";

interface Response2 {
    statusCode: number;
    body: string;
}

export const search = async (event, context) => {

    const pubMedsearchPromise = await axios("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=cancer&usehistory=y&retmode=JSON");
    const pubMedsearch = pubMedsearchPromise.data as PubMedSearch;

    const pubMedSummaryPromise = await axios("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&query_key=1&WebEnv=NCID_1_270230973_130.14.18.34_9001_1527934798_111025544_0MetA0_S_MegaStore&version=2.0&retmode=JSON&retstart=1&retmax=20")
    const pubMedsummary = pubMedSummaryPromise.data as PubMedSummary;


    console.log("res: " + JSON.stringify(pubMedsummary.result["29857127"].uid));
    console.log("res: " + JSON.stringify(pubMedsummary.result.length));

    const pubs: Publication[] = Object.keys(pubMedsummary.result)
        .map((key) => {
            return pubMedsummary.result[key]
        })
        .filter((pubMedItem) => {
            return pubMedItem.uid !== undefined
        })
        .map((pubMedItem) => {
            return transformPublication(pubMedItem);
        });


    const response: Response2 = {
        statusCode: 200,
        body: JSON.stringify(pubs),
    };

    return response;
};

function transformPublication(pub: PubMedSummaryItem): Publication {

    const authors: Author[] = pub.authors.map((aut) => {
        return {name: aut.name, authType: aut.authtype}
    });

    return {
        uid: pub.uid,
        title: pub.title,
        authors: authors
    }

}
