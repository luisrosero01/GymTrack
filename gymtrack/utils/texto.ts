export const normalizar=(s:string):string=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
