const defaultHeaders = {
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*'
};

export const successResponse = (body, statusCode = 200) => {
    return {
        statusCode,
        headers: {
            ...defaultHeaders
        },
        body: JSON.stringify(body, null, 2)
    }
}

export const failResponse = (err, statusCode = 500) => {
    return {
        statusCode,
        headers: {
            ...defaultHeaders
        },
        body: JSON.stringify({ message: err || 'Something goes wrong...'})
    }
}