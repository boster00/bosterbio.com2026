# BosterBio CMS HTML Template Guide

## Overview

- **Source:** `docs/cms-pages-full-export.tsv` (755 CMS pages).
- **Distinct structural fingerprints** (whitespace normalized, URLs blanked, numbers collapsed): **752**.
- This guide shows the **top 45** clusters by page count with **real representative HTML** (truncated per sample for repo size). Remaining layouts follow the same migration rules; full markup is in the TSV.
- **URL placeholder:** Absolute `bosterbio.com` URLs in exports were rewritten to `https://SITE_ORIGIN_PLACEHOLDER` (and `__SITE_BASE__` where used) for safe commits—restore real origins when migrating.
- **URL prefix** summary (IA grouping):

| URL prefix | pages |
|------------|-------|
| `newsletter-archive` | 131 |
| `pathway-maps` | 85 |
| `protocol-and-troubleshooting` | 70 |
| `diseases` | 54 |
| `promotions` | 24 |
| `cell-types` | 23 |
| `frequently-asked-question` | 18 |
| `research-area` | 15 |
| `services/assay-services` | 12 |
| `multiplex-elisa-solutions` | 5 |
| `biology-research-tools` | 4 |
| `services/custom-antibody-production-services` | 4 |
| `services/ngs-services` | 4 |
| `frequently-asked-questions` | 3 |
| `pathway-map` | 3 |
| `about-us` | 2 |
| `products-by-research-area` | 2 |
| `services/custom-rabbit-monoclonal-antibody-development-service` | 2 |
| `elisa-kits` | 2 |
| `tissue-markers-cell-markers` | 2 |
| `primary-antibodies` | 2 |
| `my-projects` | 2 |
| `boster-interviews` | 2 |
| `services/multiplex-assay-services` | 2 |
| `elisa-service-dashboard` | 2 |
| `glossary` | 2 |
| `gene-info` | 2 |
| `my-quotes` | 2 |
| `support` | 2 |
| `no-route` | 1 |
| `contact-us` | 1 |
| `enable-cookies` | 1 |
| `privacy-policy-cookie-restriction-mode` | 1 |
| `distributors-old` | 1 |
| `quality-control-panel` | 1 |
| `protocol-troubleshooting` | 1 |
| `elisa-protocol` | 1 |
| `elisa-troubleshooting` | 1 |
| `technical-support` | 1 |
| `boster-guarantee` | 1 |
| `ihc-troubleshooting-guide` | 1 |
| `wb-ihc-elisa-troubleshooting-handbooks` | 1 |
| `elisa-troubleshooting-guide` | 1 |
| `gadget-give-away` | 1 |
| `thank-you` | 1 |
| `calculators` | 1 |
| `origami-challenge` | 1 |
| `western-blotting-troubleshooting-guide-download` | 1 |
| `ihc-troubleshooting-guide-download` | 1 |
| `elisa-troubleshooting-guide-download` | 1 |
| `gadget-give-away-download` | 1 |
| `origami-challenge-download` | 1 |
| `redeem-coupon` | 1 |
| `spread-the-word` | 1 |
| `success-referral-program-signup` | 1 |
| `career-opportunities` | 1 |
| `unsubscribe-successful` | 1 |
| `sfn-2015-20off` | 1 |
| `unsubscribe` | 1 |
| `elisa-troubleshooting-handbook` | 1 |
| `more-info` | 1 |
| `western-blotting-troubleshooting-guide-download-page` | 1 |
| `final-step` | 1 |
| `immunohistochemistry-troubleshooting-guide-download-page` | 1 |
| `elisa-troubleshooting-guide-download-page` | 1 |
| `mock-up` | 1 |
| `services/custom-monoclonal-antibody-development-service` | 1 |
| `feedback` | 1 |
| `feedback-page-2` | 1 |
| `html-staging` | 1 |
| `services/multiplex-cytokine-assay-service-outdated` | 1 |
| `faqs` | 1 |
| `elisa-technical-resource-center` | 1 |
| `western-blotting-technical-resource-center` | 1 |
| `immunohistochemistry-ihc-technical-resource-center` | 1 |
| `flow-cytometry-antibodies` | 1 |
| `flow-cytometry-antibodies-free-samples` | 1 |
| `facs-antibodies-free-sample` | 1 |
| `flow-technical-resource-center` | 1 |
| `santa-cruz-antibodies-replacement-program` | 1 |
| `elisa-additional-components-prices` | 1 |
| `privacy-policy` | 1 |
| `terms-of-service` | 1 |
| `newsletter-archive-2019` | 1 |
| `home` | 1 |
| `flow-cytometry-facs-troubleshooting-guide-download-page` | 1 |
| `free-sample` | 1 |
| `homepage-mockup` | 1 |
| `newsletter-archive-elisa` | 1 |
| `newsletter-archive-ihc` | 1 |
| `newsletter-archive-facs` | 1 |
| `newsletter-archive-wb` | 1 |
| `freesimplev1` | 1 |
| `services/custom-polyclonal-antibody-development-service` | 1 |
| `wb-ihc-reagents-price-compare` | 1 |
| `freesimplev2` | 1 |
| `promopagetesting` | 1 |
| `boster-vs-thermo-2017` | 1 |
| `boster-vs-sigma` | 1 |
| `rabbit-monoclonal` | 1 |
| `cytokine-kits` | 1 |
| `about-your-lab` | 1 |
| `new-lab-program` | 1 |
| `sandytest` | 1 |
| `cj-image-change` | 1 |
| `pcr-troubleshooting-guide-download-page` | 1 |
| `troubleshooting-ebooks-testing-page` | 1 |
| `services/custom-rabbit-monoclonal-antibody-development-service-old` | 1 |
| `services/recombinant-protein-expression-service-outdated` | 1 |
| `25-anniversary-celebration-bosterbio-promotions` | 1 |
| `services/laboratory-technical-services` | 1 |
| `antibodies-validation-information` | 1 |
| `25-anniversary-celebration-bosterbio-promotions-2` | 1 |
| `complete-elisa-guide-pdf` | 1 |
| `services/gene-synthesis` | 1 |
| `promotions-testpage` | 1 |
| `complete-wb-guide-pdf` | 1 |
| `complete-ihc-guide-pdf` | 1 |
| `complete-facs-guide-pdf` | 1 |
| `complete-molbio-guide-pdf` | 1 |
| `oxidative-stress-inflammation-option2` | 1 |
| `oxidative-stress-inflammation` | 1 |
| `oxidative-stress-backup` | 1 |
| `thank-you-for-helping-a-peer-scientist` | 1 |
| `how-to-determine-antibody-cross-reactivity` | 1 |
| `pcr-technical-resource-center` | 1 |
| `testingtesting321` | 1 |
| `services/ihc-histology-services-a` | 1 |
| `monoclonalsample` | 1 |
| `elisa-quality-control` | 1 |
| `services/antibody-conjugation-service` | 1 |
| `elisa-test` | 1 |
| `ihc-validated-antibodies` | 1 |
| `boster-vs-thermo-test` | 1 |
| `pathway-posters` | 1 |
| `pathway-posters-sample` | 1 |
| `predicting-western-blot-band-sizes-test` | 1 |
| `orders` | 1 |
| `elisa-validation-information` | 1 |
| `pathway-maps-test` | 1 |
| `how-to-choose-a-good-elisa-kit` | 1 |
| `how-to-elisa-testpage` | 1 |
| `elisa-data-analysis-instructions` | 1 |
| `5-tips-to-reduce-autofluorescence` | 1 |
| `boster-vs-sigma-new2018` | 1 |
| `boster-vs-thermo` | 1 |
| `services/custom-antibody-for-rare-species-old` | 1 |
| `6-ihc-controls-you-should-know` | 1 |
| `biological-research-databases-software` | 1 |
| `predicting-western-blot-band-sizes` | 1 |
| `rare-species-update` | 1 |
| `buy-one-get-one-free-elisa-promotion` | 1 |
| `services/custom-antibody-for-rare-species-china` | 1 |
| `custom-multiplex-elisa-old` | 1 |
| `multiplex-elisa-demo-options-old` | 1 |
| `newsletter-archive-2017` | 1 |
| `newsletter-archive-2018` | 1 |
| `5-pitfalls-to-avoid-for-elisa` | 1 |
| `preparing-elisa-standards` | 1 |
| `ihc-fixative-types` | 1 |
| `how-to-perfect-your-elisa-standards` | 1 |
| `testmultiplex` | 1 |
| `services` | 1 |
| `services/ihc-histology-services` | 1 |
| `boster-product-review-program` | 1 |
| `boster-terms-and-conditions` | 1 |
| `supplier-vendor-setup` | 1 |
| `multiplex-test-ken` | 1 |
| `services/antibody-validation-service` | 1 |
| `distributors` | 1 |
| `multi-pack-promotion-for-popular-elisa-kits` | 1 |
| `datasheet` | 1 |
| `coa` | 1 |
| `msds` | 1 |
| `antibody-coa` | 1 |
| `antibody-msds` | 1 |
| `antibody-company` | 1 |
| `ez-set-elisa-kit-datasheet` | 1 |
| `testdemo` | 1 |
| `testimonials` | 1 |
| `cj-custom-script` | 1 |
| `scholarships` | 1 |
| `protein-infographic-test` | 1 |
| `services/recombinant-protein-expression-service` | 1 |
| `services/custom-polyclonal-antibody-development-service-draft` | 1 |
| `gene` | 1 |
| `rabbit-monoclonal-antibodies` | 1 |
| `search` | 1 |
| `stock-check` | 1 |
| `new-product-detail-page-2020` | 1 |
| `coronavirus-sars-cov-2-covid-19-antibodies-biomarkers-old` | 1 |
| `bosterbio-gene-info-cards-old` | 1 |
| `all-support-content-test-page` | 1 |
| `this-is-test-page` | 1 |
| `coronavirus-sars-cov-2-covid-19-antibodies-biomarkers` | 1 |
| `boster-covid-19-products-and-services` | 1 |
| `coronavirus-sars-cov-2-covid-19-pcr-kits` | 1 |
| `environmental-surface-testing-of-covid-19-sars-cov-2-coronavirus` | 1 |
| `multiplex-covid-19-biomarkers-assay-sars-cov-2-human-igg-4-plex` | 1 |
| `services/custom-antibody-for-rare-species-and-discontinued-antibodies` | 1 |
| `covid-19-research-antibodies-and-recombinant-proteins` | 1 |
| `sars-cov-2-sample-testing-multiplex-assay-service` | 1 |
| `sign-up-test` | 1 |
| `services/c-elegans-zebrafish-gene-editing-services` | 1 |
| `all-genes-infographics` | 1 |
| `all-product-categories` | 1 |
| `all-technical-support-resources` | 1 |
| `services/sample-testing` | 1 |
| `instruments-for-covid-19-testing-and-research` | 1 |
| `ihc-service-test-page` | 1 |
| `newsletter-archive-page-2020` | 1 |
| `newsletter-archive-detail-page-2020` | 1 |
| `instruments-and-machines` | 1 |
| `immunohistochemistry-ihc-reagents` | 1 |
| `covid-test` | 1 |
| `western-blot-reagents` | 1 |
| `cell-lysates-and-tissue-lysates` | 1 |
| `recombinant-proteins` | 1 |
| `secondary-antibodies` | 1 |
| `alzheimer-s-disease-test-page-n1` | 1 |
| `focusgen-influenza-virus-and-sascov2-multiplex-onestep-rt-pcr-test-kit` | 1 |
| `buffer-packets-and-buffer-recipes-for-common-experiments` | 1 |
| `chip-troubleshooting-guide-download-page` | 1 |
| `services/sample-collection-guidelines` | 1 |
| `complete-chip-guide-pdf` | 1 |
| `reagents-and-kits` | 1 |
| `elisa-service-vendor-portal` | 1 |
| `promocell-datasheet` | 1 |
| `kick-start-your-biomarker-panel-research-in-under-3-minutes` | 1 |
| `boster-customer-support-code-of-conduct` | 1 |
| `boster-internal-purchase-order-managment` | 1 |
| `sample-or-bulk-discount-request-form` | 1 |
| `featured-products` | 1 |
| `product-ui-staging` | 1 |
| `product-page-design-staging-nauman` | 1 |
| `how-to-design-positive-negative-controls-ihc-western-blot-elisa` | 1 |
| `cancer-stem-cell-signaling-pathway` | 1 |
| `customer-portal` | 1 |
| `cj-template-for-service-pages` | 1 |
| `thank-you-custom-antibody-service` | 1 |
| `services/booking` | 1 |
| `blog-home-test-nauman` | 1 |
| `my-orders` | 1 |
| `purchase-order-lead-time-update` | 1 |
| `assay-kits` | 1 |
| `services/aav-packaging-service` | 1 |
| `social-media` | 1 |
| `services/custom-peptide-synthesis` | 1 |
| `place-order-with-quote` | 1 |
| `cells` | 1 |
| `services/compound-screening-services` | 1 |
| `test-component-page` | 1 |
| `services/qpcr-service` | 1 |
| `in-cell-western-blot-service` | 1 |
| `warehouse-portal` | 1 |
| `catalogsearch-result` | 1 |
| `tracking-number` | 1 |
| `publication-update` | 1 |
| `multiplex-test` | 1 |
| `fancy-form-test-success` | 1 |
| `api` | 1 |
| `services/recombinant-antibody-production-service` | 1 |
| `sponsorship-program` | 1 |
| `tradeshow-survey` | 1 |
| `tradeshow-survey-thank-you` | 1 |
| `google-events-testing-page` | 1 |
| `bapi` | 1 |
| `citeab-test` | 1 |
| `travel-grant` | 1 |
| `popular-blogs` | 1 |
| `eddytest` | 1 |
| `support-programs` | 1 |
| `erp` | 1 |
| `survey-of-consumables` | 1 |
| `publications-upload` | 1 |
| `research-areas` | 1 |
| `test-publications` | 1 |
| `how-to-choose-a-model-organism-guide-download-page` | 1 |
| `complete-model-organism-pdf` | 1 |
| `eddy-test` | 1 |
| `services/custom-polyclonal-antibody-development-service-draft-copy` | 1 |
| `antibody-categories` | 1 |
| `erp2` | 1 |
| `free-validation-thank-you` | 1 |
| `zebrafish-antibody-omni-solutions` | 1 |
| `henry-test` | 1 |
| `ssc-test` | 1 |
| `programs` | 1 |
| `supportformpage` | 1 |
| `abcam-portal` | 1 |
| `newsletter-sign-up` | 1 |
| `free-validation-participants` | 1 |
| `test_conjugated_antibodies` | 1 |
| `elisaapi` | 1 |
| `elisa_kits_landing_page` | 1 |
| `fuorescencespectraviewerapi` | 1 |
| `spectra-viewer` | 1 |
| `tools` | 1 |
| `antibody-conjugation-kits` | 1 |
| `high-sensitivity-elisa-kits` | 1 |
| `bundle-and-save` | 1 |

## Template catalog (top 45 layout clusters)

### 1. CMS page (gadget-give-away)

- **Structural hash:** `c0951c1ad4fe122e` (for cross-reference)
- **URL prefix:** `gadget-give-away`
- **Used by:** 2 page(s) (0 active)
- **Representative:** `gadget-give-away` (page_id 36) — Phone gadget give away
- **All identifiers in cluster:** `gadget-give-away`, `origami-challenge`
- **content_heading:** `Smart phone’s best friend—get yours for free today`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<!--Hero section-->
<div class="hero hero1">
  <div class="overlay">&nbsp;</div>
    <div class="row her1">
      <div class="container">
        <div class="col-md-12">
          <div class="logo">
            <!--logo-->
            <div class="hedlogo">PHONE GADGET</div>
              <!--logo end-->
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <!--<div class="row">
        <div class="col-md-12">
          <div class="logo">
            <!--logo--> <!--<a href="">
            <img src="img/logo.png" data-at2x="img/logo.png" alt="site name"> </a>
            <!--logo end--> <!--</div>
          </div>
        </div>-->
        <div class="row dor1">
          <div class="col-md-6">
            <!--welcome message--> <!-- <h1>Smarter Solutions for the Future</h1>-->
            <h2 class="phonh2">Introducing the new gadget Boster is giving out on tradeshows: a removable sticker that empowers your phone to do cool things: Limited amount available. Get yours today! Share this with your friends on social media so that they can get one as well.</h2>
              <!--welcome message end--> <!--action button-->
              <div class="action-button">
                <a class="button learn-more text-center" href="#features">HAVE ONE MAILED TO YOU <em class="fa fa-arrow-right">
                </em>
              </a> <!--<a href="#" class="button buy text-center">Buy Now <i class="fa fa-shopping-cart">
            </i>
          </a>
          <p>*Avaliable in PDF, ePUB, Mobi &amp; Kindle.</p>-->
          </div>
          <!--action button end--> <!--share button-->
          <div class="action-button shr">
            <span style="font-size: 24px; font-weight: bold;">SHARE!</span> Pass This On <a href="https://www.facebook.com/bosterbio" target="_blank">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/facebook.png" alt="" />
            </a>
            <a href="https://linkedin.com/profile/view?id=256919055" target="_blank">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/linked in.png" alt="" />
            </a>
            <a href="#" target="_blank">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/google pluse.png" alt="" />
            </a>
            <a href="https://twitter.com/BosterbioCo" target="_blank">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/twitter.png" alt="" />
            </a>
            <a href="#" target="_blank">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/youtube.png" alt="" />
            </a>
            <a href="https://bosterbio.tumblr.com/" target="_blank">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/tumb_icon.png" alt="" />
            </a>
            <a href="#" target="_blank">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon1.png" alt="" />
            </a>
            <a href="https://www.pinterest.com/bosterbio/" target="_blank">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon2.png" alt="" />
            </a>
          </div>
          <!--share button end-->
        </div>
        <div class="col-md-6 text-center">
          <img class="book-cover" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/phone pic_1.png" alt="ebook" />
        </div>
      </div>
    </div>
    <!--Hero section end--> <!--features--> <!--<section class="features section-spacing text-center" id="features">
    <div class="container">
      <header>
        <h2>Strategic HR and the Future of Work</h2>
          <p class="feap1">In 2014,bussiness everywhere have started to reassess their workforce strategies and adaptt them to 'the future of work'. Developing and deploying a clear strategy for the next 5-10 years can assist organisations significantly,both to adapt their workplace to a rapidly changing technological and economic environment, and ensure they can attract, maintain and support skilled worker they will rely on in the future.</p>
            <p class="feap2">Conversely, as the space of change increases and the pool of local skilled workers continues to shrink, business who don't take action
              now risk losing touch with the people and they will soon come to need most.</p>
              <p class="feap2">Earlier this year FCB Group conductedan in-depth survey of Australian employers (HR professionals and Business Executives) to gauge opinions about issues affecting the future of the workplace.</p>
                <p class="feap2">Download our White Paper today for our survey results and practical tips on how to develop your future workforce strategy.</p>
                  <!--<h3>Lorem ipsum dolor sit amet consectetur adip scing elit mauris</h3>--> <!--</header>
                </div>
              </div>
              <!--features end--> <!--sub form-->
              <div id="features" class="sub-form sub1 section-spacing text-center">
                <div class="container">
                  <!--<p style="margin-top:-61px;" class="arr" >
                  <img src="img/arr2.png" class="arrim">
                </p>-->
                <h2>download the handbook</h2>
                  <!--<h3>Lorem ipsum dolor sit amet consectetur adip scing elit mauris</h3>-->
                  <div class="row">
                    <div class="col-md-6">
                      <p class="phonp">Introducing the new gadget Boster is giving out on tradeshows: a removable sticker that empowers your phone to do cool things: Limited amount available. Get yours today!</p>
                        <p class="phonp">Share this with your friends on social media so that they can get one as well.</p>
                          <div class=" col-md-12 step">
                            <div class="col-md-4 phoncol">
                              <p class="stepp">
                                <a class="stepa" href="#">Step 1<br />
                                <span style="color: #000; font-size: 15px; font-weight: normal; margin-left: -8px;">S</span>
                                </a>ign up</p>
                              </div>
                              <div class="col-md-4 phoncol">
                                <p class="stepp">
                                  <a class="stepa" href="#">Step 2<br />
                                  <span style="color: #000; font-size: 15px; font-weight: normal; margin-left: -8px;">G</span>
                                  </a>et your gift</p>
                                </div>
                                <div class="col-md-4 phoncol">
                                  <p class="stepp">
                                    <a class="stepa" href="#">Step 3<br />
                                    <span style="color: #000; font-size: 15px; font-weight: normal; margin-left: -8px;">S</span>
                                    </a>hare with your friends</p>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6 phoncolfor">
                                <!--<ul class="subul">
                                <li class="subli">Key insights from industry leaders and experts</li>
                                  <li class="subli">'Big ticket' issues facing employers over the next 5-10 years</li>
                                    <li class="subli">Workplace challenges and how to overcome them in the next 5-10 years</li>
                                      <li class="subli">Our key survey results including digestible statistics</li>
                                      </ul>-->
                                      <div class="phonfor">
                                        <h2 class="phonforh2">Enter ATTN to and your lab address blow</h2>
                                          <form id="__vtigerWebForm" class="infusion-form" <form id="__vtigerWebForm" name="Phone Gadget Give Away" action="https://bosterbio.od1.vtiger.com/modules/Webforms/capture.php" method="post" accept-charset="utf-8" enctype="multipart/form-data">
                                            <input type="hidden" name="__vtrftk" value="sid:bdab2a7b1d4c8af56d2f466fad5984b3294f9693,1429121479">
                                            <input type="hidden" name="publicid" value="6ffd96a7c762bd263d38492f57f317c8">
                                            <input type="hidden" name="urlencodeenable" value="1">
                                            <input type="hidden" name="name" value="Phone Gadget Give Away">
                                            <div class="form-group fg">
                                              <div class="input-group-addon">Full Name*</div>
                                                <input id="text" class="form-control for" name="lastname" data-label="lastname" value="" required="">
                                              </div>
                                              <div class="form-group fg">
                                                <div class="input-group-addon">Email*</div>
                                                  <input id="="email" class="form-control for" name="email" data-label="email" value="" required="">
                                                </div>
                                                <div class="form-group fg">
                                                  <div class="input-group-addon"> Street*</div>
                                                    <input id="<td>
                                                    <textarea" class="form-control for" name="mailingstreet" required="">
                                                    </textarea>
                                                  </td>
                                                </div>
                                                <div class="form-group fg">
                                                  <div class="input-group-addon">City*</div>
                                                    <input id="<input type="text" class="form-control for"name="mailingcity" data-label="mailingcity" value="" required="">
                                                  </div>
                                                  <div class="form-group fg">
                                                    <div class="input-group-addon">State/Province*</div>
                                                      <input id="<input type="text" class="form-control for" name="mailingstate" data-label="mailingstate" value="" required="">
                                                    </div>
                                                    <div class="form-group fg">
                                                      <div class="input-group-addon">Postal Code*</div>
                                                        <input id="<input type="text" class="form-control for" name="mailingzip" data-label="mailingzip" value="" required="">
                                                      </div>
                                                      <div class="form-group fg">
                                                        <div class="input-group-addon">Country*</div>
                                                          <input id="text" class="form-control for" name="mailingcountry" data-label="mailingcountry" value="" required="">
                                                        </div>
                                                        <div class="form-group<select name="leadsource" data-label="leadsource"hidden=true> <option value="Phone Gadget" selected="">Phone Gadget</option>
                                                        </div>
                                                        <div class="form-group<select name="cf_870" data-label="label:Contact+Stage" hidden=true>
                                                          <option value="">Select Value</option>
                                                            <option value="Contact Stage: Confirmed Interest" selected="">Contact Stage: Confirmed Interest</option>
                                                            </div>
                                                            <button class="btn1 btn-default" type="submit">SUBMIT</button>
                                                            </form>
                                                          </div>
                                                        </div>
                                                        <script type="text/javascript">// <![CDATA[
                                                          window.onload = function() { var N=navigator.appName, ua=navigator.userAgent, tem;var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];M=M? [M[1], M[2]]: [N, navigator.appVersion, "-?"];var browserName = M[0];var form = document.forms[0], inputs = form.elements; form.onsubmit = function() { var required = [], att, val; for (var i = 0; i < inputs.length; i++) { att = inputs[i].getAttribute("required"); val = inputs[i].value; type = inputs[i].type; if(type == "email") {if(val != "") {var elemLabel = inputs[i].getAttribute("label");var emailFilter = /^[_/a-zA-Z0-9]+([!"#$%&()*+,./:;<=>?\^_`{|}~-]?[a-zA-Z0-9/_/-])*@[a-zA-Z0-9]+([\_\-\.]?[a-zA-Z0-9]+)*\.([\-\_]?[a-zA-Z0-9])+(\.?[a-zA-Z0-9]+)?$/;var illegalChars= /[\(\)\<\>\,\;\:\"\[\]]/ ;if (!emailFilter.test(val)) {alert("For "+ elemLabel +" field please enter valid email address"); return false;} else if (val.match(illegalChars)) {alert(elemLabel +" field contains illegal characters");return false;}}}if (att != null) { if (val.replace(/^\s+|\s+$/g, "") == "") { required.push(inputs[i].getAttribute("label")); } } } if (required.length > 0) { alert("The following fields are required: " + required.join()); return false; } var numberTypeInputs = document.querySelectorAll("input[type=number]");for (var i = 0; i < numberTypeInputs.length; i++) { val = numberTypeInputs[i].value;var elemLabel = numberTypeInputs[i].getAttribute("label");if(val != "") {var intRegex = /^[+-]?\d+$/;if (!intRegex.test(val)) {alert("For "+ elemLabel +" field please enter valid number"); return false;}}}}; }
                                                          // ]]>
                                                        </script>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <!--<div class="row">
                                                  <h4 class="pri">Privacy & Confidentiality: </h4>
                                                    <p class="prip">We will not disclose your personal information to third parties for their marketing purposes. However, FCB Group may use your personal information to inform you of recent developments in the law and workplace relations, or provide you with newsletter articles or upcoming event details.</p>
                                                    </div>-->
                                                    <p>&nbsp;</p>
                                                      <!--sub form-->
                                                      <p>&nbsp;</p>
                                                        <!--3 col-->
                                                        <div class="colpic2 section-spacing text-center">
                                                          <div class="container">
                                                            <!--<h2>Lorem Ipsum</h2>-->
                                                            <div class="row">
                                                              <div class="col-md-4">
                                                                <p>
                                                                  <img src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/phone pic_2.png" alt="" />
                                                                </p>
                                                                <p class="colpicp">Play a video like this</p>
                                                                </div>
                                                                <div class="col-md-4">
                                                                  <p>
                                                                    <img src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/phone pic_3.png" alt="" />
                                                                  </p>
                                                                  <p class="colpicp">Hold your cards</p>
                                                                  </div>
                                                                  <div class="col-md-4">
                                                                    <p>
                                                                      <img src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/phone pic_4.png" alt="" />
                                                                    </p>
                                                                    <p class="colpicp">Keeps your headphone and charging cords in place</p>
                                                                    </div>
                                                                  </div>
                                                                  <div class="row forr">
                                                                    <div class=" col-md-2 ">&nbsp;</div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <!-- 3 col-->
                                                                <p>&nbsp;</p>
                                                                  <!--Testimonials Start-->
                                                                  <div class="test1 section-spacing text-center">
                                                                    <h2>customer feedback</h2>
                                                                      <div class="tstdiv">
                                                                        <ul class="bxslider">
                                                                          <li>
                                                                            <blockquote>"As a small lab in the Veterinary school, funding is harder than you can imagine; which is why Boster kits with their reasonable pricing were purchased by us. The kits arrived on time and the customer support and personal attention given to me were outstanding. Boster&rsquo;s human CD40 kit was tested us."</blockquote>
                                                                              <p style="text-align: center; color: #000; font-size: 21px; font-weight: 600; margin-left: 40px;">-<strong>
                                                                                <strong>Sidonie Lavergne</strong>
                                                                                </strong>
                                                                              </p>
                                                                            </li>
                                                                            <li>
                                                                              <blockquote>" The product performed well above our expectations, and the datasheets and instructions included with the product were good as well."</blockquote>
                                                                                <p style="text-align: center; color: #000; font-size: 21px; font-weight: 600; margin-left: 40px;">-<strong>
                                                                                  <strong>Standley Moon</strong>
                                                                                  </strong>
                                                                                </p>
                                                                              </li>
                                                                            </ul>
                                                                          </div>
                                                                        </div>
                                                                        <!--Testimonials End-->
                                                                        <p>&nbsp;</p>
                                                                          <!--3 col-->
                                                                          <div class="colpic3 section-spacing text-center">
                                                                            <div class="container">
                                                                              <h2>&nbsp;</h2>
                                                                              </div>
                                                                            </div>
                                                                            <!-- 3 col-->
                                                                            <p>&nbsp;</p>
                                                                              <!--site-footer-->
                                                                              <div class="site-footer section-spacing">
                                                                                <div class="container">
                                                                                  <div class="row">
                                                                                    <div class="col-md-12 text-center">
                                                                                      <p class="scroll-top">&nbsp;</p>
                                                                                        <!--social--> <!-- <ul class="social">
                                                                                        <!--<li>
                                                                                        <a href="https://twitter.com/" target="_blank">
                                                                                          <i class="fa fa-twitter">
                                                                                          </i>
                                                                                        </a>
                                                                                      </li>
                                                                                      <li>
                                                                                        <a href="https://www.facebook.com/" target="_blank">
                                                                                          <i class="fa fa-facebook">
                                                                                          </i>
                                                                                        </a>
                                                                                      </li>
                                                                                      <li>
                                                                                        <a href="https://plus.google.com/" target="_blank">
                                                                                          <i class="fa fa-google-plus">
                                                                                          </i>
                                                                                        </a>
                                                                                      </li>--> <!-- <li>
                                                                                      <a href="#">
                                                                                        <i class="fa fa-linkedin-square">
                                                                                        </i>
                                                                                      </a>
                                                                                    </li>
                                                                                  </ul>
                                                                                  <!--social end--> <small>&copy; Copyright Boster System. All Rights Reserved.</small> <!--<p>
                                                                                  <a href="" data-toggle="modal" data-target="#privacy">Privacy</a> | <a href="" data-toggle="modal" data-target="#terms">Terms of Use</a>
                                                                                  </p>--> <!-- Privacy Modal --> <!--<div class="modal fade" id="privacy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel-privacy" aria-hidden="true">
                                                                                  <div class="modal-dialog">
                                                                                    <div class="modal-content">
                                                                                      <div class="modal-header">
                                                                                        <button type="button" class="close" data-dismiss="modal">
                                                                                          <span aria-hidden="true">&times;</span>
                                                                                            <span class="sr-only">Close</span>
                                                                                            </button>
                                                                                            <h4 class="modal-title" id="myModalLabel-privacy">Privacy</h4>
                                                                                            </div>
                                                                                            <div class="m
                                                                                              <!-- TRUNCATED: 16655 chars total — open docs/cms-pages-full-export.tsv row page_id=36 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 2. CMS page (freesimplev1)

- **Structural hash:** `bbc17b494049d831` (for cross-reference)
- **URL prefix:** `freesimplev1`
- **Used by:** 2 page(s) (0 active)
- **Representative:** `freesimplev1` (page_id 190) — Free Sample Form Test (Version 1)
- **All identifiers in cluster:** `freesimplev1`, `freesimplev2`
- **content_heading:** `NULL`
- **Magento directives in sample:** `{{block type="page/html_header" template="cj_templates/cj_lead_form.phtml"}}`

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<style>
  <!--
  body{
  font-size: 14px;
  background-image: url("https://SITE_ORIGIN_PLACEHOLDER");
  font-family: museo-sans-rounded, sans-serif;
  }
  @media screen and (max-width: 1200px) {
  p {
  font-size: 0.8em !important;
  }
  }
  h1{
  margin: 15px !important;
  color: #475763 !important;
  font-size: 40px !important;
  }
  h2,h3,h4,p{
  font-family: museo-sans-rounded, sans-serif;
  }
  h2{
  color: #475763;
  }
  h3{
  font-size: 13px;
  font-weight: bold;
  }
  p{
  color: #475763;
  font-family: museo-sans-rounded, sans-serif;
  }
  div.columns{
  margin-left: 8%;
  }
  .landing_head h2{
  color: #a9a9a9;
  font-family: museo-sans-rounded, sans-serif;
  font-size: 24px;
  margin: 15px;
  z-index: 5;
  overflow: hidden;
  background-repeat: no-repeat;
  }
  .landing_head img{
  height: 65px;
  text-align: center;
  }
  .landing_head,
  .landing_foot{
  text-align: center;
  padding:20px;
  }
  .landing_foot{
  margin-top: 2em;
  }
  div.columns{
  width: 40%;
  display: inline-block;
  padding-left: 3%;
  padding-right: 3%;
  }
  @media screen and (max-width: 600px) {
  div.columns{
  width: 100%;
  display: block;
  margin-left: 0;
  }
  h1{
  font-size:25px;
  }
  }
  #ebook_cover{
  width: 90%;
  margin: 4%;
  }
  .list_of_contents img{
  height: 20px;
  margin:3px;
  }
  .list_of_contents p{
  margin-left: 25px;
  }
  #landing_page_form input{
  margin-bottom: 12px;
  }
  -->
</style>
<p>
  <script type="text/javascript">// <![CDATA[
    jQuery( document ).ready(function() {
    jQuery(".footer").hide();
    jQuery(".breadcrumb").hide();
    jQuery(".top-nav").hide();
    jQuery("header").hide();
    jQuery("[src='/media/images/content_page_header.jpg']").hide();
    jQuery(".product-head").hide();
    });
    // ]]>
  </script>
</p>
<p>{{block type="page/html_header" template="cj_templates/cj_lead_form.phtml"}}</p>
  <div class="landing_head">
    <img alt="" src="https://SITE_ORIGIN_PLACEHOLDER" />
    <h1>Boster Bio Free Sample Products</h1>
      <h2>Free Samples Policy</h2>
      </div>
      <div style="padding: 0 20%;">
        <p>Boster offers free samples for you to pilot test and make sure our antibodies work for your project. Trial size antibodies are typically 20ug, and you can expect 1 week lead time for preparation of your sample products. You will be charged a shipping fee which will be reflected on your quote.</p>
          <p>
            <strong style="font-size: 1.5em; color: #ea8d28;">Feedback Required:</strong> You will receive a quote for your free samples by email as soon as possible. By redeeming your free sample product quotation, you agree to provide product feedback within 60 days after receiving the sample products. After 60 days, you will receive an invoice with the retail listing prices for the products on the quote. If feedback is received within 30 days thereafter, the invoice will be voided by Boster Biological Technology. Feedback will be in the form of a product review including technical details, results images, and product ratings. You will be contacted with our feedback form and given a total of 90 days to return the form. Please feel free to contact us at support@bosterbio.com for further details.</p>
              <form action="/action_page.php" method="post">
                <fieldset>
                  <legend>Personal information:</legend>
                    First name:<br>
                    <input type="text" name="firstname" value="Dr.">
                    <br>
                    <br>
                    Last name:<br>
                    <input type="text" name="lastname" value="Booster">
                    <br>
                  </fieldset>
                  <br>
                  <fieldset>
                    <legend>Free Sample Qualification Questions</legend>
                      What experiment are you planning? what do you consider as success/positive? <br>
                      <input type="text" name="Q1"> <br>
                      <br>
                      When do you expect to receive and test the samples? <br>
                      <input type="text" name="Q2"> <br>
                      <br>
                      If the sample tested positive to your needs, how likely will you be buying the product? What other factors will affect your buying decision besides whether the sample will work for your application? <br>
                      <input type="text" name="Q3"> <br>
                      <br>
                      How much of this product will you need? how much of similar products do you use in your lab? <br>
                      <input type="text" name="Q4"> <br>
                      <br>
                      Are you willing to pay for shipping for free samples? <br>
                      <input type="text" name="Q5"> <br>
                    </fieldset>
                    <br>
                    <fieldset>
                      <legend>Shipping Address:</legend>
                        Address: <br>
                        <input type="text" name="shippingaddress"> <br>
                        <br>
                        City <br>
                        <input type="text" name="City"> <br>
                        <br>
                        Country <br>
                        <input type="text" name="country"> <br>
                        <br>
                        Zip Code <br>
                        <input type="text" name="zipcode"> <br>
                      </fieldset>
                      <br>
                      <fieldset>
                        <legend>Billing Address:</legend>
                          Address: <br>
                          <input type="text" name="billingaddress"> <br>
                          <br>
                          City <br>
                          <input type="text" name="City"> <br>
                          <br>
                          Country <br>
                          <input type="text" name="country"> <br>
                          <br>
                          Zip Code <br>
                          <input type="text" name="zipcode"> <br>
                        </fieldset>
                        <br>
                        <fieldset>
                          <legend>Payment Information</legend>
                            Credit Card Number: <br>
                            <input type="text" name="creditcard"> <br>
                            <br>
                            Expiration Date: <br>
                            <input type="text" name="expirationdate"> <br>
                            <br>
                            Security Code: <br>
                            <input type="text" name="securitycode"> <br>
                          </fieldset>
                          <input type="submit" value="Submit">
                        </form>
                      </div>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 3. CMS page (tradeshow-survey)

- **Structural hash:** `8f00ef2b3c95045b` (for cross-reference)
- **URL prefix:** `tradeshow-survey`
- **Used by:** 2 page(s) (2 active)
- **Representative:** `tradeshow-survey` (page_id 687) — tradeshow-survey
- **All identifiers in cluster:** `tradeshow-survey`, `survey-of-consumables`
- **content_heading:** _empty_
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="my-5 topic-heading-section">
  <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Survey is loading</h2>
    <p class="text-grey text-center w-75 mx-auto mb-5 font-medium">This can take up to 10 seconds to load. Thank you for your patience.</p>
    </section>
    <iframe src="https://survey.zohopublic.com/zs/ZEClMe" frameborder='0' style="height: 80vh;width:100%;max-width:2000px !important;"marginwidth='0' marginheight='0' scrolling='auto' allow='geolocation'>
    </iframe>
    <style>.main-navigation-bar,.main-footer{display:none;}</style>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 4. CMS page (no-route)

- **Structural hash:** `b4c5fda66e64a2f5` (for cross-reference)
- **URL prefix:** `no-route`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `no-route` (page_id 1) — 404 Not Found | Antibody Company, Monoclonal Antibodies
- **All identifiers in cluster:** `no-route`
- **content_heading:** _empty_
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="double-column content-section py-6">
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-12">
        <img class="d-block mx-auto mb-lg-0 mb-5" data-class="LazyLoad" src="/media/images/404-surprised-look.jpg" data-src="media/images/oops-404-error.png" alt="oops-404-error">
      </div>
      <div class="col-lg-1">
      </div>
      <div class="col-lg-8 col-12">
        <h1 class="font-largest text-orange">Ooops, where am I?</h1>
          <p class="font-large text-grey">The page you are looking for is currently unavailable.</p>
            <p class="font-medium text-darkgrey mb-5">Dr. Booster (the blue guy on the left) could not believe that just happened. Are you looking for something specific? We would love to help you find it. Use the live chat on the bottom right of this page or email support@bosterbio.com. We would love to hear from YOU!</p>
              <p class="font-large text-orange">Checkout these popular services, products and resources</p>
                <div class="row list">
                  <ul class="list-unstyled col-12 col-lg-4">
                    <li class="mb-2 font-large">
                      <p>Services</p>
                      </li>
                      <li class="mb-2">
                        <a href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/elisa-testing-service">ELISA testing service</a>
                        </li>
                        <li class="mb-2">
                          <a href="https://SITE_ORIGIN_PLACEHOLDER/services/custom-antibody-production-services">Custom antibody production services</a>
                          </li>
                          <li class="mb-2">
                            <a href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/ihc-histology-services">IHC services &amp; IF services</a>
                            </li>
                            <li class="mb-2">
                              <a href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/western-blotting-service">Western blottig WB services</a>
                              </li>
                              <li class="mb-2">
                                <a href="/services/recombinant-protein-expression-service">Protein expression service</a>
                                </li>
                                <li class="mb-2">
                                  <a href="/services/antibody-validation-service">Antibody validation service</a>
                                  </li>
                                </ul>
                                <ul class="list-unstyled col-12 col-lg-4">
                                  <li class="mb-2 font-large">
                                    <p>Products</p>
                                    </li>
                                    <li class="mb-2">
                                      <a class="mb-2" href="/primary-antibodies">Primary Antibodies</a>
                                      </li>
                                      <li class="mb-2">
                                        <a class="mb-2" href="/products/primary-antibodies/monoclonal-primary-antibodies.html">--Monoclonal Antibodies</a>
                                        </li>
                                        <li class="mb-2">
                                          <a class="mb-2" href="/products/primary-antibodies/rabbit-monoclonal-antibodies.html">--Rabbit Monoclonal Antibodies</a>
                                          </li>
                                          <li class="mb-2">
                                            <a class="mb-2" href="/elisa-kits">ELISA Kits</a>
                                            </li>
                                            <li class="mb-2">
                                              <a class="mb-2" href="/picokine-elisa-kits.html">--PicoKine™ ELISA Kits</a>
                                              </li>
                                              <li class="mb-2">
                                                <a class="mb-2" href="/picokine-elisa-kits/picokine-fast-elisa-kits.html">--PicoKine™ Fast ELISA Kits</a>
                                                </li>
                                                <li class="mb-2">
                                                  <a class="mb-2" href="/products/ez-set-elisa-kits-antibody-pairs.html">--EZ Set™ ELISA Antibody Pairs</a>
                                                  </li>
                                                  <li class="mb-2">
                                                    <a class="mb-2" href="/multiplex-elisa-solutions">--Multiplex ELISA Solutions</a>
                                                    </li>
                                                    <li class="mb-2">
                                                      <a class="mb-2" href="/secondary-antibodies">Secondary Antibodies</a>
                                                      </li>
                                                    </ul>
                                                    <ul class="list-unstyled col-12 col-lg-4">
                                                      <li class="mb-2 font-large">
                                                        <p>Resources</p>
                                                        </li>
                                                        <li class="mb-2">
                                                          <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/elisa-principle">ELISA principles, how ELISA works</a>
                                                          </li>
                                                          <li class="mb-2">
                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/flow-cytometry-principle">Flow cytometry principles, how FACS works</a>
                                                            </li>
                                                            <li class="mb-2">
                                                              <a href="/protocol-and-troubleshooting/western-blot-principle">Western blot principles, how WB works</a>
                                                              </li>
                                                              <li class="mb-2">
                                                                <a href="/protocol-and-troubleshooting/immunohistochemistry-ihc-principle">Immunohistochemistry/IHC principles, How does immunocytochemistry work</a>
                                                                </li>
                                                              </ul>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </section>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 5. Company / support page

- **Structural hash:** `258fe58a8a8d6ac0` (for cross-reference)
- **URL prefix:** `contact-us`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `contact-us` (page_id 4) — Contact Us | Boster Bio
- **All identifiers in cluster:** `contact-us`
- **content_heading:** _empty_
- **Magento directives in sample:** `{{block class="Magento\Contact\Block\ContactForm" name="contactForm" template="Magento_Contact::form.phtml"}}`

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
{{block class="Magento\Contact\Block\ContactForm" name="contactForm" template="Magento_Contact::form.phtml"}}
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 6. Policy / legal page

- **Structural hash:** `9defd5f336c788ab` (for cross-reference)
- **URL prefix:** `enable-cookies`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `enable-cookies` (page_id 5) — Enable Cookies | Antibody Company, Monoclonal Antibodies, Polyclonal Antibodies
- **All identifiers in cluster:** `enable-cookies`
- **content_heading:** _empty_
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 text-center hero-section" style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER)">
  <div class="dark-overlap">
    <h1 class="mb-2">What Are Cookies?</h1>
    </div>
  </section>
  <section class="mb-6 single-column content-section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="font-large text-orange mb-2 text-capitalize">Introduction</h2>
            <h3 class="font-medium text-grey mb-4">Please enable cookies in your web browser to continue.</h3>
              <p class="mb-5">Cookies are short pieces of data that are sent to your computer when you visit a website. On later visits, this data is then returned to that website. Cookies allow us to recognize you automatically whenever you visit our
                site so that we can personalize your experience and provide you with better service. We also use cookies (and similar browser data, such as Flash cookies) for fraud prevention and other purposes. If your web browser is set to refuse
                cookies from our website, you will not be able to complete a purchase or take advantage of certain features of our website, such as storing items in your Shopping Cart or receiving personalized recommendations. As a result, we strongly
                encourage you to configure your web browser to accept cookies from our website.</p>
                <h2 class="font-large text-orange mb-2 text-capitalize">Enabling Cookies</h2>
                  <h4 class="text-capitalize font-large">Internet Explorer 7.X:</h4>
                    <ol class="list-style-numbers mb-5">
                      <li>
                        <p>Start Internet Explorer</p>
                        </li>
                        <li>
                          <p>Under the <strong>Tools</strong> menu, click <strong>Internet Options</strong>
                          </p>
                        </li>
                        <li>
                          <p>Click the <strong>Privacy</strong> tab</p>
                          </li>
                          <li>
                            <p>Click the <strong>Advanced</strong> button</p>
                            </li>
                            <li>
                              <p>Put a check mark in the box for <strong>Override Automatic Cookie Handling</strong>, put another check mark in the <strong>Always accept session cookies </strong>box</p>
                              </li>
                              <li>
                                <p>Click <strong>OK</strong>
                                </p>
                              </li>
                              <li>
                                <p>Click <strong>OK</strong>
                                </p>
                              </li>
                              <li>
                                <p>Restart Internet Explore</p>
                                </li>
                              </ol>
                              <h4 class="text-capitalize font-large">Internet Explorer 6.X:</h4>
                                <ol class="list-style-numbers mb-5">
                                  <li>
                                    <p>Select <strong>Internet Options</strong> from the Tools menu</p>
                                    </li>
                                    <li>
                                      <p>Click on the <strong>Privacy</strong> tab</p>
                                      </li>
                                      <li>
                                        <p>Click the <strong>Default</strong> button (or manually slide the bar down to <strong>Medium</strong>) under <strong>Settings</strong>. Click <strong>OK</strong>
                                        </p>
                                      </li>
                                    </ol>
                                    <h4 class="text-capitalize font-large">Mozilla/Firefox:</h4>
                                      <ol class="list-style-numbers mb-5">
                                        <li>
                                          <p>Click on the <strong>Tools</strong>-menu in Mozilla</p>
                                          </li>
                                          <li>
                                            <p>Click on the <strong>Options...</strong> item in the menu - a new window open</p>
                                            </li>
                                            <li>
                                              <p>Click on the <strong>Privacy</strong> selection in the left part of the window. (See image below)</p>
                                              </li>
                                              <li>
                                                <p>Expand the <strong>Cookies</strong> section</p>
                                                </li>
                                                <li>
                                                  <p>Check the <strong>Enable cookies</strong> and <strong>Accept cookies normally</strong> checkboxes</p>
                                                  </li>
                                                  <li>
                                                    <p>Save changes by clicking <strong>Ok</strong>.</p>
                                                    </li>
                                                  </ol>
                                                  <h4 class="text-capitalize font-large">Opera 7.X:</h4>
                                                    <ol class="list-style-numbers mb-5">
                                                      <li>
                                                        <p>Click on the <strong>Tools</strong> menu in Opera</p>
                                                        </li>
                                                        <li>
                                                          <p>Click on the <strong>Preferences...</strong> item in the menu - a new window open</p>
                                                          </li>
                                                          <li>
                                                            <p>Click on the <strong>Privacy</strong> selection near the bottom left of the window. (See image below)</p>
                                                            </li>
                                                            <li>
                                                              <p>The <strong>Enable cookies</strong> checkbox must be checked, and <strong>Accept all cookies</strong> should be selected in the "<strong>Normal cookies</strong>" drop-down</p>
                                                              </li>
                                                              <li>
                                                                <p>Save changes by clicking <strong>Ok</strong>
                                                                </p>
                                                              </li>
                                                            </ol>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </section>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 7. Policy / legal page

- **Structural hash:** `563628e9e61ae0ad` (for cross-reference)
- **URL prefix:** `privacy-policy-cookie-restriction-mode`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `privacy-policy-cookie-restriction-mode` (page_id 6) — Privacy | Antibody Company, Monoclonal Antibodies, ELISA Kits
- **All identifiers in cluster:** `privacy-policy-cookie-restriction-mode`
- **content_heading:** `Privacy Policy`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 text-center hero-section" style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER)">
  <div class="dark-overlap">
    <h1 class="mb-2">Privacy</h1>
    </div>
  </section>
  <section class="mb-6 single-column content-section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="font-large text-orange mb-2 text-capitalize">Introduction</h2>
            <p class="mb-4">This privacy policy sets out how Bosterbio uses and protects any information that you give Bosterbio when you use this website. Bosterbio is committed to ensuring that your privacy is protected. Should we ask you to
              provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. Bosterbio may change this policy from time to time by
              updating this page. You should check this page from time to time to ensure that you are happy with any changes.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="mb-6 topic-heading-section">
        <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">What We Collect</h2>
        </section>
        <section class="mb-6 single-column content-section">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <p>We may collect the following information:</p>
                  <ul class="list-style-bullets">
                    <li>name</li>
                      <li>contact information including email address</li>
                        <li>demographic information such as postcode, preferences and interests</li>
                          <li>other information relevant to customer surveys and/or offers</li>
                          </ul>
                          <p>For the exhaustive list of cookies we collect see the <a href="#list">List of cookies we collect</a> section.</p>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section class="mb-6 topic-heading-section">
                      <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">What We Do With The Information We Gather</h2>
                      </section>
                      <section class="mb-6 single-column content-section">
                        <div class="container">
                          <div class="row">
                            <div class="col-12">
                              <p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
                                <ul class="list-style-bullets">
                                  <li>Internal record keeping.</li>
                                    <li>We may use the information to improve our products and services.</li>
                                      <li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
                                        <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                <section class="mb-6 topic-heading-section">
                                  <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Security</h2>
                                  </section>
                                  <section class="mb-6 single-column content-section">
                                    <div class="container">
                                      <div class="row">
                                        <div class="col-12">
                                          <p>We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information
                                            we collect online.</p>
                                          </div>
                                        </div>
                                      </div>
                                    </section>
                                    <section class="mb-6 topic-heading-section">
                                      <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">How We Use Cookies</h2>
                                      </section>
                                      <section class="mb-6 single-column content-section">
                                        <div class="container">
                                          <div class="row">
                                            <div class="col-12">
                                              <p>A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web
                                                applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>
                                                <p>We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis
                                                  purposes and then the data is removed from the system.</p>
                                                  <p>Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the
                                                    data you choose to share with us. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from
                                                    taking full advantage of the website.</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </section>
                                            <section class="mb-6 topic-heading-section">
                                              <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Links To Other Websites</h2>
                                              </section>
                                              <section class="mb-6 single-column content-section">
                                                <div class="container">
                                                  <div class="row">
                                                    <div class="col-12">
                                                      <p>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for
                                                        the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the
                                                        website in question.</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </section>
                                                <section class="mb-6 topic-heading-section">
                                                  <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Controlling Your Personal Information</h2>
                                                  </section>
                                                  <section class="mb-6 single-column content-section">
                                                    <div class="container">
                                                      <div class="row">
                                                        <div class="col-12">
                                                          <p>You may choose to restrict the collection or use of your personal information in the following ways:</p>
                                                            <ul class="list-style-bullets">
                                                              <li>whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
                                                                <li>if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at support@bosterbio.com</li>
                                                                </ul>
                                                                <p>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third
                                                                  parties which we think you may find interesting if you tell us that you wish this to happen.</p>
                                                                  <p>You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy of the information held on you please write to .</p>
                                                                    <p>If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.</p>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </section>
                                                              <section class="mb-6 topic-heading-section">
                                                                <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">List Of Cookies We Collect</h2>
                                                                </section>
                                                                <section class="mb-6 single-column content-section">
                                                                  <div class="container">
                                                                    <div class="row">
                                                                      <div class="col-12">
                                                                        <p>The table below lists the cookies we collect and what information they store.</p>
                                                                          <table class="table table-striped">
                                                                            <thead>
                                                                              <tr>
                                                                                <th>COOKIE name</th>
                                                                                  <th>COOKIE Description</th>
                                                                                  </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                  <tr>
                                                                                    <th>CART</th>
                                                                                      <td>The association with your shopping cart.</td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                        <th>CATEGORY_INFO</th>
                                                                                          <td>Stores the category info on the page, that allows to display pages more quickly.</td>
                                                                                          </tr>
                                                                                          <tr>
                                                                                            <th>COMPARE</th>
                                                                                              <td>The items that you have in the Compare Products list.</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                <th>CURRENCY</th>
                                                                                                  <td>Your preferred currency</td>
                                                                                                  </tr>
                                                                                                  <tr>
                                                                                                    <th>CUSTOMER</th>
                                                                                                      <td>An encrypted version of your customer id with the store.</td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                        <th>CUSTOMER_AUTH</th>
                                                                                                          <td>An indicator if you are currently logged into the store.</td>
                                                                                                          </tr>
                                                                                                          <tr>
                                                                                                            <th>CUSTOMER_INFO</th>
                                                                                                              <td>An encrypted version of the customer group you belong to.</td>
                                                                                                              </tr>
                                                                                                              <tr>
                                                                                                                <th>CUSTOMER_SEGMENT_IDS</th>
                                                                                                                  <td>Stores the Customer Segment ID</td>
                                                                                                                  </tr>
                                                                                                                  <tr>
                                                                                                                    <th>EXTERNAL_NO_CACHE</th>
                                                                                                                      <td>A flag, which indicates whether caching is disabled or not.</td>
                                                                                                                      </tr>
                                                                                                                      <tr>
                                                                                                                        <th>FRONTEND</th>
                                                                                                                          <td>You sesssion ID on the server.</td>
                                                                                                                          </tr>
                                                                                                                          <tr>
                                                                                                                            <th>GUEST-VIEW</th>
                                                                                                                              <td>Allows guests to edit their orders.</td>
                                                                                                                              </tr>
                                                                                                                              <tr>
                                                                                                                                <th>LAST_CATEGORY</th>
                                                                                                                                  <td>The last category you visited.</td>
                                                                                                                                  </tr>
                                                                                                                                  <tr>
                                                                                                                                    <th>LAST_PRODUCT</th>
                                                                                                                                      <td>The most recent product you have viewed.</td>
                                                                                                                                      </tr>
                                                                                                                                      <tr>
                                                                                                                                        <th>NEWMESSAGE</th>
                                                                                                                                          <td>Indicates whether a new message has been received.</td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                            <th>NO_CACHE</th>
                                                                                                                                              <td>Indicates whether it is allowed to use cache.</td>
                                                                                                                                              </tr>
                                                                                                                                              <tr>
                                                                                                                                                <th>PERSISTENT_SHOPPING_CART</th>
                                                                                                                                                  <td>A link to information about your cart and viewing history if you have asked the site.</td>
                                                                                                                                                  </tr>
                                                                                                                                                  <tr>
                                                                                                                                                    <th>POLL</th>
                                                                                                                                                      <td>The ID of any polls you have recently voted in.</td>
                                                                                                                                                      </tr>
                                                                                                                                                      <tr>
                                                                                                                                                        <th>POLLN</th>
                                                                                                                                                          <td>Information on what polls you have voted on.</td>
                                                                                                                                                          </tr>
                                                                                                                                                          <tr>
                                                                                                                                                            <th>RECENTLYCOMPARED</th>
                                                                                                                                                              <td>The items that you have recently compared.</td>
                                                                                                                                                              </tr>
                                                                                                                                                              <tr>
                                                                                                                                                                <th>STF</th>
                                                                                                                                                                  <td>Information on products you have emailed to friends.</td>
                                                                                                                                                                  </tr>
                                                                                                                                                                  <tr>
                                                                                                                                                                    <th>STORE</th>
                                                                                                                                                                      <td>The store view or language you have selected.</td>
                                                                                                                                                                      </tr>
                                                                                                                                                                      <tr>
                                                                                                                                                                        <th>USER_ALLOWED_SAVE_COOKIE</th>
                                                                                                                                                                          <td>Indicates whether a customer allowed to use cookies.</td>
                                                                                                                                                                          </tr>
                                                                                                                                                                          <tr>
                                                                                                                                                                            <th>VIEWED_PRODUCT_IDS</th>
                                                                                                                                                                              <td>The products that you have recently viewed.</td>
                                                                                                                                                                              </tr>
                                                                                                                                                                              <tr>
                                                                                                                                                                                <th>WISHLIST</th>
                                                                                                                                                                                  <td>An encrypted list of products added to your Wishlist.</td>
                                                                                                                                                                                  </tr>
                                                                                                                                                                                  <tr>
                                                                                                                                                                                    <th>WISHLIST_CNT</th>
                                                                                                                                                                                      <td>The number of items in your Wishlist.</td>
                                                                                                                                                                                      </tr>
                                                                                                                                                                                    </tbody>
                                                                                                                                                                                  </table>
                                                                                                                                                                                </div>
                                                                                                                                                                              </div>
                                                                                                                                                                            </div>
                                                                                                                                                                          </section>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 8. CMS page (distributors-old)

- **Structural hash:** `542afa0b79978e24` (for cross-reference)
- **URL prefix:** `distributors-old`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `distributors-old` (page_id 7) — Boster Distributors | Geographic Listing (Old - before 20190726)
- **All identifiers in cluster:** `distributors-old`
- **content_heading:** `NULL`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<style>
  h1, h2, h3, h4 {
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: bold;
  }
  .distributor-details img {
  Angelique Stavrinoudis margin-top: 30px;
  }
  h2 {
  border-bottom: 1px solid #EA8D28;
  Wilco van Hamond
  }
  h2 {
  color: #EA8D28;
  }
  h3 {
  color: #434343;
  }
  eubio@eubio.at
</style>
<p>For countries where Boster do not have distributors, we can ship there directly. Please <a href="/contact-us">contact us</a> for shipping time and cost. </p>
  <h2>BROWSE DISTRIBUTORS BY COUNTRIES:</h2>
    <div class='col-md-3'>
      <h3>ASIA</h3>
        <div>
          <a href="#Bangladesh-block" target='_self'>Bangladesh</a>
          </div>
          <div>
            <a href="#hongkong-block" target='_self'>Hong Kong</a>
            </div>
            <div>
              <a href="#india-block" target='_self'>India</a>
              </div>
              <div>
                <a href="#indonesia-block" target='_self'>Indonesia</a>
                </div>
                <div>
                  <a href="#iraq-block" target='_self'>Iraq</a>
                  </div>
                  <div>
                    <a href="#israel-block" target='_self'>Israel</a>
                    </div>
                    <div>
                      <a href="#japan-block" target='_self'>Japan</a>
                      </div>
                      <div>
                        <a href="#korea-block" target='_self'>Korea</a>
                        </div>
                        <div>
                          <a href="#malaysia-block" target='_self'>Malaysia</a>
                          </div>
                          <div>
                            <a href="#pakistan-block" target='_self'>Pakistan</a>
                            </div>
                            <div>
                              <a href="#singapore-block" target='_self'>Singapore</a>
                              </div>
                              <div>
                                <a href="#sri-lanka-block" target='_self'>Sri Lanka</a>
                                </div>
                                <div>
                                  <a href="#taiwan-block" target='_self'>Taiwan</a>
                                  </div>
                                  <div>
                                    <a href="#thailand-block" target='_self'>Thailand</a>
                                    </div>
                                    <div>
                                      <a href="#turkey-block" target='_self'>Turkey</a>
                                      </div>
                                      <div>
                                        <a href="#vietnam-block" target='_self'>Vietnam</a>
                                        </div>
                                      </div>
                                      <div class='col-md-3'>
                                        <h3>EUROPE</h3>
                                          <div>
                                            <a href="#austria-block" target='_self'>Austria</a>
                                            </div>
                                            <div>
                                              <a href="#belgium-block" target='_self'>Belgium</a>
                                              </div>
                                              <div>
                                                <a href="#czech_republic-block" target='_self'>Czech Republic, Slovakia</a>
                                                </div>
                                                <div>
                                                  <a href="#denmark-block" target='_self'>Denmark</a>
                                                  </div>
                                                  <div>
                                                    <a href="#france-block" target='_self'>France</a>
                                                    </div>
                                                    <div>
                                                      <a href="#germany-block" target='_self'>Germany</a>
                                                      </div>
                                                      <div>
                                                        <a href="#greece-block" target='_self'>Greece</a>
                                                        </div>
                                                        <div>
                                                          <a href="#hungary-block" target='_self'>Hungary</a>
                                                          </div>
                                                          <div>
                                                            <a href="#italy-block" target='_self'>Italy</a>
                                                            </div>
                                                            <div>
                                                              <a href="#Ireland-block" target='_self'>Ireland</a>
                                                              </div>
                                                              <div>
                                                                <a href="#luxembourg-block" target='_self'>Luxembourg</a>
                                                                </div>
                                                                <div>
                                                                  <a href="#netherlands-block" target='_self'>Netherlands</a>
                                                                  </div>
                                                                  <div>
                                                                    <a href="#portugal-block" target='_self'>Poland</a>
                                                                    </div>
                                                                    <div>
                                                                      <a href="#poland-block" target='_self'>Portugal</a>
                                                                      </div>
                                                                      <div>
                                                                        <a href="#romania-block" target='_self'>Romania</a>
                                                                        </div>
                                                                        <div>
                                                                          <a href="#serbia-block" target='_self'>Serbia</a>
                                                                          </div>
                                                                          <div>
                                                                            <a href="#spain-block" target='_self'>Spain</a>
                                                                            </div>
                                                                            <div>
                                                                              <a href="#sweden-block" target='_self'>Sweden, Denmark, Norway, Finland</a>
                                                                              </div>
                                                                              <div>
                                                                                <a href="#switzerland-block" target='_self'>Switzerland</a>
                                                                                </div>
                                                                                <div>
                                                                                  <a href="#united_kingdoms-block" target='_self'>United Kingdom</a>
                                                                                  </div>
                                                                                </div>
                                                                                <div class='col-md-3'>
                                                                                  <h3>NORTH AMERICA</h3>
                                                                                    <div>
                                                                                      <a href="#canada-block" target='_self'>Canada</a>
                                                                                      </div>
                                                                                      <div>
                                                                                        <a href="#mexico-block" target='_self'>Mexico</a>
                                                                                        </div>
                                                                                        <div>
                                                                                          <a href="#united_states-block" target='_self'>United States</a>
                                                                                          </div>
                                                                                          <h3>CENTRAL AND SOUTH AMERICA</h3>
                                                                                            <div>
                                                                                              <a href="#brazil-block" target='_self'>Brazil</a>
                                                                                              </div>
                                                                                              <div>
                                                                                                <a href="#Colombia-block" target='_self'>Colombia</a>
                                                                                                </div>
                                                                                                <div>
                                                                                                  <a href="#Chile-block" target='_self'>Chile</a>
                                                                                                  </div>
                                                                                                  <h3>OCEANIA</h3>
                                                                                                    <div>
                                                                                                      <a href="#australia-block" target='_self'>Australia /  New Zealand</a>
                                                                                                      </div>
                                                                                                      <h3>AFRICA</h3>
                                                                                                        <div>
                                                                                                          <a href="#egypt-block" target='_self'>Egypt</a>
                                                                                                          </div>
                                                                                                          <div>
                                                                                                            <a href="#morocco-block" target='_self'>Morocco</a>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                              <a href="#south_africa-block" target='_self'>South Africa</a>
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                <a href="#nigeria-block" target='_self'>Nigeria</a>
                                                                                                                </div>
                                                                                                              </div>
                                                                                                              <div class='row'>
                                                                                                              </div>
                                                                                                              <div class='distributor-details'>
                                                                                                                <h2>Asia</h2>
                                                                                                                  <h3 id='Bangladesh-block'>Bangladesh</h3>
                                                                                                                    <div class='distributor company_block col-md-9'>
                                                                                                                      <div class='col-md-6'>
                                                                                                                        <h4>Orbit Trade</h4>
                                                                                                                          <table style='min-width: 80%'>
                                                                                                                            <tr>
                                                                                                                              <th>Contact Person: </th>
                                                                                                                                <td>Mesbahul Haque</td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                  <th>Country: </th>
                                                                                                                                    <td>Bangladesh</td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                      <th>Website: </th>
                                                                                                                                        <td>
                                                                                                                                          <a href='https://www.orbittrade.net/' target='_blank' rel='nofollow'>www.orbittrade.net</a>
                                                                                                                                          </td>
                                                                                                                                        </tr>
                                                                                                                                        <tr>
                                                                                                                                          <th>Phone: </th>
                                                                                                                                            <td>+880 1977393202</td>
                                                                                                                                            </tr>
                                                                                                                                            <tr>
                                                                                                                                              <th>Email: </th>
                                                                                                                                                <td>
                                                                                                                                                  <a href='mailto:orbittradebd@gmail.com' target='_self' rel='nofollow'>orbittradebd@gmail.com</a>
                                                                                                                                                  </td>
                                                                                                                                                </tr>
                                                                                                                                              </table>
                                                                                                                                            </div>
                                                                                                                                            <div class='col-md-6'> <img src='/skin/frontend/bosterbio/default/images/orbittrade.png' style='max-height:100px;max-width:300px;'> </div>
                                                                                                                                            </div>
                                                                                                                                            <div class='row'>
                                                                                                                                            </div>
                                                                                                                                            <h3 id='hongkong-block'>Hong Kong</h3>
                                                                                                                                              <div class='distributor company_block col-md-9'>
                                                                                                                                                <div class='col-md-6'>
                                                                                                                                                  <h4>Medikonia Limited</h4>
                                                                                                                                                    <table style='min-width: 80%'>
                                                                                                                                                      <tr>
                                                                                                                                                        <th>Contact Person: </th>
                                                                                                                                                          <td>Joe Lai</td>
                                                                                                                                                          </tr>
                                                                                                                                                          <tr>
                                                                                                                                                            <th>Country: </th>
                                                                                                                                                              <td>Hong Kong, Macau</td>
                                                                                                                                                              </tr>
                                                                                                                                                              <tr>
                                                                                                                                                                <th>Website: </th>
                                                                                                                                                                  <td>
                                                                                                                                                                    <a href='https://www.medikonia.com/' target='_blank' rel='nofollow'>www.medikonia.com</a>
                                                                                                                                                                    </td>
                                                                                                                                                                  </tr>
                                                                                                                                                                  <tr>
                                                                                                                                                                    <th>Phone: </th>
                                                                                                                                                                      <td>(852) 2866 8995</td>
                                                                                                                                                                      </tr>
                                                                                                                                                                      <tr>
                                                                                                                                                                        <th>Email: </th>
                                                                                                                                                                          <td>
                                                                                                                                                                            <a href='mailto:cs@medikonia.com' target='_self' rel='nofollow'>cs@medikonia.com</a>
                                                                                                                                                                            </td>
                                                                                                                                                                          </tr>
                                                                                                                                                                        </table>
                                                                                                                                                                      </div>
                                                                                                                                                                      <div class='col-md-6'> <img src='/skin/frontend/bosterbio/default/images/Medikonia_logo.png' style='max-height:100px;max-width:300px;'> </div>
                                                                                                                                                                      </div>
                                                                                                                                                                      <div class='row'>
                                                                                                                                                                      </div>
                                                                                                                                                                      <h3 id='india-block'>India</h3>
                                                                                                                                                                        <div class='distributor company_block col-md-9'>
                                                                                                                                                                          <div class='col-md-6'>
                                                                                                                                                                            <h4>ImmunoConcept India Private Limited</h4>
                                                                                                                                                                              <table style='min-width: 80%'>
                                                                                                                                                                                <tr>
                                                                                                                                                                                  <th>Contact Person: </th>
                                                                                                                                                                                    <td>Harendra Kumar</td>
                                                                                                                                                                                    </tr>
                                                                                                                                                                                    <tr>
                                                                                                                                                                                      <th>Country: </th>
                                                                                                                                                                                        <td>India</td>
                                                                                                                                                                                        </tr>
                                                                                                                                                                                        <tr>
                                                                                                                                                                                          <th>Website: </th>
                                                                                                                                                                                            <td>
                                                                                                                                                                                              <a href='https://www.immunoconceptindia.com' target='_blank' rel='nofollow'> www.immunoconceptindia.com</a>
                                                                                                                                                                                              </td>
                                                                                                                                                                                            </tr>
                                                                                                                                                                                            <tr>
                                                                                                                                                                                              <th>Phone: </th>
                                                                                                                                                                                                <td>+91 11 43063564</td>
                                                                                                                                                                                                </tr>
                                                                                                                                                                                                <tr>
                                                                                                                                                                                                  <th> </th>
                                                                                                                                                                                                    <td> +91 11 4254 7608</td>
                                                                                                                                                                                                    </tr>
                                                                                                                                                                                                    <tr>
                                                                                                                                                                                                      <th>Email: </th>
                                                                                                                                                                                                        <td>
                                                                                                                                                                                                          <a href='mailto:harendra@immunoconceptindia.com' target='_self' rel='nofollow'>harendra@immunoconceptindia.com</a>
                                                                                                                                                                                                            <br>
                                                                                                                                                                                                            <a href='mailto:sales@immunoconceptindia.com' target='_self' rel='nofollow'>sales@immunoconceptindia.com</a>
                                                                                                                                                                                                            </td>
                                                                                                                                                                                                          </tr>
                                                                                                                                                                                                        </table>
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                      <div class='col-md-6'> <img src='/skin/frontend/bosterbio/default/images/immunaconcept.jpg' style='max-height:100px;max-width:300px;'> </div>
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                      <div class='row'>
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                      <h3 id='indonesia-block'>Indonesia</h3>
                                                                                                                                                                                                        <div class='distributor company_block col-md-9'>
                                                                                                                                                                                                          <div class='col-md-6'>
                                                                                                                                                                                                            <h4>Biozatix</h4>
                                                                                                                                                                                                              <table style='min-width: 80%'>
                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                  <th>Contact Person: </th>
                                                                                                                                                                                                                    <td>Herman TKK</td>
                                                                                                                                                                                                                    </tr>
                                                                                                                                                                                                                    <tr>
                                                                                                                                                                                                                      <th>Country: </th>
                                                                                                                                                                                                                        <td>Indonesia</td>
                                                                                                                                                                                                                        </tr>
                                                                                                                                                                                                                        <tr>
                                                                                                                                                                                                                          <th>Website: </th>
                                                                                                                                                                                                                            <td>
                                                                                                                                                                                                                              <a href='https://www.biozatix.com' target='_blank' rel='nofollow'> www.biozatix.com</a>
                                                                                                                                                                                                                              </td>
                                                                                                                                                                                                                            </tr>
                                                                                                                                                                                                                            <tr>
                                                                                                                                                                                                                              <th>Phone: </th>
                                                                                                                                                                                                                                <td>+62 21 47885303</td>
                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                  <th>Email: </th>
                                                                                                                                                                                                                                    <td>
                                                                                                                                                                                                                                      <a href='mailto:sales@biozatix.com' target='_self' rel='nofollow'>sales@biozatix.com</a>
                                                                                                                                                                                                                                      </td>
                                                                                                                                                                                                                                    </tr>
                                                                                                                                                                                                                                  </table>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                <div class='col-md-6'> <img src='/skin/frontend/bosterbio/default/images/biozatix.jpg' style='max-height:100px;max-width:300px;'> </div>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                <div class='row'>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                <h3 id='iraq-block'>Iraq</h3>
                                                                                                                                                                                                                                  <!--
                                                                                                                                                                                                                                  <div class='distributor company_block col-md-9'>
                                                                                                                                                                                                                                    <div class='col-md-6'>
                                                                                                                                                                                                                                      <h4>Marifa Medical Co. LTD</h4>
                                                                                                                                                                                                                                        <table style='min-width: 80%'>
                                                                                                                                                                                                                                          <tr>
                                                                                                                                                                                                                                            <th>Contact Person:  </th>
                                                                                                                                                                                                                                              <td>Eng Hasanin</td>
                                                                                                                                                                                                                                              </tr>
                                                                                                                                                                                                                                              <tr>
                                                                                                                                                                                                                                                <th>Country: </th>
                                                                                                                                                                                                                                                  <td>Iraq</td>
                                                                                                                                                                                                                                                  </tr>
                                                                                                                                                                                                                                                  <tr>
                                                                                                                                                                                                                                                    <th>Website:  </th>
                                                                                                                                                                                                                                                      <td>
                                                                                                                                                                                                                                                        <a href='https://www.mmc-iq.com' target='_blank' rel='nofollow'> www.mmc-iq.com</a>
                                                                                                                                                                                                                                                        </td>
                                                                                                                                                                                                                                                      </tr>
                                                                                                                                                                                                                                                      <tr>
                                                                                                                                                                                                                                                        <th>Phone: </th>
                                                                                                                                                                                                                                                          <td>96 47807259686</td>
                                                                                                                                                                                                                                                          </tr>
                                                                                                                                                                                                                                                          <tr>
                                                                                                                                                                                                                                                            <th>Email:  </th>
                                                                                                                                                                                                                                                              <td>
                                                                                                                                                                                                                                                                <a href='mailto:info@mmc-iq.com' target='_self' rel='nofollow'>info@mmc-iq.com</a>
                                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                                              </tr>
                                                                                                                                                                                                                                                            </table>
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                          <div class='col-md-6'>
                                                                                                                                                                                                                                                            <img src='/skin/frontend/bosterbio/bosterbio/' style='max-height:100px;'>
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                        <div class='row'>
                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                        -->
                                                                                                                                                                                                                                                        <div class='distributor company_block col-md-9'>
                                                                                                                                                                                                                                                          <div class='col-md-6'>
                                                                                                                                                                                                                                                            <h4>Marifa Medical Co. LTD</h4>
                                                                                                                                                                                                                                                              <table style='min-width: 80%'>
                                                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                                  <th>Contact Person: </th>
                                                                                                                                                                                                                                                                    <td>Eng Hasanin</td>
                                                                                                                                                                                                                                                                    </tr>
                                                                                                                                                                                                                                                                    <tr>
                                                                                                                                                                                                                                                                      <th>Country: </th>
                                                                                                                                                                                                                                                                        <td>Iraq</td>
                                                                                                                                                                                                                                                                        </tr>
                                                                                                                                                                                                                                                                        <tr>
                                                                                                                                                                                                                                                                          <th>Website: </th>
                                                                                                                                                                                                                                                                            <td>
                                                                                                                                                                                                                                                                              <a href='https://www.mmc-iq.com' target='_blank' rel='nofollow'> www.mmc-iq.com</a>
                                                                                                                                                                                                                                                                              </td>
                                                                                                                                                                                                                                                                            </tr>
                                                                                                                                                                                                                                                                            <tr>
                                                                                                                                                                                                                                                                              <th>Email: </th>
                                                                                                                                                                                                                                                                                <td>
                                                                                                                                                                                                                                                                                  <a href='mailto:hussein_gst@mmc-iq.com' target='_self' rel='nofollow'>hussein_gst@mmc-iq.com</a>
                                                                                                                                                                                                                                                                                  </td>
                                                                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                                                                              </table>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                            <div class='col-md-6'> <img src='/skin/frontend/bosterbio/default/images/' style='max-height:100px;max-width:300px;'> </div>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                            <div class='row'>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                            <h3 id='israel-block'>Israel</h3>
                                                                                                                                                                                                                                                                              <div class='distributor company_block col-md-9'>
                                                                                                                                                                                                                                                                                <div class='col-md-6'>
                                                                                                                                                                                                                                                                                  <h4>Almog diagnostic</h4>
                                                                                                                                                                                                                                                                                    <table style='min-width: 80%'>
                                                                                                                                                                                                                                                                                      <tr>
                                                                                                                                                                                                                                                                                        <th>Contact Person: </th>
                                                                                                                                                                                                                                                                                          <td>Naama Avneri</td>
                                                                                                                                                                                                                                                                                          </tr>
                                                                                                                                                                                                                                                                                          <tr>
                                                                                                                                                                                                                                                                                            <th>Country: </th>
                                                                                                                                                                                                                                                                                              <td>Israel</td>
                                                                                                                                                                                                                                                                                              </tr>
                                                                                                                                                                                                                                                                                              <tr>
                                                                                                                                                                                                                                                                                                <th>Website: </th>
                                                                                                                                                                                                                                                                                                  <td>
                                                                                                                                                                                                                                                                                                    <a href='https://www.almog.co.il' target='_blank' rel='nofollow'> www.almog.co.il</a>
                                                                                                                                                                                                                                                                                                    </td>
                                                                                                                                                                                                                                                                                                  </tr>
                                                                                                                                                                                                                                                                                                  <tr>
                                                                                                                                                                                                                                                                                                    <th>Phone: </th>
                                                                                                                                                                                                                                                                                                      <td>97 239773390</td>
                                                                                                                                                                                                                                                                                                      </tr>
                                                                                                                                                                                                                                                                                                      <tr>
                                                                                                                                                                                                                                                                                                        <th>Email: </th>
                                                                                                                                                                                                                                                                                                          <td>
                                                                                                                                                                                                                                                                                                            <a href='mailto:info@almog.co.il' target='_self' rel='nofollow'>info@almog.co.il</a>
                                                                                                                                                                                                                                                                                                              <br>
                                                                                                                                                                                                                                                                                                              <a href='mailto:ziv@almog.co.il' target='_self' rel='nofollow'>ziv@almog.co.il</a>
                                                                                                                                                                                                                                                                                                              </td>
                                                                                                                                                                                                                                                                                                            </tr>
                                                                                                                                                                                                                                                                                                          </table>
                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                        <div class='col-md-6'> <img src='/skin/frontend/bosterbio/default/images/almog.jpg' style='max-height:100px;max-width:300px;'> </div>
                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                        <div class='row'>
                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                        <h3 id='japan-block'>Japan</h3>
                                                                                                                                                                                                                                                                                                          <div class='distributor company_block col-md-9'>
                                                                                                                                                                                                                                                                                                            <div class='col-md-6'>
                                                                                                                                                                                                                                                                                                              <h4>Cosmo Bio Co., Ltd</h4>
                                                                                                                                                                                                                                                                                                                <table style='min-width: 80%'>
                                                                                                                                                                                                                                                                                                                  <tr>
                                                                                                                                                                                                                                                                                                                    <th>Contact Person: </th>
                                                                                                                                                                                                                                                                                                                      <td>Kaduki Kinno</td>
                                                                                                                                                                                                                                                                                                                      </tr>
                                                                                                                                                                                                                                                                                                                      <tr>
                                                                                                                                                                                                                                                                                                                        <th>Country: </th>
                                                                                                                                                                                                                                                                                                                          <td>Japan</td>
                                                                                                                                                                                                                                                                                                                          </tr>
                                                                                                                                                                                                                                                                                                                          <tr>
                                                                                                                                                                                                                                                                                                                            <th>Website: </th>
                                                                                                                                                                                                                                                                                                                              <td>
                                                                                                                                                                                                                                                                                                                                <a href='https://www.cosmobio.co.jp' target='_blank' rel='nofollow'> www.cosmobio.co.jp</a>
                                                                                                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                                                                                                              </tr>
                                                                                                                                                                                                                                                                                                                              <tr>
                                                                                                                                                                                                                                                                                                                                <th>Phone: </th>
                                                                                                                                                                                                                                                                                                                                  <td>81-3-5632-9617</td>
                                                                                                                                                                                                                                                                                                                                  </tr>
                                                                                                                                                                                                                                                                                                                                  <tr>
                                                                                                                                                                                                                                                                                                                                    <th>Email: </th>
                                                                                                                                                                                                                                                                                                                                      <td>
                                                                                                                                                                                                                                                                                                                                        <a href='mailto:mail@cosmobio.co.jp' target='_self' rel='nofollow'>mail@cosmobio.co.jp</a>
                                                                                                                                                                                                                                                                                                                                        </td>
                                                                                                                                                                                                                                                                                                                                      </tr>
                                                                                                                                                                                                                                                                                                                                    </table>
                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                  <div class='col-md-6'> <img src='/skin/frontend/bosterbio/default/images/cosmo.jpg' style='max-height:100px;max-width:300px;'> </div>
                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                  <div class='row'>
                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                  <div class='distributor company_block col-md-9'>
                                                                                                                                                                                                                                                                                                                                    <div class='col-md-6'>
                                                                                                                                                                                                                                                                                                                                      <h4>Filgen</h4>
                                                                                                                                                                                                                                                                                                                                        <table style='min-width: 80%'>
                                                                                                                                                                                                                                                                                                                                          <tr>
                                                                                                                                                                                                                                                                                                                                            <th>Contact Person: </th>
                                                                                                                                                                                                                                                                                                                                              <td>Yuka Nakayama (Ms.)</td>
                                                                                                                                                                                                                                                                                                                                              </tr>
                                                                                                                                                                                                                                                                                                                                              <tr>
                                                                                                                                                                                                                                                                                                                                                <th>Country: </th>
                                                                                                                                                                                                                                                                                                                                                  <td>Japan</td>
                                                                                                                                                                                                                                                                                                                                                  </tr>
                                                                                                                                                                                                                                                                                                                                                  <tr>
                                                                                                                                                                                                                                                                                                                                                    <th>Website: </th>
                                                                                                                                                                                                                                                                                                                                                      <td>
                                                                                                                                                                                                                                                                                                                                                        <a href='https://www.filgen.jp' target='_blank' rel='nofollow'>www.filgen.jp</a>
                                                                                                                                                                                                                                                                                                                                                        </td>
                                                                                                                                                                                                                                                                                                                                                      </tr>
                                                                                                                                                                                                                                                                                                                                                      <tr>
                                                                                                                                                                                                                                                                                                                                                        <th>Phone: </th>
                                                                                                                                                                                                                                                                                                                                                          <td>+81-52-624-4388</td>
                                                                                                                                                                                                                                                                                                                                                          </tr>
                                                                                                                                                                                                                                                                                                                                                          <tr>
                                                                                                                                                                                                                                                                                                                                                            <th>Email: </th>
                                                                                                                                                                                                                                                                                                                                                              <td>
                                                                                                                                                                                                                                                                                                                                                                <a href='mailto:biosupport@filgen.jp' target='_self' rel='nofollow'>biosupport@filgen.jp</a>
                                                                                                                                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                                                                                                                                              </tr>
                                                                                                                                                                                                                                                                                                                                                            </table>
                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                          <div class='col-md-6'> <img src='/skin/frontend/bosterbio/default/images/Filgen.jpg' style='max-height:100px;max-width:300px;'> </div>
                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                          <div class='row'>
                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                          <div class='distributor company_block col-md-9'>
                                                                                                                                                                                                                                                                                                                                                            <div class='col-md-6'>
                                                                                                                                                                                                                                                                                                                                                              <h4>M&S Instruments Inc.</h4>
                                                                                                                                                                                                                                                                                                                                                                <table style='min-width: 80%'>
                                                                                                                                                                                                                                                                                                                                                                  <tr>
                                                                                                                                                                                                                                                                                                                                                                    <th>Contact Person: </th>
                                                                                                                                                                                                                                                                                                                                                                      <td>Takeshi Yokono </td>
                                                                                                                                                                                                                                                                                                                                                                      </tr>
                                                                                                                                                                                                                                                                                                                                                                      <tr>
                                                                                                                                                                                                                                                                                                                                                                        <th>Country: </th>
                                                                                                                                                                                                                                                                                                                                                                          <td>Japan</td>
                                                                                                                                                                                                                                                                                                                                                                          </tr>
                                                                                                                                                                                                                                                                                                                                                                          <tr>
                                                                                                                                                                                                                                                                                                                                                                            <th>Website: </th>
                                                                                                                                                                                                                                                                                                                                                                              <td>
                                                                                                                                                                                                                                                                                                                                                                                <a href='https://www.technosaurus.co.jp' target='_blank' rel='nofollow'> www.technosaurus.co.jp</a>
                                                                                                                                                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                                                                                                                                                              </tr>
                                                                                                                                                                                                                                                                                                                                                                              <tr>
                                                                                                                                                                                                                                                                                                                                                                                <th>Phone: </th>
                                                                                                                                                                                                                                                                                                                                                                                  <td>81-3-3235-0661</td>
                                                                                                                                                                                                                                                                                                                                                                                  </tr>
                                                                                                                                                                                                                                                                                                                                                                                  <tr>
                                                                                                                                                                                                                                                                                                                                                                                    <th>Email: </th>
                                                                                                                                                                                                                                                                                                                                                                                      <td>
                                                                                                                                                                                                                                                                                                                                                                                        <a href='mailto:tyokono@technosaurus.co.jp' target='_self' rel='nofollow'>tyokono@technosaurus.co.jp</a>
                                                                                                                                                                                                                                                                                                                                                                                        </td>
                                                                                                                                                                                                                                                                                                                                                                                      </tr>
                                                                                                                                                                                                                                                                                                                                                                                    </table>
                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                  <div class='col-md-6'> <img src='/skin/frontend/bosterbio/default/images/M&S.jpg' style='max-height:100px;max-width:300px;'> </div>
                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                  <div class='row'>
                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                  <h3 id='korea-block'>Korea</h3>
                                                                                                                                                                                                                                                                                                                                                                                    <div class='distributor company_block col-md-9'>
                                                                                                                                                                                                                                                                                                                                                                                      <div class='col-md-6'>
                                                                                                                                                                                                                                                                                                                                                                                        <h4>Essence Medical Inc.</h4>
                                                                                                                                                                                                                                                                                                                                                                                          <table style='min-width: 80%'>
                                                                                                                                                                                                                                                                                                                                                                                            <tr>
                                                                                                                                                                                                                                                                                                                                                                                              <th>Contact Person: </th>
                                                                                                                                                                                                                                                                                                                                                                                                <td>Kyenam Lee</td>
                                                                                                                                                                                                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                                                                                                                                                                                                  <!-- TRUNCATED: 88110 chars total — open docs/cms-pages-full-export.tsv row page_id=7 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 9. CMS page (frequently-asked-question)

- **Structural hash:** `fee1c1c3d9983b6c` (for cross-reference)
- **URL prefix:** `frequently-asked-question`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `frequently-asked-question` (page_id 8) — Popular Resources | Western Blot IHC ELISA resources
- **All identifiers in cluster:** `frequently-asked-question`
- **content_heading:** _empty_
- **Magento directives in sample:** `{{media url='troubleshooting_box_image.png'}}`

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<style type="text/css">
  /**** COMMON CSS FOR ALL PAGES (START) ****/
  .breadcrumbs a, .breadcrumbs a:visited {
  color: #ea8d28;
  text-decoration: underline;
  }
  body {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  font-size: 13px;
  }
  .fa-phone, .fa-user {
  padding-right: 8px;
  }
  .page-main a {
  color: #ea8d28;
  text-decoration: none;
  }
  body a:hover, ul.header.links span a:hover, ul.header.links a:hover {
  color: #3ca9d6 !important;
  text-decoration: underline !important;
  }
  body .btn-primary:not(:disabled):not(.disabled).active, body .btn-primary:not(:disabled):not(.disabled):active, body .show>.btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #d77a15 !important;
  border-color: #d77a15 !important;
  }
  a.btn-primary:active {
  background-color: #d77a15 !important;
  border-color: #d77a15 !important;
  }
  .products_services a:visited {
  color: #ea8d28;
  }
  a:visited, .alink:visited {
  color: #ea8d28;
  text-decoration: none;
  }
  .page-main p, .page-main ul li, .page-main ol li {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-style: normal;
  color: #000000;
  font-size: 14px;
  }
  .page-main h1 {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  font-style: normal;
  font-size: 35px !important;
  padding-bottom: 0px;
  color: #343a40;
  margin-bottom: 0 !important;
  margin-top: 36px !important;
  }
  .page-main h2 {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-size: 28px !important;
  padding-bottom: 15px;
  color: #000000 !important;
  }
  .page-main h3 {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-size: 20px !important;
  padding-bottom: 9px;
  color: #ea8d28;
  }
  .page-main h4 {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-size: 17px !important;
  padding-bottom: 9px;
  color: #3ca9d6;
  }
  .italic {
  font-style: normal !important;
  color: #848484 !important;
  font-size: 16px !important;
  }
  .patch {
  padding: 4em 2em;
  overflow: hidden;
  }
  .page-main .btn-primary {
  color: #FFFFFF;
  background-color: #ea8d28;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  padding: 0.6rem 1.8rem;
  font-size: 18px !important;
  line-height: 1.333333;
  border-radius: 0.7rem;
  }
  .page-main .btn-primary:hover {
  color: #FFFFFF !important;
  text-decoration: none !important;
  }
  .btn-dark {
  color: #FFFFFF !important;
  background-color: #2c3e50 !important;
  border-color: #2c3e50 !important;
  box-shadow: none;
  font-weight: bold !important;
  font-size: 14px !important;
  padding: 0.40625rem 1.25rem !important;
  border-radius: 4px !important;
  }
  .btn-dark:hover {
  color: #FFF !important;
  background-color: #23272b !important;
  border-color: #1d2124 !important;
  text-decoration: none !important;
  }
  .btn-green {
  color: #FFFFFF !important;
  background-color: #a2d738 !important;
  border-color: #a2d738 !important;
  box-shadow: none;
  font-weight: bold !important;
  font-size: 14px !important;
  padding: 0.40625rem 1.25rem !important;
  border-radius: 4px !important;
  }
  .btn-green:hover {
  color: #FFF !important;
  background-color: #23272b !important;
  border-color: #1d2124 !important;
  text-decoration: none !important;
  }
  .page-main ol, .page-main ul {
  margin: 0 auto 0 17px;
  padding: 0;
  }
  .page-main table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  padding: 0;
  width: 100%;
  }
  .page-main table tr th {
  background: #3ca9d6;
  padding: 6px 0 !important;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  }
  .page-main table tr td {
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  color: #000000;
  font-weight: normal;
  font-size: 14px;
  }
  body .btn-primary:hover {
  color: #fff !important;
  background-color: #d77a15;
  border-color: #cb7314;
  text-decoration: none !important;
  }
  .grey-background {
  background: #F2F2F2;
  }
  .footer-custom a:hover {
  color: #FFF !important;
  text-decoration: underline !important;
  }
  .footer-custom h3 {
  color: #fff;
  padding: 15px 0;
  }
  .bs-prototype-override {
  padding: 22px 0;
  }
  .bs-prototype-override img {
  width: 70% !important;
  }
  .trouguide {
  margin-top: 15px;
  }
  .border .panel-head {
  padding: 0px 10px;
  margin-left: 0px;
  background: #3ca9d6;
  }
  .border .panel-head h2 {
  color: #FFF !important;
  margin: 0 !important;
  padding: 9px 0 !important;
  text-align: left !important;
  }
  i.fa.fa-minus.updated-min {
  float: right;
  }
  .page-main table tr th {
  padding: 5px 11px 3px 10px !important;
  font-weight: normal !important;
  font-size: 14px !important;
  text-align: left !important;
  border-bottom: 1px solid #FFF;
  }
  .testimonial_text h2 {
  font-size:19px !important;
  padding-bottom: 0 !important;
  }
  .testimonial_l, .testimonial_r {
  clear: both;
  }
  .testimonial-content h4 {
  font-size: 16px !important;
  color: #000;
  padding-top: 6px;
  }
  .pricetitle_gray {
  background-color: #f2f2f2 !important;
  }
  .main_contents h2 {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 18px !important;
  padding-bottom: 8px;
  color: #3ca9d6 !important;
  font-weight: bold !important;
  padding-top: 20px;
  }
  .bs-prototype-override {
  padding: 22px 0;
  }
  .bs-prototype-override img {
  width: 70% !important;
  }
  ol.main_contents {
  margin-top: 20px;
  }
  ol#table_of_contents li {
  list-style: none;
  display: inline-block;
  color: #FFF !important;
  padding: 0px !important;
  margin-bottom: 0.2rem !important;
  }
  ol#table_of_contents li a {
  border-radius: 6px;
  background: #e1e1e1;
  color: #434343 !important;
  padding: 7px 8px !important;
  display: block;
  border: 1px solid #a9a9a9;
  }
  ol#table_of_contents li a:hover {
  background: #ea8d28;
  border: 1px solid #ea8d28;
  color: #FFF !important;
  text-decoration: none !important;
  }
  ol#table_of_contents {
  margin: 17px 0 0 0 !important;
  }
  li ul {
  margin-left: 35px !important;
  margin-top: 10px !important;
  }
  li ul li ul {
  margin-left: 35px !important;
  margin-top: 10px !important;
  }
  li ul li ul li {
  list-style: disc !important;
  margin-bottom: 0.6rem !important;
  }
  li ul li {
  list-style: circle !important;
  margin-bottom: 0.6rem !important;
  }
  .page-main ul > li, .page-main ol > li {
  margin-bottom: 1.5rem !important;
  }
  @media screen and (max-width:820px) {
  .page-main h1 {
  font-size: 30px !important;
  }
  }
  /**** COMMON CSS FOR ALL PAGES (END) ****/
  .faqs h2 {
  border-bottom: 1px solid #ea8d28;
  /* margin-bottom: 0.5em; */
  margin-top: 1.4em !important;
  font-size: 20px !important;
  font-weight: normal;
  }
  .faqs-summary-table td{
  padding:1em;
  }
  .faqs-summary-table tr{
  height: 5.7em;
  }
  .faqs .col-md-6 {
  padding: 0 8px;
  }
  .faqs .col-md-12 {
  padding: 0;
  }
  .keywords {
  color: #848484 !important;
  }
</style>
<div class="col-md-3 align-left mb-none">
  <div class="border">
    <div class="panel-head">
      <h2 class="panel-title">Troubleshooting Guides <a data-toggle="collapse" href="#troubleshooting_guide_left" class=""> <i class="fa fa-minus updated-min">
      </i>
    </a>
  </h2>
</div>
<div class="bs-prototype-override collapse show" id="troubleshooting_guide_left" style="height: auto;">
  <div> <img src="{{media url='troubleshooting_box_image.png'}}" alt="troubleshooting_box_image" />
  <p>Download troubleshooting<br>
    handbooks for IHC, Western<br>
    blot and ELISA for FREE.</p>
    <div class="links">
      <a class="btn btn-dark" href="https://SITE_ORIGIN_PLACEHOLDER/wb-ihc-elisa-troubleshooting-handbooks">Troubleshooting guide</a>
      </div>
    </div>
  </div>
</div>
</div>
<div class="col-md-9 align-left">
  <p>
    <ol id="table_of_contents">
      <li>
        <a href="#elisa_faqs">ELISA FAQs</a>
        </li>
        <li>
          <a href="#wb_faqs">Western Blotting FAQs</a>
          </li>
          <li>
            <a href="#ihc_faqs">IHC/ICC/IF FAQs</a>
            </li>
            <li>
              <a href="#chip_faqs">ChIp FAQs</a>
              </li>
            </ol>
          </p>
          <div class='faqs main'>
            <div class="col-md-12" id="elisa_faqs">
              <h1>ELISA FAQs</h1>
                <div class='individual_question'>
                  <h2 id="elisa">ELISA: Troubleshooting Low Signal</h2>
                    <p>A number of problems commonly arise during ELSIA that can result in low signal and poor color development. Use are some troubleshooting tips to help you improve your experiment and get better data.</p>
                      <p class="keywords">
                        <strong>Keywords: </strong>Low Signal, Faint Color, ELISA Troubleshooting</p>
                          <a href="/frequently-asked-questions/elisa-troubleshooting-low-signal" class="btn btn-green">Learn More About Low Signal</a> </div>
                            <div class='individual_question'>
                              <h2>ELISA: Troubleshooting Matrix Effect </h2>
                                <p>Matrix Effect occurs when the target antigen interacts with matrix components in plasma or serum samples. These matrix components can be endogenous biological components such as phospholipids, carbohydrates, and metabolites. Matrix components can reduce the binding of the antibody to the target protein, or non-specifically bind the antibody, generating weak or noisy results. Read some tips to reduce matrix effect.</p>
                                  <p class="keywords">
                                    <strong>Keywords: </strong>Matrix Effect, ELISA Troubleshooting</p>
                                      <a href="/frequently-asked-questions/elisa-troubleshooting-matrix-effect" class="btn btn-green">Learn More About Matrix Effect</a> </div>
                                      </div>
                                      <div style="clear:both;padding-top:5px;">
                                      </div>
                                      <div class="col-md-12">
                                        <div class='individual_question'>
                                          <h2>ELISA: How many samples can I run on a plate?</h2>
                                            <p>On each 96 well plate, we recommend running an 8-point standard curve with duplicate wells. With the remaining 80 wells, 40 samples can be tested in duplicate. Learn more about the number of samples tested per micotiter plate.</p>
                                              <p class="keywords">
                                                <strong>Keywords: </strong>Number of Samples, Microtiter Plate, Maximum Usage, Setting Up Plate</p>
                                                  <a href="/frequently-asked-questions/how-many-samples-can-i-run-on-a-plate" class="btn btn-green">Learn More About Number of Samples Per Plate</a> </div>
                                                  </div>
                                                  <div style="clear:both;padding-top:5px;">
                                                  </div>
                                                  <div class="col-md-12" id="wb_faqs">
                                                    <h1>Western Blotting FAQs</h1>
                                                      <div class='individual_question'>
                                                        <h2 id="western-blotting">Western Blot: Troubleshooting Weak Signal</h2>
                                                          <p>Weak signal is typically caused by problems in the blocking or washing steps, but can also be caused by a number of other issues. Read our tips to identify and troubleshoot your weak signal results. </p>
                                                            <p class="keywords">
                                                              <strong>Keywords: </strong>Weak Signal, Low Signal, Western Blot Troubleshooting</p>
                                                                <a href="/frequently-asked-questions/western-blot-troubleshooting-low-signal" class="btn btn-green">Learn More About Weak Signal</a> </div>
                                                                  <div class='individual_question'>
                                                                    <h2>Western Blot: Troubleshooting Bands Wrong Molecular Weight</h2>
                                                                      <p>Western blotting separates proteins based on size; large proteins migrate through a polyacrylamide gel matrix slower than small proteins do. However, other factors can influence the migration rate of proteins, resulting in band sizes different than predicted based on protein size alone.</p>
                                                                        <p class="keywords">
                                                                          <strong>Keywords: </strong>Band Size, Wrong Band Size, Western Blot Troubleshooting</p>
                                                                            <a href="/frequently-asked-questions/western-blot-troubleshooting-bands" class="btn btn-green">Learn More About Band Size</a> </div>
                                                                            </div>
                                                                            <div style="clear:both;padding-top:5px;">
                                                                            </div>
                                                                            <div class="col-md-12">
                                                                              <div class='individual_question'>
                                                                                <h2>Western Blot: Troubleshooting Background Background Blotchy, Flecked, Or Dirty</h2>
                                                                                  <p>Many Western blot problems arise due to issues with the background. Splotches, streaks, or background staining can ruin results. Use our troubleshooting tips to identify and resolve the cause of your background troubles.</p>
                                                                                    <p class="keywords">
                                                                                      <strong>Keywords: </strong>Flecked Background, Speckled Background, Blotched Background, Western Blot Troubleshooting</p>
                                                                                        <a href="/frequently-asked-questions/western-blot-troubleshooting-background-trouble" class="btn btn-green">Learn More About Background</a> </div>
                                                                                          <div class='individual_question'>
                                                                                            <h2>Western Blot: Troubleshooting High Background</h2>
                                                                                              <p>High background on a western blot occurs when the background signal of the membrane reduces the signal-to-noise ratio to unreadable levels. Learn our troubleshooting tips to identify and resolve the cause of your high background:</p>
                                                                                                <p class="keywords">
                                                                                                  <strong>Keywords: </strong>High Background, Saturated Background, Background Staining, Nonspecific Staining, Western Blot Troubleshooting</p>
                                                                                                    <a href="/frequently-asked-questions/western-blot-troubleshooting-saturated-background" class="btn btn-green">Learn More About High Background</a> </div>
                                                                                                    </div>
                                                                                                    <div style="clear:both;margin-top:15px;">
                                                                                                    </div>
                                                                                                    <div class="col-md-12">
                                                                                                      <div class='individual_question'>
                                                                                                        <h2>Western Blot: Troubleshooting Distorted Bands </h2>
                                                                                                          <p>Distorted bands can make it very hard to interpret your results. Common distortions include smile shaped bands with the edges trailing upward, diffuse bands that are broad or blurry, and streaked bands that trail off in several directions. Make sure your next blot has even, crisp bands by reading our tips.</p>
                                                                                                            <p class="keywords">
                                                                                                              <strong>Keywords: </strong>Smile Bands, Distorted Bands, Uneven Bands, Western Blot Troubleshooting
                                                                                                                <!-- TRUNCATED: 17616 chars total — open docs/cms-pages-full-export.tsv row page_id=8 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 10. CMS page (quality-control-panel)

- **Structural hash:** `1cb39786a46b7b41` (for cross-reference)
- **URL prefix:** `quality-control-panel`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `quality-control-panel` (page_id 9) — Quality Control | Antibody Company, Buy Antibodies, ELISA Kits
- **All identifiers in cluster:** `quality-control-panel`
- **content_heading:** _empty_
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<style type="text/css">
  .form-customer-login .g-recaptcha {
  padding-top: 20%;
  }
  .form.form-login .g-recaptcha .grecaptcha-badge{
  position: unset !important;
  }
  .form-customer-login .g-recaptcha {
  margin: 0px;
  }
  #social-form-create .g-recaptcha{
  padding-top: 5%;
  }
  #social-form-password-forget .g-recaptcha{
  padding-top: 5%;
  }
  .onestepcheckout-index-index .form-login .g-recaptcha .grecaptcha-badge {
  position: unset !important;
  }
  .checkout-index-index form[data-role=login] .g-recaptcha .grecaptcha-badge {
  position: unset !important;
  }
  #mpageverify-form .g-recaptcha {
  margin-left: 30%;
  }
  .g-recaptcha {
  margin-top: 15px;
  margin-bottom: 15px;
  }
</style>
<section class="mb-6 text-center hero-section" style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER)">
  <div class="dark-overlap">
    <h1 class="mb-2">Boster's Antibody Quality Control Panel</h1>
      <p class="font-large mb-4">- we conduct rigorous testing using the relevant samples listed below for all of our antibodies</p>
      </div>
    </section>
    <section class="mb-6 single-column content-section">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <p class="mb-4">Boster antibodies are validated for IHC, ICC, and WB applications using our panel of over 250 tissue/cell samples. The panel spans over normal and diseased tissue/cell lines from multiple organs of various species,
              including human cell lines and tissue samples, mouse, rat, rabbit, dog, fish, and chicken. Boster is constantly adding to this list to ensure comprehensive validation data for our products.</p>
            </div>
            <div class="col-md-4"> <img class="h-75 mx-auto d-block mb-5" src="https://SITE_ORIGIN_PLACEHOLDER/media/quality-img.jpg" alt="quality-img" data-done="Loaded"> </div>
            </div>
          </div>
        </section>
        <section class="mb-6 topic-heading-section">
          <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Human</h2>
          </section>
          <section class="mb-6 double-column content-section">
            <div class="container">
              <div class="row">
                <div class="col-md-8 p-0">
                  <table class="table tabel-striped">
                    <thead class="bg-orange">
                      <tr>
                        <th>Cell Lines</th>
                          <th>Tissues</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>MCF-7</td>
                              <td>Ovarian Cancer</td>
                              </tr>
                              <tr>
                                <td>MM321</td>
                                  <td>Mammary Cancer</td>
                                  </tr>
                                  <tr>
                                    <td>A549</td>
                                      <td>Rectal Cancer</td>
                                      </tr>
                                      <tr>
                                        <td>Smmc-7221/</td>
                                          <td>Colon Cancer</td>
                                          </tr>
                                          <tr>
                                            <td>Hela</td>
                                              <td>Gastric Cancer</td>
                                              </tr>
                                              <tr>
                                                <td>SGC7901</td>
                                                  <td>Prostatitis</td>
                                                  </tr>
                                                  <tr>
                                                    <td>SW620</td>
                                                      <td>Prostatic Cancer</td>
                                                      </tr>
                                                      <tr>
                                                        <td>COLO320</td>
                                                          <td>Sialadenitis</td>
                                                          </tr>
                                                          <tr>
                                                            <td>Jurkat</td>
                                                              <td>Cholangiocarcinoma</td>
                                                              </tr>
                                                              <tr>
                                                                <td>Raji</td>
                                                                  <td>Pheochromocytoma</td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>CEM</td>
                                                                      <td>Neurilemmoma</td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td>HL-60</td>
                                                                          <td>Skeletal muscle</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td>HUT102</td>
                                                                              <td>Testicle</td>
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </div>
                                                                        <div class="col-md-4 p-0">
                                                                          <div style="background-image: url('https://SITE_ORIGIN_PLACEHOLDER/media/human.jpg')" class="h-100 background-contain">
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </section>
                                                                  <section class="mb-6 topic-heading-section">
                                                                    <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Dog</h2>
                                                                    </section>
                                                                    <section class="mb-6 double-column content-section">
                                                                      <div class="container">
                                                                        <div class="row">
                                                                          <div class="col-md-8 p-0">
                                                                            <table class="table table-striped">
                                                                              <thead class="bg-orange">
                                                                                <tr>
                                                                                  <th colspan="2">
                                                                                    <span>Tissue Samples</span>
                                                                                    </th>
                                                                                  </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                  <tr>
                                                                                    <td>Brain</td>
                                                                                      <td>Lung</td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                        <td>Myocardium</td>
                                                                                          <td>Kidney</td>
                                                                                          </tr>
                                                                                          <tr>
                                                                                            <td>Liver</td>
                                                                                              <td>Intestine</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                <td>Spleen</td>
                                                                                                  <td>Ovary</td>
                                                                                                  </tr>
                                                                                                </tbody>
                                                                                              </table>
                                                                                            </div>
                                                                                            <div class="col-md-4 p-0">
                                                                                              <div style="background-image: url('https://SITE_ORIGIN_PLACEHOLDER/media/dog.jpg')" class="h-100 background-contain">
                                                                                              </div>
                                                                                            </div>
                                                                                          </div>
                                                                                        </div>
                                                                                      </section>
                                                                                      <section class="mb-6 topic-heading-section">
                                                                                        <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Rabbit</h2>
                                                                                        </section>
                                                                                        <section class="mb-6 double-column content-section">
                                                                                          <div class="container">
                                                                                            <div class="row">
                                                                                              <div class="col-md-8 p-0">
                                                                                                <table class="table table-striped">
                                                                                                  <thead class="bg-orange">
                                                                                                    <tr>
                                                                                                      <th colspan="2">
                                                                                                        <span>Tissue Samples</span>
                                                                                                        </th>
                                                                                                      </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                      <tr>
                                                                                                        <td>Brain</td>
                                                                                                          <td>Lung</td>
                                                                                                          </tr>
                                                                                                          <tr>
                                                                                                            <td>Myocardium</td>
                                                                                                              <td>Kidney</td>
                                                                                                              </tr>
                                                                                                              <tr>
                                                                                                                <td>Liver</td>
                                                                                                                  <td>Intestine</td>
                                                                                                                  </tr>
                                                                                                                  <tr>
                                                                                                                    <td>Spleen</td>
                                                                                                                      <td> </td>
                                                                                                                      </tr>
                                                                                                                    </tbody>
                                                                                                                  </table>
                                                                                                                </div>
                                                                                                                <div class="col-md-4 p-0">
                                                                                                                  <div style="background-image: url('https://SITE_ORIGIN_PLACEHOLDER/media/rabbit.jpg')" class="h-100 background-contain">
                                                                                                                  </div>
                                                                                                                </div>
                                                                                                              </div>
                                                                                                            </div>
                                                                                                          </section>
                                                                                                          <section class="mb-6 topic-heading-section">
                                                                                                            <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Chicken</h2>
                                                                                                            </section>
                                                                                                            <section class="mb-6 double-column content-section">
                                                                                                              <div class="container">
                                                                                                                <div class="row">
                                                                                                                  <div class="col-md-8 p-0">
                                                                                                                    <table class="table table-striped">
                                                                                                                      <thead class="bg-orange">
                                                                                                                        <tr>
                                                                                                                          <th colspan="2">
                                                                                                                            <span>Tissue Samples</span>
                                                                                                                            </th>
                                                                                                                          </tr>
                                                                                                                        </thead>
                                                                                                                        <tbody>
                                                                                                                          <tr>
                                                                                                                            <td>Brain</td>
                                                                                                                              <td>Lung</td>
                                                                                                                              </tr>
                                                                                                                              <tr>
                                                                                                                                <td>Myocardium</td>
                                                                                                                                  <td>Kidney</td>
                                                                                                                                  </tr>
                                                                                                                                  <tr>
                                                                                                                                    <td>Liver</td>
                                                                                                                                      <td>Intestine</td>
                                                                                                                                      </tr>
                                                                                                                                      <tr>
                                                                                                                                        <td>Spleen</td>
                                                                                                                                          <td> </td>
                                                                                                                                          </tr>
                                                                                                                                        </tbody>
                                                                                                                                      </table>
                                                                                                                                    </div>
                                                                                                                                    <div class="col-md-4 p-0">
                                                                                                                                      <div style="background-image: url('https://SITE_ORIGIN_PLACEHOLDER/media/chicken.jpg')" class="h-100 background-contain">
                                                                                                                                      </div>
                                                                                                                                    </div>
                                                                                                                                  </div>
                                                                                                                                </div>
                                                                                                                              </section>
                                                                                                                              <section class="mb-6 topic-heading-section">
                                                                                                                                <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Rat</h2>
                                                                                                                                </section>
                                                                                                                                <section class="mb-6 double-column content-section">
                                                                                                                                  <div class="container">
                                                                                                                                    <div class="row">
                                                                                                                                      <div class="col-md-8 p-0">
                                                                                                                                        <table class="table table-striped">
                                                                                                                                          <thead class="bg-orange">
                                                                                                                                            <tr>
                                                                                                                                              <th colspan="2">Tissue Samples</th>
                                                                                                                                              </tr>
                                                                                                                                            </thead>
                                                                                                                                            <tbody>
                                                                                                                                              <tr>
                                                                                                                                                <td>Cerebrum</td>
                                                                                                                                                  <td>Trachea</td>
                                                                                                                                                  </tr>
                                                                                                                                                  <tr>
                                                                                                                                                    <td>Cerebrum</td>
                                                                                                                                                      <td>Thyroid Gland</td>
                                                                                                                                                      </tr>
                                                                                                                                                      <tr>
                                                                                                                                                        <td>Brainstem</td>
                                                                                                                                                          <td>Lung</td>
                                                                                                                                                          </tr>
                                                                                                                                                          <tr>
                                                                                                                                                            <td>Retina</td>
                                                                                                                                                              <td>Lymph Node</td>
                                                                                                                                                              </tr>
                                                                                                                                                            </tbody>
                                                                                                                                                          </table>
                                                                                                                                                        </div>
                                                                                                                                                        <div class="col-md-4 p-0">
                                                                                                                                                          <div style="background-image: url('https://SITE_ORIGIN_PLACEHOLDER/media/rat.jpg')" class="h-100 background-contain">
                                                                                                                                                          </div>
                                                                                                                                                        </div>
                                                                                                                                                      </div>
                                                                                                                                                    </div>
                                                                                                                                                  </section>
                                                                                                                                                  <section class="mb-6 topic-heading-section">
                                                                                                                                                    <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Fish</h2>
                                                                                                                                                    </section>
                                                                                                                                                    <section class="mb-6 double-column content-section">
                                                                                                                                                      <div class="container">
                                                                                                                                                        <div class="row">
                                                                                                                                                          <div class="col-md-8 p-0">
                                                                                                                                                            <table class="table table-striped">
                                                                                                                                                              <thead class="bg-orange">
                                                                                                                                                                <tr>
                                                                                                                                                                  <th colspan="2">
                                                                                                                                                                    <span>Tissue Samples</span>
                                                                                                                                                                    </th>
                                                                                                                                                                  </tr>
                                                                                                                                                                </thead>
                                                                                                                                                                <tbody>
                                                                                                                                                                  <tr>
                                                                                                                                                                    <td>Heart</td>
                                                                                                                                                                      <td>Zebrafish</td>
                                                                                                                                                                      </tr>
                                                                                                                                                                      <tr>
                                                                                                                                                                        <td>Liver</td>
                                                                                                                                                                          <td> </td>
                                                                                                                                                                          </tr>
                                                                                                                                                                          <tr>
                                                                                                                                                                            <td>Spleen</td>
                                                                                                                                                                              <td> </td>
                                                                                                                                                                              </tr>
                                                                                                                                                                              <tr>
                                                                                                                                                                                <td>Intestine</td>
                                                                                                                                                                                  <td> </td>
                                                                                                                                                                                  </tr>
                                                                                                                                                                                </tbody>
                                                                                                                                                                              </table>
                                                                                                                                                                            </div>
                                                                                                                                                                            <div class="col-md-4 p-0">
                                                                                                                                                                              <div style="background-image: url('https://SITE_ORIGIN_PLACEHOLDER/media/fish.jpg')" class="h-100 background-contain">
                                                                                                                                                                              </div>
                                                                                                                                                                            </div>
                                                                                                                                                                          </div>
                                                                                                                                                                        </div>
                                                                                                                                                                      </section>
                                                                                                                                                                      <section class="mb-6 topic-heading-section">
                                                                                                                                                                        <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Mouse</h2>
                                                                                                                                                                        </section>
                                                                                                                                                                        <section class="mb-6 double-column content-section">
                                                                                                                                                                          <div class="container">
                                                                                                                                                                            <div class="row">
                                                                                                                                                                              <div class="col-md-8 p-0">
                                                                                                                                                                                <table class="table table-striped">
                                                                                                                                                                                  <thead class="bg-orange">
                                                                                                                                                                                    <tr>
                                                                                                                                                                                      <th colspan="2">
                                                                                                                                                                                        <span>Tissue Samples</span>
                                                                                                                                                                                        </th>
                                                                                                                                                                                      </tr>
                                                                                                                                                                                    </thead>
                                                                                                                                                                                    <tbody>
                                                                                                                                                                                      <tr>
                                                                                                                                                                                        <td>Myocardium</td>
                                                                                                                                                                                          <td>Small Intestine</td>
                                                                                                                                                                                          </tr>
                                                                                                                                                                                          <tr>
                                                                                                                                                                                            <td>Liver</td>
                                                                                                                                                                                              <td>Rectum</td>
                                                                                                                                                                                              </tr>
                                                                                                                                                                                              <tr>
                                                                                                                                                                                                <td>Skeletal Muscle</td>
                                                                                                                                                                                                  <td>Colon</td>
                                                                                                                                                                                                  </tr>
                                                                                                                                                                                                  <tr>
                                                                                                                                                                                                    <td>Duodenum</td>
                                                                                                                                                                                                      <td>Lymph Node</td>
                                                                                                                                                                                                      </tr>
                                                                                                                                                                                                    </tbody>
                                                                                                                                                                                                  </table>
                                                                                                                                                                                                </div>
                                                                                                                                                                                                <div class="col-md-4 p-0">
                                                                                                                                                                                                  <div style="background-image: url('https://SITE_ORIGIN_PLACEHOLDER/media/mouse.jpg')" class="h-100 background-contain">
                                                                                                                                                                                                  </div>
                                                                                                                                                                                                </div>
                                                                                                                                                                                              </div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                          </section>
                                                                                                                                                                                          <section class="cjinternallinks mb-6 multi-column content-section"> <div class="container p-3"> <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-6">Related Pages</h2> <div class="row multicolumns">
                                                                                                                                                                                            <div class="col-md-3"> <div class="bg-light p-4 border-rounded text-center h-100"> <h3 class="text-orange font-large">What are FMO controls? 3 recommendations...</h3> <p>Detection of rare or complex cell sub-populations through a multicolor panel requires very precise gating, the limits of which can be accurately set by utilizing the FMO controls. Troubleshooting guides Greetings Earthling, The Fluorescence Minus One...</p>  <a href="/blog/post/what-are-fmo-controls-3-recommendations" class="d-block btn-orange stretched-link">See More</a>
                                                                                                                                                                                            </div> </div>
                                                                                                                                                                                            <div class="col-md-3"> <div class="bg-light p-4 border-rounded text-center h-100"> <h3 class="text-orange font-large">Coronavirus: SARS-CoV-2 (COVID-19) Related Research Antibodies & Biomarkers</h3> <p>Bosterbio offers a portfolio of tools for your coronavirus (COVID-19) research, which includes SARS-CoV-2 PCR kits, RNA extraction kits, multiplex assay, antibodies, and several more</p>  <a href="/coronavirus-sars-cov-2-covid-19-antibodies-biomarkers" class="d-block btn-orange stretched-link">See More</a>
                                                                                                                                                                                            </div> </div>
                                                                                                                                                                                            <div class="col-md-3"> <div class="bg-light p-4 border-rounded text-center h-100"> <h3 class="text-orange font-large">About Us</h3> <p>All our validation images are published on our website, and you can contact us for a detailed write-up of our validation procedure. Boster Antibodies Thoroughly validated for WB, IHC and Flow Boster takes great measures to ensure antibody quality and...</p>  <a href="/about-us" class="d-block btn-orange stretched-link">See More</a>
                                                                                                                                                                                            </div> </div>
                                                                                                                                                                                            <div class="col-md-3"> <div class="bg-light p-4 border-rounded text-center h-100"> <h3 class="text-orange font-large">6 IHC Controls You Should Know</h3> <p>Troubleshooting guides 6 IHC Controls You Should Know In the lab, researchers invest time and effort to optimize the sample preparation and sample staining processes of IHC. Our antibodies are validated using WB, IHC, and flow cytometry against a pan...</p>  <a href="/newsletter-archive/20190123-6ihc-controls-you-should-know" class="d-block btn-orange stretched-link">See More</a>
                                                                                                                                                                                            </div> </div>
                                                                                                                                                                                            <div class="col-md-3"> <div class="bg-light p-4 border-rounded text-center h-100"> <h3 class="text-orange font-large">Helpful Tips FACS Multicolor Panel Design</h3> <p>Newsletter Your Monthly Signaling Pathway Posters *Note to educators: you are permitted to share BosterBio's resources and PDFs on your class websites and lab websites. It is also advisable to use FMO controls (see our FACS resources for details) to ...</p>  <a href="/newsletter-archive/20171027-6-helpful-tips-facs-multicolor-panel-design" class="d-block btn-orange stretched-link">See More</a>
                                                                                                                                                                                            </div> </div>
                                                                                                                                                                                            <div class="col-md-3"> <div class="bg-light p-4 border-rounded text-center h-100"> <h3 class="text-orange font-large">SmartReader 96 Microplate Absorbance Reader</h3> <p>SmartReader 96 Microplate Absorbance Reader</p>  <a href="/smartreader-96-microplate-absorbance-reader-bosi009-boster.html" class="d-block btn-orange stretched-link">See More</a>
                                                                                                                                                                                            </div> </div>
                                                                                                                                                                                            <div class="col-md-3"> <div class="bg-light p-4 border-rounded text-center h-100"> <h3 class="text-orange font-large">Pre-Made Multiplex Kits & Custom Printed Kits</h3> <p>Each kit comes with a spotted plate and all necessary buffers, reagents, and instructions for your specific multiplex assays. Custom Q-Plex Kits allow you to focus on the markers of interest to you, without the extra cost or distraction associated wi...</p>  <a href="/multiplex-elisa-solutions/multiplex-elisa-kits-premade-and-custom-printed" class="d-block btn-orange stretched-link">See More</a>
                                                                                                                                                                                            </div> </div>
                                                                                                                                                                                          </div>
                                                                                                                                                                                        </div>
                                                                                                                                                                                      </section>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 11. Company / support page

- **Structural hash:** `665ccb253f67f60a` (for cross-reference)
- **URL prefix:** `about-us`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `about-us` (page_id 10) — About Us | Boster Bio: Antibody and ELISA Experts
- **All identifiers in cluster:** `about-us`
- **content_heading:** _empty_
- **Magento directives in sample:** `{{customVar code=antibodies_count}}`, `{{customVar code=company_years_in_business}}`, `{{customVar code=elisa_kits_count}}`, `{{customVar code=publications_count}}`, `{{customVar code=rating_on_biocompare}}`

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<style>
  #about-us-credibility-section {
  background-image: url("/media/images/design-guide/blue-background.jpg");
  }
  .supporting-icon {
  height: 60px;
  width: 54px;
  }
  .image-grid {
  display: grid;
  grid-template-rows: 112.5px 112.5px;
  grid-template-columns: 326.25px 219.75px;
  gap: 10px;
  }
  .double-height {
  grid-row: span 2;
  }
  .years-later p,
  .beginings p {
  font-size: 14px;
  }
  .years-later .thumbnail img,
  .years-later .thumbnail {
  height: 100px;
  width: 160px;
  }
  .years-later .thumbnail {
  overflow: hidden;
  }
  .years-later .thumbnail:has(.active) {
  outline: 2.5px solid #144b8c;
  }
  .years-later .thumbnail img:hover {
  transform-origin: center center;
  transition: transform 500ms ease-in-out;
  transform: scale(1.2, 1.2);
  }
  .years-later .carousel-controls {
  position: relative;
  left: 92%;
  top: -50px;
  }
  .years-later .carousel-controls button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  }
  .years-later .carousel-controls #nextButton {
  margin-left: 15px;
  }
  .years-later #fullsize-image {
  transition: opacity 0.25s ease-in-out;
  margin-top: -30px;
  }
  .years-later #fullsize-image.fade-out {
  opacity: 0;
  }
  .years-later .carousel-controls #nextButton:hover {
  outline: 1.7px solid #144b8c;
  }
  .years-later .carousel-controls #prevButton:hover {
  outline: 1.7px solid #3ca9d6;
  }
  .years-later .carousel-controls #nextButton,
  .years-later .carousel-controls #prevButton {
  box-shadow: none;
  }
  .years-later .carousel-controls #nextButtonIcon {
  margin-left: 5px;
  }
  .years-later .carousel-controls #prevButtonIcon {
  margin-left: 7px;
  }
  .years-later .carousel-controls #nextButtonIcon #next-arrow,
  .years-later .carousel-controls #prevButtonIcon #prev-arrow,
  .years-later .carousel-controls #prevButtonIcon,
  .years-later .carousel-controls #nextButtonIcon #next-arrow-head {
  transition: transform 500ms ease-in-out;
  }
  .years-later .carousel-controls #nextButton:active,
  .years-later .carousel-controls #nextButton:hover,
  .years-later .carousel-controls #nextButton:focus {
  background-color: #3ca9d6;
  }
  .years-later .carousel-controls #nextButton:focus,
  .years-later .carousel-controls #nextButton:active,
  .years-later .carousel-controls #prevButton:active,
  .years-later .carousel-controls #prevButton:focus {
  border: none;
  outline: inherit;
  }
  .years-later > div {
  margin: 5rem;
  }
  .years-later .carousel-controls #prevButton:active {
  background-color: white;
  }
  @media (min-width: 768px) and (max-width: 992px) {
  .image-grid {
  grid-template-rows: 184.5px 90px 33.3px 90px;
  grid-template-columns: 261.99px;
  }
  .years-later p,
  .beginings p {
  font-size: 12px !important;
  }
  .years-later #fullsize-image {
  margin-top: -10px;
  }
  }
  @media (max-width: 768px) {
  .image-grid {
  grid-template-rows: 82.5px 82.5px;
  grid-template-columns: 239.25px 161.15px;
  justify-content: center;
  padding-top: 0 !important;
  }
  .years-later .thumbnail img,
  .years-later .thumbnail {
  height: 75px;
  width: 120px;
  overflow: hidden;
  }
  .years-later .thumbnail img:hover {
  transform-origin: center center;
  transition: transform 500ms ease-in-out;
  transform: scale(1.1, 1.1);
  }
  .years-later p,
  .beginings p {
  font-size: 10px !important;
  }
  .years-later .carousel-controls{
  top: -10px;
  }
  .years-later .carousel-controls button {
  width: 30px;
  height: 30px;
  }
  .years-later .thumbnail:has(.active),
  .years-later .carousel-controls #nextButton:hover {
  outline: 0.7px solid #144b8c;
  }
  .years-later .carousel-controls #prevButton:hover {
  outline: 0.7px solid #3ca9d6;
  }
  }
</style>
<section class="mb-6 text-center hero-section" style="
  background-image: url('https://SITE_ORIGIN_PLACEHOLDER');
  ">
  <div class="dark-overlap">
    <h1 class="mb-2">About Boster Bio</h1>
      <p class="font-large mb-4" style="max-width: 600px">
        Your experts in offering state-of-the-art ELISA kits, antibodies, custom
        reagents, and analytical services in immunology, sequencing, cancer
        research, and more.
      </p>
    </div>
  </section>
  <section class="mb-6 double-column content-section">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h3 class="font-large text-orange mb-2 text-capitalize">Our Values</h3>
            <p class="mb-4">
              You, the life scientist, are the hero destined for great discoveries
              and inventions. We serve to help you become the overachiever you were
              meant to be.
            </p>
            <p class="mb-4">
              With over 30 years in the industry, our foundations always go back to
              maintaining quality and having strong integrity to deliver consistent
              products and services. Providing reliable and high-quality products is
              our passion. This is our way of helping the life science community
              thrive, helping more researchers get the best tools to move forward.
            </p>
            <h3 class="font-large text-orange mb-2 text-capitalize">
              Boster Quality Guarantee
            </h3>
            <div>
              <div>
                With our pride in providing products you can trust, a
                satisfaction/money-back guarantee backs up each of our items and
                services! This is our commitment to you, our loyal clients, who deserve the best of our technology, skills, and expertise in
                biochemistry.
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bg-lightgrey p-4 border-rounded">
              <h3 class="font-large">Solutions, not just products</h3>
                <p>
                  Empowering life science researchers has always been our aspiration—now, it’s our reality.​​ With Boster Bio’s <b>​​Free Validation Service​​</b>, we test our antibodies in your research context—before you buy—so you invest only in what works. No risk, no wasted time, just reliable reports tailored to your needs. Science shouldn’t be a gamble. We’re proud to be moving the antibody industry forward.
                </p>
                <div>
                  <a href="https://SITE_ORIGIN_PLACEHOLDER/promotions/free-validation-for-picoband-antibodies" class="btn-orange">Claim My Free Validation Today</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="mb-5 topic-heading-section">
          <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">
            The Journey of Boster Bio
          </h2>
          <p class="text-grey text-center w-75 mx-auto mb-5 font-medium">
            From Humble Beginnings to Global Success
          </p>
        </section>
        <section class="mb-6 double-column content-section beginings">
          <div class="container">
            <div class="row">
              <div class="col-md-6 p-0">
                <div class="pr-5  p-3">
                  <h3 class="font-large font-weight-bold text-orange mb-2">
                    Humble start
                  </h3>
                  <p class="mb-3">
                    Founded in 1993 by histologist Steven Xia, Boster Bio is an
                    <a href="/antibody-company">antibody manufacturing company</a>
                      specializing in high-sensitivity, high-specificity ELISA kits and
                      WB/IHC compatible antibodies.
                    </p>
                    <p class="mb-3">
                      It all started as a family-owned business. From a poor farming
                      family, Steven Xia was the only one in the village to go to college
                      and the only one in the county with a PhD.<br>
                    </p>
                    <p class="mb-3">
                      In early 90s China, he saw an underserved medical and research
                      community and made a difference. It began in a small pickup
                      truck-sized room with no capital. Despite all odds, he developed
                      proprietary reagents for histology, becoming one of the few domestic
                      suppliers of histology reagents when China heavily relied on
                      imports.
                    </p>
                  </div>
                </div>
                <div class="col-md-5 p-0">
                  <img src="https://SITE_ORIGIN_PLACEHOLDER" alt="Lab Humble Beginnings">
                </div>
              </div>
            </div>
          </section>
          <section class="mb-6 years-later">
            <div class="h-80 pl-5 bg-lightgrey">
              <div class="containter">
                <div class="row">
                  <div class="col-lg-5 col-md-6 col-sm-12 pr-2">
                    <!-- 大图容器，添加 ID 以便 JS 操作 -->
                    <img id="mainImage" src="https://SITE_ORIGIN_PLACEHOLDER" alt="Laboratory Thumbnail 1" width="576px">
                  </div>
                  <div class="pl-4 py-4 col-lg-6 col-md-5 col-sm-12 mr-1">
                    <h3 class="font-large font-weight-bold text-orange my-3">
                      {{customVar code=company_years_in_business}} years later<br>
                    </h3>
                    <p class="mb-3">
                      Since then, the company has organically grown into one of the top 10
                      antibody companies globally.
                    </p>
                    <p class="mb-3">
                      We have spent the last 3 decades perfecting our techniques and
                      technology, and our products have been well-cited in {{customVar code=publications_count}}
                      publications. We thoroughly validated our antibodies for IHC, WB,
                      ELISA, and Flow Cytometry to bring you trustworthy products.
                    </p>
                    <p class="mb-3">
                      We strive to provide the best service and have earned the trust of
                      researchers worldwide. All products are covered by the Boster
                      Quality Guarantee, each product will work as stated in the datasheet
                      or your money back. We are actively developing and launching more
                      products each month.
                    </p>
                  </div>
                </div>
                <!-- 缩略图容器 -->
                <div id="thumbnailContainer" class="thumbnail-container mt-3 mb-2 row pl-4">
                  <div class="thumbnail m-2">
                    <img src="https://SITE_ORIGIN_PLACEHOLDER" alt="Laboratory Thumbnail 1" onclick="changeMainImage(this.src)">
                  </div>
                  <div class="thumbnail m-2">
                    <img src="https://SITE_ORIGIN_PLACEHOLDER" alt="Laboratory Thumbnail 3" onclick="changeMainImage(this.src)">
                  </div>
                  <div class="thumbnail m-2">
                    <img src="https://SITE_ORIGIN_PLACEHOLDER" alt="Laboratory Thumbnail 4" onclick="changeMainImage(this.src)">
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- 添加 JavaScript 代码 -->
          <script>
            function changeMainImage(newSrc) {
            document.getElementById("mainImage").src = newSrc;
            }
          </script>
          <section class="mb-6 workflow-section pt-6">
            <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">
              Boster bio timeline
            </h2>
            <p class="text-grey text-center w-75 mx-auto mb-5">
              A brief history of Boster over the years
            </p>
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="timeline-bubbles">
                    <ul>
                      <li>
                        <h3 class="font-large">First Product</h3>
                          <p class="font-medium text-grey">1993</p>
                            <p class="font-medium">
                              In 1993, Steven developed Boster’s first product, in a room no
                              larger than a small household garage.<br>
                              His friends made fun of him and gave him the nickname “he who
                              converts science in the lavatory”.
                            </p>
                          </li>
                          <li>
                            <h3 class="font-large">Antibodies</h3>
                              <p class="font-medium text-grey">Late 90s</p>
                                <p class="font-medium">
                                  In the early days Boster developed various products for IHC and
                                  EM.<br>
                                  In late 90s, Boster developed hundreds of primary antibodies,
                                  and became the biggest catalog antibody company in China at the
                                  time.
                                </p>
                              </li>
                              <li>
                                <h3 class="font-large">ELISA Kits</h3>
                                  <p class="font-medium text-grey">Early 2000S</p>
                                    <p class="font-medium">
                                      After years of research and development, Boster was able to
                                      create a proprietary ELISA platform, PicoKine™.<br>
                                      About a dozen in-house developed trade secretes empower Boster’s
                                      high-sensitivity ELISA kits to deliver repeatable results.
                                    </p>
                                  </li>
                                  <li>
                                    <h3 class="font-large">Going Global</h3>
                                      <p class="font-medium text-grey">2006</p>
                                        <p class="font-medium">
                                          In 2006, Boster started to form partnerships with distributors
                                          and OEM partners around the globe.<br>
                                          Today Boster products are used around the world by academics and
                                          industrial users alike, for WB, IHC, ELISA, and Flow.
                                        </p>
                                      </li>
                                      <li>
                                        <h3 class="font-large">USA Office</h3>
                                          <p class="font-medium text-grey">2012</p>
                                            <p class="font-medium">
                                              In 2012, Boster established office in Pleasanton California to
                                              better service its global customers.<br>
                                              Since then Boster’s brand awareness have been significantly
                                              improved globally. Many partnerships were established.
                                            </p>
                                          </li>
                                          <li>
                                            <h3 class="font-large">Fastest Growing Antibody Company</h3>
                                              <p
                                                <!-- TRUNCATED: 46565 chars total — open docs/cms-pages-full-export.tsv row page_id=10 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 12. CMS page (protocol-troubleshooting)

- **Structural hash:** `cde0834b713252d2` (for cross-reference)
- **URL prefix:** `protocol-troubleshooting`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `protocol-troubleshooting` (page_id 11) — Protocols and Troubleshooting | Boster Bio
- **All identifiers in cluster:** `protocol-troubleshooting`
- **content_heading:** `Protocols And Troubleshooting for WB, IHC, ELISA and ChIP`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-5 text-center hero-section" style="background-image: url('/media/images/design-guide/team1.jpg');">
  <div class="dark-overlap">
    <h1 class="font-xlarge font-weight-bold mb-2 mt-5">PROTOCOLS AND TROUBLESHOOTING</h1>
      <p class="font-large mb-4">Boster provides comprehensive technical support resources including optimized protocols, troubleshooting guides and web-based digital tools</p>
        <ul class="list-unstyled list-inline-block my-5">
          <li class="mr-3">
            <a class="text-white text-hover-orange" href="#elisa">ELISA</a>
            </li>
            <li class="mr-3">
              <a class="text-white text-hover-orange" href="#westernblot">Western Blot</a>
              </li>
              <li class="mr-3">
                <a class="text-white text-hover-orange" href="#ihcificc">IHC/IF/ICC</a>
                </li>
                <li class="mr-3">
                  <a class="text-white text-hover-orange" href="#flowcytometry">Flow Cytometry</a>
                  </li>
                  <li class="mr-3">
                    <a class="text-white text-hover-orange" href="#pcr">PCR</a>
                    </li>
                  </ul>
                </div>
              </section>
              <section class="mb-5 topic-heading-section" id="introduction">
                <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Resources By Applications</h2>
                  <p class="text-grey text-center w-75 m-auto">the directory of all applications technical resources.</p>
                  </section>
                  <section class="mb-5 double-column content-section" id="elisa">
                    <div class="container">
                      <div class="row">
                        <div class="col-md-4 p-0">
                          <div style="background-image: url(/media/images/ELISA_plates.jpg);" class="h-100 background-cover">
                          </div>
                        </div>
                        <div class="col-md-8 p-0">
                          <div class="bg-lightgrey py-4 px-3 px-lg-5">
                            <h2 class="font-large text-orange mb-2">Enzyme-Linked Immunosorbent Assay (ELISA)</h2>
                              <p class="mb-2">Boster has been manufacturing ELISA kits since the late 90s. Over 6000+ academic publications have been made with Boster ELISA kits in the past decade. We proudly share our ELISA knowledge base to our beloved scientists.
                              </p>
                              <div class="row">
                                <ul class="list-unstyled col-6 ">
                                  <li class="mb-2">
                                    <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/elisa-technical-resource-center"> ELISA Resource Center </a>
                                    </li>
                                    <li class="mb-2">
                                      <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/elisa-principle">ELISA Principle</a>
                                      </li>
                                      <li class="mb-2">
                                        <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/elisa-sample-preparation-guide">ELISA Sample Preparation</a>
                                        </li>
                                        <li class="mb-2">
                                          <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/elisa-protocol">ELISA Protocol</a>
                                          </li>
                                        </ul>
                                        <ul class="list-unstyled col-6 ">
                                          <li class="mb-2">
                                            <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/picokine-elisa-optimization">ELISA Optimization Tips</a>
                                            </li>
                                            <li class="mb-2">
                                              <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/picokine-elisa-troubleshooting">ELISA Troubleshooting Tips</a>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                <section class="mb-5 double-column content-section" id="westernblot">
                                  <div class="container">
                                    <div class="row">
                                      <div class="col-md-4 p-0">
                                        <div style="background-image: url(/media/images/western-blotting-resource-center-background.jpg);" class="h-100 background-cover">
                                        </div>
                                      </div>
                                      <div class="col-md-8 p-0">
                                        <div class="bg-lightgrey py-4 px-3 px-lg-5">
                                          <h2 class="font-large text-orange mb-2">Western Blotting, Immunoblotting (WB)</h2>
                                            <p class="mb-2">Western blotting (protein immunoblotting) is an analytical technique used to identify and locate particular proteins in a tissue homogenate or tissue extract, based on their ability to bind to particular antibodies.
                                              Boster validate all antibodies on WB and only release the antibodies with correct and specific binding.</p>
                                              <div class="row">
                                                <ul class="list-unstyled col-6">
                                                  <li class="mb-2">
                                                    <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/western-blotting-technical-resource-center">Western Blotting Resource Center</a>
                                                    </li>
                                                    <li class="mb-2">
                                                      <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/western-blot-principle">Western Blotting Principle</a>
                                                      </li>
                                                      <li class="mb-2">
                                                        <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/western-blot-sample-preparation-guide">Western Blotting Sample Preparation</a>
                                                        </li>
                                                        <li class="mb-2">
                                                          <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/western-blot-protocol">Western Blotting Protocol</a>
                                                          </li>
                                                        </ul>
                                                        <ul class="list-unstyled col-6">
                                                          <li class="mb-2">
                                                            <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/western-blot-optimization">Western Blotting Optimization Tips</a>
                                                            </li>
                                                            <li class="mb-2">
                                                              <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/western-blot-troubleshooting">Western Blotting Troubleshooting Tips</a>
                                                              </li>
                                                            </ul>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </section>
                                                <section class="mb-5 double-column content-section" id="ihcificc">
                                                  <div class="container">
                                                    <div class="row">
                                                      <div class="col-md-4 p-0">
                                                        <div style="background-image: url(/media/images/scientist-microscope2.jpg);" class="h-100 background-cover">
                                                        </div>
                                                      </div>
                                                      <div class="col-md-8 p-0">
                                                        <div class="bg-lightgrey py-4 px-3 px-lg-5">
                                                          <h2 class="font-large text-orange mb-2">Immunostaining: IHC, IF And ICC</h2>
                                                            <p class="mb-2">The most common histology methods used for research are Immunohistochemistry, Immunofluorescence and Immunocytochemistry.</p>
                                                              <div class="row">
                                                                <ul class="list-unstyled col-6">
                                                                  <li class="mb-2">
                                                                    <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/immunohistochemistry-ihc-technical-resource-center">IHC/ICC/IF Resource Center</a>
                                                                    </li>
                                                                    <li class="mb-2">
                                                                      <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/immunohistochemistry-ihc-principle">IHC/ICC/IF Principle</a>
                                                                      </li>
                                                                      <li class="mb-2">
                                                                        <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/ihc-and-icc-if-sample-preparation">IHC/ICC/IF Sample Preparation</a>
                                                                        </li>
                                                                        <li class="mb-2">
                                                                          <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/ihc-protocol">IHC/ICC/IF Protocol</a>
                                                                          </li>
                                                                        </ul>
                                                                        <ul class="list-unstyled col-6">
                                                                          <li class="mb-2">
                                                                            <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/ihc-optimization">IHC/ICC/IF Optimization Tips</a>
                                                                            </li>
                                                                            <li class="mb-2">
                                                                              <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/ihc-troubleshooting">IHC/ICC/IF Troubleshooting Tips</a>
                                                                              </li>
                                                                            </ul>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </section>
                                                                <section class="mb-5 double-column content-section" id="flowcytometry">
                                                                  <div class="container">
                                                                    <div class="row">
                                                                      <div class="col-md-4 p-0">
                                                                        <div style="background-image: url(/media/images/Boster_Hero2.jpg);" class="h-100 background-cover">
                                                                        </div>
                                                                      </div>
                                                                      <div class="col-md-8 p-0">
                                                                        <div class="bg-lightgrey py-4 px-3 px-lg-5">
                                                                          <h2 class="font-large text-orange mb-2">Flow Cytometry</h2>
                                                                            <p class="mb-2">Flow cytometry is a powerful tool because it allows simultaneous multiparametric analysis of the physical and chemical characteristics of up to thousands of particles per second. This makes it a rapid and quantitative
                                                                              method for analysis and purification of cells in suspension. Using flow, we can determine the phenotype and function and even sort live cells.</p>
                                                                              <div class="row">
                                                                                <ul class="list-unstyled col-6 ">
                                                                                  <li class="mb-2">
                                                                                    <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/flow-technical-resource-center">FACs Resource Center</a>
                                                                                    </li>
                                                                                    <li class="mb-2">
                                                                                      <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/flow-cytometry-principle">Flow Cytometry Principle</a>
                                                                                      </li>
                                                                                      <li class="mb-2">
                                                                                        <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/flow-cytometry-sample-preparation">Flow Cytometry Sample Preparation</a>
                                                                                        </li>
                                                                                      </ul>
                                                                                      <ul class="list-unstyled col-6 ">
                                                                                        <li class="mb-2">
                                                                                          <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/flow-cytometry-protocol">Flow Cytometry Protocol</a>
                                                                                          </li>
                                                                                          <li class="mb-2">
                                                                                            <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/flow-cytometry-optimization">FACs Optimization Tips</a>
                                                                                            </li>
                                                                                            <li class="mb-2">
                                                                                              <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/flow-cytometry-troubleshooting">Flow Cytometry troubleshooting Tips</a>
                                                                                              </li>
                                                                                            </ul>
                                                                                          </div>
                                                                                        </div>
                                                                                      </div>
                                                                                    </div>
                                                                                  </div>
                                                                                </section>
                                                                                <section class="mb-5 double-column content-section" id="pcr">
                                                                                  <div class="container">
                                                                                    <div class="row">
                                                                                      <div class="col-md-4 p-0">
                                                                                        <div style="background-image: url(/media/images/MB_replication_1.png);" class="h-100 background-contain">
                                                                                        </div>
                                                                                      </div>
                                                                                      <div class="col-md-8 p-0">
                                                                                        <div class="bg-lightgrey py-4 px-3 px-lg-5">
                                                                                          <h2 class="font-large text-orange mb-2">PCR</h2>
                                                                                            <p class="mb-2">Refresh your basic understanding of concepts in the complicated world of molecular biology and polymerase chain reaction (PCR). From the structure of DNA and RNA molecules to cellular transcription, this review guide covers it all.</p>
                                                                                              <div class="row">
                                                                                                <ul class="list-unstyled col-6">
                                                                                                  <li class="mb-2">
                                                                                                    <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pcr-technical-resource-center">PCR Resource Center</a>
                                                                                                    </li>
                                                                                                    <li class="mb-2">
                                                                                                      <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/pcr-principle">PCR Principle</a>
                                                                                                      </li>
                                                                                                      <li class="mb-2">
                                                                                                        <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/pcr-sample-preparation">PCR Sample Preparation</a>
                                                                                                        </li>
                                                                                                      </ul>
                                                                                                      <ul class="list-unstyled col-6">
                                                                                                        <li class="mb-2">
                                                                                                          <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/pcr-protocol">PCR Protocol</a>
                                                                                                          </li>
                                                                                                          <li class="mb-2">
                                                                                                            <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/pcr-troubleshooting">PCR Troubleshooting Tips</a>
                                                                                                            </li>
                                                                                                          </ul>
                                                                                                        </div>
                                                                                                      </div>
                                                                                                    </div>
                                                                                                  </div>
                                                                                                </div>
                                                                                              </section>
                                                                                              <section class="feautred-page-with-bg" id="ebooks-feautred-section">
                                                                                                <div class="hero-section-content-dark-overlap text-white">
                                                                                                  <div class="container-fluid dark-overlap">
                                                                                                    <div class="row">
                                                                                                      <div class="col-md-6 p-5">
                                                                                                        <h2 class="border-bottom font-large">Boster's "How To Become An Expert" eBook Series</h2>
                                                                                                          <p>Boster presents the "How To Become An Expert" series featuring eBooks that comprehensively cover the basic knowledge one needs to get started on the related experiments. Download for free and share with your lab mates and
                                                                                                            students. If you do not see the eBook you are looking for, suggest it to support@bosterbio.com</p>
                                                                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/wb-ihc-elisa-troubleshooting-handbooks" class="btn-orange mt-5">Download PDF</a>
                                                                                                            </div>
                                                                                                            <div class="col-md-5 pt-5">
                                                                                                              <img src="/media/troubleshooting_box_image.png" alt="ebooks covers" title="Title" loading="lazy">
                                                                                                            </div>
                                                                                                          </div>
                                                                                                        </div>
                                                                                                      </div>
                                                                                                    </section>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 13. Protocol / troubleshooting guide

- **Structural hash:** `77c96aac59e5b89a` (for cross-reference)
- **URL prefix:** `protocol-and-troubleshooting`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `protocol-and-troubleshooting/elisa-protocols/picokine` (page_id 12) — Sandwich ELISA Kit Protocol Picokine | Boster Bio
- **All identifiers in cluster:** `protocol-and-troubleshooting/elisa-protocols/picokine`
- **content_heading:** `Picokine&trade; ELISA Protocol/Sandwich ELISA Protocol`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 text-center hero-section" style="background-image: url('https://SITE_ORIGIN_PLACEHOLDER/media/images/ELISA_plates.jpg')">
  <div class="dark-overlap">
    <h1 class="font-largest font-weight-bold mb-4">PicoKine™ ELISA Kits Protocol</h1>
      <p class="font-large mb-4">ELISA procedure can accurately assess soluble proteins in their native state, so they are ideal for samples such as urine or saliva. Check out the streptavidin coated plate ELISA protocol to learn how to get the
        best results from your sample type.</p>
      </div>
    </section>
    <section class="mb-6 workflow-section" id="introduction">
      <div class="container">
        <div class="row">
          <div class="col-12 workflow">
            <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Reagent Preparation</h2>
              <p class="font-weight-bold">Bring all reagents to 37°C prior to use. The assay can also be done at room temperature. However, we recommend doing it at 37°C for best consistency with our QC results.</p>
                <div class="d-flex flex-column flex-lg-row justify-content-start bg-lightgrey">
                  <div class="text-left p-4">
                    <h2 class="font-large mb-3 text-orange">Standard Solutions</h2>
                      <p>It is recommended that the standards be prepared no more than 2 hours prior to performing the experiment. Use one 10ng of lyophilized standard for each experiment. Gently spin the vial prior to use. Reconstitute the standard to a stock concentration of 10ng/ml using 1ml of sample diluent. Allow the standard to sit for a minimum of 10 minutes with gentle agitation prior to making dilutions.</p>
                        <ol class="list-style-numbers">
                          <li>Number tubes 1-8. Final concentrations should be: Tube # 1 –5000pg/ml, #2 –2500pg/ml, #3 – 1250pg/ml, #4 – 625pg/ml, #5 – 312.5pg/ml, #6 –156.25pg/ml, #7 – 78.125pg/ml, #8 – Sample Diluent serves as the zero standard (0pg/ml).</li>
                            <li>To generate standard #1–5000pg/ml, add 500µl of the reconstituted standard stock solution of 10ng/ml and 500µl of sample diluent to tube #1 for a final volume of 1000µl. Mix thoroughly.</li>
                              <li>Add 300 µl of sample diluent to tubes # 2-7.</li>
                                <li>To generate standard #2–2500pg/ml, add 300 µl of standard #1 from tube #1 to tube #2 for a final volume of 600 µl. Mix thoroughly.</li>
                                  <li>To generate standard #3–1250pg/ml, add 300 µl of standard #2 from tube #2 to tube #3 for a final volume of 600 µl. Mix thoroughly.</li>
                                    <li>Continue the serial dilution for tube #4-7.</li>
                                    </ol>
                                  </div>
                                </div>
                                <div class="d-flex flex-column flex-lg-row justify-content-start">
                                  <div class="text-left p-4">
                                    <h2 class="font-large mb-3 text-orange">Biotinylated Antibody</h2>
                                      <p>Calculate the total volume needed for the assay by multiplying 0.1 mL/well and the number of wells required. Add 2-3 extra wells to the calculated number of wells to account for possible pipetting errors.</p>
                                        <p>Generate the required volume of diluted antibody by performing a 1:100 dilution (For each 1 µL concentrated antibody, add 99 µL antibody dilution buffer), mixing thoroughly, and using within 2 hours of generation.</p>
                                        </div>
                                      </div>
                                      <div class="d-flex flex-column flex-lg-row justify-content-start bg-lightgrey">
                                        <div class="text-left p-4">
                                          <h2 class="font-large mb-3 text-orange">Avidin-Biotin-Peroxidase Complex (ABC)</h2>
                                            <p>Calculate the total volume needed for the assay by multiplying 0.1 mL/well and the number of wells required. Add 2-3 extra wells to the calculated number of wells to account for possible pipetting errors.</p>
                                              <p>Generate the required volume of diluted ABC solution by performing a 1:100 dilution (For each 1 µL concentrated ABC solution, add 99 µL ABC dilution buffer), mixing thoroughly, and using within 2 hours of generation.</p>
                                              </div>
                                            </div>
                                            <div class="d-flex flex-column flex-lg-row justify-content-start">
                                              <div class="text-left p-4">
                                                <h2 class="font-large mb-3 text-orange">Sample Preparation</h2>
                                                  <p>The user needs to estimate the concentration of the target protein in the sample and use an appropriate dilution factor so that the diluted target protein concentration falls in the middle range of O.D. values of the standard curve. Dilute the sample using the provided diluent buffer. Pilot tests using a dilution series of each sample type is necessary. The sample must be mixed thoroughly with Sample Diluent.</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </section>
                                        <section class="mb-6 workflow-section">
                                          <div class="container">
                                            <div class="row">
                                              <div class="col-12 workflow">
                                                <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Sandwich ELISA Protocol</h2>
                                                  <p>All of the ELISA kits from Boster use the sandwich format and biotin-streptavidin chemistry. Our ELISA assays protocol requires the dilutions of standard solutions, biotinylated antibody (detection antibody), and avidin-biotin-peroxidase complex.</p>
                                                    <div class="d-flex flex-column flex-lg-row justify-content-start bg-lightgrey">
                                                      <div class="text-left p-4">
                                                        <h2 class="font-large mb-3 text-orange">Reagent Preparation</h2>
                                                          <p>Prepare for the diluted standard solutions, biotinylated antibody and ABC solutions as shown in the above Reagent Preparation section.</p>
                                                            <p>Remove excess microplate strips from the plate frame. Seal and store them in the original packaging.</p>
                                                            </div>
                                                          </div>
                                                          <div class="d-flex flex-column flex-lg-row justify-content-start">
                                                            <div class="text-left p-4">
                                                              <h2 class="font-large mb-3 text-orange">Sample (Standard) Incubation</h2>
                                                                <p>Add 100 µl of the standard, samples, or control per well. Add 100 µl of the sample diluent buffer into the zero well. At least two replicates of each standard, sample, or control is recommended.</p>
                                                                  <p>Cover with the plate sealer provided and incubate for 120 minutes at RT (or 90 min. at 37 °C).</p>
                                                                    <p>Remove the cover and discard the liquid in the wells into an appropriate waste receptacle. Invert the plate on the benchtop onto a paper towel and tap the plate to gently blot any remaining liquid. It is recommended that the wells are not allowed to completely dry at any time.</p>
                                                                    </div>
                                                                  </div>
                                                                  <div class="d-flex flex-column flex-lg-row justify-content-start bg-lightgrey">
                                                                    <div class="text-left p-4">
                                                                      <h2 class="font-large mb-3 text-orange">Biotinylated Antibody Incubation</h2>
                                                                        <p>Add 100 µl of the prepared 1x Biotinylated Antibody to each well.</p>
                                                                          <p>Cover with plate sealer and incubate for 90 minutes at RT (or 60 minutes at 37°C).</p>
                                                                            <p>Wash the plate 3 times with the 1x wash buffer.</p>
                                                                              <ol class="list-style-alpha-lower">
                                                                                <li>Discard the liquid in the wells into an appropriate waste receptacle. Then, invert the plate on the benchtop onto a paper towel and tap the plate to gently blot any remaining liquid. It is recommended that the wells are not allowed to completely dry at any time.</li>
                                                                                  <li>Add 300 µl of the 1x wash buffer to each assay well (For cleaner background, incubate for 60 seconds between each wash).</li>
                                                                                    <li>Repeat steps a-b two additional times.</li>
                                                                                    </ol>
                                                                                  </div>
                                                                                </div>
                                                                                <div class="d-flex flex-column flex-lg-row justify-content-start">
                                                                                  <div class="text-left p-4">
                                                                                    <h2 class="font-large mb-3 text-orange">ABC Incubation</h2>
                                                                                      <p>Add 100 µl of the prepared 1x Avidin-Biotin-Peroxidase Complex into each well. Cover with the plate sealer provided and incubate for 40 minutes at RT (or 30 minutes at 37°C).</p>
                                                                                        <p>Wash the plate 5 times with the 1x wash buffer.</p>
                                                                                          <ol class="list-style-alpha-lower">
                                                                                            <li>Discard the liquid in the wells into an appropriate waste receptacle. Then, invert the plate on the benchtop onto a paper towel and tap the plate to gently blot any remaining liquid. It is recommended that the wells are not allowed to completely dry at any time.</li>
                                                                                              <li>Add 300 µl of the 1x wash buffer to each assay well (For cleaner background, incubate for 60 seconds between each wash).</li>
                                                                                                <li>Repeat steps a-b four additional times.</li>
                                                                                                </ol>
                                                                                              </div>
                                                                                            </div>
                                                                                            <div class="d-flex flex-column flex-lg-row justify-content-start bg-lightgrey">
                                                                                              <div class="text-left p-4">
                                                                                                <h2 class="font-large mb-3 text-orange">Signal Detection</h2>
                                                                                                  <p>Add 90 µl of Color Developing Reagent to each well. Cover with the plate sealer provided and incubate in the dark for 30 minutes at RT (or 15-25 minutes at 37°C). The optimal incubation time must be empirically determined. A guideline to look for is blue shading for the top four standard wells while the remaining standards remain clear.</p>
                                                                                                    <p>Add 100 µl of Stop Solution to each well. The color should immediately change to yellow.</p>
                                                                                                      <p>Within 30 minutes of stopping the reaction, the O.D. absorbance should be read with a microplate reader at 450nm.</p>
                                                                                                      </div>
                                                                                                    </div>
                                                                                                    <div class="d-flex flex-column flex-lg-row justify-content-start">
                                                                                                      <div class="text-left p-4">
                                                                                                        <h2 class="font-large mb-3 text-orange">Data Analysis</h2>
                                                                                                          <p>Average the duplicate readings for each standard, sample, and control. Subtract the average zero standard O.D. reading.</p>
                                                                                                            <p>It is recommended that a standard curve be created using computer software to generate a four parameter logistic (4-PL) curve-fit. A free program capable of generating a four parameter logistic (4-PL) curve-fit can be found online at: www.myassays.com/four-parameter-logisticcurve.assay.</p>
                                                                                                              <p>Alternatively, plot the mean absorbance for each standard against the concentration. The measured concentration in the sample can be interpolated by using linear regression of each average relative OD against the standard curve generated using curve fitting software. This will generate an adequate but less precise fit of the data.</p>
                                                                                                                <p>For diluted samples, the concentration reading from the standard curve must be multiplied by the dilution factor.</p>
                                                                                                                </div>
                                                                                                              </div>
                                                                                                            </div>
                                                                                                          </div>
                                                                                                        </div>
                                                                                                      </section>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 14. Protocol / troubleshooting guide

- **Structural hash:** `68ab4dec3270bd51` (for cross-reference)
- **URL prefix:** `protocol-and-troubleshooting`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `protocol-and-troubleshooting/picokine-elisa-troubleshooting` (page_id 13) — Picokine ELISA Kit Troubleshooting | ELISA Test Kits, ELISA Assay Kits
- **All identifiers in cluster:** `protocol-and-troubleshooting/picokine-elisa-troubleshooting`
- **content_heading:** `ELISA Troubleshooting Guide `
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<style>
  .mainbox {
  position: relative;
  }
  .buttonbottom {
  position: absolute;
  bottom: 15px;
  right: 15px;
  left: 15px;
  }
</style>
<section class="mb-6 text-center hero-section" style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER)">
  <div class="dark-overlap">
    <h2 class="font-large font-weight-bold mb-4">ELISA Technical Resources</h2>
      <h1 class="mb-2">Picokine ELISA Troubleshooting</h1>
        <p class="font-large mb-4">The following guide serves as a checklist for the possible causes and solutions with respect to some of the most commonly encountered problems from the <a href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/elisa-testing-service" style="color:#EA8D28">ELISA assays</a>.</p>
        </div>
      </section>
      <section class="mb-6 double-column content-section">
        <div class="container">
          <div class="row">
            <div class="col-md-8 p-3">
              <h2 class="font-large text-orange mb-2 text-capitalize">How to Troubleshoot ELISA</h2>
                <p class="mb-4">The following guide serves as a checklist for the possible causes and solutions with respect to some of the most commonly encountered problems from the ELISA assays.</p>
                  <p class="mb-4">If you do not see the issues you are having featured in this page, please contact us at support@bosterbio.com and we will help you resolve your specific trouble.</p>
                  </div>
                  <div class="col-md-4 p-3">
                    <div class="bg-lightgrey p-4 border-rounded">
                      <h3 class="font-large text-darkgrey mb-3">Troubleshooting Guides</h3>
                        <img class="mb-3" src="https://SITE_ORIGIN_PLACEHOLDER/media/qsolutions/categoryicon/troubleshooting_box_image.png" alt="Troubleshooting Guides">
                        <p class="mb-5">Download troubleshooting handbooks for IHC, Western blot, and ELISA for FREE.</p>
                          <a class="btn-orange" href="https://SITE_ORIGIN_PLACEHOLDER/wb-ihc-elisa-troubleshooting-handbooks">Troubleshooting Guides</a> </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section class="mb-6 p-3 bg-orange cta-section">
                      <div class="container">
                        <div class="row">
                          <div class="col-lg-8 col-12">
                            <h3 class="font-large">Save Time &amp; Money Now!</h3>
                              <p>Did you know that Boster, the leading ELISA manufacturers are providing research-grade CRO services? Outsource your ELISA experiments today and save your time and money. </p>
                              </div>
                              <div class="col-lg-4 col-12 vertical-center">
                                <a href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/elisa-testing-service" class="btn-outline-white btn-full-width">Learn more about ELISA CRO services!</a>
                                </div>
                              </div>
                            </div>
                          </section>
                          <section class="mb-6 single-column content-section">
                            <div class="container">
                              <div class="row">
                                <div class="col-12">
                                  <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3" id="weak_or_no_signal">Weak or No Signal</h2>
                                    <p class="mb-4">Weak or no color development in an ELISA assay can indicate that the target protein is present in minute quantities in the sample, if at all. It can also mean that there is something wrong with the assay or the reagents that prevent efficient detection. If your control reactions indicate that an error is causing your poor results, use this <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/elisa-principle">troubleshooting ELISA guide</a> to diagnose and resolve your ELISA weak signal.</p>
                                      <p class="mb-4">There are three main causes of weak signals in ELISA</p>
                                        <ul class="list-style-bullets">
                                          <li>Antibody/epitope reaction problems</li>
                                            <li>Insufficient reporter enzyme activity</li>
                                              <li>Plate related errors</li>
                                              </ul>
                                              <table class="table table-striped mb-6">
                                                <thead class="bg-orange">
                                                  <tr>
                                                    <th scope="col">S.No.</th>
                                                      <th scope="col">Possible Cause</th>
                                                        <th scope="col">Solution</th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        <tr>
                                                          <td data-label="S.No.">1</td>
                                                            <td>Blocking protein in coating solution</td>
                                                              <td>
                                                                <ul class="list-style-bullets">
                                                                  <li>Eliminate blocking protein from coating solution</li>
                                                                  </ul>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td data-label="S.No.">2</td>
                                                                  <td>Capture antibody (or antigen) does not bind to plate</td>
                                                                    <td>
                                                                      <ul class="list-style-bullets">
                                                                        <li>Use ELISA plate, not tissue culture plate</li>
                                                                          <li>Try longer coating time</li>
                                                                            <li>Increase concentration of coating components</li>
                                                                              <li>Use Boster pre-coated <a href="https://SITE_ORIGIN_PLACEHOLDER/elisa-kits">ELISA kits</a>
                                                                              </li>
                                                                            </ul>
                                                                          </td>
                                                                        </tr>
                                                                        <tr>
                                                                          <td data-label="S.No.">3</td>
                                                                            <td>Problem with the standard</td>
                                                                              <td>
                                                                                <ul class="list-style-bullets">
                                                                                  <li>Use new sample</li>
                                                                                    <li>Check that the standard is appropriately handled</li>
                                                                                    </ul>
                                                                                  </td>
                                                                                </tr>
                                                                                <tr>
                                                                                  <td data-label="S.No.">4</td>
                                                                                    <td>Incubation time too short</td>
                                                                                      <td>
                                                                                        <ul class="list-style-bullets">
                                                                                          <li>Follow the manufacturer guideline (If the problem persists, try incubating samples at 4°C overnight)</li>
                                                                                          </ul>
                                                                                        </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                        <td data-label="S.No.">5</td>
                                                                                          <td>Incubation temperature too low</td>
                                                                                            <td>
                                                                                              <ul class="list-style-bullets">
                                                                                                <li>Ensure incubations are done at correct temperature</li>
                                                                                                  <li>Before proceeding, all reagents, including plate, should be at room temperature or as recommended by the manufacturer</li>
                                                                                                  </ul>
                                                                                                </td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                <td data-label="S.No.">6</td>
                                                                                                  <td>Incompatible sample type</td>
                                                                                                    <td>
                                                                                                      <ul class="list-style-bullets">
                                                                                                        <li>Use sample that the assay is known to detect a positive control (Include such control in your experiment)</li>
                                                                                                        </ul>
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                      <td data-label="S.No.">7</td>
                                                                                                        <td>Incompatible assay buffer</td>
                                                                                                          <td>
                                                                                                            <ul class="list-style-bullets">
                                                                                                              <li>Ensure assay buffer is compatible with the target of interest</li>
                                                                                                              </ul>
                                                                                                            </td>
                                                                                                          </tr>
                                                                                                          <tr>
                                                                                                            <td data-label="S.No.">8</td>
                                                                                                              <td>Target present below detection limit</td>
                                                                                                                <td>
                                                                                                                  <ul class="list-style-bullets">
                                                                                                                    <li>Decrease dilution factor or concentrate samples</li>
                                                                                                                    </ul>
                                                                                                                  </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                  <td data-label="S.No.">10</td>
                                                                                                                    <td>Incorrect/Insufficient/No substrate</td>
                                                                                                                      <td>
                                                                                                                        <ul class="list-style-bullets">
                                                                                                                          <li>Check the substrate identity</li>
                                                                                                                            <li>Increase concentration or amount of substrate</li>
                                                                                                                              <li>Follow manufacturer guidelines</li>
                                                                                                                              </ul>
                                                                                                                            </td>
                                                                                                                          </tr>
                                                                                                                          <tr>
                                                                                                                            <td data-label="S.No.">11</td>
                                                                                                                              <td>Incorrect/Insufficient/No antibody</td>
                                                                                                                                <td>
                                                                                                                                  <ul class="list-style-bullets">
                                                                                                                                    <li>Check the antibody identity</li>
                                                                                                                                      <li>Repeat the assay with higher antibody concentrations to find the optimal one for your experiment</li>
                                                                                                                                      </ul>
                                                                                                                                    </td>
                                                                                                                                  </tr>
                                                                                                                                  <tr>
                                                                                                                                    <td data-label="S.No.">12</td>
                                                                                                                                      <td>Loss of binding activity because antibody was stored at 4°C for several weeks or subjected to repeated freeze-thaw cycles</td>
                                                                                                                                        <td>
                                                                                                                                          <ul class="list-style-bullets">
                                                                                                                                            <li>Use fresh aliquot of antibody that has been stored at -20°C or below</li>
                                                                                                                                              <li>Avoid repeated freeze-thaw cycles</li>
                                                                                                                                              </ul>
                                                                                                                                            </td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                            <td data-label="S.No.">13</td>
                                                                                                                                              <td>Incorrect reagents added/  prepared; Missing reagents</td>
                                                                                                                                                <td>
                                                                                                                                                  <ul class="list-style-bullets">
                                                                                                                                                    <li>Check protocol, ensure correct reagents are added in proper order and prepared to correct concentrations (e.g. TMB for HRP-labeled antibodies)</li>
                                                                                                                                                    </ul>
                                                                                                                                                  </td>
                                                                                                                                                </tr>
                                                                                                                                                <tr>
                                                                                                                                                  <td data-label="S.No.">14</td>
                                                                                                                                                    <td>Expired/Contaminated reagents</td>
                                                                                                                                                      <td>
                                                                                                                                                        <ul class="list-style-bullets">
                                                                                                                                                          <li>Make and use fresh/uncontaminated reagents</li>
                                                                                                                                                          </ul>
                                                                                                                                                        </td>
                                                                                                                                                      </tr>
                                                                                                                                                      <tr>
                                                                                                                                                        <td data-label="S.No.">15</td>
                                                                                                                                                          <td>Enzyme inhibitor present</td>
                                                                                                                                                            <td>
                                                                                                                                                              <ul class="list-style-bullets">
                                                                                                                                                                <li>Avoid sodium azide in HRP reactions</li>
                                                                                                                                                                  <li>Avoid phosphate in AP reactions</li>
                                                                                                                                                                  </ul>
                                                                                                                                                                </td>
                                                                                                                                                              </tr>
                                                                                                                                                              <tr>
                                                                                                                                                                <td data-label="S.No.">16</td>
                                                                                                                                                                  <td>Incorrect storage of components</td>
                                                                                                                                                                    <td>
                                                                                                                                                                      <ul class="list-style-bullets">
                                                                                                                                                                        <li>Double check storage conditions on kit level (Most kits need to be stored at 4°C)</li>
                                                                                                                                                                        </ul>
                                                                                                                                                                      </td>
                                                                                                                                                                    </tr>
                                                                                                                                                                    <tr>
                                                                                                                                                                      <td data-label="S.No.">17</td>
                                                                                                                                                                        <td>Excessive plate washing</td>
                                                                                                                                                                          <td>
                                                                                                                                                                            <ul class="list-style-bullets">
                                                                                                                                                                              <li>Gently pipette wash buffer (manual method)</li>
                                                                                                                                                                                <li>Ensure correct pressure (automatic wash system)</li>
                                                                                                                                                                                </ul>
                                                                                                                                                                              </td>
                                                                                                                                                                            </tr>
                                                                                                                                                                            <tr>
                                                                                                                                                                              <td data-label="S.No.">18</td>
                                                                                                                                                                                <td>Wells dry out</td>
                                                                                                                                                                                  <td>
                                                                                                                                                                                    <ul class="list-style-bullets">
                                                                                                                                                                                      <li>Cover the plate using sealing film or tape for all incubations</li>
                                                                                                                                                                                      </ul>
                                                                                                                                                                                    </td>
                                                                                                                                                                                  </tr>
                                                                                                                                                                                  <tr>
                                                                                                                                                                                    <td data-label="S.No.">19</td>
                                                                                                                                                                                      <td>Wells scratched with pipette or pipette tips</td>
                                                                                                                                                                                        <td>
                                                                                                                                                                                          <ul class="list-style-bullets">
                                                                                                                                                                                            <li>Carefully dispense/aspirate solutions into and out of wells</li>
                                                                                                                                                                                            </ul>
                                                                                                                                                                                          </td>
                                                                                                                                                                                        </tr>
                                                                                                                                                                                        <tr>
                                                                                                                                                                                          <td data-label="S.No.">20</td>
                                                                                                                                                                                            <td>Plate read at incorrect detection wavelength</td>
                                                                                                                                                                                              <td>
                                                                                                                                                                                                <ul class="list-style-bullets">
                                                                                                                                                                                                  <li>Use recommended wavelength/filter</li>
                                                                                                                                                                                                    <li>Ensure plate reader is set correctly for type of substrate used</li>
                                                                                                                                                                                                    </ul>
                                                                                                                                                                                                  </td>
                                                                                                                                                                                                </tr>
                                                                                                                                                                                                <tr>
                                                                                                                                                                                                  <td data-label="S.No.">21</td>
                                                                                                                                                                                                    <td>Slow color development</td>
                                                                                                                                                                                                      <td>
                                                                                                                                                                                                        <ul class="list-style-bullets">
                                                                                                                                                                                                          <li>Prepare substrate immediately before use</li>
                                                                                                                                                                                                            <li>Allow longer incubation</li>
                                                                                                                                                                                                              <li>Ensure stock solution is unexpired and uncontaminated</li>
                                                                                                                                                                                                              </ul>
                                                                                                                                                                                                            </td>
                                                                                                                                                                                                          </tr>
                                                                                                                                                                                                          <tr>
                                                                                                                                                                                                            <td data-label="S.No.">22</td>
                                                                                                                                                                                                              <td>Epitope recognition impeded by adsorption to plate</td>
                                                                                                                                                                                                                <td>
                                                                                                                                                                                                                  <ul class="list-style-bullets">
                                                                                                                                                                                                                    <li>Conjugate peptide to large carrier protein before coating onto plate</li>
                                                                                                                                                                                                                    </ul>
                                                                                                                                                                                                                  </td>
                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                  <td data-label="S.No.">23</td>
                                                                                                                                                                                                                    <td>Primary antibody concentration too low</td>
                                                                                                                                                                                                                      <td>
                                                                                                                                                                                                                        <ul class="list-style-bullets">
                                                                                                                                                                                                                          <li>Increase primary antibody concentration</li>
                                                                                                                                                                                                                            <li>Incubate for longer</li>
                                                                                                                                                                                                                            </ul>
                                                                                                                                                                                                                          </td>
                                                                                                                                                                                                                        </tr>
                                                                                                                                                                                                                        <tr>
                                                                                                                                                                                                                          <td data-label="S.No.">24</td>
                                                                                                                                                                                                                            <td>Detection reagent old, contaminated, or wrong pH</td>
                                                                                                                                                                                                                              <td>
                                                                                                                                                                                                                                <ul class="list-style-bullets">
                                                                                                                                                                                                                                  <li>Use fresh substrate at the correct pH</li>
                                                                                                                                                                                                                                  </ul>
                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                              </tr>
                                                                                                                                                                                                                            </tbody>
                                                                                                                                                                                                                          </table>
                                                                                                                                                                                                                          <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3" id="saturated_signal">Saturated Signal</h2>
                                                                                                                                                                                                                            <p class="mb-4">If your ELISA signal is too high, the results of the experiment can become unusable. Saturated signal can cause wells to appear uniformly reactive, or cause the standard curve to become unusable. Before you repeat your ELISA experiment, we've provided some troubleshooting tips to identify possible sources of the saturated signal error as well as solutions to solve it.</p>
                                                                                                                                                                                                                              <table class="table table-striped mb-6">
                                                                                                                                                                                                                                <thead class="bg-orange">
                                                                                                                                                                                                                                  <tr>
                                                                                                                                                                                                                                    <th scope="col">S.No.</th>
                                                                                                                                                                                                                                      <th scope="col">Possible Cause</th>
                                                                                                                                                                                                                                        <th scope="col">Solution</th>
                                                                                                                                                                                                                                        </tr>
                                                                                                                                                                                                                                      </thead>
                                                                                                                                                                                                                                      <tbody>
                                                                                                                                                                                                                                        <tr>
                                                                                                                                                                                                                                          <td data-label="S.No.">1</td>
                                                                                                                                                                                                                                            <td>High sample concentration</td>
                                                                                                                                                                                                                                              <td>
                                                                                                                                                                                                                                                <ul class="list-style-bullets">
                                                                                                                                                                                                                                                  <li>Use higher sample dilutions. Determine the optimal dilutions by <a href="https://SITE_ORIGIN_PLACEHOLDER/blog/post/how-to-use-checkerboard-titration-to-optimize-your-elisa-immunoassays" style="color:#EA8D28">titration assay</a>.</li>
                                                                                                                                                                                                                                                  </ul>
                                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                                              </tr>
                                                                                                                                                                                                                                              <tr>
                                                                                                                                                                                                                                                <td data-label="S.No.">2</td>
                                                                                                                                                                                                                                                  <td>Excessive substrate</td>
                                                                                                                                                                                                                                                    <td>
                                                                                                                                                                                                                                                      <ul class="list-style-bullets">
                                                                                                                                                                                                                                                        <li>Decrease concentration or amount of substrate. Follow manufacturer guidelines (e.g. the substrate provided with the ELISA kit might require further dilution).</li>
                                                                                                                                                                                                                                                        </ul>
                                                                                                                                                                                                                                                      </td>
                                                                                                                                                                                                                                                    </tr>
                                                                                                                                                                                                                                                    <tr>
                                                                                                                                                                                                                                                      <td data-label="S.No.">3</td>
                                                                                                                                                                                                                                                        <td>Subst
                                                                                                                                                                                                                                                          <!-- TRUNCATED: 52720 chars total — open docs/cms-pages-full-export.tsv row page_id=13 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 15. Protocol / troubleshooting guide

- **Structural hash:** `cee56f69a94f77f1` (for cross-reference)
- **URL prefix:** `protocol-and-troubleshooting`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `protocol-and-troubleshooting/ihc-troubleshooting` (page_id 14) — Immunohistochemistry (IHC) Troubleshooting Guide
- **All identifiers in cluster:** `protocol-and-troubleshooting/ihc-troubleshooting`
- **content_heading:** ` IHC Troubleshooting Guide`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<style>
  .mainbox {
  position: relative;
  }
  .buttonbottom {
  position: absolute;
  bottom: 15px;
  right: 15px;
  left: 15px;
  }
</style>
<section class="mb-6 text-center hero-section" style="
  background-image: url(https://SITE_ORIGIN_PLACEHOLDER);
  ">
  <div class="dark-overlap" bis_skin_checked="1">
    <h1 class="mb-2">Immunohistochemistry (IHC) Troubleshooting Guide</h1>
      <p class="font-large mb-4">
        We provide tables about common issues with IHC staining: weak staining,
        high background, overstaining, nonspecific staining. For more in-depth
        troubleshooting tips, please download our ebooks below.
      </p>
      <p class="font-large mb-4">
        Achieving accurate and reliable results in
        <b>
          <a href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/ihc-histology-services" style="color:#f28c28; text-decoration:underline;">
            Immunohistochemistry (IHC)</a>
          </b>
          depends on optimizing protocols and troubleshooting common issues. Below
          is a detailed guide covering key problems such as weak staining, high
          background, overstaining, and nonspecific staining, along with practical
          solutions. For more in-depth guidance, download our expert troubleshooting ebooks.
        </p>
      </div>
    </section>
    <section class="mb-6 double-column content-section">
      <div class="container">
        <div class="row">
          <div class="col-md-8 p-3">
            <h2 class="topic-heading text-orange font-larger font-weight-bold typography-josefin-sans mb-3 mb-5">
              How to Troubleshoot IHC Effectively
            </h2>
            <p>
              Understanding the basic steps of an IHC protocol alone does not
              guarantee consistent or reliable outcomes. In order to achieve
              accurate results in Immunohistochemistry (IHC) requires careful
              optimization and troubleshooting to address common challenges.
            </p>
            <p>
              While the general steps—specimen preparation, antigen retrieval,
              blocking, primary antibody staining, and detection—seem
              straightforward, the success of your <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/immunohistochemistry-ihc-principle">IHC experiment</a> hinges on
              fine-tuning these protocols. Effective optimization can be the
              difference between poor or no staining and clear, definitive results
              that drive meaningful insights in your research.
            </p>
            <p>
              Below is a detailed guide covering key problems such as weak staining,
              high background staining, overstaining, and nonspecific staining,
              along with practical solutions. For more in-depth guidance, download
              our <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/elisa-principle">expert troubleshooting</a> ebooks.
            </p>
          </div>
          <div class="col-md-4 p-3">
            <div class="bg-lightgrey p-4 border-rounded">
              <h3 class="font-large">Troubleshooting Guides</h3>
                <img
                src="https://SITE_ORIGIN_PLACEHOLDER/media/qsolutions/categoryicon/troubleshooting_box_image.png"
                alt="troubleshooting_box_image"
                />
                <p class="mb-5">
                  Download troubleshooting handbooks for IHC, Western blot and ELISA
                  for FREE.
                </p>
                <a
                  class="btn-orange"
                  href="https://SITE_ORIGIN_PLACEHOLDER/wb-ihc-elisa-troubleshooting-handbooks"
                  >Troubleshooting guides</a
                  >
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="mb-6 p-3 bg-orange cta-section">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 col-12">
                <h3 class="font-large">Save Time &amp; Money Now!</h3>
                  <p>
                    Did you know that Boster can accelerate your research projects by
                    assisting you in
                    <a
                      href="https://SITE_ORIGIN_PLACEHOLDER/services/antibody-validation-service"
                      style="color: #f2f2f2"
                      >antibody validation</a
                      >?
                    </p>
                  </div>
                  <div class="col-lg-4 col-12 vertical-center">
                    <a
                      href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/elisa-testing-service"
                      class="btn-outline-white btn-full-width"
                      >Get your antibody validated!</a
                      >
                    </div>
                  </div>
                </div>
              </section>
              <section class="mb-2">
                <div class="container">
                  <div class="row">
                    <div class="col-12">
                      <h2
                        class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3 mb-5"
                        >
                        Common IHC Troubleshooting Issues and Solutions
                      </h2>
                      <p class="mb-4 pt-4">
                        The following guide serves as a checklist for identifying and
                        resolving common protocol issues encountered during IHC staining.
                        Addressing these challenges effectively can save time, and resources,
                        and ensure high-quality staining results.
                      </p>
                      <p class="mb-4 pt-4">
                        In July 2020, our team interviewed industry experts and composed an
                        in-depth interview for topics of optimizing and troubleshooting IHC.
                        It answers many interesting questions and you can see more details
                        here: Boster Interview Series:
                        <a
                          href="https://SITE_ORIGIN_PLACEHOLDER/boster-interviews/expert-tips-on-ihc-antibody-selection-optimization-and-ihc-negative-controls"
                          style="color: #ea8d28"
                          >Expert Tips on IHC</a
                          >
                        </p>
                        <h3
                          class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3 mb-5"
                          >
                          No Or Weak Staining
                        </h3>
                        <div class="container p-3">
                          <div class="row multicolumns">
                            <div class="col">
                              <div
                                class="bg-white p-4 border-rounded border mx-auto text-center h-100"
                                >
                                <img
                                src="https://SITE_ORIGIN_PLACEHOLDER/media/wysiwyg/weak-staining.jpg"
                                alt="Weak staining of CD3 epsilon in human tonsil tissue"
                                class="mb-3"
                                width="320"
                                height="240"
                                />
                                <p>Weak staining of CD3 epsilon in human tonsil tissue</p>
                                </div>
                              </div>
                              <div class="col">
                                <div
                                  class="bg-white p-4 border-rounded border mx-auto text-center h-100"
                                  >
                                  <img
                                  src="https://SITE_ORIGIN_PLACEHOLDER/media/wysiwyg/weak-staining-fix.jpg"
                                  alt="Improved staining of CD3 epsilon in human tonsil tissue"
                                  class="mb-3"
                                  width="320"
                                  height="240"
                                  />
                                  <p>Improved staining of CD3 epsilon in human tonsil tissue</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p class="mb-4 pt-4">
                              Good IHC results rely on strong, specific staining of the target
                              antigen. Weak or lack of staining often requires repeating the
                              experiment, which can be costly in terms of time and resources. Use
                              the table below to identify and correct the source of weak staining.
                            </p>
                            <table class="table table-striped mb-4">
                              <thead class="bg-orange">
                                <tr>
                                  <th scope="col">S.No.</th>
                                    <th scope="col">Possible Cause</th>
                                      <th scope="col">Solution</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td data-label="S.No.">1</td>
                                          <td data-label="Possible Cause">
                                            Slides lose signal over time during storage
                                          </td>
                                          <td data-label="Solution">
                                            <ul class="list-style-bullets">
                                              <li>Prepare slides with freshly-sliced tissues.</li>
                                                <li>Store slides at 4°C.</li>
                                                  <li>Do not bake slides before storage.</li>
                                                  </ul>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td data-label="S.No.">2</td>
                                                  <td data-label="Possible Cause">
                                                    The antibody used is not suitable for IHC procedures which
                                                    detect proteins in its native conformation
                                                  </td>
                                                  <td data-label="Solution">
                                                    <ul class="list-style-bullets">
                                                      <li>
                                                        Check the antibody datasheet to make certain that it has
                                                        been validated for IHC applications.
                                                      </li>
                                                      <li>
                                                        Check the antibody is applicable to the right IHC samples
                                                        (paraffin sections vs. frozen samples).
                                                      </li>
                                                      <li>
                                                        Perform Western blot with both its native and denatured
                                                        forms to ensure that the antibody detects the native form.
                                                      </li>
                                                    </ul>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td data-label="S.No.">3</td>
                                                    <td data-label="Possible Cause">
                                                      Fixation procedures (using formalin and paraformaldehyde
                                                      fixatives) have masked the epitope that the antibody recognizes
                                                    </td>
                                                    <td data-label="Solution">
                                                      <ul class="list-style-bullets">
                                                        <li>
                                                          Use different
                                                          <a
                                                            href="https://SITE_ORIGIN_PLACEHOLDER/blog/post/protocol-for-optimizing-hier-antigen-retrieval-conditions"
                                                            style="color: #ea8d28"
                                                            >antigen retrieval</a
                                                            >
                                                            methods to unmask the epitope (HIER or PIER)
                                                          </li>
                                                          <li>Fix the sections in a shorter time</li>
                                                          </ul>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td data-label="S.No.">4</td>
                                                          <td data-label="Possible Cause">
                                                            The primary and/or secondary antibody has lost its activity due
                                                            to improper storage, dilution, or excessive freezing and thawing
                                                          </td>
                                                          <td data-label="Solution">
                                                            <ul class="list-style-bullets">
                                                              <li>
                                                                Run positive controls to ensure that the primary and/or
                                                                secondary antibody is working properly.
                                                              </li>
                                                              <li>
                                                                Store the antibodies according to manufacturer instructions.
                                                              </li>
                                                              <li>Avoid contamination and light on antibodies.</li>
                                                              </ul>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td data-label="S.No.">5</td>
                                                              <td data-label="Possible Cause">
                                                                Insufficient deparaffinization
                                                              </td>
                                                              <td data-label="Solution">
                                                                <ul class="list-style-bullets">
                                                                  <li>Increase the deparaffinization time</li>
                                                                    <li>Use fresh dimethylbenzene</li>
                                                                    </ul>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td data-label="S.No.">6</td>
                                                                    <td data-label="Possible Cause">
                                                                      The protein is located in the nucleus and the antibody cannot
                                                                      penetrate the nucleus
                                                                    </td>
                                                                    <td data-label="Solution">
                                                                      <ul class="list-style-bullets">
                                                                        <li>
                                                                          Add a permeabilizing agent (e.g. Triton X) to the blocking
                                                                          buffer and antibody dilution buffer
                                                                        </li>
                                                                      </ul>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td data-label="S.No.">7</td>
                                                                      <td data-label="Possible Cause">
                                                                        The PBS buffer has contaminated with bacteria that damage the
                                                                        phosphate groups on the protein of interest
                                                                      </td>
                                                                      <td data-label="Solution">
                                                                        <ul class="list-style-bullets">
                                                                          <li>Add 0.01% azide in the PBS antibody storage buffer</li>
                                                                            <li>Use fresh sterile PBS</li>
                                                                            </ul>
                                                                          </td>
                                                                        </tr>
                                                                        <tr>
                                                                          <td data-label="S.No.">8</td>
                                                                            <td data-label="Possible Cause">
                                                                              The primary antibody and the secondary antibody are not
                                                                              compatible
                                                                            </td>
                                                                            <td data-label="Solution">
                                                                              <ul class="list-style-bullets">
                                                                                <li>
                                                                                  Use a secondary antibody that was raised against the species
                                                                                  in which the primary was raised (e.g. if the primary
                                                                                  antibody was raised in mouse, an anti-mouse secondary
                                                                                  antibody should be used)
                                                                                </li>
                                                                                <li>
                                                                                  Check that the isotypes of the primary and secondary are
                                                                                  compatible
                                                                                </li>
                                                                              </ul>
                                                                            </td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td data-label="S.No.">9</td>
                                                                              <td data-label="Possible Cause">
                                                                                The protein is not present in the tissue of interest or has not
                                                                                sufficiently expressed
                                                                              </td>
                                                                              <td data-label="Solution">
                                                                                <ul class="list-style-bullets">
                                                                                  <li>
                                                                                    Run positive controls to ensure that target protein is
                                                                                    present in the tissue
                                                                                  </li>
                                                                                  <li>Include an amplification step in your protocol</li>
                                                                                    <li>Use higher antibody concentration</li>
                                                                                    </ul>
                                                                                  </td>
                                                                                </tr>
                                                                                <!-- TRUNCATED: 48570 chars total — open docs/cms-pages-full-export.tsv row page_id=14 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 16. Protocol / troubleshooting guide

- **Structural hash:** `0ef518ee993acb00` (for cross-reference)
- **URL prefix:** `protocol-and-troubleshooting`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `protocol-and-troubleshooting/western-blot-troubleshooting` (page_id 15) — Western Blot Troubleshooting | Antibody Company, Buy Antibodies Online
- **All identifiers in cluster:** `protocol-and-troubleshooting/western-blot-troubleshooting`
- **content_heading:** `Western Blot Troubleshooting `
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<style>
  .mainbox {
  position: relative;
  }
  .buttonbottom {
  position: absolute;
  bottom: 15px;
  right: 15px;
  left: 15px;
  }
</style>
<section class="mb-6 text-center hero-section" style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER)">
  <div class="dark-overlap">
    <h1 class="font-weight-bold mb-2">Western Blotting Troubleshooting Guide</h1>
      <p class="font-large mb-4">Pro tips on resolving common Western Blot issues such as weak signal, wrong <a href="https://SITE_ORIGIN_PLACEHOLDER/blog/post/transfer-proteins-with-western-blot-filter-paper">band size</a>, smiley gel, and high background.</p>
      </div>
    </section>
    <section class="mb-6 double-column content-section">
      <div class="container">
        <div class="row">
          <div class="col-md-8 p-3">
            <h2 class="font-large text-orange mb-2 text-capitalize">How to Troubleshoot Western Blot</h2>
              <p class="mb-4">
                <a href="https://SITE_ORIGIN_PLACEHOLDER/blog/post/whats-your-western-blot-success-rate">Western blotting</a> is a powerful technique for protein detection, but it can present several technical challenges. Unexpected results such as weak signals, high background, or non-specific protein bands appearing at unusual molecular weights, sometimes caused by protein degradation products, can arise from issues at any stage of the workflow, from sample preparation to primary or secondary antibody incubation or detection reagents handling.</p>
                  <p class="mb-4">The following Western blot troubleshooting guide serves as a checklist for the possible causes and solutions to some of the most commonly encountered problems with Western blot assays, complementing the standard SDS-PAGE gel and various protein blotting methods used in <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/western-blot-protocol">Western blotting protocol</a>. Whether you're dealing with inconsistent results or complete signal loss, use this checklist to systematically pinpoint the source of the issue and implement targeted solutions.</p>
                    <p class="mb-4">If you do not see the issues you are having featured in this page, please contact us at support@bosterbio.com and we will help you resolve your specific trouble.</p>
                    </div>
                    <div class="col-md-4 p-3">
                      <div class="bg-lightgrey p-4 border-rounded">
                        <h3 class="font-large text-darkgrey mb-3">Troubleshooting Guides</h3>
                          <img class="mb-3" src="https://SITE_ORIGIN_PLACEHOLDER/media/qsolutions/categoryicon/troubleshooting_box_image.png" alt="Troubleshooting Guides">
                          <p class="mb-5">Download troubleshooting handbooks for IHC, Western blot, and ELISA for FREE.</p>
                            <a class="btn-orange" href="https://SITE_ORIGIN_PLACEHOLDER/wb-ihc-elisa-troubleshooting-handbooks">Troubleshooting Guides</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section class="mb-6 p-3 bg-orange cta-section">
                      <div class="container">
                        <div class="row">
                          <div class="col-lg-8 col-12">
                            <h3 class="font-large">Are you having Troubleshooting issues with Western Blotting?</h3>
                              <p>Let Bosterbio handle your Western blot CRO services and be your long term partner in broadening the bandwidth of your lab/team in a flexible manner.</p>
                              </div>
                              <div class="col-lg-4 col-12 vertical-center">
                                <a href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/western-blotting-service" class="btn-outline-white btn-full-width">Learn more about Western Blot CRO services!</a>
                                </div>
                              </div>
                            </div>
                          </section>
                          <section class="mb-6 single-column content-section pt-5">
                            <div class="container">
                              <div class="row">
                                <div class="col-12">
                                  <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-6 text-uppercase">High Background in Western Blot</h2>
                                    <div class="col-md-8 p-0">
                                      <p class="mb-4">High background on a western blot occurs when the membrane background signal of the membrane reduces the signal-to-noise ratio to unreadable levels. This can result from protein aggregation, improper blocking, or cross-reactivity of antibody reagents.
                                      </p>
                                      <p class="mb-4">Practical solutions include optimizing primary antibody and secondary concentrations, carefully adjusting secondary antibody incubations, testing different blocking agents, and ensuring that nitrocellulose membranes or PVDF membranes are selected according to experimental needs, since the extraction of membrane proteins can influence background levels depending on the method used. For chemiluminescence-based assays, using high-quality ECL reagents and a fresh chemiluminescent substrate helps minimize membrane background and improve detection of your protein target.
                                      </p>
                                      <p class="mb-4">Use these tips to identify and resolve the source of your unexpected band sizes.</p>
                                      </div>
                                      <div class="col-md-4 p-0">
                                        <img class="mb-3" src="https://SITE_ORIGIN_PLACEHOLDER" alt="High Background" data-done="Loaded" loading="lazy">
                                      </div>
                                      <table class="table table-striped">
                                        <thead class="bg-orange">
                                          <tr>
                                            <th scope="col">S.No.</th>
                                              <th scope="col">Possible Cause</th>
                                                <th scope="col">Solution</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td data-label="S.No.">1</td>
                                                    <td data-label="Possible Cause">Antibody concentration is too high</td>
                                                      <td data-label="Solution">
                                                        <ul class="list-style-bullets">
                                                          <li>Optimize and decrease antibody concentration</li>
                                                            <li>Use a dot-blot test to optimize antibody concentration</li>
                                                            </ul>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td data-label="S.No.">2</td>
                                                            <td data-label="Possible Cause">Aggregate secondary antibody formation</td>
                                                              <td data-label="Solution">
                                                                <ul class="list-style-bullets">
                                                                  <li>Filter the secondary antibody through 0.2μm filter</li>
                                                                    <li>Use a new secondary antibody</li>
                                                                    </ul>
                                                                  </td>
                                                                </tr>
                                                                <tr>
                                                                  <td data-label="S.No.">3</td>
                                                                    <td data-label="Possible Cause">Too high antibody incubation temperature</td>
                                                                      <td data-label="Solution">
                                                                        <ul class="list-style-bullets">
                                                                          <li>Incubate the antibody at 4°C</li>
                                                                          </ul>
                                                                        </td>
                                                                      </tr>
                                                                      <tr>
                                                                        <td data-label="S.No.">4</td>
                                                                          <td data-label="Possible Cause">Non-specific secondary antibody binding or cross-reactivity with blocking agent</td>
                                                                            <td data-label="Solution">
                                                                              <ul class="list-style-bullets">
                                                                                <li>Run secondary antibody control (without the primary)</li>
                                                                                  <li>Decrease secondary antibody concentration</li>
                                                                                  </ul>
                                                                                </td>
                                                                              </tr>
                                                                              <tr>
                                                                                <td data-label="S.No.">5</td>
                                                                                  <td data-label="Possible Cause">Cross-reactivity of primary or secondary antibody with blocking agent</td>
                                                                                    <td data-label="Solution">
                                                                                      <ul class="list-style-bullets">
                                                                                        <li>Add Tween-20 to the incubation and washing buffer</li>
                                                                                        </ul>
                                                                                      </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                      <td data-label="S.No.">6</td>
                                                                                        <td data-label="Possible Cause">Incompatible blocking agent</td>
                                                                                          <td data-label="Solution">
                                                                                            <ul class="list-style-bullets">
                                                                                              <li>Compare different <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/western-blotting-optimization/blocking">blocking buffers</a>
                                                                                              </li>
                                                                                            </ul>
                                                                                          </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                          <td data-label="S.No.">7</td>
                                                                                            <td data-label="Possible Cause">Incomplete blocking</td>
                                                                                              <td data-label="Solution">
                                                                                                <ul class="list-style-bullets">
                                                                                                  <li>Optimize choice of blocking buffer</li>
                                                                                                    <li>Increase <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/western-blot-sample-preparation-guide" style="color:#EA8D28">protein concentration</a> in blocking agent</li>
                                                                                                      <li>Optimize blocking time and/or temperature; Block for 2 hours at normal temperature or overnight at 4°C</li>
                                                                                                        <li>Add 0.05% Tween 20 detergent into blocking agent</li>
                                                                                                          <li>Add 0.05% Tween 20 detergent into antibody diluents solution</li>
                                                                                                          </ul>
                                                                                                        </td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                        <td data-label="S.No.">8</td>
                                                                                                          <td data-label="Possible Cause">Insufficient blocking</td>
                                                                                                            <td data-label="Solution">
                                                                                                              <ul class="list-style-bullets">
                                                                                                                <li>Extend blocking time, increase blocking solution concentration, or use a compatible blocking agent (e.g. skim milk, BSA, serum, etc.)</li>
                                                                                                                </ul>
                                                                                                              </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                              <td data-label="S.No.">9</td>
                                                                                                                <td data-label="Possible Cause">Cross-reactivity of antibody with other proteins</td>
                                                                                                                  <td data-label="Solution">
                                                                                                                    <ul class="list-style-bullets">
                                                                                                                      <li>Use different blocking agent (Do not use skim milk with biotin system</li>
                                                                                                                        <li>Reduce secondary antibody concentration</li>
                                                                                                                          <li>Test cross-reactivity between secondary antibody and membrane to rule out non-specific background binding</li>
                                                                                                                          </ul>
                                                                                                                        </td>
                                                                                                                      </tr>
                                                                                                                      <tr>
                                                                                                                        <td data-label="S.No.">10</td>
                                                                                                                          <td data-label="Possible Cause">Insufficient washing</td>
                                                                                                                            <td data-label="Solution">
                                                                                                                              <ul class="list-style-bullets">
                                                                                                                                <li>Increase number of washes and buffer volume</li>
                                                                                                                                  <li>Add 0.05% Tween 20 detergent into washing buffer</li>
                                                                                                                                  </ul>
                                                                                                                                </td>
                                                                                                                              </tr>
                                                                                                                              <tr>
                                                                                                                                <td data-label="S.No.">11</td>
                                                                                                                                  <td data-label="Possible Cause">Exposure time is too long</td>
                                                                                                                                    <td data-label="Solution">
                                                                                                                                      <ul class="list-style-bullets">
                                                                                                                                        <li>Check exposure parameters and reduce exposure time</li>
                                                                                                                                        </ul>
                                                                                                                                      </td>
                                                                                                                                    </tr>
                                                                                                                                    <tr>
                                                                                                                                      <td data-label="S.No.">12</td>
                                                                                                                                        <td data-label="Possible Cause">Membrane problem</td>
                                                                                                                                          <td data-label="Solution">
                                                                                                                                            <ul class="list-style-bullets">
                                                                                                                                              <li>Use clean tweezers; Operate with gloves</li>
                                                                                                                                                <li>Use new membranes</li>
                                                                                                                                                  <li>Ensure the liquid is enough to keep the membrane moist</li>
                                                                                                                                                    <li>Use decolorization table in incubation</li>
                                                                                                                                                      <li>Avoid membranes overlapping</li>
                                                                                                                                                        <li>Handle carefully and avoid damaging membrane</li>
                                                                                                                                                        </ul>
                                                                                                                                                      </td>
                                                                                                                                                    </tr>
                                                                                                                                                    <tr>
                                                                                                                                                      <td data-label="S.No.">13</td>
                                                                                                                                                        <td data-label="Possible Cause">Insufficient membrane wash</td>
                                                                                                                                                          <td data-label="Solution">
                                                                                                                                                            <ul class="list-style-bullets">
                                                                                                                                                              <li>Increase the number of wash</li>
                                                                                                                                                              </ul>
                                                                                                                                                            </td>
                                                                                                                                                          </tr>
                                                                                                                                                          <tr>
                                                                                                                                                            <td data-label="S.No.">14</td>
                                                                                                                                                              <td data-label="Possible Cause">Incompatible membrane</td>
                                                                                                                                                                <td data-label="Solution">
                                                                                                                                                                  <ul class="list-style-bullets">
                                                                                                                                                                    <li>Nitrocellulose membrane’s background is lower than that of PVDF membrane</li>
                                                                                                                                                                    </ul>
                                                                                                                                                                  </td>
                                                                                                                                                                </tr>
                                                                                                                                                                <tr>
                                                                                                                                                                  <td data-label="S.No.">15</td>
                                                                                                                                                                    <td data-label="Possible Cause">Dry membrane</td>
                                                                                                                                                                      <td data-label="Solution">
                                                                                                                                                                        <ul class="list-style-bullets">
                                                                                                                                                                          <li>Make sure membrane is covered with a sufficient amount of liquid and prevent it from drying</li>
                                                                                                                                                                          </ul>
                                                                                                                                                                        </td>
                                                                                                                                                                      </tr>
                                                                                                                                                                      <tr>
                                                                                                                                                                        <td data-label="S.No.">16</td>
                                                                                                                                                                          <td data-label="Possible Cause">Contaminated buffer</td>
                                                                                                                                                                            <td data-label="Solution">
                                                                                                                                                                              <ul class="list-style-bullets">
                                                                                                                                                                                <li>Use new buffer or filter buffer before use</li>
                                                                                                                                                                                  <li>Never re-use blocking solutions</li>
                                                                                                                                                                                    <li>Use pure protein as a blocking agent</li>
                                                                                                                                                                                    </ul>
                                                                                                                                                                                  </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                                <tr>
                                                                                                                                                                                  <td data-label="S.No.">17</td>
                                                                                                                                                                                    <td data-label="Possible Cause">Contaminated equipment</td>
                                                                                                                                                                                      <td data-label="Solution">
                                                                                                                                                                                        <ul class="list-style-bullets">
                                                                                                                                                                                          <li>Ensure all equipment and tools are clean and no gel is left on membrane</li>
                                                                                                                                                                                            <li>Use disposable incubation trays</li>
                                                                                                                                                                                              <li>Thoroughly wash reusable incubation trays between incubations</li>
                                                                                                                                                                                              </ul>
                                                                                                                                                                                            </td>
                                                                                                                                                                                          </tr>
                                                                                                                                                                                          <tr>
                                                                                                                                                                                            <td data-label="S.No.">18</td>
                                                                                                                                                                                              <td data-label="Possible Cause">Insufficient antibody binding activity</td>
                                                                                                                                                                                                <td data-label="Solution">
                                                                                                                                                                                                  <ul class="list-style-bullets">
                                                                                                                                                                                                    <li>Use fresh aliqot of antibody stored at -20°C</li>
                                                                                                                                                                                                      <li>Avoid thawing and re-freezing antibodies</li>
                                                                                                                                                                                                        <li>Store antibodies at -80°C for long-term stability</li>
                                                                                                                                                                                                        </ul>
                                                                                                                                                                                                      </td>
                                                                                                                                                                                                    </tr>
                                                                                                                                                                                                    <tr>
                                                                                                                                                                                                      <td data-label="S.No.">19</td>
                                                                                                                                                                                                        <td data-label="Possible Cause">Excessive substrate incubation</td>
                                                                                                                                                                                                          <td data-label="Solution">
                                                                                                                                                                                                            <ul class="list-style-bullets">
                                                                                                                                                                                                              <li>Reduce length of substrate incubation</li>
                                                                                                                                                                                                              </ul>
                                                                                                                                                                                                            </td>
                                                                                                                                                                                                          </tr>
                                                                                                                                                                                                          <tr>
                                                                                                                                                                                                            <td data-label="S.No.">20</td>
                                                                                                                                                                                                              <td data-label="Possible Cause">Blocking proteins reacting with detection system</td>
                                                                                                                                                                                                                <td data-label="Solution">
                                                                                                                                                                                                                  <ul class="list-style-bullets">
                                                                                                                                                                                                                    <li>Milk contains biotin; do not use when dete
                                                                                                                                                                                                                      <!-- TRUNCATED: 56132 chars total — open docs/cms-pages-full-export.tsv row page_id=15 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 17. Protocol / troubleshooting guide

- **Structural hash:** `ccb44a683769a9e4` (for cross-reference)
- **URL prefix:** `protocol-and-troubleshooting`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `protocol-and-troubleshooting/western-blot-protocol` (page_id 16) — Western Blot Protocol | Boster Bio
- **All identifiers in cluster:** `protocol-and-troubleshooting/western-blot-protocol`
- **content_heading:** `Western Blot Protocol`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<style>
  .mainbox {
  position: relative;
  }
  .buttonbottom {
  position: absolute;
  bottom: 15px;
  right: 15px;
  left: 15px;
  }
</style>
<section class="mb-6 text-center hero-section" style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER)">
  <div class="dark-overlap">
    <h1 class="mb-2">Western Blot Protocol: Complete Step-by-Step Guide</h1>
    </div>
  </section>
  <section class="topic-heading-section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="text-orange text-center font-larger font-weight-bold typography-josefin-sans mb-5">Overview of Western Blotting</h2>
          </div>
        </div>
      </div>
    </section>
    <section class="single-column content-section mb-6">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p>Western blotting, also known as immunoblotting, is a core method in molecular biology for detecting specific proteins within a complex sample. Developed in 1979 by W. Neal Burnette, Western blotting—also called immunoblotting—is a widely used method for detecting specific proteins in a sample. Adapted from earlier blotting techniques, it remains a standard in molecular biology. The process involves <a href="https://SITE_ORIGIN_PLACEHOLDER/blog/post/transfer-proteins-with-western-blot-filter-paper">separating proteins by gel electrophoresis</a>, transferring them to a membrane such as PVDF membranes or nitrocellulose, and using antibodies for detection. </p>
              <p>Western blotting is commonly used to confirm protein expression and post-translational changes. It plays a key role in research and diagnostics, including HIV detection and studies of cancer and neurodegenerative diseases. Its reliability makes it essential in protein analysis workflows. Researchers often start with cell culture experiments and prepare extracts using cell lysis buffers containing protease inhibitor cocktail and phosphatase inhibitors to preserve protein integrity before analysis.</p>
              </div>
            </div>
          </div>
        </section>
        <section class="topic-heading-section">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h2 class="text-orange text-center font-larger font-weight-bold typography-josefin-sans mb-5">Western Blot Workflow Overview</h2>
                </div>
              </div>
            </div>
          </section>
          <section class="mb-6 single-column content-section">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <img src="https://SITE_ORIGIN_PLACEHOLDER/media/images/Western_blot_protocol_image_1.png" alt="Western_blot_protocol_image">
                </div>
              </div>
            </div>
          </section>
          <section class="mb-6 p-3 bg-orange cta-section">
            <div class="container">
              <div class="row">
                <div class="col-lg-8 col-12">
                  <h3 class="font-large">Want CRO Long term partner?</h3>
                    <p>Let Bosterbio handle your Western blot CRO services and  be your long term partner in broadening the bandwidth of your lab/team in a flexible manner.</p>
                    </div>
                    <div class="col-lg-4 col-12 vertical-center">
                      <a href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/western-blotting-service" class="btn-outline-white btn-full-width">Learn more about Western Blot CRO services!</a>
                      </div>
                    </div>
                  </div>
                </section>
                <section class="pt-6 topic-heading-section">
                  <div class="container">
                    <div class="row">
                      <div class="col-12">
                        <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-5">Step 1: Electrophoresis</h2>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section class="double-column content-section mb-6">
                    <div class="container">
                      <div class="row">
                        <div class="col-12">
                          <h3 class="text-capitalize text-orange font-large mb-4">(A) Gel Preparation</h3>
                            <p>The first step of gel preparation is to determine the gel percentage based on the molecular weight of your protein sample:</p>
                              <table class="table table-striped mb-5">
                                <thead class="bg-orange">
                                  <tr>
                                    <th scope="col">Protein Size (kDa)</th>
                                      <th scope="col">&gt;100</th>
                                        <th scope="col">30-100</th>
                                          <th scope="col">10-30</th>
                                            <th scope="col">&lt;10</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td data-label="Protein Size (kDa)">Gel Percentage</td>
                                                <td data-label=">100">8%</td>
                                                  <td data-label="30-100">10%</td>
                                                    <td data-label="10-30">12%</td>
                                                      <td data-label="<10">15%</td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <p>If you are not sure of the size of your protein or are looking at proteins of a variety of molecular weights, then a gradient gel may provide the best resolution.</p>
                                                    <p class="font-weight-bold">Notes</p>
                                                      <ul class="list-style-bullets ml-4">
                                                        <li>We recommend using the SDS-PAGE Gel Preparation Kit available from us (Boster Catalog # AR0138). It contains most of the reagents for the gel preparation and can be used to make both SDS-PAGE gel and non-native PAGE gel.</li>
                                                          <li>Many protocols are available for gel preparation. Please refer to the manufacturer’s guidelines for use of specific products.</li>
                                                            <li>Pre-cast gels may also be used instead of making your own gel.</li>
                                                            </ul>
                                                            <h4 class="font-large mb-4 pt-5">(I) Resolving Gel Preparation</h4>
                                                              <ol class="list-style-numbers ml-4">
                                                                <li>Determine the volume needed and gently mix the ingredients for the chosen percentage of the resolving gel. Make sure to blend the solution gently to avoid too much oxygen from entering the solution.</li>
                                                                  <li>Pour the gel solution slowly into your gel casting form.</li>
                                                                    <li>Layer the top of the gel with distilled water to prevent oxygen from entering the gel.</li>
                                                                      <li>Incubate at 37°C for 30-60 minutes for the gel solution to fully polymerize until it becomes solid.</li>
                                                                        <li>Remove the water from the polymerized resolving gel (absorb excess with paper towel).</li>
                                                                        </ol>
                                                                        <h4 class="font-large mb-4 pt-5">(II) Stacking Gel Preparation</h4>
                                                                          <ol class="list-style-numbers ml-4">
                                                                            <li>Determine the volume needed, gently mix the ingredients, and absorb water on the solid resolving gel with a filter.</li>
                                                                              <li>Slowly pour the stacking gel solution on top of the running gel.</li>
                                                                                <li>Carefully insert the sample comb to avoid bubbles. There should be no bubbles between the comb teeth.</li>
                                                                                  <li>Incubate at 37°C for 30-60 minutes. When the gel solution is fully polymerized and solid, gently take out the comb.</li>
                                                                                  </ol>
                                                                                  <h3 class="text-capitalize text-orange font-large mb-4 pt-5">(B) Pre-electrophoresis Sample Preparation</h3>
                                                                                    <ul class="list-style-bullets ml-4">
                                                                                      <li>Mix the extracted protein sample with 4X Dual Color Protein Loading Buffer (Boster Catalog # AR1142) at 3:1 ratio (i.e. add 300µg sample to 100µL loading buffer).
                                                                                        <p class="font-italic">Dual Color Protein Loading Buffer is designed to prevent protein degradation during sample heating prior to electrophoresis and is able to work against pH changes during SDS-PAGE run. Many proteins are sensitive to pH changes that result from temperature fluctuations of Tris buffers during electrophoresis. It contains two tracking dyes: blue (Bromophenol Blue) for tracking the progress of electrophoresis and pink (Pyronin Y) for monitoring protein transfer to the membrane. Refer to the datasheet on our website for more information.</p>
                                                                                        </li>
                                                                                        <li>You may also use one of the following reagents/methods instead of the Dual Color Protein Loading Buffer:
                                                                                          <ul class="list-style-bullets ml-4 pt-4">
                                                                                            <li>SDS-PAGE Protein Loading Buffer 2X (Reducing) (Boster Catalog # AR0131) at 1:1 ratio (i.e. add 100µg sample to 100µL loading buffer)</li>
                                                                                              <li>SDS-PAGE Protein Loading Buffer 5X (Reducing) (Boster Catalog # AR1112) at 4:1 ratio (i.e. add 400µg sample to 100µL loading buffer)</li>
                                                                                                <li>Tricine SDS Sample Buffer 2X (Boster Catalog # AR1143) at 1:1 ratio (i.e. add 100µg sample to 100µL loading buffer) if the protein with low molecular weight (&lt;10KD)</li>
                                                                                                  <li>Laemmli 2X Buffer (4% SDS, 10% 2-mercaptoethanol, 20% glycerol, 0.004% bromophenol blue, 0.125 M Tris-HCl; pH 6.8) at 1:1 ratio (i.e. add 100µg sample to 100µL loading buffer)</li>
                                                                                                  </ul>
                                                                                                </li>
                                                                                                <li class="pt-4">Denature the sample/loading buffer mixture in a 100°C water bath for 5 minutes (or follow the manufacturer instructions). Alternatively, the mixture can be stored in aliquots at -20°C for several months or at 4°C for 1-2 weeks before use.</li>
                                                                                                </ul>
                                                                                                <h3 class="text-capitalize text-orange font-large mb-4 pt-5">(C) Loading Samples &amp; Running Electrophoresis</h3>
                                                                                                  <ol class="list-style-numbers ml-4 pt-4">
                                                                                                    <li>Place the gel in the electrophoresis apparatus.</li>
                                                                                                      <li>Fill both buffer chambers with <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/western-blotting-optimization/sds-page">SDS-PAGE Electrophoresis Buffer<a> (25 mMTris base, 190 mM glycine and 0.1% SDS; pH 8.3). We recommend using our buffer (Boster Catalog # AR0139). Fill both buffer chambers with SDS-PAGE Electrophoresis Buffer (25 mMTris base, 190 mM glycine and 0.1% SDS; pH 8.3) to a level above the sample loading well between the two-layer glass pane. Ensure the bottom of the gel is immersed in the loading buffer and the liquid level inside the two-layer glass pane is higher than the outside level. We recommend using our buffer (Boster Catalog # AR0139).</li>
                                                                                                        <li>Carefully remove the well-creating comb from the gel and rinse the wells with the electrophoresis buffer.</li>
                                                                                                          <li>Pipette your samples into the wells quickly to prevent possible sample diffusion inside the well. As an example, for a well that can contain maximum 30 µL, load 20 to 25 µL of 1 µg/µL sample per well.</li>
                                                                                                            <li>Pipette 10 µL of appropriate controls and/or molecular weight standards in separate well(s). The loaded samples should include the treated sample, tissue and cell sample protein for positive control, recombinant protein for positive control, and the marker.</li>
                                                                                                              <li>Properly connect the anode and cathode of the electrophoresis.</li>
                                                                                                                <li>Turn on the power to run electrophoresis at 100-130V* until the bromophenol blue dye reaches the gel bottom (this can take 1.5 to 3 hours). You should observe fine bubbles from the gel apparatus bottom as this observation indicates that sufficient electric current is generated.</li>
                                                                                                                  <li>Turn off the power when the protein samples have finished migrating in the gel.</li>
                                                                                                                  </ol>
                                                                                                                  <span class="font-weight-bold pt-4">Notes:</span>
                                                                                                                    <ul class="list-style-bullets mb-6 ml-4 pt-4">
                                                                                                                      <li>To prevent sample diffusion, try to shorten the amount of time it takes to load samples as much as possible.</li>
                                                                                                                        <li>In a discontinuous system, the electrophoresis voltage for stacking gel (70-80V) is lower than that for resolving gel (90-110V) to ensure that proteins are concentrated on the same level before running into the resolving gel.</li>
                                                                                                                          <li>*The applied voltage should be adjusted according to the gel thickness, power supply used, and resolution desired.</li>
                                                                                                                          </ul>
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    </div>
                                                                                                                  </section>
                                                                                                                  <section class="mb-5 topic-heading-section">
                                                                                                                    <div class="container">
                                                                                                                      <div class="row">
                                                                                                                        <div class="col-12">
                                                                                                                          <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-5">Step 2: Protein Transfer (To Membrane)</h2>
                                                                                                                          </div>
                                                                                                                        </div>
                                                                                                                      </div>
                                                                                                                    </section>
                                                                                                                    <section class="single-column content-section mb-6">
                                                                                                                      <div class="container">
                                                                                                                        <div class="row">
                                                                                                                          <div class="col-12">
                                                                                                                            <h3 class="text-capitalize text-orange font-large mb-4">(A) Gel Staining (Optional)</h3>
                                                                                                                              <p>After electrophoresis, we recommend using one of our gel staining solutions to determine if the electrophoretic separation worked. Please refer to the datasheet(s) on our website for more information.</p>
                                                                                                                                <ul class="list-style-bullets ml-4">
                                                                                                                                  <li>Coomassie Blue Staining &amp; Destaining Solution (Boster Catalog # AR0140)</li>
                                                                                                                                    <li>Coomassie Blue Fast Staining Solution (Boster Catalog # AR0170)</li>
                                                                                                                                      <li>Silver Stain Kit (Boster Catalog # AR0171)</li>
                                                                                                                                      </ul>
                                                                                                                                      <p>
                                                                                                                                        <span class="font-weight-bold">Note</span>: Stained gel cannot be used in the subsequent protein transfer procedure.</p>
                                                                                                                                          <div class="row">
                                                                                                                                            <div class="col-lg-8 col-12">
                                                                                                                                              <h3 class="text-capitalize text-orange font-large mb-4 pt-5">(B) Wet Transfer</h3>
                                                                                                                                                <ol class="list-style-numbers ml-4">
                                                                                                                                                  <li class="pt-4">
                                                                                                                                                    <span class="font-weight-bold">Blotting Membrane Preparation</span>
                                                                                                                                                      <ul class="list-style-bullets ml-4 pt-4">
                                                                                                                                                        <li>Cut the blotting membrane (NC or PVDF) according to the size of your gel (Tips: Cut a good supply of membranes in advance! Store in a cool, dry place).</li>
                                                                                                                                                          <li>Carefully mark the membrane orientation by cutting a corner or marking it with a pencil.</li>
                                                                                                                                                            <li>Soak the membrane in methanol for 1 minute.</li>
                                                                                                                                                              <li>Immerse the membrane for 5 minutes in 1X transfer buffer (25 mMTris base, 190 mM glycine and 20% methanol; pH 8.3) (Boster Catalog # AR1149). Rock the membrane gently until it sinks and water no longer beads up on the surface.</li>
                                                                                                                                                              </ul>
                                                                                                                                                            </li>
                                                                                                                                                          </ol>
                                                                                                                                                        </div>
                                                                                                                                                        <div class="col-lg-4 col-12"> <img class="my-5" src="https:
                                                                                                                                                          <!-- TRUNCATED: 49143 chars total — open docs/cms-pages-full-export.tsv row page_id=16 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 18. CMS page (elisa-protocol)

- **Structural hash:** `fa735e3d8b1f6d2d` (for cross-reference)
- **URL prefix:** `elisa-protocol`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `elisa-protocol` (page_id 19) — ELISA Kit Protocol | Bosterbio
- **All identifiers in cluster:** `elisa-protocol`
- **content_heading:** `ELISA Protocols`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<div id="Protocol">
  <div class="sub_heading">
    <strong>Boster ELISA protocol</strong>
    </div>
    <div class="sub_heading">
      <strong>Summary Boster ELISA protocol</strong>
      </div>
      <div class="article_text">
        <ol>
          <li>Prepare standards and samples according to dilution guide. Add 100&micro;l into the wells and incubate the plate for 90mins at 37oC. Do not wash.</li>
            <li>Prepare a working solution of the biotinylated antibody and add 100&micro;l of the solution to the wells. Incubate the plate for 60mins at 37oC. Wash plate following incubation three times with 0.01M TBS.</li>
              <li>Prepare a working solution of the ABC reagent and add 100&micro;l to the wells. Incubate the plate for 30mins at 37oC. Wash plate following incubation five times with 0.01M TBS.</li>
                <li>Add 90&micro;l of TMB to the wells, incubate for 20-25mins.</li>
                  <li>Add 10&micro;l of TMB stop solution to the wells. The plate should be read at 450nm within 30mins.</li>
                  </ol>
                </div>
                <div class="sub_heading">
                  <strong>Boster ELISA protocol</strong>
                    <br /> Reagent Preparation and Storage</div>
                    <div class="sub_heading">
                      <em>(Taking EK0397 human IL-2 as an example)</em>
                      </div>
                      <div class="article_text">
                        <ol class="mainOl">
                          <li>Reconstitution of the standard: standard solution should be prepared no more than 2 hours prior to the experiment. Two tubes of standard (10ng per tube) are included in each kit. Use one tube for each experiment.<ol class="childOl" type="a">
                            <li>10,000pg/ml of human standard solution: Add 1ml sample diluent buffer into one tube, keep the tube at room temperature for 10 min and mix thoroughly.</li>
                              <li>1000pg/ml&rarr;78pg/ml of standard solutions: Label 7Eppendorf tubes with 1000pg/ml, 500pg/ml, 250pg/ml, 125pg/ml, 62.5pg/ml, 31.2pg/ml, 15.6pg/ml&nbsp;respectively. Aliquot 0.3 ml of the sample diluent buffer into each tube. Add 0.3 ml of the above 10, 000pg/ml standard solution into 1st tube and mix. Transfer 0.3 ml from 1st tube to 2nd tube and mix. Transfer 0.3 ml from 2nd tube to 3rd tube and mix, and so on.</li>
                                <li>Note: The standard solutions are best used within 2 hours. The 10ng/ml standard solution should be stored at 4&deg;C for up to 12 hours, or at -20&deg;C for up to 48 hours. Avoid repeated freeze-thaw cycles.</li>
                                </ol>
                              </li>
                              <li>Preparation of biotinylatedantibody working solution: The solution should be prepared no more than 2 hours prior to the experiment.<ol class="childOl" type="a">
                                <li>The total volume should be: 0.1ml/well x (the number of wells). (Allowing 0.1-0.2 ml more than total volume)</li>
                                  <li>Biotinylatedantibody should be diluted in 1:100 with the antibody diluent buffer and mixed thoroughly. (i.e. Add 1&mu;l Biotinylated antibody to 99&mu;l antibody diluent buffer.)</li>
                                  </ol>
                                </li>
                                <li>Preparation of Avidin-Biotin-Peroxidase Complex (ABC) working solution: The solution should be prepared no more than 1 hour prior to the experiment.<ol class="childOl" type="a">
                                  <li>The total volume should be: 0.1ml/well x (the number of wells). (Allowing 0.1-0.2 ml more than total volume)</li>
                                    <li>Avidin- Biotin-Peroxidase Complex (ABC) should be diluted in 1:100 with the ABC dilution buffer and mixed thoroughly. (i.e. Add 1&mu;l ABC to 99&mu;l ABC diluent buffer.)</li>
                                    </ol>
                                  </li>
                                </ol>
                              </div>
                              <div class="sub_heading">Assay Procedure</div>
                                <div class="sub_heading">
                                  <em>(Taking EK0397 human IL-2 as an example)</em>
                                  </div>
                                  <div class="article_text">
                                    <ol class="mainOl" start="4">
                                      <li>The ABC working solution and TMB color developing agent must be kept warm at 37&deg;C for 30 min before use. When diluting samples and reagents, they must be mixed completely and evenly. Standard curve should be prepared for each experiment. The user will decide sample dilution fold by crude estimation of proteinamount in samples.</li>
                                        <li>Aliquot 0.1ml per well of the 1000pg/ml, 500pg/ml, 250pg/ml, 125pg/ml, 62.5pg/ml, 31.2pg/ml, 15.6pg/ml&nbsp;standard solutions into the precoated 96-well plate. Add 0.1ml of the sample diluent buffer into the control well (Zero well). Add 0.1ml of each properly diluted sample of human serum, plasma, body fluids, tissue lysates or cell culture supernatants to each empty well. It is recommended that each standard solution and each sample be measured in duplicate.</li>
                                          <li>Seal the plate with the cover and incubate at 37&deg;C for 90 min.</li>
                                            <li>Remove the cover, discard plate content, and blot the plate onto paper towels or other absorbent material. Do NOT let the wells completely dry at any time.</li>
                                              <li>Add 0.1ml of biotinylatedantibody working solution into each well and incubate the plate at 37&deg;C for 60 min.</li>
                                                <li>Wash plate 3 times with 0.01M TBS or 0.01M PBS, and each time let washing buffer stay in the wells for 1 min. Discard the washing buffer and blot the plate onto paper towels or other absorbent material. (Plate Washing Method: Discard the solution in the plate without touching the side walls. Blot the plate onto paper towels or other absorbent material. Soak each well with at least 0.3 ml PBS or TBS buffer for 1~2 minutes. Repeat this process two additional times for a total of THREE washes. Note: For automated washing, aspirate all wells and wash THREE times with PBS or TBS buffer, overfilling wells with PBS or TBS buffer. Blot the plate onto paper towels or other absorbent material.)</li>
                                                  <li>Add 0.1ml of prepared ABC working solution into each well and incubate the plate at 37&deg;C for 30 min.</li>
                                                    <li>Wash plate 5 times with 0.01M TBS or 0.01M PBS, and each time let washing buffer stay in the wells for 1-2 min. Discard the washing buffer and blot the plate onto paper towels or other absorbent material. (See Step 5 for plate washing method).</li>
                                                      <li>Add 90&mu;l of prepared TMB color developing agent into each well and incubate plate at 37&deg;C in dark for 15-20 min (Note: For reference only, the optimal incubation time should be determined by end user. And the shades of blue can be seen in the wells with the four most concentrated solutions; the other wells show no obvious color).</li>
                                                        <li>Add 0.1ml of prepared TMB stop solution into each well. The color changes into yellow immediately.</li>
                                                          <li>Read the O.D. absorbance at 450nm in a microplate reader within 30 min after adding the stop solution.</li>
                                                          </ol>
                                                        </div>
                                                      </div>
                                                      <div id="Principle">
                                                        <div class="sub_heading">
                                                          <strong>ELISA Principle</strong>
                                                          </div>
                                                          <div class="sub_heading">
                                                            <strong>1. Principle</strong>
                                                            </div>
                                                            <div class="article_text" style="padding-left: 10px;">Enzyme-linked immunosorbent assay (ELISA) is based on antigen immobilization and enzyme labeling of antibody. Antigen immobilized on a solid support keep its immunological activity while enzyme conjugated antibody retains immunological activity as well as enzyme activity. Target antigen in the sample binds to antibody on a solid support. Antigen-antibody complex is separated with other substances by washing. Then enzyme conjugated antibody is immobilized on the solid support by reacting with the antigen. And enzyme attached on the solid support is in proportion to the amount of antigen in the sample. A substrate for the enzyme is applied, and catalysis by the enzyme leads to a change in color, which indicates the amount of target antigen. Therefore, in ELISA test, the reaction is measurable in both qualitative and quantitative according to the intensity of the color. ELISA is equipped with high sensitivity quality by taking advantage of high catalytic efficiency of the enzyme which amplifies immunoreaction signal.</div>
                                                              <div class="sub_heading">
                                                                <strong>2. Types</strong>
                                                                </div>
                                                                <div class="article_text" style="padding-left: 10px;">ELISA can be performed to evaluate either the presence of antigen or the presence of antibody in a sample. Various ELISA types are designed based on a range of factors, such as source of reagents, sample status as well as specific test conditions. ELISA test applied for clinical diagnosis contains mainly sandwich ELISA, indirect ELISA and competitive ELISA,etc.</div>
                                                                  <div class="sub_heading">
                                                                    <strong>3. Boster ELISA kit Components:</strong>
                                                                    </div>
                                                                    <div class="article_text">
                                                                      <ol class="childOl">
                                                                        <li>ELISA plate precoated with antibody</li>
                                                                          <li>Biotinylated antibody</li>
                                                                            <li>Standard</li>
                                                                              <li>Avidin-Biotin-Peroxidase Complex(ABC)</li>
                                                                                <li>Sample dilute buffer</li>
                                                                                  <li>Antibody diluent buffer</li>
                                                                                    <li>ABC diluent buffer</li>
                                                                                      <li>TMB color developing agent</li>
                                                                                        <li>TMB stop solution</li>
                                                                                        </ol>
                                                                                      </div>
                                                                                      <div class="sub_heading">
                                                                                        <strong>4. Protocol</strong>
                                                                                        </div>
                                                                                        <div class="article_text" style="padding-left: 10px;">
                                                                                          <em>(Taking EK0397 human IL-2 as an example)</em>
                                                                                            <br />Boster ELISA kit is based on sandwich ELISA which is the most popular way for antigen or antibody detection. The ABC working solution and TMB color developing agent must be kept warm at 37&deg;C for 30 min before use. When diluting samples and reagents, they must be mixed completely and evenly. Standard curve should be prepared for each experiment. The user will decide sample dilution fold by crude estimation of target amount in samples.<ol class="childOl">
                                                                                            <li>Calculating the amount of wells precoated with antibody, and adding one blank well as control. Total amount=the amount of sample wells+9. Duplicate the amount while do double assay. Wrap other unused wells and place them into refrigerator.</li>
                                                                                              <li>Aliquot 0.1ml per well of the 1000pg/ml, 500pg/ml, 250pg/ml, 125pg/ml, 62.5pg/ml, 31.2pg/ml, 15.6pg/ml human IL-2 standard solutions into the precoated 96-well plate. Add 0.1ml of the sample diluent buffer into the control well (Zero well). Add 0.1ml of each properly diluted sample of human cell culture supernates, serum or plasma( heparin, EDTA, citrate) to each empty well. See &ldquo;Sample Dilution Guideline&rdquo; above for details. It is recommended that each human IL-2 standard solution and each sample be measured in duplicate.</li>
                                                                                                <li>Seal the plate with the cover and incubate at 37&deg;C for 90 min.</li>
                                                                                                  <li>Remove the cover, discard plate content, and blot the plate onto paper towels or other absorbent material. Do NOT let the wells completely dry at any time.</li>
                                                                                                    <li>Add 0.1ml of biotinylated anti-human IL-2 antibody working solution into each well and incubate the plate at 37&deg;C for 60 min.</li>
                                                                                                      <li>Wash plate 3 times with 0.01M TBS or 0.01M PBS, and each time let washing buffer stay in the wells for 1 min. Discard the washing buffer and blot the plate onto paper towels or other absorbent material. (Plate Washing Method: Discard the solution in the plate without touching the side walls. Blot the plate onto paper towels or other absorbent material. Soak each well with at least 0.3 ml PBS or TBS buffer for 1~2 minutes. Repeat this process two additional times for a total of THREE washes. Note: For automated washing, aspirate all wells and wash THREE times with PBS or TBS buffer, overfilling wells with PBS or TBS buffer. Blot the plate onto paper towels or other absorbent material.)</li>
                                                                                                        <li>Add 0.1ml of prepared ABC working solution into each well and incubate the plate at 37&deg;C for 30 min.</li>
                                                                                                          <li>Wash plate 5 times with 0.01M TBS or 0.01M PBS, and each time let washing buffer stay in the wells for 1-2 min. Discard the washing buffer and blot the plate onto paper towels or other absorbent material. (See Step 5 for plate washing method).</li>
                                                                                                            <li>Add 90&mu;l of prepared TMB color developing agent into each well and incubate plate at 37&deg;C in dark for 25-30 min (Note: For reference only, the optimal incubation time should be determined by end user. And the shades of blue can be seen in the wells with the four most concentrated human IL-2 standard solutions; the other wells show no obvious color).</li>
                                                                                                              <li>Add 0.1ml of prepared TMB stop solution into each well. The color changes into yellow from blue immediately.</li>
                                                                                                                <li>Read the O.D. absorbance at 450nm in a microplate reader within 30 min after adding the stop solution. For calculation, (the relative O.D.450) = (the O.D.450 of each well) &ndash; (the O.D.450 of Zero well). The standard curve can be plotted as the relative O.D.450 of each standard solution (Y) vs. the respective concentration of the standard solution (X). The human IL-2 concentration of the samples can be interpolated from the standard curve. Note: if the samples measured were diluted, multiply the dilution factor to the concentrations from interpolation to obtain the concentration before dilution.</li>
                                                                                                                </ol>
                                                                                                                <div class="article_text">
                                                                                                                  <div class="sub_heading">
                                                                                                                    <strong>5. Highlights</strong>
                                                                                                                    </div>
                                                                                                                    <div class="article_text" style="padding-left: 10px;">Accurate ELISA test result is guaranteed by Superior Reagents , fine instruments and proper operation.</div>
                                                                                                                      <div class="sub_heading" style="padding-left: 10px;">Reagents preparation and storage</div>
                                                                                                                        <div class="article_text" style="padding-left: 10px;">Prepare reagents as described in the datasheet inserted in the ELISA kit. Distilled water or deionized water used in the whole ELISA test should be fresh and superior. PH meter is recommended to measure and calibrate self-made buffer solution. Heat the reagents which are taken out from refrigerator to room temperature before use. Reagents that are not used for the assay should be stored in refrigerator immediately</div>
                                                                                                                          <div class="sub_heading" style="padding-left: 10px;">Adding sample</div>
                                                                                                                            <div class="article_text" style="padding-left: 10px;">Samples should be added to the bottom of wells to avoid splashing and bubbles. Finnpipette is recommended to be applied to add sample in specific amount. Suction nozzle should be changed every single time to avoid cross contamination. Disposable quantitative plastic tube could be used alternatively. Serum should be diluted in specific dilution ratio in tube before adding samples if diluted serum needs to be involved in the assay, like as in indirect ELISA. While adding enzyme conjugate complex solution and substrate solution, multi-channel peptide could be applied to facilitate reagents adding.</div>
                                                                                                                              <div class="sub_heading" style="padding-left: 10px;">Incubati
                                                                                                                                <!-- TRUNCATED: 17020 chars total — open docs/cms-pages-full-export.tsv row page_id=19 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 19. CMS page (elisa-troubleshooting)

- **Structural hash:** `b6205aaede468dfc` (for cross-reference)
- **URL prefix:** `elisa-troubleshooting`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `elisa-troubleshooting` (page_id 20) — ELISA Kit Troubleshooting, ELISA Test Kits | Antibody Company
- **All identifiers in cluster:** `elisa-troubleshooting`
- **content_heading:** `NULL`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<div class="sub_heading">
  <strong>ELISA trouble shooting guide</strong>
  </div>
  <div class="sub_heading">Poor standard curve</div>
    <div class="article_text">
      <table class="tableArticle">
        <tbody>
          <tr>
            <th width="40%">Possible source</th>
              <th width="60%">Recommended solution</th>
              </tr>
              <tr>
                <td>Improper standard dilution</td>
                  <td>Ensure use of appropriate diluent and confirm dilutions are made correctly</td>
                  </tr>
                  <tr>
                    <td>Standard and sample use error</td>
                      <td>Standard and sample must be added into wells within the period from 15min to 20min</td>
                      </tr>
                      <tr>
                        <td>Incomplete washing of wells</td>
                          <td>Confirm that wash apparatus is working correctly and each well is throughly washed but not dry</td>
                          </tr>
                          <tr>
                            <td>Pipetting error</td>
                              <td>Ensure that pipettes is working correctly and equal volumes are added to wells</td>
                              </tr>
                              <tr>
                                <td>Reagents contamination</td>
                                  <td>Stored involved reagents as recommended</td>
                                  </tr>
                                  <tr>
                                    <td>Waiting too long to read plate after adding Stop solution</td>
                                      <td>Read plate immediately after adding Stop solution</td>
                                      </tr>
                                      <tr>
                                        <td>Curve doesn't fit scale</td>
                                          <td>Try plotting using different scale</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div class="sub_heading">Poor Precision</div>
                                      <div class="article_text">
                                        <table class="tableArticle">
                                          <tbody>
                                            <tr>
                                              <th width="40%">Possible source</th>
                                                <th width="60%">Recommended solution</th>
                                                </tr>
                                                <tr>
                                                  <td>Incomplete washing of wells</td>
                                                    <td>Confirm that wash apparatus is working correctly and each well is throughly washed but not dry</td>
                                                    </tr>
                                                    <tr>
                                                      <td>Pipetting error</td>
                                                        <td>Ensure that pipettes is working correctly and equal volumes are added to wells</td>
                                                        </tr>
                                                        <tr>
                                                          <td>Unequal mixing of reagents</td>
                                                            <td>Ensure adequate mixing when multiple reagents are added into the same well</td>
                                                            </tr>
                                                            <tr>
                                                              <td>Repeated use of plate cover</td>
                                                                <td>Ensure the use of new plate cover</td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </div>
                                                          <div class="sub_heading">Inadequate Color Development</div>
                                                            <div class="article_text">
                                                              <table class="tableArticle">
                                                                <tbody>
                                                                  <tr>
                                                                    <th width="40%">Possible source</th>
                                                                      <th width="60%">Recommended solution</th>
                                                                      </tr>
                                                                      <tr>
                                                                        <td>Inadequate volume of reagents added to wells</td>
                                                                          <td>Ensure that pipettes is working correctly and ensure adequate volume of substrate added to wells</td>
                                                                          </tr>
                                                                          <tr>
                                                                            <td>Incorrect incubation times or temperatures</td>
                                                                              <td>Follow recommended incubation times and temperatures</td>
                                                                              </tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </div>
                                                                        <div class="sub_heading">Edge Effects</div>
                                                                          <div class="article_text">
                                                                            <table class="tableArticle">
                                                                              <tbody>
                                                                                <tr>
                                                                                  <th width="40%">Possible source</th>
                                                                                    <th width="60%">Recommended solution</th>
                                                                                    </tr>
                                                                                    <tr>
                                                                                      <td>Uneven temperature around working enviroment</td>
                                                                                        <td>Follow recommended incubation periods and temperatures</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                          <td>Inappropriate fixing of plate</td>
                                                                                            <td>cover Ensure correct use of plate cover</td>
                                                                                            </tr>
                                                                                          </tbody>
                                                                                        </table>
                                                                                      </div>
                                                                                      <div class="sub_heading">Drift</div>
                                                                                        <div class="article_text">
                                                                                          <table class="tableArticle">
                                                                                            <tbody>
                                                                                              <tr>
                                                                                                <th width="40%">Possible source</th>
                                                                                                  <th width="60%">Recommended solution</th>
                                                                                                  </tr>
                                                                                                  <tr>
                                                                                                    <td>Inconsistent assay set up</td>
                                                                                                      <td>Assay set-up should be continuous</td>
                                                                                                      </tr>
                                                                                                      <tr>
                                                                                                        <td>Incorrect incubation times or temperatures</td>
                                                                                                          <td>Follow recommended incubation times and temperatures</td>
                                                                                                          </tr>
                                                                                                        </tbody>
                                                                                                      </table>
                                                                                                    </div>
                                                                                                    <div class="sub_heading">Low signal</div>
                                                                                                      <div class="article_text">
                                                                                                        <table class="tableArticle">
                                                                                                          <tbody>
                                                                                                            <tr>
                                                                                                              <th width="40%">Possible source</th>
                                                                                                                <th width="60%">Recommended solution</th>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                  <td>Target present below detection limits of assay</td>
                                                                                                                    <td>Decrease dilution factor of sample or concentrate samples</td>
                                                                                                                    </tr>
                                                                                                                  </tbody>
                                                                                                                </table>
                                                                                                              </div>
                                                                                                              <div class="sub_heading">Large coefficient of variation (CV)</div>
                                                                                                                <div class="article_text">
                                                                                                                  <table class="tableArticle">
                                                                                                                    <tbody>
                                                                                                                      <tr>
                                                                                                                        <th width="40%">Possible source</th>
                                                                                                                          <th width="60%">Recommended solution</th>
                                                                                                                          </tr>
                                                                                                                          <tr>
                                                                                                                            <td>Bubbles in wells</td>
                                                                                                                              <td>Ensure no bubbles present prior to reading plate</td>
                                                                                                                              </tr>
                                                                                                                              <tr>
                                                                                                                                <td>Incomplete washing of wells</td>
                                                                                                                                  <td>Confirm that wash apparatus is working correctly and each well is throughly washed but not dry</td>
                                                                                                                                  </tr>
                                                                                                                                  <tr>
                                                                                                                                    <td>Incomplete reagent mixing</td>
                                                                                                                                      <td>Ensure all reagents are mixed thoroughly</td>
                                                                                                                                      </tr>
                                                                                                                                      <tr>
                                                                                                                                        <td>Pipetting error</td>
                                                                                                                                          <td>Ensure that pipettes is working correctly and equal volumes are added to wells</td>
                                                                                                                                          </tr>
                                                                                                                                          <tr>
                                                                                                                                            <td>Edge effects</td>
                                                                                                                                              <td>Follow recommended incubation periods and temperatures</td>
                                                                                                                                              </tr>
                                                                                                                                              <tr>
                                                                                                                                                <td>Interrupted sample preparation</td>
                                                                                                                                                  <td>Ensure consistent sample preparation</td>
                                                                                                                                                  </tr>
                                                                                                                                                </tbody>
                                                                                                                                              </table>
                                                                                                                                            </div>
                                                                                                                                            <div class="sub_heading">High background</div>
                                                                                                                                              <div class="article_text">
                                                                                                                                                <table class="tableArticle">
                                                                                                                                                  <tbody>
                                                                                                                                                    <tr>
                                                                                                                                                      <th width="40%">Possible source</th>
                                                                                                                                                        <th width="60%">Recommended solution</th>
                                                                                                                                                        </tr>
                                                                                                                                                        <tr>
                                                                                                                                                          <td>Incomplete washing of wells</td>
                                                                                                                                                            <td>Confirm that wash apparatus is working correctly and each well is throughly washed but not dry</td>
                                                                                                                                                            </tr>
                                                                                                                                                            <tr>
                                                                                                                                                              <td>Reagents contamination</td>
                                                                                                                                                                <td>Stored involved reagents as recommended</td>
                                                                                                                                                                </tr>
                                                                                                                                                                <tr>
                                                                                                                                                                  <td>Waiting too long to read plate after adding STOP solution</td>
                                                                                                                                                                    <td>Read plate immediately after adding STOP solution</td>
                                                                                                                                                                    </tr>
                                                                                                                                                                  </tbody>
                                                                                                                                                                </table>
                                                                                                                                                              </div>
                                                                                                                                                              <div class="sub_heading">Low sensitivity</div>
                                                                                                                                                                <div class="article_text">
                                                                                                                                                                  <table class="tableArticle">
                                                                                                                                                                    <tbody>
                                                                                                                                                                      <tr>
                                                                                                                                                                        <th width="40%">Possible source</th>
                                                                                                                                                                          <th width="60%">Recommended solution</th>
                                                                                                                                                                          </tr>
                                                                                                                                                                          <tr>
                                                                                                                                                                            <td>Too little target</td>
                                                                                                                                                                              <td>Concentrate sample or reduce sample dilution factor</td>
                                                                                                                                                                              </tr>
                                                                                                                                                                              <tr>
                                                                                                                                                                                <td>Plate reading error</td>
                                                                                                                                                                                  <td>Ensure plate reader set correctly to read proper OD or wavelength</td>
                                                                                                                                                                                  </tr>
                                                                                                                                                                                </tbody>
                                                                                                                                                                              </table>
                                                                                                                                                                            </div>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 20. Protocol / troubleshooting guide

- **Structural hash:** `305eeba42292a9e7` (for cross-reference)
- **URL prefix:** `protocol-and-troubleshooting`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `protocol-and-troubleshooting/ihc-protocol` (page_id 21) — IHC Protocols | Antibody Company, Buy Antibodies Online
- **All identifiers in cluster:** `protocol-and-troubleshooting/ihc-protocol`
- **content_heading:** `Protocols and Troubleshooting`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<style type="text/css">
  .mainbox {
  position: relative;
  }
  .buttonbottom {
  position: absolute;
  bottom: 15px;
  right: 15px;
  left: 15px;
  }
</style>
<section class="mb-6 text-center hero-section" id="ihc-p-protocol-hero" style=" background-image: url(https://SITE_ORIGIN_PLACEHOLDER);">
  <div class="dark-overlap">
    <h1 class="mb-2">IHC Protocols</h1>
      <p class="font-large mb-4">We provide the step-by-step protocols for IHC-P, IHC-F, and ICC/IF to help you improve your assay performance and obtain clear result images.</p>
      </div>
    </section>
    <section id="introduction single-column content-section" class="mb-6">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="topic-heading text-orange font-larger font-weight-bold typography-josefin-sans mb-3">
              Overview of IHC Protocols</h2>
              <p>Boster Bio provides step-by-step protocols for IHC-Paraffin (IHC-P), IHC-Frozen (IHC-F), and Immunocytochemistry/Immunofluorescence (ICC/IF) to support high-quality staining outcomes. These protocols cover sample preparation, reagent handling, and staining workflows.</p>
                <br>
                <h3 class="text-orange font-large mb-4">Boster Protocols for IHC</h3>
                  <p>Standardization is one of the most challenging aspects for the implementation of successful biospecimen staining. In an effort to accelerate your immunostaining of tissue sections and cell climbing slices, we have developed and validated our step-by-step IHC/ICC/IF protocols to cover biospecimen preparation and assay procedures. We believe these protocols will be a useful resource for your staining workflow or at least a good starting point for further protocol optimization if necessary. For each of the protocols, we also provide a summary flow chart with the applicable Boster’s reagents to enhance your product search on our website.</p>
                  </div>
                </div>
              </div>
            </section>
            <section class="mb-6 p-3 bg-darkgrey cta-section">
              <div class="container">
                <div class="row">
                  <div class="col-lg-8 col-12">
                    <h3 class="font-large">Best Practices for IHC Protocols</h3>
                      <p>Get a unique combination of service quality, subject expertise and cost savings, when it comes to <a href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/ihc-histology-services" style="color:#fefefe">IHC service</a>.</p>
                      </div>
                      <div class="col-lg-4 col-12 vertical-center">
                        <a href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/ihc-histology-services" class="btn-outline-white btn-full-width">Learn more about IHC CRO Services!</a>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section id="introduction single-column content-section" class="mb-6">
                    <div class="container">
                      <div class="row">
                        <div class="col-12">
                          <h2 class="topic-heading text-orange text-center font-larger font-weight-bold typography-josefin-sans mb-3">IHC-Paraffin (IHC-P) Workflow Overview</h2>
                            <p class="text-grey text-center w-75 mx-auto mb-5 font-medium">Boster manufactures IHC reagents that are used in our own validation processes. See the IHC protocol below with available Boster products highlighted.</p>
                              <div class="horizontal-center">
                                <img src="https://SITE_ORIGIN_PLACEHOLDER/media/images/blogs/1-lHC-P-protocol.jpg" alt="IHC-P protocol for paraffin-embedded tissue" loading="lazy">
                              </div>
                              <p class="text-center">
                                <strong>IHC Workflow (Paraffin-Embedded Sections) with Applicable Boster Reagents</strong>
                                </p>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section class="mb-6 p-3 bg-orange cta-section">
                          <div class="container">
                            <div class="row vertical-center">
                              <div class="col-lg-8 col-12">
                                <h3 class="font-large">Boster IHC Reagents</h3>
                                  <p class="mb-0">You can save up to <span class="font-large">90%</span> on the above reagents if you buy them from Boster Bio</p>
                                  </div>
                                  <div class="col-lg-4 col-12">
                                    <a href="https://SITE_ORIGIN_PLACEHOLDER/immunohistochemistry-ihc-reagents" class="btn-outline-white btn-full-width">Browse IHC reagents and kits</a>
                                    </div>
                                  </div>
                                </div>
                              </section>
                              <section class="mb-6 topic-heading-section">
                                <div class="container">
                                  <div class="row">
                                    <div class="col-12">
                                      <h2 class="topic-heading text-orange text-center font-larger font-weight-bold typography-josefin-sans mb-3">IHC-P Protocol Details</h2>
                                        <p class="text-grey text-center w-75 mx-auto mb-5 font-medium">Step-by-step guide for IHC-P protocol with reagent recommendations</p>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                  <section class="mb-6 workflow-section">
                                    <div class="container">
                                      <div class="row">
                                        <div class="col-md-12">
                                          <div class="timeline-bubbles">
                                            <ul>
                                              <li>
                                                <h3 class="text-gray font-large mb-4">Tissue Preparation</h3>
                                                  <div class="accordion" id="FAQs">
                                                    <h3 class="font-medium m-0 p-3 bg-lightgrey border-bottom">
                                                      <a href="#" class="d-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true">Paraformaldehyde Cooling And Dehydration</a>
                                                      </h3>
                                                      <div id="collapseOne" class="collapse show" data-parent="#FAQs" style="">
                                                        <div class="p-4 bg-white">
                                                          <ul class="list-style-bullets font-small">
                                                            <li>Harvest fresh tissue and place it in a dish filled with ice-cold PBS buffer </li>
                                                              <li>Wash the tissue thoroughly with PBS to remove blood (Use forceps to remove connective tissues)</li>
                                                                <li>Cut the tissue into slices of thickness of 3 mm or less</li>
                                                                  <li>Immerse the slices in <a class="text-orange" target="_blank" href="https://SITE_ORIGIN_PLACEHOLDER/4-paraformaldehyde-pfa-solution-in-pbs-ar1068-boster.html">4% Paraformaldehyde</a> at room temperature for 8 min</li>
                                                                    <li>Immerse the slices in <a class="text-orange" target="_blank" href="https://SITE_ORIGIN_PLACEHOLDER/4-paraformaldehyde-pfa-solution-in-pbs-ar1068-boster.html">4% Paraformaldehyde</a> (pre-cool at 4°C) for 6 to 7 hrs. The paraformaldehyde volume should be 20X greater than the tissue volume by weight</li>
                                                                      <li>Wash the tissue 3X with PBS (1 min each)</li>
                                                                        <li>Dehydrate the tissue by immersing the tissue sequentially as follows:
                                                                          <ul class="list-style-circles mt-4">
                                                                            <li>Immerse the tissue in 70% ethanol overnight (around 15hours) at room temperature.</li>
                                                                              <li>Immerse the tissue in 75% ethanol two times for 30 minutes each at room temperature.</li>
                                                                                <li>Immerse the tissue in 85% ethanol two times for 30 minutes each at room temperature.</li>
                                                                                  <li>Immerse the tissue in 95% ethanol two times for 30 minutes each at room temperature.</li>
                                                                                    <li>Immerse the tissue in 100% ethanol two times for 30 minutes each at room temperature.</li>
                                                                                    </ul>
                                                                                  </li>
                                                                                </ul>
                                                                              </div>
                                                                            </div>
                                                                            <h3 class="font-medium m-0 p-3 bg-lightgrey border-bottom">
                                                                              <a href="#" class="d-block collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false">Liquid Paraffin Sectioning</a>
                                                                              </h3>
                                                                              <div id="collapseTwo" class="collapse" data-parent="#FAQs" style="">
                                                                                <div class="p-4">
                                                                                  <ul class="list-style-bullets font-small">
                                                                                    <li>Prepare the first portion of liquid paraffin in a suitable bath and allow the paraffin to reach and maintain at 60°C</li>
                                                                                      <li>Immerse the tissue 2X into the paraffin bath (2 hrs each)</li>
                                                                                        <li>Prepare the second portion of liquid paraffin in a suitable bath and allow the paraffin to reach and maintain at 60°C</li>
                                                                                          <li>Pour the second portion of paraffin into a mold</li>
                                                                                            <li>Quickly transport the tissue from the paraffin bath to the mold with paraffin</li>
                                                                                              <li>Incubate the tissue at room temperature until it coagulates</li>
                                                                                                <li>Store the tissue at 4°C</li>
                                                                                                </ul>
                                                                                              </div>
                                                                                            </div>
                                                                                            <h3 class="font-medium m-0 p-3 bg-lightgrey border-bottom">
                                                                                              <a href="#" class="d-block collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false">Section Slicing And Incubation</a>
                                                                                              </h3>
                                                                                              <div id="collapseThree" class="collapse" data-parent="#FAQs" style="">
                                                                                                <div class="p-4 bg-white">
                                                                                                  <ul class="list-style-bullets font-small">
                                                                                                    <li>Secure the paraffin section on slicer</li>
                                                                                                      <li>Slice one to two pieces of section to adjust the slicer so that the section and blade are parallel</li>
                                                                                                        <li>Slice the remaining section carefully with ~5 µm thick</li>
                                                                                                          <li>Incubate the sliced section in 40 to 50°C water to unfold</li>
                                                                                                            <li>Mount the tissue section onto Poly-Lysine or APES coated glass slides</li>
                                                                                                              <li>Incubate the slides overnight at 37°C</li>
                                                                                                              </ul>
                                                                                                            </div>
                                                                                                          </div>
                                                                                                        </div>
                                                                                                        <p class="mt-4 font-small">
                                                                                                          <span class="font-weight-bold">Note:</span> This fixation procedure using paraformaldehyde and formalin fixatives may cause autofluorescence in the green spectrum. In this case, you may try fluorophores in the (i) red range or (ii) infrared range if you have an infrared detection system.</p>
                                                                                                          </li>
                                                                                                          <li>
                                                                                                            <h3 class="text-gray font-large mb-4">Dewaxing/Deparaffinization</h3>
                                                                                                              <p class="font-weight-bold">Prepare the following reagents:</p>
                                                                                                                <ul class="pl-5 list-style-bullets font-small">
                                                                                                                  <li>Immerse the slides in xylene 2 times for 10 minutes each.</li>
                                                                                                                    <li>Immerse the slides in 100% ethanol 2 times for 10 minutes each.</li>
                                                                                                                      <li>Immerse the slides in 95% ethanol for 5 minutes.</li>
                                                                                                                        <li>Immerse the slides in 70% ethanol for 5 minutes.</li>
                                                                                                                          <li>Immerse the slides in 50% ethanol for 5 minutes.</li>
                                                                                                                            <li>Rinse the slides with running cold tap water. Drain the excess water.</li>
                                                                                                                            </ul>
                                                                                                                            <div>
                                                                                                                              <span style="font-size: 12px;">
                                                                                                                                <br>
                                                                                                                              </span>
                                                                                                                            </div>
                                                                                                                            <ul class="pl-5 list-style-bullets font-small">
                                                                                                                            </ul>
                                                                                                                            <p class="mb-5 font-small">To quench endogenous peroxidase activity, incubate the tissue with peroxidase reagent (1:10 30%H2O2: water) for 10 minutes at room temperature. Wash the slides with distilled water three times.</p>
                                                                                                                            </li>
                                                                                                                            <li>
                                                                                                                              <h3 class="text-gray font-large mb-4">Inactivation</h3>
                                                                                                                                <p class="text-grey font-small">Used Products: 3% Hydrogen Peroxide</p>
                                                                                                                                  <ul class="mb-5 pl-5 list-style-bullets font-small">
                                                                                                                                    <li>Immerse dewaxed paraffin section into the 3% H<sub>2</sub>O<sub>2</sub> at room temperature for 10 min</li>
                                                                                                                                      <li>Wash the section 3X to 5X with distilled water (total 3 to 5 min)</li>
                                                                                                                                      </ul>
                                                                                                                                    </li>
                                                                                                                                    <li>
                                                                                                                                      <h3 class="text-gray font-large mb-4">Antigen Retrieval (Heat Induced Epitope Retrieval: HIER)</h3>
                                                                                                                                        <p class="text-grey font-small">Used Products: <a href="https://SITE_ORIGIN_PLACEHOLDER/citrate-buffer-ar0024-boster.html" target="_blank" class="text-orange">Citrate Buffer Powder</a> , EDTA</p>
                                                                                                                                          <p class="mb-5 font-small">Heat-induced epitope retrieval: Immerse the slides in antigen retrieval buffer (EDTA buffer, pH 8.0). Microwave the solution at Medium-high power for 8 minutes. Cool the slides for 5 minutes. Then microwave the solution at High power for 4 minutes. Cool the slides to room temperature.</p>
                                                                                                                                            <br>
                                                                                                                                            <p>
                                                                                                                                            </p>
                                                                                                                                            <ul class="pl-5 mb-5 list-style-bullets font-small">
                                                                                                                                            </ul>
                                                                                                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/ihc-optimization/antigen-retrieval" class="btn-orange d-inline-block">Read on how you can effectively select the right antigen retrieval method</a>
                                                                                                                                            </li>
                                                                                                                                            <li>
                                                                                                                                              <h3 class="text-gray font-large mb-4">Blocking</h3>
                                                                                                                                                <p class="text-grey font-small">Used Products: Normal Rabbit Serum</p>
                                                                                                                                                  <ul class="pl-5 mb-5 list-style-bullets font-small">
                                                                                                                                                    <li>Add 5% BSA blocking solution or normal goat serum to the HIER treated samples</li>
                                                                                                                                                      <li>Incubate the samples at 37°C for 30 min</li>
                                                                                                                                                        <li>Discard extra liquid (No washing required)</li>
                                                                                                                                                        </ul>
                                                                                                                                                      </li>
                                                                                                                                                      <li>
                                                                                                                                                        <h3 class="text-gray font-large mb-4">Primary Antibody Incubation</h3>
                                                                                                                                                          <p class="text-grey font-small">Used Products: <a href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-buffer-ar1106-2-boster.html" target="_blank" class="text-orange">Antibody Diluent</a> ,PBS Buffer</p>
                                                                                                                                                            <ul class="pl-5 mb-5 list-style-bullets font-small">
                                                                                                                                                              <li>Dilute primary antibody with <a href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-buffer-ar1106-2-boster.html" target="_blank" class="text-orange">antibody diluent</a> to the concentration recommended by the antibody manufacturer</li>
                                                                                                                                                                <li>Add the diluted antibody to the samples and incubate overnight at 4℃ or at 37℃ for 1 hour</li>
                                                                                                                                                                  <li>Wash the samples 2X with PBS (20 min each)</li>
                                                                                                                                                                  </ul>
                                                                                                                                                                </li>
                                                                                                                                                                <li>
                                                                                                                                                                  <h3 class="text-gray font-large mb-4">Secondary Antibody Incubation</h3>
                                                                                                                                                                    <p class="text-grey font-small">Used Products: <a href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-buffer-ar1106-2-boster.html" target="_blank" class="text-orange">Antibody Diluent</a> </p>
                                                                                                                                                                      <ul class="pl-5 mb-5 list-style-bullets font-small">
                                                                                                                                                                        <li>Dilute biotinylated secondary antibody with <a href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-buffer
                                                                                                                                                                          <!-- TRUNCATED: 42072 chars total — open docs/cms-pages-full-export.tsv row page_id=21 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 21. CMS page (technical-support)

- **Structural hash:** `eb74f53dcfb4f687` (for cross-reference)
- **URL prefix:** `technical-support`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `technical-support` (page_id 22) — Tech Support | Antibody Company, Buy Antibodies, ELISA Kits
- **All identifiers in cluster:** `technical-support`
- **content_heading:** `NULL`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<div class="col-lg-12 faq">
  <h1>
    <span style="font-size: medium;">FAQs. For more technical support, check the&nbsp;Resources section</span>
    </h1>
    <h3>Do our BDNF elisas detecting pro-BDNF?</h3>
      <p>Our ELISAS as do all ELISAs using antibodies made to mature BDNF will detect both mature BDNF and pro-BDNF.</p>
      </div>
      <div class="col-lg-12 faq">
        <h3>What are the UPA values in normal human?</h3>
          <p>Please refer to the journal articles listed at <a href="https://misuse.ncbi.nlm.nih.gov/error/abuse.shtml?orig_args=/&orig_host=www.ncbi.nlm.nih.govpubmed/17094916">https://misuse.ncbi.nlm.nih.gov/error/abuse.shtml?orig_args=/&orig_host=www.ncbi.nlm.nih.govpubmed/17094916</a>
          </p>
        </div>
        <div class="col-lg-12 faq">
          <h3>BA1088-1- Could you please indicate the suggested working dilutions for Immunofluorescence?</h3>
            <p>We recommend working dilution for Immunohistochemistry in frozen section at 1:100 to 1:500 and for Immunohistochemistry in paraffin section at 1:100 to 1:200.</p>
              <table>
                <tbody>
                  <tr>
                    <td>Lyophilized recombinant standard: 10ng/tubex2.</td>
                      <td>20ng sodium azide, 10ng Thimerosal/vial</td>
                      </tr>
                      <tr>
                        <td>One 96-well plate precoated antibody</td>
                          <td>20ng sodium azide, 10ng Thimerosal per well</td>
                          </tr>
                          <tr>
                            <td>Sample diluent buffer: 30 ml</td>
                              <td>0.02% sodium azide, 0.01% Thimerosal</td>
                              </tr>
                              <tr>
                                <td>Biotinylated antibody: 130&mu;l, dilution 1:100.</td>
                                  <td>0.02% sodium azide, 0.01% Thimerosal</td>
                                  </tr>
                                  <tr>
                                    <td>Antibody diluent buffer: 12ml.</td>
                                      <td>0.02% sodium azide, 0.01% Thimerosal</td>
                                      </tr>
                                      <tr>
                                        <td>ABC Complex : 130&mu;l, dilution 1:100.</td>
                                          <td>0.02% sodium azide, 0.01% Thimerosal</td>
                                          </tr>
                                          <tr>
                                            <td>ABC diluent buffer: 12ml.</td>
                                              <td>0.02% sodium azide, 0.01% Thimerosal</td>
                                              </tr>
                                              <tr>
                                                <td>TMB color developing agent: 10ml.</td>
                                                  <td>-</td>
                                                  </tr>
                                                  <tr>
                                                    <td>TMB stop solution: 10ml.</td>
                                                      <td>2n sulfuric acid</td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                                <div class="col-lg-12 faq">
                                                  <h3>What is the acid in the stop solution for TMB in ELISA kits?</h3>
                                                    <p>2N sulphuric acid</p>
                                                    </div>
                                                    <div class="col-lg-12 faq">
                                                      <h3>Do you have some recommendations about the culture media volume to use and/or the cell number to culture in order to use the kits?</h3>
                                                        <p>The recommended cell concentration is 106/ml (1,000,000/ml).</p>
                                                        </div>
                                                        <div class="col-lg-12 faq">
                                                          <h3>What are the values of GDNF,NGF, &amp; NT-3 in serum?</h3>
                                                            <p>GDNF in serum: 570-810pg/ml.<br /> NGF in serum: 120-209pg/ml.<br /> NT-3 in serum: 400-2916pg/ml.</p>
                                                            </div>
                                                            <div class="col-lg-12 faq">
                                                              <h3>EK0751, what is the recombinant protein sequence?</h3>
                                                                <p>Recombinant protein derived from NSO,T25 - H205</p>
                                                                </div>
                                                                <div class="col-lg-12 faq">
                                                                  <h3>Our manual for the kit recommends that the blood be collected in heparin tube. I did see your note saying sodium or EDTA tubes are not recommended. But most of my customer's blood collection was done in 3.8% sodium citrate tube. Can they still use their samples collected in sodium citrate tube. Will this interfere with the results?</h3>
                                                                    <p>Because EDTA and citrate have chelating properties, they will bind ACE and affect the assay result, the samples collected in sodium citrate tube are not recommended to use.</p>
                                                                    </div>
                                                                    <div class="col-lg-12 faq">
                                                                      <h3>The wash buffer recommended is PBS or TBS. Do we know if one works better than the other? And also why do we not add tween or any other detergent for our washes?</h3>
                                                                        <p>The effect of TBS and PBS are same. and the reagents in the kit are treated reagents to optimize the kit, there is no need to add tween or other detergent.</p>
                                                                        </div>
                                                                        <div class="col-lg-12 faq">
                                                                          <h3>The ELISA kit protocols do not recommend shaking during incubations. Have you tested shaking and decided against it or is it simply deemed not necessary?</h3>
                                                                            <p>We tested and found that there is no difference if shaking during incubation, so we think shaking is not necessary.</p>
                                                                            </div>
                                                                            <div class="col-lg-12 faq">
                                                                              <h3>Has the antibody in this kit (EK0850) been tested for cross-reactivity with other molecules such as VPO? Or can you compare the immunogen sequence for potential cross-reactivity?</h3>
                                                                                <p>We didn't do related test, but we can provide the immunogen of the antibodies for your reference. The immunogen of the antibodies in the kit is recombinant human MPO, the sequence is Ala49-Ser745.</p>
                                                                                </div>
                                                                                <div class="col-lg-12 faq">
                                                                                  <h3>Can GPX2 #PA1812 suit for IC(Immunocytochemistry) ?</h3>
                                                                                    <p>Yes, pls see image.</p>
                                                                                    </div>
                                                                                    <div class="col-lg-12 faq">
                                                                                      <h3>Can you tell me more information about the standard that is included in your Human TIMP-1 ELISA Kit (EK0520)? Is it a purified or recombinant protein? Also, is it full length?</h3>
                                                                                        <p>The standard in EK0520 is recombinant human TIMP-1, Cys24-Ala207</p>
                                                                                        </div>
                                                                                        <div class="col-lg-12 faq">
                                                                                          <h3>Can I use Cytoplasmic &amp; Nuclear Extraction Kit (AR0106) for yeast samples? Further more, can I use Membrane Protein Extraction Kit (AR0155) for yeast and fish tissue?</h3>
                                                                                            <p>AR0155 can be used for yeast and fish tissue. AR0106 is based on hypertonicity， we don't recommend you to use it on yeast samples because it has cell wall.</p>
                                                                                            </div>
                                                                                            <div class="col-lg-12 faq">
                                                                                              <h3>What is the host of the secondary antibody in SV kit? Following the above question, Can we use goat serum to replace BSA as a blocking reagent?</h3>
                                                                                                <p>The host of the secondary antibody in SV0001 and SV0002 is goat. And you could use goat serum instead of BSA for SV0001 and SV0002.</p>
                                                                                                </div>
                                                                                                <div class="col-lg-12 faq">
                                                                                                  <h3>Could you please give me the components of RIPA lysate solution AR0105?</h3>
                                                                                                    <p>The compositions of RIPA are SDS, NP-40 and Sodium deoxycholate.</p>
                                                                                                    </div>
                                                                                                    <div class="col-lg-12 faq">
                                                                                                      <h3>We need to know AR0056 PROTEINASE K concentration (Mg/ml).</h3>
                                                                                                        <p>The concentration of AR0056 is 1mg/ml</p>
                                                                                                        </div>
                                                                                                        <div class="col-lg-12 faq">
                                                                                                          <h3>If the SHH Antibody (Catalog # PA1072) is cross-reactive to mouse. They would like to do IHC with mouse tissue.</h3>
                                                                                                            <p>The immunogen of PA1072 is a synthetic peptide corresponding to a sequence at the N-terminal of human SHH(34-50aa RHPKKLTPLAYKQFIPN), identical to the related mouse and rat sequences. And we conclude the antibody can work on mouse samples.</p>
                                                                                                            </div>
                                                                                                            <div class="col-lg-12 faq">
                                                                                                              <h3>Could you please confirm that the kit EK0658 detects the full length APP?</h3>
                                                                                                                <p>The standard in the kit is recombinant human APP, Leu18-Leu688.</p>
                                                                                                                </div>
                                                                                                                <div class="col-lg-12 faq">
                                                                                                                  <h3>The product is EK0812 (Human MICA ELISA kit).The customer is interested to know if this kit reacts with gens AMO I and TAMO 3.</h3>
                                                                                                                    <p>The kit don't react with AMO1 and TAMO.</p>
                                                                                                                    </div>
                                                                                                                    <div class="col-lg-12 faq">
                                                                                                                      <h3>We are looking to purchase items B0001-25 Protein A Beads (1-2mg/ml) and B0002-25 Protein G Beads (1-2mg/ml) but need some clarification. For each product, what is the total volume of resin that we would be receiving?</h3>
                                                                                                                        <p>A 1-2mg/ml indicates the concentration of the beads, which means Protein A or Protein G content is 1-2mg in 1ml beads. For each product, the total volume of resin is 25ml. The whole volume for the item is 30ml which includes alcohol and resin.</p>
                                                                                                                        </div>
                                                                                                                        <div class="col-lg-12 faq">
                                                                                                                          <h3>Please provide the epitope or immunogen sequence of the anti-BMP2 antibody coated on the ELISA plate?</h3>
                                                                                                                            <p>The immunogen sequence of precoated antibody is Gln283-Arg396.</p>
                                                                                                                            </div>
                                                                                                                            <div class="col-lg-12 faq">
                                                                                                                              <h3>What is (AR0056) PROTEINASE K concentration (Mg/ml)?</h3>
                                                                                                                                <p>The concentration of AR0056 is 1mg/ml.</p>
                                                                                                                                  <h3>Is the kit (EK0514) suitable for tissue lysate? If so, what are the protocols?</h3>
                                                                                                                                    <p>Our kit can work in Tissue lysate theoretically. <br /> Here is our general protocol &nbsp; &nbsp; &nbsp;&nbsp;<br /> Tissue Homogenates: Rinse tissue with PBS to remove excess blood, chopped into 1-2 mm pieces, and homogenize with a tissue homogenizer in PBS or in lysate solution (Mammal Tissue Protein Extraction Reagent, Catalog# AR0101), lysate solution: tissue net weight = 10ml:1g (i.e. Add 10ml lysate solution to 1g tissue). Centrifuge at approximately 5000 X g for 5 min. Assay immediately or aliquot and store homogenates at -20&deg;C. Avoid repeated freeze-thaw cycles.</p>
                                                                                                                                      <h3>In the EK0899, what is the molarity of sulfuric acid in the stop solution? Does it contain less than 9.8%?</h3>
                                                                                                                                        <p>Our TMB stop solution contains 2% sulfuric acid.</p>
                                                                                                                                          <h3>Does the kit (EK0309) distinguishe between mature- and pro- BDNF or does it detect both?</h3>
                                                                                                                                            <p>Our EK0307 can detect both mature- and pro- BDNF.</p>
                                                                                                                                              <h3>What is the range of serum Endoglin&nbsp;EK0644&nbsp;for healthy Normal &amp; diseased Abnormal&nbsp;cases when working with Human Serum?</h3>
                                                                                                                                                <p>The range of Endoglin for Normal Human Serum is from 1.2 to 9.8.</p>
                                                                                                                                                  <h3>Can you use EK0308 for pig nerve cell? If so, have you ever tested it on your own?&nbsp;</h3>
                                                                                                                                                    <p>We have not tested the kit for pig nerve cell, but the homology between EK0308 and mammal is very high, so it can work with this sample theoretically.</p>
                                                                                                                                                      <h3>Has the product, PA1582, been tested for Immunofluorescence?&nbsp;</h3>
                                                                                                                                                        <p>Our product PA1582 can not work for Immunofluorescence.</p>
                                                                                                                                                        </div>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 22. CMS page (boster-guarantee)

- **Structural hash:** `c3eaaf0f1b812e8a` (for cross-reference)
- **URL prefix:** `boster-guarantee`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `boster-guarantee` (page_id 24) — Boster Guarantee
- **All identifiers in cluster:** `boster-guarantee`
- **content_heading:** `Boster Guarantee`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 text-center hero-section" style="background-image: url(/media/images/design-guide/hero-people-team2.jpg)">
  <div class="dark-overlap">
    <h2 class="font-large font-weight-bold mb-4">About Boster</h2>
      <h1 class="mb-2">BOSTER GUARANTEE</h1>
        <p class="font-large mb-4" style="
          max-width: 800px;
          ">We pride ourselves on keeping product performance-related complaint rates <b class="text-orange">50% lower</b> than the industry average for 31 years straight.</p>
        </div>
      </section>
      <section class="mb-6 single-column content-section">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2 class="font-large text-orange mb-2 text-capitalize">Boster Quality Guarantee</h2>
                <h3 class="font-medium text-grey mb-4">Offering Excellence in Product Quality Since 1993</h3>
                  <p class="mb-4">All Boster antibodies and ELISA kits are thoroughly validated (<a href="/antibodies-validation-information">see our antibody validation standard</a>) and guaranteed to meet the specifications on our datasheets. We promise to investigate any concerns about the quality of our products thoroughly. If you encounter a problem with a Boster antibody or ELISA kit, our technical support team will respond with personalized advice within 24 hours. If we can’t make your experiment work, we will refund your purchase in full or provide a replacement free of charge.</p>
                    <p class="mb-4">At Boster, we guarantee that:</p>
                      <ol class="mb-4">
                        <li>All products have undergone rigorous testing and screening before being shipped.</li>
                          <li>Any quality concerns you have will be addressed and investigated thoroughly.</li>
                            <li>The performance of all our products will match the description provided in the datasheets. If the product failed to perform for an indicated application or reactivity, we will refund your purchase or replace the product free of charge.</li>
                              <li>If you find any of our products defective in any way, we will refund your purchase or replace the product free of charge.</li>
                                <li>Our team of highly skilled scientists are available 16/7 and we will provide fast, insightful technical support.</li>
                                </ol>
                                <div>
                                  <br>
                                </div>
                                <p class="mb-4">
                                  <b>Terms of Agreement</b>
                                  </p>
                                  <p>The Boster guarantee applies to products that have been purchased from us directly or through any of our authorized distributors. We offer refunds for full-size products, not sample sizes. For order issues with non-quality related causes, such as ordering the wrong products and not informing us in time, we charge 15-50% restocking fee depending on the product line to cover the cost incurred. We reserve the right to not issue refunds or replacements for situations not defined in this article. </p>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <section class="mb-6 single-column content-section">
                              <div class="container">
                                <div class="row">
                                  <div class="col-12">
                                    <div class="gap" style="margin-top: 50px">
                                    </div>
                                    <h2 style="border-bottom: 2px solid">RELATED</h2>
                                      <dt style="margin-top: 15px">
                                        <a href="/about-us">About Us</a>
                                        </dt>
                                        <dt style="margin-top: 15px">
                                          <a style="margin-top: 15px" href="/quality-control-panel">Boster Antibody Quality Control</a>
                                          </dt>
                                          <dt style="margin-top: 15px">
                                            <a style="margin-top: 15px" href="/elisa-validation-information">Boster ELISA Quality Control</a>
                                            </dt>
                                            <dt style="margin-top: 15px">
                                              <a style="margin-top: 15px" href="/promotions">Current Promotions</a>
                                              </dt>
                                              <dt style="margin-top: 15px">
                                                <a style="margin-top: 15px" href="/contact-us">Contact Us</a>
                                                </dt>
                                                <dt style="margin-top: 15px">
                                                  <a style="margin-top: 15px" href="/distributors">Global Distributors</a>
                                                  </dt>
                                                </div>
                                              </div>
                                            </div>
                                          </section>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 23. Protocol / troubleshooting guide

- **Structural hash:** `8a0a5f74dfcf57ba` (for cross-reference)
- **URL prefix:** `protocol-and-troubleshooting`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `protocol-and-troubleshooting/ihc-protocols/icc-protocol` (page_id 25) — ICC Immunofluorescence Protocol
- **All identifiers in cluster:** `protocol-and-troubleshooting/ihc-protocols/icc-protocol`
- **content_heading:** `ICC/Immunofluorescence Protocols for Cell Climbing Slices`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 text-center hero-section" id="icc-Immunofluorescence-protocol-hero">
  <div class="dark-overlap">
    <h1 class="font-weight-bold mb-2">ICC/IF Protocols</h1>
      <p class="font-large mb-4">Boster offers the full range of reagents one needs for performing smooth Immunohistochemistry (IHC), Immunofluorescence (IF), and Immunocytochemistry (ICC) assays.<br>
      </p>
    </div>
  </section>
  <section class="mb-6 topic-heading-section" id="introduction">
    <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3 mb-5">Workflow Chart For ICC/IF Protocol</h2>
      <div class="horizontal-center">
        <img src="https://SITE_ORIGIN_PLACEHOLDER">
      </div>
      <p class="text-center font-weight-bold">Immunocytochemistry (ICC) protocol with Applicable Boster’s Reagents</p>
      </section>
      <section class="mb-6 workflow-section">
        <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3 text-uppercase mt-6"> ICC/IF Workflow with Applicable Boster’s Reagents</h2>
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="timeline-bubbles">
                  <ul>
                    <li>
                      <h3 class="font-large">Cell Climbing Slice Preparation</h3>
                        <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a> - <a class="text-orange"
                          href="https://SITE_ORIGIN_PLACEHOLDER/4-paraformaldehyde-ar1068-boster.html" target="_blank">4% Paraformaldehyde</a>
                        </p>
                        <p class="font-small">Place settled coverslip in culture bottle or perforated plate</p>
                          <p class="font-small">Take out coverslip after cell growth has reached 60%</p>
                            <p class="font-small">Wash the coverslip 3X with <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS</a> to remove culture medium</p>
                              <p class="font-small">Immerse the coverslip (cells face up) into cold acetone or <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/4-paraformaldehyde-ar1068-boster.html" target="_blank">4% Paraformaldehyde</a> or neutral
                                formalin for 10 to 20 min (Close the lid to prevent evaporation)</p>
                                <p class="font-small">Wash the coverslip 3X with PBS</p>
                                  <p class="font-small">Put the coverslip on filter paper (cells face up)</p>
                                    <p class="font-small">Remove the liquid on the coverslip and allow it to dry for 8-10 hrs</p>
                                      <p class="font-small">To thaw the slice, wash with neutral PBS at room temperature for 10-15 min (The cell climbing slice can be stored in gelatin at -20°C for one week.)</p>
                                        <p class="font-small">Note: This fixation procedure using paraformaldehyde and formalin fixatives may cause autofluorescence in the green spectrum. In this case, you may try fluorophores in the (i) red range or (ii) infrared range
                                          if you have an infrared detection system.</p>
                                        </li>
                                        <li>
                                          <h3 class="font-large">Inactivation</h3>
                                            <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/3-h2o2-ar1108-boster.html" target="_blank">3% H<small>2</small>O<small>2</small>
                                            </a>
                                          </p>
                                          <p class="font-small">Mix <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/3-h2o2-ar1108-boster.html" target="_blank">3% H<small>2</small>O<small>2</small>
                                          </a> with distilled water (v/v: 1:50)</p>
                                          <p class="font-small">Immerse frozen section or cell climbing slice into the diluted H2O2 at room temperature for 10 min</p>
                                            <p class="font-small">Wash the section 3X distilled water (1 min each)</p>
                                            </li>
                                            <li>
                                              <h3 class="font-large">Antigen Retrieval (Proteolytic Induced Epitope Retrieval: PIER)</h3>
                                                <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antigen-retrieval-reagent-ar0022-boster.html" target="_blank">Enzyme Antigen Retrieval Reagent</a> - <a class="text-orange"
                                                  href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a>
                                                </p>
                                                <p class="font-small">Antigen retrieval (AR) is the process of breaking protein cross-links that mask antigens in formalin-fixed tissue sections. Antigen retrieval breaks the protein cross-links, enhancing staining intensity by
                                                  unmasking the antigens
                                                  and epitopes in formalin-fixed and paraffin embedded tissue sections.
                                                  <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/ihc-optimization/antigen-retrieval">
                                                    <b>Read on how you can
                                                      effectively select the right antigen retrieval method</b>
                                                    </a>
                                                  </p>
                                                  <p class="font-small">Dry the cell slices with filter paper</p>
                                                    <p class="font-small">Add <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antigen-retrieval-reagent-ar0022-boster.html" target="_blank">compound digestion solution</a> (e.g. Trypsin solution or other enzymatic antigen
                                                      retrieval solution) to the slices (We recommend the addition of 0.1% Triton to the samples before the digestion. This reduces
                                                      surface tension and
                                                      allows reagents to easily cover the entire sample.)</p>
                                                      <p class="font-small">Incubate the slices at room temperature for 10 min</p>
                                                        <p class="font-small">Wash with 3X <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a>
                                                          &lt; (10 min each)</p>
                                                          <p class="font-small">Problems encountered in this step can result in a weak signal. Find out how you can troubleshoot the antigen retrieval protocol <a class="text-orange"
                                                            href="https://SITE_ORIGIN_PLACEHOLDER/frequently-asked-questions/ihc-troubleshooting-antigen-retrieval">here</a>
                                                          </p>
                                                        </li>
                                                        <p>
                                                          <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/ihc-optimization/antigen-retrieval" class="text-orange">
                                                            Read on how you can effectively select the right antigen retrieval method</a>
                                                          </p>
                                                          <li>
                                                            <h3 class="font-large">Blocking</h3>
                                                              <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/mammalian-tissue-protein-extraction-reagent-ar0101-boster.html" target="_blank">5% BSA blocking solution</a>
                                                              </p>
                                                              <p class="font-small"> Add <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/mammalian-tissue-protein-extraction-reagent-ar0101-boster.html" target="_blank">5% BSA blocking solution</a> or normal goat serum to the PIER treated
                                                                samples </p>
                                                                <p class="font-small"> Incubate the samples at 37°C for 30 min </p>
                                                                  <p class="font-small"> Shake off extra liquid and dry the samples with filter paper (No washing required)</p>
                                                                  </li>
                                                                  <li>
                                                                    <h3 class="font-large">Primary Antibody Incubation</h3>
                                                                      <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-ar1016-boster.html" target="_blank">Antibody Diluent</a> - <a class="text-orange"
                                                                        href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a>
                                                                      </p>
                                                                      <p class="font-small">Dilute primary antibody with <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-ar1016-boster.html" target="_blank">antibody diluent</a> to the concentration recommended by the antibody
                                                                        manufacturer</p>
                                                                        <p class="font-small">Add the diluted antibody (Recommended concentration: 0.4 µg to 2 µg) to the samples and incubate at 4°C overnight</p>
                                                                          <p class="font-small">Wash the samples 3X with <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a> (15 min each)</p>
                                                                          </li>
                                                                          <li>
                                                                            <h3 class="font-large">Secondary Antibody Incubation </h3>
                                                                              <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-ar1016-boster.html" target="_blank">Antibody Diluent</a> - <a class="text-orange"
                                                                                href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a>
                                                                              </p>
                                                                              <p class="font-small">Dilute biotinylated secondary antibody with <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-ar1016-boster.html" target="_blank">antibody diluent</a> to the concentration recommended by
                                                                                the antibody manufacturer</p>
                                                                                <p class="font-small">Add the diluted antibody to the samples and incubate at 37°C for 30 min</p>
                                                                                  <p class="font-small">Wash the samples 3X with <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a> (8 min each)</p>
                                                                                  </li>
                                                                                  <li>
                                                                                    <h3 class="font-large">Immunocytochemistry (ICC) Staining </h3>
                                                                                      <p class="text-grey">
                                                                                        <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/aqueous-mounting-medium-ar1018-boster.html">Aqueous Mounting Medium</a> -
                                                                                          <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/dapi-stain-solution-ar1176-boster.html">DAPI</a> -
                                                                                            <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/dapi-stain-solution-ar1177-boster.html">DAPI</a> -
                                                                                              <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antifade-mounting-medium-ar1109-boster.html">Antifade Mounting Medium</a> -
                                                                                              </p>
                                                                                              <p class="font-small">Add Strept-Avidin Biotin Complex – Fluorescence Iso-Thio-Cyanate (SABC-FITC) or Strept-Avidin Biotin Complex – Cyanine-3 (SABC-Cy3) reagents to the samples</p>
                                                                                                <p class="font-small">Incubate the samples at 37°C for 30 min (Avoid light)</p>
                                                                                                  <p class="font-small">Wash the samples 2X with PBS (Total 2 hrs)</p>
                                                                                                    <p class="font-small">Seal the slices with water-soluble sealing reagent</p>
                                                                                                      <p class="font-small">Monitor the staining intensity under a fluorescence microscope</p>
                                                                                                        <p class="font-small">Counterstain by adding <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/dapi-stain-solution-ar1176-boster.html">DAPI</a> staining solution to the sample</p>
                                                                                                          <p class="font-small">Check again the staining intensity under a fluorescence microscope</p>
                                                                                                            <p class="font-small">For slide storage without significant decay in fluorescence signal, add 20 µL of the <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antifade-mounting-medium-ar1109-boster.html">anti-fade solution</a> to
                                                                                                              the sample followed by a cover glass (Avoid bubbles)</p>
                                                                                                              <p class="font-small">
                                                                                                                <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/ihc-optimization/antigen-retrieval" class="text-orange">Learn the probable causes and solutions of weak or no staining</a>
                                                                                                                </p>
                                                                                                              </li>
                                                                                                            </ul>
                                                                                                          </div>
                                                                                                        </div>
                                                                                                      </div>
                                                                                                    </div>
                                                                                                  </section>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 24. Protocol / troubleshooting guide

- **Structural hash:** `2bb5db022e2473ee` (for cross-reference)
- **URL prefix:** `protocol-and-troubleshooting`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `protocol-and-troubleshooting/western-blot-principle` (page_id 26) — Western Blotting Principle, How Western Blots Work | Boster
- **All identifiers in cluster:** `protocol-and-troubleshooting/western-blot-principle`
- **content_heading:** `Western Blotting Principle, How Western Blots Work`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 text-center hero-section" id="westren-blotting-hero" style="background-image: url(/media/images/design-guide/western-blot2.jpg);">
  <div class="dark-overlap">
    <h1 class="font-largest font-weight-bold mb-2">Western Blotting Principle: Fundamentals and Key Concepts</h1>
      <p class="font-large mb-4">Explore the fundamentals and workflow of Western blotting—from core principles to detailed protocols—all supported by Boster Bio’s trusted reagents and CRO expertise.</p>
        <a class="btn-outline-white" href="https://SITE_ORIGIN_PLACEHOLDER/western-blot-reagents">Check out what Western Blot reagents we offer</a> </div>
        </section>
        <section class="mb-6 single-column content-section" id="introduction">
          <div class="container">
            <div class="row">
              <div class="col-md-8">
                <h2 class="font-large mb-2 text-orange">What is Western Blot?</h2>
                  <p>Western blotting, also known as protein immunoblotting, is a widely used method for detecting specific proteins in complex biological samples following extraction with a lysis buffer supplemented with protease inhibitors to prevent protein degradation. It combines gel electrophoresis with antibody-based detection to identify target proteins with high specificity and sensitivity.</p>
                    <p>The process begins with SDS-polyacrylamide gel electrophoresis (SDS-PAGE), which separates proteins based on size. These proteins are then transferred to a membrane—typically nitrocellulose membranes or PVDF membranes, where they are probed using antibodies specific to the protein of interest. The resulting signal reveals both the presence and relative abundance of the target protein. This approach allows researchers to confirm protein extraction , examine post-translational modifications, and validate data from complementary assays such as ELISA or PCR.</p>
                      <p>Western blotting is a foundational technique in molecular biology, biochemistry, immunogenetics, and clinical diagnostics. It is capable of detecting proteins at concentrations as low as 1 ng, making it ideal for sensitive protein-level analysis in cells, tissues, or biofluids.</p>
                        <p>
                          <b>Boster Bio</b> supports your Western blotting workflow with validated antibodies, high-performance reagents, and expert CRO services. Whether you're optimizing a protocol or scaling up your studies, we provide the tools and guidance to help you generate consistent, reproducible results.</p>
                          </div>
                          <div class="col-4 nauman-enrichment">
                            <div class="h-100 background-cover" style="background-image: url('https://SITE_ORIGIN_PLACEHOLDER/media/images/nauman-enrichment/western-blot-1st-section.jpg');">
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section class="mb-6 p-3 bg-orange cta-section">
                      <div class="container">
                        <div class="row">
                          <div class="col-md-8">
                            <h3 class="font-large">Did You Know ?</h3>
                              <p class="mb-0">You can Save up to <span class="font-large">90%</span> on WB reagents if you buy them from Boster Bio</p>
                              </div>
                              <div class="col-md-4"> <a href="/boster-vs-thermo" class="btn-outline-white mt-2 d-block" target="_blank">Check out these great deals now!</a>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section class="mb-6 topic-heading-section">
                          <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Core Concepts in Western Blotting</h2>
                            <p class="text-grey text-center w-75 m-auto">
                              <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/western-blot-principle" style="color:#EA8D28">Western blotting principle</a> usually involves two major processes, namely, SDS-polyacrylamide gel electrophoresis and protein blotting and testing.</p>
                              </section>
                              <section class="mb-6 accordion-section">
                                <div class="container">
                                  <div class="row">
                                    <div class="col-md-12">
                                      <div class="accordion" id="accordion-1">
                                        <h3 class="font-medium m-0 bg-lightgrey border-bottom">
                                          <a href="#" class="d-block p-3 collapsed" data-toggle="collapse" data-target="#item1" aria-expanded="false">SDS-PAGE vs gel electrophoresis</a>
                                          </h3>
                                          <div id="item1" class="collapse" data-parent="#accordion-1" style="">
                                            <div class="p-4 bg-white">Electrophoresis separation describes a phenomenon that charged particles move towards opposite electrode under the influence of electric field. It is used to separate proteins according to their electrophoretic mobility which depends on charge, molecule size and structure of the proteins. Polyacrylamide gel (PAG) is a three-dimensional mesh networks polymer composed of acrylamide and a cross-linker (methylene bisacrylamide) under the catalyzation of ammonium persulfate. PAG is a versatile supporting matrix due to its stable hydrophily and little adsorption and electroosmosis effect provided by its neutrally charged nature. (It possesses several electrophoretically desirable features that make it a versatile medium. It is a synthetic, thermo-stable, transparent, strong, chemically relatively inert gel, and can be prepared with a wide range of average pore sizes).</div>
                                            </div>
                                            <h3 class="font-medium m-0 bg-lightgrey border-bottom">
                                              <a href="#" class="d-block p-3 collapsed" data-toggle="collapse" data-target="#item2" aria-expanded="false">Role Of SDS In Western Blot: Coats protein with negative charge</a>
                                              </h3>
                                              <div id="item2" class="collapse" data-parent="#accordion-1" style="">
                                                <div class="p-4"> Coats protein with negative charge: In the presence of SDS, electrophoretic mobility is mainly based on molecule weight instead of on charge and size of the proteins. SDS is an anionic detergent which could break hydrogen bond within and between molecules to unfold proteins and break up secondary and tertiary structures as denaturing agent and hydrotropy agent. Strong reducing agents such as mercaptoethanol and Dithiothreitol (DTT) could disrupt disulfide linkages between cysteine residues. SDS and reducing agents are applied to protein sample to linearize proteins and to impart a negative charge to linearized proteins. In most proteins, the binding of SDS to the polypeptide chain imparts an even distribution of charge per unit mass, thereby the intrinsic charges of polypeptides becomes negligible when compared to the negative charges contributed by SDS. This new negative charge is significantly greater than the original charge of that protein.</div>
                                                </div>
                                                <h3 class="font-medium m-0 bg-lightgrey border-bottom">
                                                  <a href="#" class="d-block p-3 collapsed" data-toggle="collapse" data-target="#item3" aria-expanded="false">Separating Proteins By Sizes</a>
                                                  </h3>
                                                  <div id="item3" class="collapse" data-parent="#accordion-1" style="">
                                                    <div class="p-4 bg-white">
                                                      <p class="mb-0">The electrostatic repulsion that is created by binding of SDS causes proteins to unfold into a rod-like shape thereby eliminating differences in shape as a factor for separation in the gel. Minor axis of all rods, the SDS-protein subunit compound are nearly the same, about 1.8nm. And the length of major axis is in proportion to molecular weight of the protein subunit. Thus electrophoretic mobility of the SDS-protein subunit compound is based on molecular weight, eliminating the influence imposed by size and charge.</p>
                                                        <p class="mb-1">The sample to be analyzed is mixed with SDS. And the mixed samples are subsequently treated by related solution. Heating the samples to at least 60°C further promotes protein denaturation and depolymerization, helping SDS to bind and enabling the rod-shape formation and negative charge adherence. A bromophenol blue dye may be added to the protein solution to allow the experimenter to track the progress of the protein solution through the gel during the electrophoretic run. An appropriate amount of glycerol is added to increase density and accelerate the migration of sample solution.</p>
                                                        </div>
                                                      </div>
                                                      <h3 class="font-medium m-0 bg-lightgrey border-bottom">
                                                        <a href="#" class="d-block p-3 collapsed" data-toggle="collapse" data-target="#item4" aria-expanded="false">The "Laemmli" System: Creating The Environment For Electrophoresis</a>
                                                        </h3>
                                                        <div id="item4" class="collapse" data-parent="#accordion-1" style="">
                                                          <div class="p-4 bg-white"> A buffer system with different pH values is applied in gel electrophoresis process. A very widespread discontinuous buffer system is the tris-glycine or "Laemmli" system that stacks at a pH of 6.8 and resolves at a pH of ~8.3-9.0. A drawback of this system is that these pH values may promote disulfide bond formation between cysteine residues in the proteins because the pKa of cysteine ranges from 8-9 and because reducing agent present in the loading buffer doesn't co-migrate with the proteins. Recent advances in buffering technology alleviate this problem by resolving the proteins at a pH well below the pKa of cysteine (e.g., bis-tris, pH 6.5) and include reducing agents (e.g. sodium bisulfite) that move into the gel ahead of the proteins to maintain a reducing environment. An additional benefit of using buffers with lower pH values is that the acrylamide gel is more stable at lower pH values, so the gels can be stored for long periods of time before use. </div>
                                                          </div>
                                                          <h3 class="font-medium m-0 bg-lightgrey border-bottom">
                                                            <a href="#" class="d-block p-3 collapsed" data-toggle="collapse" data-target="#item5" aria-expanded="false">How Voltage affects Electrophoresis</a>
                                                            </h3>
                                                            <div id="item5" class="collapse" data-parent="#accordion-1" style="">
                                                              <div class="px-4 pb-2 pt-4 bg-white">As voltage is applied, the anions (and negatively charged sample molecules) migrate toward the positive electrode (anode) in the lower chamber, the leading ion is Cl¯ ( high mobility and high concentration); glycinate is the trailing ion (low mobility and low concentration). SDS-protein particles do not migrate freely at the border between the Cl¯ of the gel buffer and the Gly¯ of the cathode buffer. Because of the voltage drop between the Cl- and Glycine-buffers, proteins are compressed (stacked) into micrometer thin layer-stacking gel layer.</div>
                                                                <div class="p-4 bg-white">In resolving gel layer, proteins with more negative charges per unit migrate faster than those with less negative charges per unit. That is, proteins with small molecular weight migrate faster than proteins with large molecular weight. The boundary moves through a pore gradient and the protein stack gradually disperses due to a frictional resistance increase of the gel matrix. Stacking and unstacking occur continuously in the gradient gel, for every protein at a different position.</div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </section>
                                                      <section class="mb-6 pt-6 topic-heading-section">
                                                        <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Choosing The Right Gel for Western Blot</h2>
                                                          <p class="text-grey w-75 m-auto">Selecting the appropriate gel percentage is essential for accurate protein separation in SDS-PAGE. The gel’s acrylamide concentration determines its pore size, directly influencing the resolution of proteins based on their molecular weight. This section explains how to choose the right gel percentage for your target protein, includes a calculator for convenience, and outlines the relationship between gel composition and pore size.</p>
                                                          </section>
                                                          <section class="mb-6 single-column content-section">
                                                            <div class="container">
                                                              <div class="row">
                                                                <div class="col-4 nauman-enrichment">
                                                                  <img src="https://SITE_ORIGIN_PLACEHOLDER/media/images/nauman-enrichment/Gel_Electrophoresis_Photo.jpg" alt="Gel electrophoresis in Western blotting" loading="lazy" data-done="Loaded">
                                                                </div>
                                                                <div class="col-8">
                                                                  <h3 class="font-large text-orange mb-2 text-capitalize">How to choose gel percentage based on protein size</h3>
                                                                    <p class="mb-4">Polyacrylamide gel electrophoresis (PAGE) is used for separating proteins ranging in size from 5 to 2,000 kDa due to the uniform pore size provided by the polyacrylamide gel. Pore size is controlled by controlling the concentrations of acrylamide and bis-acrylamide powder used in creating a gel. Typically resolving gels are made in 5%, 8%, 10%, 12% or 15%. Stacking gel (5%) is poured on top of the resolving gel and a gel comb (which forms the wells and defines the lanes where proteins, sample buffer and ladders will be placed) is inserted. The percentage chosen depends on the size of the protein that one wishes to identify or probe in the sample. The smaller the known weight, the higher the percentage that should be used. Changes on the buffer system of the gel can help to further resolve proteins of very small sizes</p>
                                                                      <h3 class="font-medium mb-5">Check the table below for common protein sizes and their recommended gel percentages</h3>
                                                                      </div>
                                                                      <table class="table table-striped mt-5">
                                                                        <thead class="bg-orange">
                                                                          <tr>
                                                                            <th>Range of molecular weight (KD)</th>
                                                                              <th>Concentration of gel (%)</th>
                                                                              </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                              <tr>
                                                                                <th>&lt;10</th>
                                                                                  <td>15</td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                    <th>10 - 30</th>
                                                                                      <td>12</td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                        <th>30 - 100</th>
                                                                                          <td>10</td>
                                                                                          </tr>
                                                                                          <tr>
                                                                                            <th>100 - 500</th>
                                                                                              <td>8</td>
                                                                                              </tr>
                                                                                              <tr>
                                                                                                <th>&gt; 500</th>
                                                                                                  <td>5</td>
                                                                                                  </tr>
                                                                                                </tbody>
                                                                                              </table>
                                                                                            </div>
                                                                                          </div>
                                                                                        </section>
                                                                                        <section class="mb-6 pt-6 topic-heading-section">
                                                                                          <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">WES
                                                                                            <!-- TRUNCATED: 32648 chars total — open docs/cms-pages-full-export.tsv row page_id=26 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 25. Protocol / troubleshooting guide

- **Structural hash:** `808582cd941e48a1` (for cross-reference)
- **URL prefix:** `protocol-and-troubleshooting`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `protocol-and-troubleshooting/ihc-protocols/ihc-p-protocol` (page_id 27) — IHC Protocol for Paraffin Embedded Sections | Bosterbio
- **All identifiers in cluster:** `protocol-and-troubleshooting/ihc-protocols/ihc-p-protocol`
- **content_heading:** `IHC Protocol for Paraffin Embedded Sections`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 text-center hero-section" id="ihc-p-protocol-hero">
  <div class="dark-overlap">
    <h1 class="mb-2"> IHC Protocol For Paraffin-Embedded Sections </h1>
      <p class="font-large mb-4">Learn the basic steps of IHC protocol for the paraffin-embedded section. IHC is a technique used to analyze protein expression in the context of tissue morphology. Check this stepwise IHC Protocol to improve on your
        Immunohistochemistry assays. </p>
      </div>
    </section>
    <section id="introduction single-column content-section" class="mb-6">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">IHC workflow overview</h2>
              <p class="text-grey text-center w-75 mx-auto mb-5 font-medium">Boster manufacturers our own IHC reagents that are used in our validation process. See the protocol below with available Boster products highlighted. </p>
                <div class="horizontal-center">
                  <img src="https://SITE_ORIGIN_PLACEHOLDER/media/images/IHC-paraffin_protocol_image.png" loading="lazy">
                </div>
                <p class="text-center"> <strong>IHC Workflow (Paraffin Sections) with Applicable Boster’s Reagents </strong>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section class="mb-6 p-3 bg-orange cta-section">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 col-12">
                <h3 class="font-large">Boster IHC reagent's</h3>
                  <p class="mb-0">You can Save up to <span class="font-large">90%</span> on the above reagents if you buy them from Bosterbio</p>
                  </div>
                  <div class="col-lg-4 col-12">
                    <a href="https://SITE_ORIGIN_PLACEHOLDER/immunohistochemistry-ihc-reagents" class="btn-outline-white btn-full-width">Browse IHC reagents and kits</a>
                    </div>
                  </div>
                </div>
              </section>
              <section class="mb-6 topic-heading-section">
                <div class="container">
                  <div class="row">
                    <div class="col-12">
                      <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">IHC protocol details</h2>
                        <p class="text-grey text-center w-75 mx-auto mb-5 font-medium">Step-by-step guide on IHC protocol with reagent recommendations</p>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section class="mb-6 workflow-section">
                    <div class="container">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="timeline-bubbles">
                            <ul>
                              <li>
                                <h3 class="font-medium">Tissue Preparation</h3>
                                  <p class="text-grey font-small">Used Products : <a class="text-orange" target="_blank" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html">PBS Buffer</a> , <a class="text-orange" target="_blank"
                                    href="https://SITE_ORIGIN_PLACEHOLDER/4-paraformaldehyde-ar1068-boster.html">4% Paraformaldehyde</a>
                                  </p>
                                  <div class="accordion" id="FAQs">
                                    <h3 class="font-medium m-0 p-3 bg-lightgrey border-bottom">
                                      <a href="#" class="d-block collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false">Paraformaldehyde Cooling And Dehydration</a>
                                      </h3>
                                      <div id="collapseOne" class="collapse" data-parent="#FAQs" style="">
                                        <div class="p-4 bg-white">
                                          <ul>
                                            <li> Harvest fresh tissue and place it in a dish filled with ice-cold PBS buffer </li>
                                              <li> Wash the tissue thoroughly with <a href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank" class="text-orange">PBS</a> to remove blood (Use forceps to remove connective tissues) </li>
                                                <li> Cut the tissue into slices of thickness of 3 mm or less </li>
                                                  <li> Immerse the slices in <a class="text-orange" target="_blank" href="https://SITE_ORIGIN_PLACEHOLDER/4-paraformaldehyde-ar1068-boster.html">4% Paraformaldehyde</a> at room temperature for 8 min </li>
                                                    <li> Immerse the slices in <a class="text-orange" target="_blank" href="https://SITE_ORIGIN_PLACEHOLDER/4-paraformaldehyde-ar1068-boster.html">4% Paraformaldehyde</a> (pre-cool at 4°C) for 6 to 7 hrs. The paraformaldehyde volume
                                                      should be 20X greater than the tissue volume by weight </li>
                                                      <li> Wash the tissue 3X with <a href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank" class="text-orange">PBS</a> (1 min each) </li>
                                                        <li> Dehydrate the tissue by immersing the tissue sequentially as follows:
                                                          <ul>
                                                            <li> 1X into 80% ethanol (1 hr at 4°C) </li>
                                                              <li> 1X into 90% ethanol (1 hr at 4°C) </li>
                                                                <li> 3X into 95% ethanol (1 hr each at 4°C) </li>
                                                                  <li> 3X into 100% ethanol (1 hr each at 4°C) </li>
                                                                    <li> 3X into dimethylbenzene (0.5 hr each at room temperature)</li>
                                                                    </ul>
                                                                  </li>
                                                                </ul>
                                                              </div>
                                                            </div>
                                                            <h3 class="font-medium m-0 p-3 bg-lightgrey border-bottom">
                                                              <a href="#" class="d-block collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false">Liquid Paraffin Section</a>
                                                              </h3>
                                                              <div id="collapseTwo" class="collapse" data-parent="#FAQs">
                                                                <div class="p-4">
                                                                  <ul>
                                                                    <li>Prepare the first portion of liquid paraffin in a suitable bath and allow the paraffin to reach and maintain at 60°C</li>
                                                                      <li>Immerse the tissue 2X into the paraffin bath (2 hrs each)</li>
                                                                        <li>Prepare the second portion of liquid paraffin in a suitable bath and allow the paraffin to reach and maintain at 60°C</li>
                                                                          <li>Pour the second portion of paraffin into a mold</li>
                                                                            <li>Quickly transport the tissue from the paraffin bath to the mold with paraffin</li>
                                                                              <li>Incubate the tissue at room temperature until it coagulates</li>
                                                                                <li>Store the tissue at 4°C</li>
                                                                                </ul>
                                                                              </div>
                                                                            </div>
                                                                            <h3 class="font-medium m-0 p-3 bg-lightgrey border-bottom">
                                                                              <a href="#" class="d-block collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false">Section Slicing And Incubation</a>
                                                                              </h3>
                                                                              <div id="collapseThree" class="collapse" data-parent="#FAQs">
                                                                                <div class="p-4 bg-white">
                                                                                  <ul>
                                                                                    <ul>
                                                                                      <li> Secure the paraffin section on slicer </li>
                                                                                        <li> Slice one to two pieces of section to adjust the slicer so that the section and blade are parallel </li>
                                                                                          <li> Slice the remaining section carefully with ~5 µm thick </li>
                                                                                            <li> Incubate the sliced section in 40 to 50°C water to unfold </li>
                                                                                              <li> Mount the tissue section onto Poly-Lysine or APES coated glass slides </li>
                                                                                                <li> Incubate the slides overnight at 37°C</li>
                                                                                                </ul>
                                                                                              </ul>
                                                                                            </div>
                                                                                          </div>
                                                                                        </div>
                                                                                        <p class="mt-4">
                                                                                          <b>Note:</b> This fixation procedure using paraformaldehyde and formalin fixatives may cause autofluorescence in the green spectrum. In this case, you may try fluorophores in the (i) red range or (ii) infrared range
                                                                                            if you
                                                                                            have an infrared detection system.</p>
                                                                                          </li>
                                                                                          <li>
                                                                                            <h3 class="font-medium">Dewaxing/Deparaffinization</h3>
                                                                                              <p class="font-weight-bold">Prepare the following reagents:</p>
                                                                                                <ul class="pl-5">
                                                                                                  <li>
                                                                                                    <ul>
                                                                                                      <li> 90% dimethylbenzene </li>
                                                                                                        <li> 95% dimethylbenzene </li>
                                                                                                          <li> 100% dimethylbenzene </li>
                                                                                                            <li> 90% ethanol </li>
                                                                                                              <li> 95% ethanol </li>
                                                                                                                <li> 100% ethanol </li>
                                                                                                                </ul>
                                                                                                              </li>
                                                                                                            </ul>
                                                                                                            <p class="font-weight-bold">Sequentially immerse paraffin sections into:</p>
                                                                                                              <ul class="pl-5">
                                                                                                                <li>
                                                                                                                  <ul>
                                                                                                                    <li> 90% dimethylbenzene (for 7 min) </li>
                                                                                                                      <li> 95% dimethylbenzene (for 7 min) </li>
                                                                                                                        <li> 100% dimethylbenzene (for 7 min) </li>
                                                                                                                          <li> 90% ethanol (for 7 min) </li>
                                                                                                                            <li> 95% ethanol (for 7 min) </li>
                                                                                                                              <li> 100% ethanol (for 7 min) </li>
                                                                                                                              </ul>
                                                                                                                            </li>
                                                                                                                            <li>Wash the slides with water to remove ethanol</li>
                                                                                                                            </ul>
                                                                                                                            <p class="mb-5">
                                                                                                                              <b>Note:</b> The process of dewaxing should be done in a fume hood at room temperature in summer. When the temperature is lower than 18°C, it is recommended to dewax at 50°C</p>
                                                                                                                              </li>
                                                                                                                              <li>
                                                                                                                                <h3 class="font-medium">Inactivation</h3>
                                                                                                                                  <p class="font-small text-grey">Used Products : <a href="https://SITE_ORIGIN_PLACEHOLDER/3-h2o2-ar1108-boster.html" target="_blank" class="text-orange">3% Hydrogen Peroxide</a>
                                                                                                                                  </p>
                                                                                                                                  <ul class="mb-5 pl-5">
                                                                                                                                    <li>Immerse dewaxed paraffin section into the <a href="https://SITE_ORIGIN_PLACEHOLDER/3-h2o2-ar1108-boster.html" target="_blank" class="text-orange">3% H2O2</a> at room temperature for 10 min</li>
                                                                                                                                      <li>Wash the section 3X to 5X with distilled water (total 3 to 5 min)</li>
                                                                                                                                      </ul>
                                                                                                                                    </li>
                                                                                                                                    <li>
                                                                                                                                      <h3 class="font-medium">Antigen Retrieval (Heat Induced Epitope Retrieval: HIER)</h3>
                                                                                                                                        <p class="font-small text-grey">Used Products : <a href="bosterbio.com/citrate-buffer-ar0024-boster.html" target="_blank" class="text-orange">Citrate Buffer Powder</a> , <a class="text-orange" target="_blank"
                                                                                                                                          href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html">PBS Buffer</a> </p>
                                                                                                                                          <ul class="pl-5 mb-5">
                                                                                                                                            <li> Immerse the paraffin sections in <a href="bosterbio.com/citrate-buffer-ar0024-boster.html" target="_blank" class="text-orange">citrate buffer</a> </li>
                                                                                                                                              <li> Heat the buffer in microwave and turn it off when the buffer has boiled </li>
                                                                                                                                                <li> Keep the boiled buffer in microwave for 5 to 10 min </li>
                                                                                                                                                  <li> Repeat the heating as outlined above 1X to 2X </li>
                                                                                                                                                    <li> Cool the slides until it reaches room temperature </li>
                                                                                                                                                      <li> Wash the sections 1X to 2X with <a class="text-orange" target="_blank" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html">PBS</a> </li>
                                                                                                                                                        <li> Problems encountered in this step can result in a weak signal. Find out how you can troubleshoot the antigen retrieval protocol <a class="font-weight-bold text-orange"
                                                                                                                                                          href="https://SITE_ORIGIN_PLACEHOLDER/frequently-asked-questions/ihc-troubleshooting-antigen-retrieval">here.</a> </li>
                                                                                                                                                        </ul>
                                                                                                                                                        <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/ihc-optimization/antigen-retrieval" class="btn-orange d-inline-block">Read on how you can effectively select the right antigen retrieval method</a>
                                                                                                                                                        </li>
                                                                                                                                                        <li>
                                                                                                                                                          <h3 class="font-medium">Blocking</h3>
                                                                                                                                                            <p class="font-small text-grey">Used Products : <a href="https://SITE_ORIGIN_PLACEHOLDER/normal-rabbit-serum-blocking-ar1010-boster.html" target="_blank" class="text-orange">Normal Rabbit Serum</a>
                                                                                                                                                            </p>
                                                                                                                                                            <ul class="mb-5">
                                                                                                                                                              <li> Add 5% BSA blocking solution or normal goat serum to the HIER treated samples </li>
                                                                                                                                                                <li> Incubate the samples at 37°C for 30 min </li>
                                                                                                                                                                  <li> Discard extra liquid (No washing required)</li>
                                                                                                                                                                  </ul>
                                                                                                                                                                </li>
                                                                                                                                                                <li>
                                                                                                                                                                  <h3 class="font-medium">Primary Antibody Incubation</h3>
                                                                                                                                                                    <p class="font-small text-grey">Used Products : <a href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-ar1016-boster.html" target="_blank" class="text-orange">Antibody Diluent</a> , <a class="text-orange" target="_blank"
                                                                                                                                                                      href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html">PBS Buffer</a>
                                                                                                                                                                    </p>
                                                                                                                                                                    <ul>
                                                                                                                                                                      <li> Dilute primary antibody with <a href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-ar1016-boster.html" target="_blank" class="text-orange">antibody diluent</a> to the concentration recommended by the antibody manufacturer </li>
                                                                                                                                                                        <li> Add the diluted antibody to the samples and incubate overnight at 4℃ or at 37℃ for 1 hour </li>
                                                                                                                                                                          <li> Wash the samples 2X with PBS (20 min each) </li>
                                                                                                                                                                          </ul>
                                                                                                                                                                          <p> Problems encountered in this step can result in a weak signal. Find out how you can troubleshoot the antigen retrieval pr
                                                                                                                                                                            <!-- TRUNCATED: 17990 chars total — open docs/cms-pages-full-export.tsv row page_id=27 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 26. Protocol / troubleshooting guide

- **Structural hash:** `d712a5b44c6a3ffa` (for cross-reference)
- **URL prefix:** `protocol-and-troubleshooting`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `protocol-and-troubleshooting/ihc-protocols/ihc-f-protocol` (page_id 28) — IHC-Frozen Protocol | Bosterbio
- **All identifiers in cluster:** `protocol-and-troubleshooting/ihc-protocols/ihc-f-protocol`
- **content_heading:** `IHC Protocols for Frozen Sections`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 text-center hero-section" id="ihc-frozen-protocol-hero">
  <div class="dark-overlap">
    <h1 class="font-weight-bold mb-2">IHC Protocols for Frozen Sections</h1>
      <p class="font-large mb-4">Boster offers the full range of reagents one needs for performing smooth Immunohistochemistry (IHC), Immunofluorescence (IF), and Immunocytochemistry (ICC) assays.<br>
      </p>
    </div>
  </section>
  <section class="mb-6 single-column content-section" id="introduction">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Summary Workflow Chart For IHC Protocol For Frozen Sections</h2>
            <div class="horizontal-center">
              <img src="https://SITE_ORIGIN_PLACEHOLDER/media/images/IHC-frozen_protocol_image.png">
            </div>
            <p class="text-center font-weight-bold">IHC-F Workflow with Applicable Boster’s Reagents</p>
            </div>
          </div>
        </div>
      </section>
      <section class="mb-6 workflow-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">how to prepare tissue for IHC</h2>
                <div class="timeline-bubbles">
                  <ul>
                    <li>
                      <h3 class="font-large">Snap Freezing And OCT Embedding</h3>
                        <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a> - <a class="text-orange"
                          href="https://SITE_ORIGIN_PLACEHOLDER/4-paraformaldehyde-ar1068-boster.html" target="_blank">4% Paraformaldehyde</a>
                        </p>
                        <div class="mt-5">
                          <ol class="list-style-numbers">
                            <li class="font-small">Harvest fresh tissue and place it in a dish filled with ice-cold <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS buffer</a>
                            </li>
                            <li class="font-small">Wash the tissue thoroughly with PBS to remove blood (Use forceps to remove connective tissues)</li>
                              <li class="font-small">Cut the tissue into slices of thickness of 3 mm or less</li>
                                <li class="font-small">Immediately snap freeze the tissue in iso-pentane cooled in dry ice and keep the tissue at -70°C (Do not allow frozen tissue to thaw before cutting)</li>
                                  <li class="font-small">
                                    Prior to cryostat sectioning, position the tissue in a mold* and cover the tissue completely in Optimal Cutting Temperature (OCT) embedding medium
                                    <p class="text-grey">* The mold can simply be made by using tin foil</p>
                                    </li>
                                    <li class="font-small">Use forceps to take the bottom part of mold into liquid nitrogen for 1 to 2 min (The OCT should change to white)</li>
                                    </ol>
                                  </div>
                                </li>
                                <li>
                                  <h3 class="font-large">Inactivation</h3>
                                    <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/3-h2o2-ar1108-boster.html" target="_blank">3% H<small>2</small>O<small>2</small>
                                    </a>
                                  </p>
                                  <p class="font-small">Mix <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/3-h2o2-ar1108-boster.html" target="_blank">3% H<small>2</small>O<small>2</small>
                                  </a> with distilled water (v/v: 1:50)</p>
                                  <p class="font-small">Immerse frozen section or cell climbing slice into the diluted H2O2 at room temperature for 10 min</p>
                                    <p class="font-small">Wash the section 3X distilled water (1 min each)</p>
                                    </li>
                                    <li>
                                      <h3 class="font-large">Antigen Retrieval (Proteolytic Induced Epitope Retrieval: PIER)</h3>
                                        <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antigen-retrieval-reagent-ar0022-boster.html" target="_blank">Enzyme Antigen Retrieval Reagent</a> - <a class="text-orange"
                                          href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a>
                                        </p>
                                        <p class="font-small">Dry the frozen sections with filter paper</p>
                                          <p class="font-small">Add <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antigen-retrieval-reagent-ar0022-boster.html" target="_blank">compound digestion solution</a> (e.g. Trypsin solution or other enzymatic antigen
                                            retrieval solution) to the sections or slices</p>
                                            <p class="font-small">Incubate the sections at room temperature for 3 to 5 min</p>
                                              <p class="font-small">Wash the sections with 3X <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a> (5 min each)</p>
                                              </li>
                                              <li>
                                                <h3 class="font-large">Blocking</h3>
                                                  <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/mammalian-tissue-protein-extraction-reagent-ar0101-boster.html" target="_blank">5% BSA blocking solution</a>
                                                  </p>
                                                  <p class="font-small"> Add <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/mammalian-tissue-protein-extraction-reagent-ar0101-boster.html" target="_blank">5% BSA blocking solution</a> or normal goat serum to the PIER treated
                                                    samples </p>
                                                    <p class="font-small"> Incubate the samples at 37°C for 30 min </p>
                                                      <p class="font-small"> Shake off extra liquid and dry the samples with filter paper (No washing required)</p>
                                                      </li>
                                                      <li>
                                                        <h3 class="font-large">Primary Antibody Incubation</h3>
                                                          <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-ar1016-boster.html" target="_blank">Antibody Diluent</a> - <a class="text-orange"
                                                            href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a>
                                                          </p>
                                                          <p class="font-small">Dilute primary antibody with <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-ar1016-boster.html" target="_blank">antibody diluent</a> to the concentration recommended by the antibody
                                                            manufacturer</p>
                                                            <p class="font-small">Add the <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-ar1016-boster.html" target="_blank">diluted antibody</a> to the samples and incubate at 37°C for 30 min</p>
                                                              <p class="font-small">Wash the samples 2X with <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS</a> (20 min each)</p>
                                                              </li>
                                                              <li>
                                                                <h3 class="font-large">Secondary Antibody Incubation</h3>
                                                                  <p class="text-grey">Products Listed : <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-ar1016-boster.html" target="_blank">Antibody Diluent</a> - <a class="text-orange"
                                                                    href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS Buffer</a>
                                                                  </p>
                                                                  <p class="font-small">Dilute biotinylated secondary antibody with <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/antibody-diluent-ar1016-boster.html" target="_blank">antibody diluent</a> to the concentration recommended by
                                                                    the antibody manufacturer</p>
                                                                    <p class="font-small">Add the diluted antibody to the samples and incubate at 37°C for 30 min</p>
                                                                      <p class="font-small">Wash the samples 3X with <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS</a> (8 min each)</p>
                                                                      </li>
                                                                      <li>
                                                                        <h3 class="font-large">IHC Frozen setions Staining Protocol </h3>
                                                                          <p class="text-grey">
                                                                            <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/dab-chromogenic-kit-brown-ar1022-boster.html">DAB Chromogenic Kit, Yellow</a> -
                                                                              <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/aec-kit-ar1020-boster.html">AEC Chromogenic Kit</a> -
                                                                                <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/haematoxylin-ar0005-boster.html">Haematoxylin</a> -
                                                                                  <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/nuclear-fast-red-ar0008-boster.html">Nuclear Fast Red</a> -
                                                                                    <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS</a>
                                                                                    </p>
                                                                                    <p class="font-small">Add Strept-Avidin Biotin Complex (SABC) HRP- or AP-conjugated reagents to the samples</p>
                                                                                      <p class="font-small">Incubate the samples at 37°C for 30 min</p>
                                                                                        <p class="font-small">Wash the samples 3X with <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/pbs-buffer-ar0030-boster.html" target="_blank">PBS</a> (20 min each)</p>
                                                                                          <p class="font-small">Add a suitable amount of <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/dab-chromogenic-kit-brown-ar1022-boster.html">DAB reagent</a> to the samples and incubate in dark at room temperature for 10 to 30
                                                                                            min</p>
                                                                                            <p class="font-small">Monitor the tissue staining intensity under a bright-field microscope*</p>
                                                                                              <p class="font-small">Wash the samples 3X to 5X with distilled water</p>
                                                                                                <p class="font-small">Counterstain (if necessary)</p>
                                                                                                  <p class="font-small">Add <a class="text-orange" href="https://SITE_ORIGIN_PLACEHOLDER/haematoxylin-ar0005-boster.html">Haematoxylin</a> to the sample</p>
                                                                                                    <p class="font-small">Dehydrate</p>
                                                                                                      <p class="font-small">Immerse the paraffin sections 2X in dimethyl benzene (7 min each)</p>
                                                                                                        <p class="font-small">Check the tissue staining intensity under a bright-field microscope<br>* If the staining background is too high, wash the section 4X with 0.01-0.02% TWEEN 20 PBS and 2X with pure PBS after the SABC reaction and
                                                                                                          before DAB staining. Then use DAB to stain the samples.</p>
                                                                                                        </li>
                                                                                                      </ul>
                                                                                                    </div>
                                                                                                  </div>
                                                                                                </div>
                                                                                              </div>
                                                                                            </section>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 27. CMS page (ihc-troubleshooting-guide)

- **Structural hash:** `49c1e5da521863a3` (for cross-reference)
- **URL prefix:** `ihc-troubleshooting-guide`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `ihc-troubleshooting-guide` (page_id 33) — IHC Troubleshooting Guide|Boster
- **All identifiers in cluster:** `ihc-troubleshooting-guide`
- **content_heading:** `Download the IHC Troubleshooting Guide`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<!--Hero section-->
<div class="hero">
  <div class="overlay">&nbsp;</div>
    <div class="row her1">
      <div class="container">
        <div class="col-md-12">
          <div class="logo">
            <!--logo-->
            <div class="hedlogo">IMMUNOHISTOCHEMISTRY TROUBLESHOOTING HANDBOOK</div>
              <!--logo end-->
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <!--<div class="row">
        <div class="col-md-12">
          <div class="logo">
            <!--logo--> <!--<a href="">
            <img src="img/logo.png" data-at2x="img/logo.png" alt="site name"> </a>
            <!--logo end--> <!--</div>
          </div>
        </div>-->
        <div class="row dor1">
          <div class="col-md-6">
            <!--welcome message--> <!-- <h1>Smarter Solutions for the Future</h1>-->
            <h2>Download the troubleshooting guide that can help you get out of most sticky situations in the lab. Having trouble with your western blot bands? Find out quick solutions and many more in the western blot troubleshooting guide.</h2>
              <!--welcome message end--> <!--action button-->
              <div class="action-button">
                <a class="button learn-more text-center" href="#features">DOWNLOAD NOW<em class="fa fa-arrow-right">
                </em>
              </a>&nbsp;</div>
              <div class="action-button">By request 1 handbook, you'll get 3</div>
                <!--action button end--> <!--share button-->
                <div class="action-button shr">
                  <span style="font-size: 24px; font-weight: bold;">SHARE!</span> Pass This On <a href="https://www.facebook.com/bosterbio" target="_blank">
                    <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/facebook.png" alt="" />
                  </a>
                  <a href="https://linkedin.com/profile/view?id=256919055" target="_blank">
                    <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/linked in.png" alt="" />
                  </a>
                  <a href="#" target="_blank">
                    <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/google pluse.png" alt="" />
                  </a>
                  <a href="https://twitter.com/BosterbioCo" target="_blank">
                    <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/twitter.png" alt="" />
                  </a>
                  <a href="#" target="_blank">
                    <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/youtube.png" alt="" />
                  </a>
                  <a href="https://bosterbio.tumblr.com/" target="_blank">
                    <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/tumb_icon.png" alt="" />
                  </a>
                  <a href="#" target="_blank">
                    <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon1.png" alt="" />
                  </a>
                  <a href="https://www.pinterest.com/bosterbio/" target="_blank">
                    <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon2.png" alt="" />
                  </a>
                </div>
                <!--share button end-->
              </div>
              <div class="col-md-6 text-center">
                <img class="book-cover" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/81.png" alt="ebook" />
              </div>
            </div>
          </div>
        </div>
        <!--Hero section end-->
        <p>&nbsp;</p>
          <!--features-->
          <p>&nbsp;</p>
            <!--<section class="features section-spacing text-center" id="features">
            <div class="container">
              <header>
                <h2>Strategic HR and the Future of Work</h2>
                  <p class="feap1">In 2014,bussiness everywhere have started to reassess their workforce strategies and adaptt them to 'the future of work'. Developing and deploying a clear strategy for the next 5-10 years can assist organisations significantly,both to adapt their workplace to a rapidly changing technological and economic environment, and ensure they can attract, maintain and support skilled worker they will rely on in the future.</p>
                    <p class="feap2">Conversely, as the space of change increases and the pool of local skilled workers continues to shrink, business who don't take action
                      now risk losing touch with the people and they will soon come to need most.</p>
                      <p class="feap2">Earlier this year FCB Group conductedan in-depth survey of Australian employers (HR professionals and Business Executives) to gauge opinions about issues affecting the future of the workplace.</p>
                        <p class="feap2">Download our White Paper today for our survey results and practical tips on how to develop your future workforce strategy.</p>
                          <!--<h3>Lorem ipsum dolor sit amet consectetur adip scing elit mauris</h3>-->
                          <p>&nbsp;</p>
                            <!--</header>
                          </div>
                        </section>
                        <!--features end-->
                        <p>&nbsp;</p>
                          <!--sub form-->
                          <div id="features" class="sub-form section-spacing text-center">
                            <div class="container">
                              <p class="arr" style="margin-top: -61px;">
                                <img class="arrim" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/arr2.png" alt="" />
                              </p>
                              <h2>download the handbook</h2>
                                <!--<h3>Lorem ipsum dolor sit amet consectetur adip scing elit mauris</h3>-->
                                <div class="row">
                                  <!--<div class="col-md-6"> <img src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/81.png" alt="ebook preview" data-no-retina> </div>-->
                                  <div class="col-md-12">
                                    <!--<ul class="subul">
                                    <li class="subli">Key insights from industry leaders and experts</li>
                                      <li class="subli">'Big ticket' issues facing employers over the next 5-10 years</li>
                                        <li class="subli">Workplace challenges and how to overcome them in the next 5-10 years</li>
                                          <li class="subli">Our key survey results including digestible statistics</li>
                                          </ul>-->
                                          <form action="https://SITE_ORIGIN_PLACEHOLDER/final-step" method="get" accept-charset="utf-8" enctype="multipart/form-data">
                                            <input type="hidden" name="name" data-label="" value=" " required="">
                                            <input type="hidden" name="frompage" data-label="" value="elisa" required="">
                                            <input type="hidden" name="milestone_activities" data-label="" value="downloaded+ELISA+ebook" required="">
                                            <div>
                                              <p>Email*</p>
                                                <input class="form-control" type="email" name="email" data-label="" value="" required="true">
                                              </div>
                                              <div>
                                                <input class="button learn-more text-center" type="submit" value="Get my Free Ebook Now">
                                              </div>
                                            </form>
                                          </div>
                                        </div>
                                        <!--<div class="row">
                                        <h4 class="pri">Privacy & Confidentiality: </h4>
                                          <p class="prip">We will not disclose your personal information to third parties for their marketing purposes. However, FCB Group may use your personal information to inform you of recent developments in the law and workplace relations, or provide you with newsletter articles or upcoming event details.</p>
                                          </div>-->
                                        </div>
                                      </div>
                                      <!--sub form-->
                                      <p>&nbsp;</p>
                                        <!--Testimonials Start-->
                                        <div class="test section-spacing text-center">
                                          <p class="arr1" style="margin-top: -78px;">
                                            <img class="arrim" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/arr2.png" alt="" />
                                          </p>
                                          <h2>customer feedback</h2>
                                            <div class="tstdiv">
                                              <ul class="bxslider">
                                                <li>
                                                  <blockquote>"As a small lab in the Veterinary school, funding is harder than you can imagine; which is why Boster kits with their reasonable pricing were purchased by us. The kits arrived on time and the customer support and personal attention given to me were outstanding. Boster&rsquo;s human CD40 kit was tested us."</blockquote>
                                                    <p style="text-align: center; color: #000; font-size: 21px; font-weight: 600; margin-left: 17px;">-<strong>
                                                      <strong>Sidonie Lavergne</strong>
                                                      </strong>
                                                    </p>
                                                  </li>
                                                  <li>
                                                    <blockquote>"The product performed well above our expectations, and the datasheets and instructions included with the product were good as well."</blockquote>
                                                      <p style="text-align: center; color: #000; font-size: 21px; font-weight: 600; margin-left: 17px;">-<strong>
                                                        <strong>Standley Moon</strong>
                                                        </strong>
                                                      </p>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                              <!--Testimonials End-->
                                              <p>&nbsp;</p>
                                                <!--site-footer-->
                                                <div class="site-footer section-spacing">
                                                  <div class="container">
                                                    <div class="row">
                                                      <div class="col-md-12 text-center">
                                                        <p class="scroll-top">&nbsp;</p>
                                                          <!--social--> <!-- <ul class="social">
                                                          <!--<li>
                                                          <a href="https://twitter.com/" target="_blank">
                                                            <i class="fa fa-twitter">
                                                            </i>
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a href="https://www.facebook.com/" target="_blank">
                                                            <i class="fa fa-facebook">
                                                            </i>
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a href="https://plus.google.com/" target="_blank">
                                                            <i class="fa fa-google-plus">
                                                            </i>
                                                          </a>
                                                        </li>--> <!-- <li>
                                                        <a href="#">
                                                          <i class="fa fa-linkedin-square">
                                                          </i>
                                                        </a>
                                                      </li>
                                                    </ul>
                                                    <!--social end--> <small>Copyright &copy; 2014 Boster Systems Inc. All rights reserved</small> <!--<p>
                                                    <a href="" data-toggle="modal" data-target="#privacy">Privacy</a> | <a href="" data-toggle="modal" data-target="#terms">Terms of Use</a>
                                                    </p>--> <!-- Privacy Modal --> <!--<div class="modal fade" id="privacy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel-privacy" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                      <div class="modal-content">
                                                        <div class="modal-header">
                                                          <button type="button" class="close" data-dismiss="modal">
                                                            <span aria-hidden="true">&times;</span>
                                                              <span class="sr-only">Close</span>
                                                              </button>
                                                              <h4 class="modal-title" id="myModalLabel-privacy">Privacy</h4>
                                                              </div>
                                                              <div class="modal-body text-left">
                                                                <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>. Nullam iaculis libero non accumsan pharetra. Aenean vel est luctus, rhoncus sapien sit amet, pretium mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis libero non accumsan pharetra.</p>
                                                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis libero non accumsan pharetra. Aenean vel <strong>est luctus</strong>, rhoncus sapien sit amet, pretium mauris.Lorem ipsum dolor sit amet. </p>
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Nullam iaculis</strong> libero non accumsan pharetra. Aenean vel est luctus, rhoncus sapien sit amet, pretium mauris.</p>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <!-- Privacy Modal end --> <!-- Terms of Use Modal --> <!--<div class="modal fade" id="terms" tabindex="-1" role="dialog" aria-labelledby="myModalLabel-terms" aria-hidden="true">
                                                              <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                  <div class="modal-header">
                                                                    <button type="button" class="close" data-dismiss="modal">
                                                                      <span aria-hidden="true">&times;</span>
                                                                        <span class="sr-only">Close</span>
                                                                        </button>
                                                                        <h4 class="modal-title" id="myModalLabel-terms">Terms of Use</h4>
                                                                        </div>
                                                                        <div class="modal-body text-left">
                                                                          <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>. Nullam iaculis libero non accumsan pharetra. Aenean vel est luctus, rhoncus sapien sit amet, pretium mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis libero non accumsan pharetra.</p>
                                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis libero non accumsan pharetra. Aenean vel <strong>est luctus</strong>, rhoncus sapien sit amet, pretium mauris.Lorem ipsum dolor sit amet. </p>
                                                                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Nullam iaculis</strong> libero non accumsan pharetra. Aenean vel est luctus, rhoncus sapien sit amet, pretium mauris.</p>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                        <!-- Terms of Use Modal end -->
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <!--site-footer end-->
                                                                <script type="text/javascript">// <![CDATA[
                                                                  $(document).ready(function () {
                                                                  $('.bxslider').bxSlider({
                                                                  mode: 'fade',
                                                                  slideMargin: 3,
                                                                  auto:true
                                                                  });
                                                                  });
                                                                  // ]]>
                                                                </script>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 28. CMS page (wb-ihc-elisa-troubleshooting-handbooks)

- **Structural hash:** `cb72b32825727712` (for cross-reference)
- **URL prefix:** `wb-ihc-elisa-troubleshooting-handbooks`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `wb-ihc-elisa-troubleshooting-handbooks` (page_id 34) — WB IHC ELISA FACS PCR Troubleshooting Handbooks | Boster
- **All identifiers in cluster:** `wb-ihc-elisa-troubleshooting-handbooks`
- **content_heading:** _empty_
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 text-center hero-section" style="background-image: url(/media/images/design-guide/team1.jpg)">
  <div class="dark-overlap">
    <h1 class="mb-2">Boster's Free Troubleshooting Guides</h1>
      <p class="font-large mb-4">To educators: You are permitted to share this resource and these PDFs on your class website and lab websites. Please make sure to cite or link to the origin.</p>
        <ul class="list-unstyled list-inline-block my-5">
          <li class="mr-3">
            <a class="text-white text-hover-orange" href="#elisa">ELISA Handbook</a>
            </li>
            <li class="mr-3">
              <a class="text-white text-hover-orange" href="#westernblot">Western Blot Handbook</a>
              </li>
              <li class="mr-3">
                <a class="text-white text-hover-orange" href="#ihc">IHC Handbook</a>
                </li>
                <li class="mr-3">
                  <a class="text-white text-hover-orange" href="#facs">Flow/FACS Handbook</a>
                  </li>
                  <li class="mr-3">
                    <a class="text-white text-hover-orange" href="#pcr">PCR Handbook</a>
                    </li>
                    <li class="mr-3">
                      <a class="text-white text-hover-orange" href="#chip">ChIP Handbook</a>
                      </li>
                      <li class="mr-3">
                        <a class="text-white text-hover-orange" href="#model">Model Organism Handbook</a>
                        </li>
                      </ul>
                    </div>
                  </section>
                  <section class="mb-6 single-column content-section" id="Introduction">
                    <div class="container">
                      <div class="row">
                        <div class="col-md-12">
                          <p class="text-grey w-75 mx-auto mb-5 text-center">Click any of the following to see more details</p>
                            <p>You are at the right place and at the right time for our latest series of troubleshooting handbooks. They are available at your fingertips with just a few clicks. Learn more about the benefits of reading this series and take advantage
                              of our technical materials that we have diligently prepared for you to significantly increase your success rate.</p>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section class="mb-6 double-column content-section" id="elisa">
                        <div class="container">
                          <div class="row">
                            <div class="col-md-4 p-0">
                              <div style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER/media/images/elisa-handbook-cover.png);" class="h-100 background-contain">
                              </div>
                            </div>
                            <div class="col-md-8 p-0">
                              <div class="bg-lightgrey p-5">
                                <h2 class="font-large text-orange mb-2">ELISA Handbook</h2>
                                  <p class="mb-2">This guide will teach you everything you need to become a ELISA expert, including critical review of principle, all-in-one FAQs and more.</p>
                                    <div class="row mb-4">
                                      <ul class="list-unstyled col-6 ">
                                        <li class="mb-2 text-midgrey">ELISA Principle</li>
                                          <li class="mb-2 text-midgrey">Optimized Protocol</li>
                                          </ul>
                                          <ul class="list-unstyled col-6 ">
                                            <li class="mb-2 text-midgrey">150+ Troubleshooting Advices</li>
                                              <li class="mb-2 text-midgrey">Frequently Asked Questions</li>
                                              </ul>
                                            </div>
                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/elisa-troubleshooting-guide-download-page" class="btn-orange">
                                              <i class="fas fa-download">
                                              </i> Download ELISA Handbook</a> </div>
                                            </div>
                                          </div>
                                        </div>
                                      </section>
                                      <section class="mb-6 double-column content-section" id="westernblot">
                                        <div class="container">
                                          <div class="row">
                                            <div class="col-md-4 p-0">
                                              <div style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER/media/images/western-blotting-handbook-cover.png);" class="h-100 background-contain">
                                              </div>
                                            </div>
                                            <div class="col-md-8 p-0">
                                              <div class="bg-lightgrey p-5">
                                                <h2 class="font-large text-orange mb-2">Western Blot Handbook</h2>
                                                  <p class="mb-2">This guide will teach you everything you need to become a Western Blot (WB) expert, including comprehensive principle overview, insightful troubleshooting tips and more.</p>
                                                    <div class="row mb-4">
                                                      <ul class="list-unstyled col-6 ">
                                                        <li class="mb-2 text-midgrey">Western Blot Principle</li>
                                                          <li class="mb-2 text-midgrey">Optimized Protocol</li>
                                                          </ul>
                                                          <ul class="list-unstyled col-6 ">
                                                            <li class="mb-2 text-midgrey">100+ Troubleshooting Advices</li>
                                                              <li class="mb-2 text-midgrey">Frequently Asked Questions</li>
                                                              </ul>
                                                            </div>
                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/western-blotting-troubleshooting-guide-download-page" class="btn-orange">
                                                              <i class="fas fa-download">
                                                              </i> Download Western Blot Handbook</a> </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </section>
                                                      <section class="mb-6 double-column content-section" id="ihc">
                                                        <div class="container">
                                                          <div class="row">
                                                            <div class="col-md-4 p-0">
                                                              <div style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER/media/images/immunohistochemistry-handbook-cover.png);" class="h-100 background-contain">
                                                              </div>
                                                            </div>
                                                            <div class="col-md-8 p-0">
                                                              <div class="bg-lightgrey p-5">
                                                                <h2 class="font-large text-orange mb-2">IHC Handbook</h2>
                                                                  <p class="mb-2">This guide will show you all the nuts and bolts for Immunohistochemistry (IHC), including expert review of principle, optimized protocol that really works and more.</p>
                                                                    <div class="row mb-4">
                                                                      <ul class="list-unstyled col-6 ">
                                                                        <li class="mb-2 text-midgrey">Immunohistochemistry (IHC) Principle</li>
                                                                          <li class="mb-2 text-midgrey">Optimized Protocol</li>
                                                                          </ul>
                                                                          <ul class="list-unstyled col-6 ">
                                                                            <li class="mb-2 text-midgrey">Comprehensive Troubleshooting Tips</li>
                                                                              <li class="mb-2 text-midgrey">Frequently Asked Questions</li>
                                                                              </ul>
                                                                            </div>
                                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/immunohistochemistry-troubleshooting-guide-download-page" class="btn-orange">
                                                                              <i class="fas fa-download">
                                                                              </i> Downlaod IHC Handbook</a> </div>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </section>
                                                                      <section class="mb-6 double-column content-section" id="facs">
                                                                        <div class="container">
                                                                          <div class="row">
                                                                            <div class="col-md-4 p-0">
                                                                              <div style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER/media/images/flow-cytometry-facs-handbook-cover.png);" class="h-100 background-contain">
                                                                              </div>
                                                                            </div>
                                                                            <div class="col-md-8 p-0">
                                                                              <div class="bg-lightgrey p-5">
                                                                                <h2 class="font-large text-orange mb-2">Flow/FACS Handbook</h2>
                                                                                  <p class="mb-2">This guide will show you all the nuts and bolts for Flow Cytometry and FACS, including expert review of principle, optimized protocol that really works and more.</p>
                                                                                    <div class="row mb-4">
                                                                                      <ul class="list-unstyled col-6 ">
                                                                                        <li class="mb-2 text-midgrey">Flow Cytometry/FACS Principle</li>
                                                                                          <li class="mb-2 text-midgrey">Optimized Protocol</li>
                                                                                          </ul>
                                                                                          <ul class="list-unstyled col-6 ">
                                                                                            <li class="mb-2 text-midgrey">Comprehensive Troubleshooting Tips</li>
                                                                                              <li class="mb-2 text-midgrey">Frequently Asked Questions</li>
                                                                                              </ul>
                                                                                            </div>
                                                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/flow-cytometry-facs-troubleshooting-guide-download-page" class="btn-orange">
                                                                                              <i class="fas fa-download">
                                                                                              </i> Download Flow/FACS Handbook</a> </div>
                                                                                            </div>
                                                                                          </div>
                                                                                        </div>
                                                                                      </section>
                                                                                      <section class="mb-6 double-column content-section" id="pcr">
                                                                                        <div class="container">
                                                                                          <div class="row">
                                                                                            <div class="col-md-4 p-0">
                                                                                              <div style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER/media/images/molecular-biology-handbook-cover.png);" class="h-100 background-contain">
                                                                                              </div>
                                                                                            </div>
                                                                                            <div class="col-md-8 p-0">
                                                                                              <div class="bg-lightgrey p-5">
                                                                                                <h2 class="font-large text-orange mb-2">PCR Handbook</h2>
                                                                                                  <p class="mb-2">This guide will teach you everything you need to become a PCR expert, including a critical review of PCR and molecular biology principles, protocols, all-in-one FAQs, and more.</p>
                                                                                                    <div class="row mb-4">
                                                                                                      <ul class="list-unstyled col-6 ">
                                                                                                        <li class="mb-2 text-midgrey">PCR Principle</li>
                                                                                                          <li class="mb-2 text-midgrey">Optimized Protocol</li>
                                                                                                          </ul>
                                                                                                          <ul class="list-unstyled col-6 ">
                                                                                                            <li class="mb-2 text-midgrey">Troubleshooting Guide</li>
                                                                                                              <li class="mb-2 text-midgrey">Frequently Asked Questions</li>
                                                                                                              </ul>
                                                                                                            </div>
                                                                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/pcr-troubleshooting-guide-download-page" class="btn-orange">
                                                                                                              <i class="fas fa-download">
                                                                                                              </i> Download PCR Handbook</a> </div>
                                                                                                            </div>
                                                                                                          </div>
                                                                                                        </div>
                                                                                                      </section>
                                                                                                      <section class="mb-6 double-column content-section" id="chip">
                                                                                                        <div class="container">
                                                                                                          <div class="row">
                                                                                                            <div class="col-md-4 p-0">
                                                                                                              <div style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER/media/images/chip-handbook-cover.png);" class="h-100 background-contain">
                                                                                                              </div>
                                                                                                            </div>
                                                                                                            <div class="col-md-8 p-0">
                                                                                                              <div class="bg-lightgrey p-5">
                                                                                                                <h2 class="font-large text-orange mb-2">ChIP Handbook</h2>
                                                                                                                  <p class="mb-2">This guide will discuss the fundamentals of chromatin immunoprecipitation (ChIP), including a comprehensive review of types of ChIP, protocols, optimization tips, troubleshooting, FAQs, and more.</p>
                                                                                                                    <div class="row mb-4">
                                                                                                                      <ul class="list-unstyled col-6 ">
                                                                                                                        <li class="mb-2 text-midgrey">ChIP Principle</li>
                                                                                                                          <li class="mb-2 text-midgrey">Optimized Protocol</li>
                                                                                                                          </ul>
                                                                                                                          <ul class="list-unstyled col-6 ">
                                                                                                                            <li class="mb-2 text-midgrey">Troubleshooting Guide</li>
                                                                                                                              <li class="mb-2 text-midgrey">Frequently Asked Questions</li>
                                                                                                                              </ul>
                                                                                                                            </div>
                                                                                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/chip-troubleshooting-guide-download-page" class="btn-orange">
                                                                                                                              <i class="fas fa-download">
                                                                                                                              </i> Download ChIP Handbook</a> </div>
                                                                                                                            </div>
                                                                                                                          </div>
                                                                                                                        </div>
                                                                                                                      </section>
                                                                                                                      <section class="mb-6 double-column content-section" id="model">
                                                                                                                        <div class="container">
                                                                                                                          <div class="row">
                                                                                                                            <div class="col-md-4 p-0">
                                                                                                                              <div style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER);" class="h-100 background-contain">
                                                                                                                              </div>
                                                                                                                            </div>
                                                                                                                            <div class="col-md-8 p-0">
                                                                                                                              <div class="bg-lightgrey p-5">
                                                                                                                                <h2 class="font-large text-orange mb-2">How to Choose a Model Organism Handbook</h2>
                                                                                                                                  <p class="mb-2">This guide will help you choose the best model organisms for your research by comparing traditional and non-traditional models, outlining selection criteria, profiling 10 key organisms, and providing resources and guidelines.</p>
                                                                                                                                    <div class="row mb-4">
                                                                                                                                      <ul class="list-unstyled col-6 ">
                                                                                                                                        <li class="mb-2 text-midgrey">Traditional vs. Non-Traditional Model Organisms</li>
                                                                                                                                          <li class="mb-2 text-midgrey">Criteria for Selecting a Model Organism</li>
                                                                                                                                          </ul>
                                                                                                                                          <ul class="list-unstyled col-6 ">
                                                                                                                                            <li class="mb-2 text-midgrey">Overview of 10 Model Organisms</li>
                                                                                                                                              <li class="mb-2 text-midgrey">Resources and Guidelines for Each Model organism</li>
                                                                                                                                              </ul>
                                                                                                                                            </div>
                                                                                                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/how-to-choose-a-model-organism-guide-download-page" class="btn-orange">
                                                                                                                                              <i class="fas fa-download">
                                                                                                                                              </i> Download Model Organism Handbook</a> </div>
                                                                                                                                            </div>
                                                                                                                                          </div>
                                                                                                                                        </div>
                                                                                                                                      </section>
                                                                                                                                      <section class="cjinternallinks mb-6 multi-column content-section"> <div class="container p-3"> <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-6">Related Pages</h2> <div class="row multicolumns">
                                                                                                                                        <div class="col-md-3"> <div class="bg-light p-4 border-rounded text-center h-100"> <h3 class="text-orange font-large">Western Blotting Troubleshooting Guide Download Page</h3> <p>100+ Troubleshooting Advice Having our comprehensive troubleshooting tips right on your bench side can save you a lot of precious time and headache. Western Blot Principle Having a solid understanding of how Western blot works significantly increases...</p>  <a href="/western-blotting-troubleshooting-guide-download-page" class="d-block btn-orange stretched-link">See More</a>
                                                                                                                                        </div> </div>
                                                                                                                                        <div class="col-md-3"> <div class="bg-light p-4 border-rounded text-center h-100"> <h3 class="text-orange font-large">Picokine ELISA Kit Troubleshooting</h3> <p>Get to know some of ELISA troubleshooting tips with this guide. It has some commonly encountered problems and solutions to ELISA like a weak signal, high background, and low sensitivity. Check it out to resolve the most encountered problems in ELISA.</p>  <a href="/protocol-and-troubleshooting/picokine-elisa-troubleshooting" class="d-block btn-orange stretched-link">See More</a>
                                                                                                                                        </div> </div>
                                                                                                                                        <div class="col-md-3"> <div class="bg-light p-4 border-rounded text-center h-100"> <h3 class="text-orange font-large">Western Blot Troubleshooting</h3> <p>These artifacts are most commonly the result of uneven coating of buffer or antibody, the membrane drying out, or aggregates forming in the antibody or blocking buffer. Learn about Western Blot Principle <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/western-blot-sample-preparation-guide" style="color:#EA8D28">Western Blot Sample Preparation</a> Check out this...</p>  <a href="/protocol-and-troubleshooting/western-blot-troubleshooting" class="d-block btn-orange stretched-link">See More</a>
                                                                                                                                        </div> </div>
                                                                                                                                        <div class="col-md-3"> <div class="bg-light p-4 border-rounded text-center h-100"> <h3 class="text-orange font-large">western blot success</h3> <p>Product Review Anti-GRP94 Antibody (PA1340) Review : "This is an excellent antibody to endoplasmin in HC
                                                                                                                                          <!-- TRUNCATED: 15337 chars total — open docs/cms-pages-full-export.tsv row page_id=34 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 29. CMS page (elisa-troubleshooting-guide)

- **Structural hash:** `06bad8ce9ca904dd` (for cross-reference)
- **URL prefix:** `elisa-troubleshooting-guide`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `elisa-troubleshooting-guide` (page_id 35) — ELISA troubleshooting Handbook
- **All identifiers in cluster:** `elisa-troubleshooting-guide`
- **content_heading:** `Download the ELISA Troubleshooting Guide`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<!--Hero section-->
<div class="hero">
  <div class="overlay">&nbsp;</div>
    <div class="row her1">
      <div class="container">
        <div class="col-md-12">
          <div class="logo">
            <!--logo-->
            <div class="hedlogo">ELISA PRINCIPLE <span style="font-size: 38px;">AND</span> TROUBLESHOOTING HANDBOOK</div>
              <!--logo end-->
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <!--<div class="row">
        <div class="col-md-12">
          <div class="logo">
            <!--logo--> <!--<a href="">
            <img src="img/logo.png" data-at2x="img/logo.png" alt="site name"> </a>
            <!--logo end--> <!--</div>
          </div>
        </div>-->
        <div class="row dor1">
          <div class="col-md-6">
            <!--welcome message--> <!-- <h1>Smarter Solutions for the Future</h1>-->
            <h2>Download the troubleshooting guide that can help you get out of most sticky situations in the lab. Having trouble with your western blot bands? Find out quick solutions and many more in the western blot troubleshooting guide.</h2>
              <!--welcome message end--> <!--action button-->
              <div class="action-button">
                <a class="button learn-more text-center" href="#features">DOWNLOAD NOW<em class="fa fa-arrow-right">
                </em>
              </a>&nbsp;</div>
              <div class="action-button">By request 1 handbook, you'll get 3<!--<a href="#" class="button buy text-center">Buy Now <i class="fa fa-shopping-cart">
              </i>
            </a>
            <p>*Avaliable in PDF, ePUB, Mobi &amp; Kindle.</p>-->
            </div>
            <!--action button end--> <!--share button-->
            <div class="action-button shr">
              <span style="font-size: 24px; font-weight: bold;">SHARE!</span> Pass This On <a href="https://www.facebook.com/bosterbio" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/facebook.png" alt="" />
              </a>
              <a href="https://linkedin.com/profile/view?id=256919055" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/linked in.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/google pluse.png" alt="" />
              </a>
              <a href="https://twitter.com/BosterbioCo" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/twitter.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/youtube.png" alt="" />
              </a>
              <a href="https://bosterbio.tumblr.com/" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/tumb_icon.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon1.png" alt="" />
              </a>
              <a href="https://www.pinterest.com/bosterbio/" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon2.png" alt="" />
              </a>
            </div>
            <!--share button end-->
          </div>
          <div class="col-md-6 text-center">
            <img class="book-cover" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/82.png" alt="ebook" />
          </div>
        </div>
      </div>
    </div>
    <!--Hero section end-->
    <p>&nbsp;</p>
      <!--features-->
      <p>&nbsp;</p>
        <!--<section class="features section-spacing text-center" id="features">
        <div class="container">
          <header>
            <h2>Strategic HR and the Future of Work</h2>
              <p class="feap1">In 2014,bussiness everywhere have started to reassess their workforce strategies and adaptt them to 'the future of work'. Developing and deploying a clear strategy for the next 5-10 years can assist organisations significantly,both to adapt their workplace to a rapidly changing technological and economic environment, and ensure they can attract, maintain and support skilled worker they will rely on in the future.</p>
                <p class="feap2">Conversely, as the space of change increases and the pool of local skilled workers continues to shrink, business who don't take action
                  now risk losing touch with the people and they will soon come to need most.</p>
                  <p class="feap2">Earlier this year FCB Group conductedan in-depth survey of Australian employers (HR professionals and Business Executives) to gauge opinions about issues affecting the future of the workplace.</p>
                    <p class="feap2">Download our White Paper today for our survey results and practical tips on how to develop your future workforce strategy.</p>
                      <!--<h3>Lorem ipsum dolor sit amet consectetur adip scing elit mauris</h3>-->
                      <p>&nbsp;</p>
                        <!--</header>
                      </div>
                    </section>
                    <!--features end-->
                    <p>&nbsp;</p>
                      <!--sub form-->
                      <div id="features" class="sub-form section-spacing text-center">
                        <div class="container">
                          <p class="arr" style="margin-top: -61px;">
                            <img class="arrim" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/arr2.png" alt="" />
                          </p>
                          <h2>download the handbook</h2>
                            <!--<h3>Lorem ipsum dolor sit amet consectetur adip scing elit mauris</h3>-->
                            <div class="row">
                              <!--<div class="col-md-6"> <img src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/82.png" alt="ebook preview" data-no-retina> </div>-->
                              <div class="col-md-12">
                                <!--<ul class="subul">
                                <li class="subli">Key insights from industry leaders and experts</li>
                                  <li class="subli">'Big ticket' issues facing employers over the next 5-10 years</li>
                                    <li class="subli">Workplace challenges and how to overcome them in the next 5-10 years</li>
                                      <li class="subli">Our key survey results including digestible statistics</li>
                                      </ul>-->
                                      <form class="whitepaper-registration form-inline" action="https://boster.od1.vtiger.com/modules/Webforms/capture.php" method="post" enctype="multipart/form-data" accept-charset="utf-8">
                                        <input type="hidden" name="__vtrftk" value="sid:1e21f373cf331b33514de8232df127c57c41bf19,1419287883" /> <input type="hidden" name="publicid" value="def188b29da71ff75ab05bc139526cec" /> <input type="hidden" name="urlencodeenable" value="1" /> <input type="hidden" name="name" value="troubleshooting guides download" />
                                        <div class="form-group">
                                          <div class="input-group-addon">Last Name</div>
                                            <input id="id_name" class="form-control" type="text" name="lastname" /> <!-- <i class="fa fa-user first-name-i">
                                          </i>-->
                                          <!--<input id="id_name" type="text" name="name" maxlength="255" />-->
                                        </div>
                                        <div class="form-group">
                                          <div class="input-group-addon">First Name</div>
                                            <input id="id_first" class="form-control" type="text" name="firstname" /> <!-- <i class="fa fa-user first-name-i">
                                          </i>-->
                                          <!--<input id="id_job_title" type="text" name="job_title" maxlength="255" />-->
                                        </div>
                                        <div class="form-group">
                                          <div class="input-group-addon">Company</div>
                                            <input id="id_company" class="form-control" type="text" name="company" /> <!-- <i class="fa fa-user last-name-i">
                                          </i>-->
                                          <!--<input id="id_company" type="text" name="company" maxlength="255" />-->
                                        </div>
                                        <div class="form-group">
                                          <div class="input-group-addon">Title</div>
                                            <input id="id_your_email_address" class="form-control" type="text" name="label%3ATitle" /> <!--<i class="fa fa-envelope">
                                          </i>-->
                                          <!--<input type="text" name="your_email_address" id="id_your_email_address" />-->
                                        </div>
                                        <div class="form-group">
                                          <div class="input-group-addon">Email</div>
                                            <input id="id_company" class="form-control" type="email" name="email" /> <!-- <i class="fa fa-user last-name-i">
                                          </i>-->
                                          <!--<input id="id_company" type="text" name="company" maxlength="255" />-->
                                        </div>
                                        <div class="form-group">
                                          <div class="input-group-addon">Phone</div>
                                            <input id="id_your_email_address" class="form-control" type="text" name="phone" /> <!--<i class="fa fa-envelope">
                                          </i>-->
                                          <!--<input type="text" name="your_email_address" id="id_your_email_address" />-->
                                        </div>
                                        <div class="form-group">
                                          <div class="input-group-addon">State</div>
                                            <input id="id_state" class="form-control" type="text" name="state" />
                                          </div>
                                          <div class="form-group">
                                            <div class="input-group-addon" hidden=true>Lead Source</div>
                                              <select name="leadsource" hidden=true>
                                                <option value="">Select Value</option> <option selected="selected" value="Troubleshooting handbook">Troubleshooting handbook</option> </select>
                                                </div>
                                                <div>&nbsp;</div>
                                                  <button class="btn btn-default" type="submit">DOWNLOAD NOW</button> <!--<input type="submit" value="View white paper" />-->
                                                  </form>
                                                  <script type="text/javascript">// <![CDATA[
                                                    window.onload = function() { var N=navigator.appName, ua=navigator.userAgent, tem;var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];M=M? [M[1], M[2]]: [N, navigator.appVersion, "-?"];var browserName = M[0];var form = document.forms[0], inputs = form.elements; form.onsubmit = function() { var required = [], att, val; for (var i = 0; i < inputs.length; i++) { att = inputs[i].getAttribute("required"); val = inputs[i].value; type = inputs[i].type; if(type == "email") {if(val != "") {var elemLabel = inputs[i].getAttribute("label");var emailFilter = /^[_/a-zA-Z0-9]+([!"#$%&()*+,./:;<=>?\^_`{|}~-]?[a-zA-Z0-9/_/-])*@[a-zA-Z0-9]+([\_\-\.]?[a-zA-Z0-9]+)*\.([\-\_]?[a-zA-Z0-9])+(\.?[a-zA-Z0-9]+)?$/;var illegalChars= /[\(\)\<\>\,\;\:\"\[\]]/ ;if (!emailFilter.test(val)) {alert("For "+ elemLabel +" field please enter valid email address"); return false;} else if (val.match(illegalChars)) {alert(elemLabel +" field contains illegal characters");return false;}}}if (att != null) { if (val.replace(/^\s+|\s+$/g, "") == "") { required.push(inputs[i].getAttribute("label")); } } } if (required.length > 0) { alert("The following fields are required: " + required.join()); return false; } var numberTypeInputs = document.querySelectorAll("input[type=number]");for (var i = 0; i < numberTypeInputs.length; i++) { val = numberTypeInputs[i].value;var elemLabel = numberTypeInputs[i].getAttribute("label");if(val != "") {var intRegex = /^[+-]?\d+$/;if (!intRegex.test(val)) {alert("For "+ elemLabel +" field please enter valid number"); return false;}}}}; }
                                                    // ]]>
                                                  </script>
                                                </div>
                                              </div>
                                              <!--<div class="row">
                                              <h4 class="pri">Privacy & Confidentiality: </h4>
                                                <p class="prip">We will not disclose your personal information to third parties for their marketing purposes. However, FCB Group may use your personal information to inform you of recent developments in the law and workplace relations, or provide you with newsletter articles or upcoming event details.</p>
                                                </div>-->
                                              </div>
                                            </div>
                                            <!--sub form-->
                                            <p>&nbsp;</p>
                                              <!--Testimonials Start-->
                                              <div class="test section-spacing text-center">
                                                <p class="arr1" style="margin-top: -78px;">
                                                  <img class="arrim" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/arr2.png" alt="" />
                                                </p>
                                                <h2>customer feedback</h2>
                                                  <div class="tstdiv">
                                                    <ul class="bxslider">
                                                      <li>
                                                        <blockquote>"As a small lab in the Veterinary school, funding is harder than you can imagine; which is why Boster kits with their reasonable pricing were purchased by us. The kits arrived on time and the customer support and personal attention given to me were outstanding. Boster&rsquo;s human CD40 kit was tested us. "</blockquote>
                                                          <p style="text-align: center; color: #000; font-size: 21px; font-weight: 600; margin-left: 17px;">-<strong>
                                                            <strong> Sidonie Lavergne</strong>
                                                            </strong>
                                                          </p>
                                                        </li>
                                                        <li>
                                                          <blockquote>" The product performed well above our expectations, and the datasheets and instructions included with the product were good as well."</blockquote>
                                                            <p style="text-align: center; color: #000; font-size: 21px; font-weight: 600; margin-left: 17px;">-<strong>
                                                              <strong>Standley Moon</strong>
                                                              </strong>
                                                            </p>
                                                          </li>
                                                          <li>
                                                            <blockquote>"It is a great privilege to write this review for Boster Biologics. I am a postgraduate student at the University of Mosul, Iraq. Boster Biologics' PicoKine&trade; ELISA kits I are very user friendly. They were delivered to HarithDahham, B.D.Sc, M.Sc, College of Dentistry, University of Mosul, Mosul Cit."</blockquote>
                                                              <p style="text-align: center; color: #000; font-size: 21px; font-weight: 600; margin-left: 17px;">-<strong>
                                                                <strong> Harith Dahham</strong>
                                                                </strong>
                                                                <br />B.D.Sc, M.Sc, College of Dentistry,</p>
                                                              </li>
                                                            </ul>
                                                          </div>
                                                        </div>
                                                        <!--Testimonials End-->
                                                        <p>&nbsp;</p>
                                                          <!--site-footer-->
                                                          <div class="site-footer section-spacing">
                                                            <div class="container">
                                                              <div class="row">
                                                                <div class="col-md-12 text-center">
                                                                  <p class="scroll-top">&nbsp;</p>
                                                                    <!--social--> <!-- <ul class="social">
                                                                    <!--<li>
                                                                    <a href="https://twitter.com/" target="_blank">
                                                                      <i class="fa fa-twitter">
                                                                      </i>
                                                                    </a>
                                                                  </li>
                                                                  <li>
                                                                    <a href="https://www.facebook.com/" target="_blank">
                                                                      <i class="fa fa-facebook">
                                                                      </i>
                                                                    </a>
                                                                  </li>
                                                                  <li>
                                                                    <a href="https://plus.google.com/" target="_blank">
                                                                      <i class="fa fa-google-plus">
                                                                      </i>
                                                                    </a>
                                                                  </li>--> <!-- <li>
                                                                  <a href="#">
                                                                    <i class="fa fa-linkedin-square">
                                                                    </i>
                                                                  </a>
                                                                </li>
                                                              </ul>
                                                              <!--social end--> <small>Copyright &copy; 2014 Boster Systems Inc. All rights reserved</small> <!--<p>
                                                              <a href="" data-toggle="modal" data-target="#privacy">Privacy</a> | <a href="" data-toggle="modal" data-target="#terms">Terms of Use</a>
                                                              </p>--> <!-- Privacy Modal --> <!--<div class="modal fade" id="privacy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel-privacy" aria-hidden="true">
                                                              <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                  <div class="modal-header">
                                                                    <button type="button" class="close" data-dismiss="modal">
                                                                      <span aria-hidden="true">&times;</span>
                                                                        <span class="sr-only">Close</span>
                                                                        </button>
                                                                        <h4 class="modal-title" id="myModalLabel-privacy">Privacy</h4>
                                                                        </div>
                                                                        <div class="modal-body text-left">
                                                                          <p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>. Nullam iaculis libero non accumsan pharetra. Aenean vel est luctus, rhoncus sapien sit amet, pretium mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis libero non accumsan pharetra.</p>
                                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis libero non accumsan pharetra. Aenean vel <strong>est luctus</strong>, rhoncus sapien sit amet, pretium mauris.Lorem ipsum dolor sit amet. </p>
                                                                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <s
                                                                                <!-- TRUNCATED: 16006 chars total — open docs/cms-pages-full-export.tsv row page_id=35 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 30. CMS page (thank-you)

- **Structural hash:** `467a5d5fc04f9f67` (for cross-reference)
- **URL prefix:** `thank-you`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `thank-you` (page_id 37) — Thank you!
- **All identifiers in cluster:** `thank-you`
- **content_heading:** _empty_
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 p-3 bg-orange cta-section">
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-12">
        <h3 class="font-large">Check your spam folder</h3>
          <p>A follow up email to your request might land in your spam folder. If you expect a communication from us but have not received it, please check your spam folder. </p>
          </div>
        </div>
      </div>
    </section>
    <div class="hide-for-low-value">
      <h1 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">SChedule a meeting with us !</h1>
        <p class="text-grey text-center w-75 mx-auto mb-1 font-medium">Loading booking calendar... could take up to 5 seconds</p>
          <!-- Calendly inline widget begin -->
          <div class="calendly-inline-widget" data-url="https://calendly.com/bosterbio/book" style="min-width:320px;height:630px;">
          </div>
          <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js">
          </script>
          <!-- Calendly inline widget end -->
        </div>
        <script>
          var url=window.location.href;
          var lowValueSources=["sample"];
          for(i=0;i<lowValueSources.length;i++){
          if(url.indexOf(lowValueSources[i])>-1){document.querySelector(".hide-for-low-value").classList.add("hidden");}
          }
        </script>
        <section class="mb-6 pb-6">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3 mb-5">Thank you!</h2>
                  <h3 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3 mb-5">Promotions</h3>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4 col-12">
                    <div class="bg-white border-rounded mx-auto text-center">
                      <h3 class="text-orange font-large">Review For Rewards</h3>
                        <img src="https://SITE_ORIGIN_PLACEHOLDER/media/amazon-giftcard-image.jpg" alt="thank_you_biocompare" title="thank_you_biocompare" class="mb-3" width="250" loading="lazy">
                        <p class="mb-5">Write a review on Biocompare and receive a $20 Amazon gift card.</p>
                          <a href="/promotions/review-and-interview-rewards" target="_blank" class="d-block btn-orange">More Details</a>
                          </div>
                        </div>
                        <div class="col-lg-4 col-12">
                          <div class="bg-white border-rounded mx-auto text-center">
                            <h3 class="text-orange font-large">Free Secondary Antibody</h3>
                              <img src="https://SITE_ORIGIN_PLACEHOLDER/media/secondary-antibodies-promotion1.png" alt="thank_you_free_secondary" title="thank_you_free_secondary" class="mb-3" width="250" loading="lazy">
                              <p class="mb-4">Purchase any primary antibody and get a free 0.5mg HRP or Biotin secondary antibody.</p>
                                <a href="https://SITE_ORIGIN_PLACEHOLDER/promotions/buy-primary-antibody-get-free-secondary-antibody" target="_blank" class="d-block btn-orange">More Details</a>
                                </div>
                              </div>
                              <div class="col-lg-4 col-12">
                                <div class="bg-white border-rounded mx-auto text-center">
                                  <h3 class="text-orange font-large">$600 Custom Antibodies</h3>
                                    <img src="https://SITE_ORIGIN_PLACEHOLDER/media/discontinued-antibodies-rare-species.jpg" alt="thank_you_free_kits" title="thank_you_free_kits" class="mb-3" width="235" loading="lazy">
                                    <p class="mb-4">Start a custom antibody project for as low as $600. See qualifying conditions to see if you can take advantage of this promotion. </p>
                                      <a href="https://SITE_ORIGIN_PLACEHOLDER/services/custom-antibody-for-rare-species-and-discontinued-antibodies" target="_blank" class="d-block btn-orange">More Details</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>
                              <section class="mb-6 pb-6">
                                <div class="container">
                                  <div class="row">
                                    <div class="col-12">
                                      <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3 mb-5">Product Categories</h2>
                                      </div>
                                    </div>
                                    <div class="row multicolumns">
                                      <div class="col">
                                        <div class="bg-white p-4 border-rounded border m-auto text-center">
                                          <h3 class="text-orange font-large">Primary Antibodies</h3>
                                            <p>Boster offers high affinity primary antibodies both monoclonal and polyclonal. Boster's primary antibodies are well cited over the past 31 years have continue to be trusted by the research community.  </p>
                                              <a href="https://SITE_ORIGIN_PLACEHOLDER/primary-antibodies" class="d-block btn-orange stretched-link">Browse all antibodies</a>
                                              </div>
                                            </div>
                                            <div class="col">
                                              <div class="bg-white p-4 border-rounded border m-auto text-center">
                                                <h3 class="text-orange font-large">ELISA Kits</h3>
                                                  <p>Boster Biological Technology has 31 years of experience in manufacturing ELISA kits and antibodies. As a trusted ELISA kit company, we proudly offer 1000+ ELISA test kits, covering human, mouse, rat and othres. </p>
                                                    <a href="https://SITE_ORIGIN_PLACEHOLDER/elisa-kits" class="d-block btn-orange stretched-link">See all ELISA kits</a>
                                                    </div>
                                                  </div>
                                                  <div class="col">
                                                    <div class="bg-white p-4 border-rounded border m-auto text-center">
                                                      <h3 class="text-orange font-large">Recombinant Proteins</h3>
                                                        <p>Boster provides 10,000+ recombinant proteins expressed from E. Coli as well as insect and mammalian cells. Bulk discount available please contact us at support@bosterbio.com for more details on our proteins. </p>
                                                          <a href="/recombinant-proteins" class="d-block btn-orange stretched-link">I want some proteins</a>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </section>
                                                  <section class="mb-6 pb-6">
                                                    <div class="container">
                                                      <div class="row">
                                                        <div class="col-12">
                                                          <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3 mb-5">Boster Services</h2>
                                                          </div>
                                                        </div>
                                                        <div class="row multicolumns">
                                                          <div class="col">
                                                            <div class="bg-white p-4 border-rounded border m-auto text-center">
                                                              <h3 class="text-orange font-large">Custom Antibody</h3>
                                                                <p>Let us help you make the antibody you need for your research! We offer both monoclonal and polyclonal antibody custom production service. We also feature some impressive discounts if your project fits one of these 3 criteria...</p>
                                                                  <a href="https://SITE_ORIGIN_PLACEHOLDER/services/recombinant-protein-expression-service" class="d-block btn-orange stretched-link">Make me some antibodies</a>
                                                                  </div>
                                                                </div>
                                                                <div class="col">
                                                                  <div class="bg-white p-4 border-rounded border m-auto text-center">
                                                                    <h3 class="text-orange font-large">Protein Expression</h3>
                                                                      <p>Protein expression is a key upstream technology for antibody production. Boster Bio expresses thousands of proteins each year for its own antibody production. Inquire for more information about our protein services. </p>
                                                                        <a href="https://SITE_ORIGIN_PLACEHOLDER/services/recombinant-protein-expression-service" class="d-block btn-orange stretched-link">Propel my research</a>
                                                                        </div>
                                                                      </div>
                                                                      <div class="col">
                                                                        <div class="bg-white p-4 border-rounded border m-auto text-center">
                                                                          <h3 class="text-orange font-large">CRO Assay Services</h3>
                                                                            <p>Boster has been service the science community for almost 3 decades focusing on WB, IHC, ELISA, ISH and Flow cytometry. Our technical teams perform hundreds of assays each week. We can do yours too, cost effectively.</p>
                                                                              <a href="/services/assay-services" class="d-block btn-orange stretched-link">Outsource my research</a>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </section>
                                                                      <section class="mb-6 pb-6">
                                                                        <div class="container">
                                                                          <div class="row">
                                                                            <div class="col-12">
                                                                              <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Boster Troubleshooting Handbooks</h2>
                                                                                <p class="text-grey w-75 mx-auto mb-5 text-center">Click any of the following to see more details</p>
                                                                                </div>
                                                                              </div>
                                                                              <div class="row">
                                                                                <div class="col-lg-3 col-12 mb-lg-0 mb-5">
                                                                                  <div class="image-fade-card bg-lightgrey mb-4 border-rounded h-100">
                                                                                    <img class="h-100 w-100" src="https://SITE_ORIGIN_PLACEHOLDER/media/images/elisa-handbook-cover.png" alt="ELISA Handbook" title="ELISA Handbook" loading="lazy">
                                                                                    <div class="image-fade-card-sinippet h-100 w-100 vertical-center horizontal-center border-rounded">
                                                                                      <h2 class="text-white text-center font-large border-rounded w-75 font-weight-bold">ELISA Handbook</h2>
                                                                                      </div>
                                                                                      <div class="image-fade-card-data border border-rounded p-5 h-100 w-100">
                                                                                        <h2 class="font-weight-bold text-orange font-large mt-5 mb-2">ELISA Handbook</h2>
                                                                                          <p class="text-darkgrey mb-5">This guide will teach you everything you need to become a ELISA expert, including critical review of principle, all-in-one FAQs and more.</p>
                                                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/elisa-troubleshooting-guide-download-page" class="d-block btn-orange stretched-link">Download ELISA Handbook</a>
                                                                                            </div>
                                                                                          </div>
                                                                                        </div>
                                                                                        <div class="col-lg-3 col-12 mb-lg-0 mb-5">
                                                                                          <div class="image-fade-card bg-lightgrey mb-4 border-rounded h-100">
                                                                                            <img class="h-100 w-100" src="https://SITE_ORIGIN_PLACEHOLDER/media/images/western-blotting-handbook-cover.png" alt="Western Blot Handbook" title="Western Blot Handbook" loading="lazy">
                                                                                            <div class="image-fade-card-sinippet h-100 w-100 vertical-center horizontal-center border-rounded">
                                                                                              <h2 class="text-white text-center font-large border-rounded w-75 font-weight-bold">Western Blot Handbook</h2>
                                                                                              </div>
                                                                                              <div class="image-fade-card-data border border-rounded p-5 h-100 w-100">
                                                                                                <h2 class="font-weight-bold text-orange font-large mt-5 mb-2">Western Blot Handbook</h2>
                                                                                                  <p class="text-darkgrey mb-5">Having a solid understanding of how Western blot works significantly increases your success rate. We have everything you need to know from sample preparation to data interpretation.</p>
                                                                                                    <a href="https://SITE_ORIGIN_PLACEHOLDER/western-blotting-troubleshooting-guide-download-page" class="d-block btn-orange stretched-link">Download Western Blot Handbook</a>
                                                                                                    </div>
                                                                                                  </div>
                                                                                                </div>
                                                                                                <div class="col-lg-3 col-12 mb-lg-0 mb-5">
                                                                                                  <div class="image-fade-card bg-lightgrey mb-4 border-rounded h-100">
                                                                                                    <img class="h-100 w-100" src="https://SITE_ORIGIN_PLACEHOLDER/media/images/immunohistochemistry-handbook-cover.png" alt="IHC Handbook" title="IHC Handbook" loading="lazy">
                                                                                                    <div class="image-fade-card-sinippet h-100 w-100 vertical-center horizontal-center border-rounded">
                                                                                                      <h2 class="text-white text-center font-large border-rounded w-75 font-weight-bold">IHC Handbook</h2>
                                                                                                      </div>
                                                                                                      <div class="image-fade-card-data border border-rounded p-5 h-100 w-100">
                                                                                                        <h2 class="font-weight-bold text-orange font-large mt-5 mb-2">IHC Handbook</h2>
                                                                                                          <p class="text-darkgrey mb-5">This guide will show you all the nuts and blots for Immunohistochemistry (IHC), including expert review of principle, optimized protocol that really works and more.</p>
                                                                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/immunohistochemistry-troubleshooting-guide-download-page" class="d-block btn-orange stretched-link">Download IHC Handbook</a>
                                                                                                            </div>
                                                                                                          </div>
                                                                                                        </div>
                                                                                                        <div class="col-lg-3 col-12 mb-lg-0 mb-5">
                                                                                                          <div class="image-fade-card bg-lightgrey mb-4 border-rounded h-100">
                                                                                                            <img class="h-100 w-100" src="https://SITE_ORIGIN_PLACEHOLDER/media/images/flow-cytometry-facs-handbook-cover.png" alt="Flow/FACS Handbook" title="Flow/FACS Handbook" loading="lazy">
                                                                                                            <div class="image-fade-card-sinippet h-100 w-100 vertical-center horizontal-center border-rounded">
                                                                                                              <h2 class="text-white text-center font-large border-rounded w-75 font-weight-bold">Flow/FACS Handbook</h2>
                                                                                                              </div>
                                                                                                              <div class="image-fade-card-data border border-rounded p-5 h-100 w-100">
                                                                                                                <h2 class="font-weight-bold text-orange font-large mt-5 mb-2">Flow/FACS Handbook</h2>
                                                                                                                  <p class="text-darkgrey mb-5">This guide will show you all the nuts and blots for Flow Cytometry and FACS, including expert review of principle, optimized protocol that really works and more.</p>
                                                                                                                    <a href="https://SITE_ORIGIN_PLACEHOLDER/flow-cytometry-facs-troubleshooting-guide-download-page" class="d-block btn-orange stretched-link">Download Flow/FACS Handbook</a>
                                                                                                                    </div>
                                                                                                                  </div>
                                                                                                                  <!-- TRUNCATED: 17599 chars total — open docs/cms-pages-full-export.tsv row page_id=37 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 31. CMS page (calculators)

- **Structural hash:** `7eb20c585d59ac12` (for cross-reference)
- **URL prefix:** `calculators`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `calculators` (page_id 41) — Calculator Apps|Boster
- **All identifiers in cluster:** `calculators`
- **content_heading:** `Web Calculator and Free Calculators Apps`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<p>Oops... the APPs are still under development.&nbsp;</p>
  <p>Please come back later&nbsp;</p>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 32. CMS page (western-blotting-troubleshooting-guide-download)

- **Structural hash:** `bb18177a0b40a0c4` (for cross-reference)
- **URL prefix:** `western-blotting-troubleshooting-guide-download`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `western-blotting-troubleshooting-guide-download` (page_id 43) — Western Blotting Download
- **All identifiers in cluster:** `western-blotting-troubleshooting-guide-download`
- **content_heading:** `NULL`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<!--Hero section-->
<div class="hero hero1 hr1">
  <div class="overlay">&nbsp;</div>
    <div class="row her1">
      <div class="container">
        <div class="col-md-12">
          <div class="logo">
            <!--logo-->
            <div class="hedlogo">WESTERN BLOTTING TROUBLESHOOTING HANDBOOK</div>
              <!--logo end-->
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <!--<div class="row">
        <div class="col-md-12">
          <div class="logo">
            <!--logo--> <!--<a href="">
            <img src="img/logo.png" data-at2x="img/logo.png" alt="site name"> </a>
            <!--logo end--> <!--</div>
          </div>
        </div>-->
        <div class="row dor1">
          <div class="col-md-6">
            <!--welcome message--> <!-- <h1>Smarter Solutions for the Future</h1>-->
            <h2 class="orih2">Thank You for Download!</h2>
              <p class="orip">Download the Western blotting troubleshooting guide that can help you get out of most sticky situations in the lab. Find out quick solutions and many more in the western blot troubleshooting guide.</p>
                <!--welcome message end--> <!--action button-->
                <div class="action-button">
                  <a class="button learn-more text-center" href="#features">DOWNLOAD NOW<em class="fa fa-arrow-right">
                  </em>
                </a> <!--<a href="#" class="button buy text-center">Buy Now <i class="fa fa-shopping-cart">
              </i>
            </a>
            <p>*Avaliable in PDF, ePUB, Mobi &amp; Kindle.</p>-->
            </div>
            <!--action button end--> <!--share button-->
            <div class="action-button shr">
              <span style="font-size: 24px; font-weight: bold;">SHARE!</span> Pass This On <a href="https://www.facebook.com/bosterbio" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/facebook.png" alt="" />
              </a>
              <a href="https://linkedin.com/profile/view?id=256919055" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/linked in.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/google pluse.png" alt="" />
              </a>
              <a href="https://twitter.com/BosterbioCo" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/twitter.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/youtube.png" alt="" />
              </a>
              <a href="https://bosterbio.tumblr.com/" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/tumb_icon.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon1.png" alt="" />
              </a>
              <a href="https://www.pinterest.com/bosterbio/" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon2.png" alt="" />
              </a>
            </div>
            <!--share button end-->
          </div>
          <div class="col-md-6 text-center">
            <img class="book-cover" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/8.png" alt="ebook" />
          </div>
        </div>
      </div>
      <!--Hero section end-->
    </div>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 33. CMS page (ihc-troubleshooting-guide-download)

- **Structural hash:** `6a546d9671af5f11` (for cross-reference)
- **URL prefix:** `ihc-troubleshooting-guide-download`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `ihc-troubleshooting-guide-download` (page_id 44) — IHC Download
- **All identifiers in cluster:** `ihc-troubleshooting-guide-download`
- **content_heading:** `IHC Download`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<!--Hero section-->
<div class="hero hero1 hr1">
  <div class="overlay">&nbsp;</div>
    <div class="row her1">
      <div class="container">
        <div class="col-md-12">
          <div class="logo">
            <!--logo-->
            <div class="hedlogo">IMMUNOHISTOCHEMISTRY TROUBLESHOOTING HANDBOOK</div>
              <!--logo end-->
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <!--<div class="row">
        <div class="col-md-12">
          <div class="logo">
            <!--logo--> <!--<a href="">
            <img src="img/logo.png" data-at2x="img/logo.png" alt="site name"> </a>
            <!--logo end--> <!--</div>
          </div>
        </div>-->
        <div class="row dor1">
          <div class="col-md-6">
            <!--welcome message--> <!-- <h1>Smarter Solutions for the Future</h1>-->
            <h2 class="orih2">Thank You for Download!</h2>
              <p class="orip">Download the IHC troubleshooting guide that can help you get out of most sticky situations in the lab. Find out quick solutions and many more in the western blot troubleshooting guide.</p>
                <!--welcome message end--> <!--action button-->
                <div class="action-button">
                  <a class="button learn-more text-center" href="https://SITE_ORIGIN_PLACEHOLDER/ihc-troubleshooting-guide-download" target="_blank">DOWNLOAD NOW<em class="fa fa-arrow-right">
                  </em>
                </a> <!--<a href="#" class="button buy text-center">Buy Now <i class="fa fa-shopping-cart">
              </i>
            </a>
            <p>*Avaliable in PDF, ePUB, Mobi &amp; Kindle.</p>-->
            </div>
            <!--action button end--> <!--share button-->
            <div class="action-button shr">
              <span style="font-size: 24px; font-weight: bold;">SHARE!</span> Pass This On <a href="https://www.facebook.com/bosterbio" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/facebook.png" alt="" />
              </a>
              <a href="https://linkedin.com/profile/view?id=256919055" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/linked in.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/google pluse.png" alt="" />
              </a>
              <a href="https://twitter.com/BosterbioCo" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/twitter.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/youtube.png" alt="" />
              </a>
              <a href="https://bosterbio.tumblr.com/" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/tumb_icon.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon1.png" alt="" />
              </a>
              <a href="https://www.pinterest.com/bosterbio/" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon2.png" alt="" />
              </a>
            </div>
            <!--share button end-->
          </div>
          <div class="col-md-6 text-center">
            <img class="book-cover" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/81.png" alt="ebook" />
          </div>
        </div>
      </div>
      <!--Hero section end-->
    </div>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 34. CMS page (elisa-troubleshooting-guide-download)

- **Structural hash:** `76688a20efdd66af` (for cross-reference)
- **URL prefix:** `elisa-troubleshooting-guide-download`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `elisa-troubleshooting-guide-download` (page_id 45) — ELISA PRINCIPLE  DOWNLOAD
- **All identifiers in cluster:** `elisa-troubleshooting-guide-download`
- **content_heading:** `ELISA PRINCIPLE`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<!--Hero section-->
<div class="hero hero1 hr1">
  <div class="overlay">&nbsp;</div>
    <div class="row her1">
      <div class="container">
        <div class="col-md-12">
          <div class="logo">
            <!--logo-->
            <div class="hedlogo">ELISA PRINCIPLE <span style="font-size: 38px;">AND</span> TROUBLESHOOTING HANDBOOK</div>
              <!--logo end-->
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <!--<div class="row">
        <div class="col-md-12">
          <div class="logo">
            <!--logo--> <!--<a href="">
            <img src="img/logo.png" data-at2x="img/logo.png" alt="site name"> </a>
            <!--logo end--> <!--</div>
          </div>
        </div>-->
        <div class="row dor1">
          <div class="col-md-6">
            <!--welcome message--> <!-- <h1>Smarter Solutions for the Future</h1>-->
            <h2 class="orih2">Thank You for Download!</h2>
              <p class="orip">Download the Elisa principle and troubleshooting guide that can help you get out of most sticky situations in the lab. Find out quick solutions and many more in the western blot troubleshooting guide.</p>
                <!--welcome message end--> <!--action button-->
                <div class="action-button">
                  <a class="button learn-more text-center" href="#features">DOWNLOAD NOW<em class="fa fa-arrow-right">
                  </em>
                </a> <!--<a href="#" class="button buy text-center">Buy Now <i class="fa fa-shopping-cart">
              </i>
            </a>
            <p>*Avaliable in PDF, ePUB, Mobi &amp; Kindle.</p>-->
            </div>
            <!--action button end--> <!--share button-->
            <div class="action-button shr">
              <span style="font-size: 24px; font-weight: bold;">SHARE!</span> Pass This On <a href="https://www.facebook.com/bosterbio" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/facebook.png" alt="" />
              </a>
              <a href="https://linkedin.com/profile/view?id=256919055" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/linked in.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/google pluse.png" alt="" />
              </a>
              <a href="https://twitter.com/BosterbioCo" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/twitter.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/youtube.png" alt="" />
              </a>
              <a href="https://bosterbio.tumblr.com/" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/tumb_icon.png" alt="" />
              </a>
              <a href="#" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon1.png" alt="" />
              </a>
              <a href="https://www.pinterest.com/bosterbio/" target="_blank">
                <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon2.png" alt="" />
              </a>
            </div>
            <!--share button end-->
          </div>
          <div class="col-md-6 text-center">
            <img class="book-cover" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/82.png" alt="ebook" />
          </div>
        </div>
      </div>
      <!--Hero section end-->
    </div>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 35. CMS page (gadget-give-away-download)

- **Structural hash:** `6cdb2d23d113c359` (for cross-reference)
- **URL prefix:** `gadget-give-away-download`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `gadget-give-away-download` (page_id 46) — Phone gadget download
- **All identifiers in cluster:** `gadget-give-away-download`
- **content_heading:** `BOSTER PHONE GADGET`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<!--Hero section-->
<div class="hero hero1 hr2">
  <div class="overlay">&nbsp;</div>
    <div class="row her1">
      <div class="container">
        <div class="col-md-12">
          <div class="logo">
            <!--logo-->
            <div class="hedlogo">BOSTER PHONE GADGET</div>
              <!--logo end-->
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <!--<div class="row">
        <div class="col-md-12">
          <div class="logo">
            <!--logo--> <!--<a href="">
            <img src="img/logo.png" data-at2x="img/logo.png" alt="site name"> </a>
            <!--logo end--> <!--</div>
          </div>
        </div>-->
        <div class="row dor1">
          <div class="col-md-6">
            <!--welcome message--> <!-- <h1>Smarter Solutions for the Future</h1>-->
            <h2 class="orih2" style="margin-bottom: 50px; margin-top: 15px;">Thank you for Your request, &nbsp;we will send your gift soon.</h2>
              <h2 class="orih2" style="margin-bottom: 50px; margin-top: 15px;">
                <span style="font-size: 24px; font-weight: bold;">SHARE!</span>
                  <span style="font-size: 12px;"> Pass This On </span>
                    <a style="font-size: 12px;" href="#">
                      <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/facebook.png" alt="" />
                    </a>
                    <a style="font-size: 12px;" href="#">
                      <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/linked in.png" alt="" />
                    </a>
                    <a style="font-size: 12px;" href="#">
                      <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/google pluse.png" alt="" />
                    </a>
                    <a style="font-size: 12px;" href="#">
                      <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/twitter.png" alt="" />
                    </a>
                    <a style="font-size: 12px;" href="#">
                      <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/youtube.png" alt="" />
                    </a>
                    <a style="font-size: 12px;" href="#">
                      <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/tumb_icon.png" alt="" />
                    </a>
                    <a style="font-size: 12px;" href="#">
                      <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon1.png" alt="" />
                    </a>
                    <a style="font-size: 12px;" href="#">
                      <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon2.png" alt="" />
                    </a>
                  </h2>
                  <!--share button end-->
                </div>
                <div class="col-md-6 text-center">
                  <img class="book-cover" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/phone%20pic_1.png" alt="ebook" />
                </div>
              </div>
            </div>
            <!--Hero section end-->
          </div>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 36. CMS page (origami-challenge-download)

- **Structural hash:** `e91920dba83ae37d` (for cross-reference)
- **URL prefix:** `origami-challenge-download`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `origami-challenge-download` (page_id 48) — Origami Challenge Download
- **All identifiers in cluster:** `origami-challenge-download`
- **content_heading:** _empty_
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<!--Hero section-->
<div class="hero hero1 hr2">
  <div class="overlay">&nbsp;</div>
    <div class="row her1">
      <div class="container">
        <div class="col-md-12">
          <div class="logo">
            <!--logo-->
            <div class="hedlogo">ORIGAMI CHALLENGE</div>
              <!--logo end-->
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <!--<div class="row">
        <div class="col-md-12">
          <div class="logo">
            <!--logo--> <!--<a href="">
            <img src="img/logo.png" data-at2x="img/logo.png" alt="site name"> </a>
            <!--logo end--> <!--</div>
          </div>
        </div>-->
        <div class="row dor1">
          <div class="col-md-6">
            <!--welcome message--> <!-- <h1>Smarter Solutions for the Future</h1>-->
            <h2 class="orih2" style="margin-bottom: 50px; margin-top: 15px;">Thank You for Download!</h2>
              <!--<p class="orip">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>--> <!--welcome message end--> <!--action button-->
              <div class="action-button">
                <a class="button learn-more text-center" href="#features">DOWNLOAD NOW<em class="fa fa-arrow-right">
                </em>
              </a> <!--<a href="#" class="button buy text-center">Buy Now <i class="fa fa-shopping-cart">
            </i>
          </a>
          <p>*Avaliable in PDF, ePUB, Mobi &amp; Kindle.</p>-->
          </div>
          <!--action button end--> <!--share button-->
          <div class="action-button shr">
            <span style="font-size: 24px; font-weight: bold;">SHARE!</span> Pass This On <a href="#">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/facebook.png" alt="" />
            </a>
            <a href="#">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/linked in.png" alt="" />
            </a>
            <a href="#">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/google pluse.png" alt="" />
            </a>
            <a href="#">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/twitter.png" alt="" />
            </a>
            <a href="#">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/youtube.png" alt="" />
            </a>
            <a href="#">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/tumb_icon.png" alt="" />
            </a>
            <a href="#">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon1.png" alt="" />
            </a>
            <a href="#">
              <img style="width: 34px;" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/icon2.png" alt="" />
            </a>
          </div>
          <!--share button end-->
        </div>
        <div class="col-md-6 text-center">
          <img class="book-cover" src="https://SITE_ORIGIN_PLACEHOLDER/westernboltting/img/bospic.png" alt="ebook" />
        </div>
      </div>
    </div>
    <!--Hero section end-->
  </div>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 37. CMS page (redeem-coupon)

- **Structural hash:** `2f793dd450807d87` (for cross-reference)
- **URL prefix:** `redeem-coupon`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `redeem-coupon` (page_id 51) — Redeem-Coupon
- **All identifiers in cluster:** `redeem-coupon`
- **content_heading:** `Redeem Your Coupon`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<h2 style="text-align: center;">
  <span style="color: #5f90a2;">Thank you! Please use this code at check out<br />&nbsp;</span>
  </h2>
  <h2 style="text-align: center;">
    <span style="color: #5f90a2;">Code:&nbsp;HELLO2016</span>
    </h2>
    <div style="text-align: center;">
      <span style="color: #5f90a2;">&nbsp;<span style="font-size: 1.5em;">Exclusive Offer</span>
      </span>
    </div>
    <h2 style="text-align: center;">
      <span style="color: #5f90a2;" data-mce-mark="1">10% OFF</span>
      </h2>
      <h2 style="text-align: center;">
        <span style="color: #5f90a2;" data-mce-mark="1">Your Order Through 01/31</span>
        </h2>
        <p>
          <span style="color: #5f90a2;" data-mce-mark="1">
            <br />
          </span>
        </p>
        <p>
          <span style="color: #5f90a2;" data-mce-mark="1">
            <br />
          </span>
        </p>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 38. CMS page (spread-the-word)

- **Structural hash:** `35dc6a723bff488f` (for cross-reference)
- **URL prefix:** `spread-the-word`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `spread-the-word` (page_id 53) — Spread The Word
- **All identifiers in cluster:** `spread-the-word`
- **content_heading:** `NULL`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<link href="//SITE_ORIGIN_PLACEHOLDER" type="text/css" rel="stylesheet" />
<link href="//SITE_ORIGIN_PLACEHOLDER" type="text/css" rel="stylesheet" />
<link href="//SITE_ORIGIN_PLACEHOLDER" type="text/css" rel="stylesheet" />
<link href="//SITE_ORIGIN_PLACEHOLDER" type="text/css" rel="stylesheet" />
<!--[if lt IE 9]>
<script src="js/html5shiv.js">
</script>
<script src="js/respond.min.js">
</script>
<![endif]-->
<script type="text/javascript" src="js/jquery.js">
</script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js">
</script>
<script type="text/javascript" src="js/bootstrap.min.js">
</script>
<script type="text/javascript">// <![CDATA[
  $(function(){
  $("form input[type=text]").focus(function(){
  $(this).css("border","1px solid #000");
  });
  $("form input[type=text]").blur(function(){
  $(this).css("border","1px solid #e2e2e2");
  });
  $("#pin").on("mouseover",function(e){
  $("#pin").attr("src","https://SITE_ORIGIN_PLACEHOLDER/images/icon-pin-hover.png");
  });
  $("#pin").on("mouseout",function(e){
  $("#pin").attr("src","https://SITE_ORIGIN_PLACEHOLDER/images/icon-pin.png");
  });
  $("#twitter").on("mouseover",function(e){
  $("#twitter").attr("src","https://SITE_ORIGIN_PLACEHOLDER/images/icon-twitter-hover.png");
  });
  $("#twitter").on("mouseout",function(e){
  $("#twitter").attr("src","https://SITE_ORIGIN_PLACEHOLDER/images/icon-twitter.png");
  });
  $("#fb").on("mouseover",function(e){
  $("#fb").attr("src","https://SITE_ORIGIN_PLACEHOLDER/images/icon-fb-hover.png");
  });
  $("#fb").on("mouseout",function(e){
  $("#fb").attr("src","https://SITE_ORIGIN_PLACEHOLDER/images/icon-fb.png");
  });
  $("#linked").on("mouseover",function(e){
  $("#linked").attr("src","https://SITE_ORIGIN_PLACEHOLDER/images/icon-linked-hover.png");
  });
  $("#linked").on("mouseout",function(e){
  $("#linked").attr("src","https://SITE_ORIGIN_PLACEHOLDER/images/icon-linked.png");
  });
  $("#google").on("mouseover",function(e){
  $("#google").attr("src","https://SITE_ORIGIN_PLACEHOLDER/images/icon-google-hover.png");
  });
  $("#google").on("mouseout",function(e){
  $("#google").attr("src","https://SITE_ORIGIN_PLACEHOLDER/images/icon-google.png");
  });
  });
  // ]]>
</script>
<!--/head-->
<div class="sectiontop">
  <div class="container_ref">
    <div class="col-sm-8">
      <ul>
        <li>Call Us: <a id="phone" href="tel:(888) 466-3604">(888) 466-3604</a> or <a id="contact" href="https://SITE_ORIGIN_PLACEHOLDER/contact-us/" target="_blank">Contact Us</a>
        </li>
      </ul>
    </div>
    <div class="col-sm-4">
      <ul>
        <li>
          <a href="https://www.facebook.com/bosterbio?ref=br_rs" target="_blank">
            <img id="fb" src="https://SITE_ORIGIN_PLACEHOLDER/images/icon-fb.png" alt="" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/BosterbioCo" target="_blank">
            <img id="twitter" src="https://SITE_ORIGIN_PLACEHOLDER/images/icon-twitter.png" alt="" />
          </a>
        </li>
        <li>
          <a href="https://plus.google.com/+BosterBioimmunoleader/posts" target="_blank">
            <img id="google" src="https://SITE_ORIGIN_PLACEHOLDER/images/icon-google.png" alt="" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/bosterimmunoleader" target="_blank">
            <img id="linked" src="https://SITE_ORIGIN_PLACEHOLDER/images/icon-linked.png" alt="" />
          </a>
        </li>
        <li>
          <a href="https://www.pinterest.com/bosterbio/" target="_blank">
            <img id="pin" src="https://SITE_ORIGIN_PLACEHOLDER/images/icon-pin.png" alt="" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="sectionhead">
  <div class="container_ref">
    <div class="row">
      <div class="col-sm-8">
        <ul>
          <li>
            <a href="https://SITE_ORIGIN_PLACEHOLDER/" target="_blank">
              <img src="https://SITE_ORIGIN_PLACEHOLDER/images/logo.png" alt="" />
            </a>
          </li>
        </ul>
      </div>
      <div class="col-sm-4">
        <ul id="newProduct">
          <li>
            <a href="https://SITE_ORIGIN_PLACEHOLDER/products/primary-antibodies.html" target="_blank">
              <img src="https://SITE_ORIGIN_PLACEHOLDER/images/blue-arrow.png" alt="" /> Our New Products</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="sectionspeaker">
    <div class="container_ref">
      <div class="row">
        <div class="col-md-3"> <img src="https://SITE_ORIGIN_PLACEHOLDER/images/speaker.png" class="img-responsive"/> </div>
          <div class="col-md-9">
            <h1>Spread the Word.</h1>
              <p>Use these templates and share with your friends and colleagues </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="container bluecol">Copy any text templates from below and share with your friends and colleagues</div>
          </div>
          <div class="sectionreward">
            <div class="container_ref">
              <div class="col-lg-6 twitter">
                <h2>Share on Twitter</h2>
                  <p>You get $25 credit or a Google chrome cast, your friend gets 20% off their first order.@bosterbioco. Use code <strong>[insert code]</strong>.</p>
                    <p>I just earned $25 Credit from Bosterbio. You can too! Sign up at https://SITE_ORIGIN_PLACEHOLDER/referral-program</p>
                    </div>
                    <div class="col-lg-6 email">
                      <h2>Sample Email</h2>
                        <p>Dear <strong>[insert colleague's name]</strong>,</p>
                          <p>Use this promo code - <strong>[insert code]</strong> - to save 20% on your next order at BosterBio.</p>
                            <p>Boster Biological Technology is a high affinity Antibody and ELISA Kit Company. Use the promo code above in the next 90 days and save 20% off your first order.</p>
                              <p>Regards,<br />
                              <strong>[your name]</strong>
                              </p>
                              <p>
                                <em>ps - if you want to also join the program to refer your colleagues and friends, visit https://SITE_ORIGIN_PLACEHOLDER/referral-program- Referral Program Members get $25 in product credit or Google Chrome cast for each referral who places a qualifying order. Everyone wins!!</em>
                                </p>
                              </div>
                            </div>
                            <div class="sectionreward">
                              <div class="container_ref">
                                <p>Terms &amp; Conditions: Referral Program Members (Referrer) receive $25 in product credit or a Chromecast from Bosterbio for each referral customer that places a qualifying (see details of qualification standards below) order. Product credit expires 6 months from date issued to Referrer. New customers (Referee) purchasing with a Bosterbio Referral code must use the referral code within 90 days from the date issued to the Rewards member. New customers receive 20% off or get a Chromecast on their first qualifying order. Offer applies to new customers for a single, direct order only. Referral code must be presented at the time of order to receive discount. Discount is applied to US list price and cannot be combined with institutional discounts, other discounts or promotions. This program only for US Customers. Offer void where prohibited, licensed, or restricted by federal, state, provincial, or local laws or regulation or agency/institutional policy. Other restrictions may apply.</p>
                                  <p>
                                    <strong>Order qualification</strong>:
                                      <ul>
                                        <li>• Shop any of our products with a total of $200 or more to redeem $25 product credit for the referrer and 20% off for the referee.</li>
                                          <li>• Shop any of our products with a total of $400 or more to redeem $25 product credit or a gift (currently Chromecast, subject to change) for the referrer, and 20% off or a gift for the referee.</li>
                                          </ul>
                                        </p>
                                        <p>Offer expires on Dec 31, 2015.</p>
                                        </div>
                                      </div>
                                    </div>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 39. CMS page (promotions)

- **Structural hash:** `ceebbe00f0e16374` (for cross-reference)
- **URL prefix:** `promotions`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `promotions/referral-program` (page_id 54) — Boster Referral Program
- **All identifiers in cluster:** `promotions/referral-program`
- **content_heading:** `Boster Referral Program`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 text-center hero-section" style="background-image: url(/media/promotion-page-hero1.png)">
  <div class="dark-overlap">
    <h2 class="font-large font-weight-bold mb-4">  refer a friend today!</h2>
      <h1 class="mb-2">Referral program</h1>
      </div>
    </section>
    <section class="mb-6 double-column content-section">
      <div class="container p-3">
        <div class="row">
          <div class="col-12 col-lg-6 mb-lg-0 mb-5">
            <h3 class="font-large text-orange mb-3 text-capitalize">How it works</h3>
              <p class="mb-4">Each existing customer is eligible for the referral program. Existing customers can refer new customers to purchase from Boster Bio. Coupons issued from this promotion program cannot be co-used with other promotions. </p>
                <h3 class="font-large text-orange mb-3 text-capitalize">Eligible Offerings</h3>
                  <p class="mb-4">Limit to only reagent products and <a href="/services/custom-antibody-for-rare-species-and-discontinued-antibodies" target="_blank">$600 rare species custom antibody production services</a>, <b>NOT</b> including other services or instruments, <br>
                  </p>
                  <h3 class="font-large text-orange mb-3 text-capitalize">Definitions</h3>
                    <div>
                      <b>Referrer</b>: individual making a recommendation to use Boster's service.</div>
                        <div>
                          <b>Referee</b>: has not placed an order with Boster in the past 12 months, and placed an order over $300. </div>
                            <div>
                              <b>Note:</b> Referee must provide existing customers' order details or contact details at the time of purchase to redeem. </div>
                                <div>
                                  <br>
                                </div>
                                <div>
                                  <br>
                                </div>
                                <div>
                                  <h3 class="font-large text-orange mb-3 text-capitalize">Disclaimer</h3>
                                  </div>
                                  <div>Boster Bio reserves the right to refuse entry or refuse to give the reward to anyone in breach of other company regulations. Boster Bio reserves the right to hold void, cancel, suspend, or amend the promotion when necessary.</div>
                                  </div>
                                  <div class="col-12 col-lg-6">
                                    <h3 class="font-medium">
                                      <font color="#ea8d28">
                                        <span style="font-size: 22px;">Reward Details</span>
                                        </font>
                                        <br>
                                      </h3>
                                      <table class="w-100 table table-striped">
                                        <thead class="bg-grey text-white">
                                          <tr>
                                            <th>New Customer Order Amount (USD $)</th>
                                              <th>Reward for Referrer</th>
                                                <th>Coupon for Referee</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>0-299</td>
                                                    <td>Not eligible</td>
                                                      <td>Not eligible</td>
                                                      </tr>
                                                      <tr>
                                                        <td>300-599</td>
                                                          <td>$30 </td>
                                                            <td>$30 </td>
                                                            </tr>
                                                            <tr>
                                                              <td>600-899</td>
                                                                <td>$60 </td>
                                                                  <td>$60 </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td>900-1199</td>
                                                                      <td>$90 </td>
                                                                        <td>$90 </td>
                                                                        </tr>
                                                                        <tr>
                                                                          <td>1200-1499</td>
                                                                            <td>$120 </td>
                                                                              <td>$120 </td>
                                                                              </tr>
                                                                              <tr>
                                                                                <td>1500-1799</td>
                                                                                  <td>$150 </td>
                                                                                    <td>$150 </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                      <td>1800+</td>
                                                                                        <td>additional $30 for each $300</td>
                                                                                          <td>additional $30 for each $300</td>
                                                                                          </tr>
                                                                                        </tbody>
                                                                                      </table>
                                                                                    </div>
                                                                                  </div>
                                                                                </div>
                                                                              </section>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 40. CMS page (success-referral-program-signup)

- **Structural hash:** `cd3de500a4dc1b1e` (for cross-reference)
- **URL prefix:** `success-referral-program-signup`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `success-referral-program-signup` (page_id 55) — Success Referral Program Signup
- **All identifiers in cluster:** `success-referral-program-signup`
- **content_heading:** `Congratulations, you are now enrolled in the Referral Program!`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<p>
  <span style="font-size: large;">
    <br />
  </span>
</p>
<p>
  <span style="font-size: large;">An email with your Referral Code is on its way to your email inbox.</span>
  </p>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 41. CMS page (career-opportunities)

- **Structural hash:** `30c06f5886f404e5` (for cross-reference)
- **URL prefix:** `career-opportunities`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `career-opportunities` (page_id 56) — Career Opportunities | BosterBio
- **All identifiers in cluster:** `career-opportunities`
- **content_heading:** `Career Opportunties`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<section class="mb-6 text-center hero-section" style="background-image: url(https://SITE_ORIGIN_PLACEHOLDER);background-position-y: top;">
  <div class="dark-overlap">
    <h1 class="mb-2">Careers at Bosterbio</h1>
      <p class="font-large mb-4">Start Your Career With the Fastest Growing Antibody Manufacturer</p>
      </div>
    </section>
    <section class="topic-heading-section mb-6">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Send us your resume</h2>
              <p class="text-grey text-center w-75 mx-auto mb-5 font-medium">Email your resume to boster@bosterbio.com, cover letter is preferred.</p>
              </div>
            </div>
          </div>
        </section>
        <section class="mb-6 single-column content-section">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h2 class="font-large text-orange mb-2 text-capitalize">Boster Bio Missions and values</h2>
                  <p class="font-medium mb-4">Are you ready to make a meaningful impact as a part of the Boster Bio Team? This page will give you the information you need to find the position that best fits your skills, passion, and opportunities at Boster Bio. We have built a reputation of the best research diagnostic tool for immunology and proteomics and customized reagents manufacturing. We are equally invested in the professional development of our own people. As a team member, you will look forward to a satisfying career in a dynamic working environment with many exciting projects, and high potentials for career advancement.<br>
                  </p>
                  <p class="font-medium mb-4">At Boster Bio, we are making differences to thousands of scientists' lives every day. Our goal is to become the leader in antibody discovery and immunology research services. We are looking for like-minded scientists with a servant's heart to be part of a team that delivers WOW to scientists around the world through exceptional service. If you are ready for this journey, we would love to hear from you.</p>
                    <h3 class="font-medium mb-4">
                      <b>Manufacturing</b>
                      </h3>
                      <p class="mb-4">As an antibody manufacturer and assay developer, Boster Bio values craftsmanship. We hold the highest quality standard and we are willing to only present the antibodies that pass the bar.</p>
                        <h3 class="font-medium mb-4">
                          <b>Servicing</b>
                          </h3>
                          <p class="mb-4">Our mission is to enable pharma and diagnostic companies with our immunology experitise. By providing a valet-like experience for our customers' scientific sourcing needs, we bring our customers extremely smooth sourcing experiences and robust data/high quality critical reagents. Our service customers stay with us because of our expertise, and because we care for their projects as our own.</p>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section class="topic-heading-section mb-6">
                      <div class="container">
                        <div class="row">
                          <div class="col-12">
                            <h2 class="topic-heading text-orange text-center font-larger text-uppercase font-weight-bold typography-josefin-sans mb-3">Open positions</h2>
                              <p class="text-grey text-center w-75 mx-auto mb-5 font-medium">Email your resume to boster@bosterbio.com, cover letter preferred. Currently there are no open positions but we will consider recently received resumes first when new positions become available. </p>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section class="mb-6 single-column content-section">
                          <div class="container">
                            <div class="row">
                              <div class="col-12">
                                <div>
                                  <br>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 42. CMS page (unsubscribe-successful)

- **Structural hash:** `4ac28ce821e6488e` (for cross-reference)
- **URL prefix:** `unsubscribe-successful`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `unsubscribe-successful` (page_id 57) — Unsubscribe successful
- **All identifiers in cluster:** `unsubscribe-successful`
- **content_heading:** `We are sorry to see you go...`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
Your email has been removed. If you would like to provide us any feedback please send it to support@bosterbio.com
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 43. CMS page (sfn-2015-20off)

- **Structural hash:** `6eae2fc53b3182ff` (for cross-reference)
- **URL prefix:** `sfn-2015-20off`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `sfn-2015-20off` (page_id 58) — 20% off for SFN 2015
- **All identifiers in cluster:** `sfn-2015-20off`
- **content_heading:** `Thank you for visiting us at SFN 2015`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<h2>Thank you for coming to our booth at the SFN 2015 conference. Please use the following code for 20% off your next order. </h2>
  <p>Coupon code: EX20</p>
    <p>Expiration: Dev 31, 2015</p>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 44. CMS page (unsubscribe)

- **Structural hash:** `c557a8aacf6d7bdc` (for cross-reference)
- **URL prefix:** `unsubscribe`
- **Used by:** 1 page(s) (0 active)
- **Representative:** `unsubscribe` (page_id 59) — Unsubscribe
- **All identifiers in cluster:** `unsubscribe`
- **content_heading:** `Unsubscribe: enter your email below`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<form action="MAILTO:xsj706@gmail.com" method="post" enctype="text/plain">
  E-mail:<br>
  <input type="text" name="mail" value="your email">
  <br>
  <input type="submit" value="Send">
  <input type="reset" value="Reset">
</form>
```

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

### 45. Protocol / troubleshooting guide

- **Structural hash:** `a3bc1331bb085a73` (for cross-reference)
- **URL prefix:** `protocol-and-troubleshooting`
- **Used by:** 1 page(s) (1 active)
- **Representative:** `protocol-and-troubleshooting/immunohistochemistry-ihc-principle` (page_id 60) — Immunohistochemistry (IHC) Fundamental Principle, How IHC Works | Boster
- **All identifiers in cluster:** `protocol-and-troubleshooting/immunohistochemistry-ihc-principle`
- **content_heading:** `Immunohistochemistry (IHC) Fundamental Principle, How IHC Works`
- **Magento directives in sample:** _none_

**Representative HTML** (pretty-printed; truncated if longer than 14000 chars):

<!--
  Section guide: look for .container / .row / .content-section (grid),
  .hero / .font-largest (hero), data-class="LazyLoad" (images), tables, CTAs.
-->

```html
<style>
  .mainbox {
  position: relative;
  }
  .buttonbottom {
  position: absolute;
  bottom: 15px;
  right: 15px;
  left: 15px;
  }
</style>
<section class="mb-6 text-center hero-section" id="immunohistochemistry-ihc-principle-hero">
  <div class="dark-overlap">
    <h1 class="mb-2">Immunohistochemistry (IHC) Principle</h1>
      <p class="font-large mb-4">Everything You Need to Know About Immunohistochemistry (IHC) principle.</p>
        <h3 class="font-weight-bold font-large mt-5">In this article, the following topics will be covered:</h3>
          <div class="row list">
            <ul class="col-12 col-lg-4">
              <li>
                <a href="#sample_preparation">Sample Preparation</a>
                </li>
                <li>
                  <a href="#fixation">Fixation</a>
                  </li>
                  <li>
                    <a href="#tissue_sectioning">Tissue Sectioning</a>
                    </li>
                  </ul>
                  <ul class="col-12 col-lg-4">
                    <li>
                      <a href="#paraffin_embedding">Paraffin Embedding</a>
                      </li>
                      <li>
                        <a href="#inactivation_and_blocking">Inactivation and Blocking</a>
                        </li>
                        <li>
                          <a href="#antigen_retrieval">Antigen Retrieval</a>
                          </li>
                        </ul>
                        <ul class="col-12 col-lg-4">
                          <li>
                            <a href="#detection">Detection</a>
                            </li>
                            <li>
                              <a href="#reagents">Chromogens, Counterstains and Mounting Media</a>
                              </li>
                            </ul>
                          </div>
                          <a class="btn-outline-white" href="/all-product-categories">Browse Boster Featured Products</a>
                          </div>
                        </section>
                        <section class="mb-6 single-column content-section" id="introduction">
                          <div class="container">
                            <div class="row">
                              <div class="col-8 p-3" id="introduction">
                                <h2 class="font-large text-orange mb-2 text-capitalize">Introduction to Immunohistochemistry (IHC)</h2>
                                  <p class="mb-4">
                                    <a href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/ihc-histology-services">Immunohistochemistry (IHC)</a> is a method for detecting antigens or haptens in cells of a tissue section by exploiting the principle of antibodies binding specifically to antigens in biological tissues. The antibody-antigen binding can be visualized in different manners. Enzymes, such as Horseradish Peroxidase (HRP) or Alkaline Phosphatase (AP), are commonly used to catalyze a color-producing reaction.</p>
                                      <h3 class="text-capitalize font-large mb-4"> Why is IHC Important in Research and Diagnostics?</h3>
                                        <p class="mb-4">IHC is widely used in many research and clinical laboratories because this technique makes it possible to visualize the distribution and localization of specific cellular components within cells and in proper tissue context. There are numerous IHC methods that can be used to localize antigens. The method selected should include consideration of parameters such as the specimen types and assay sensitivity.</p>
                                        </div>
                                        <div class="col-md-4 nauman-enrichment">
                                          <img src="https://SITE_ORIGIN_PLACEHOLDER/media/images/nauman-enrichment/IHC-Schematic.jpg" alt="IHC Schematic" data-done="Loaded" loading="lazy">
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                  <section class="mb-6 p-3 bg-orange cta-section">
                                    <div class="container">
                                      <div class="row">
                                        <div class="col-lg-8 col-12">
                                          <h3 class="font-large">Can switching to Boster</h3>
                                            <p class="mb-0">Really save you <span class="font-large">50%</span> on IHC reagents?</p>
                                            </div>
                                            <div class="col-lg-4 col-12">
                                              <a href="https://SITE_ORIGIN_PLACEHOLDER/boster-vs-sigma" class="mt-4 btn-outline-white btn-full-width">Compare Prices</a>
                                              </div>
                                            </div>
                                          </div>
                                        </section>
                                        <section class="mb-5 double-column content-section">
                                          <div class="container">
                                            <div class="row">
                                              <div class="col-md-8 p-3">
                                                <div class="mb-5" id="sample_preparation">
                                                  <h2 class="font-large text-orange mb-2 text-capitalize">1. Sample Preparation</h2>
                                                    <p class="mb-4">
                                                      <a href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/ihc-and-icc-if-sample-preparation">Sample collection and preparation</a> play an <a class="text-hover-blue" href="https://SITE_ORIGIN_PLACEHOLDER/protocol-and-troubleshooting/ihc-protocol" style="text-orange">important role in IHC</a>, and effective <a style="text-orage" href="https://SITE_ORIGIN_PLACEHOLDER/services/assay-services/ihc-histology-services" class="text-hover-blue">IHC sample processing</a> ensures that antigen exhibition and localization are preserved throughout the workflow.</p>
                                                        <h3 class="text-capitalize font-large mb-4">Preparing Cell Samples for IHC</h3>
                                                          <ul class="list-style-bullets ml-4">
                                                            <li>
                                                              <h4 class="text-capitalize mb-2 d-block font-weight-bold">Adherent cells</h4>
                                                                <p class="nauman-enrichment text-center">
                                                                  <img src="https://SITE_ORIGIN_PLACEHOLDER/media/images/nauman-enrichment/Adherent-cells.jpg" alt="Adherent cells used in immunohistochemistry research" data-src="https://SITE_ORIGIN_PLACEHOLDER/media/images/nauman-enrichment/Adherent-cells.jpg" alt="Adherent cells used in immunohistochemistry research" class="w-50" loading="lazy" data-done="Loaded">
                                                                </p>
                                                                <ul class="list-style-circles mb-4 ml-5">
                                                                  <li>
                                                                    <u>Cell Climbing</u>: Grow adherent cells on multi-aperture culture plates with coverslip, culture vessels or chamber slide</li>
                                                                      <li>
                                                                        <u>Direct Cell Culture</u>: Culture adherent cells directly on culture vessels or multi-aperture culture plates</li>
                                                                        </ul>
                                                                      </li>
                                                                      <li>
                                                                        <h4 class="text-capitalize mb-2 d-block font-weight-bold">Non-Adherent Cells</h4>
                                                                          <p class="nauman-enrichment text-center">
                                                                            <img src="https://SITE_ORIGIN_PLACEHOLDER/media/images/nauman-enrichment/Non-Adherent-Cells.jpg" alt="Non-adherent cells for IHC diagnostic applications" data-src="https://SITE_ORIGIN_PLACEHOLDER/media/images/nauman-enrichment/Non-Adherent-Cells.jpg" alt="Non-adherent cells for IHC diagnostic applications" class="w-50" loading="lazy" data-done="Loaded">
                                                                          </p>
                                                                          <ul class="list-style-circles mb-5 ml-5">
                                                                            <li>
                                                                              <u>Cell Smear</u>: Adhere non-adherent cells on coverslip with chemical bond</li>
                                                                                <li>
                                                                                  <u>Eccentric Cell Smears</u>: Adhere non-adherent cells on culture vessels by cell micro-centrifuge</li>
                                                                                  </ul>
                                                                                </li>
                                                                              </ul>
                                                                              <h3 class="text-capitalize font-large mb-4">Preparing Tissue Sample for IHC</h3>
                                                                                <p>Tissue samples are typically taken from specimens of various sources: biopsy, surgery, animal model and autopsy. The first three types of specimens give fresh tissues while the last one (autopsy) is taken after an animal has died for two hours which is more or less a postmortem autolysis. As antigens may denature, disappear and diffuse, autopsy specimen should be fixated as soon as possible so as not to influence its label.</p>
                                                                                  <p>Exercise caution when collecting, fixating and sectioning the samples</p>
                                                                                    <ul class="list-style-bullets ml-4">
                                                                                      <li>Use sharp knife and scissors to avoid extrusion damage</li>
                                                                                        <li>Cutter should be flat, small and thin (Normal size is 1.0 cm × 1.0 cm × 0.2 cm)</li>
                                                                                          <li>Eliminate fat tissue and calcification zone</li>
                                                                                            <li>Collect samples from live animals and fix samples immediately after wash</li>
                                                                                              <li>Choose diseased instead of necrotic region</li>
                                                                                                <li>Choose normal tissue as control if necessary</li>
                                                                                                  <li>Make paraffin-embedded tissue or frozen tissue immediately after sectioning or store the tissues in liquid nitrogen container or refrigerator at -70℃</li>
                                                                                                  </ul>
                                                                                                </div>
                                                                                              </div>
                                                                                              <div class="col-md-4 p-3">
                                                                                                <div class="bg-lightgrey p-4 border-rounded mb-5">
                                                                                                  <h3 class="font-large">IHC Technical Resources</h3>
                                                                                                    <p>Protocols, optimization tips, troubleshooting guides, and more for IHC.</p>
                                                                                                      <img src="https://SITE_ORIGIN_PLACEHOLDER/media/images/IHC Principle TRC icon.jpg" data-src="https://SITE_ORIGIN_PLACEHOLDER/media/images/IHC Principle TRC icon.jpg" alt="troubleshooting_box_image" title="troubleshooting_box_image" class="mb-3 w-100" loading="lazy" data-done="Loaded"> <a href="https://SITE_ORIGIN_PLACEHOLDER/immunohistochemistry-ihc-technical-resource-center" class="d-block btn-orange">Technical resources</a> </div>
                                                                                                      <div class="bg-lightgrey p-4 border-rounded">
                                                                                                        <h3 class="font-large">Troubleshooting Guides</h3>
                                                                                                          <p>Download troubleshootingnhandbooks for IHC, Western blot and ELISA for FREE.</p>
                                                                                                            <img src="https://SITE_ORIGIN_PLACEHOLDER/media/qsolutions/categoryicon/troubleshooting_box_image.png" data-src="https://SITE_ORIGIN_PLACEHOLDER/media/qsolutions/categoryicon/troubleshooting_box_image.png" alt="troubleshooting_box_image" title="troubleshooting_box_image" class="mb-3 w-100" loading="lazy" data-done="Loaded">
                                                                                                            <a href="https://SITE_ORIGIN_PLACEHOLDER/wb-ihc-elisa-troubleshooting-handbooks" class="d-block btn-orange">Troubleshooting guides</a>
                                                                                                            </div>
                                                                                                          </div>
                                                                                                        </div>
                                                                                                      </div>
                                                                                                    </section>
                                                                                                    <section class="mb-6 single-column content-section">
                                                                                                      <div class="container">
                                                                                                        <div class="row">
                                                                                                          <div class="col-12">
                                                                                                            <div class="mb-5" id="fixation">
                                                                                                              <h2 class="font-large text-orange text-capitalize mb-5">2. Fixation</h2>
                                                                                                                <ul class="sample_preparation sample_types">
                                                                                                                  <li>
                                                                                                                    <h3 class="text-capitalize font-large mb-4">Purpose of Fixation in IHC</h3>
                                                                                                                      <p>Fixation preserves tissue morphology, stabilises antigens, and prevents enzymatic degradation.</p>
                                                                                                                        <ul class="list-style-bullets ml-4">
                                                                                                                          <li>Keep cell sharp and tissue shape to prevent postmortem autolysis, putridness, endogenic and exogenic enzyme activity</li>
                                                                                                                            <li>Maintain cell structure and position by preventing antigen diffusion through transfer of protein, fat, sugar and enzymes of cell into insoluble substances</li>
                                                                                                                              <li>Precipitate and curdle materials in tissue to produce different refraction</li>
                                                                                                                                <li>Indurate tissues to enhance working with glass slides</li>
                                                                                                                                  <li>Prevent cell from shrinking and swelling</li>
                                                                                                                                    <li>Give color to clarify tissues by different affinity to coloring agent</li>
                                                                                                                                    </ul>
                                                                                                                                  </li>
                                                                                                                                  <li>
                                                                                                                                    <h3 class="text-capitalize font-large mb-4 mt-5">Choosing the Right Fixative</h3>
                                                                                                                                      <p>Below is a list of commonly used fixing solutions. You may need to test whether a specific type of solution is appropriate for your detected antigens because there is no standard fixing solution for different kinds of antigen immobilization.</p>
                                                                                                                                        <ul class="list-style-bullets ml-4">
                                                                                                                                          <li>
                                                                                                                                            <h4 class="text-capitalize mb-2 d-block font-weight-bold">Precipitating Fixatives (Acetone and Alcohol)</h4>
                                                                                                                                              <p>These two types of solutions, which are primary fixing solutions, play a role of precipitating sugars and fat as well as maintain the immunologic competence.</p>
                                                                                                                                                <ul class="list-style-circles mb-4 ml-5">
                                                                                                                                                  <li>Alcohol is ineffective to maintain low molecular weight protein, polypeptide and cytoplasmic proteins. However, it can be mixed with glacial acetic acid, ethyl ether, chloroform and formaldehyde.</li>
                                                                                                                                                    <li>Acetone is often used for frozen tissue and cytological smears because it has a span penetrability and dehydration property.</li>
                                                                                                                                                    </ul>
                                                                                                                                                  </li>
                                                                                                                                                  <li>
                                                                                                                                                    <h4 class="text-capitalize mb-2 d-block font-weight-bold">Aldehyde Fixatives</h4>
                                                                                                                                                      <p>It is a functional cross-linking agent which is widely used due to its span penetrability, low contractibility and low background. It helps keep the cross-linking between tissues and maintain antigen.</p>
                                                                                                                                                        <ul class="list-style-circles mb-4 ml-5">
                                                                                                                                                          <li>Formalin (10% neutral buffered) is the most widely used</li>
                                                                                                                                                            <li>
                                                                                                                                                              <a href="https://SITE_ORIGIN_PLACEHOLDER/4-paraformaldehyde-pfa-solution-in-pbs-ar1068-boster.html">4% paraformaldehyde</a> is better than formaldehyde</li>
                                                                                                                                                                <li>Bouin’s solution (containing picric acid) is the most widely used in histology and pathology</li>
                                                                                                                                                                  <li>Zamboni’s solution is applied to light and electron microscopic immunocytochemistry and is better than formaldehyde in ultrastructural organization maintenance</li>
                                                                                                                                                                  </ul>
                                                                                                                                                                </li>
                                                                                                                                                                <li>
                                                                                                                                                                  <h4 class="text-capitalize mb-2 d-block font-weight-bold">Non-Aldehyde Fixatives</h4>
                                                                                                                                                                    <ul class="list-style-circles mb-5 ml-5">
                                                                                                                                                                      <li>Carbodiimide, dimethylacetamide, dimethyl-suberimidate, para-benzoquinone are widely used in tissue fixation of peptide hormones.</li>
                                                                                                                                                                        <li>These fixation agents are better mixed with glutaric dialdehyde or paraformaldehyde.</li>
                                                                                                                                                                        </ul>
                                                                                                                                                                      </li>
                                                                                                                                                                      <p>In recent years, a new type of formaldehyde-free fixing solution has become available. With low toxicity and degradable chemical agent, this solution has gained a broad popularity in IHC, regular pathological examinations and molecular pathology detections due to the use of non-protein cross linking, span DNA/RNA preservation, and absence of cell vacuole, tissue shrinkage and pyknosis.</p>
                                                                                                                                                                      </ul>
                                                                                                                                                                    </li>
                                                                                                                                                                  </ul>
                                                                                                                                                                  <div class="row mt-5">
                                                                                                                                                                    <div class="col-4 nauman-enrichment">
                                                                                                                                                                      <div class="h-100 background-cover" style="background-image: url('https://SITE_ORIGIN_PLACEHOLDER/media/images/nauman-enrichment/ihc-method-and-time.png');">
                                                                                                                                                                      </div>
                                                                                                                                                                    </div>
                                                                                                                                                                    <div class="col-md-8">
                                                                                                                                                                      <h3 class="text-capitalize font-large mb-4 mt-5">Fixation Methods and Timing</h3>
                                                                                                                                                                        <ul>
                                                                                                                                                                          <li>
                                                                                                                                                                            <span class="text-capitalize mb-2 d-block font-weight-bold">Method: Immersion</span>
                                                                                                                                                                              <p>The immersion method marinates the tissue in fixing solution (at 4℃ if needed) for a specified period which is
                                                                                                                                                                                <!-- TRUNCATED: 120369 chars total — open docs/cms-pages-full-export.tsv row page_id=60 -->
```

_See TSV for complete HTML._

**Migration notes:**
- Map Boster theme classes to Tailwind / layout components; preserve heading hierarchy for SEO.
- `/media/` + `data-src` → migrated assets + `next/image`.
- `{{...}}` directives → React components (see directive table below).

---

## Remaining layout variants

There are **707** additional structural clusters with fewer pages each. Treat them like the closest matching template above, or load full HTML from the TSV by `page_id`.

## Common HTML patterns

Observed across exports (theme / Bootstrap-style utility classes):

| Pattern | Typical classes / tags | Next.js approach |
|---------|-------------------------|------------------|
| Grid layout | `row`, `col-lg-*`, `container` | CSS Grid / Tailwind; match breakpoints to design system |
| Section spacing | `content-section`, `py-*`, `mb-*` | Shared `<Section>` layout component |
| Typography | `font-largest`, `text-orange`, `text-grey` | Map to Tailwind tokens (brand orange / grey) |
| Lazy images | `data-class="LazyLoad"`, `data-src` | `next/image` with `loading="lazy"` |
| Lists / sidebars | `list-unstyled`, `double-column` | Semantic `<ul>` + utility classes |
| Tables | `<table>`, `<thead>` | Responsive table wrapper component |

### Top CSS classes (frequency in export)

| class | occurrences |
|-------|-------------|
| `text-orange` | 6804 |
| `font-large` | 5112 |
| `row` | 4971 |
| `text-center` | 4228 |
| `mb-4` | 3882 |
| `font-weight-bold` | 3496 |
| `mb-3` | 3478 |
| `mb-2` | 3417 |
| `col-12` | 3304 |
| `mb-6` | 3197 |
| `container` | 3153 |
| `p-3` | 2699 |
| `font-medium` | 2664 |
| `p-4` | 2474 |
| `mb-5` | 2311 |
| `col-md-2` | 2307 |
| `border-rounded` | 2279 |
| `btn-orange` | 2138 |
| `content-section` | 2027 |
| `boster_table_column_text` | 1960 |
| `col-md-3` | 1817 |
| `d-block` | 1702 |
| `bg-lightgrey` | 1697 |
| `text-grey` | 1655 |
| `text-capitalize` | 1619 |
| `topic-heading` | 1353 |
| `text-uppercase` | 1351 |
| `font-larger` | 1334 |
| `typography-josefin-sans` | 1313 |
| `w-100` | 1290 |
| `h-100` | 1198 |
| `col-md-4` | 1192 |
| `bg-white` | 1067 |
| `mx-auto` | 1054 |
| `fas` | 995 |
| `col-md-12` | 966 |
| `font-small` | 965 |
| `double-column` | 878 |
| `col-lg-4` | 874 |
| `col-md-8` | 832 |
| `single-column` | 819 |
| `border-bottom` | 769 |
| `border` | 735 |
| `bg-light` | 717 |
| `boster_column_container` | 716 |
| `topic-heading-section` | 696 |
| `text-darkgrey` | 688 |
| `p-0` | 678 |
| `list-style-bullets` | 671 |
| `col-md-6` | 657 |
| `table` | 622 |
| `table-striped` | 597 |
| `mb-0` | 586 |
| `m-0` | 573 |
| `collapse` | 553 |
| `mb-lg-0` | 534 |
| `bg-orange` | 524 |
| `col-lg-6` | 508 |
| `w-75` | 500 |
| `dark-overlap` | 493 |

## Magento directive reference

Directives found in **this** export (string literal → approximate page count):

| Directive | ~pages | Next.js replacement |
|-----------|--------|---------------------|
| `{{customVar code=publications_count}}` | 13 | Parse `type` / `id`; implement as React component + API |
| `{{customVar code=elisa_kits_count}}` | 8 | Parse `type` / `id`; implement as React component + API |
| `{{customVar code=antibodies_count}}` | 7 | Parse `type` / `id`; implement as React component + API |
| `{{block type="page/html_header" template="cj_templates/cj_lead_form.phtml"}}` | 7 | Parse `type` / `id`; implement as React component + API |
| `{{customVar code=company_years_in_business}}` | 6 | Parse `type` / `id`; implement as React component + API |
| `{{customVar code=rating_on_biocompare}}` | 5 | Parse `type` / `id`; implement as React component + API |
| `{{customVar code=company_founded_year}}` | 5 | Parse `type` / `id`; implement as React component + API |
| `{{media url=&quot;wysiwyg/wb-resource-center.jpg&quot;}}` | 5 | `next/image` or static URL after asset migration |
| `{{media url=&quot;wysiwyg/elisa-resource-center.jpg&quot;}}` | 4 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/boster_logo.png"}}` | 4 | `next/image` or static URL after asset migration |
| `{{media url=&quot;wysiwyg/ihc-resource-center.jpg&quot;}}` | 3 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/100_guarantee.png"}}` | 3 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/anitbodies.png"}}` | 3 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/boster_price.png"}}` | 3 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/e-book_series.png"}}` | 3 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/elisa_kit.png"}}` | 3 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/publications.png"}}` | 3 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/rating.png"}}` | 3 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/saving.png"}}` | 3 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/years.png"}}` | 3 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/you_save.png"}}` | 3 | `next/image` or static URL after asset migration |
| `{{block class="Magento\Framework\View\Element\Template" block_id="new-popular-products" template=…` | 3 | CMS block → React fragment or MDX import |
| `{{media url="wysiwyg/sigma_price.png"}}` | 2 | `next/image` or static URL after asset migration |
| `{{block<br>class="Magento\Framework\View\Element\Template" block_id="categories-block"<br>template="Mag…` | 2 | Parse `type` / `id`; implement as React component + API |
| `{{block class="Magento\Framework\View\Element\Template"<br>block_id="new-popular-products"<br>template=…` | 2 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Cms\Block\Block" block_id="publication-number"}}` | 2 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template"<br>block_id="product-listing-block"<br>template…` | 2 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Contact\Block\ContactForm" name="contactForm" template="Magento_Contact::f…` | 1 | CMS block → React fragment or MDX import |
| `{{media url='troubleshooting_box_image.png'}}` | 1 | `next/image` or static URL after asset migration |
| `{{block class="Magento\Framework\View\Element\Template" name="cj_lead_form" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block type="core/template" template="cj_templates/html_staging.phtml"}}` | 1 | Parse `type` / `id`; implement as React component + API |
| `{{media url=&quot;wysiwyg/high-background-fix.jpg&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url=&quot;wysiwyg/high-background.jpg&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url=&quot;wysiwyg/weak-staining-fix.jpg&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url=&quot;wysiwyg/weak-staining.jpg&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url=&quot;wysiwyg/overstaining-fix.jpg&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url=&quot;wysiwyg/overstaining.jpg&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{block class="Magento\Framework\View\Element\Template" block_id="categories-block"<br>  template="M…` | 1 | CMS block → React fragment or MDX import |
| `{{widget type="Magento\Cms\Block\Widget\Block" template="widget/static_block/default.phtml" block…` | 1 | Widget → dedicated component (products, forms, etc.) |
| `{{media url="wysiwyg/100_guaranteed.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/M00144-1.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/M00745-3.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/M01811.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/M02778.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/M02848-3.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/M08065-1.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/contact_cartoon.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/iso9001.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/rabbit_circle_logo.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/tick.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{widget type="Magento\\Cms\\Block\\Widget\\Block" template="cj_templates/product-image-change.ph…` | 1 | Widget → dedicated component (products, forms, etc.) |
| `{{media url="wysiwyg/Image/rabbit-web-page-img-2.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{block class="Magento\Contact\Block\ContactForm" name="contactForm" from_name="protein" redirect…` | 1 | CMS block → React fragment or MDX import |
| `{{media url="wysiwyg/Avidin-biotin_peroxidase_complex.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/Stability_graph.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/equation.PNG"}}` | 1 | `next/image` or static URL after asset migration |
| `{{block type="core/template" template="cj_templates/cj_lead_form.phtml"}}` | 1 | Parse `type` / `id`; implement as React component + API |
| `{{config path="web/secure/base_url"}}` | 1 | Parse `type` / `id`; implement as React component + API |
| `{{media url="wysiwyg/thermo_fisher.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{block type="core/template" name="contactForm" template="cj_templates/orders.phtml" FormAction="…` | 1 | Parse `type` / `id`; implement as React component + API |
| `{{media url=&quot;wysiwyg/elisa-resource-center_1.jpg&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/Multiplex-Image1.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/MultiplexBannerTest.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{block class="Magento\Framework\View\Element\Template"<br>  block_id="product-listing-block"<br>  temp…` | 1 | CMS block → React fragment or MDX import |
| `{{media url="wysiwyg/about-1.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/about-2.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/about-3.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/about-4.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/about-5.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/elisa-hero-image.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/side-book-image.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/side-logo2.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/slide-1.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/slide-2.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/slide-3.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/slide-4.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/slide-5.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/slide-6.jpg"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/troubleshooting_box_image.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/why-choose-1.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/why-choose-2.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/why-choose-3.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url="wysiwyg/why-choose-4.png"}}` | 1 | `next/image` or static URL after asset migration |
| `{{block class="Magento\Framework\View\Element\Template" name="testimonials" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="cj-custom-script" template="Mag…` | 1 | CMS block → React fragment or MDX import |
| `{{media url=&quot;images/bosterbio-b.jpg&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url=&quot;wysiwyg/logo_bosterbio.png&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url=&quot;wysiwyg/logo_easttennessee.png&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{media url=&quot;wysiwyg/logo_northcarolina.png&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{block class="Magento\Framework\View\Element\Template" block_id="cj-custom-search" template="Mag…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="cj-custom-search" template="Mag…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="cj-custom-script" template="Mag…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="cj-custom-script" template="Mag…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="categories-block"<br>template="Mag…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="new-popular-products"<br>template=…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="product-listing-block"<br>template…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="categories-block" template="Mag…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showMyProjects" template="Magento_C…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="cj-custom-script" template="Mag…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Contact\Block\ContactForm" name="contactForm" template="Magento_Theme::eli…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="cj-custom-script" template="Mag…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showMyProjects" template="Magento_C…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showMyQuotes" template="Magento_Cus…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showMyQuoteDetails" template="Magen…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showMyOrders" template="Magento_Cus…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="UpdatePurchaseOrder" template="Mage…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="product-listing-block" template…` | 1 | CMS block → React fragment or MDX import |
| `{{media url=&quot;images/dna-transcription-translation.png&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{block class="Magento\Framework\View\Element\Template" block_id="cj-custom-search" template="Mag…` | 1 | CMS block → React fragment or MDX import |
| `{{media url=&quot;images/multiplex-assay-formats-explained.png&quot;}}` | 1 | `next/image` or static URL after asset migration |
| `{{block class="Magento\Framework\View\Element\Template" block_id="cj-api" template="Magento_Theme…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\\Framework\\View\\Element\\Template" name="showcaseSKUs" template="Magento…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showcaseSKUs" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" name="showMyOrders" template="Magento_The…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="elisa_api" template="Magento_Th…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="fuorescence_spectra_viewer_api"…` | 1 | CMS block → React fragment or MDX import |
| `{{block class="Magento\Framework\View\Element\Template" block_id="product-listing-block"   templa…` | 1 | CMS block → React fragment or MDX import |

## QA checklist

- [ ] Each **KEEP** `identifier` has a route or redirect in Next.js.
- [ ] All **widgets** in top templates have engineering owners.
- [ ] **LazyLoad** / `data-src` images migrated and optimized.
- [ ] Legal pages reviewed by compliance.
