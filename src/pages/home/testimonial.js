export default function Testimonial() {
  return (
    <section id="testimonials">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <h2 className="testimonial-text">
              I don't normally talk to doctors online. This is the first time
              and I have to say it was a good experience. The website is so
              awesome! will even recommend to my friends.
            </h2>

            <img
              className="im1"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcH-1O1vJrO7JES9PymGvX2EBW942VbepT8u_KIg9_D4zpyRobQ9O-JYvCy5HjBzfz5xQ&usqp=CAU"
              alt=""
            />
            <em>Lili</em>
          </div>

          <div className="carousel-item">
            <h2 className="testimonial-text">
              I had been to an offline doctor many times I must say the
              experience was almost similar very satisfied with the experience.
            </h2>
            <img
              className="im1"
              src="https://www.orbitmedia.com/wp-content/uploads/2017/03/jen-havice.png"
              alt=""
            />
            <em>Mili</em>
          </div>

          <div className="carousel-item">
            <h2 className="testimonial-text">
              It's my first time consulting a doctor online.Never felt it would
              be this easy.The website is very easy to use in the sense very
              easy to navigate.
            </h2>
            <img
              className="im1"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMCO8HRJ6FA6__UA3hHiA6ZxK9Jo4s7TvDvWUGF4scLpijuloHUh9K1lQ9wcGsBlsxxmA&usqp=CAU"
              alt=""
            />
            <em>Lamy</em>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </section>
  );
}
