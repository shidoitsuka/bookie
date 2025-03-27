import { Skeleton } from '@mui/material';
import React from 'react';

interface Props {
  type: 'grid' | 'list';
}

const BookSkeleton: React.FC<Props> = ({ type }) => {
  return (
    <>
      {Array.from(Array(5).keys()).map((i) => (
        <Skeleton
          key={i}
          className={`${type === 'grid' ? 'min-h-[26rem]' : 'min-h-[8rem]'}`}
          sx={{ transform: 'scale(1)', borderRadius: '1.5rem' }}
        />
      ))}
    </>
  );
};

export default BookSkeleton;
