import { IconButton, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { IoMdSearch } from 'react-icons/io';

import { getRandom } from '@/lib/helper';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { searchPlaceholder } from '@/constant/placeholder';
import { quotes } from '@/constant/quotes';
import useStyle from '@/styles/index.styles';

import Bookie from '~/images/bookie.svg';

const HomePage: React.FC = () => {
  const { classes } = useStyle();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { searchQuery: '' },
  });

  const randomQuotes = React.useMemo(() => getRandom(quotes), []);
  const randomPlaceholder = React.useMemo(() => getRandom(searchPlaceholder), []);

  const searchQuery = watch('searchQuery');

  const handleSearch = ({ searchQuery }: { searchQuery: string }) => {
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <Layout>
      <Seo title="Bookie - Search for books!" />
      <div className="layout flex flex-1 items-center justify-center">
        <div className="pb-14 text-center md:px-96">
          <Bookie className="mx-auto h-auto w-96" />
          <form onSubmit={handleSubmit(handleSearch)} className="w-full">
            <TextField
              {...register('searchQuery', { required: 'Search query is required' })}
              error={!!errors.searchQuery}
              helperText={errors.searchQuery?.message}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      disableRipple
                      size="small"
                      type="submit"
                      disabled={!searchQuery.trim()}
                    >
                      <IoMdSearch className={classes.searchIcon} />
                    </IconButton>
                  ),
                  classes: {
                    adornedEnd: `${classes.inputAdornment} ${
                      !searchQuery.trim() ? 'disabled' : ''
                    }`,
                  },
                },
              }}
              placeholder={randomPlaceholder}
              variant="outlined"
              size="small"
            />
          </form>
          <div className="bg-glass mt-8 p-4 text-gray-500">
            <Typography fontSize={14} fontStyle="italic">
              "{randomQuotes.quote}"
            </Typography>
            <Typography variant="caption">-{randomQuotes.author}</Typography>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
