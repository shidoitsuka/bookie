import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

import { RootState } from '@/lib/storeProvider';

export interface ApiRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string | undefined>;
  payload?: Record<string, any>;
  queryParams?: Record<string, any>;
  withKey?: boolean;
}

export interface SuccessApiResponse<T> {
  isSuccess: true;
  statusCode: number;
  status: string;
  data?: T;
  message: string;
  type: string;
}

export interface ErrorApiResponse {
  isSuccess: false;
  statusCode: number;
  status: string;
  data: {
    errors: string[];
  };
  message: string;
  type: string;
}

interface ErrorResponse {
  domain: string;
  message: string;
  reason: string;
}

export type ApiResponse<T> = SuccessApiResponse<T> | ErrorApiResponse;
export type AppThunkDispatch = ThunkDispatch<RootState, any, Action>;

export async function apiRequest<T>(options: ApiRequestOptions): Promise<ApiResponse<T>> {
  if (!navigator.onLine) {
    return {
      isSuccess: false,
      statusCode: 0,
      status: '',
      data: {
        errors: [],
      },
      message: '',
      type: 'test',
    };
  }

  const { method, url, payload, headers, withKey } = options;
  let { queryParams } = options;
  if (withKey)
    queryParams = {
      ...queryParams,
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    };

  let transformedQueryParams = queryParams;
  if (transformedQueryParams) {
    transformedQueryParams = Object.keys(transformedQueryParams).reduce((acc, v) => {
      if (transformedQueryParams?.[v] !== '') acc[v] = transformedQueryParams?.[v];
      return acc;
    }, {} as Record<string, string>);
  }

  const apiUrl = 'https://www.googleapis.com';
  const actualUrl = apiUrl + url;

  try {
    const config: AxiosRequestConfig = {
      method,
      url: actualUrl,
      headers,
      params: transformedQueryParams,
      data: payload,
      timeout: 30000,
    };

    const response = await axios(config);
    const { data, status: statusCode } = response;
    const { status, message } = data || ({} as any);

    if (statusCode === 500) {
      return {
        isSuccess: false,
        message: '',
        status: '',
        data: {
          errors: ['Server error'],
        },
        statusCode,
        type: 'test',
      };
    } else {
      const responseData = statusCode === 204 ? undefined : data;
      return {
        isSuccess: (statusCode >= 200 && statusCode < 300) as any,
        data: responseData,
        statusCode,
        status,
        message,
        type: 'test',
      };
    }
  } catch (e: unknown) {
    let message: string | string[] = 'There is an error occurred.';
    if (axios.isAxiosError(e)) {
      message = 'Request timed out, please try again.';
      const mappedErr = (e.response?.data.error.errors as ErrorResponse[]).map(
        (err) => err.message
      );
      message = mappedErr;
    }

    return {
      isSuccess: false,
      statusCode: 0,
      status: '',
      data: {
        errors: Array.isArray(message) ? message : [message],
      },
      message: '',
      type: 'test',
    };
  }
}

export function useApiQuery<T>(
  options: ApiRequestOptions,
  queryKey: any[],
  disabled?: boolean
): UseQueryResult<T, ErrorApiResponse> {
  return useQuery<T, ErrorApiResponse>({
    enabled: disabled,
    queryKey,
    queryFn: async () => {
      const result = await apiRequest<T>(options);
      if (result.isSuccess) {
        return result.data as T;
      } else {
        throw result;
      }
    },
    retry: false,
  });
}
