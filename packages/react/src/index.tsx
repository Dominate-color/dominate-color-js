import { colorDetection } from "@dominate-color-js/core";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const browser = useBrowser();

  const reset = () => {
    setColors([]);
  };

  const hanlder = useMemo(() => {
    console.log(browser);
    return browser === "MSIE" || browser === "Firefox"
      ? async (fileImage: File | string) => {
          isLoading(true);
          if (fileImage instanceof File) {
            fileImage
              .arrayBuffer()
              .then((arrayBuffer) => {
                return colorDetection(arrayBuffer, "fast");
              })
              .then((colors) => {
                return colors.map(
                  (color) => `rgb(${color[0]},${color[1]},${color[2]})`
                );
              })
              .then((colors) => {
                setColors(colors);
                isLoading(false);
              })
              .catch((error) => {
                setError({ message: `${error}` });
                isLoading(false);
              });
          } else {
            colorDetection(fileImage, "fast")
              .then((colors) => {
                return colors.map(
                  (color) => `rgb(${color[0]},${color[1]},${color[2]})`
                );
              })
              .then((colors) => {
                setColors(colors);
                isLoading(false);
              })
              .catch((error) => {
                setError({ message: `${error}` });
                isLoading(false);
              });
          }
        }
      : async (fileImage: File | string) => {
          console.log("worker handler start");
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
  }, []);

  useEffect(() => {
    if (browser === "MSIE" || browser === "Firefox") {
      setError({
        message: `lags freezes and starters may occur during image processing is the result of using the browser: ${browser} to solve this problem, you can change the browser`,
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
      console.log(worker);

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
