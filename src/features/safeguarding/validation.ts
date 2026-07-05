import { z } from 'zod';

import {
  CONTACT_PROXIMITY_OPTIONS,
  CONCERN_CATEGORY_OPTIONS,
  PERPETRATOR_ROLE_OPTIONS,
  PERSON_AT_RISK_AGE_OPTIONS,
  PERSON_AT_RISK_GENDER_OPTIONS,
  REPORTER_RELATION_OPTIONS,
  REPORT_NATURE_OPTIONS,
} from './constants';

export const safeguardingSchema = z
  .object({
    isAnonymous: z.boolean(),
    reporterName: z.string().optional(),
    reporterEmail: z.string().email('Invalid email').optional().or(z.literal('')),
    reporterPhone: z.string().optional(),
    reporterRelation: z.enum(REPORTER_RELATION_OPTIONS).optional().or(z.literal('')),
    reporterNature: z
      .enum(REPORT_NATURE_OPTIONS)
      .or(z.literal(''))
      .refine((value) => value !== '', 'Please select how you are reporting this concern'),
    reporterConsent: z
      .boolean()
      .refine((value) => value === true, 'You must consent before proceeding'),
    category: z
      .enum(CONCERN_CATEGORY_OPTIONS)
      .or(z.literal(''))
      .refine((value) => value !== '', 'Please select a category'),
    incidentDate: z.string().optional(),
    location: z.string().optional(),
    personAtRiskName: z.string().optional(),
    personAtRiskAge: z.enum(PERSON_AT_RISK_AGE_OPTIONS).optional().or(z.literal('')),
    personAtRiskGender: z.enum(PERSON_AT_RISK_GENDER_OPTIONS).optional().or(z.literal('')),
    personAtRiskIsParticipant: z.enum(['Yes', 'No', 'Unknown']).optional().or(z.literal('')),
    allegedPerpetratorName: z.string().optional(),
    allegedPerpetratorRole: z.enum(PERPETRATOR_ROLE_OPTIONS).optional().or(z.literal('')),
    isPersonAtRiskInContact: z.enum(CONTACT_PROXIMITY_OPTIONS).optional().or(z.literal('')),
    description: z.string().min(20, 'Description must be at least 20 characters'),
  })
  .refine(
    (data) => {
      if (!data.isAnonymous) {
        return !!data.reporterName && !!data.reporterEmail;
      }
      return true;
    },
    {
      message: 'Name and email are required for non-anonymous reports',
      path: ['reporterName'],
    }
  );

export type SafeguardingReportSchema = z.infer<typeof safeguardingSchema>;
