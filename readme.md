### Installation

Add Karen via CDN:

```
https://cdn.jsdelivr.net/gh/JaxonRailey/js-karen@v0.2/karen.js
```

And use it in your script:
```js
karen.global.key = '358ea2c0-8a1b-403e-98f0-df8d0ecb50bd';
karen.global.headers = { 'Authorization': 'Bearer Token' };
karen.global.cache = 60;

karen.global.before = () => {
    console.time();
};

karen.global.after = () => {
    console.timeEnd();
};

karen.request({
    method: 'GET',
    url: 'https:\\my-endpoint.com\api\customers',
    structure: structure
});
```

### Configuration

Below is the list of keys that can be used, each key can be set globally, enabling its use across all instances without the need for individual specification in each instance.

| Options       | Value                                                                                              | Default              |
|---------------|----------------------------------------------------------------------------------------------------|----------------------|
| url           | You must specify the URL from which to retrieve the data; this is a required field.               | null                 |
| data          | If you want to send POST parameters.                                                               | null                 |
| structure     | Here you need to pass the structure you want to receive from the response.                         | null                 |
| entrypoint    | The URL of the middleware is the address where the middleware service can be accessed and interacted with. | 'https:\\karen.io\middleware\v1\' |
| key           | API Key to use the service is a unique identifier provided to users for accessing and utilizing the service's functionalities. | null                 |
| headers       | You can send headers, which will be used as is by the middleware to request the actual endpoint.   | null                 |
| chunk         | It allows you to choose how to partition the data to enable the middleware to process them more efficiently. | 0                    |
| cache         | The middleware can cache responses to avoid repeated server calls and save processing time.         | 0                    |
| responseType | You can select the data format for retrieval; currently, only JSON responses are supported.        | json                 |
| before        | You can execute instructions before each request, such as starting a loader or a console.time() for performance measurement. | null                 |
| after         | You can execute instructions after each request, such as ending a loader or providing feedback to the user. | null                 |
