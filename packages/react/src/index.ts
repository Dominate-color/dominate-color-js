// vite: deps
import Worker from "./worker?worker";
import { useCallback, useEffect, useRef, useState } from "react";

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

const useColorDetection = () => {
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState<null | { message: string }>(null);
  const [colors, setColors] = useState<Array<string>>([]);
  const workerRef = useRef<Worker | null>(null);

  const reset = useCallback(() => {
    setColors([]);
  }, []);

  const hanlder = useCallback(async (fileImage: File | string) => {
    isLoading(true);

    if (workerRef.current === null) {
      throw new Error("worker is not initialized");
    }

    if (fileImage instanceof File) {
      fileImage
        .arrayBuffer()
        .then((arrayBuffer) => {
          workerRef.current!.postMessage(arrayBuffer);
        })
        .catch((error) => {
          setError({ message: `${error}` });
          isLoading(false);
        });
    } else {
      workerRef.current!.postMessage(fileImage);
    }
  }, []);

  useEffect(() => {
    const workerEvent = (event: MessageEvent<WorkerTypeColor>) => {
      if (event.data.type === "success") {
        setColors(event.data.value);
      } else if (event.data.type === "error") {
        setError({ message: `${event.data.value}` });
      }
      isLoading(false);
    };
    const worker = new Worker();
    worker.addEventListener("message", workerEvent);
    workerRef.current = worker;

    return () => {
      worker.removeEventListener("message", workerEvent);
      worker.terminate();
    };
  }, []);

  return {
    hanlder,
    colors,
    loading,
    error,
    reset,
  };
};

export { useColorDetection };
