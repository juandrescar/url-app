export interface Stat {
  id: number;
  urlId: number;
  browser: string;
  location: string;
  createdAt: Date;
}

export interface Details {
  total: number;
  browsers: string[];
  locations: string[];
  items: Stat[];
  original_url: string;
  short_code: string;
  title: string;
  image: string;
  favicon: string;
  description: string
  domain: string
}