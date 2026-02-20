const FacebookProfileEmbed = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full">
        <div className="origin-top-left scale-100 sm:scale-100 xs:scale-[0.5]">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAustralianChineseBasketballAssociation&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
            className="border-0"
            style={{ width: "500px", height: "500px" }}
            data-adapt-container-width="true"
            allowFullScreen={false}
          />
        </div>
      </div>
    </div>
  );
};

export default FacebookProfileEmbed;
