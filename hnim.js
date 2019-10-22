(() => {
  const comments = document.querySelector(".comment-tree > tbody");
  
  let selectedComment = comments.firstElementChild
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
    changeWithVisibleCallback(comment, () => {});
  }

  // Curry callback for moving downpage
  const changeDownpage = (comment) => {
    changeWithVisibleCallback(comment, () => {window.scrollTo(0, window.scrollY + comment.offsetHeight)});
  }

  // Curry callback for moving up page
  const changeUppage = (comment) => {
    changeWithVisibleCallback(comment, () => {window.scrollTo(0, window.scrollY - comment.offsetHeight)});
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
          changeDownpage(selectedComment.nextElementSibling);
        } while (selectedComment.classList.contains("noshow"));
        break;
      case "k":
        do {
          changeUppage(selectedComment.previousElementSibling);
        } while (selectedComment.classList.contains("noshow"));
        break;
      case "m":
      case "Enter":
        let togg = selectedComment.querySelector(".togg");
        let more = selectedComment.querySelector(".morelink");
        if (togg) {
          togg.click();
        }
        else if (more) {
          more.click();
        }
        break;
      case "p":
        while (selectedComment.querySelector("td.ind").firstElementChild.width != 0) {
          changeUppage(selectedComment.previousElementSibling);
        }
        break;
      default:
        //noop
    }
  })
})();
