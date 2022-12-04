import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

const ProjectCard = ({ id, name, budget, category, handleRemove }) => {

  const remove = (e) => {
    e.preventDefault()
    handleRemove(id)
  }

  const coinFormater = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    currencyDisplay: 'symbol',
  }).format(budget)
  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span>{coinFormater}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
