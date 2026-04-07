import { MemberDirectory } from '@/components/members/MemberDirectory';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Member Directory | Superteam Australia',
  description:
    'Browse the builders, designers, founders and operators driving Solana in Australia.',
};

export default function MembersPage() {
  return <MemberDirectory />;
}
