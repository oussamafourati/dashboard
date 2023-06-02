import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ClientPhysique {
    idclient_p: number,
    raison_sociale: string,
    cin:  number,
    adresse:  string,
    tel: number,
    mail: string,
    avatar: string ,
    rib: number,
    etat: number,
    remarque: string,
    credit: number,
    piecejointes: string
}

export const clientPhysiqueSlice = createApi({
    reducerPath: 'clientPhysique',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/clientPyh/', 
    }),
    tagTypes: ['ClientPhysique'],
    endpoints(builder) {
        return{
            fetchClientPhysiques: builder.query<ClientPhysique[], number|void>({
                query() {
                    return `/clients`;
                },
                providesTags: ['ClientPhysique']
            }),
            addClientPhysique: builder.mutation<void, ClientPhysique> ({
                query(payload) {
                    return {
                        url: '/newClient',
                        method: 'POST',
                        body: payload
                    }
                },
                invalidatesTags: ['ClientPhysique']
            }),
            updateClientPhysique: builder.mutation<void, ClientPhysique> ({
                query: ({idclient_p, ...rest})=> ({
                    url:`/editClient/${idclient_p}`,
                    method: "PATCH",
                    body: rest
                }),
                invalidatesTags: ['ClientPhysique']
            }),
            deleteClientPhysique: builder.mutation<void, number> ({
                query: (idclient_p) => ({
                    url:`deleteClient/${idclient_p}`,
                    method: "DELETE"
                }),
                invalidatesTags: ['ClientPhysique']
            })
        }
    }
})

export const { useFetchClientPhysiquesQuery, useAddClientPhysiqueMutation, useUpdateClientPhysiqueMutation, useDeleteClientPhysiqueMutation } = clientPhysiqueSlice