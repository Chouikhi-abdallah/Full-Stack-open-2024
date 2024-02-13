The user opens https://studies.cs.helsinki.fi/exampleapp/spa, a single-page application and add a new note "HELLO SPA". The interaction between the browser and the server is as follows:

 ```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: The JavaScript function<br> catches when the form is submitted<br>adds the new note to the existing ones<br>on the webpage, and sends it using XMLHttpRequest.

    browser->>server: POST (status Code:201 Created) https://studies.cs.helsinki.fi/exampleapp/spa
    Note over server: The server append the new note 
    activate server
    server-->>browser: {"message":"note created"}
    Note over browser: The data (new note) is showed in the browser
    deactivate server

   
    