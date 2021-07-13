export interface sqlDbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  pool: {
    min: number;
    max: number;
  };
}

export interface noSQLDbConfig {
  uri: string;
  user: string;
  password: string;
  database: string;
}
