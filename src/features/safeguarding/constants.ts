export const SAFEGUARDING_POLICY_URL = '/documents/safeguarding-policy.pdf';

const focalPointName = String(import.meta.env['VITE_SAFEGUARDING_FOCAL_POINT_NAME'] ?? '').trim();
const focalPointTitle = String(import.meta.env['VITE_SAFEGUARDING_FOCAL_POINT_TITLE'] ?? '').trim();
const focalPointPhone = String(import.meta.env['VITE_SAFEGUARDING_FOCAL_POINT_PHONE'] ?? '').trim();
const focalPointEmail = String(import.meta.env['VITE_SAFEGUARDING_FOCAL_POINT_EMAIL'] ?? '').trim();
const deputyName = String(import.meta.env['VITE_SAFEGUARDING_DEPUTY_NAME'] ?? '').trim();
const deputyContact = String(import.meta.env['VITE_SAFEGUARDING_DEPUTY_CONTACT'] ?? '').trim();
const boardChairName = String(import.meta.env['VITE_SAFEGUARDING_BOARD_CHAIR_NAME'] ?? 'Joshua Omollo').trim();
const boardChairContact = String(import.meta.env['VITE_SAFEGUARDING_BOARD_CHAIR_CONTACT'] ?? '').trim();

export const safeguardingFocalPoint = {
  name: focalPointName,
  title: focalPointTitle,
  phone: focalPointPhone,
  email: focalPointEmail,
  deputyName,
  deputyContact,
  boardChairName,
  boardChairContact,
};

export const hasSafeguardingFocalPointDetails = Boolean(
  focalPointName && focalPointTitle && focalPointPhone && focalPointEmail
);

export const REPORTER_RELATION_OPTIONS = [
  'WIRIA Staff Member',
  'WIRIA Volunteer / Peer Educator',
  'Programme Beneficiary',
  'Community Member',
  'Partner Organisation Staff',
  'Visitor / Donor / Observer',
  'Other',
] as const;

export const REPORT_NATURE_OPTIONS = [
  'I am the person who experienced this (survivor/victim reporting directly)',
  'I witnessed this happening',
  'Someone told me about this (third-party report)',
  'I have a general concern or suspicion',
  'Other',
] as const;

export const CONCERN_CATEGORY_OPTIONS = [
  'Child Protection (any concern involving a person under 18)',
  'SEAH - Sexual Exploitation, Abuse or Harassment',
  'Physical Abuse',
  'Gender-Based Violence (GBV) / Domestic Violence',
  'Emotional or Psychological Abuse',
  'Neglect',
  'Discrimination (based on HIV status, disability, gender, sexuality, religion, or ethnicity)',
  'Other Concern',
] as const;

export const PERSON_AT_RISK_AGE_OPTIONS = [
  'Under 10',
  '10-17',
  '18-25',
  '26-40',
  '41-60',
  '60+',
] as const;

export const PERSON_AT_RISK_GENDER_OPTIONS = [
  'Female',
  'Male',
  'Non-binary',
  'Prefer not to say',
  'Unknown',
] as const;

export const PERPETRATOR_ROLE_OPTIONS = [
  'WIRIA Staff Member',
  'WIRIA Volunteer / Peer Educator',
  'WIRIA Board Member',
  'Partner Organisation Staff',
  'Community Member (not affiliated with WIRIA)',
  'Unknown',
  'Other',
] as const;

export const CONTACT_PROXIMITY_OPTIONS = ['Yes', 'No', 'Unknown', 'Not applicable'] as const;

export const isChildProtectionConcern = (category: string) =>
  category === 'Child Protection (any concern involving a person under 18)';

export const isMinorAgeValue = (value: string) => value === 'Under 10' || value === '10-17';
