import * as avatars from './avatars';

type Icons = {
  [key: string]: string;
};
const icons: Icons = { ...avatars };

export const keys = Object.keys(icons);

export default icons;
