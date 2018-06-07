import axios from "axios";
import {PubMedSearch, PubMedSummary, PubMedSummaryItem, ArticleId} from "../model/pubmed/pubmed.types";
import {Publication, Author, Response} from "../model/publication.type";
const convert = require('xml-js');

export const getPublicationDetails = async (event) => {
    console.log("running get details");

    if (!event.queryStringParameters.term || !event.queryStringParameters.startPage || !event.queryStringParameters.endPage) {
        return buildResponse(500, "Term or startPage or endPage cannot be empty");
    }

    const pubMedSummary = await getPubMedSummary(event);
    const pub = await buildPublications(pubMedSummary);

    return buildResponse(200, JSON.stringify(pub));
};

async function getPubMedSummary(event) {
    const pubMedSummaryPromise = await axios(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${event.pathParameters.id}&version=2.0&retmode=JSON`);
    return pubMedSummaryPromise.data as PubMedSummary;
}

function buildPublications(pubMedsummary) {
    const pubMedItem =  Object.keys(pubMedsummary.result)
        .map((key) => pubMedsummary.result[key])
        .find((pubMedItem) => pubMedItem.uid !== undefined);

    return transformPublication(pubMedItem);
}

async function transformPublication(pub: PubMedSummaryItem): Promise<Publication> {

    const authors: Author[] = pub.authors.map((aut) => {
        return {name: aut.name, authType: aut.authtype}
    });

    const fetch = await axios(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pub.uid}&rettype=Abstract`);
    var fetchResult = convert.xml2js(fetch.data, {compact: true});

    console.log(JSON.stringify(fetchResult));

    let abstractText;
    if(fetchResult.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.Abstract.AbstractText._text) {
        abstractText  = fetchResult.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.Abstract.AbstractText._text;
    }
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
        doi: getArticleId(pub.articleids, "doi"),
        abstract: abstractText
    }
}

function getArticleId(articleIds: ArticleId[], type: string): string {

    const articleId = articleIds.find((articleId) => articleId.idtype === type);
    return articleId.value;
}

function buildResponse(status, body): Response {
    return {
        statusCode: status,
        body: body,
    }
}
