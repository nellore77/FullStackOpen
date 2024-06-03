New note in Single page app diagram

```mermaid

sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: POST  https://studies.cs.helsinki.fi/exampleapp/spa
    activate Server
    Server-->>Browser: Status 201 (Created)
    Note right of Browser: {"message":"note created"}
    deactivate Server


```
