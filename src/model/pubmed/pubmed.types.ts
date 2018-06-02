export interface PubMedSearch {
    header: Header,
    esearchresult: ESearchResult
}

interface Header {
    type: string,
    version: string,
}

interface ESearchResult {
    count: string,
    retmax: string,
    retstart: string,
    querykey: string,
    webenv: string,
    idlist: string[]
}

export interface PubMedSummary {
    header: Header,
    result: PubMedSummaryResult
}

interface PubMedSummaryResult {

    [key: string]: PubMedSummaryItem
}

export interface PubMedSummaryItem {
    uid: string,
    pubdate: string,
    epubdate: string,
    source: string,
    title: string,
    authors: Author[]
}

interface Author {
    name: string,
    authtype: string
}


