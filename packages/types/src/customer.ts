export interface Customer {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
}

export interface Address {
  id: string
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  province: string
  postalCode: string
  countryCode: string
  phone?: string
}
