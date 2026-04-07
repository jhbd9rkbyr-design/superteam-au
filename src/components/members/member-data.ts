export interface Member {
  id: string;
  name: string;
  title: string;
  company: string;
  photo: string;
  skills: string[];
  filters: string[]; // filter categories this member belongs to
  twitter?: string;
}

/**
 * Member directory data.
 * `filters` maps to the sidebar filter categories.
 * `skills` maps to the visible pill tags on the card (Figma Badges & Tags system).
 */
export const members: Member[] = [
  {
    id: '1',
    name: 'Alex Chen',
    title: 'Founder',
    company: 'SolanaFlow',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    skills: ['Rust', 'Solana', 'DeFi'],
    filters: ['Core Team', 'Rust'],
    twitter: 'https://twitter.com/alexchen',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    title: 'Lead Designer',
    company: 'Phantom',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    skills: ['UI/UX', 'Branding', 'Figma'],
    filters: ['Design'],
    twitter: 'https://twitter.com/sarahwilliams',
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    title: 'Senior Engineer',
    company: 'Jupiter',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    skills: ['TypeScript', 'Smart Contracts', 'DeFi'],
    filters: ['Frontend', 'Rust'],
    twitter: 'https://twitter.com/marcusj',
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    title: 'Product Manager',
    company: 'Tensor',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
    skills: ['Product', 'Strategy', 'Analytics'],
    filters: ['Product'],
    twitter: 'https://twitter.com/emmarodriguez',
  },
  {
    id: '5',
    name: 'David Lee',
    title: 'Security Researcher',
    company: 'Helius',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    skills: ['Security', 'Auditing', 'Rust'],
    filters: ['Rust'],
    twitter: 'https://twitter.com/davidlee',
  },
  {
    id: '6',
    name: 'Jessica Park',
    title: 'Community Lead',
    company: 'Marinade',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    skills: ['Community', 'Events', 'Growth'],
    filters: ['Core Team', 'Community', 'Growth'],
    twitter: 'https://twitter.com/jessicapark',
  },
  {
    id: '7',
    name: 'Ryan Cooper',
    title: 'Founder',
    company: 'AussieDEX',
    photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face',
    skills: ['DeFi', 'Compliance', 'Tokenomics'],
    filters: ['Product'],
    twitter: 'https://twitter.com/ryancooper',
  },
  {
    id: '8',
    name: 'Nina Patel',
    title: 'Developer Advocate',
    company: 'Solana Foundation',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face',
    skills: ['DevRel', 'Rust', 'Education'],
    filters: ['Core Team', 'Rust', 'Content'],
    twitter: 'https://twitter.com/ninapatel',
  },
  {
    id: '9',
    name: 'Tom Barker',
    title: 'Frontend Lead',
    company: 'Orca',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
    skills: ['TypeScript', 'UI/UX', 'Solana'],
    filters: ['Frontend', 'Design'],
    twitter: 'https://twitter.com/tombarker',
  },
  {
    id: '10',
    name: 'Lily Nguyen',
    title: 'Content Strategist',
    company: 'Superteam AU',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
    skills: ['Growth', 'Education', 'Community'],
    filters: ['Core Team', 'Content', 'Growth'],
    twitter: 'https://twitter.com/lilynguyen',
  },
  {
    id: '11',
    name: 'Jake Morrison',
    title: 'Protocol Engineer',
    company: 'Drift',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop&crop=face',
    skills: ['Rust', 'Anchor', 'DeFi'],
    filters: ['Rust'],
    twitter: 'https://twitter.com/jakemorrison',
  },
  {
    id: '12',
    name: 'Aisha Khan',
    title: 'Growth Lead',
    company: 'Superteam AU',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&crop=face',
    skills: ['Growth', 'Events', 'Ops'],
    filters: ['Core Team', 'Growth', 'Community'],
    twitter: 'https://twitter.com/aishakhan',
  },
  {
    id: '13',
    name: 'Chris Dunlop',
    title: 'Smart Contract Dev',
    company: 'Marginfi',
    photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop&crop=face',
    skills: ['Rust', 'Smart Contracts', 'Security'],
    filters: ['Rust'],
    twitter: 'https://twitter.com/chrisdunlop',
  },
  {
    id: '14',
    name: 'Maya Bennett',
    title: 'Brand Designer',
    company: 'Backpack',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
    skills: ['Branding', 'Figma', 'UI/UX'],
    filters: ['Design'],
    twitter: 'https://twitter.com/mayabennett',
  },
  {
    id: '15',
    name: 'Liam O\'Brien',
    title: 'Head of Product',
    company: 'Pyth Network',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop&crop=face',
    skills: ['Product', 'Strategy', 'Tokenomics'],
    filters: ['Product'],
    twitter: 'https://twitter.com/liamobrien',
  },
  {
    id: '16',
    name: 'Priya Sharma',
    title: 'Full Stack Dev',
    company: 'Squads',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
    skills: ['TypeScript', 'Solana', 'Infrastructure'],
    filters: ['Frontend', 'Rust'],
    twitter: 'https://twitter.com/priyasharma',
  },
];

export const FILTER_CATEGORIES = [
  'Core Team',
  'Rust',
  'Frontend',
  'Design',
  'Content',
  'Growth',
  'Product',
  'Community',
] as const;

export type FilterCategory = (typeof FILTER_CATEGORIES)[number];
