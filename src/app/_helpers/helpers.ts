/*Pure function for move elements inside array*/
export const array_move = (arr:any, old_index: number, new_index:number): any[] => {
  const array = [...arr];
  if (new_index >= array.length) {
    let k = new_index - array.length + 1;
    while (k--) {
      array.push(undefined);
    }
  }
  array.splice(new_index, 0, array.splice(old_index, 1)[0]);
  return array;
}

export const hexToRgb = (hex: string): any => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
