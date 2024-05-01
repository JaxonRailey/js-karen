class karen {

    static async request(requestOptions) {

        const method       = requestOptions.method;
        const url          = requestOptions.url;
        const data         = requestOptions.data || null;
        const structure    = requestOptions.structure || null;
        const headers      = requestOptions.headers || {};
        const chunk        = requestOptions.chunk || 100;
        const responseType = requestOptions.responseType || 'json';

        const fetchOptions = {
            method,
            headers: {
                'karen-url': url,
                'karen-structure': JSON.stringify(structure),
                'karen-headers': JSON.stringify(headers),
                'karen-chunk': chunk
            }
        };

        if (data) {
            if (fetchOptions.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                fetchOptions.body = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
            } else {
                fetchOptions.body = JSON.stringify(data);
            }
        }

        const response    = await fetch('<url>', fetchOptions);
        const contentType = response.headers.get('content-type');

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

    static get(options) {
        return this.request(options);
    }

    static async post(options) {
        return this.request(options);
    }

    static async put(options) {
        return this.request(options);
    }

    static async delete(options) {
        return this.request(options);
    }
}
