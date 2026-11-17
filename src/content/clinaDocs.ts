/**
 * CLINA technical documents, copied from clina.de/en/downloads (8 tabs, same grouping).
 * Generated: files live in public/docs/clina/<group>/. Titles follow CLINA's own; German-only
 * guides keep their German title with the English meaning in `meaning`.
 */
export interface ClinaDoc { title: string; url: string; lang: 'en' | 'de'; pages: number; kb: number; meaning?: string; hy?: string; cover?: string }
export interface ClinaDocGroup { id: string; hy: string; en: string; docs: ClinaDoc[] }

export const CLINA_DOCS: ClinaDocGroup[] = [
  {
    "id": "catalogue",
    "hy": "Արտադրանքի կատալոգ",
    "en": "Product catalogue",
    "docs": [
      {
        "title": "Product Catalogue 2025 – complete edition (without prices)",
        "url": "/docs/clina/catalogue/2025-clina-product-catalogue-no-prices.pdf",
        "lang": "en",
        "pages": 110,
        "kb": 8081,
        "hy": "Արտադրանքի կատալոգ 2025՝ ամբողջական (առանց գների)",
        "cover": "/docs/clina/covers/2025-clina-product-catalogue-no-prices.webp"
      },
      {
        "title": "Heating and Cooling Mats",
        "url": "/docs/clina/catalogue/2025-heating-and-cooling-mats.pdf",
        "lang": "en",
        "pages": 30,
        "kb": 1792,
        "hy": "Ջեռուցման և հովացման մատեր",
        "cover": "/docs/clina/covers/2025-heating-and-cooling-mats.webp"
      },
      {
        "title": "Prefabricated Products",
        "url": "/docs/clina/catalogue/2025-prefabricated-products.pdf",
        "lang": "en",
        "pages": 7,
        "kb": 1660,
        "hy": "Գործարանային պատրաստի արտադրանք",
        "cover": "/docs/clina/covers/2025-prefabricated-products.webp"
      },
      {
        "title": "Assembly",
        "url": "/docs/clina/catalogue/2025-assembly.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 152,
        "hy": "Հավաքներ՝ կոլեկտորներ",
        "cover": "/docs/clina/covers/2025-assembly.webp"
      },
      {
        "title": "Tubes, Supply and Return Lines",
        "url": "/docs/clina/catalogue/2025-tubes-supply-and-return-lines.pdf",
        "lang": "en",
        "pages": 6,
        "kb": 514,
        "hy": "Խողովակներ, մատակարարման և վերադարձի գծեր",
        "cover": "/docs/clina/covers/2025-tubes-supply-and-return-lines.webp"
      },
      {
        "title": "Connection Components",
        "url": "/docs/clina/catalogue/2025-connection-components.pdf",
        "lang": "en",
        "pages": 8,
        "kb": 748,
        "hy": "Միացման տարրեր",
        "cover": "/docs/clina/covers/2025-connection-components.webp"
      },
      {
        "title": "Fittings",
        "url": "/docs/clina/catalogue/2025-fittings.pdf",
        "lang": "en",
        "pages": 10,
        "kb": 753,
        "hy": "Ֆիթինգներ",
        "cover": "/docs/clina/covers/2025-fittings.webp"
      },
      {
        "title": "Measurement and Control Technology",
        "url": "/docs/clina/catalogue/2025-measurement-and-control-technology.pdf",
        "lang": "en",
        "pages": 8,
        "kb": 777,
        "hy": "Չափման և կառավարման տեխնիկա",
        "cover": "/docs/clina/covers/2025-measurement-and-control-technology.webp"
      },
      {
        "title": "System separation and plastic manifold",
        "url": "/docs/clina/catalogue/2025-system-seperation-and-plastic-manifold.pdf",
        "lang": "en",
        "pages": 6,
        "kb": 672,
        "hy": "Համակարգի բաժանում և պլաստիկ կոլեկտոր",
        "cover": "/docs/clina/covers/2025-system-seperation-and-plastic-manifold.webp"
      },
      {
        "title": "Fixing Material",
        "url": "/docs/clina/catalogue/2025-fixing-material.pdf",
        "lang": "en",
        "pages": 6,
        "kb": 563,
        "hy": "Ամրացման նյութեր",
        "cover": "/docs/clina/covers/2025-fixing-material.webp"
      },
      {
        "title": "Tools and Assembly Kit",
        "url": "/docs/clina/catalogue/2025-tools-and-assembly-kit.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 767,
        "hy": "Գործիքներ և մոնտաժային հավաքածու",
        "cover": "/docs/clina/covers/2025-tools-and-assembly-kit.webp"
      }
    ]
  },
  {
    "id": "installation",
    "hy": "Մոնտաժի ուղեցույցներ",
    "en": "Installation guidelines",
    "docs": [
      {
        "title": "CR01 – Professional handling of capillary tube mats",
        "url": "/docs/clina/installation/cr01-professional-handling-of-capillary-tube-mats.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 464
      },
      {
        "title": "CR02 – Filling, venting and leak test",
        "url": "/docs/clina/installation/cr02-filling-venting-and-leak-test.pdf",
        "lang": "en",
        "pages": 4,
        "kb": 552
      },
      {
        "title": "Fußbodenheizung im Estrich mit OPTIMAT",
        "url": "/docs/clina/installation/fussbodenheizung-optimat-im-estrich.pdf",
        "lang": "de",
        "pages": 4,
        "kb": 501,
        "meaning": "Floor heating in screed with OPTIMAT"
      },
      {
        "title": "Fußbodenheizung auf Holz und Trockenbau mit FOLIMAT",
        "url": "/docs/clina/installation/fussbodenheizung-auf-holz-und-trockenbau.pdf",
        "lang": "de",
        "pages": 5,
        "kb": 1200,
        "meaning": "Floor heating on timber and drywall subfloors with FOLIMAT"
      },
      {
        "title": "Fußbodenheizung auf Zement- oder Fließestrich mit FOLIMAT",
        "url": "/docs/clina/installation/fussbodenheizung-auf-zement-oder-fliessestrich.pdf",
        "lang": "de",
        "pages": 5,
        "kb": 940,
        "meaning": "Floor heating on cement or flowing screed with FOLIMAT"
      },
      {
        "title": "Gypsum board ceiling tile",
        "url": "/docs/clina/installation/gypsum-board-ceiling-tile.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 551
      },
      {
        "title": "HP 01 Heating-up report OPTIMAT in cement or floating screed",
        "url": "/docs/clina/installation/hp-01-heating-up-report-optimat-in-cement-or-floating-screed.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 168
      },
      {
        "title": "HP 02 Heating-up report FOLIMAT in levelling compound",
        "url": "/docs/clina/installation/hp-02-heating-up-report-folimat-in-levelling-compound.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 160
      },
      {
        "title": "HP 03 Heating-up report OPTIMAT in plaster",
        "url": "/docs/clina/installation/hp-03-heating-up-report-optimat-in-plaster.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 138
      },
      {
        "title": "Metal panel",
        "url": "/docs/clina/installation/metal-panel.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 255
      },
      {
        "title": "OPTIPANEL 15 – ceiling",
        "url": "/docs/clina/installation/optipanel-15-ceiling.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 365
      },
      {
        "title": "OPTIPANEL 15 – wall",
        "url": "/docs/clina/installation/optipanel-15-wall.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 432
      },
      {
        "title": "OPTIPANEL 18 – ceiling",
        "url": "/docs/clina/installation/optipanel-18-ceiling.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 193
      },
      {
        "title": "Plaster on gypsum board – ceiling",
        "url": "/docs/clina/installation/plaster-on-gypsum-board-ceiling.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 393
      },
      {
        "title": "Putz an Rohbeton – Decke | V1 bis V4",
        "url": "/docs/clina/installation/putz-an-rohbeton-decke-v1-v4.pdf",
        "lang": "de",
        "pages": 24,
        "kb": 2902,
        "meaning": "Plaster on raw concrete – ceiling, variants V1–V4"
      },
      {
        "title": "Putz an Rohbeton – Decke | V1 tragfähiger Untergrund – OptiFix",
        "url": "/docs/clina/installation/putz-an-rohbeton-decke-v1-tragfaehiger-untergrund-optifix.pdf",
        "lang": "de",
        "pages": 6,
        "kb": 1378,
        "meaning": "Plaster on raw concrete – ceiling, V1: load-bearing base, OptiFix"
      },
      {
        "title": "Putz an Rohbeton – Decke | V2 tragfähiger Untergrund – Klebeband",
        "url": "/docs/clina/installation/putz-an-rohbeton-decke-v2-tragfaehiger-untergrund-klebeband.pdf",
        "lang": "de",
        "pages": 6,
        "kb": 1317,
        "meaning": "Plaster on raw concrete – ceiling, V2: load-bearing base, adhesive tape"
      },
      {
        "title": "Putz an Rohbeton – Decke | V3 nicht tragfähiger Untergrund – Putzpins 8",
        "url": "/docs/clina/installation/putz-an-rohbeton-decke-v3-nicht-tragfaehiger-untergrund-putzpins-8.pdf",
        "lang": "de",
        "pages": 6,
        "kb": 1477,
        "meaning": "Plaster on raw concrete – ceiling, V3: non-load-bearing base, plaster pins 8"
      },
      {
        "title": "Putz an Rohbeton – Decke | V4 nicht tragfähiger Untergrund – vollflächiger Putzträger o. Putzpins 18",
        "url": "/docs/clina/installation/putz-an-rohbeton-decke-v4-nicht-tragfaehiger-untergrund-vollflaechiger-putztraeger-o-putzpins-18.pdf",
        "lang": "de",
        "pages": 6,
        "kb": 990,
        "meaning": "Plaster on raw concrete – ceiling, V4: non-load-bearing base, full-surface plaster base or plaster pins 18"
      },
      {
        "title": "Universal cover",
        "url": "/docs/clina/installation/universal-cover.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 283
      },
      {
        "title": "Welding instructions – heating element socket welding of PP-R",
        "url": "/docs/clina/installation/welding-instructions.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 293
      },
      {
        "title": "Jointless drywall ceiling with capillary tube mat applied on site",
        "url": "/docs/clina/installation/jointless-drywall-ceiling-with-capillary-tube-mat-applied-on-site.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 362
      }
    ]
  },
  {
    "id": "installation-msr",
    "hy": "Մոնտաժի ուղեցույցներ՝ չափում և կառավարում (MSR)",
    "en": "Installation guidelines – measurement & control (MSR)",
    "docs": [
      {
        "title": "Dew point sensor TF 3 G/M-22 and TF 3 P/R-22",
        "url": "/docs/clina/installation-msr/dew-point-sensor-tf-3-g-m-22-and-tf-3-p-r-22.pdf",
        "lang": "en",
        "pages": 4,
        "kb": 439
      }
    ]
  },
  {
    "id": "performance",
    "hy": "Արտադրողականության ցուցանիշներ",
    "en": "Performance values",
    "docs": [
      {
        "title": "Acoustic plaster ceiling BASWA Cool with integrated capillary tube mat",
        "url": "/docs/clina/performance/acoustic-plaster-ceiling-baswa-cool-with-integrated-ctm.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 183
      },
      {
        "title": "Floor heating",
        "url": "/docs/clina/performance/floor-heating.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 207
      },
      {
        "title": "Gypsum ceiling tiles",
        "url": "/docs/clina/performance/gypsum-ceiling-tiles.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 225
      },
      {
        "title": "Jointless drywall ceilings",
        "url": "/docs/clina/performance/jointless-drywall-ceilings.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 183
      },
      {
        "title": "Metal panel ceilings",
        "url": "/docs/clina/performance/metal-panel-ceilings.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 202
      },
      {
        "title": "OPTIPANEL",
        "url": "/docs/clina/performance/optipanel.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 185
      },
      {
        "title": "Plaster ceilings",
        "url": "/docs/clina/performance/plaster-ceilings.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 182
      },
      {
        "title": "Plaster wall",
        "url": "/docs/clina/performance/plaster-wall.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 205
      }
    ]
  },
  {
    "id": "product-sheets",
    "hy": "Արտադրանքի տեխնիկական թերթեր",
    "en": "Product data sheets",
    "docs": [
      {
        "title": "FOLIMAT FSB 20",
        "url": "/docs/clina/product-sheets/folimat-fsb-20.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 468
      },
      {
        "title": "GRAVIMAT",
        "url": "/docs/clina/product-sheets/gravimat.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 214
      },
      {
        "title": "Gypsum Board Ceiling Tile",
        "url": "/docs/clina/product-sheets/gypsum-board-ceiling-tile.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 483
      },
      {
        "title": "OPTIMAT GB 20",
        "url": "/docs/clina/product-sheets/optimat-gb-20.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 220
      },
      {
        "title": "OPTIMAT SB 10",
        "url": "/docs/clina/product-sheets/optimat-sb-10.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 270
      },
      {
        "title": "OPTIMAT SB 20",
        "url": "/docs/clina/product-sheets/optimat-sb-20.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 249
      },
      {
        "title": "OPTIPANEL 15",
        "url": "/docs/clina/product-sheets/optipanel-15.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 300
      },
      {
        "title": "OPTIPANEL 18",
        "url": "/docs/clina/product-sheets/optipanel-18.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 396
      },
      {
        "title": "ORIMAT G 10",
        "url": "/docs/clina/product-sheets/orimat-g-10.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 201
      },
      {
        "title": "ORIMAT S 10",
        "url": "/docs/clina/product-sheets/orimat-s-10.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 277
      },
      {
        "title": "ORIMAT U 10",
        "url": "/docs/clina/product-sheets/orimat-u-10.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 292
      },
      {
        "title": "OVAMAT G 10",
        "url": "/docs/clina/product-sheets/ovamat-g-10.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 252
      },
      {
        "title": "OVAMAT U 10",
        "url": "/docs/clina/product-sheets/ovamat-u-10.pdf",
        "lang": "en",
        "pages": 1,
        "kb": 306
      },
      {
        "title": "OVAMAT (all variants)",
        "url": "/docs/clina/product-sheets/ovamat.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 421
      }
    ]
  },
  {
    "id": "product-sheets-msr",
    "hy": "Արտադրանքի տեխնիկական թերթեր՝ չափում և կառավարում (MSR)",
    "en": "Product data sheets – measurement & control (MSR)",
    "docs": [
      {
        "title": "Dew point sensor TF 3 G/M-22 and TF 3 P/R-22",
        "url": "/docs/clina/product-sheets-msr/dew-point-sensor-tf-3-g-m-22-and-tf-3-p-r-22.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 419
      }
    ]
  },
  {
    "id": "system-sheets",
    "hy": "Համակարգերի տեխնիկական թերթեր",
    "en": "System data sheets",
    "docs": [
      {
        "title": "Acoustic plaster ceiling BASWA Cool with integrated capillary tube mat",
        "url": "/docs/clina/system-sheets/acoustic-plaster-ceiling-baswa-cool-with-integrated-ctm.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 499
      },
      {
        "title": "Drywall floating ceiling",
        "url": "/docs/clina/system-sheets/drywall-floating-ceiling.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 528
      },
      {
        "title": "Floor heating in screed with OPTIMAT",
        "url": "/docs/clina/system-sheets/floor-heating-in-screed-with-optimat.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 589
      },
      {
        "title": "Floor heating onto screed with FOLIMAT",
        "url": "/docs/clina/system-sheets/floor-heating-onto-screed-with-folimat.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 495
      },
      {
        "title": "Floor heating onto wooden or drywall subfloor with FOLIMAT",
        "url": "/docs/clina/system-sheets/floor-heating-onto-wooden-or-drywall-subfloor-with-folimat.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 510
      },
      {
        "title": "GRAVIMAT",
        "url": "/docs/clina/system-sheets/gravimat.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 1635
      },
      {
        "title": "Gypsum board ceiling tile",
        "url": "/docs/clina/system-sheets/gypsum-board-ceiling-tile-grey.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 1208
      },
      {
        "title": "Jointless drywall ceiling with capillary tube mat applied on site",
        "url": "/docs/clina/system-sheets/jointless-drywall-ceiling-with-capillary-tube-mat-applied-on-site.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 608
      },
      {
        "title": "Metal floating ceiling",
        "url": "/docs/clina/system-sheets/metal-floating-ceiling.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 1478
      },
      {
        "title": "Metal panel",
        "url": "/docs/clina/system-sheets/metal-panel.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 1063
      },
      {
        "title": "OPTIPANEL 15 – ceiling",
        "url": "/docs/clina/system-sheets/optipanel-15-ceiling.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 723
      },
      {
        "title": "OPTIPANEL 15 – wall",
        "url": "/docs/clina/system-sheets/optipanel-15-wall.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 1796
      },
      {
        "title": "OPTIPANEL 18 – ceiling",
        "url": "/docs/clina/system-sheets/optipanel-18-ceiling-haecker.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 701
      },
      {
        "title": "Plaster on concrete – ceiling",
        "url": "/docs/clina/system-sheets/plaster-on-concrete-ceiling.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 508
      },
      {
        "title": "Plaster on gypsum board | brickwork | concrete – wall",
        "url": "/docs/clina/system-sheets/plaster-on-gypsum-board-brickwork-concrete-wall.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 733
      },
      {
        "title": "Plaster on gypsum board – ceiling",
        "url": "/docs/clina/system-sheets/plaster-on-gypsum-board-ceiling.pdf",
        "lang": "en",
        "pages": 2,
        "kb": 589
      }
    ]
  },
  {
    "id": "system-descriptions",
    "hy": "Համակարգերի նկարագրություններ",
    "en": "System descriptions",
    "docs": [
      {
        "title": "Acoustic plaster ceiling BASWA Cool with integrated capillary tube mat",
        "url": "/docs/clina/system-descriptions/acoustic-plaster-ceiling-baswa-cool-with-integrated-ctm.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 787
      },
      {
        "title": "Drywall floating ceiling",
        "url": "/docs/clina/system-descriptions/drywall-floating-ceiling.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 601
      },
      {
        "title": "Floor heating in screed with OPTIMAT",
        "url": "/docs/clina/system-descriptions/floor-heating-in-screed-with-optimat.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 534
      },
      {
        "title": "Floor heating onto screed with FOLIMAT",
        "url": "/docs/clina/system-descriptions/floor-heating-onto-screed-with-folimat.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 704
      },
      {
        "title": "Floor heating onto wooden or drywall subfloor with FOLIMAT",
        "url": "/docs/clina/system-descriptions/floor-heating-onto-wooden-or-drywall-subfloor-with-folimat.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 703
      },
      {
        "title": "GRAVIMAT",
        "url": "/docs/clina/system-descriptions/gravimat.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 578
      },
      {
        "title": "Gypsum board ceiling tile",
        "url": "/docs/clina/system-descriptions/gypsum-board-ceiling-tile.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 782
      },
      {
        "title": "Jointless drywall ceiling with capillary tube mat applied on site",
        "url": "/docs/clina/system-descriptions/jointless-drywall-ceiling-with-ctm-applied-on-site.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 688
      },
      {
        "title": "Metal floating ceiling",
        "url": "/docs/clina/system-descriptions/metal-floating-ceiling.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 719
      },
      {
        "title": "Metal panel",
        "url": "/docs/clina/system-descriptions/metal-panel.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 583
      },
      {
        "title": "OPTIPANEL 15 – ceiling",
        "url": "/docs/clina/system-descriptions/optipanel-15-ceiling.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 692
      },
      {
        "title": "OPTIPANEL 15 – wall",
        "url": "/docs/clina/system-descriptions/optipanel-15-wall.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 1830
      },
      {
        "title": "OPTIPANEL 18 – ceiling",
        "url": "/docs/clina/system-descriptions/optipanel-18-ceiling.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 783
      },
      {
        "title": "Plaster on gypsum board | brickwork | concrete – wall",
        "url": "/docs/clina/system-descriptions/plaster-on-gb-brickwork-concrete-wall.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 613
      },
      {
        "title": "Plaster on concrete – ceiling",
        "url": "/docs/clina/system-descriptions/plaster-on-concrete-ceiling.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 552
      },
      {
        "title": "Plaster on gypsum board – ceiling",
        "url": "/docs/clina/system-descriptions/plaster-on-gypsum-board-ceiling.pdf",
        "lang": "en",
        "pages": 3,
        "kb": 556
      }
    ]
  }
];
