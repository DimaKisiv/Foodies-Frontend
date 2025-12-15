import Icon from "../../../components/shared/Icon/Icon.jsx";
import css from './RecipeListPage.module.css';

const RecipeListPage = () => {
  return (
    <div className={css.container}>
      <button className={css.backBtn}>
        <Icon id="icon-arrow-left-frameless" />
        back
      </button>
      <div className={css.header}>
        <h2>desserts</h2>
        <h5>
          Go on a taste journey, where every sip is a sophisticated creative chord,
          and every dessert is an expression of the most refined gastronomic desires.
        </h5>
      </div>
      <div className={css.content}>
        <div className={css.filters}></div>
        <div className={css.list}></div>
      </div>
    </div>
  );
}

export default RecipeListPage;
