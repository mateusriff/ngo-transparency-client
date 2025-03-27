import "./feed.css"
import { useState } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter, FaPlus, FaPix } from "react-icons/fa6";
import Button from "../button/Button";
import Post from "../Post/Post";
import Modal from '../modal/modal'

interface feedProps {
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


const postMocked = {
    "img": "https://picsum.photos/200/300?random=3",
    "description": "Lorem ipsum dolor sit amet. Et eaque laudantium quo nesciunt consequatur eum optio delectus et explicabo doloremque qui cupiditate praesentium. Aut dolores quibusdam eum placeat unde a facilis consequatur eos omnis fuga ut earum molestiae.",
    "createAt": "03/05/2025",
    "transaction": -1101.99
}


function Feed({ perfil, capa, name_ngo, x_link, facebook_link, instagram_link, pix_qr_code_link, ngo_logo, bio_description, contact_phone }: feedProps) {

    const [open, setOpen] = useState<boolean>(false)

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
                                {!!facebook_link && <a rel="external" target="_blank" className="face-icon" href={facebook_link}><FaFacebook />
                                </a>}
                                {!!instagram_link && <a rel="external" target="_blank" className="insta-icon" href={instagram_link}><FaInstagram />
                                </a>}
                                {!!x_link && <a rel="external" target="_blank" className="x-icon" href={x_link}><FaXTwitter />
                                </a>}
                                {!!contact_phone && <a rel="external" target="_blank" className="x-icon" href={`https://wa.me/55${contact_phone}`}><FaWhatsapp />
                                </a>}
                            </div>
                        </div>
                    </div>


                    <p className={perfil ? "p-description" : "p-description p-description-center"}>{bio_description}</p>

                    {perfil && <Button onClick={()=> setOpen(!open)} text="Adicionar" variant="primary"  icon={<FaPlus />} />}

                    <Modal ngo_logo={ngo_logo} IsOpen={open} setOpen={setOpen}/>

                </section>

                <section className="container-posts-feed">

                    <Post perfil={perfil} createdAt={postMocked.createAt} description={postMocked.description} transaction={postMocked.transaction} img={postMocked.img} />

                    <Post perfil={perfil} createdAt={postMocked.createAt} description={postMocked.description} transaction={postMocked.transaction} img={postMocked.img} />

                    <Post perfil={perfil} createdAt={postMocked.createAt} description={postMocked.description} transaction={postMocked.transaction} />

                </section>
                
                {!perfil && !!pix_qr_code_link && <a rel="external" target="_blank" href={pix_qr_code_link}><FaPix className="pix-icon" /></a>}
            </main>
        </>

    )
}

export default Feed;