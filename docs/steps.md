# Griglia Campo Minato

<br>

## Steps:

- Recupero gli elementi
- Setto la grandezza della griglia
- **QUANDO** _"premo play"_
    - Recupero la difficoltà
    - **IN CASO** _"la difficoltà è 1 (facile)"_
        - Le celle per lato sono 10
    - **ALTRIMENTI IN CASO** _"la difficoltà è 2 (media)"_
        - Le celle per lato sono 9
    - **ALTRIMENTI**
        - Le celle per lato sono 7
    - Calcolo la grandezza delle celle
    - Calcolo il numero di celle
    - Svuoto la griglia
    - **FINCHE** _"non ho tutte le celle"_
        - _"Creo una cella"_
        - Appendo la cella alla griglia
        - collego l'evento click alla cella
    - **FINE**
- **QUANDO** _"premo su una cella"_
    - Stampo il suo contenuto
    - Cambio il colore della cella
    - **FINE**
- **Creo una cella** _"data la grandezza e un numero"_
    - Creo un elemento
    - Setto le dimensioni dalla grandezza
    - Appendo il numero all'elemento
    - **RITORNO** _"l'elemento creato"_