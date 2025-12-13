import css from "./TestimonialsCard.module.css";

const TestimonialCard = ({ text, author }) => {
  return (
    <div className={css.container}>
      <p className={css.text}>{text}</p>
      <span className={css.author}>{author}</span>
    </div>
  );
};

export default TestimonialCard;
