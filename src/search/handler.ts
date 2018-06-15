import axios from "axios";
import {ArticleId, PubMedSearch, PubMedSummary, PubMedSummaryItem} from "../model/pubmed/pubmed.types";
import {Author, Publication, Response} from "../model/publication.type";

export const search = async (event) => {
    console.log("running search");

    if (!event.queryStringParameters.term || !event.queryStringParameters.startPage || !event.queryStringParameters.endPage) {
        return buildResponse(500, "Term or startPage or endPage cannot be empty");
    }

    const pubMedsearch = await getPubMedSearch(event);
    const pubMedSummary = await getPubMedSummary(pubMedsearch, event);
    console.log(JSON.stringify(pubMedSummary));

    const pubs = buildPublications(pubMedSummary);

    const response = buildResponse(200, JSON.stringify(pubs));
    console.log(response);
    return response;
};

async function getPubMedSearch(event) {
    const pubMedsearchPromise = await axios(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${event.queryStringParameters.term}&usehistory=y&retmode=JSON`);
    return pubMedsearchPromise.data as PubMedSearch;
}

async function getPubMedSummary(pubMedsearch : PubMedSearch, event) {
    console.log(JSON.stringify(pubMedsearch));
    let pubMedSummaryPromise;
    if(pubMedsearch.esearchresult && pubMedsearch.esearchresult.idlist.length === 1){
        pubMedSummaryPromise = await axios(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&query_key=${pubMedsearch.esearchresult.querykey}&WebEnv=${pubMedsearch.esearchresult.webenv}&version=2.0&retmode=JSON`);

    }else {
        pubMedSummaryPromise = await axios(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&query_key=${pubMedsearch.esearchresult.querykey}&WebEnv=${pubMedsearch.esearchresult.webenv}&version=2.0&retmode=JSON&retstart=${event.queryStringParameters.startPage}&retmax=${event.queryStringParameters.endPage}`);
    }
    return pubMedSummaryPromise.data as PubMedSummary;
}

function buildPublications(pubMedsummary) {
    if(!pubMedsummary.result){
        return [];
    }

    return Object.keys(pubMedsummary.result)
        .map((key) => pubMedsummary.result[key])
        .filter((pubMedItem) => pubMedItem.uid !== undefined)
        .map((pubMedItem) => transformPublication(pubMedItem));
}

function transformPublication(pub: PubMedSummaryItem): Publication {

    const authors: Author[] = pub.authors.map((aut) => {
        return {name: aut.name, authType: aut.authtype}
    });

    return {
        uid: pub.uid,
        title: pub.title,
        pubdate: pub.pubdate,
        epubdate: pub.epubdate,
        source: pub.source,
        authors: authors,
        lastauthor: pub.lastauthor,
        volumen: pub.volumen,
        issue: pub.issue,
        pages: pub.pages,
        lang: pub.lang,
        issn: pub.issn,
        pubtype: pub.pubtype,
        pubmedId: getArticleId(pub.articleids, "pubmed"),
        doi: getArticleId(pub.articleids, "doi")
    }
}

function getArticleId(articleIds: ArticleId[], type: string): string {

    const articleId = articleIds.find((articleId) => articleId.idtype === type);
    if (articleId) {
        return articleId.value;
    }
    return "";
}

function buildResponse(status, body): Response {
    return {
        statusCode: status,
        body: body,
    }
}
