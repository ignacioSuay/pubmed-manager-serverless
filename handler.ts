interface Response {
    statusCode: number;
    body: string;
}

export const hello = (event, context, cb) => {
    const response: Response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            // input: events,
        }),
    };

    cb(null, response);
};
