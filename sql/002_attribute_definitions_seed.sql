-- attribute_definitions seed for the 12 product templates.
-- Maps attr_1..attr_25 → human-readable labels per template.
-- Mirrors the order in scripts/migrate-products-pilot.mjs TYPE_B_COLUMNS.

DELETE FROM public.attribute_definitions;

-- The migration script uses a single TYPE_B_COLUMNS array template-agnostically:
-- attr_1=kit_components, attr_2=cross_reactivity, attr_3=reconstitution,
-- attr_4=predicted_reactivity, attr_5=recommended_detection_systems,
-- attr_6=sensitivity, attr_7=reproducibility, attr_8=assay_range,
-- attr_9=sample_type, attr_10=sequence_similarities,
-- attr_11=description_before_attributes, attr_12=description_after_attributes,
-- attr_13=immunogen, attr_14=purification, attr_15=concentration,
-- attr_16=form, attr_17=isotype, attr_18=tissue_specificity,
-- attr_19=subcellular_localization, attr_20=molecular_weight,
-- attr_21=principle, attr_22=tmb_incubation_time, attr_23=intra_inter_assay_cv,
-- attr_24=sample_data, attr_25=application_details

-- Helper: build per-template rows
WITH template_attrs AS (
  SELECT t.template, x.attr_key, x.label, x.display_order, x.is_required, x.attr_type
  FROM (VALUES
    ('antibodies'),
    ('elisa-kits'),
    ('proteins'),
    ('over-expression-lysates'),
    ('cell-based-elisa-kits'),
    ('cell-based-phospho-elisa-kits'),
    ('custom-description'),
    ('ez-set'),
    ('tag-quick-elisa-kits'),
    ('veterinary-diagnostic-kits'),
    ('elisa-kits-custom-components')
  ) t(template)
  CROSS JOIN (VALUES
    ('attr_1',  'Kit Components',                 1,  false, 'html'),
    ('attr_2',  'Cross Reactivity',               2,  false, 'text'),
    ('attr_3',  'Reconstitution',                 3,  false, 'html'),
    ('attr_4',  'Predicted Reactivity',           4,  false, 'text'),
    ('attr_5',  'Recommended Detection Systems',  5,  false, 'text'),
    ('attr_6',  'Sensitivity',                    6,  false, 'text'),
    ('attr_7',  'Reproducibility',                7,  false, 'text'),
    ('attr_8',  'Assay Range',                    8,  false, 'text'),
    ('attr_9',  'Sample Type',                    9,  false, 'text'),
    ('attr_10', 'Sequence Similarities',         10,  false, 'text'),
    ('attr_11', 'Additional Notes (Pre)',        11,  false, 'html'),
    ('attr_12', 'Additional Notes (Post)',       12,  false, 'html'),
    ('attr_13', 'Immunogen',                     13,  false, 'text'),
    ('attr_14', 'Purification',                  14,  false, 'text'),
    ('attr_15', 'Concentration',                 15,  false, 'text'),
    ('attr_16', 'Form',                          16,  false, 'text'),
    ('attr_17', 'Isotype',                       17,  false, 'text'),
    ('attr_18', 'Tissue Specificity',            18,  false, 'text'),
    ('attr_19', 'Subcellular Localization',      19,  false, 'text'),
    ('attr_20', 'Molecular Weight',              20,  false, 'text'),
    ('attr_21', 'Assay Principle',               21,  false, 'html'),
    ('attr_22', 'TMB Incubation Time',           22,  false, 'text'),
    ('attr_23', 'Intra/Inter Assay CV',          23,  false, 'text'),
    ('attr_24', 'Sample Data',                   24,  false, 'html'),
    ('attr_25', 'Application Details',           25,  false, 'html')
  ) x(attr_key, label, display_order, is_required, attr_type)
)
INSERT INTO public.attribute_definitions (template, attr_key, label, type, display_order, required)
SELECT template, attr_key, label, attr_type, display_order, is_required
FROM template_attrs;
