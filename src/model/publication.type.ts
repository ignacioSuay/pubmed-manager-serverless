export interface Author {
    name: string,
    authType: string
}

export interface Publication {
    uid: string,
    title: string,
    authors: Author[]

}
