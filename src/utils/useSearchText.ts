import { useSessionStorage, useSetSessionStorage } from "./useSessionStorage"

export function useSearchText(): [string, (value: string) => void] {
  const [searchText, setSearchText] = useSessionStorage("search", "")
  return [searchText, setSearchText]
}

export function useClearSearchText() {
  const setSearchText = useSetSessionStorage<string>("search");
  return () => setSearchText("");
}