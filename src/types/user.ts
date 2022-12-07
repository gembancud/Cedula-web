import type { MeOrgType } from "./org";

export type MeType = {
  name: string;
  email: string;
  contact_number: string;
  links: {
    link: string;
    site: string;
  }[];
  orgs: MeOrgType[];
};
