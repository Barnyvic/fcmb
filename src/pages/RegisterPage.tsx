import { FormEvent, useState } from 'react';
import { BriefcaseBusiness, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/reqres';
import { BottomActions } from '../components/BottomActions';
import { BrandLogo } from '../components/BrandLogo';
import { Button } from '../components/Button';
import { InputField, SelectField } from '../components/Field';

type FormErrors = {
  name?: string;
  job?: string;
  submit?: string;
};

const jobOptions = [
  { label: 'Leader', value: 'leader' },
  { label: 'Product Designer', value: 'product designer' },
  { label: 'Frontend Engineer', value: 'frontend engineer' },
  { label: 'Business Analyst', value: 'business analyst' },
];

export function RegisterPage() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage('');

    const nextErrors: FormErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = 'Enter your full name.';
    }

    if (!job) {
      nextErrors.job = 'Select a job.';
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await createUser({ name: name.trim(), job });
      setSuccessMessage(`Created ${response.name} as ${response.job}. ID: ${response.id}`);
      window.setTimeout(() => navigate('/users'), 700);
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Unable to complete registration.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="registration-page">
      <section className="registration-page__art" aria-hidden="true" />

      <section className="phone-shell" aria-label="Registration">
        <form className="registration-form" onSubmit={handleSubmit}>
          <BrandLogo size="lg" />

          <div className="segmented-control" role="tablist" aria-label="Account type">
            <button
              type="button"
              className={accountType === 'personal' ? 'is-active' : ''}
              onClick={() => setAccountType('personal')}
            >
              Personal
            </button>
            <button
              type="button"
              className={accountType === 'business' ? 'is-active' : ''}
              onClick={() => setAccountType('business')}
            >
              Business
            </button>
          </div>

          <div className="registration-form__fields">
            <InputField
              icon={<UserRound size={20} strokeWidth={1.7} />}
              label="Full Name"
              value={name}
              error={errors.name}
              autoComplete="name"
              onChange={(event) => setName(event.target.value)}
            />
            <SelectField
              icon={<BriefcaseBusiness size={20} strokeWidth={1.7} />}
              label="Job"
              value={job}
              error={errors.job}
              options={jobOptions}
              onChange={(event) => setJob(event.target.value)}
            />
          </div>

          {successMessage && <p className="form-alert form-alert--success">{successMessage}</p>}
          {errors.submit && <p className="form-alert form-alert--error">{errors.submit}</p>}

          <Button fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Proceed'}
          </Button>
        </form>

        <BottomActions />
      </section>
    </main>
  );
}
