const imageData = ((count) => {
  const images = {}; 

  for (let i = 0; i < count; i++) {
       images[120 + i] = {
           id: 120 + i,
           url: `/testImages/image_${i + 1}.jpeg`,
           alt: `My alt test ${i + 1}`,
           fade: false,
           expand: false,
           prevImg: null,
       }
  }

  return images;
})(11);

export const mockData = [
  { id: 11, title: "Front Print", images: [imageData[120]], grid: 1 },
  { id: 12, title: "Page 1", images: [imageData[121], { id: 1 }, imageData[122], imageData[123]], grid: 4 },
  { id: 13, title: "Page 2", images: [imageData[125], imageData[126]], grid: 2 },
  { id: 14, title: "Page 3", images: [imageData[127], imageData[128], imageData[129]], grid: 3 }
]

export const getNewAndCleanUpData = (data) => {
  return data.map((item) => {
    item.images.forEach((img) => {
      img.expand = false;
      img.fade = false;
      img.prevImg = null;
    })

    return item;
  });
}

export const swapOneItemGetNewList = (list, from, to, anim) => {
  return list.map((img) => {
    return img.id == from ? { ...imageData[to], prevImg: img, [anim]: true } : img;
  })
}

export const swapTwoItemGetNewList = (list, from, to) => {
  return list.map((img) => {
    if (img.id == from) {
      return { ...imageData[to], prevImg: img, fade: true };
    }

    if (img.id == to) {
      return { ...imageData[from], prevImg: img, expand: true };
    }
    return img;
  })
}

export const removeItemGetNewList = (list, id) => {
  return list.map((img, i) => {
    return img.id == id ? { id: i } : img;
  })
}
