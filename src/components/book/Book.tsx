/* eslint-disable @next/next/no-img-element */
import { IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useMemo, useRef, useState } from 'react';
import { IoMdMenu, IoMdStar, IoMdStarOutline } from 'react-icons/io';

import { getRandomColor, hexOpacity } from '@/lib/helper';

import BookModal from '@/components/bookModal/BookModal';

import { colors } from '@/config/colors';

import useStyle from './Book.styles';

import { BookVolume } from '@/types/books';

import Bookie from '~/images/bookie.svg';

interface Props {
  book: BookVolume;
  viewType: 'grid' | 'list';
  starBook: (book: BookVolume) => void;
}

const Book: React.FC<Props> = React.memo(({ book, viewType, starBook }) => {
  const { id: bookId, volumeInfo, starred } = book;
  const { classes } = useStyle();
  const imgRef = useRef<HTMLImageElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const backgroundColor = useMemo(() => hexOpacity(getRandomColor(), 0.3), []);

  let content = null;

  if (viewType === 'list') {
    content = (
      <>
        {volumeInfo.imageLinks ? (
          volumeInfo.imageLinks.smallThumbnail && (
            <div className="flex h-full w-1/4 items-center justify-center">
              <motion.img
                ref={imgRef}
                animate={{ opacity: [0, 1] }}
                layout="position"
                layoutId={`image-${bookId}`}
                className="h-24 w-full rounded-lg object-cover"
                src={volumeInfo.imageLinks.smallThumbnail}
                alt=""
              />
            </div>
          )
        ) : (
          <div
            className="mx-auto flex h-24 w-32 items-center justify-center rounded-lg text-2xl"
            style={{ background: backgroundColor }}
          >
            <Bookie />
          </div>
        )}
        <div className="w-3/4">
          <motion.h6
            layout="position"
            layoutId={`title-${bookId}`}
            className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold"
          >
            {volumeInfo.title}
          </motion.h6>
          {volumeInfo.publishedDate && (
            <Typography variant="caption">{volumeInfo.publishedDate.slice(0, 4)} • </Typography>
          )}
          <Typography variant="caption">
            {volumeInfo.authors
              ? volumeInfo.authors.length > 2
                ? volumeInfo.authors.slice(0, 2).join(', ')
                : volumeInfo.authors[0].length > 26
                ? volumeInfo.authors[0].slice(0, 23) + '...'
                : volumeInfo.authors[0]
              : ''}
          </Typography>
          <Typography fontSize={14}>
            {volumeInfo.description
              ? volumeInfo.description.length > 80
                ? volumeInfo.description.slice(0, 79) + '...'
                : volumeInfo.description
              : ''}
          </Typography>
        </div>
      </>
    );
  } else {
    content = (
      <>
        {volumeInfo.imageLinks ? (
          volumeInfo.imageLinks.thumbnail && (
            <div className="h-44 w-auto">
              <motion.img
                ref={imgRef}
                layout="position"
                layoutId={`image-${bookId}`}
                animate={{ opacity: [0, 1] }}
                className="mx-auto h-full w-auto object-cover"
                src={volumeInfo.imageLinks.thumbnail}
                alt=""
              />
            </div>
          )
        ) : (
          <div
            className="mx-auto flex h-44 w-32 items-center justify-center rounded-lg text-5xl"
            style={{ background: backgroundColor }}
          >
            <Bookie />
          </div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <motion.h6 layout="position" layoutId={`title-${bookId}`} className="font-semibold">
            {volumeInfo.title && volumeInfo.title.length > 36
              ? volumeInfo.title.slice(0, 33) + '...'
              : volumeInfo.title}
          </motion.h6>
          <IconButton disableRipple>
            {starred ? (
              <IoMdStar
                onClick={(event) => {
                  event.stopPropagation();
                  starBook(book);
                }}
                style={{ color: colors.secondary.main }}
              />
            ) : (
              <IoMdStarOutline
                onClick={(event) => {
                  event.stopPropagation();
                  starBook(book);
                }}
                style={{ color: colors.secondary.main }}
              />
            )}
          </IconButton>
        </div>
        {volumeInfo.publishedDate && (
          <Typography variant="caption">{volumeInfo.publishedDate.slice(0, 4)} • </Typography>
        )}
        <Typography variant="caption">
          {volumeInfo.authors
            ? volumeInfo.authors.length > 2
              ? volumeInfo.authors.slice(0, 1).join(', ')
              : volumeInfo.authors[0].length > 26
              ? volumeInfo.authors[0].slice(0, 23) + '...'
              : volumeInfo.authors[0]
            : ''}
        </Typography>
        <Typography marginTop={1} fontSize={14}>
          {volumeInfo.description
            ? volumeInfo.description.length > 120
              ? volumeInfo.description.slice(0, 117) + '...'
              : volumeInfo.description
            : ''}
        </Typography>
      </>
    );
  }

  return (
    <>
      <motion.div
        layout="size"
        className="relative cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => viewType === 'grid' && openModal()}
      >
        <motion.div
          className={`${
            viewType === 'grid'
              ? `${classes.cardContainer} p-8`
              : `${classes.listContainer} relative p-6`
          } z-[2] rounded-3xl duration-300 hover:shadow-xl`}
          animate={{ ...(viewType === 'list' && { width: isHovered ? '87%' : '100%' }) }}
          initial={{ width: '100%' }}
        >
          {content}
        </motion.div>
        {viewType === 'list' && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${classes.listDetailContainer} absolute right-0 top-0 z-[1] flex h-full w-24 flex-col items-end justify-evenly rounded-r-3xl pr-1`}
          >
            <IconButton>
              {starred ? (
                <IoMdStar onClick={() => starBook(book)} className="text-white" />
              ) : (
                <IoMdStarOutline onClick={() => starBook(book)} className="text-white" />
              )}
            </IconButton>
            <IconButton>
              <IoMdMenu onClick={openModal} className="text-white" />
            </IconButton>
          </motion.div>
        )}
      </motion.div>
      <BookModal isOpen={isOpen} detail={volumeInfo} onClose={closeModal} id={bookId} />
    </>
  );
});

export default Book;
