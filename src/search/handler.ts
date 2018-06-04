import axios from "axios";
import {PubMedSearch, PubMedSummary, PubMedSummaryItem} from "../model/pubmed/pubmed.types";
import {Publication, Author, Response} from "../model/publication.type";

export const search = async (event) => {
    console.log("running search");

    if(!event.queryStringParameters.term || !event.queryStringParameters.startPage || !event.queryStringParameters.endPage ){
        return {
            statusCode: 500,
            body: "Term or startPage or endPage cannot be empty",
        };
    }

    const pubMedsearchPromise = await axios(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${event.queryStringParameters.term}&usehistory=y&retmode=JSON`);
    const pubMedsearch = pubMedsearchPromise.data as PubMedSearch;

    const pubMedSummaryPromise = await axios(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&query_key=${pubMedsearch.esearchresult.querykey}&WebEnv=${pubMedsearch.esearchresult.webenv}&version=2.0&retmode=JSON&retstart=${event.queryStringParameters.startPage}&retmax=${event.queryStringParameters.endPage}`)
    const pubMedsummary = pubMedSummaryPromise.data as PubMedSummary;

    const pubs = buildPublications(pubMedsummary);

    return {
        statusCode: 200,
        body: JSON.stringify(pubs),
    };
};

function buildPublications(pubMedsummary) {
    return  Object.keys(pubMedsummary.result)
        .map((key) => {
            return pubMedsummary.result[key]
        })
        .filter((pubMedItem) => {
            return pubMedItem.uid !== undefined
        })
        .map((pubMedItem) => {
            return transformPublication(pubMedItem);
        });
}

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
