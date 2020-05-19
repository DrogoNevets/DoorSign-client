const http = require('http');

const request = (path, method = 'GET') => {
    return new Promise((resolve) => {
        // Your Request Options
        var options = {

            host: "DoorSign.local",
            port: 8080,
            path: path,
            method: method
        };


        // The Request
        var request = http.request(options, function (response) {
            let data = '';

            response.on('data', function (chunk) {
                if (chunk) {
                    data += chunk.toString('utf8');
                }
            });

            response.on('end', () => {
                resolve(data);
            })
        }).on("error", function (e) {

        });
        request.end();
    });
}

module.exports = request;