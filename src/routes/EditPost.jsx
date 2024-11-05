import blogFetch from "../axios/config";

import { useState, useEffect, useId } from "react";

import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const { id } = useParams();

  const getPost = async () => {
    try {
      const response = await blogFetch.get(`/posts/${id}`);

      const data = response.data;

      setTitle(data.title)
      setBody(data.body)
    } catch (error) {
      console.log(error)
    }
  };
  
  // function that sends edited posts with a PUT request:
  const editPost = async (e) => {
    e.preventDefault();

    const post = { title, body, useId: 1 };

    await blogFetch.put(`/posts/${post.id}`, {
      body: post
    })
  }

  useEffect(() => {
    getPost();
  }, [])

  return (
    <div className="new-post">
      <h2>Editando: {title}</h2>
      <form onSubmit={(e) => editPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            placeholder="Digite o título"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Conteúdo:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            onChange={(e) => setBody(e.target.value)}
            value={body || ""}
          ></textarea>
        </div>
        <input type="submit" value="Editar" className="btn" />
      </form>
    </div>
  );
};

export default EditPost;
