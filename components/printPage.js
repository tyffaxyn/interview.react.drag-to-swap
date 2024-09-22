import styled from "styled-components";
import Actions from "./actions";

import Page from "./page";

const Container = styled.div`
  color: #585858;
  max-width: 732px;
  margin: 44px auto;
  padding: 0 16px;
`;

export default function PrintPages({ data }) {
  return (
      <Container>
        {data.map(({ id, title, images, grid }, i) =>{
          return <Page key={id} {...{ title, id, images, grid }} />
        })}
      </Container>
  );
}
