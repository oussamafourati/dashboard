import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ClientMorale {
    idclient_m: number,
    raison_sociale: string,
    mat:  number,
    adresse:  string,
    tel: number,
    mail: string,
    logo: string ,
    rib: number,
    etat: number,
    remarque: string,
    credit: number,
    piecejointes: string
}

export const clientMoraleSlice = createApi({
    reducerPath: 'clientMorale',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/clientMo/', 
    }),
    tagTypes: ['ClientMorale'],
    endpoints(builder) {
        return{
            fetchClientMorales: builder.query<ClientMorale[], number|void>({
                query() {
                    return `/moraleclients`;
                },
                providesTags: ['ClientMorale']
            }),
            addClientMorale: builder.mutation<void, ClientMorale> ({
                query(payload) {
                    return {
                        url: '/newClientMo',
                        method: 'POST',
                        body: payload
                    }
                },
                invalidatesTags: ['ClientMorale']
            }),
            updateClientMorale: builder.mutation<void, ClientMorale> ({
                query: ({idclient_m, ...rest})=> ({
                    url:`/editClientMorale/${idclient_m}`,
                    method: "PATCH",
                    body: rest
                }),
                invalidatesTags: ['ClientMorale']
            }),
            deleteClientMorale: builder.mutation<void, number> ({
                query: (idclient_m) => ({
                    url:`deleteClientMorale/${idclient_m}`,
                    method: "DELETE"
                }),
                invalidatesTags: ['ClientMorale']
            })
        }
    }
})

export const { useAddClientMoraleMutation, useFetchClientMoralesQuery, useDeleteClientMoraleMutation, useUpdateClientMoraleMutation } = clientMoraleSlice