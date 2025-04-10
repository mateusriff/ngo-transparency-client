import { FaTrash } from "react-icons/fa";
import './Post.css'
import { useParams } from "react-router";

type PostProps = {
    id: number;
    img?: string;
    description: string
    createdAt: string;
    transaction: number;
    receipts?: any[];
    perfil: boolean;
    refetch: () => void;
}


export default function Post({ 
    id, 
    img, 
    description, 
    createdAt, 
    transaction, 
    receipts, 
    perfil, 
    refetch 
}: PostProps) {
    const { id: ngo_id } = useParams();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Você tem certeza de que deseja excluir este post?");
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/posts/${ngo_id}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Falha ao excluir o post");
            }

            refetch();
        } catch (error) {
            console.error("Erro ao excluir o post:", error);
            alert("Ocorreu um erro ao tentar excluir o post");
        }
    }

    return (
        <>
            <article className={`Post ${!img ? "noimage" : ''}`} >
                {img && (
                    <img src={img} alt="img" className="PostImage" />
                )}
                <section className="PostBottom">
                    <section>
                        <p className="PostCreatedAt">
                            {createdAt}
                        </p>
                    </section>

                    <p className="PostParagraph">
                        {description}
                    </p>

                    <div className="PostFooter">
                        <span className={`PostFooterTransaction`}>
                            {transaction > 0 ? "Recebido: " : "Gasto: "}R$ {transaction.toFixed(2).toString().replace(".", ",").replace("-", "")}
                        </span>
                        <button className="PostFooterIcons" onClick={handleDelete}>
                            {/* {<FaSearch />} */}
                            {perfil && <FaTrash />}
                        </button>

                    </div>
                    <div></div>
                </section>
            </article>
        </>
    )
};

