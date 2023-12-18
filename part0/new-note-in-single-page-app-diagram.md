sequenceDiagram
    participant browser
    participant server

    browser->>server: xmlhttp request to add a new note
    server-->>browser: add new note to the DOM
    Note right of server: add new note to the data.json file too