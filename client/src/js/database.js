import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// PUT method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Updating jate database...');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value: content});
  const result = await request;
  // log the result of the put operation
  console.log('jate database updated', result, content);
};

// GET method that gets all the content from the database
export const getDb = async () => {
  console.log('Getting all from the database...');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  // log the result of the get operation
  console.log('jate database retrieved', result);
  // return the value of the result, displays the contents of the database
  return result.value;
};

initdb();
