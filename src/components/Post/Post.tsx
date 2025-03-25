import { FaSearch, FaTrash } from "react-icons/fa";
import './Post.css'

type PostProps = {
    img?: string;
    description: string
    createdAt: string;
    transaction: number;
    receipts?: any[];
    perfil: boolean;
}


export default function Post({ img, description, createdAt, transaction, receipts, perfil }: PostProps) {

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
                        <div className="PostFooterIcons">
                            {/* {<FaSearch />} */}
                            {perfil && <FaTrash />}
                        </div>

                    </div>
                    <div></div>
                </section>
            </article>
        </>
    )
};

