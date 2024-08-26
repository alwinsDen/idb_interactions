window.addEventListener("load",()=> {
  const mobileRef = document.getElementById("app_render");
  const clickRef = document.getElementById("app_clicker");
  let startTime = null;
  let startPos = null;
  function eventBalancer(stringName,event) {
    const bbdBox = mobileRef.getBoundingClientRect();
    const scaleX  = 393 / mobileRef.clientWidth;
    const scaleY = 852 / mobileRef.clientHeight;
    let x = (event.clientX - bbdBox.left)*scaleX;
    let y = (event.clientY - bbdBox.top)*scaleY;
    return {x, y}
  }
  mobileRef.addEventListener("mousedown", (event)=> {
    startTime = Date.now();
    startPos = eventBalancer("mousedown", event);
  })

  mobileRef.addEventListener("mouseup", (event)=> {
    let endTime = Date.now();
    if ((endTime - startTime) < 200) {
      const pressEvent = eventBalancer("click", event);
      console.log(`idb ui tap ${Math.round(pressEvent.x)} ${Math.round(pressEvent.y)}`
      )
      clickRef.style.left = `${event.clientX}px`;
      clickRef.style.top = `${event.clientY}px`;
    } else {
      let endPos = eventBalancer("mouseup", event);
      console.log(`idb ui swipe ${Math.round(startPos.x)} ${Math.round(startPos.y)} ${Math.round(endPos.x)} ${Math.round(endPos.y)} --duration ${(endTime - startTime)/1000}`)
    }
  })
})

