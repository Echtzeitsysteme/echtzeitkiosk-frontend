// import simpleRestProvider from 'ra-data-simple-rest';

import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

import { API_URL } from '../utils/API_URL';
const httpClient = (url: string, options?: fetchUtils.Options | undefined) => {
    if (!options) {
        options = {};
    }

    options.user = {
        authenticated: true,
        // use the token from local storage
        token: localStorage.getItem('token') || '',
    };
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
    getList: (
        resource: any,
        params: {
            pagination: { page: any; perPage: any };
            sort: { field: any; order: any };
            filter: any;
        }
    ) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        // const url = `${API_URL}/${resource}?${stringify(query)}`;

        const url = `${API_URL}/${resource}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.data,
            total: 10,
            // total: parseInt(
            //     headers.get('content-range')?.split('/').pop() || '0',
            //     10
            // ),
        }));
    },

    getOne: (resource: any, params: { id: any }) =>
        httpClient(`${API_URL}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource: any, params: { ids: any }) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${API_URL}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (
        resource: any,
        params: {
            pagination: { page: any; perPage: any };
            sort: { field: any; order: any };
            filter: any;
            target: any;
            id: any;
        }
    ) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${API_URL}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(
                headers.get('content-range')?.split('/').pop() || '0',
                10
            ),
        }));
    },

    update: (resource: any, params: { id: any; data: any }) =>
        httpClient(`${API_URL}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource: any, params: { ids: any; data: any }) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${API_URL}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource: any, params: { data: any }) =>
        httpClient(`${API_URL}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource: any, params: { id: any }) =>
        httpClient(`${API_URL}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource: any, params: { ids: any }) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${API_URL}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    },
};

export default dataProvider;
