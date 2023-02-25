import { CopyButton as Copy, CopyButtonProps, ActionIcon } from '@mantine/core';
import { FC } from 'react';

export const CopyColorButton: FC<Omit<CopyButtonProps, 'children'>> = ({ ...args }) => {
  return (
    <Copy {...args}>
      {({ copy }) => <ActionIcon style={{ backgroundColor: args.value }} onClick={copy} />}
    </Copy>
  );
};
