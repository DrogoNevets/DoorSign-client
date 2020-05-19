class ContextMenuService {
    _tray;

    set tray(tray) {
        this._tray = tray;
    }

    set menu(menu) {
        if (this._tray)
            this._tray.setContextMenu(menu);
    }

    set image(img) {
        if (this._tray)
            this._tray.setImage(img);
    }
}

module.exports = new ContextMenuService();