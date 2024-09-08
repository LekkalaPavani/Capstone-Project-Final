import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css'

const testimonials = [
  { quote: "Rapid Resolve is a vital tool for our emergency teams!", author: "John Doe", role: "Emergency Coordinator" },
  { quote: "An essential platform for effective crisis management.", author: "Jane Smith", role: "Volunteer" },
  { quote: "The best solution we’ve used for coordinating emergency responses.", author: "Michael Johnson", role: "First Responder" },
];

const TestimonialCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="testimonial-carousel">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p>"{testimonial.quote}"</p>
            <h4>{testimonial.author}</h4>
            <p>{testimonial.role}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;
