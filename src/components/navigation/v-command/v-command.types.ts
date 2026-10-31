import type { HTMLAttributes, ReactNode } from "react";

/** One selectable entry of a VCommand group. */
export interface VCommandItem {
  /** Item label text. */
  label: string;
  /** Identifier, also matched by the default search filter. */
  value?: string;
  /** Leading content such as an icon. */
  leading?: ReactNode;
  /** Trailing hint such as shortcut keys. */
  trailing?: string;
  /** Extra words the default search filter matches. */
  keywords?: string[];
  /**
   * Whether the item cannot be chosen.
   * @default false
   */
  disabled?: boolean;
  /** Called when the item is chosen by click or Enter. */
  onClick?: () => void;
}

/** A headed list of VCommand items. */
export interface VCommandGroup {
  /** Group heading. */
  heading: string;
  /** Items shown under the heading. */
  items: VCommandItem[];
}

/** Props of VCommand. */
export interface VCommandProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Search input placeholder.
   * @default "Search..."
   */
  placeholder?: string;
  /**
   * Content shown when no item matches.
   * @default "No results found."
   */
  emptyContent?: ReactNode;
  /** Groups of items to search and choose from. */
  groups?: VCommandGroup[];
  /** Replaces the default label/value/keywords match; return true to keep the item. */
  filter?: (item: VCommandItem, query: string) => boolean;
  /**
   * Whether the palette is shown (controlled).
   * @default true
   */
  open?: boolean;
  /**
   * Initial open state when `open` is not given.
   * @default true
   */
  defaultOpen?: boolean;
  /**
   * Shows a spinner in the search row.
   * @default false
   */
  loading?: boolean;
  /** Called with `false` after an item is chosen or Escape is pressed on an empty query. */
  onOpenChange?: (open: boolean) => void;
}
