import css from "./NoItemsFound.module.css";

const NoItemsFound = () => {
  return (
    <div className={css.container}>
      <h3>No items found with the provided request</h3>
    </div>
  );
}

export default NoItemsFound;
