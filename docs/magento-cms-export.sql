-- Run on Magento MySQL (bosterbio_m2) after authenticating securely.
-- Do not commit passwords or connection strings.

-- Full audit export (one result set for CSV/TSV)
SELECT
  p.page_id,
  p.identifier,
  p.title,
  p.is_active,
  p.creation_time,
  p.update_time,
  p.content_heading,
  CHAR_LENGTH(p.content) AS content_length,
  LEFT(REPLACE(REPLACE(p.content, CHAR(10), ' '), CHAR(13), ' '), 240) AS content_preview
FROM cms_page p
ORDER BY p.is_active DESC, p.update_time DESC;
