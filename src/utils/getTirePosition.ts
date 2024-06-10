export const getTirePosition = (inputString: string): {row:number; position:string; side:string} | null => {
  // Regular expression to match the input format
  const regex = /^(\d+)([LR])([IO])$/;
  const match = inputString.match(regex);

  if (match) {
    const row = parseInt(match[1]);
    const position = match[2];
    const side = match[3];

    // Return an object with the extracted values
    return {
      row: row,
      position: position,
      side: side,
    };
  } else {
    // Return null for invalid input format
    return null;
  }
};
