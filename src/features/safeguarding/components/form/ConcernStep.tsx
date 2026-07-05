import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/components/ui/Button';
import { FormField, FormSelectField, FormTextareaField } from '@/shared/components/ui/form';

import {
  CONTACT_PROXIMITY_OPTIONS,
  CONCERN_CATEGORY_OPTIONS,
  PERPETRATOR_ROLE_OPTIONS,
  PERSON_AT_RISK_AGE_OPTIONS,
  PERSON_AT_RISK_GENDER_OPTIONS,
  isChildProtectionConcern,
  isMinorAgeValue,
} from '../../constants';

const CONCERN_CATEGORIES = CONCERN_CATEGORY_OPTIONS.map((value) => ({
  value,
  label: value,
  icon:
    value === 'Child Protection (any concern involving a person under 18)'
      ? '🧒'
      : value === 'SEAH - Sexual Exploitation, Abuse or Harassment'
        ? '⚠️'
        : value === 'Physical Abuse'
          ? '✋'
          : value === 'Gender-Based Violence (GBV) / Domestic Violence'
            ? '🛡️'
            : value === 'Emotional or Psychological Abuse'
              ? '😰'
              : value === 'Neglect'
                ? '🕳️'
                : value ===
                    'Discrimination (based on HIV status, disability, gender, sexuality, religion, or ethnicity)'
                  ? '🚫'
                  : '📋',
}));

const AGE_OPTIONS = PERSON_AT_RISK_AGE_OPTIONS.map((value) => ({ value, label: value }));
const GENDER_OPTIONS = PERSON_AT_RISK_GENDER_OPTIONS.map((value) => ({ value, label: value }));
const ROLE_OPTIONS = PERPETRATOR_ROLE_OPTIONS.map((value) => ({ value, label: value }));
const CONTACT_OPTIONS = CONTACT_PROXIMITY_OPTIONS.map((value) => ({ value, label: value }));

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface ConcernStepProps {
  isSubmitting: boolean;
  evidenceFile: File | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFile: () => void;
  onBack: () => void;
}

export function ConcernStep({
  isSubmitting,
  evidenceFile,
  onFileChange,
  onClearFile,
  onBack,
}: ConcernStepProps) {
  const { watch, setValue } = useFormContext();
  const category = watch('category') as string;
  const age = watch('personAtRiskAge') as string;
  const riskNoticeVisible = isChildProtectionConcern(category) || isMinorAgeValue(age);

  return (
    <div className="space-y-6">
      <motion.div variants={staggerItem}>
        <span className="mb-1 block text-sm font-medium text-gray-700">
          Category of Concern <span className="text-red-500">*</span>
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
          {CONCERN_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setValue('category', cat.value, { shouldValidate: true })}
              disabled={isSubmitting}
              className={`rounded-xl border-2 p-3 text-left transition-all ${
                category === cat.value
                  ? 'border-slate-600 bg-slate-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } disabled:opacity-50`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span
                className={`mt-1 block text-sm font-medium ${category === cat.value ? 'text-slate-700' : 'text-gray-600'}`}
              >
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {riskNoticeVisible && (
        <motion.div variants={staggerItem} className="rounded-xl border border-amber-300 bg-amber-50 p-4">
          <p className="font-semibold text-amber-900">Mandatory reporting notice</p>
          <p className="mt-1 text-sm text-amber-800">
            Reports involving a person under 18 years of age are subject to mandatory reporting
            obligations under Kenya's Children Act, 2022. WIRIA is required by law to notify the
            relevant authorities. Submitting this report authorises WIRIA to do so.
          </p>
        </motion.div>
      )}

      <motion.div variants={staggerItem} className="grid gap-4 md:grid-cols-2">
        <FormField
          label="When did this occur?"
          type="date"
          name="incidentDate"
          disabled={isSubmitting}
        />
        <FormField
          label="Where did this happen?"
          name="location"
          disabled={isSubmitting}
          placeholder="Location or area"
        />
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-4 rounded-2xl border border-gray-200 p-5">
        <h3 className="font-semibold text-wiria-blue-dark">Person at Risk</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Full name or description"
            name="personAtRiskName"
            disabled={isSubmitting}
            placeholder="Name or description"
          />
          <FormSelectField
            label="Approximate age"
            name="personAtRiskAge"
            options={AGE_OPTIONS}
            disabled={isSubmitting}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FormSelectField
            label="Gender"
            name="personAtRiskGender"
            options={GENDER_OPTIONS}
            disabled={isSubmitting}
          />
          <FormSelectField
            label="Is this person a current WIRIA programme participant?"
            name="personAtRiskIsParticipant"
            options={CONTACT_OPTIONS.slice(0, 3)}
            disabled={isSubmitting}
          />
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="space-y-4 rounded-2xl border border-gray-200 p-5">
        <h3 className="font-semibold text-wiria-blue-dark">Alleged Perpetrator</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Full name or description"
            name="allegedPerpetratorName"
            disabled={isSubmitting}
            placeholder="Name or description"
          />
          <FormSelectField
            label="Role or relationship to WIRIA"
            name="allegedPerpetratorRole"
            options={ROLE_OPTIONS}
            disabled={isSubmitting}
          />
        </div>
      </motion.div>

      <motion.div variants={staggerItem}>
        <FormSelectField
          label="Is the person at risk currently in contact with the alleged perpetrator?"
          name="isPersonAtRiskInContact"
          options={CONTACT_OPTIONS}
          disabled={isSubmitting}
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <FormTextareaField
          label="Description"
          name="description"
          rows={5}
          required
          disabled={isSubmitting}
          placeholder="Please describe what happened in detail..."
          description="Minimum 20 characters required"
        />
      </motion.div>

      <motion.div variants={staggerItem}>
        <label htmlFor="evidence-file" className="mb-1 block text-sm font-medium text-gray-700">
          Supporting Evidence (Optional)
        </label>
        {evidenceFile ? (
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div>
                <p className="max-w-[200px] truncate font-medium text-green-800">
                  {evidenceFile.name}
                </p>
                <p className="text-sm text-green-600">{(evidenceFile.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClearFile}
              className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-100"
            >
              &times;
            </button>
          </div>
        ) : (
          <div className="relative">
            <input
              id="evidence-file"
              type="file"
              onChange={onFileChange}
              disabled={isSubmitting}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              accept="image/*,.pdf,.doc,.docx"
            />
            <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-all hover:border-slate-400 hover:bg-gray-50">
              <p className="font-medium text-gray-600">Click or drag file to upload</p>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div variants={staggerItem} className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={onBack} disabled={isSubmitting} className="flex-1">
          Back
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !category}
          className="flex-[2] rounded-xl py-4 shadow-lg"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </Button>
      </motion.div>
    </div>
  );
}
