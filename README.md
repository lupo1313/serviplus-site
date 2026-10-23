# Site vitrine - Groupe SERVIPLUS

Site vitrine une page (single page) pour **Groupe SERVIPLUS**, distributeur de produits
surgelés, frais et d'épicerie pour les professionnels de la restauration
(Châteauneuf-les-Martigues, 13).

HTML5 / CSS3 / JavaScript natif. Aucun framework, aucun CMS, aucune base de données.
Compatible GitHub Pages et Hostinger.

---

## Structure (site multipage)

```
serviplus-site/
├── index.html                 # Accueil (hero + chiffres animés + aperçus)
├── produits.html              # Nos produits (familles + catalogue PDF)
├── entreprise.html            # L'entreprise (histoire, stockage, logistique)
├── livraison.html             # Livraison (zone + transport frigorifique)
├── contact.html               # Contact (coordonnées + actions directes)
├── mentions-legales.html      # Mentions légales + RGPD
├── robots.txt
├── sitemap.xml
├── .nojekyll                  # Pour GitHub Pages
├── README.md
└── assets/
    ├── css/styles.css
    ├── js/main.js             # Menu mobile, accordéon footer, compteurs animés
    ├── img/                   # Photos WebP + favicons + image Open Graph
    ├── logo/                  # Logos vectoriels (SVG)
    └── catalogue/
        └── catalogue-serviplus.pdf   # Catalogue 25 pages (couverture au nouveau logo)
```

Navigation : Accueil · Nos produits · L'entreprise · Livraison · Contact.
Header et footer sont dupliqués en HTML dans chaque page (site 100 % statique),
l'état « page active » est marqué par `aria-current="page"`. Liens 100 % relatifs
(fonctionne sous le sous-chemin GitHub Pages `/serviplus-site/` et sous domaine final).

## Lancer le site en local

Le site est 100 % statique : il suffit d'ouvrir `index.html` dans un navigateur.

Pour un rendu fidèle (chemins relatifs, polices), lancez un petit serveur local :

```bash
# Avec Node (npx, aucune installation)
npx serve serviplus-site

# ou avec Python 3
python -m http.server 8000 --directory serviplus-site
```

Puis ouvrez l'adresse indiquée (ex. http://localhost:3000 ou http://localhost:8000).

## Déploiement

### GitHub Pages
1. Créez un dépôt et poussez le contenu de `serviplus-site/` à la racine.
2. Settings → Pages → Branch `main` / dossier `/root`.
3. Le fichier `.nojekyll` est déjà présent (il évite que GitHub ignore certains dossiers).

### Hostinger
1. Dans le gestionnaire de fichiers, ouvrez `public_html/`.
2. Téléversez le **contenu** de `serviplus-site/` (et non le dossier lui-même).
3. Le site est en ligne immédiatement.

## SEO & performance

- `title`, `meta description`, Open Graph, Twitter Card, `canonical`.
- Données structurées JSON-LD (`LocalBusiness`) : adresse, horaires, téléphone, zone desservie.
- Images en WebP, dimensions explicites (évite le décalage de mise en page), `loading="lazy"`.
- Image du hero préchargée (`preload` + `fetchpriority=high`) pour un bon LCP.
- Polices chargées sans bloquer le rendu.

## Catalogue PDF

`assets/catalogue/catalogue-serviplus.pdf` : 25 pages, assemblé depuis les images du
dossier `ServiPlus/catalogue` fourni, avec les logos corrigés sur les pages 8 (Le Bœuf)
et 23 (PLV). Page d'index (sommaire) = version `2-1` car c'est la seule dont la
pagination correspond aux pages réellement présentes (Poissons p.15, Kebab p.16, etc.).
Remarque : les autres pages (intro, volaille, sauces...) portent encore l'ancien logo
cursif « Serviplus » ; pour une charte homogène, remplacer ces pages par leurs versions
au nouveau logo puis relancer l'assemblage.

## Pages

- `index.html` : page principale (vitrine).
- `mentions-legales.html` : mentions légales + protection des données (RGPD), infos
  réelles reprises du site officiel (SARL Serviplus, TVA FR27400267498, hébergeur SiteGround).

## À compléter / vérifier

- **Domaine final** : les URLs absolues (canonical, Open Graph, sitemap) utilisent
  `https://www.groupeserviplus.com/`. À adapter si le domaine diffère.
- **Pages intérieures du catalogue** : la couverture et les pages 8 et 23 utilisent le
  nouveau logo ; les autres pages affichent encore l'ancien logo cursif (remplacer les
  fichiers correspondants dans le dossier source puis relancer l'assemblage du PDF).
- Deux adresses e-mail apparaissent dans les documents fournis (`sarlserviplus@gmail.com`
  sur la maquette, `sarlserviplus@gmail.com` sur le catalogue). La maquette fait foi :
  `sarlserviplus@gmail.com` a été retenue.
- Quelques visuels produits sont des approximations faute de photo exacte :
  « Frites » utilise une photo de pommes de terre, « Pizzas & tapas » une photo de tapas.
  Remplaçables dans `assets/img/` (garder les mêmes noms de fichiers).

## Checklist de mise en ligne (migration vers le domaine)

1. **Domaine / DNS** : faire pointer `groupeserviplus.com` vers l'hébergeur. Pour GitHub Pages,
   ajouter un fichier `CNAME` (contenant `www.groupeserviplus.com`) + enregistrements DNS.
   Pour SiteGround/Apache, uploader le site dans `public_html/` (le `.htaccess` gère HTTPS+www,
   les 301 et le cache ; il est ignoré par GitHub Pages).
2. **URLs absolues** : vérifier `canonical`, `og:url` et `sitemap.xml` avec le domaine final
   (ils utilisent déjà `https://www.groupeserviplus.com/`).
3. **Redirections 301** : tester les anciennes URLs WordPress avec `curl -I`, par ex.
   `curl -I https://www.groupeserviplus.com/our-menu/` doit renvoyer `301` vers `/produits.html`.
   Contrôler aussi `/halal/`, `/contact/`, `/le-boeuf/`, `/mentions-legales/`, etc.
4. **Formulaire** : créer la clé Web3Forms et remplacer `TODO_WEB3FORMS_KEY` dans `contact.html`,
   puis envoyer un test.
5. **Search Console** : ajouter la propriété, soumettre `sitemap.xml`, demander l'indexation.
6. **Fiche Google Business** : vérifier adresse, horaires (voir l'écart 13h/13h30) et lien du site.
7. **Aperçu Open Graph** : tester le partage de lien (image `og-image.jpg`).
8. **TODO-CLIENT.md** : traiter les points restants (fichier à la racine).
