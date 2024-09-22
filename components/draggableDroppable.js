import { useState } from "react";
import {useDraggable, useDroppable, useDndMonitor} from "@dnd-kit/core";
import styled from "styled-components";

import DraggableCopy from "./draggableCopy";
import EmptyDroppable from "./emptyDroppable";

const Box = styled.div`
    position: relative;
`;

const BoxInner = styled.div`
    height: 100%;
    overflow: hidden;
    position: relative;
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
    animation: fadeIn 0.2s linear 0.1s forwards;

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
          opacity: 0;
          animation: fadeIn 0.4s linear forwards;
        }
      `
    }

    ${({ $toFadeOut }) => $toFadeOut &&
      `
        & {
          opacity: 1;
          animation: fadeIn 0.4s linear forwards reverse;
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

export default function DraggableDroppable({ image, sectionId }) {
  const [position, setPosition] = useState({ width: 0, height: 0 });
  const [activate, setActivate] = useState(false);
  const {isDragging, attributes, listeners, setNodeRef, setActivatorNodeRef, transform } = useDraggable({
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
    requestAnimationFrame(() => setActivate(true));
  }

  useDndMonitor({
    onDragEnd() {
      setActivate(false);
    },
    onDragCancel() {
      setActivate(false);
    },
  })

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
        <DraggableCopy 
          url={image.url} 
          alt={image.alt} 
          active={activate} 
          ref={setNodeRef}
          position={position}
          transform={transform}
        />
      </Box> 
    </> 
  )
}
