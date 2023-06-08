# Griglia Campo Minato

<br>

## Steps:

- Recupero gli elementi
- Setto la grandezza della griglia
- **QUANDO** _"premo play"_
    - [ml-1] Preparo il punteggio attuale
    - Recupero la difficoltà
    - **IN CASO** _"la difficoltà è 1 (facile)"_
        - Le celle per lato sono 10
    - **ALTRIMENTI IN CASO** _"la difficoltà è 2 (media)"_
        - Le celle per lato sono 9
    - **ALTRIMENTI**
        - Le celle per lato sono 7
    - Calcolo la grandezza delle celle
    - Calcolo il numero di celle
    - [ml-2] _"Genero 16 bombe"_
    - [ml-2] Salvo le bombe generate
    - Svuoto la griglia
    - **FINCHE** _"non ho tutte le celle"_
        - _"Creo una cella"_
        - Appendo la cella alla griglia
        - collego l'evento click alla cella
    - **FINE**
- **QUANDO** _"premo su una cella"_
    - [ml-1] **SE** _"la cella è stata già cliccata"_
        - **RITORNO**
    - Stampo il suo contenuto
    - Aggiungo il colore della cella cliccata
    - [ml-3] Recupero il numero di cella
    - [ml-3] **SE** _"la cella è una bomba"_
        - Aggiungo il colore della cella bomba
        - _"Mostro un messaggio"_
    - [ml-3] **ALTRIMENTI**
        - [ml-1] Aumento il punteggio
    - **FINE**
- **Creo una cella** _"data la grandezza e un numero"_
    - Creo un elemento
    - Setto le dimensioni dalla grandezza
    - Appendo il numero all'elemento
    - **RITORNO** _"l'elemento creato"_
- [ml-2] **Genero Bombe** _"dato il numero e il range di celle"_
    - Preparo una lista di celle bomba vuota
    - **FINCHE** _"non ho il numero di celle bomba"_
        - **RIPETO**
            - Genero una cella bomba casuale nel range fornito
        - **FINCHE** _"la cella bomba è già presente"_
        - Aggiungo la cella bomba alla lista
    - **RITORNO** _"La lista di celle bomba"_