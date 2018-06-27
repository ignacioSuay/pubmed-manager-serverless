import axios from "axios";
import {Response} from "../model/publication.type";

const convert = require('xml-js');

export const getPublicationDetails = async (event) => {
    console.log("running get details");

    if (!event.pathParameters.id) {
        return buildResponse(500, "Publication id is not present");
    }

    const pub = await buildPublicationDetails(event.pathParameters.id);

    return buildResponse(200, JSON.stringify(pub));
};

async function buildPublicationDetails(id) {
    const fetch = await axios(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${id}&rettype=Abstract`);
    const fetchResult = convert.xml2js(fetch.data, {compact: true});

    let abstractText = "";
    if (fetchResult.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.Abstract && fetchResult.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.Abstract.AbstractText._text) {
        abstractText = fetchResult.PubmedArticleSet.PubmedArticle.MedlineCitation.Article.Abstract.AbstractText._text;
    }
    return {
        abstract: abstractText
    }
}

function buildResponse(status, body): Response {
    return {
        statusCode: status,
        body: body,
    }
}
