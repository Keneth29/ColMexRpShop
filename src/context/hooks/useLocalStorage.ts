export function useLocalStorage() {
  const getItem = (key: string) => {
    return localStorage.getItem(key);
  };

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem
  };
}