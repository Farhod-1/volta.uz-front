import type { AxiosRequestConfig } from "axios";
import api from "./index";
import { reactive, toRefs } from "vue";

interface UseRequestData {
  error: any;
  loading: boolean;
  data: any;
}

export default function useRequest<T = any>(config: () => AxiosRequestConfig) {
  const data = reactive<UseRequestData>({
    error: null,
    loading: false,
    data: null,
  });

  async function fetch(fetchConfig?: AxiosRequestConfig) {
    let response;

    data.loading = true;
    try {
      response = await api.request<T>(Object.assign(config(), fetchConfig || {}));
      data.data = response.data;
      data.error = null;
    } catch (e) {
      data.error = e;
    } finally {
      data.loading = false;
    }

    return response;
  }

  return {
    fetch,
    ...toRefs(data),
  };
}
