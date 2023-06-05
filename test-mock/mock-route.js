export const mockRoutes = async (page) =>
  await page.route(
    'https://deploy-preview-1895--ecolab-data.netlify.app/co2-model.FR-lang.fr.json',
    async (route) => {
      await route.fulfill({
        body: JSON.stringify({
          'livraison colis . commande en ligne': {
            titre: 'Processus de commande en ligne',
            description:
              "Comprends l'impact de le construction des devices selon le temps de recherche sur le site du e-commerçant, \nmais également l'impact des données échangées durant le processus de commande (mails essentiellement).\n",
            note: "La catégorie du produit impacte le temps de recherche et donc l'empreint de l'utlisation du device pour effectuer la recherche. \nNéanmoins, les différences se jouent au centième de grammes de CO2... On conserve donc la valeur de 5.4 gCO2e par commande.\n",
            formule: 5.4,
            unité: 'gCO2e',
          },
          'livraison colis . empreinte production mix électrique': {
            formule: 81,
            unité: 'gCO2e / kWh',
            note: 'Non identique à celui de NGC',
          },
          'livraison colis . empreinte production mix gaz': {
            formule: 74,
            unité: 'gCO2e / MJ',
            note: 'Non identique à celui de NGC',
          },
          'livraison colis . déplacement consommateur': {
            formule: {
              variations: [
                {
                  si: 'mode de déplacement = "voiture"',
                  alors: 'voiture',
                },
                {
                  si: 'mode de déplacement = "moto"',
                  alors: 'moto',
                },
                {
                  si: 'mode de déplacement = "commun"',
                  alors: 'commun',
                },
                {
                  si: 'mode de déplacement = "marche"',
                  alors: 'marche',
                },
                {
                  si: 'mode de déplacement = "vélo"',
                  alors: 'vélo',
                },
                {
                  si: 'mode de déplacement = "petit véhicule électrique"',
                  alors: 'petit véhicule électrique',
                },
                {
                  sinon: 'moyen',
                },
              ],
            },
          },
          'livraison colis . déplacement consommateur . moyen': {
            formule: {
              somme: [
                'voiture * voiture . part déplacement',
                'moto * moto . part déplacement',
                'commun * commun . part déplacement',
                'marche * marche . part déplacement',
                'vélo * vélo . part déplacement',
                'petit véhicule électrique * petit véhicule électrique . part déplacement',
              ],
            },
          },
          'livraison colis . déplacement consommateur . mode de déplacement': {
            formule: {
              'une possibilité': {
                'choix obligatoire': 'oui',
                possibilités: [
                  'voiture',
                  'moto',
                  'commun',
                  'marche',
                  'vélo',
                  'petit véhicule électrique',
                ],
              },
            },
            'par défaut': "'moyenne'",
          },
          'livraison colis . déplacement consommateur . distance réelle': {
            titre: 'Distance réelle allouée au colis',
            formule: 'distance * allocation du trajet au colis',
          },
          'livraison colis . déplacement consommateur . distance': {
            question:
              'Quelle est la distance moyenne parcourue pour aller chercher son colis ?',
            'par défaut': 7,
            unité: 'km',
          },
          'livraison colis . déplacement consommateur . allocation du trajet au colis':
            {
              'par défaut': 0.7,
            },
          'livraison colis . déplacement consommateur . voiture': {
            formule: 'usage + autres impacts',
          },
          'livraison colis . déplacement consommateur . voiture . part déplacement':
            {
              formule:
                '1 - moto . part déplacement - commun . part déplacement - marche . part déplacement - vélo . part déplacement - petit véhicule électrique . part déplacement',
            },
          'livraison colis . déplacement consommateur . voiture . usage': {
            formule: 'distance réelle * empreinte',
          },
          'livraison colis . déplacement consommateur . voiture . usage . empreinte':
            {
              formule: 150.97,
              unité: 'gCO2e/km',
            },
          'livraison colis . déplacement consommateur . voiture . autres impacts':
            {
              titre: 'Impacts fabrication, entretien, infrastructures',
              formule: 'distance réelle * empreinte',
            },
          'livraison colis . déplacement consommateur . voiture . autres impacts . empreinte':
            {
              formule: 90.5,
              unité: 'gCO2e/km',
            },
          'livraison colis . déplacement consommateur . moto': {
            formule: 'usage + autres impacts',
          },
          'livraison colis . déplacement consommateur . moto . part déplacement':
            {
              formule: {
                variations: [
                  {
                    si: 'distance < 2',
                    alors: 0.012,
                  },
                  {
                    si: 'distance < 5',
                    alors: 0.0219,
                  },
                  {
                    si: 'distance < 15',
                    alors: 0.0161,
                  },
                  {
                    si: 'distance < 30',
                    alors: 0.0104,
                  },
                  {
                    sinon: 0.005,
                  },
                ],
              },
            },
          'livraison colis . déplacement consommateur . moto . usage': {
            formule: 'distance réelle * empreinte',
          },
          'livraison colis . déplacement consommateur . moto . usage . empreinte':
            {
              formule: 93.834,
              unité: 'gCO2e/km',
            },
          'livraison colis . déplacement consommateur . moto . autres impacts':
            {
              titre: 'Impacts fabrication, entretien, infrastructures',
              formule: 'distance réelle * empreinte',
            },
          'livraison colis . déplacement consommateur . moto . autres impacts . empreinte':
            {
              formule: 14.3,
              unité: 'gCO2e/km',
            },
          'livraison colis . déplacement consommateur . commun': {
            formule: 'usage + autres impacts',
          },
          'livraison colis . déplacement consommateur . commun . part déplacement':
            {
              formule: {
                variations: [
                  {
                    si: 'distance < 2',
                    alors: 0.0908,
                  },
                  {
                    si: 'distance < 5',
                    alors: 0.1813,
                  },
                  {
                    si: 'distance < 15',
                    alors: 0.1384,
                  },
                  {
                    si: 'distance < 30',
                    alors: 0.1005,
                  },
                  {
                    sinon: 0.1647,
                  },
                ],
              },
            },
          'livraison colis . déplacement consommateur . commun . usage': {
            formule: 'distance réelle * empreinte',
          },
          'livraison colis . déplacement consommateur . commun . usage . empreinte':
            {
              formule: '499.019 / nombre de voyageurs',
              unité: 'gCO2e/km',
            },
          'livraison colis . déplacement consommateur . commun . nombre de voyageurs':
            {
              formule: 12,
            },
          'livraison colis . déplacement consommateur . commun . autres impacts':
            {
              titre: 'Impacts fabrication, entretien, infrastructures',
              formule: 'distance réelle * empreinte',
            },
          'livraison colis . déplacement consommateur . commun . autres impacts . empreinte':
            {
              formule: 14.7,
              unité: 'gCO2e/km',
            },
          'livraison colis . déplacement consommateur . marche': {
            formule: 'autres impacts',
          },
          'livraison colis . déplacement consommateur . marche . part déplacement':
            {
              formule: {
                variations: [
                  {
                    si: 'distance < 2',
                    alors: '0.5113 / 2',
                  },
                  {
                    si: 'distance < 5',
                    alors: '0.0916 / 2',
                  },
                  {
                    si: 'distance < 15',
                    alors: '0.0222 / 2',
                  },
                  {
                    si: 'distance < 30',
                    alors: '0.0347 / 2',
                  },
                  {
                    sinon: '0.048 / 2',
                  },
                ],
              },
              note: 'Chiffres étranges pour la marche .. Je vois mal qqun faire 30 km à pied pour un colis.',
            },
          'livraison colis . déplacement consommateur . marche . autres impacts':
            {
              titre: 'Impacts fabrication, entretien, infrastructures',
              formule: 'distance réelle * empreinte',
            },
          'livraison colis . déplacement consommateur . marche . autres impacts . empreinte':
            {
              formule: 12,
              unité: 'gCO2e/km',
            },
          'livraison colis . déplacement consommateur . vélo': {
            titre: 'Vélo musculaire',
            formule: 'autres impacts',
          },
          'livraison colis . déplacement consommateur . vélo . part déplacement':
            {
              formule: {
                variations: [
                  {
                    si: 'distance < 2',
                    alors: '0.5113 / 2',
                  },
                  {
                    si: 'distance < 5',
                    alors: '0.0916 / 2',
                  },
                  {
                    si: 'distance < 15',
                    alors: '0.0222 / 2',
                  },
                  {
                    si: 'distance < 30',
                    alors: '0.0347 / 2',
                  },
                  {
                    sinon: '0.048 / 2',
                  },
                ],
              },
              note: "Considéré comme la marche d'ou la division par 2",
            },
          'livraison colis . déplacement consommateur . vélo . autres impacts':
            {
              titre: 'Impacts fabrication, entretien, infrastructures',
              formule: 'distance réelle * empreinte',
            },
          'livraison colis . déplacement consommateur . vélo . autres impacts . empreinte':
            {
              formule: 12,
              unité: 'gCO2e/km',
            },
          'livraison colis . déplacement consommateur . petit véhicule électrique':
            {
              titre: 'VAE ou trotinette',
              formule: 'autres impacts',
            },
          'livraison colis . déplacement consommateur . petit véhicule électrique . part déplacement':
            {
              formule: {
                variations: [
                  {
                    si: 'distance < 2',
                    alors: 0.0478,
                  },
                  {
                    si: 'distance < 5',
                    alors: 0.0316,
                  },
                  {
                    si: 'distance < 15',
                    alors: 0.0099,
                  },
                  {
                    si: 'distance < 30',
                    alors: 0.0035,
                  },
                  {
                    sinon: 0.001,
                  },
                ],
              },
            },
          'livraison colis . déplacement consommateur . petit véhicule électrique . autres impacts':
            {
              titre: 'Impacts fabrication, entretien, infrastructures',
              formule: 'distance réelle * empreinte',
            },
          'livraison colis . déplacement consommateur . petit véhicule électrique . autres impacts . empreinte':
            {
              formule: 18.4,
              unité: 'gCO2e/km',
            },
          'livraison colis . emballage': {
            titre: 'Emballage du colis',
            note: "Hypothèse d'un emballage carton uniquement",
            formule: 'poids emballage * empreinte carton',
          },
          'livraison colis . empreinte carton': {
            formule: 1.29,
            unité: 'gCO2e/g',
            note: 'Etrange, dans la base carbone, on a "Caisses en carton ondulé" 1.17 kgCO2e/kg.',
          },
          'livraison colis . emballage . poids emballage': {
            formule: 'surface * densité',
            unité: 'g',
            note: "Pour le moment, Publicodes présente une limite importante au niveau de la fonction \"Puissance\".\nLe but ici étant de déduire du volume d'une sphère son rayon, et donc sa surface, la calcul d'une racine cubique (^1/3) est nécessaire.\nLes tentatives d'utilisation de la `référence` circulaire n'ont pas fonctionné. Je laisse les règles dans la base de code même si la valeur\ndu poids de l'emballage est pour le moment hardcodée dans la valeur `par défaut`.\n\nCas simplifié [ici](https://publi.codes/studio/rayon-sphère#pi%3A%0A%20%20titre%3A%20PI%0A%20%20formule%3A%203.14159265%0A%0Avolume%3A%202387%0A%0Arayon%20sphère%20cube%3A%0A%20%20formule%3A%203%20*%20volume%20%2F%20(4%20*%20pi)%0A%20%20unité%3A%20cm3%0A%20%20note%3A%20%7C%0A%20%20%20%20L'objectif%20ici%20est%20de%20détérminer%20le%20rayon%20de%20la%20sphère%20associée%20au%20colis%20via%20son%20volume.%20La%20formule%20est%20la%20suivante%20%3A%20V%20%3D%204%2F3πR%5E3.%20%0A%20%20%20%20Publicodes%20est%20limitant%20ici%20pour%20récupérer%20le%20rayon%20donné%20par%20R%5E3%20%3D%203V%20%2F%204π%0A%0Arayon%20sphère%3A%0A%20%20formule%3A%20rayon%20sphère%20cube%20%2F%20(rayon%20sphère%20*%20rayon%20sphère)%0A%20%20résoudre%20la%20référence%20circulaire%3A%20oui%0A%20%20note%3A%20%7C%0A%20%20%20%20On%20utilise%20la%20référence%20ciculaire%20de%20Publicodes%20pour%20résoudre%20R%20%3D%20R%5E3%20%2F%20(R%20*%20R)) dans la bac à sable Publicodes.\n",
          },
          'livraison colis . emballage . poids emballage . densité': {
            titre: 'Densité du carton',
            formule: 0.084,
            unité: 'g/cm2',
          },
          'livraison colis . emballage . poids emballage . surface': {
            titre: "Surface d'emballage",
            formule: 'surface sphère + ajustement',
            note: 'Formule non justifiée dans le calculateur, visiblement, on estime la surface de carton via la surface de la sphère associée au volume du colis + un facteur correctif.',
          },
          'livraison colis . emballage . poids emballage . surface . surface sphère':
            {
              formule: '4 * pi * rayon sphère * rayon sphère',
              unité: 'cm2',
              note: "Pour la surface d'une sphère, la formule est S = 4πR^2 ou R est le rayon de la sphère. On a donc besoin d'estimer ce rayon.",
            },
          'livraison colis . emballage . poids emballage . surface . surface sphère . pi':
            {
              titre: 'PI',
              formule: 3.14159265,
            },
          'livraison colis . emballage . poids emballage . surface . surface sphère . rayon sphère cube':
            {
              formule: 'rayon sphère * rayon sphère * rayon sphère',
              'par défaut': '3 * informations . volume / (4 * pi)',
              unité: 'cm3',
              note: "L'objectif ici est de détérminer le rayon de la sphère associée au colis via son volume. La formule est la suivante : V = 4/3πR^3. \nPublicodes est limitant ici pour récupérer le rayon donné par R^3 = 3V / 4π\n",
            },
          'livraison colis . emballage . poids emballage . surface . surface sphère . rayon sphère':
            {
              'inversion numérique': {
                avec: ['rayon sphère cube'],
              },
              'par défaut': {
                variations: [
                  {
                    si: "informations . catégorie = 'grande consommation'",
                    alors: 22.07,
                  },
                  {
                    si: "informations . catégorie = 'habillement'",
                    alors: 13.37,
                  },
                  {
                    si: "informations . catégorie = 'culturel'",
                    alors: 5.64,
                  },
                  {
                    si: "informations . catégorie = 'équipements volumineux'",
                    alors: 41.53,
                  },
                  {
                    si: "informations . catégorie = 'autre'",
                    alors: 27.69,
                  },
                ],
              },
              note: "On utilise l'inversion numérique de Publicodes pour résoudre R = R^3\n",
            },
          'livraison colis . emballage . poids emballage . surface . ajustement':
            {
              formule: 'surface sphère * 0.45',
              note: 'Pas de source pour ce facteur 0.45.',
            },
          'livraison colis . entrepot stockage': {
            formule: 'nombre * empreinte entrepot',
          },
          'livraison colis . entrepot stockage . nombre': {
            titre:
              "Nombre d'entrepôts de stockage dans le processus de livraison",
            formule: 1,
          },
          'livraison colis . empreinte entrepot': {
            formule: {
              somme: ['infrastructures', 'électricité', 'gaz'],
            },
          },
          'livraison colis . empreinte entrepot . taille': {
            formule: 10000,
            unité: 'm2',
          },
          'livraison colis . empreinte entrepot . nombre de jours de stockage':
            {
              formule: 20,
              unité: 'jour',
            },
          'livraison colis . empreinte entrepot . durée de vie': {
            formule: 50,
            unité: 'an',
          },
          'livraison colis . empreinte entrepot . volume de stockage par m2': {
            formule: 2,
            unité: 'm3',
            note: 'Pas de source',
          },
          'livraison colis . empreinte entrepot . nombre de colis par m2': {
            formule:
              'volume de stockage par m2 * 1000000 cm3 / (informations . volume * 4)',
            unité: 'colis / m2',
            note: "Facteur 1000000 pour la conversion cm3 m3\nD'où vient le facteur 4 ?\n",
          },
          'livraison colis . empreinte entrepot . infrastructures': {
            formule: 'part entrepot par colis * empreinte entrepot',
            unité: 'gCO2e',
          },
          'livraison colis . empreinte entrepot . infrastructures . part entrepot par colis':
            {
              formule: '1 / nombre de colis par m2',
            },
          'livraison colis . empreinte entrepot . infrastructures . nombre de colis par m2':
            {
              formule:
                'empreinte entrepot . durée de vie * 365 * empreinte entrepot . nombre de colis par m2 / empreinte entrepot . nombre de jours de stockage',
              note: "Erreur ? Si l'empreinte de la construction de l'entrepôt est par an, on ne devrait pas avoir à multiplier par la durée de vie c'est étrange...",
            },
          'livraison colis . empreinte entrepot . infrastructures . empreinte entrepot':
            {
              titre: 'Empreinte construction et démolition entrepôt',
              formule: 12515.52451,
              unité: 'gCO2e/m2/an',
            },
          'livraison colis . empreinte entrepot . électricité': {
            formule:
              '(consommation entrepot par jour / empreinte entrepot . nombre de colis par m2) * nombre de jours de stockage * empreinte production mix électrique',
            unité: 'gCO2e',
          },
          'livraison colis . empreinte entrepot . électricité . consommation entrepot par jour':
            {
              formule: 0.12,
              unité: 'kWh/m2/jour',
              note: 'Hypothèse: entrepôt moyennement mécanisé, pas de réfrigération.\nPas de source.\n',
            },
          'livraison colis . empreinte entrepot . gaz': {
            formule:
              '(consommation entrepot par jour / empreinte entrepot . nombre de colis par m2) * nombre de jours de stockage * empreinte production mix gaz',
            unité: 'gCO2e',
          },
          'livraison colis . empreinte entrepot . gaz . consommation entrepot par jour':
            {
              formule: '82.8 / 365',
              unité: 'MJ/m2/jour',
              note: 'Pas de source.\n',
            },
          'livraison colis': {
            icônes: '🚚',
            titre: "Livraison d'un colis",
            note: 'Le champ de l’étude débute au moment de la validation de la commande par le e-commerçant, en faisant **l’hypothèse que l’article (produit) \nest déjà en stock**, jusqu’à la récupération de(s) article(s) constitutif(s) de la commande par le e-consommateur. \n\nCe périmètre est présenté à la figure ci-dessous (segment 3). \n\n**Les étapes amont d’extraction de matières premières, d’approvisionnement, et de mise en forme de celles-ci ainsi que l’assemblage du produit fini ne sont pas inclues dans le champ de l’étude (segment 1 de la figure ci-dessous). Le premier segment de distribution \nentre l’usine de fabrication/assemblage du produit fini et l’entrepôt de stockage n’est également pas inclus** (segment 2 de la figure ci-dessous).\n\n![image](https://user-images.githubusercontent.com/55186402/234813967-7bda2331-9349-4f5b-b595-613a0fe75741.png)\n\nCertaines études suggèrent que le commerce en ligne favorise l’allongement à l’international des chaînes de distribution et l’importation de biens (segment 2 sur la figure ci-dessus).\nEn fonction du mode de transport international, cet allongement peut dégrader la performance environnementale du produit. Ainsi, des sites majeurs du commerce en ligne, tels que Wish ou AliExpress \nfondent leur modèle économique sur l’importation par fret express aérien de produits, essentiellement depuis l’Asie. Cela constitue une source majeure d’émissions de gaz à effet de serre . \nL’impact carbone du fret aérien serait d’un ordre de grandeur 100 fois plus important que celui du transport maritime de marchandises .\n\nPour un produit donné, qu’il soit local ou importé, le présent projet n’a pas documenté les différences de performance environnementale liées aux étapes de production amont du bien acheté. \nCe point nécessiterait néanmoins des investigations complémentaires. De ce fait, dans le présent projet, que le produit consommé provienne du commerce en ligne livré via un point de retrait ou à domicile ou bien du commerce physique,\nqu’il soit local ou importé, la principale différence de la performance environnementale entre les deux modes de commerce repose sur les étapes finales d’entreposage et de distribution au consommateur ainsi que de déplacement du consommateur.\n\nC’est un point essentiel à avoir en tête car l’optimisation logistique des derniers kilomètres de distribution et de livraison est souvent présentée comme un bénéfice environnemental du commerce en ligne. \nNéanmoins, ce bénéfice pourrait être nuancé dès lors qu’une différence de performance environnementale des produits proposés apparaîtrait ou que les produits achetés seraient davantage gaspillés ou non consommés. \nC’est pourquoi, afin d’avoir une vision plus large de la performance environnementale associée au commerce en ligne, il pourrait intéressant d’étudier l’influence de celui-ci sur les étapes amont. \nEn effet, comme présenté dans les encadrés ci-dessous, pour certains produits, la majorité de la contribution à la empreinte carbone provient des étapes de production de celui-ci.\n',
            formule: {
              variations: [
                {
                  si: "scénario = 'domicile'",
                  alors: 'scénario . domicile',
                },
                {
                  si: "scénario = 'point de retrait'",
                  alors: 'scénario . point de retrait',
                },
                {
                  si: "scénario = 'click and collect'",
                  alors: 'scénario . click and collect',
                },
                {
                  si: "scénario = 'magasin traditionnel'",
                  alors: 'scénario . magasin traditionnel',
                },
              ],
            },
          },
          'livraison colis . scénario': {
            titre: 'Scénario de livraison',
            formule: {
              'une possibilité': {
                'choix obligatoire': 'oui',
                possibilités: [
                  'domicile',
                  'point de retrait',
                  'click and collect',
                  'magasin traditionnel',
                ],
              },
            },
            'par défaut': "'domicile'",
            description:
              'La livraison à domicile semble être le mode de livraison plébiscité par la grande majorité des e-acheteurs (données issues de [cette étude FEVAD 2022](https://www.fevad.com/wp-content/uploads/2022/06/FEVAD_CHIFFRES-CLES_2022_compressed.pdf)!\n\n![](https://github.com/datagir/impactco2/assets/55186402/ec002892-8912-4690-a6b6-90ca2bd53e2a)\n',
          },
          'livraison colis . scénario . domicile': {
            titre: 'Livraison à domicile',
            formule: {
              somme: [
                'commande en ligne',
                'emballage',
                'entrepot stockage',
                'transport inter plateformes',
                'plateformes',
                'transport livraison',
              ],
            },
          },
          'livraison colis . scénario . point de retrait': {
            titre: 'Livraison en point de retrait',
            formule: {
              somme: [
                'commande en ligne',
                'emballage',
                'entrepot stockage',
                'transport inter plateformes',
                'plateformes',
                'transport livraison',
                'point de retrait',
                'déplacement consommateur',
              ],
            },
          },
          'livraison colis . scénario . click and collect': {
            titre: 'Livraison "Click and collect"',
            formule: {
              somme: [
                'commande en ligne',
                'emballage',
                'entrepot stockage',
                'transport inter plateformes',
                'plateformes',
                'transport livraison',
                'magasin',
                'déplacement consommateur',
              ],
            },
          },
          'livraison colis . scénario . magasin traditionnel': {
            titre: 'Achat en magasin traditionnel',
            formule: {
              somme: [
                'entrepot stockage',
                'transport inter plateformes',
                'plateformes',
                'magasin',
                'déplacement consommateur',
              ],
            },
          },
          'livraison colis . scénario . magasin traditionnel . plateformes': {
            formule: {
              recalcul: {
                règle: 'livraison colis . plateformes',
                avec: {
                  'livraison colis . plateformes . nombre': 1,
                },
              },
            },
          },
          'livraison colis . scénario . magasin traditionnel . déplacement consommateur':
            {
              formule: {
                recalcul: {
                  règle: 'livraison colis . déplacement consommateur',
                  avec: {
                    'livraison colis . déplacement consommateur . mode de déplacement':
                      "'voiture'",
                    'livraison colis . déplacement consommateur . distance': 25,
                  },
                },
              },
              note: "Légère différence au niveau du déplacement consommateur dont la formule de l'empreinte au km de la voiture \nest différente dans le scénario de l'excel. On pourra passer plus de temps sur l'empreinte de la voiture \n(et notamment reprendre les FE d'ICO2) si on considère que c'est un paramètre important (et à priori ça l'est !).\n",
            },
          'livraison colis . informations': null,
          'livraison colis . informations . catégorie': {
            titre: 'Catégorie de produit',
            avec: {
              'grande consommation': null,
              habillement: null,
              culturel: null,
              'équipements volumineux': null,
              autre: null,
            },
            formule: {
              'une possibilité': {
                'choix obligatoire': 'oui',
                possibilités: [
                  'grande consommation',
                  'habillement',
                  'culturel',
                  'équipements volumineux',
                  'autre',
                ],
              },
            },
            'par défaut': "'habillement'",
            description:
              "Les produits d'habillement semblent être les plus achetés en ligne (données issues de [cette étude FEVAD 2022](https://www.fevad.com/wp-content/uploads/2022/06/FEVAD_CHIFFRES-CLES_2022_compressed.pdf)!\n\n![](https://github.com/datagir/impactco2/assets/55186402/06161a2d-6314-406d-b6f5-971f7e75fbae)\n",
            note: "La catégorie de produit impacte : le volume, le poids, le temps passé sur le site de commande, la durée de stockage dans l'entrepôt et le PDV.\n",
          },
          'livraison colis . informations . volume': {
            titre: 'Volume du colis',
            question: 'Quel est le volume du colis ?',
            unité: 'cm3',
            'par défaut': {
              variations: [
                {
                  si: "catégorie = 'grande consommation'",
                  alors: 45000,
                },
                {
                  si: "catégorie = 'habillement'",
                  alors: 10000,
                },
                {
                  si: "catégorie = 'culturel'",
                  alors: 750,
                },
                {
                  si: "catégorie = 'équipements volumineux'",
                  alors: 300000,
                },
                {
                  si: "catégorie = 'autre'",
                  alors: 90000,
                },
              ],
            },
          },
          'livraison colis . informations . poids': {
            titre: 'Poids du colis',
            question: 'Quel est le poids du colis ?',
            unité: 'kg',
            'par défaut': {
              variations: [
                {
                  si: "catégorie = 'grande consommation'",
                  alors: 20,
                },
                {
                  si: "catégorie = 'habillement'",
                  alors: 1.5,
                },
                {
                  si: "catégorie = 'culturel'",
                  alors: 0.2,
                },
                {
                  si: "catégorie = 'équipements volumineux'",
                  alors: 70,
                },
                {
                  si: "catégorie = 'autre'",
                  alors: 18,
                },
              ],
            },
          },
          'livraison colis . magasin': {
            formule: {
              somme: ['infrastructures', 'électricité', 'gaz'],
            },
          },
          'livraison colis . magasin . type': {
            avec: {
              hypermarché: null,
              supermarché: null,
              'galerie marchande': null,
              'magasin spécialisé': null,
            },
            formule: {
              'une possibilité': {
                'choix obligatoire': 'oui',
                possibilités: [
                  'hypermarché',
                  'supermarché',
                  'galerie marchande',
                  'magasin spécialisé',
                ],
              },
            },
            'par défaut': "'hypermarché'",
          },
          'livraison colis . magasin . taille': {
            formule: 2000,
            unité: 'm2',
          },
          'livraison colis . magasin . nombre de jours de stockage': {
            formule: 28,
            unité: 'jour',
          },
          'livraison colis . magasin . durée de vie': {
            formule: 50,
            unité: 'an',
          },
          'livraison colis . magasin . facteur multiplication volume': {
            titre:
              "Facteur de multiplication du volume de l'article (volume occupé/volume article)",
            formule: 4,
          },
          'livraison colis . magasin . volume stockage total': {
            formule: 2000,
            unité: 'm3',
            note: 'Pas de source',
          },
          'livraison colis . magasin . capacité stockage': {
            formule: 'volume stockage total * 52',
            unité: 'm3 / semaine.an',
          },
          'livraison colis . magasin . infrastructures': {
            formule: 'part magasin par article * empreinte magasin',
            unité: 'gCO2e',
          },
          'livraison colis . magasin . infrastructures . part magasin par article':
            {
              formule:
                'taille * (facteur multiplication volume * (informations . volume / 1000000) * (nombre de jours de stockage / 7) / (capacité stockage * durée de vie))',
              note: "Je n'ai pas vérifié la formule",
            },
          'livraison colis . magasin . infrastructures . empreinte magasin': {
            titre: 'Empreinte construction et démolition magasin traditionnel',
            formule: 2500,
            unité: 'gCO2e/m2/an',
          },
          'livraison colis . magasin . consommation énergie totale par an': {
            formule: {
              variations: [
                {
                  si: "type = 'hypermarché'",
                  alors: 625,
                },
                {
                  si: "type = 'supermarché'",
                  alors: 690,
                },
                {
                  si: "type = 'galerie marchande'",
                  alors: 290,
                },
                {
                  si: "type = 'magasin spécialisé'",
                  alors: 110,
                },
              ],
            },
            unité: 'kWh/m2/an',
          },
          'livraison colis . magasin . électricité': {
            formule:
              'empreinte production mix électrique * ((consommation électrcité par an * taille) / (capacité stockage / (facteur multiplication volume * (informations . volume / 1000000) * (nombre de jours de stockage / 7))))',
            unité: 'gCO2e',
          },
          'livraison colis . magasin . électricité . part consommation': {
            formule: 0.82,
          },
          'livraison colis . magasin . électricité . consommation électrcité par an':
            {
              formule: 'part consommation * consommation énergie totale par an',
            },
          'livraison colis . magasin . gaz': {
            formule:
              'empreinte production mix gaz * ((consommation gaz par an * taille) / (capacité stockage / (facteur multiplication volume * (informations . volume / 1000000) * (nombre de jours de stockage / 7))))',
            unité: 'gCO2e',
          },
          'livraison colis . magasin . gaz . part consommation': {
            formule: 0.18,
          },
          'livraison colis . magasin . gaz . consommation gaz par an': {
            formule:
              'part consommation * 3.6 * consommation énergie totale par an',
          },
          'livraison colis . empreinte véhicule par km HBEFA': {
            note: 'méthode HBEFA',
            formule: {
              somme: [
                'a0',
                'a1 * vitesse moyenne véhicule',
                'a2 * vitesse moyenne véhicule * vitesse moyenne véhicule',
                'a3 * vitesse moyenne véhicule * vitesse moyenne véhicule * vitesse moyenne véhicule',
                'a4 * vitesse moyenne véhicule * vitesse moyenne véhicule * vitesse moyenne véhicule * vitesse moyenne véhicule',
              ],
            },
          },
          'livraison colis . empreinte véhicule par km HBEFA . vitesse moyenne véhicule':
            {
              question: 'Quelle est la vitesse moyenne du véhicule ?',
              'par défaut': 30,
              unité: 'km/h',
            },
          'livraison colis . empreinte véhicule par km HBEFA . type de véhicule':
            {
              question: 'Quelle est le type de véhicule ?',
              'par défaut': "'VUL moyen'",
            },
          'livraison colis . empreinte véhicule par km HBEFA . a0': {
            formule: {
              variations: [
                {
                  si: "type de véhicule = 'VUL moyen'",
                  alors: 495.724170429,
                },
                {
                  si: "type de véhicule = 'PL moyen'",
                  alors: 2658.381936133,
                },
              ],
            },
          },
          'livraison colis . empreinte véhicule par km HBEFA . a1': {
            formule: {
              variations: [
                {
                  si: "type de véhicule = 'VUL moyen'",
                  alors: -16.736438277,
                },
                {
                  si: "type de véhicule = 'PL moyen'",
                  alors: -59.503740818,
                },
              ],
            },
          },
          'livraison colis . empreinte véhicule par km HBEFA . a2': {
            formule: {
              variations: [
                {
                  si: "type de véhicule = 'VUL moyen'",
                  alors: 0.333519703,
                },
                {
                  si: "type de véhicule = 'PL moyen'",
                  alors: 0.15518666,
                },
              ],
            },
          },
          'livraison colis . empreinte véhicule par km HBEFA . a3': {
            formule: {
              variations: [
                {
                  si: "type de véhicule = 'VUL moyen'",
                  alors: -0.002759366,
                },
                {
                  si: "type de véhicule = 'PL moyen'",
                  alors: 0.011536086,
                },
              ],
            },
          },
          'livraison colis . empreinte véhicule par km HBEFA . a4': {
            formule: {
              variations: [
                {
                  si: "type de véhicule = 'VUL moyen'",
                  alors: 0.000008481,
                },
                {
                  si: "type de véhicule = 'PL moyen'",
                  alors: -0.000095661,
                },
              ],
            },
          },
          'livraison colis . plateformes': {
            formule: 'nombre * empreinte plateforme',
          },
          'livraison colis . plateformes . nombre': {
            titre: 'Nombre plateformes dans le processus de livraison',
            formule: 2,
          },
          'livraison colis . empreinte plateforme': {
            formule: {
              somme: ['infrastructures', 'électricité', 'gaz'],
            },
          },
          'livraison colis . empreinte plateforme . taille': {
            formule: 10000,
            unité: 'm2',
          },
          'livraison colis . empreinte plateforme . nombre de jours de stockage':
            {
              formule: 1,
              unité: 'jour',
            },
          'livraison colis . empreinte plateforme . durée de vie': {
            formule: 50,
            unité: 'an',
          },
          'livraison colis . empreinte plateforme . nombre de colis par jour': {
            formule: 100000,
          },
          'livraison colis . empreinte plateforme . nombre de colis par an': {
            formule: 'nombre de colis par jour * 365',
          },
          'livraison colis . empreinte plateforme . infrastructures': {
            formule: 'part de plateforme par colis * empreinte entrepot',
            unité: 'gCO2e',
          },
          'livraison colis . empreinte plateforme . infrastructures . part de plateforme par colis':
            {
              formule: '1 / nombre de colis par m2',
            },
          'livraison colis . empreinte plateforme . infrastructures . nombre de colis par m2':
            {
              formule:
                'empreinte plateforme . nombre de colis par an * empreinte plateforme . durée de vie / empreinte plateforme . taille',
              note: "Erreur ? Si l'empreinte de la construction de l'entrepôt est par an, on ne devrait pas avoir à multiplier par la durée de vie c'est étrange...",
            },
          'livraison colis . empreinte plateforme . infrastructures . empreinte entrepot':
            {
              titre: 'Empreinte construction et démolition entrepôt',
              formule: 12515.52451,
              unité: 'gCO2e/m2/an',
            },
          'livraison colis . empreinte plateforme . électricité': {
            formule:
              '((consommation plateforme par jour * taille) / nombre de colis par jour) * nombre de jours de stockage * empreinte production mix électrique',
            unité: 'gCO2e',
          },
          'livraison colis . empreinte plateforme . électricité . consommation plateforme par jour':
            {
              formule: 0.12,
              unité: 'kWh/m2/jour',
              note: 'Hypothèse: entrepôt moyennement mécanisé, pas de réfrigération.\nPas de source.\n',
            },
          'livraison colis . empreinte plateforme . gaz': {
            formule:
              '((consommation plateforme par jour * taille) / nombre de colis par jour) * nombre de jours de stockage * empreinte production mix gaz',
            unité: 'gCO2e',
          },
          'livraison colis . empreinte plateforme . gaz . consommation plateforme par jour':
            {
              formule: '82.8 / 365',
              unité: 'MJ/m2/jour',
              note: 'Pas de source.\n',
            },
          'livraison colis . point de retrait': {
            formule: 'nombre * empreinte point de retrait',
          },
          'livraison colis . point de retrait . nombre': {
            titre:
              'Nombre de passages en point de retrait dans le processus de livraison',
            formule: 1,
          },
          'livraison colis . empreinte point de retrait': {
            formule: {
              somme: ['infrastructures', 'électricité', 'gaz'],
            },
          },
          'livraison colis . empreinte point de retrait . taille': {
            formule: 10,
            unité: 'm2',
          },
          'livraison colis . empreinte point de retrait . nombre de jours de stockage':
            {
              formule: 2,
              unité: 'jour',
            },
          'livraison colis . empreinte point de retrait . durée de vie': {
            formule: 50,
            unité: 'an',
          },
          'livraison colis . empreinte point de retrait . volume de stockage par m2':
            {
              formule: 1,
              unité: 'm3',
              note: 'Pas de source',
            },
          'livraison colis . empreinte point de retrait . nombre de colis par m2':
            {
              formule:
                'volume de stockage par m2 * 1000000 cm3 / informations . volume',
              unité: 'colis / m2',
              note: 'Facteur 1000000 pour la conversion cm3 m3',
            },
          'livraison colis . empreinte point de retrait . infrastructures': {
            formule: 'part point de retrait par colis * empreinte magasin',
            unité: 'gCO2e',
          },
          'livraison colis . empreinte point de retrait . infrastructures . part point de retrait par colis':
            {
              formule: '1 / nombre de colis par m2',
            },
          'livraison colis . empreinte point de retrait . infrastructures . nombre de colis par m2':
            {
              formule:
                'empreinte point de retrait . durée de vie * 365 * empreinte point de retrait . nombre de colis par m2 / 24',
              note: "D'ou vient ce facteur (1 / 24) ? Pourquoi n'y a t-il pas le nombre de jours dans l'équation ?",
            },
          'livraison colis . empreinte point de retrait . infrastructures . empreinte magasin':
            {
              titre:
                'Empreinte construction et démolition magasin traditionnel',
              formule: 2500,
              unité: 'gCO2e/m2/an',
            },
          'livraison colis . empreinte point de retrait . électricité': {
            formule:
              '(consommation point de retrait par jour / empreinte point de retrait . nombre de colis par m2) * nombre de jours de stockage * empreinte production mix électrique',
            unité: 'gCO2e',
          },
          'livraison colis . empreinte point de retrait . électricité . consommation point de retrait par jour':
            {
              formule: 0.74,
              unité: 'kWh/m2/jour',
              note: 'Hypothèse: Enseigne non alimentaire\nPas de source.\n',
            },
          'livraison colis . empreinte point de retrait . gaz': {
            formule:
              '(consommation point de retrait par jour / empreinte point de retrait . nombre de colis par m2) * nombre de jours de stockage * empreinte production mix gaz',
            unité: 'gCO2e',
          },
          'livraison colis . empreinte point de retrait . gaz . consommation point de retrait par jour':
            {
              formule: '82.8 / 365',
              unité: 'MJ/m2/jour',
              note: 'Pas de source.\n',
            },
          'livraison colis . transport inter plateformes': {
            formule: 'nombre * empreinte trajet',
          },
          'livraison colis . transport inter plateformes . nombre': {
            titre:
              'Nombre de trajets entre plateformes dans le processus de livraison',
            note: 'Pour le moement, nous ne faisons pas de différences entre les trajets',
            formule: 'plateformes . nombre',
          },
          'livraison colis . transport inter plateformes . empreinte trajet': {
            formule: {
              somme: ['route', 'fabrication véhicule', 'usage véhicule'],
            },
          },
          'livraison colis . transport inter plateformes . empreinte trajet . distance':
            {
              question:
                'Quelle est la distance parcourue entre les plateformes, entrepôts de stockage ?',
              'par défaut': 1200,
              unité: 'véhicules-kilomètres',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . distance . coefficient de correction distance':
            {
              titre:
                'Coefficient de correction des distances en transport dédié',
              formule: 1.05,
            },
          'livraison colis . transport inter plateformes . empreinte trajet . distance . distance corrigée':
            {
              formule: 'distance * coefficient de correction distance',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . distance . distance à vide':
            {
              formule:
                'distance corrigée * ratio distance à vide / (1 - ratio distance à vide)',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . distance . ratio distance à vide':
            {
              formule: 0.2,
            },
          'livraison colis . transport inter plateformes . empreinte trajet . distance . distance totale':
            {
              formule: 'distance corrigée + distance à vide',
              unité: 'km',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . véhicule':
            {
              question: 'Quelle est la catégorie du véhicule ?',
              avec: {
                'VUL moyen': null,
                'PL moyen': null,
              },
              formule: {
                'une possibilité': {
                  'choix obligatoire': 'oui',
                  possibilités: ['VUL moyen', 'PL moyen'],
                },
              },
              'par défaut': "'PL moyen'",
            },
          'livraison colis . transport inter plateformes . empreinte trajet . véhicule . chargement moyen':
            {
              formule: {
                variations: [
                  {
                    si: "véhicule = 'VUL moyen'",
                    alors: 0.2,
                  },
                  {
                    si: "véhicule = 'PL moyen'",
                    alors: 3.5,
                  },
                ],
              },
              unité: 'tonnes',
              note: "Quand taux de charge = 15%\nest ce vraiment en tonnes ? pb d'homogénéité ...\n",
            },
          'livraison colis . transport inter plateformes . empreinte trajet . véhicule . vitesse moyenne':
            {
              formule: 60,
              unité: 'km/h',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . route':
            {
              formule: 'empreinte * tonnes km',
              unité: 'gCO2e',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . route . empreinte':
            {
              formule: 5.6,
              unité: 'gCO2e / tonnes.km',
              note: 'Source ECEL',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . route . tonnes km':
            {
              formule:
                'distance * livraison colis . informations . poids / 1000',
              unité: 'tonnes.km',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . fabrication véhicule':
            {
              formule: 'empreinte * tonnes km',
              unité: 'gCO2e',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . fabrication véhicule . empreinte':
            {
              formule: {
                variations: [
                  {
                    si: "véhicule = 'VUL moyen'",
                    alors: 8.4,
                  },
                  {
                    si: "véhicule = 'PL moyen'",
                    alors: 2.8,
                  },
                ],
              },
              unité: 'gCO2e / tonnes.km',
              note: 'Source ECEL (VUL par défaut)',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . fabrication véhicule . tonnes km':
            {
              formule:
                'distance * véhicule . chargement moyen * livraison colis . informations . poids / 1000',
              unité: 'tonnes.km',
              note: 'Je comprends pas pourquoi le chargement moyen apparaît ici',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . usage véhicule':
            {
              formule:
                '(livraison colis . informations . poids / 1000) * empreinte * distance . distance totale / véhicule . chargement moyen',
              unité: 'gCO2e',
            },
          'livraison colis . transport inter plateformes . empreinte trajet . usage véhicule . empreinte':
            {
              formule: {
                recalcul: {
                  règle: 'empreinte véhicule par km HBEFA',
                  avec: {
                    'empreinte véhicule par km HBEFA . vitesse moyenne véhicule':
                      'véhicule . vitesse moyenne',
                    'empreinte véhicule par km HBEFA . type de véhicule':
                      'véhicule',
                  },
                },
              },
              unité: 'gCO2e / tonnes.km',
              note: 'Source ECEL',
            },
          'livraison colis . transport livraison': {
            formule: {
              somme: ['route', 'fabrication véhicule', 'usage véhicule'],
            },
          },
          'livraison colis . transport livraison . distance': {
            question:
              'Quelle est la distance parcourue entre le dernier site et le point final de livraison ?',
            'par défaut': 70,
            unité: 'véhicules-kilomètres',
          },
          'livraison colis . transport livraison . distance . coefficient de correction distance':
            {
              titre:
                'Coefficient de correction des distances en transport dédié',
              formule: 1.05,
            },
          'livraison colis . transport livraison . distance . distance corrigée':
            {
              formule: 'distance * coefficient de correction distance',
            },
          'livraison colis . transport livraison . distance . distance à vide':
            {
              formule:
                'distance corrigée * ratio distance à vide / (1 - ratio distance à vide)',
            },
          'livraison colis . transport livraison . distance . ratio distance à vide':
            {
              formule: 0.2,
            },
          'livraison colis . transport livraison . distance . distance totale':
            {
              formule: 'distance corrigée + distance à vide',
              unité: 'km',
            },
          'livraison colis . transport livraison . véhicule': {
            question: 'Quelle est la catégorie du véhicule ?',
            avec: {
              'VUL moyen': null,
              'PL moyen': null,
            },
            formule: {
              'une possibilité': {
                'choix obligatoire': 'oui',
                possibilités: ['VUL moyen', 'PL moyen'],
              },
            },
            'par défaut': "'VUL moyen'",
          },
          'livraison colis . transport livraison . véhicule . chargement moyen':
            {
              formule: {
                variations: [
                  {
                    si: "véhicule = 'VUL moyen'",
                    alors: 0.2,
                  },
                  {
                    si: "véhicule = 'PL moyen'",
                    alors: 3.5,
                  },
                ],
              },
              unité: 'tonnes',
              note: "Quand taux de charge = 15%\nest ce vraiment en tonnes ? pb d'homogénéité ...\n",
            },
          'livraison colis . transport livraison . véhicule . vitesse moyenne':
            {
              formule: 30,
              unité: 'km/h',
            },
          'livraison colis . transport livraison . route': {
            formule: 'empreinte * tonnes km',
            unité: 'gCO2e',
          },
          'livraison colis . transport livraison . route . empreinte': {
            formule: 5.6,
            unité: 'gCO2e / tonnes.km',
            note: 'Source ECEL',
          },
          'livraison colis . transport livraison . route . tonnes km': {
            formule: 'distance * livraison colis . informations . poids / 1000',
            unité: 'tonnes.km',
          },
          'livraison colis . transport livraison . fabrication véhicule': {
            formule: 'empreinte * tonnes km',
            unité: 'gCO2e',
          },
          'livraison colis . transport livraison . fabrication véhicule . empreinte':
            {
              formule: {
                variations: [
                  {
                    si: "véhicule = 'VUL moyen'",
                    alors: 8.4,
                  },
                  {
                    si: "véhicule = 'PL moyen'",
                    alors: 2.8,
                  },
                ],
              },
              unité: 'gCO2e / tonnes.km',
              note: 'Source ECEL (VUL par défaut)',
            },
          'livraison colis . transport livraison . fabrication véhicule . tonnes km':
            {
              formule:
                'distance * véhicule . chargement moyen * livraison colis . informations . poids / 1000',
              unité: 'tonnes.km',
              note: 'Je comprends pas pourquoi le chargement moyen apparaît ici',
            },
          'livraison colis . transport livraison . usage véhicule': {
            formule:
              '(livraison colis . informations . poids / 1000) * empreinte * distance . distance totale / véhicule . chargement moyen',
            unité: 'gCO2e',
          },
          'livraison colis . transport livraison . usage véhicule . empreinte':
            {
              formule: {
                recalcul: {
                  règle: 'empreinte véhicule par km HBEFA',
                  avec: {
                    'empreinte véhicule par km HBEFA . vitesse moyenne véhicule':
                      'véhicule . vitesse moyenne',
                    'empreinte véhicule par km HBEFA . type de véhicule':
                      'véhicule',
                  },
                },
              },
              unité: 'gCO2e / tonnes.km',
              note: 'Source ECEL',
            },
        }),
      })
    }
  )
