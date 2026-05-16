'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';

const ArticleBackButton = ({
  backgroundColor,
  textColor,
}: {
  backgroundColor: string;
  textColor: string;
}) => {
  const router = useRouter();

  return (
    <button
      className="absolute top-4 left-4 z-[3] flex cursor-pointer items-center gap-x-2 p-4 text-base font-bold transition-opacity hover:opacity-80 md:top-6 md:left-6"
      style={{ backgroundColor, color: textColor }}
      onClick={() => router.push('/artikler')}
    >
      <FaArrowLeftLong /> <p className="hidden md:block">Artikler</p>
    </button>
  );
};

export default ArticleBackButton;
