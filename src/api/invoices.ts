import useRequest from "@/api/useRequest";

export function devices() {
  return useRequest(() => ({
    url: "/devices",
  }));
}
