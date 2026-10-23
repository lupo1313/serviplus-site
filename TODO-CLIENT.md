# TODO-CLIENT — informations à confirmer / fournir

Éléments manquants ou à valider par le client avant la mise en production.
Chaque point correspond à un placeholder `<!-- TODO-CLIENT: ... -->` dans le code.

## Formulaire de contact (FormSubmit)
- [ ] **Activer le formulaire** : à la 1re soumission, FormSubmit envoie un e-mail de confirmation à
  l'adresse de destination. Cliquer le lien d'activation **une seule fois**. (Aucun compte ni clé requis.)
- [ ] **Adresse de destination** : actuellement **`flopezoanes@gmail.com`** (test). En production,
  remplacer par **`sarlserviplus@gmail.com`** dans `contact.html` (attribut `action` du formulaire).
- [ ] **Durée de conservation** des données collectées via le formulaire (pour les mentions légales).

## Livraison / logistique (LOT 1 & 2)
- [ ] **Liste exacte des communes / départements livrés** (secteurs couverts en direct).
- [ ] **Jours de tournée par secteur**.
- [ ] **Délai de livraison** (après commande).
- [ ] **Minimum de commande** (montant ou quantité).
- [ ] **Conditions d'ouverture de compte professionnel**.

## Horaires
- [ ] **Aligner les horaires entre le site et la fiche Google** : la fiche Google indique une
  réouverture à 13h00 l'après-midi, le site indique 13h30. Quelle est la bonne valeur ?
  (Le site affiche 13h30 pour l'instant.)

## Visuels
- [ ] **Logo HFC** : récupéré depuis l'ancien site (`assets/img/logo-hfc.png`). À remplacer si
  le client dispose d'une version officielle plus récente / en meilleure définition.

## Hébergement / migration (LOT 6 & 7)
- [ ] **Confirmer l'hébergeur final** (SiteGround conservé, ou autre ?). Les mentions légales
  indiquent SiteGround pour l'instant.

## Domaine (hors lots)
- [ ] Brancher le domaine `groupeserviplus.com` (fichier `CNAME` + DNS), puis mettre à jour les
  URLs canoniques, le sitemap et l'Open Graph.
