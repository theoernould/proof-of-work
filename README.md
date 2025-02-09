### Blockchain.js

* **newBlock** (proof, previousHash) => block
  Generate a new block given the already calculated proof and the previous Hash and returns the obtained block
* **newTransaction** (sender, receiver, amount) => transaction
  Generate a new transaction and adds it to the currentTransactions array which will be added in the next new block
* **mine** (miner) => block
  Mines a new block, assigns it to the miner and generate the associated block

### Network.js

* **registerNode** (address) => boolean
  Enable the insertion of new nodes and returns if the address has been added (cannot add twice the same address)
* **nodeExists** (address) => boolean
  Fetches in the nodes array if the provided node already exists and returns this information

# Rendu

### Pourquoi l'implémentation actuelle pose-t-elle problème ?
L’implémentation actuelle ne s'appuie pas sur une véritable preuve de travail. La fonction generateProof() ne fait que multiplier des valeurs sans recourir à du hachage cryptographique ou à un mécanisme de difficulté. Pas de recherche de nonce, ni de conditions à respecter pour approuver un bloc, ce qui permettrait à un attaquant de créer des blocs facilement et de mettre en danger l'intégrité de la chaîne.

### Quels sont les risques de sécurité ?
Sans preuve de travail valide, la blockchain est exposée à divers types d'attaques. Un mineur malintentionné pourrait produire des blocs sans frais et saturer le réseau (attaque Sybil). Il aurait également la possibilité de falsifier l'historique des transactions pour commettre une fraude (attaque des 51 %). Sans vérification rigoureuse des blocs, la double dépense devient envisageable, ce qui remet en doute la fiabilité du système.

### Comment une implémentation adéquate devrait-elle fonctionner ?
Il est essentiel d'intégrer une vraie preuve de travail en utilisant une fonction de hachage robuste comme SHA-256. Le minage devrait impliquer une boucle qui augmente un nonce jusqu'à ce que le hash obtenu remplisse une exigence de difficulté précise (par exemple, commencer par un certain nombre de zéros). Chaque bloc doit être vérifié pour s'assurer qu'il respecte cette difficulté avant d'être accepté, empêchant ainsi les tentatives de fraude.

### Lien vers la vidéo de démo : https://youtu.be/cjzbr87nXMU