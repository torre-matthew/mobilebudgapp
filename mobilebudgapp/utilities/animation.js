let animations = {
    styles: {
        menuItemFontSize: 3
    },
    quickActionDrawer2: () => {
        let initialSize = 0;
        let finalSize = 12;
        let size = setInterval(() => {
            if (initialSize < finalSize) {
              initialSize++
              console.log(initialSize);
              return initialSize;
            } else {
              clearInterval(size);
            }
          }
          , 100);
          return size;
    } 
}

export default animations
