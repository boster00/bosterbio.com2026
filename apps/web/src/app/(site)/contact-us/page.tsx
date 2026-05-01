import { redirect } from "next/navigation"

/**
 * /contact-us is a duplicate route. The canonical contact page lives at /contact.
 * This redirect preserves any inbound links from the legacy Magento site that
 * referenced /contact-us.
 */
export default function ContactUsRedirect() {
  redirect("/contact")
}
