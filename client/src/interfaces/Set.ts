export interface Location {
  id: number;
  name: string;
}

export interface EditableLocation {
  id: number | null;
  name: string;
}

export interface Set {
  id: number;
  name: string;
  locations: Location[];
}

export interface SelectedSet {
  type: "premade" | "custom";
  id: number;
}
