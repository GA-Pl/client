export interface IProfileData {
  email?: string;
  nickname: string;
  profileImg: string;
  level?: string;
  selfIntro?: string;
  image_file_id?: number;
  is_followed_by_current_user: boolean;
  follow_count: number;
  following_count: number;
  user_id?: number;
}

export interface IUpdateUser {
  nickname: string;
  selfIntro: string;
  image_file_id?: number | undefined;
}

export interface PutProfileParams {
  nickname?: string;
  selfIntro?: string;
  image_file_id?: number;
}
