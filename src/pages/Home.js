import React, { useState } from "react";
import ButtonAtom from "../components/Button/ButtonA";
import FilterForm from "../components/FilterForm/FilterForm";
import UserList from "../components/UserComponent/UserList/UserList";
import "./Home.css";

const Home = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState({ nat: "", gender: "" });

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const handleFilter = (nat, gender) => {
    setFilter({ nat, gender });
  };

  const handleClearFilters = () => {
    setFilter({ nat: "", gender: "" });
  };

  return (
    <div className="box">
      <div className="home pt-5">
        <div className="tittle">
          <h3 className="txt">Listado de usuarios</h3>
          <div className="filter btn mt-2">
            <ButtonAtom
              label="Filtros"
              icon="bi-sliders"
              onClick={toggleFilterVisibility}
            />
          </div>
        </div>
        {filterVisible && (
          <div className="filter-box">
            <FilterForm onFilter={handleFilter} />
            <div className="col-sm-12 col-lg-4 fl btn">
            <ButtonAtom label="Limpiar" onClick={handleClearFilters} />
            </div>
          </div>
        )}

        <UserList filter={filter} />
      </div>
    </div>
  );
};

export default Home;
