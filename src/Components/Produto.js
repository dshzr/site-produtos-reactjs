import React from 'react';
import { useParams } from 'react-router-dom';
import Head from './Head';
import styles from './Produto.module.css';
const Produto = () => {
  const { id } = useParams();
  const [produto, setProduto] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    async function fetchProduto(url) {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        setProduto(json);
      } catch (erro) {
        setError('um erro ocorreu ao buscar o produto selecionado');
      } finally {
        setLoading(false);
      }
    }
    fetchProduto(`https://ranekapi.origamid.dev/json/api/produto/${id}`);
  }, [id]);
  if (loading) return <div className={"loading"}></div>;
  if (error) return <p>{error}</p>;
  if (produto == null) return null;

 
  return (
    <section className={styles.produto + ' animeLeft'}>
      <Head title={`Ranek | ${produto.nome}`} description="esse é um produto" />
      <div>
        {produto.fotos.map(({ src, titulo }) => {
          return <img key={src} src={src} alt={titulo} />;
        })}
      </div>
      <div>
        <h1>{produto.nome}</h1>
        <span className={styles.preco}>R$ {produto.preco}</span>
        <p className={styles.descricao}>{produto.descricao}</p>
      </div>
    </section>
  );
};

export default Produto;
