import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { menuItems } from "../../assets/pictures/pictures";
import { useAddedItems } from "../context/AddedItemsContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ItemDetails.css";
import PopupComponent from "../PopupComponent/PopupComponent";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const initialItemIndex = menuItems.findIndex((item) => item.id === parseInt(id));
  const [itemIndex, setItemIndex] = useState(initialItemIndex);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const { addItem, isItemAdded, updateItemCount, addedItems } = useAddedItems();

  const [popUp, setPopup] = useState(false);
  const [selectedCombination, setSelectedCombination] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [itemIndex]);

  useEffect(() => {
    const currentItem = addedItems.find(item => item.id === menuItems[itemIndex].id);
    setCount(currentItem ? currentItem.count : 1);
  }, [itemIndex, addedItems]);

  const handleAddItem = () => {
    if (isItemAdded(menuItems[itemIndex].id)) {
      updateItemCount(menuItems[itemIndex].id, count);
      toast.info(`${menuItems[itemIndex].name} quantity updated!`);
    } else {
      addItem(menuItems[itemIndex], count);
      toast.success(`${menuItems[itemIndex].name} added to the cart!`);
    }
  };

  const handleNavigate = () => {
    navigate("/added-items");
  };

  const handleCombinationClick = (combination) => {
    const combinationItem = menuItems.find(
      (menuItem) => menuItem.name === combination
    );
    if (combinationItem) {
      setSelectedCombination(combinationItem);
      setPopup(true);
    }
  };

  const handleSwipeChange = (index) => {
    setItemIndex(index);
  };

  const handleNextItem = () => {
    setItemIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
  };

  const handlePreviousItem = () => {
    setItemIndex((prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length);
  };

  const handleQuantityIncrement = () => {
    setCount((c) => c + 1);
  };

  const handleQuantityDecrement = () => {
    if (count > 1) {
      setCount((c) => c - 1);
    }
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!menuItems[itemIndex]) {
    return <div>Item not found</div>;
  }

  return (
    <>
      <div className={`menu-details ${loaded ? "loaded" : ""}`}>
        <SwipeableViews
          index={itemIndex}
          onChangeIndex={handleSwipeChange}
          containerStyle={{ height: '100%' }}
          axis="x"
          resistance
        >
          {menuItems.map((item) => (
            <div className="menu-details-content" key={item.id}>
              <div className="menu-details-inner">
                <h2 className="menu-details-name">{item.name}</h2>
                <div className="menu-details-content-info">
                  <p className="menu-details-calories">{item.calories}</p>
                  <p className="menu-details-bsp"> &nbsp; | &nbsp; </p>
                  <p className="menu-details-price">{item.price}</p>
                </div>

                <div className="menu-details-image-container">
                  {item.video && (
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="menu-details-video"
                    />
                  )}

                  {!item.video && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-details-image"
                    />
                  )}
                </div>

                <p className="menu-details-desc">{item.desc}</p>
                <div className="menu-details-buttons">
                 
                  <button
                    className="menu-details-button"
                    onClick={handleAddItem}
                  >
                    Add
                  </button>
                  <button
                    className="menu-details-button"
                    onClick={handleNavigate}
                  >
                    Go to cart
                  </button>
                </div>
                <button onClick={handleQuantityDecrement}>-</button>
                  <span style={{color:"white"}}>&nbsp;{count}&nbsp;</span>
                  <button onClick={handleQuantityIncrement}>+</button>
              </div>
            </div>
          ))}
        </SwipeableViews>
        <div className="navigation-buttons">
          {itemIndex > 0 && (
            <button
              onClick={handlePreviousItem}
              className="navigation-buttons left-button"
            >
              &lt;
            </button>
          )}
          {itemIndex < menuItems.length - 1 && (
            <button
              onClick={handleNextItem}
              className="navigation-buttons right-button"
            >
              &gt;
            </button>
          )}
        </div>
      </div>

      {menuItems[itemIndex].combinations && (
        <div className="item-combinations">
          <h1 className="combinations-header">Best Combinations</h1>
          <p className="combinations-header">
            These are some best combinations with your{" "}
            {menuItems[itemIndex].name}
          </p>
          <div className="combinations-list-container">
            <div className="combinations-list">
              {menuItems[itemIndex].combinations.map((combination, index) => {
                const combinationItem = menuItems.find(
                  (menuItem) => menuItem.name === combination
                );
                return (
                  <div
                    key={index}
                    className="combination-item"
                    onClick={() => handleCombinationClick(combination)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={combinationItem.image}
                      alt={combinationItem.name}
                      className="combination-item-image"
                    />
                    <h3 className="combination-item-name">
                      {combinationItem.name}
                    </h3>
                    <h4 className="combination-item-price">
                      {combinationItem.price}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {popUp && selectedCombination && (
        <PopupComponent
          setPopup={setPopup}
          combinationItem={selectedCombination}
        />
      )}

      <ToastContainer autoClose={2000} />
    </>
  );
};

export default ItemDetails;
