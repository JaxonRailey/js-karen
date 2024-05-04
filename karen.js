class karen {

    static global = {
        method: 'GET',
        entrypoint: '',
        key: '',
        url: '',
        data: null,
        structure: null,
        headers: {},
        chunk: 100,
        cache: false,
        responseType: 'json',
        before: () => {},
        after: () => {}
    };

    static async request(requestOptions) {

        const options = { ...this.global, ...requestOptions };

        const method       = options.method;
        const entrypoint   = options.entrypoint ? options.entrypoint : options.url;
        const key          = options.key;
        const url          = options.url;
        const data         = options.data;
        const structure    = options.structure;
        const headers      = options.headers;
        const chunk        = options.chunk;
        const cache        = options.cache;
        const responseType = options.responseType;

        const fetchOptions = {
            method,
            headers: {
                'karen-url': url,
                'karen-key': key,
                'karen-structure': JSON.stringify(structure),
                'karen-headers': JSON.stringify(headers),
                'karen-chunk': chunk,
                'karen-cache': cache
            }
        };

        if (options.entrypoint === false) {
            fetchOptions.headers = headers;
        }

        if (data) {
            if (fetchOptions.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                fetchOptions.body = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
            } else {
                fetchOptions.body = JSON.stringify(data);
            }
        }

        options.before();

        const response    = await fetch(entrypoint, fetchOptions);
        const contentType = response.headers.get('content-type');

        options.after();

        if (responseType === 'json' && contentType.includes('application/json')) {
            return await response.json();
        } else if (responseType === 'blob' && contentType.includes('application/octet-stream')) {
            return await response.blob();
        } else if (responseType === 'text' && contentType.includes('text/plain')) {
            return await response.text();
        } else if (responseType === 'formData' && contentType.includes('multipart/form-data')) {
            return await response.formData();
        } else {
            throw new Error(`Invalid responseType ${responseType} or content-type ${contentType}`);
        }
    }
}