export interface IPerson {
  id: number;
  name: string;
  image: string;
  introduction: string;
}

export interface IFollowData {
  follow: {
    number: number;
    follow_people: Array<IPerson>;
  };
  following: {
    number: number;
    following_people: Array<IPerson>;
  };
}
