export const getPageArray = (currentPage, highestNumber, range = 5) => {
  const diff = Math.max(0, Math.floor(range / 2));
  if (diff <= 0) {
    throw new Error();
  }
  if (highestNumber <= 0) {
    return [];
  }
  if (highestNumber <= range) {
    return Array.from({length: highestNumber}, (_, i) => (i + 1).toString());
  }

  const final = ["1"]
  if (currentPage <= diff + 1) {
    for (let i = 2; i <= currentPage + diff; i++) {
      final.push(i.toString());
    }
    final.push(...["...", highestNumber.toString()]);
    return final;
  } else if (currentPage >= highestNumber - diff) {
    final.push("...");
    for (let i = currentPage - diff; i <= currentPage + diff; i++) {
      if ( i >= highestNumber) {
        break;
      }
      final.push(i.toString());
    }
    final.push(highestNumber.toString())
    return final;
  } else {
    final.push("...");
    let i;
    for (i = currentPage - diff; i <= currentPage + diff; i++) {
      if (i >= highestNumber) {
        break;
      }
      final.push(i.toString());
    }
    if (i < highestNumber) {
      final.push("...");
    }
    final.push(highestNumber.toString());
    return final;
  }
}