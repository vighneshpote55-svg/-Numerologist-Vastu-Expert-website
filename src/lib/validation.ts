import { z } from 'zod';

export const consultationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(80, { message: 'Full name must not exceed 80 characters.' }),
  phone: z
    .string()
    .trim()
    .min(8, { message: 'Please provide a valid contact number (at least 8 digits).' })
    .max(20, { message: 'Contact number is too long.' })
    .regex(/^[+0-9\s\-()]+$/, { message: 'Please enter a valid phone or WhatsApp number.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address.' })
    .optional()
    .or(z.literal('')),
  dateOfBirth: z
    .string()
    .optional()
    .or(z.literal('')),
  cityCountry: z
    .string()
    .trim()
    .max(100)
    .optional()
    .or(z.literal('')),
  consultationType: z.enum([
    'Numerology',
    'Vastu',
    'Numerology + Vastu',
    'Business Consultation',
    'Other'
  ] as const),
  preferredDate: z.string().optional().or(z.literal('')),
  preferredTime: z.string().optional().or(z.literal('')),
  attachmentName: z.string().optional().or(z.literal('')),
  attachmentDataUrl: z.string().optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .max(1000, { message: 'Message must not exceed 1000 characters.' })
    .optional()
    .or(z.literal(''))
});

export type ConsultationFormValues = z.infer<typeof consultationSchema>;

export function generateWhatsAppLink(details: {
  fullName: string;
  dateOfBirth?: string;
  consultationType: string;
  areaOfGuidance?: string;
}): string {
  const phone = '919011023754';
  const name = details.fullName || 'Valued Client';
  const dob = details.dateOfBirth ? details.dateOfBirth : 'To be shared';
  const type = details.consultationType || 'General Consultation';
  const area = details.areaOfGuidance ? details.areaOfGuidance : 'Personal & Professional Growth';

  const text = `Hi Archanna,\n\nI would like to enquire about a consultation.\n\nName: ${name}\nDate of Birth: ${dob}\nArea I need guidance with: ${area}\nPreferred consultation: ${type}\n\nThank you.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
