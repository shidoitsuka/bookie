import { Divider, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';

import { getRandomColor, hexOpacity } from '@/lib/helper';

import useStyle from './BookModal.styles';

import { VolumeInfo } from '@/types/books';

import Bookie from '~/images/bookie.svg';

interface BookModalProps {
  isOpen: boolean;
  detail: VolumeInfo;
  onClose: () => void;
  id: string;
}

const BookModal: React.FC<BookModalProps> = ({ isOpen, detail, onClose, id }) => {
  const { classes } = useStyle();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-testid="book_modal"
            className="fixed left-0 top-0 z-40 h-screen w-screen bg-black"
          ></motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-[10%] z-50 flex h-[80vh] w-screen items-center justify-center md:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-lg bg-white p-8">
              <div>
                <IoMdClose
                  data-testid="book_modal_close-btn"
                  onClick={onClose}
                  className="mb-4 ml-auto cursor-pointer text-xl"
                />
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                <div className="col-span-12 md:col-span-4">
                  {detail.imageLinks ? (
                    detail.imageLinks.thumbnail && (
                      <motion.img
                        layoutId={`image-${id}`}
                        className="mx-auto"
                        src={detail.imageLinks.thumbnail}
                      />
                    )
                  ) : (
                    <div
                      className="mx-auto flex h-44 w-32 items-center justify-center rounded-lg text-5xl"
                      style={{ background: hexOpacity(getRandomColor(), 0.3) }}
                    >
                      <Bookie />
                    </div>
                  )}
                  <motion.h6
                    layoutId={`title-${id}`}
                    className="my-4 font-semibold"
                    data-testid="book_modal_title"
                  >
                    {detail.title}
                  </motion.h6>
                  <Divider />
                  <div className="mt-2 grid grid-cols-12">
                    {/* alternate title */}
                    <div className="col-span-4 mt-2 self-center">
                      <Typography fontSize={14} fontWeight={600}>
                        Subtitle
                      </Typography>
                    </div>
                    <div className="col-span-8 mt-2 flex flex-wrap gap-1 self-center">
                      <Typography fontSize={14}>{detail.subtitle}</Typography>
                    </div>

                    {/* author */}
                    <div
                      className={`col-span-4 mt-4 ${
                        detail.authors
                          ? detail.authors.length > 1
                            ? 'self-start'
                            : 'self-center'
                          : 'self-center'
                      }`}
                    >
                      <Typography fontSize={14} fontWeight={600}>
                        Author
                      </Typography>
                    </div>
                    <div className="col-span-8 mt-4 self-center">
                      <Typography fontSize={14}>
                        {detail.authors
                          ? detail.authors.map((author, index) => (
                              <React.Fragment key={index}>
                                • {author}
                                <br />
                              </React.Fragment>
                            ))
                          : 'Anonymous Author(s)'}
                      </Typography>
                    </div>

                    {/* publisher */}
                    <div className="col-span-4 mt-2 self-center">
                      <Typography fontSize={14} fontWeight={600}>
                        Publisher
                      </Typography>
                    </div>
                    <div className="col-span-8 mt-2 flex flex-wrap gap-1 self-center">
                      <Typography fontSize={14}>{detail.publisher}</Typography>
                    </div>

                    {/* published date */}
                    <div className="col-span-4 mt-2 self-center">
                      <Typography fontSize={14} fontWeight={600}>
                        Published Date
                      </Typography>
                    </div>
                    <div className="col-span-8 mt-2 flex flex-wrap gap-1 self-center">
                      <Typography fontSize={14}>{detail.publishedDate}</Typography>
                    </div>

                    {/* maturity */}
                    <div className="col-span-4 mt-2 self-center">
                      <Typography fontSize={14} fontWeight={600}>
                        Rating
                      </Typography>
                    </div>
                    <div className="col-span-8 mt-2 flex flex-wrap gap-1 self-center">
                      <Typography fontSize={14}>{detail.maturityRating}</Typography>
                    </div>

                    {/* category */}
                    <div className="col-span-4 mt-2 self-center">
                      <Typography fontSize={14} fontWeight={600}>
                        Category
                      </Typography>
                    </div>
                    <div className="col-span-8 mt-2 flex flex-wrap gap-1 self-center">
                      {detail.categories ? (
                        detail.categories.map((category, index) => {
                          const randomColor = getRandomColor();
                          return (
                            <div
                              key={index}
                              className={`${classes.categoryContainer} h-min rounded-full px-4 py-1 font-semibold hover:bg-[${randomColor}] cursor-pointer opacity-70`}
                              style={{ background: hexOpacity(randomColor, 0.25, true) }}
                            >
                              {category}
                            </div>
                          );
                        })
                      ) : (
                        <div
                          className={`${classes.uncategorized} inline rounded-full border px-4 py-1 font-semibold`}
                        >
                          Uncategorized
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="col-span-12 h-44 place-self-center overflow-y-scroll md:col-span-8">
                  {detail.description ? detail.description : 'No Description Provided'}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookModal;
