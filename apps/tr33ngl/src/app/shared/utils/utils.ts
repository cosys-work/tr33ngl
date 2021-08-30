export const coords3d: () => {[key: number]: number} = () => ({ 0: 0, 1: 0, 2: 0, 3: 1 });
export const inc = (v: 0 | 1 | 2, coords3dVec: {[key: number]: number}) => {
  coords3dVec[v] = coords3dVec[v] + 0.1;
  coords3dVec[3] = (coords3dVec[3] + 1) % 3;
  return coords3dVec[v];
}
