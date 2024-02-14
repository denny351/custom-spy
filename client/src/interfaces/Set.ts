export interface Set {
  id: number;
  name: string;
  locations: string[];
}

export interface SelectedSet {
  type: "premade" | "custom";
  id: number;
}
