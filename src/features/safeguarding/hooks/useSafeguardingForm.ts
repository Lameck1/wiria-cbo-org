import { useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { TIMING } from '@/shared/constants/config';

import { safeguardingSchema } from '../validation';
import { useSafeguardingReport } from './useSafeguardingReport';

type SafeguardingFormValues = z.input<typeof safeguardingSchema>;

export type FormStep = 'reporter' | 'details';

export function useSafeguardingForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>('reporter');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedReporterEmail, setSubmittedReporterEmail] = useState<string | null>(null);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const { submitReport, submittedReference, resetSubmission } = useSafeguardingReport();

  const form = useForm<SafeguardingFormValues>({
    resolver: zodResolver(safeguardingSchema),
    defaultValues: {
      isAnonymous: false,
      reporterName: '',
      reporterEmail: '',
      reporterPhone: '',
      reporterRelation: '',
      reporterNature: '',
      reporterConsent: false,
      category: '',
      incidentDate: '',
      location: '',
      personAtRiskName: '',
      personAtRiskAge: '',
      personAtRiskGender: '',
      personAtRiskIsParticipant: '',
      allegedPerpetratorName: '',
      allegedPerpetratorRole: '',
      isPersonAtRiskInContact: '',
      description: '',
    },
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { isSubmitting },
  } = form;

  const isAnonymous = watch('isAnonymous');

  const onSubmit = async (data: SafeguardingFormValues) => {
    const now = Date.now();
    if (now - lastSubmitTime < TIMING.SUBMIT_COOLDOWN) {
      return;
    }

    setLastSubmitTime(now);
    const success = await submitReport(data, evidenceFile ?? undefined);
    if (success) {
      setSubmittedReporterEmail(data.reporterEmail?.trim() ?? null);
      setSubmittedAt(new Date(now).toISOString());
      setShowSuccess(true);
    }
  };

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setEvidenceFile(event.target.files[0]);
    }
  }, []);

  const clearFile = useCallback(() => {
    setEvidenceFile(null);
  }, []);

  const handleNextStep = async () => {
    const fieldsToValidate: (keyof SafeguardingFormValues)[] = isAnonymous
      ? ['reporterNature', 'reporterConsent']
      : ['reporterName', 'reporterEmail', 'reporterNature', 'reporterConsent'];

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }

    setCurrentStep('details');
  };

  const handlePreviousStep = useCallback(() => {
    setCurrentStep('reporter');
  }, []);

  const handleNewReport = useCallback(() => {
    resetSubmission();
    setShowSuccess(false);
    setSubmittedReporterEmail(null);
    setSubmittedAt(null);
    reset();
    setEvidenceFile(null);
    setCurrentStep('reporter');
  }, [resetSubmission, reset]);

  return {
    form,
    currentStep,
    isAnonymous,
    evidenceFile,
    showSuccess,
    isSubmitting,
    submittedReference,
    submittedReporterEmail,
    submittedAt,
    handleFileChange,
    clearFile,
    handleNextStep,
    handlePrevStep: handlePreviousStep,
    submitAction: handleSubmit(onSubmit),
    handleNewReport,
    progressPercentage: currentStep === 'reporter' ? 50 : 100,
    setIsAnonymous: (value: boolean) => setValue('isAnonymous', value),
  };
}
