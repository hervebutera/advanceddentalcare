window.addEventListener('scroll', function () {
  
  if ( (window.scrollY ) > (hero_header.offsetHeight - 160) ) {

      navbar.style.backgroundColor = "#6f16eb"; //0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)      
      nav_link_item.forEach(item => {
          item.style.color = "white"; 
      })
      logo_text.style.color = "white"
      // nav_links_div.style.borderBlockColor = "white";
      menu_open_svg.style.stroke = "#ffffff";
  } else {
      navbar.style.backgroundColor = "#FFFFFF";
      nav_link_item.forEach(item => {
          item.style.color = "black"; 
      })
      logo_text.style.color = "black";
      // nav_links_div.style.borderBlockColor = "#374151bf";
      menu_open_svg.style.stroke = "#000000";
      
  }
});