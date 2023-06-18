// import { useState, useEffect } from 'react';
// //  переносимо суди функцію кастомного хука. Тут ми 
// // її здробимо не стрілковою
// export default function useLocalStorage(key, defaultValue) {
//   const [state, setState] = useState(() => {
//     return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
//   });

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(state));
//   }, [key, state]);

//   return [state, setState];
// }