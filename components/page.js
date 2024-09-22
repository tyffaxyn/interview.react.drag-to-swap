import { useState } from 'react';
import styled from "styled-components";

import DraggableDroppable from "./draggableDroppable";

const Section = styled.section`
  margin-bottom: 32px;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  h4 {
    color: #585858;
    margin: 0;
  }

  input {
    height: 28px;
    width: 28px;
    border-radius: 50%;
    border: none;
  }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    border-radius: 8px;
    padding: 32px;
    gap: 16px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px, rgba(0, 0, 0, 0.06) 0px 1px 2px;
    background-color: ${props => props.$inputColor || "#fff"};
    aspect-ratio: 1.32;

    @media screen and (max-width: 575px) {
        gap: 8px;
        padding: 16px;
    }

    ${({ $count }) => $count == 3 &&
      `
        & {
          grid-template-columns: 2fr 1fr;

          > :first-child {
              grid-row-start: span 2;
          }
        }
      `
    }

    ${({ $count }) => $count == 2 &&
      `
        & > * {
           grid-row-start: span 2;
        }
      `
    }

    ${({ $count }) => $count == 1 &&
      `
        & > * {
           grid-row-start: span 2;
           grid-column-start: span 2;
        }
      `
    }
`

export default function Page({ title, id, images, grid }) {
  const [color, setColor] = useState("#eceff1");

  return (
    <Section>
      <Title>
        <h4>{title}</h4>
        <input onChange={(ev) => {
          setColor(ev.target.value);
        }} type="color" value={color} />
      </Title>
      <Grid $inputColor={color} $count={grid}>
        {Array.from({ length: grid }).map((_, i) => {
          const image = images[i];

          return (
            <DraggableDroppable 
              key={image.id} 
              sectionId={id}
              image={image}
            />
          )
        })}
      </Grid>
    </Section>
  )
};
