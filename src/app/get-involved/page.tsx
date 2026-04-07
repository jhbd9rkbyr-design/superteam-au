import { OnboardingForm } from '@/components/onboarding/OnboardingForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Involved | Superteam Australia',
  description:
    'Join Australia\'s most active Solana community. Tell us about yourself and start building.',
};

export default function GetInvolvedPage() {
  return <OnboardingForm />;
}
