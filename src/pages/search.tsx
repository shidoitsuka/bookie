import { Button, ButtonGroup, IconButton, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import {
  IoMdCalendar,
  IoMdCheckmark,
  IoMdClose,
  IoMdGrid,
  IoMdList,
  IoMdSearch,
} from 'react-icons/io';

import { ApiRequestOptions, useApiQuery } from '@/lib/apiThunks';
import { getFromLocalStorage, getRandom, setLocalStorage } from '@/lib/helper';
import { useAppDispatch } from '@/lib/hooks';

import Book from '@/components/book/Book';
import BookSkeleton from '@/components/book/BookSkeleton';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { colors } from '@/config/colors';
import { searchPlaceholder } from '@/constant/placeholder';
import { showErrorAlert } from '@/reducers/ui/ui.reducer';
import useStyle from '@/styles/index.styles';

import { BooksResponse, BookVolume } from '@/types/books';

interface CalendarProps {
  value?: string;
  onClick?: () => void;
  clearFilter: () => void;
}

type CalendarRef = HTMLButtonElement;

const CalendarComponent = forwardRef<CalendarRef, CalendarProps>(
  ({ value, onClick, clearFilter }, ref) => (
    <ButtonGroup>
      <Button
        variant="outlined"
        onClick={onClick}
        ref={ref}
        sx={{ borderRadius: '5rem', padding: '6px 32px', textTransform: 'unset' }}
      >
        <IoMdCalendar className="mr-2 text-lg" /> {value ? value : 'Year'}
      </Button>
      <Button
        disabled={value === ''}
        onClick={clearFilter}
        variant={value === '' ? 'outlined' : 'contained'}
        sx={{ borderRadius: '5rem' }}
      >
        <IoMdClose />
      </Button>
    </ButtonGroup>
  )
);

interface QueryParams {
  q: string;
  startIndex: number;
  maxResults: number;
  publishedDate: Date | undefined;
}

const maxResults = 12;

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { classes } = useStyle();
  const randomPlaceholder = getRandom(searchPlaceholder);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [viewType, setViewType] = useState<'grid' | 'list'>('list');
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { searchQuery: searchParams.get('q') || '' },
  });
  const [queryParams, setQueryParams] = useState<QueryParams>({
    q: searchParams.get('q') || '',
    startIndex: (page - 1) * maxResults,
    maxResults,
    publishedDate: undefined,
  });
  const dispatch = useAppDispatch();
  const [processedBooks, setProcessedBooks] = useState<BookVolume[] | null>(null);
  const [starredBooks, setStarredBooks] = useState<BookVolume[]>([]);

  const query = searchParams.get('q');
  const apiOptions: ApiRequestOptions = {
    method: 'GET',
    url: '/books/v1/volumes',
    queryParams: {
      ...queryParams,
      ...(queryParams.publishedDate && {
        publishedDate: queryParams.publishedDate.getFullYear().toString(),
      }),
    },
    withKey: true,
  };
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useApiQuery<BooksResponse>(
    apiOptions,
    ['books', queryParams.q, page, queryParams.publishedDate],
    !!queryParams.q
  );

  const toggleSavedOnly = () => {
    const starredBooks = getFromLocalStorage('starredBook');
    const parsedStarredBooks: BookVolume[] = starredBooks ? JSON.parse(starredBooks) : [];
    setLocalStorage('starredBook', JSON.stringify(parsedStarredBooks));

    setStarredBooks(parsedStarredBooks);
    setShowSavedOnly(!showSavedOnly);
  };

  const changeView = (type: 'grid' | 'list') => setViewType(type);

  const changePage = (newPage: number) => {
    setQueryParams((prev) => ({
      ...prev,
      startIndex: (newPage - 1) * maxResults,
    }));
    setPage(newPage);
  };

  const handleYearChange = (date: Date | null) => {
    setPage(1);
    setQueryParams((prev) => ({ ...prev, publishedDate: date || undefined }));
  };

  const handleSearch = ({ searchQuery }: { searchQuery: string }) => {
    if (showSavedOnly) {
      const filteredBooks = starredBooks.filter((book) =>
        book.volumeInfo.title.includes(searchQuery)
      );
      setStarredBooks(filteredBooks);
    } else {
      setPage(1);
      setQueryParams((prev) => ({
        ...prev,
        q: searchQuery,
        startIndex: 0,
      }));
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const clearDate = () => {
    setPage(1);
    setQueryParams((prev) => ({ ...prev, publishedDate: undefined }));
  };

  const saveItem = (book: BookVolume) => {
    const starredBooks = getFromLocalStorage('starredBook');
    const parsedStarredBooks: BookVolume[] = starredBooks ? JSON.parse(starredBooks) : [];
    setLocalStorage('starredBook', JSON.stringify(parsedStarredBooks));

    const bookIndex = parsedStarredBooks.findIndex((parsedBook) => parsedBook.id === book.id);

    if (bookIndex === -1) {
      const starredData = { ...book, starred: true };
      parsedStarredBooks.push(starredData);
    } else {
      console.log(book);

      parsedStarredBooks.splice(bookIndex, 1);
    }
    setLocalStorage('starredBook', JSON.stringify(parsedStarredBooks));
    setStarredBooks(parsedStarredBooks);
    setProcessedBooks(
      (prevBooks) =>
        prevBooks?.map((b) => (b.id === book.id ? { ...b, starred: !b.starred } : b)) || null
    );
  };

  useEffect(() => {
    if (books) {
      if (books?.items?.length) {
        const starredBooks = getFromLocalStorage('starredBook');
        const parsedStarredBooks: BookVolume[] = starredBooks ? JSON.parse(starredBooks) : [];
        setLocalStorage('starredBook', JSON.stringify(parsedStarredBooks));
        const modifiedBooks = books?.items?.map((book) => ({
          ...book,
          starred: parsedStarredBooks.some((starredBook) => starredBook.id === book.id),
        }));
        setProcessedBooks(modifiedBooks);
      } else {
        setProcessedBooks([]);
      }
    }
  }, [books]);

  useEffect(() => {
    if (isError) {
      dispatch(showErrorAlert(error?.data?.errors || 'An error occurred'));
    }
  }, [isError, dispatch, error]);

  useEffect(() => {
    if (query === null) return;
    if (!query && searchParams.toString()) {
      router.replace('/');
      setQueryParams((prev) => ({ ...prev, q: '' }));
      setValue('searchQuery', ''); // Reset searchQuery in form
    } else if (query) {
      setQueryParams((prev) => ({
        ...prev,
        q: query,
        startIndex: 0,
      }));
      setValue('searchQuery', query); // Set searchQuery in form
      setPage(1);
    }
  }, [query, router, searchParams, setValue]);

  if (isError) {
    return <>Error.</>;
  }

  const booksToShow = showSavedOnly ? starredBooks : processedBooks;

  return (
    <>
      <Seo title={`Bookie - ${queryParams.q}`} />
      <Layout>
        <div className="layout py-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <form onSubmit={handleSubmit(handleSearch)} className="w-full">
                <TextField
                  {...register('searchQuery', { required: 'Please provide book name!' })}
                  error={!!errors.searchQuery}
                  helperText={errors.searchQuery?.message}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <IconButton
                          disableRipple
                          size="small"
                          type="submit"
                          style={{ cursor: 'pointer' }}
                        >
                          <IoMdSearch className={classes.searchIcon} />
                        </IconButton>
                      ),
                      classes: {
                        adornedEnd: classes.inputAdornment,
                      },
                    },
                  }}
                  fullWidth
                  placeholder={randomPlaceholder}
                />
              </form>
            </div>
            <div className="col-span-4 flex items-center justify-between self-center">
              <div></div>
              <div className="flex items-center">
                <ButtonGroup
                  sx={{
                    borderRadius: '5rem',
                    border: `2px solid ${colors.border.main}`,
                  }}
                >
                  <IconButton
                    onClick={() => changeView('grid')}
                    className={`${classes.viewBtn} ${
                      viewType === 'grid' ? classes.activeView : ''
                    }`}
                    sx={{ borderRadius: '5rem' }}
                  >
                    <IoMdGrid />
                  </IconButton>
                  <IconButton
                    onClick={() => changeView('list')}
                    className={`${classes.viewBtn} ${
                      viewType === 'list' ? classes.activeView : ''
                    }`}
                    sx={{ borderRadius: '5rem' }}
                  >
                    <IoMdList />
                  </IconButton>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="sticky top-0 z-[3] grid grid-cols-12 py-6">
            <div className="col-span-12">
              <div className="grid grid-cols-12 items-center justify-between gap-6">
                <div className="col-span-12 flex justify-center gap-4 md:col-span-9 md:justify-start">
                  <ButtonGroup onClick={toggleSavedOnly}>
                    <Button
                      variant={showSavedOnly ? 'contained' : 'outlined'}
                      sx={{ borderRadius: '5rem' }}
                      disabled={!showSavedOnly}
                    >
                      {showSavedOnly ? <IoMdCheckmark /> : <IoMdClose />}
                    </Button>
                    <Button
                      sx={{
                        borderRadius: '5rem',
                        padding: '6px 24px 6px 16px',
                        textTransform: 'unset',
                      }}
                      variant="outlined"
                    >
                      Saved Book
                    </Button>
                  </ButtonGroup>
                  <div className="z-10 flex">
                    <DatePicker
                      showYearPicker
                      selected={queryParams.publishedDate}
                      onChange={(date) => handleYearChange(date)}
                      customInput={
                        <CalendarComponent
                          value={queryParams.publishedDate?.getFullYear().toString()}
                          clearFilter={clearDate}
                        />
                      }
                      dateFormat="yyyy"
                      yearItemNumber={9}
                    />
                  </div>
                </div>
                <div className="col-span-12 ml-auto md:col-span-3">
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      disabled={page === 1}
                      onClick={() => changePage(page - 1)}
                      sx={{ borderRadius: '5rem' }}
                    >
                      Prev
                    </Button>
                    <Button
                      variant="contained"
                      className="mx-4 border"
                      sx={{ background: 'white', color: 'black' }}
                    >
                      {page}
                    </Button>
                    <Button
                      variant="contained"
                      disabled={
                        !books?.totalItems ||
                        queryParams.startIndex + maxResults >= books.totalItems
                      }
                      onClick={() => changePage(page + 1)}
                      sx={{ borderRadius: '5rem' }}
                    >
                      Next
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            layout
            transition={{ layout: { duration: 0.2 } }}
            className={`grid gap-6 ${
              viewType === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2'
            }`}
          >
            {isLoading ? (
              <BookSkeleton type={viewType} />
            ) : (
              booksToShow?.map((book) => (
                <Book key={book.id} book={book} viewType={viewType} starBook={saveItem} />
              ))
            )}
            {!isLoading && booksToShow?.length === 0 && queryParams.q && (
              <div className="col-span-full py-10 text-center">
                <p className="text-lg text-gray-600">
                  {showSavedOnly
                    ? 'You have no saved books.'
                    : `No books found for "${queryParams.q}"`}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </Layout>
    </>
  );
};

export default SearchPage;
