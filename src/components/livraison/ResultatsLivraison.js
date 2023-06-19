import ResultatLivraison from "./ResultatLivraison";
import LivraisonEq from "components/misc/tiles/LivraisonEq";
import DataContext from "components/providers/DataProvider";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";

export default function ResultatsLivraison(props) {
  const { eqv1, eqv2, eqv3, equivalents, tiles } = useContext(DataContext);
  console.log("eqv3", eqv3);
  console.log("eqv2", eqv2);

  const equivalentsToShow = useMemo(
    () =>
      equivalents.filter((equivalent) =>
        ["voiturethermique", "repasavecduboeuf", "streamingvideo"].includes(equivalent.slug)
      ),
    [equivalents]
  );

  return (
    <Wrapper>
      <ResultatLivraison co2eq={props.co2eq} />
      {equivalentsToShow
        .sort(function (a, b) {
          return a.category < b.category;
        })
        .map((equivalent, indx) => (
          <LivraisonEq key={equivalent.slug} slug={indx + 1} equivalent={equivalent} weight={props.co2eq / 1000} />
        ))}
      <div>
        {JSON.stringify(eqv1, null, 2)}
        {JSON.stringify(
          tiles.map((t) => t.slug),
          null,
          2
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid #457be7;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 1rem;
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;
