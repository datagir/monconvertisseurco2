import EquivalentSquare from "./tilesModal/EquivalentSquare";
import categories from "data/categories.json";
import React from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function AllSearchCategory(props) {
  const [eqvArray, setEqvArray] = useLocalStorage("ico2_eqv_array");

  const theCategory = categories.find((oneCat) => {
    return oneCat.slug === props.cat;
  });

  const items = props.items.filter((oneItem) => {
    return oneItem.item.category === theCategory.id && !eqvArray.find((e) => e === oneItem.item.slug);
  });

  const itemChosen = (newArray, ticked) => {
    if (newArray.length > 2) {
      newArray[2] = newArray[1];
      newArray[1] = newArray[0];
      newArray[0] = ticked;
    } else {
      newArray.push(ticked);
    }
    setEqvArray(newArray);
  };

  const shouldDisplayCategoryName = (theItems, theSingleton) => {
    let res = false;
    let hasAtLeastOneItemInCategory = theItems && theItems.length > 0;
    let globalSearchHasOnlyOneResult = theSingleton;
    res = hasAtLeastOneItemInCategory && !globalSearchHasOnlyOneResult;
    return res;
  };

  return (
    <Wrapper>
      {shouldDisplayCategoryName(items, props.singleton) ? (
        <>
          <TheCategoryName>{theCategory.name}</TheCategoryName>
        </>
      ) : (
        <></>
      )}
      <Equivalents>
        {items.map(({ item }) => (
          <EquivalentSquare
            key={item.slug}
            equivalent={item}
            checked={false}
            setChecked={() => {
              let ticked = item.slug;
              itemChosen(JSON.parse(JSON.stringify(eqvArray)), ticked);
            }}
          />
        ))}
      </Equivalents>
    </Wrapper>
  );
}

const Equivalents = styled.div`
  margin-bottom: 0;
  > button {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const TheCategoryName = styled.div`
  color: #26827c;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
