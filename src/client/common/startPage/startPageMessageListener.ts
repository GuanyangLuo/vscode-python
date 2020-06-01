// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
import { IWebPanel, IWebPanelMessageListener } from '../application/types';
import '../extensions';

// tslint:disable:no-any
// This class listens to messages that come from the local Python Interactive window
export class StartPageMessageListener implements IWebPanelMessageListener {
    private disposedCallback: () => void;
    private callback: (message: string, payload: any) => void;
    private viewChanged: (panel: IWebPanel) => void;

    constructor(
        callback: (message: string, payload: any) => void,
        viewChanged: (panel: IWebPanel) => void,
        disposed: () => void
    ) {
        // Save our dispose callback so we remove our interactive window
        this.disposedCallback = disposed;

        // Save our local callback so we can handle the non broadcast case(s)
        this.callback = callback;

        // Save view changed so we can forward view change events.
        this.viewChanged = viewChanged;
    }

    public async dispose() {
        this.disposedCallback();
    }

    public onMessage(message: string, payload: any) {
        // Send to just our local callback.
        this.callback(message, payload);
    }

    public onChangeViewState(panel: IWebPanel) {
        // Forward this onto our callback
        this.viewChanged(panel);
    }
}
