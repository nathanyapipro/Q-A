export interface MenuGet_Global {
  __typename: "Global";
  menu: boolean;
}

export interface MenuGet {
  global: MenuGet_Global | null;
}

export interface MenuToggleInput {}

export interface MenuToggle {}
