import { apiRequest, AppThunkDispatch } from '@/lib/apiThunks';

import { BooksResponse } from '@/types/books';

// un used

export function getBook(queryParams: { q: string }) {
  return async (dispatch: AppThunkDispatch) =>
    dispatch(
      await apiRequest<BooksResponse>({
        method: 'GET',
        url: '/books/v1/volumes',
        queryParams,
      })
    );
}
