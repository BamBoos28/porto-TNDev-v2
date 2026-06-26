
export function getPastelColor(str: string) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = Math.abs(hash) % 360;

  return {
    background: `hsl(${h}, 95%, 93%)`,
    color: `hsl(${h}, 50%, 25%)`,
    border: `hsl(${h}, 90%, 85%)`,
  };
}