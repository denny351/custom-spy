export interface Location {
  id: number;
  name: string;
}

export interface Set {
  id: number;
  name: string;
  locations: Location[];
}
