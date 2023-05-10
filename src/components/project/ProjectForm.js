import React, { useEffect } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";

const ProjectForm = ({ handleSubmit, btnText, projectData }) => {
  const [categories, setCategories] = React.useState([]);
  const [project, setProject] = React.useState(projectData || {});
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/EmersonAraujonb/fake_api_records/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    // console.log(project);
    handleSubmit(project)
  };

  function handleChange({ target }) {
    setProject({ ...project, [target.name]: target.value });
  }

  function handleCategory({ target }) {
    setProject({
      ...project,
      category: {
        id: target.value,
        name: target.options[target.selectedIndex].text,
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do projeto..."
        handleOnChange={handleChange}
        value={project.name ? project.name : ""}
        required
      />
      <Input
        type="number"
        text="Orçamento do Projeto"
        name="budget"
        placeholder="Insira o orçamento total..."
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ""}
        required
      />
      <Select
        text="Selecione a categoria"
        name="category_id"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ""}
        required
      />
      <SubmitButton text={btnText} />
    </form>
  );
};

export default ProjectForm;
