export const reloadPage = ():void => {
  window.location.reload()
}

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
