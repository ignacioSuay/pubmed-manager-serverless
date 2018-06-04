import axios from "axios";
import {PubMedSearch, PubMedSummary, PubMedSummaryItem} from "../model/pubmed/pubmed.types";
import {Publication, Author, Response} from "../model/publication.type";

export const search = async (event) => {
    console.log("running search");

    if (!event.queryStringParameters.term || !event.queryStringParameters.startPage || !event.queryStringParameters.endPage) {
        return buildResponse(500, "Term or startPage or endPage cannot be empty");
    }

    const pubMedsearch = await getPubMedSearch(event);
    const pubMedSummary = await getPubMedSummary(pubMedsearch, event);
    const pubs = buildPublications(pubMedSummary);

    return buildResponse(200, JSON.stringify(pubs));
};

async function getPubMedSearch(event) {
    const pubMedsearchPromise = await axios(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${event.queryStringParameters.term}&usehistory=y&retmode=JSON`);
    return pubMedsearchPromise.data as PubMedSearch;
}

async function getPubMedSummary(pubMedsearch, event) {
    const pubMedSummaryPromise = await axios(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&query_key=${pubMedsearch.esearchresult.querykey}&WebEnv=${pubMedsearch.esearchresult.webenv}&version=2.0&retmode=JSON&retstart=${event.queryStringParameters.startPage}&retmax=${event.queryStringParameters.endPage}`)
    return pubMedSummaryPromise.data as PubMedSummary;
}

function buildPublications(pubMedsummary) {
    return Object.keys(pubMedsummary.result)
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

function buildResponse(status, body): Response {
    return {
        statusCode: status,
        body: body,
    }
}
