import { Component, createSignal } from "solid-js";
import { useColorDetection } from "@dominate-color-js/solid";
import {
  IconPhoto,
  IconPhotoSearch,
  IconSearchOff,
} from "@tabler/icons-solidjs";

const Loader: Component = () => {
  return (
    <svg
      width="1.375rem"
      height="1.375rem"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#1971c2"
      class="mantine-0"
      role="presentation"
      style={{
        transform: "scale(0.8)",
      }}
    >
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(2.5 2.5)" stroke-width="5">
          <circle stroke-opacity=".5" cx="16" cy="16" r="16"></circle>
          <path d="M32 16c0-9.94-8.06-16-16-16">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 16 16"
              to="360 16 16"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
        </g>
      </g>
    </svg>
  );
};

const App: Component = () => {
  const { hanlder, colors, loading } = useColorDetection();
  const [file, setFile] = createSignal<File>();
  let ref: HTMLInputElement | undefined = undefined;

  return (
    <div class="root__container">
      <div class="input__container">
        <div
          class="input__dropzone"
          onClick={() => {
            if (ref) {
              ref.click();
            }
          }}
        >
          <input
            ref={ref}
            style={{ display: "none" }}
            tabIndex="-1"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(event) => {
              if (
                event.currentTarget.files &&
                event.currentTarget.files.length > 0
              ) {
                const image = event.currentTarget.files.item(0);
                if (image) setFile(() => image);
              }
            }}
          />
          <IconPhoto />
        </div>
        <button
          class="button__dropzone"
          onClick={() => {
            const image = file();
            if (image) {
              hanlder(image);
            }
          }}
          disabled={loading()}
        >
          <span>{loading() ? <Loader /> : <IconPhotoSearch />}</span>
        </button>
      </div>
      <div class="colors__container">
        {colors().length === 0 ? (
          <div class="colors__void-container">
            <IconSearchOff />
          </div>
        ) : (
          colors().map((el) => {
            return <div class="colors__content" style={{ background: el }} />;
          })
        )}
      </div>
    </div>
  );
};

export default App;
