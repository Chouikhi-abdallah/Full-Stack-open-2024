 The user opens https://studies.cs.helsinki.fi/exampleapp/spa, a single-page application. The interaction between the browser and the server is as follows:

 ```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET (status Code:200) https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

   
    browser->>server: GET (status Code:200) https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: main.css
    deactivate server

    browser->>server: GET (status Code:200) https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: Content of spa.js
    deactivate server

    Note over browser: The browser executes spa.js,<br> which requests data.json<br> from the server<br> displays the data upon reception<br> and triggers a function<br> when the user attempts to submit the form.
    browser->>server: GET (status Code:200) https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Content of data.json 
    deactivate server

    Note over browser: Browser renders the data (i.e. notes)<br>present in data.json
```