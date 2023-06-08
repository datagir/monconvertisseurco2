import { convertGramsToKilograms } from "./utils";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #457be7;
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
  color: white;
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  max-width: 350px;
  > .item1 {
    align-items: center;
    display: flex;
    justify-content: end;
    margin-right: 4px;
    margin-top: 7px;
  }
  > .item3 {
    grid-row: span 3;
    position: relative;
    > div {
      position: absolute;
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 0 54px 17px 54px;
      border-color: transparent transparent #457be7 transparent;
      transform: rotate(90deg);
      left: -16px;
      top: 44px;
    }
  }
  > .item4 {
    color: #aec8fc;
    margin-bottom: 1rem;
    margin-top: -5px;
  }
  > .item5 {
    margin-top: -5px;
  }
`;

const ActualResult = styled.span`
  font-size: 36px;
  font-weight: 700;
  line-height: 56px;
`;

const Units = styled.span`
  font-size: 18px;
  font-weight: 400;
  line-height: 40px;
`;

const Subexplain = styled.span`
  color: #aec8fc;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`;

export default function ResultatLivraison(props) {
  return (
    <Wrapper>
      <div className="item1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 3C9.49 3 12.383 5.554 12.913 8.895C14.088 7.724 15.71 7 17.5 7H22V9.5C22 13.09 19.09 16 15.5 16H13V21H11V13H9C5.134 13 2 9.866 2 6V3H6ZM20 9H17.5C15.015 9 13 11.015 13 13.5V14H15.5C17.985 14 20 11.985 20 9.5V9ZM6 5H4V6C4 8.761 6.239 11 9 11H11V10C11 7.239 8.761 5 6 5Z"
            fill="#90B3F8"
          />
        </svg>
      </div>
      <div className="item2" data-testid="resultAsText">
        <ActualResult>{convertGramsToKilograms(props.co2eq)}</ActualResult>
        <Units> kg de CO2e </Units>
      </div>
      <div className="item3">
        <div></div>
      </div>
      <div className="item4"></div>
      <div className="item5">
        <Subexplain>
          <strong>par an</strong>, soit l'équivalent de
        </Subexplain>
      </div>
      <div className="item6"></div>
      <div className="item7">
        <UnderstandLink>Comprendre le calcul</UnderstandLink>
      </div>
      <div className="item8"></div>
    </Wrapper>
  );
}

const UnderstandLink = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 24px;
  margin-top: 0.5rem;
`;
