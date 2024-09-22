import { forwardRef } from 'react';
import styled from "styled-components";

const CloneWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid rgb(255, 255, 255);
    position: absolute;
    top:  ${props => props.$top ? props.$top - 32 + 'px' : "50%"};
    left: ${props => props.$left ? props.$left - 32 + 'px' : "50%"};
    cursor: grab;
    z-index: 100;
    animation: expand 0.3s linear forwards;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    scale: 0;

    @keyframes expand {
      85% {
        scale: 1.2;
      }
      100% {
        scale: 1;
      }   
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: cover;
`;

export default forwardRef(function DraggableCopy({ active, url, alt, position, transform }, ref) {
  if (!active) {
    return null;
  }

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <CloneWrapper ref={ref} style={style} $top={position.top}  $left={position.left}>
      <Image 
        src={url} 
        alt={alt} 
      />
    </CloneWrapper>
  )
});
