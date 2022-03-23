import expressLoader from './express';
//import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
  //const mongoConnection = await mongooseLoader();
  
  await expressLoader({ app: expressApp });
   
  // ... más cargadores pueden estar aquí

  // ... Iniciar agenda
  // ... o Redis, o lo que quieras
}