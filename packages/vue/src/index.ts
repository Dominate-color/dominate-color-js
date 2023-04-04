import { ref, reactive, onMounted, onUnmounted } from "vue";
import Worker from "./worker.js?worker&inline";

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
  const loading = ref(false);
  const error = ref<null | { message: string }>(null);
  const colors = reactive<string[]>([]);
  const workerRef = new Worker();

  const reset = () => {
    colors.length = 0;
  };

  const handler = async (fileImage: File | string) => {
    loading.value = true;

    if (workerRef === null) {
      throw new Error("worker is not initialized");
    }

    if (fileImage instanceof File) {
      fileImage
        .arrayBuffer()
        .then((arrayBuffer) => {
          workerRef.postMessage(arrayBuffer);
        })
        .catch((error) => {
          error.value = { message: `${error}` };
          loading.value = true;
        });
    } else {
      workerRef.postMessage(fileImage);
    }
  };

  const workerEvent = (event: MessageEvent<WorkerTypeColor>) => {
    if (event.data.type === "success") {
      reset();
      colors.push(...event.data.value);
    } else if (event.data.type === "error") {
      error.value = { message: `${event.data.value}` };
    }
    loading.value = false;
  };

  onMounted(() => {
    workerRef.addEventListener("message", workerEvent);

    onUnmounted(() => {
      workerRef.removeEventListener("message", workerEvent);
      workerRef.terminate();
    });
  });

  return { handler, colors, loading, reset, error };
};

export { useColorDetection };
