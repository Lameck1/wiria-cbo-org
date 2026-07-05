import { motion } from 'framer-motion';

import { SAFEGUARDING_POLICY_URL, hasSafeguardingFocalPointDetails, safeguardingFocalPoint } from '../../constants';

interface SuccessViewProps {
  referenceNumber: string | null;
  submittedReporterEmail: string | null;
  submittedAt: string | null;
  onReset: () => void;
}

export function SuccessView({
  referenceNumber,
  submittedReporterEmail,
  submittedAt,
  onReset,
}: SuccessViewProps) {
  const confirmationEmailHref = submittedReporterEmail && referenceNumber
    ? `mailto:${submittedReporterEmail}?subject=${encodeURIComponent(
        `Safeguarding report confirmation ${referenceNumber ?? ''}`
      )}&body=${encodeURIComponent(
        `Your safeguarding report has been received.${referenceNumber ? ` Reference number: ${referenceNumber}.` : ''}${submittedAt ? ` Date received: ${new Date(submittedAt).toLocaleString()}.` : ''} Please keep this reference number safe.`
      )}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200 shadow-lg"
      >
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-12 w-12 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-2 text-2xl font-bold text-gray-800"
      >
        Report Submitted Successfully
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-6 text-gray-600"
      >
        Thank you for bringing this to our attention.
      </motion.p>
      {referenceNumber && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mx-auto inline-block rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 p-6 shadow-inner"
        >
          <p className="mb-1 text-sm text-gray-600">Your Reference Number:</p>
          <p className="text-4xl font-bold tracking-[0.2em] text-slate-800">{referenceNumber}</p>
        </motion.div>
      )}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-sm font-medium text-gray-600"
      >
        Please save this reference number to check the status of your report.
      </motion.p>

      {submittedAt && (
        <p className="mt-2 text-sm text-gray-500">Date received: {new Date(submittedAt).toLocaleString()}</p>
      )}

      <div className="mx-auto mt-8 grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm md:max-w-2xl md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Follow-up contact
          </p>
          {hasSafeguardingFocalPointDetails ? (
            <div className="mt-2 space-y-1 text-sm text-gray-700">
              <p>{safeguardingFocalPoint.name}</p>
              <p>{safeguardingFocalPoint.title}</p>
              <p>{safeguardingFocalPoint.phone}</p>
              <p>{safeguardingFocalPoint.email}</p>
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              Safeguarding Focal Point contact details will be published once confirmed.
            </p>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Emergency</p>
          <div className="mt-2 space-y-1 text-sm text-gray-700">
            <p>Police: 999 / 112</p>
            <p>Child Helpline: 116</p>
            <p>National GBV Hotline: 1195</p>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            You will be contacted within 24 hours if you provided contact details.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Print confirmation
        </button>
        {confirmationEmailHref && (
          <a
            href={confirmationEmailHref}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Email confirmation to myself
          </a>
        )}
        <a
          href={SAFEGUARDING_POLICY_URL}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500"
        >
          Download policy
        </a>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 font-medium text-wiria-blue-dark transition-colors hover:text-wiria-yellow"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Submit Another Report
      </motion.button>
    </motion.div>
  );
}
