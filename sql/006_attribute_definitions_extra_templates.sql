-- Seed attribute_definitions rows for Magento templates not covered by 002 (same
-- attr_1..attr_25 labels as `antibodies` — TYPE_B column order matches migrate-products-pilot.mjs).

INSERT INTO public.attribute_definitions (template, attr_key, label, type, display_order, required)
SELECT v.template, d.attr_key, d.label, d.type, d.display_order, d.required
FROM public.attribute_definitions d
CROSS JOIN (
  VALUES
    ('consumables'),
    ('detection-kits'),
    ('isotype-control-antibodies'),
    ('quick-elisa-kits'),
    ('reporter-cell-lines'),
    ('multiplex-elisa-kits'),
    ('beads'),
    ('antibody-quick-elisa-kits'),
    ('instruments-and-machines'),
    ('hs-elisa-kits'),
    ('secondary-antibodies')
) AS v(template)
WHERE d.template = 'antibodies'
ON CONFLICT (template, attr_key) DO NOTHING;
