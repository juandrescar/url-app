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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}