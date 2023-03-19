import { Stack, Center, Button, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSearchOff, IconPhotoSearch } from '@tabler/icons-react';
import { useColorDetection } from '@dominate-color-js/react';
import { useEffect, useState } from 'react';

import { ThemeProvider } from './ThemeProvider';
import { Button as ButtonUI, Dropzone } from './UI';

function App() {
  const file = useState<File | null>(null);

  const { hanlder, colors, error, loading, reset } = useColorDetection();

  useEffect(() => {
    reset();
  }, [file[0]]);

  useEffect(() => {
    if (error?.message) {
      notifications.show({
        color: 'red',
        title: 'Oppsss 🤥',
        message: error.message,
      });
    }
  }, [error]);

  useEffect(() => {
    if (colors.length > 0) {
      notifications.show({
        color: 'green',
        title: '✅ Done',
        message: `The result of the work we received ${colors.length} colors`,
      });
    }
  }, [colors]);

  return (
    <ThemeProvider>
      <Center style={{ width: '100%', height: '100vh' }}>
        <Flex align="center" justify="center" gap="md">
          <Stack>
            <Dropzone state={file} loading={loading} />
            <Button
              variant="light"
              color={error ? 'red' : undefined}
              onClick={() => {
                const data = file[0];
                if (data) {
                  hanlder(data);
                } else {
                  notifications.show({
                    color: 'yellow',
                    title: '🏗️ Place an image in the drop zone. ⚠️',
                    message: 'Place or select an image to get the result.',
                  });
                }
              }}
            >
              <IconPhotoSearch />
            </Button>
          </Stack>
          <Flex gap="lg" wrap="wrap" mih="138px" w="100px" maw="100px">
            {colors.length > 0 ? (
              colors.map((color) => {
                return <ButtonUI.CopyColor value={color} key={color} />;
              })
            ) : (
              <Flex
                justify="center"
                align="center"
                bg="rgba(255,255,255,.1)"
                w={100}
                style={{
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  notifications.show({
                    title: '📖 Explanation 📖',
                    message:
                      'Before you get the result, you need to select an image and click on the button if everything is fine instead of this block you will see colors.',
                  });
                }}
              >
                <IconSearchOff />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Center>
    </ThemeProvider>
  );
}

export default App;
