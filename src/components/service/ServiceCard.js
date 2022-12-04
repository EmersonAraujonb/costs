import React from 'react'
import styles from '../project/ProjectCard.module.css'
import { BsFillTrashFill } from "react-icons/bs";

const ServiceCard = ({id, name , cost, description, handleRemove}) => {
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost )
        
    }
    const costFormater = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
        currencyDisplay: 'symbol',
      }).format(cost)
  return (
    <div className={styles.project_card}>
        <h4>{name}</h4>
        <p>
            <span>Custo Total:</span>{costFormater}
        </p>
        <p>{description}</p>
        <div className={styles.project_card_actions}>
            <button onClick={remove}>
            <BsFillTrashFill /> Excluir
            </button>
        
        </div>
    </div>
  )
}

export default ServiceCard