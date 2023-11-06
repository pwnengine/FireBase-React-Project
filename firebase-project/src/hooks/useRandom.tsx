export const useRandom = (): string => {
  const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  let built_pid: string = '';

  for(let q: number = 0; q < 10; ++q) {
    const coin_flip: number = Math.floor(Math.random() * (10 - 1) + 1);
    
    if((coin_flip % 2) === 0) { // even = abc
      built_pid = built_pid.concat(abc[(Math.floor(Math.random() * (26 - 1) + 1)) - 1]);
    } else { // odd or num
      built_pid = built_pid.concat(num[(Math.floor(Math.random() * (10 - 1) + 1)) - 1]);
    }
    
  }

  console.log(built_pid);
  return `${built_pid}`;
};
