import { useState } from "react";
import {useDraggable, useDroppable} from "@dnd-kit/core";
import styled from "styled-components";

import DraggableCopy from "./draggableCopy";
import EmptyDroppable from "./emptyDroppable";

const Box = styled.div`
    overflow: hidden;
    position: relative;
`;

const BoxInner = styled.div`
    height: 100%;
`;

const BoxReaction = styled.span`
    position: absolute;
    z-index: 3;
    top:  ${props => props.$top ? props.$top + 'px' : "50%"};
    left: ${props => props.$left ? props.$left + 'px' : "50%"};
    transform: translate(-50%, -50%);
    width: 0;
    opacity: 0;
    border-radius: 50%;
    background-color: rgba(255,255,255, 0.4);
    aspect-ratio: 1;
    animation: expand-reaction 0.3s ease-out 0.15s;

    @keyframes expand-reaction {
      80% {
          opacity: 1;
      }

      100% {
          width: 150%;
          opacity: 0;
      }
    }
`;

const BoxOver = styled.span`
    position: absolute;
    z-index: 2;
    inset: 0;
    opacity: 0;
    background-color: rgba(32,32,32, 0.4);
    animation: fadeIn 0.2s linear 0.2s forwards;

    @keyframes fadeIn {
      to {
          opacity: 1;
      }
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: cover;
    position: absolute;

    ${({ $toFade }) => $toFade &&
      `
        & {
           animation: fadeIn 0.25s linear forwards;
        }
      `
    }

    ${({ $toFadeOut }) => $toFadeOut &&
      `
        & {
           animation: fadeIn 0.25s linear forwards reverse;
        }
      `
    }

    ${({ $toExpand }) => $toExpand &&
      `
        & {
           clip-path: circle(10%);
           animation: expandImg 0.4s linear forwards;
        }
      `
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }

      to {
          opacity: 1;
      }
    }

    @keyframes expandImg {
      to {
          clip-path: circle(100%);
      }
    }
`;

const BoxToDrag = styled.div`
    position: absolute;
    width: 64px;
    height: 64px;
    background-color: transparent;
    z-index: -1;
    top:  0;
    left: 0;
`

export default function DraggableDroppable({ image, sectionId }) {
  const [position, setPosition] = useState({ width: 0, height: 0 });
  const {isDragging, attributes, listeners, setNodeRef, setActivatorNodeRef } = useDraggable({
    id: `${sectionId}-${image.id}`,
  });

  const droppable = useDroppable({
    id: `${sectionId}-${image.id}`,
    data: {
      empty: !image.url,
    }
  });

  const onMouseDownHandler = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPosition({
      top: e.clientY - rect.top,
      left: e.clientX - rect.left
    });
  }

  return (
    <>
      <Box ref={droppable.setNodeRef}>
        <BoxInner onMouseDown={onMouseDownHandler}>
          {image.prevImg?.url && (
            <Image 
              src={image.prevImg.url} 
              alt={image.prevImg.alt} 
              $toFadeOut={image.fade}
            />
          )}
          { image.url ? (<>
            <Image 
              src={image.url} 
              data-img-id={image.id}
              id={image.id}
              alt={image.alt} 
              $toFade={image.fade}
              $toExpand={image.expand}
              ref={setActivatorNodeRef}
              {...listeners} 
              {...attributes}
              loading='lazy'
            />
            <BoxToDrag 
              ref={setNodeRef} 
            />
          </>) : (
            <EmptyDroppable />
          )}
          {isDragging && (
            <BoxReaction 
              $top={position.top}
              $left={position.left}
            />
          )}
          {droppable.isOver && (
            <BoxOver />
          )}
        </BoxInner>
      </Box> 
      <DraggableCopy 
        position={position} 
        url={image.url} 
        alt={image.alt} 
        activeId={isDragging && image.id}
      />
    </> 
  )
}
