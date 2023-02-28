import Image from 'next/image';

import styled from '@emotion/styled';

import icons from '@/data/icons';

const AvatarWrapper = styled.div`
  border-radius: 0.7em;
  overflow: hidden;
`;

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
`;

type Props = {
  avatar: string;
  children: React.ReactNode;
};

const Avatar = ({ avatar, children }: Props) => (
  <PlayerWrapper>
    <AvatarWrapper>
      <Image
        src={icons[avatar]}
        height={100}
        alt={`Player Avatar - ${avatar}`}
      />
    </AvatarWrapper>
    {children}
  </PlayerWrapper>
);

export default Avatar;
