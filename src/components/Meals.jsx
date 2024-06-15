import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const requestConfig = {
  // method: 'GET',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
};

export default function Meals() {
  const {
    data: mealsState,
    isLoading,
    error,
  } = useHttp("http://localhost:5000/api/meals/getMeals", requestConfig, []);
  
  if (isLoading) {
    return <p className="center">Data fetching....</p>;
  }
  if (error) {
    //console.log(mealsState);
    return <Error title="Meals are not available right now" />;
  }
  console.log(mealsState)
  return (
    <ul id="meals">
      {mealsState.map((item) => {
        return (
          <div>
            <MealItem key={item.id} meal={item} />
          </div>
        );
      })}
    </ul>
  );
}
