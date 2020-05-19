const traySvc = require('./services/tray');
const stateSvc = require('./services/state');
const fetch = require('./utils/fetch');

const { app, Menu, Tray } = require('electron');


const available = () => {
    fetch('/available');
};

const unavailable = () => {
    fetch('/busy');
};

const quit = () => {
    process.exit();
};

const availableContext = Menu.buildFromTemplate([
    { label: 'Set unavailable', type: 'normal', click: unavailable },
    { type: 'separator' },
    { label: 'Exit', type: 'normal', click: quit }
]);

const unavailableContext = Menu.buildFromTemplate([
    { label: 'Set available', type: 'normal', click: available },
    { type: 'separator' },
    { label: 'Exit', type: 'normal', click: quit }
]);

function processState() {
    stateSvc.getState()
        .then((state) => {
            switch (state) {
                case '1':
                    traySvc.image = `${__dirname}/door-open.png`;
                    traySvc.menu = availableContext;
                    break;
                case '2':
                    traySvc.image = `${__dirname}/door-closed.png`;
                    traySvc.menu = unavailableContext;
                    break;
            }
        })
        .then(processState);
}

app.on('ready', () => {
    traySvc.tray = new Tray(`${__dirname}/door-open.png`);
    processState();

    // tray.setToolTip('DoorSign-client');
    traySvc.menu = availableContext;
    app.dock.hide();
});

