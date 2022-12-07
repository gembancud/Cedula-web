export type BaseOrgType = {
  name: string;
  image: string;
  badge: string;
  description: string;
  requirements: string;
  createdAt: string;
  access: string;
  website: string;
};

export type MeOrgType = BaseOrgType & {
  status: string;
  active_badge: string;
  badges: {
    name: string;
    link: string;
  }[];
};
