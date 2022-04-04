# Pygeoapi TEST 2
Esempio di client per un server pygeoapi. Questo esempio mostra su una mappa due dataset:
    
1. Corine Land Cover Italia
2. Incendi Basilicata

Per configurare il server, vedere cartella `server`.

Per eseguire il client:

```
   npm install
   npm run start   
```

All'indirizzo [http://localhost:4200/](http://localhost:4200/) dopo qualche secondo di caricamento dovrebbero essere visualizzati i due dataset.


## Implementazione
Il collegamento al server pygeoapi è implementato nel file `src/app/providers/pygeoapi.service.ts`
