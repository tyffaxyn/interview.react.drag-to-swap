import { DragOverlay } from '@dnd-kit/core';
import styled from "styled-components";

const CloneWrapper = styled.div`
    width: 0;
    height: 0;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid rgb(255, 255, 255);
    position: absolute;
    top:  ${props => props.$top ? props.$top + 'px' : "50%"};
    left: ${props => props.$left ? props.$left + 'px' : "50%"};
    transform: translate(-50%, -50%);
    cursor: grab;
    animation: expand 0.2s linear forwards;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

    @keyframes expand {
      to {
          width: 64px;
          height: 64px;
      }
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: cover;
`;

export default function DraggableCopy({ position, activeId, url, alt }) {
  if (!activeId) {
    return null;
  }

  return (
    <DragOverlay>
      <CloneWrapper $top={position.top} $left={position.left}>
        <Image 
          src={url} 
          alt={alt} 
        />
      </CloneWrapper>
    </DragOverlay>
  )
}
