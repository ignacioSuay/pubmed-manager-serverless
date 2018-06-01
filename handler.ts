import axios from "axios";

interface Response2 {
    statusCode: number;
    body: string;
}

export const search = async (event, context) => {

    const result = await axios("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=26389510&version=2.0&retmode=JSON");


    const response: Response2 = {
        statusCode: 200,
        body: JSON.stringify(result.data),
    };

    return response;
    // cb(null, response);
};
