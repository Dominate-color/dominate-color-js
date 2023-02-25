import { Group, useMantineTheme, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const DROP_ZONE_IMAGE_TYPE: typeof IMAGE_MIME_TYPE = [
  MIME_TYPES.png,
  MIME_TYPES.jpeg,
  MIME_TYPES.webp,
];

export function DropZone({
  state,
  ...props
}: Partial<DropzoneProps> & {
  state: [File | null, React.Dispatch<React.SetStateAction<File | null>>];
}) {
  const [fill, setFill] = useState(false);
  const [error, setError] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    if (state[0]) {
      setFill(true);
    } else {
      setFill(false);
    }
  }, [state[0]]);

  useEffect(() => {
    let timeout: undefined | number;
    if (error) {
      console.log('error');
      timeout = setTimeout(() => {
        setError(false);
      }, 3000);

      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [error]);

  return (
    <Dropzone
      onDrop={(files) => {
        const file = files[0];
        if (file) {
          state[1](file);
        }
      }}
      onReject={(files) => {
        setError(true);
      }}
      maxSize={3 * 1024 ** 2}
      accept={DROP_ZONE_IMAGE_TYPE}
      maxFiles={1}
      {...props}
    >
      <Group position="center" spacing="xl" style={{ minHeight: 50, pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          {error ? (
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          ) : fill ? (
            <IconUpload
              size={50}
              stroke={1.5}
              color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
            />
          ) : (
            <IconPhoto size={50} stroke={1.5} />
          )}
        </Dropzone.Idle>
      </Group>
    </Dropzone>
  );
}
