import { useState } from 'react';
import Head from "next/head";
import PrintPages from "../components/printPage";
import styled from "styled-components";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { 
  swapOneItemGetNewList, 
  swapTwoItemGetNewList, 
  getNewAndCleanUpData, 
  mockData, 
  removeItemGetNewList
} from "../utils/dataAndHelpers";

const PageHeader = styled.div`
  max-width: 732px;
  margin: auto;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 42px;
  padding: 0 16px 24px 16px;

  h1 {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.36px;
    color: #585858;
    margin-bottom: 8px;
  }

  p {
    color: #797979;
    margin: 0;
  }
`;

export default function TestPage() {
  const [data, setData] = useState(mockData);

  function handleDragEnd(event) {
    const {active, over} = event;
    if (active && over && active.id !== over.id) {
      const newData = getNewAndCleanUpData(data);
      const [fromBlockId, fromImageId] = (active.id || '').split('-');
      const [toBlockId, toImageId] = (over.id || '').split('-');
      const fromBlock = newData.find(({ id }) => id == fromBlockId);
      const toBlock = newData.find(({ id }) => id == toBlockId);

      if (over.data?.current?.empty) {
        fromBlock.images = removeItemGetNewList(fromBlock.images, fromImageId);
        toBlock.images = swapOneItemGetNewList(toBlock.images, toImageId, fromImageId, "expand");
      } else {
        if (fromBlockId === toBlockId) {
          fromBlock.images = swapTwoItemGetNewList(fromBlock.images, fromImageId, toImageId);
        } else {
          fromBlock.images = swapOneItemGetNewList(fromBlock.images, fromImageId, toImageId, "fade");
          toBlock.images = swapOneItemGetNewList(toBlock.images, toImageId, fromImageId, "expand");
        }
      }

      setData(newData);
    }
    return;
  }

  return (
    <div>
      <Head>
        <title>Test Page | Popsa.com</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader>
        <h1>Cars and cartoon characters</h1>
        <p>Hardback Photobook last edited on Thursday 13 April 2022 at 16:28</p>
      </PageHeader>
      <DndContext id="print-pages" modifiers={[restrictToWindowEdges]} onDragEnd={handleDragEnd}>
        <PrintPages data={data} />
      </DndContext>  
    </div>
  );
}
