import { z } from 'zod'

import { SUPPORTED_CURRENCIES } from './product'

/**
 * The trust boundary. Everything crossing it from the browser is hostile until
 * proven otherwise.
 *
 * Note what is absent: any notion of price. The client tells us *which*
 * currency it wants to pay in and where to ship; the server decides what that
 * costs. Amounts are never round-tripped through the browser.
 */

const shippingAddressSchema = z.object({
  line1: z.string().trim().min(1, 'Address is required').max(200),
  line2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1, 'City is required').max(100),
  state: z.string().trim().min(1, 'State or region is required').max(100),
  postalCode: z.string().trim().min(3, 'Postal code is required').max(20),
  country: z
    .string()
    .trim()
    .toUpperCase()
    .length(2, 'Country must be a two-letter code'),
})

const customerSchema = z.object({
  fullName: z.string().trim().min(1, 'Name is required').max(120),
  email: z.email('A valid email is required').max(254),
  // Deliberately permissive: international dialling formats vary far too much
  // for a regex to be anything but a source of false rejections. We check it
  // is plausibly a phone number and let the courier sort out the rest.
  phone: z
    .string()
    .trim()
    .min(6, 'A contact phone number is required')
    .max(20)
    .regex(/^[+0-9\s().-]+$/, 'Phone number contains invalid characters'),
})

export const checkoutRequestSchema = z.object({
  currency: z.enum(SUPPORTED_CURRENCIES),
  customer: customerSchema,
  shipping: shippingAddressSchema,
})

export type ValidatedCheckoutRequest = z.infer<typeof checkoutRequestSchema>

export interface FieldError {
  readonly path: string
  readonly message: string
}

/** Flatten a ZodError into something safe and useful to hand back to the form. */
export function toFieldErrors(error: z.ZodError): FieldError[] {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }))
}
