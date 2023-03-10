import { ref } from 'vue';

type AsyncFunction = (...args: any[]) => Promise<any>;

export function useLoading<T>(asyncFunction: AsyncFunction, minDuration = 1200) {
  const isLoading = ref(false);

  const executeFn = async (...args: any[]) => {
    isLoading.value = true;
    const start = Date.now();

    try {
      const result = await asyncFunction(...args);
      const elapsed = Date.now() - start;

      if (elapsed < minDuration) {
        setTimeout(() => {
          isLoading.value = false;
        }, minDuration - elapsed);
      } else {
        isLoading.value = false;
      }

      return result;
    } catch (error) {
      isLoading.value = false;
      throw error;
    }
  };

  return { isLoading, executeFn };
}
