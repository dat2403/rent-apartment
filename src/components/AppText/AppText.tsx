import React from 'react';
import { AppHTMLProps } from '../../utils/typed';

export type FontType = 'bold' | 'regular' | 'semi';

interface AppTextProps extends AppHTMLProps<HTMLParagraphElement> {
  font?: FontType;
}

const AppText: React.FC<AppTextProps> = (props) => {
  const { font } = props;
  return (
    <p
      style={{
        fontFamily:
          font === 'bold' ? 'bold' : font === 'semi' ? 'semibold' : 'regular',
      }}
      {...props}
    />
  );
};

export default AppText;
