import React, { useState } from 'react';
import ListStore from './ListStore';
import { ADD_ITEM, DELETE_ITEM, CLEAR_LIST } from './ActionTypes';
import dispet from './dispet';

const ListView = () => {
  const [text, setText] = useState('');

  const handleAddItem = () => {
    if (text.trim() !== '') {
      dispet.dispatch({ type: ADD_ITEM, payload: text });
      setText('');
    }
  };

  const handleDeleteItem = (item) => {
    dispet.dispatch({ type: DELETE_ITEM, payload: item });
  };

  const handleClearList = () => {
    dispet.dispatch({ type: CLEAR_LIST });
  };

  const listItems = ListStore.getState().items.map((item) => (
    <li key={item}>
      {item} <button onClick={() => handleDeleteItem(item)}>Х</button>
    </li>
  ));

  return (
    <div>
      <h2>Список элементов</h2>
      <ul>{listItems}</ul>
      <button onClick={handleClearList}>Clear</button>
      <div>
        <h3>Добавить элемент</h3>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handleAddItem}>Добавить</button>
      </div>
    </div>
  );
};

export default ListView;
