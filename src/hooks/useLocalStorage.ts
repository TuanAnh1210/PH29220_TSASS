import { useState } from "react";

// Define the data type that you want to store in LocalStorage
type ItemType = {
  id: string;
  // Add other properties here based on your needs
};

// Define the hook
const useLocalStorage = (key: string) => {
  // Load data from LocalStorage and set it as the initial state
  const [items, setItems] = useState<ItemType[]>(() => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  });

  // Function to add an item to the LocalStorage and update the state
  const addItem = (item: ItemType) => {
    setItems((prevItems) => {
      const newItems = [...prevItems, item];
      localStorage.setItem(key, JSON.stringify(newItems));
      return newItems;
    });
  };

  // Function to update an existing item in the LocalStorage and update the state
  const updateItem = (itemId: string, newItem: ItemType) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === itemId ? newItem : item
      );
      localStorage.setItem(key, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Function to remove an item from the LocalStorage and update the state
  const removeItem = (itemId: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      localStorage.setItem(key, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Function to clear all items from the LocalStorage and reset the state
  const clearItems = () => {
    setItems([]);
    localStorage.removeItem(key);
  };

  return { items, addItem, updateItem, removeItem, clearItems };
};

export default useLocalStorage;
