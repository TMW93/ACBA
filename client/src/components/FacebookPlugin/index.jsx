const FacebookProfileEmbed = () => {
  return (
    // <div className="w-full">
    //   <iframe
    //     src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAustralianChineseBasketballAssociation&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
    //     className="w-full border-0"
    //     style={{ height: "500px" }}
    //     data-adapt-container-width="true"
    //     allowFullScreen={false}
    //   />
    // </div>
    <div className="w-full overflow-hidden">
      <div className="relative w-full" style={{ paddingTop: "150%" }}>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAustralianChineseBasketballAssociation&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
          className="absolute top-0 left-0 w-full h-full border-0"
          data-adapt-container-width="true"
          allowFullScreen={false}
        />
      </div>
    </div>
  );
};

export default FacebookProfileEmbed;
