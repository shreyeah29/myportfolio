declare module "meshline" {
  import { BufferGeometry, Material } from "three";

  export class MeshLineGeometry extends BufferGeometry {
    setPoints(points: Float32Array | number[]): void;
  }

  export class MeshLineMaterial extends Material {
    constructor(parameters?: Record<string, unknown>);
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: Record<string, unknown>;
      meshLineMaterial: Record<string, unknown>;
    }
  }
}

export {};
