import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTHURL } from "../../constants/appConstants";
import propTypes from '../propTypes/PropTypes';
export const authSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTHURL
  }),
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
        prepareHeaders: (headers) => {
          headers['Content-Type'] = 'application/json'
          headers['Cookie'] = 'session-id=xxxxxxx';

          
          return headers;
        },
      }),
      ...propTypes.authPropTypes,
      //transformResponse: (baseQueryReturnValue) => baseQueryReturnValue,
      transformResponse: async (response, meta) => {

        const token = meta.response.headers.get('session')

        const data = await response;       
        const tokens = token.split('; ');

        const sessionToken = tokens.find(token => token.startsWith('session_id='));       
        const sessionId = sessionToken.split('=')[1];
        localStorage.setItem("sessionId",sessionId)    
        localStorage.setItem("token",token) 
      
        return { data, token };


      }
      ,
      transformErrorResponse: (response) => response.data,
    }),
  }),
});
export const { useAuthMutation } = authSlice;
