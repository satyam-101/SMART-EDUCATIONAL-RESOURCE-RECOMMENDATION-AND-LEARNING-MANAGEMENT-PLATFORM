import type { SVGProps } from 'react';

function createIcon(path: string, extra?: string) {
  return function Icon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {extra ? <path d={extra} /> : null}
        <path d={path} />
      </svg>
    );
  };
}

export const HomeIcon = createIcon('M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z');
export const CompassIcon = createIcon('M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.9 6.1-2.1 6.2-6.2 2.1 2.1-6.2 6.2-2.1z');
export const CoursesIcon = createIcon('M4 6.5A2.5 2.5 0 0 1 6.5 4H20v15H6.5A2.5 2.5 0 0 0 4 21.5zm0 0V18');
export const TutorIcon = createIcon('M12 3a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1V8a5 5 0 0 1 5-5zm0 7h.01');
export const PlannerIcon = createIcon('M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1z');
export const QuizIcon = createIcon('M8 6h8M8 10h8M8 14h5M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z');
export const ProgressIcon = createIcon('M4 19h16M7 16V8m5 8V5m5 11v-7');
export const PracticeIcon = createIcon('M5 12h14M12 5v14M5 5h14v14H5z');
export const ProjectsIcon = createIcon('M4 7.5A2.5 2.5 0 0 1 6.5 5H17.5A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19H6.5A2.5 2.5 0 0 1 4 16.5zM8 9h8M8 13h8');
export const CommunityIcon = createIcon('M16 19a4 4 0 0 0-8 0M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 7a4 4 0 0 0-2.7-3.7M20 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z');
export const ProfileIcon = createIcon('M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z');
export const SettingsIcon = createIcon('M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 7a5 5 0 1 1-5 5 5 5 0 0 1 5-5z');
export const MenuIcon = createIcon('M4 7h16M4 12h16M4 17h16');
export const LogOutIcon = createIcon('M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9');
export const CalendarIcon = createIcon('M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1z');
export const ChartIcon = createIcon('M4 19V5M8 19V9M12 19V7M16 19v-4M20 19V3');
export const ChevronRightIcon = createIcon('M9 18l6-6-6-6');
export const FolderIcon = createIcon('M3 7.5A2.5 2.5 0 0 1 5.5 5h3l2 2h8A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z');
export const PlayIcon = createIcon('M8 5v14l11-7z');
export const PlusIcon = createIcon('M12 5v14M5 12h14');
export const TargetIcon = createIcon('M12 3a9 9 0 1 0 9 9M12 7v5l3 3');
export const TrophyIcon = createIcon('M8 4h8v2a4 4 0 0 1-8 0zm-3 2h2a5 5 0 0 0 5 5 5 0 0 0 5-5h2v11H5zm0 0v1m14-1v1');
export const SearchIcon = createIcon('M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm9 2-4.3-4.3');
export const StarIcon = createIcon('M12 2l2.7 5.5 6 .9-4.4 4.3 1.1 6.1L12 0 6.6 18.8l1.1-6.1L3.3 8.4l6-.9L12 2z');
export const ClockIcon = createIcon('M12 7v5l3 2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9z');
export const UsersIcon = createIcon('M16 19a4 4 0 0 0-8 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 7a4 4 0 0 0-3-3.87M20 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z');
export const BookmarkIcon = createIcon('M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z');
export const ChevronDownIcon = createIcon('M6 9l6 6 6-6');
export const CheckIcon = createIcon('M5 12l5 5L20 2');
export const SentIcon = createIcon('M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z');
export const ChevronLeftIcon = createIcon('M15 18l-6-6 6-6');
export const SparklesIcon = createIcon('M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z');
export const BoltIcon = createIcon('M13 2L4 13h6l-1 9 9-11h-6l1-9z');
export const RocketIcon = createIcon('M14 3c3 1 5 3 6 6-3 1-5 3-6 6-3-1-5-3-6-6 1-3 3-5 6-6zm-2 8l-4 4m4-4h4m-4 0v4');
export const BookIcon = createIcon('M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v17H6.5A2.5 2.5 0 0 1 4 16.5v-12A2.5 2.5 0 0 1 6.5 2z');
export const BookOpenIcon = BookIcon;
export const RefreshCwIcon = createIcon('M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15');

export * from './PrimitiveIcons';
