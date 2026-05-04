import { FormEvent, useState } from 'react';
import { BriefcaseBusiness, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/reqres';
import { BottomActions } from '../components/BottomActions';
import { BrandLogo } from '../components/BrandLogo';
import { Button } from '../components/Button';
import { InputField, SelectField } from '../components/Field';
import { AccountType } from '../enums/account';
import { AppRoute } from '../enums/routes';
import { cn } from '../utils/cn';

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
  const [accountType, setAccountType] = useState<AccountType>(AccountType.Personal);
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
      window.setTimeout(() => navigate(AppRoute.Users), 700);
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'Unable to complete registration.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen grid-cols-[minmax(520px,44.4%)_minmax(520px,1fr)] bg-white max-[820px]:flex max-[820px]:justify-center max-[820px]:bg-[linear-gradient(rgba(255,255,255,0.86),rgba(255,255,255,0.92)),url('/images/register-marble.jpeg')] max-[820px]:bg-cover max-[820px]:bg-center">
      <section className="min-h-screen bg-[url('/images/register-marble.jpeg')] bg-cover bg-center max-[820px]:hidden" aria-hidden="true" />

      <section className="relative flex h-[min(825px,100vh)] min-h-[720px] w-[380px] flex-col self-center justify-self-center border-2 border-[#8a97a7] bg-white shadow-[0_20px_48px_rgba(46,40,56,0.1)] max-[820px]:h-auto max-[820px]:min-h-screen max-[820px]:w-[min(100%,430px)] max-[820px]:border-0 max-[820px]:shadow-none" aria-label="Registration">
        <form className="flex flex-1 flex-col items-center px-1 pb-[84px]" onSubmit={handleSubmit}>
          <div className="-mt-0.5">
            <BrandLogo size="lg" />
          </div>

          <div className="mt-[108px] grid w-[min(316px,calc(100%-48px))] grid-cols-2 rounded-full border-4 border-[#777976] bg-[#777976] p-1 max-[430px]:mt-[72px] max-[430px]:w-[calc(100%-42px)]" role="tablist" aria-label="Account type">
            <button
              type="button"
              className={cn('h-[38px] min-w-0 rounded-full border-0 bg-transparent text-white', accountType === AccountType.Personal && 'bg-white text-fcmb-purple')}
              onClick={() => setAccountType(AccountType.Personal)}
            >
              Personal
            </button>
            <button
              type="button"
              className={cn('h-[38px] min-w-0 rounded-full border-0 bg-transparent text-white', accountType === AccountType.Business && 'bg-white text-fcmb-purple')}
              onClick={() => setAccountType(AccountType.Business)}
            >
              Business
            </button>
          </div>

          <div className="mt-[55px] grid w-full gap-5 px-1 max-[430px]:mt-[42px] max-[430px]:px-0">
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

          {successMessage && <p className="mt-3 w-full rounded-[5px] bg-[#e9f7ef] p-3 text-sm leading-[1.4] text-[#155d35]">{successMessage}</p>}
          {errors.submit && <p className="mt-3 w-full rounded-[5px] bg-[#fdecef] p-3 text-sm leading-[1.4] text-[#8b1624]">{errors.submit}</p>}

          <Button className="mt-[54px] max-[430px]:mt-[42px]" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Proceed'}
          </Button>
        </form>

        <BottomActions />
      </section>
    </main>
  );
}
