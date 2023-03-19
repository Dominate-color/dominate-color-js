import { CopyButton as Copy, CopyButtonProps, ActionIcon } from '@mantine/core';
import { FC } from 'react';

const Button = () => undefined;

type CopyColorComponentType = FC<Omit<CopyButtonProps, 'children'>>;
const CopyColor: CopyColorComponentType = ({ ...args }) => {
  return (
    <Copy {...args}>
      {({ copy }) => <ActionIcon style={{ backgroundColor: args.value }} onClick={copy} />}
    </Copy>
  );
};

Button.CopyColor = CopyColor;

export { Button };
