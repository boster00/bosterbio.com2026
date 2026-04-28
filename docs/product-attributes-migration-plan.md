# Product Attributes Migration Plan

**Source:** Magento 2 EAV on c100h.bosterbio.com (85,929 products)

**Target:** Medusa v2 — hybrid schema (dedicated columns + structured flexible attributes)

**Principle:** Replication-first with controlled normalization. Separate **meaningful dedicated fields** from **template-driven flexible fields**.

---

## Product Lines (by `template`)

| Template                      |  Count | Notes                       |
| ----------------------------- | -----: | --------------------------- |
| antibodies                    | 51,464 | Primary product line (~60%) |
| over-expression-lysates       | 15,130 |                             |
| proteins                      | 13,242 |                             |
| elisa-kits                    |  1,687 |                             |
| cell-based-elisa-kits         |    933 |                             |
| custom-description            |    917 | Freeform layout             |
| cell-based-phospho-elisa-kits |    710 |                             |
| ez-set                        |    308 |                             |
| tag-quick-elisa-kits          |    200 |                             |
| veterinary-diagnostic-kits    |    158 |                             |
| elisa-kits-custom-components  |    135 |                             |
| Other                         |   ~376 | misc                        |

Each template defines how attributes are rendered. Flexible attributes are mapped per template.

---

# Core Model (Revised)

## Category 1: Dedicated Columns (Semantically Named)

These are **first-class fields**. Some are indexed, some are not. Indexing is a separate concern.

### 1A. Indexed / Query-critical fields

* sku
* title
* handle (url_key)
* product_template
* product_category → **Medusa category system (NOT column)**
* reactivity (text[])
* applications (text[])
* clonality → merged with clone_number → **`clone`**
* host_species
* badges
* target_info (JSON, indexed/searchable)
* search_index (computed text field)

### 1B. Dedicated but NOT indexed

* price (Medusa variant)
* status
* visibility (optional)
* storage
* shipping_storage_handling
* background
* description (Medusa native)
* short_description
* meta_title / meta_description / meta_keywords

### Explicit Decisions

**Removed from Category 1:**

* conjugate
* research_category
* molecule
* size (variant concern)

**New additions:**

* storage
* shipping_storage_handling
* search_index

---

## Target Information (Consolidation)

All gene/protein-related fields are merged into:

`target_info (json)`

Includes:

* gene_name
* uniprot_id
* synonyms
* protein_function
* gene_full_name
* protein_name

This is:

* compact
* structured
* searchable
* avoids column explosion

---

## Category 2: Flexible Attributes (Template-driven, Nameless Storage)

All remaining attributes go here.

### Key Principle

These attributes:

* do NOT get semantic column names
* are NOT hardcoded into schema
* are mapped by **template definitions**

### Storage Strategy (FINAL DECISION)

We will use:

**→ Generic columns (text-only, NOT JSON)**

Example:

* attr_1 ... attr_N

**N is not fixed.** It should be determined dynamically based on current attribute demand:

* Count the maximum number of flexible attributes used by any template
* Add ~50% buffer

**Current working estimate:** ~25 columns. Validated against real Magento data: ELISA kits use 11+ template-specific attrs, antibodies use 15+, and shared flexible attrs (immunogen, purification, form, etc.) add another 10-15. With 50% buffer, 25 columns covers all current templates comfortably. Extra empty text columns cost almost nothing in Postgres.

All attributes are stored as text. No type distinction at storage level.

AND

**→ Separate definition table**

`attribute_definitions`

| field         | meaning                             |
| ------------- | ----------------------------------- |
| template      | template name                       |
| attr_key      | attr_1, attr_2, attr_3              |
| label         | "Sensitivity", "Kit Components"     |
| type          | text / html (rendered via template) |
| display_order | rendering order                     |
| required      | boolean — template requires this    |

### Why this wins

This is better than a single JSON blob because:

* labels can be renamed centrally
* values stay stable even when presentation changes
* template-specific meaning lives outside product data
* admin tooling and rendering logic are easier to control
* storage stays simple and uniform (all text)
* complexity is shifted to template layer where it belongs

### Why NOT JSON

JSON rejected because:

