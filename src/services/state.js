const fetch = require('../utils/fetch');

class StateService {
    _state = -1;

    async getState() {
        return fetch('/state');
    }
}

module.exports = new StateService();