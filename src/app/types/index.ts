export enum SponsorTier {
  Platinum = 'platinum',
  Gold = 'gold',
  Silver = 'silver',
  Bronze = 'bronze'
}
export class HubspotFormData {
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country_pl_: string;
  state?: string;
  t_shirt_size: string;
}

export interface AgendaItem {
  id: number;
  title: string;
  description: string;
  speakerIds: number[];
  startTime: string;
  endTime: string;
}

export interface AgendaItemFire {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  videoLink: string;
  speakers: Array<number>;
}

export interface SpeakerFire {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  description: string;
  email: string;
  photo: string;
  position: string;
  linkedin?: string;
  twitter?: string;
}

export interface Speaker {
  id: number;
  firstName: string;
  lastName: string;
  companyId: number;
  role: string;
  photoUrl: string;
  biography: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export interface Company {
  id: number;
  name: string;
  logoUrl: string;
}

export interface Sponsor {
  id: number;
  name: string;
  logoUrl: string;
  accentColor: string;
  tier: SponsorTier;
  biography: string;
  homepage: string;
}
