export interface Author {
    name: string,
    authType: string
}

export interface Publication {
    uid: string,
    title: string,
    pubdate: string
    epubdate: string,
    source: string,
    authors: Author[],
    lastauthor: string,
    volumen: string,
    issue: string,
    pages: string,
    lang: string[],
    issn: string,
    pubtype: string[],
    pubmedId: string,
    doi: string,
    abstract: string
}

export interface Response {
    statusCode: number;
    body: string;
}
