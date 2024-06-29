import React, { useState, useEffect } from "react";
import './Mainmenu.css';
import { useNavigate } from "react-router-dom";
import MenuDisplay from "../MenuDisplay/MenuDisplay";

function Mainmenu({ items, searchTerm }) {
  const navigate = useNavigate();
  const [visibleCategories, setVisibleCategories] = useState({});

  const handleItemClick = (id) => {
    navigate(`/menu/${id}`);
  };

  const groupItemsByCategory = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  };

  const toggleCategoryVisibility = (category) => {
    setVisibleCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  useEffect(() => {
    if (searchTerm) {
      const categoriesToShow = items.reduce((acc, item) => {
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          acc[item.category] = true;
        }
        return acc;
      }, {});

      setVisibleCategories(categoriesToShow);
    }
  }, [searchTerm, items]);

  const groupedItems = groupItemsByCategory(items);

  return (
    <div className="app">
      {Object.keys(groupedItems).map((category) => (
        <div key={category} className="category-section">
          <h2 className="category-title" onClick={() => toggleCategoryVisibility(category)}>
            {category} <button className="toggle-button">{visibleCategories[category] ? "-" : "+"}</button>
          </h2>
          {visibleCategories[category] && (
            <div className="menu-list">
              {groupedItems[category].map((item) => (
                <MenuDisplay
                  key={item.id}
                  item={item}
                  onClick={() => handleItemClick(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Mainmenu;
