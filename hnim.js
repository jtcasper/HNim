(() => {
  const comments = document.querySelectorAll("tr.comtr");
  const morelink = document.querySelectorAll("a.morelink");

  const elements = [...Array.from(comments), ...Array.from(morelink)]
  
  let elementsIndex = 0;
  let selectedComment = elements[elementsIndex]
  selectedComment.style.outline = '1px dashed black';

  const visible = (element) => {
    let bounds = element.getBoundingClientRect();
    return bounds.top >= 0 && bounds.bottom <= window.innerHeight;
  }

  const changeWithVisibleCallback = (comment, callback) => {
    if (comment == null) {
      return;
    }
    selectedComment.style.outline = '';
    selectedComment = comment;
    selectedComment.style.outline = '1px dashed black';
    if (!visible(comment)) {
      callback();
    }
  }

  const change = (comment) => {
    elementsIndex = elements.indexOf(comment);
    changeWithVisibleCallback(comment, () => {});
  }

  // Curry callback for moving downpage
  const changeDownpage = () => {
    elementsIndex = Math.min(elementsIndex + 1, elements.length);
    changeWithVisibleCallback(elements[elementsIndex], () => {window.scrollTo(0, window.scrollY + selectedComment.offsetHeight)});
  }

  // Curry callback for moving up page
  const changeUppage = () => {
    elementsIndex = Math.max(elementsIndex - 1, 0);
    changeWithVisibleCallback(elements[elementsIndex], () => {window.scrollTo(0, window.scrollY - selectedComment.offsetHeight)});
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
        } while (selectedComment.classList.contains("noshow"));
        break;
      case "k":
        do {
          changeUppage();
        } while (selectedComment.classList.contains("noshow"));
        break;
      case "m":
      case "Enter":
        let togg = selectedComment.querySelector(".togg");
        if (togg) {
          togg.click();
        }
        else if (elementsIndex == elements.length - 1) {
          selectedComment.click();
        }
        break;
      case "p":
        while (selectedComment.querySelector("td.ind").firstElementChild.width != 0) {
          changeUppage();
        }
        break;
      default:
        //noop
    }
  })
})();
