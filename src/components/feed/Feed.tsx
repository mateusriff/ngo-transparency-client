import "./feed.css";
import { useCallback, useEffect, useState } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter, FaPlus, FaPix } from "react-icons/fa6";
import Button from "../button/Button";
import Post from "../Post/Post";
import Modal from "../modal/Modal";
import { useParams } from "react-router-dom";

// Interface para os dados do post
interface PostData {
  transaction: number;
  title: string;
  ong: number;
  created_at: string;
  content: string;
  id: number;
}

interface FeedProps {
  perfil: boolean;
  capa?: string;
  name_ngo: string;
  x_link?: string;
  facebook_link?: string;
  instagram_link?: string;
  pix_qr_code_link?: string;
  ngo_logo: string;
  bio_description: string;
  contact_phone: string;
}

function Feed({
  perfil,
  capa,
  name_ngo,
  x_link,
  facebook_link,
  instagram_link,
  pix_qr_code_link,
  ngo_logo,
  bio_description,
  contact_phone,
}: FeedProps) {
  const [open, setOpen] = useState<boolean>(false);

  const { id } = useParams();

  const [postData, setPostData] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/posts/${id}`);
      
      // NOTE: uncomment this when api is fixed
      // if (!response.ok) {
      //   throw new Error(`Erro na requisição: ${response.status}`);
      // }
      
      const data: PostData[] = await response.json();
      setPostData(data.reverse());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPostData();
    }
  }, [id, fetchPostData]);

  const handleRefetch = async () => {
    await fetchPostData();
  } 

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <>
      <section className="capa-feed">
        <img src={capa} alt="capa da página" />
      </section>
      <main className="main-feed">
        <section className="bio-feed">
          <div className="container-bio">
            <img src={ngo_logo} alt="logo da ong" />
            <div className="name-icons-feed">
              <h3>{name_ngo}</h3>
              <div className="container-redes">
                {!!facebook_link && (
                  <a
                    rel="external"
                    target="_blank"
                    className="face-icon"
                    href={facebook_link}
                  >
                    <FaFacebook />
                  </a>
                )}
                {!!instagram_link && (
                  <a
                    rel="external"
                    target="_blank"
                    className="insta-icon"
                    href={instagram_link}
                  >
                    <FaInstagram />
                  </a>
                )}
                {!!x_link && (
                  <a
                    rel="external"
                    target="_blank"
                    className="x-icon"
                    href={x_link}
                  >
                    <FaXTwitter />
                  </a>
                )}
                {!!contact_phone && (
                  <a
                    rel="external"
                    target="_blank"
                    className="x-icon"
                    href={`https://wa.me/55${contact_phone}`}
                  >
                    <FaWhatsapp />
                  </a>
                )}
              </div>
            </div>
          </div>

          <p
            className={
              perfil ? "p-description" : "p-description p-description-center"
            }
          >
            {bio_description}
          </p>

          {perfil && (
            <Button
              onClick={() => setOpen(!open)}
              text="Adicionar"
              variant="primary"
              icon={<FaPlus />}
            />
          )}

          <Modal ngo_logo={ngo_logo} IsOpen={open} setOpen={setOpen} refetch_posts={handleRefetch} />
        </section>

        <section className="container-posts-feed">
          {postData.length ? (
            postData.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                perfil={perfil}
                createdAt={new Date(post.created_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                description={post.content}
                transaction={post.transaction}
                refetch={handleRefetch}
              />
            ))
          ) : (
            <p>Nenhuma publicação encontrada.</p>
          )}
        </section>

        {!perfil && !!pix_qr_code_link && (
          <a rel="external" target="_blank" href={pix_qr_code_link}>
            <FaPix className="pix-icon" />
          </a>
        )}
      </main>
    </>
  );
}

export default Feed;