import { useEffect, useRef, useState } from "react";

type BrowserType =
  | "Chrome"
  | "Safari"
  | "Firefox"
  | "MSIE"
  | "Trident"
  | "Edge"
  | undefined;

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

export const useBrowser = (): BrowserType => {
  const userAgent = navigator.userAgent;

  if (userAgent === undefined || userAgent === null) {
    return undefined;
  }
  if (userAgent.indexOf("Chrome") != -1) {
    return "Chrome";
  } else if (userAgent.indexOf("Safari") != -1) {
    return "Safari";
  } else if (userAgent.indexOf("Firefox") != -1) {
    return "Firefox";
  } else if (userAgent.indexOf("MSIE") != -1) {
    return "MSIE";
  } else if (userAgent.indexOf("Trident") != -1) {
    return "Trident";
  } else if (userAgent.indexOf("Edge") != -1) {
    return "Edge";
  }

  return undefined;
};

const useColorDetection = () => {
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState<null | { message: string }>(null);
  const [colors, setColors] = useState<Array<string>>([]);
  const workerRef = useRef<Worker | null>(null);
  const borwser = useBrowser();

  const reset = () => {
    setColors([]);
  };

  const hanlder = async (fileImage: File | string) => {
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
  };

  useEffect(() => {
    if (borwser === "MSIE" || borwser === "Firefox") {
      setError({
        message:
          "your browser does not support the part of the technology that this script uses",
      });
    } else {
      const workerEvent = (event: MessageEvent<WorkerTypeColor>) => {
        if (event.data.type === "success") {
          setColors(event.data.value);
        } else if (event.data.type === "error") {
          setError({ message: `${event.data.value}` });
        }
        isLoading(false);
      };
      const worker = new Worker(new URL("./worker", import.meta.url), {
        type: "module",
      });
      worker.addEventListener("message", workerEvent);
      workerRef.current = worker;

      return () => {
        worker.removeEventListener("message", workerEvent);
        worker.terminate();
      };
    }
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
