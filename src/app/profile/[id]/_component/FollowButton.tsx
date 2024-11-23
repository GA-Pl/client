import { useState } from 'react';
import { toast } from 'react-toastify';
import { useFollow } from '../../_lib/useFollow';

interface FollowProps {
  personId: number;
  initialFollowed: boolean;
  accessToken: string;
}

const FollowButton = ({
  personId,
  initialFollowed,
  accessToken,
}: FollowProps) => {
  const { follow, isFollowing } = useFollow(personId, accessToken);
  const [followed, setFollowed] = useState(initialFollowed);
  const [buttonLabel, setButtonLabel] = useState(
    initialFollowed ? '팔로잉' : '팔로우',
  );

  const handleFollowToggle = async () => {
    setFollowed(!followed);
    try {
      await follow();
    } catch (error) {
      setFollowed(initialFollowed);
      console.error(error);
      toast.error('요청 중에 오류가 생겼습니다. 다시 시도해주세요.');
    } finally {
      toast.success(followed ? '언팔로우 완료!' : '팔로우 완료!');
    }
  };

  const handleMouseEnter = () => {
    setButtonLabel(followed ? '언팔로우' : '팔로우하기');
  };

  const handleMouseLeave = () => {
    setButtonLabel(followed ? '팔로잉하는 친구' : '팔로우');
  };

  return (
    <button
      type={'button'}
      className={`bg-${followed ? 'primary100' : 'primary'} text-${followed ? 'primary' : 'primary100'} rounded-full px-4 py-1 hover:bg-primary600 hover:text-white transition-colors duration-300 mt-4 text-sm`}
      onClick={handleFollowToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={isFollowing}
    >
      {buttonLabel}
    </button>
  );
};

export default FollowButton;
