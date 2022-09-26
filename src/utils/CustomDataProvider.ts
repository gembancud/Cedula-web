import { stringify } from "query-string";
import { fetchUtils } from "react-admin";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const GetCustomDataProvider = (authToken: string) => {
  const httpClient = (url: any, options: any) => {
    if (!options.headers) {
      // eslint-disable-next-line no-param-reassign
      options.headers = new Headers({
        Accept: "application/json",
      });
    }
    options.headers.set("Authorization", authToken);
    return fetchUtils.fetchJson(url, options);
  };

  const CustomDataProvider = {
    getList: async (resource: any, params: any) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;

      const { headers, json } = await httpClient(url, {});
      return {
        data: json,
        total: parseInt(headers.get("content-range")!.split("/").pop()!, 10),
      };
    },

    getOne: async (resource: any, params: any) => {
      const url = `${apiUrl}/${resource}/${params.id}`;
      const { json } = await httpClient(url, {});
      return { data: json };
    },
  };

  return CustomDataProvider;
};
