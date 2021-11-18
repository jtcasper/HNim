(() => {
  const comments = document.querySelectorAll("tr.comtr");
  const items = document.querySelectorAll("table.itemlist tr.athing");
  const morelink = document.querySelectorAll("a.morelink");

  const elements = [
    ...Array.from(items),
    ...Array.from(comments),
    ...Array.from(morelink),
  ];
  
  let elementsIndex = 0;
  let selectedElement = elements[elementsIndex];
  selectedElement.style.outline = '1px dashed black';

  const visible = (element) => {
    let bounds = element.getBoundingClientRect();
    return bounds.top >= 0 && bounds.bottom <= window.innerHeight;
  }

  const changeWithVisibleCallback = (comment, callback) => {
    if (comment == null) {
      return;
    }
    selectedElement.style.outline = '';
    selectedElement = comment;
    selectedElement.style.outline = '1px dashed black';
    while (!visible(comment)) {
      callback();
    }
  }

  const change = (comment) => {
    elementsIndex = elements.indexOf(comment);
    changeWithVisibleCallback(comment, () => {});
  }

  // Curry callback for moving downpage
  const changeDownpage = () => {
    elementsIndex = Math.min(elementsIndex + 1, elements.length - 1);
    changeWithVisibleCallback(elements[elementsIndex], () => {window.scrollTo(0, window.scrollY + selectedElement.offsetHeight)});
  }

  // Curry callback for moving up page
  const changeUppage = () => {
    elementsIndex = Math.max(elementsIndex - 1, 0);
    changeWithVisibleCallback(elements[elementsIndex], () => {window.scrollTo(0, window.scrollY - selectedElement.offsetHeight)});
  }

  document.addEventListener("click", (e) => {
    change(e.target.closest("tr.athing"));
  })
  document.addEventListener("keydown", (e) => {
    if (e.isComposing) {
      return;
    }
    switch (e.key) {
      case "j":
        do {
          changeDownpage();
        } while (selectedElement.classList.contains("noshow"));
        break;
      case "k":
        do {
          changeUppage();
        } while (selectedElement.classList.contains("noshow"));
        break;
      case "m":
      case "Enter":
        let togg = selectedElement.querySelector(".togg");
        if (togg) {
          togg.click();
        }
        else if (elementsIndex == elements.length - 1) {
          selectedElement.click();
        }
        break;
      case "o":
        window.location.href = "https://news.ycombinator.com/item?id=" + selectedElement.id;
      case "p":
        while (selectedElement.querySelector("td.ind").firstElementChild.width != 0) {
          changeUppage();
        }
        break;
      default:
        //noop
    }
  })
})();
