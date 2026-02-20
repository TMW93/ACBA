const FacebookProfileEmbed = () => {
  return (
    <div>
      <iframe 
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAustralianChineseBasketballAssociation&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
        width="500" 
        height="70" 
        style={{ border: "none"}}  
        data-adapt-container-width={true}
        allowFullScreen={false}
      ></iframe>
    </div>
  );
};

export default FacebookProfileEmbed;
