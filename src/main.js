const { app, Menu, Tray } = require('electron');
const http = require('http');

const request = (path) => {
    // Your Request Options
    var options = {

        host: "DoorSign.local",
        port: 8080,
        path: path,
        method: 'GET'
    };


    // The Request
    var request = http.request(options, function (response) {
        response.on('data', function (chunk) {
            if (chunk) {
                var data = chunk.toString('utf8');
            }
        });
    }).on("error", function (e) {

    });
    request.end();
}

const available = () => {
    request('/available');
    tray.setImage(`${__dirname}/door-open.png`);
    tray.setContextMenu(availableContext);
};

const unavailable = () => {
    request('/busy');
    tray.setImage(`${__dirname}/door-closed.png`);
    tray.setContextMenu(unavailableContext);
};

const quit = () => {
    process.exit();
};

const availableContext = Menu.buildFromTemplate([
    { label: 'Set unavailable', type: 'normal', click: unavailable },
    { label: 'Exit', type: 'normal', click: quit }
]);

const unavailableContext = Menu.buildFromTemplate([
    { label: 'Set available', type: 'normal', click: available },
    { label: 'Exit', type: 'normal', click: quit }
]);

app.on('ready', () => {
    tray = new Tray(`${__dirname}/door-open.png`);
    available();

    tray.setToolTip('DoorSign-client');
    tray.setContextMenu(availableContext);
    app.dock.hide();
});

