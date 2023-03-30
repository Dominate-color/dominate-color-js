import { createSignal, onMount, onCleanup } from "solid-js";
import Worker from "./worker?worker";

export type WorkerError = {
  type: "error";
  value: string;
};

export type WorkerSuccess = {
  type: "success";
  value: string[];
};

export type MessageEventWorker = MessageEvent<ArrayBuffer>;

export type WorkerTypeColor = WorkerError | WorkerSuccess;

export const useColorDetection = () => {
  const [loading, isLoading] = createSignal(false);
  const [error, setError] = createSignal<null | { message: string }>(null);
  const [colors, setColors] = createSignal<Array<string>>([]);
  const worker = new Worker();
  const workerEvent = (event: MessageEvent<WorkerTypeColor>) => {
    if (event.data.type === "success") {
      setColors(event.data.value);
    } else if (event.data.type === "error") {
      setError({ message: `${event.data.value}` });
    }
    isLoading(false);
  };

  const reset = () => {
    setColors([]);
  };

  const hanlder = async (fileImage: File | string) => {
    isLoading(true);

    if (worker === null) {
      throw new Error("worker is not initialized");
    }

    if (fileImage instanceof File) {
      fileImage
        .arrayBuffer()
        .then((arrayBuffer) => {
          worker.postMessage(arrayBuffer);
        })
        .catch((error) => {
          setError({ message: `${error}` });
          isLoading(false);
        });
    } else {
      worker.postMessage(fileImage);
    }
  };

  onMount(() => {
    worker.addEventListener("message", workerEvent);

    onCleanup(() => {
      worker.removeEventListener("message", workerEvent);
      worker.terminate();
    });
  });

  return {
    hanlder,
    colors,
    loading,
    error,
    reset,
  };
};
