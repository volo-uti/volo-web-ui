import type { HTMLAttributes } from "react";
import type { VAlign, VOrientation } from "../../../lib";
import type { VSpace } from "../resolve-space";

/** VStack props. */
export interface VStackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Direction the children run in.
   * @default "vertical"
   */
  direction?: VOrientation;
  /**
   * Space between children: a `VSize` token, pixels as a number, or any CSS length.
   * @default undefined
   */
  spacing?: VSpace;
  /**
   * Cross-axis alignment.
   * @default "stretch"
   */
  align?: VAlign | "stretch" | "baseline";
  /**
   * Main-axis distribution.
   * @default "start"
   */
  justify?: VAlign | "between" | "around" | "evenly";
  /**
   * Whether children wrap onto the next line when space runs out.
   * @default false
   */
  wrap?: boolean;
  /**
   * Whether the stack shrinks to fit its content instead of filling the line.
   * @default false
   */
  inline?: boolean;
}
