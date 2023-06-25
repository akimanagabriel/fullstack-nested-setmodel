import { useSelector } from "react-redux";
import Category from "./Category";

function Index() {
    const { categories } = useSelector((state) => state.categories);

  return (
    <>
      {!categories ? (
        <h1 className="my-5">No category found</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((category) => (
            <div
              className="bg-gray-50 rounded shadow py-1 px-2 pb-3"
              key={category.id}
            >
              <Category category={category} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Index;
