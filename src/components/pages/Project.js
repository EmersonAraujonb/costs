import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

const Project = () => {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`https://my-json-server.typicode.com/EmersonAraujonb/fake_api_records/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProject(data);
          setServices(data.services);
        })
        .catch((err) => console.log(err));
    }, 2000);
  }, [id]);

  // formataçâo da moeda para BRL => R$
  let budget = project.budget;

  const budgetFormater = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
    currencyDisplay: "symbol",
  }).format(budget);

  // formataçâo da moeda para BRL => R$
  let cost = project.cost;

  const costsFormater = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
    currencyDisplay: "symbol",
  }).format(cost);

  function editPost(project) {
    setMessage("");
    // budget validation
    if (project.budget < project.cost) {
      // message
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`https://my-json-server.typicode.com/EmersonAraujonb/fake_api_records/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        //message
        setMessage("Projeto atualizado!");
        setType("sucess");
      })
      .catch((err) => console.log(err));
  }
  function createService(project) {
    setMessage("");
    // last service
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    // maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço!");
      setType("error");
      project.services.pop();
      return false;
    }

    //add service cost to project total cost
    project.cost = newCost;

    // update project
    fetch(`https://my-json-server.typicode.com/EmersonAraujonb/fake_api_records/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        // exibir os serviços
        setShowServiceForm(false);
        setMessage('Serviço adicionado com sucesso!')
        setType('sucess')
      })
      .catch((err) => console.log(err));
  }
  function removeService(id, cost) {
    setMessage("");
    const serviceUpdated = project.services.filter(
      (service) => service.id !== id
    );
    const projectUpdated = project;
    projectUpdated.services = serviceUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`https://my-json-server.typicode.com/EmersonAraujonb/fake_api_records/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(serviceUpdated)
        setMessage('Serviço removido com sucesso!')
        setType('sucess')
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }
  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> {budgetFormater}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> {costsFormater}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir ediçâo"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados!</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Project;
