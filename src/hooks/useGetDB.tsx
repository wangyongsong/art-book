import { useState } from 'react';
import db from '../db';

const useGetDB = (key: string) => {
  const [dbData, setdbData] = useState(db.get(key));
  const [keyV] = useState(key);

  const getNewDBData = () => setdbData(db.get(keyV));

  const setNewDBData = (value: any) => {
    db.set(keyV, value);
    getNewDBData();
  };

  const setNewDBDataById = (id: string, value: any) => {
    db.modidyById(keyV, id, value);
    getNewDBData();
  };

  return { dbData, getNewDBData, setNewDBData, setNewDBDataById };
};

export default useGetDB;
