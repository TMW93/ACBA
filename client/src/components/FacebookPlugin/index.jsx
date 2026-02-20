const FacebookProfileEmbed = () => {
  return (
    <div className="w-full">
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAustralianChineseBasketballAssociation&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
        className="w-full border-0"
        style={{ height: "500px" }}
        data-adapt-container-width="true"
        allowFullScreen={false}
      />
    </div>
  );
};

export default FacebookProfileEmbed;