* hard to rename attributes globally
* requires rewriting all product blobs
* poor governance of naming
* weak template control

### Why Generic Columns + Definition Table

* stable storage
* flexible meaning
* template-driven rendering
* no data migration when renaming labels
* scalable long-term
* simplest possible storage model (all text)

### Decision hierarchy

1. **Generic text columns + definition table** ← chosen
2. Plain generic columns + definition table
3. JSON blob + definition table
4. JSON blob alone

---

## Category 2 Attribute Mapping

The following ALL go into flexible attributes (attr_1…N):

### ELISA / technical / descriptive

* kit_components
* cross_reactivity
* reconstitution
* predicted_reactivity (keep as-is for now)
* recommended_detection_systems
* sensitivity
* reproducibility
* assay_range
* sample_type
* sequence_similarities

### Description blocks

* description_before_attributes
* description_after_attributes

### Misc scientific

* immunogen
* purification
* concentration
* form
* isotype
* tissue_specificity
* subcellular_localization
* molecular_weight

### Relationship / references

* related_product_skus
* competitor_equivalent_skus

### Low-usage / niche

* publications
* internal references

### Removed / ignored

* sample_size_available (dropped)

---

## Special Handling Decisions

### Clone Handling

* clonality + clone_number → merged into:

  * `clone`

---

### Predicted Reactivity

* Keep in Category 2 for now
* Future: may require structured model

---

### Content Strategy

Moved to Category 1:

* description
* short_description
* meta fields

---

## Images & Media

Stored in a **separate `product_images` table** with many-to-one relationship. Multiple products may reference the same image (e.g., shared package photos).

```text
product_images
├── id
├── product_id (FK → product)
├── image_url (storage key or URL)
├── alt_text (short label)
├── ltx_description (long HTML description)
├── position (display order)
└── type (hero, gallery, datasheet, swatch)
```

Magento image fields mapped:
* `image` → type: hero, position: 1
* `small_image` → type: gallery (or derive from hero)
* `thumbnail` → type: gallery (or derive from hero)
* `gallery` → split colon-delimited paths into separate rows
* `image_label` → alt_text
* `swatch_image` → type: swatch

Shared images get one row referenced by multiple products. Alt text is per-association, so the same image can have different alt text on different products.

---

## Dropped / Not Migrated

* Magento system attributes
* Yoast SEO fields
* computed search weights
* unused fields
* cost
* special pricing logic (not needed)
* related products system

---

## Final Schema (Cleaned)

```text
product
├── sku
├── title
├── handle
├── description
├── short_description
├── product_template
├── status
├── visibility
├── reactivity (text[])
├── applications (text[])
├── clone
├── host_species
├── badges
├── target_info (jsonb)
├── background
├── storage
├── shipping_storage_handling
├── search_index (computed text)
├── meta_title
├── meta_description
├── meta_keywords
├── attr_1 ... attr_25 (text — validated against real Magento data)
└── metadata (jsonb)

product_images
├── id
├── product_id (FK → product)
├── image_url
├── alt_text
├── ltx_description
├── position
└── type (hero, gallery, datasheet, swatch)

product_category (Medusa native)

attribute_definitions
├── template
├── attr_key
├── label
├── type (text / html)
├── display_order
├── required (boolean)
└── storage_type
```

---

## Summary

| Category            | Storage                                |
| ------------------- | -------------------------------------- |
| Dedicated columns   | Semantically named fields              |
| Flexible attributes | attr_1…attr_25 + definition table      |
| Images              | product_images table (many-to-one)     |
| Dropped             | Not migrated                           |

---

## Migration Flow

```text
1. Extract Magento EAV
2. Map dedicated fields → product columns
3. Merge gene data → target_info
4. Merge clonality + clone_number → clone
5. Map flexible attributes → attr_1…N
6. Assign attribute meanings via template
7. Map images + LTX separately
8. Insert into Medusa
9. Validate per template
```

---

## Final Notes

* Categories must use Medusa category system (not collections)
* Search should use:

  * local search_index
  * optional external search engine
* Template system becomes **critical control layer** for rendering

This is now a **stable, scalable, template-driven architecture**.
