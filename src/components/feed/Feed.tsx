import NgoView from "../../assets/pages/NgoView";
import "./feed.css"

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
}


function Feed({perfil, capa, name_ngo, x_link, facebook_link, instagram_link, pix_qr_code_link, ngo_logo, bio_description} : feedProps) {
    return(
            <main>
                <section className="capa-feed">
                    <img src={capa} alt="capa da página" />
                </section>

                <section className="bio-feed">
                    <div>
                        <img src={ngo_logo} alt="logo da ong"/>
                        <div>
                            <h2>{name_ngo}</h2>   
                        </div>
                    </div>

                </section>
            </main>
    )
}

export default Feed;