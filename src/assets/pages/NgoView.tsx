import Feed from "../../components/feed/Feed";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Interface para os dados da ONG
interface NgoData {
  is_formalized: boolean;
  site?: string;
  start_year: number;
  id: number;
  username: string;
  contact_phone: string;
  created_at: string;
  sustainable_development_goals: Array<{
    id: number;
    name: string;
    url_ods: string;
    logo_url: string;
  }>;
  name: string;
  ong: number;
  email: string;
  instagram_link?: string;
  gallery_images: string[];
  x_link?: string;
  skills: Array<{
    id: number;
    name: string;
  }>;
  description: string;
  facebook_link?: string;
  pix_qr_code_link?: string;
  causes: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}

export default function NgoView() {
  const { id } = useParams();

  const [ngoData, setNgoData] = useState<NgoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNgoData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/profiles/${id}`);
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data: NgoData[] = await response.json();
        setNgoData(data[0]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNgoData();
    }
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  if (!ngoData) {
    return <p>Nenhum dado encontrado.</p>;
  }

  return (
    <>
      <Feed
        capa="https://picsum.photos/200/300?random=2"
        ngo_logo="https://picsum.photos/200/300?random=1"
        name_ngo={ngoData.name}
        bio_description={ngoData.description}
        perfil={false}
        facebook_link={ngoData.facebook_link}
        instagram_link={ngoData.instagram_link}
        pix_qr_code_link={ngoData.pix_qr_code_link}
        x_link={ngoData.x_link}
        contact_phone={ngoData.contact_phone}
      />
    </>
  );
}